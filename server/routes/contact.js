import { Router } from "express";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import Message from "../models/Message.js";

const router = Router();

// Configure Nodemailer transporter (works on localhost / servers that don't block SMTP)
const getResendApiKey = () => {
  if (process.env.RESEND_API_KEY) return process.env.RESEND_API_KEY.trim();
  if (process.env.Value && process.env.Value.startsWith("re_")) return process.env.Value.trim();
  if (process.env.Key === "RESEND_API_KEY" && process.env.Value) return process.env.Value.trim();
  return null;
};

const createTransporter = () => {
  const user = (process.env.EMAIL_USER || process.env.GMAIL_USER || "").trim();
  const rawPass = process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || "";
  const pass = rawPass.replace(/\s+/g, "");

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // SSL
    auth: { user, pass },
    connectionTimeout: 6000,
    greetingTimeout: 6000,
    socketTimeout: 8000,
  });
};

// GET /api/contact/status - diagnostic check
router.get("/status", (req, res) => {
  const user = (process.env.EMAIL_USER || process.env.GMAIL_USER || "").trim();
  const rawPass = process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || "";
  const pass = rawPass.replace(/\s+/g, "");
  const resendApiKey = getResendApiKey();
  const hasResend = !!resendApiKey;

  res.json({
    emailUserConfigured: !!user,
    emailPassConfigured: !!pass,
    resendConfigured: hasResend,
    user: user || "NOT_SET",
    recipient: process.env.CONTACT_RECIPIENT || "fayyazmansoori.dev@gmail.com",
    renderSmtpNotice: "Note: Render Free tier blocks SMTP ports 465/587. Use RESEND_API_KEY or Web3Forms.",
  });
});

// POST /api/contact - save message to DB and dispatch email notification
router.post("/", async (req, res) => {
  const { name, email, subject, phone, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  try {
    // 1. Save message to MongoDB
    const saved = await Message.create({
      name,
      email,
      subject: subject || "Portfolio Inquiry",
      phone: phone || "",
      message,
    });

    const recipient = process.env.CONTACT_RECIPIENT || "fayyazmansoori.dev@gmail.com";
    const mailSubject = `[Portfolio Lead] ${subject || "New Message"} - from ${name}`;
    const mailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid #1e293b;">
        <div style="background: linear-gradient(135deg, #10b981, #06b6d4); padding: 24px; text-align: center;">
          <h1 style="margin: 0; color: #022c22; font-size: 22px; font-weight: 700;">New Portfolio Message</h1>
          <p style="margin: 4px 0 0; color: #064e3b; font-size: 14px;">A potential client or recruiter reached out to you!</p>
        </div>
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px; width: 110px;"><strong>Sender Name:</strong></td>
              <td style="padding: 8px 0; color: #ffffff; font-size: 15px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;"><strong>Sender Email:</strong></td>
              <td style="padding: 8px 0; color: #38bdf8; font-size: 15px;">
                <a href="mailto:${email}" style="color: #38bdf8; text-decoration: underline;">${email}</a>
              </td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;"><strong>Phone:</strong></td>
              <td style="padding: 8px 0; color: #ffffff; font-size: 15px;">${phone}</td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;"><strong>Topic:</strong></td>
              <td style="padding: 8px 0; color: #ffffff; font-size: 15px;">${subject || "General Inquiry"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;"><strong>Received At:</strong></td>
              <td style="padding: 8px 0; color: #cbd5e1; font-size: 14px;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</td>
            </tr>
          </table>

          <div style="background: #1e293b; border-left: 4px solid #10b981; padding: 16px 20px; border-radius: 8px; margin-top: 10px;">
            <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Message Content</p>
            <p style="margin: 0; color: #f1f5f9; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 28px; text-align: center;">
            <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(subject || 'Your message to Fayyaz Mansoori')}" 
               style="display: inline-block; background: #10b981; color: #022c22; font-weight: 600; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 15px;">
              Reply to ${name}
            </a>
          </div>
        </div>
        <div style="background: #090d16; padding: 14px; text-align: center; border-top: 1px solid #1e293b; color: #64748b; font-size: 12px;">
          Fayyaz Mansoori Portfolio · Indore, India
        </div>
      </div>
    `;

    let mailSent = false;
    let mailError = null;

    // METHOD A: Resend API over HTTPS (Port 443 - NEVER blocked by Render Free Tier)
    const resendKey = getResendApiKey();
    if (resendKey) {
      try {
        const resend = new Resend(resendKey);
        const { data, error } = await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: recipient,
          reply_to: email,
          subject: mailSubject,
          html: mailHtml,
        });

        if (error) {
          mailError = error.message;
          console.error("[Contact] Resend error:", error.message);
        } else {
          mailSent = true;
          console.log(`[Contact] Notification delivered via Resend API to ${recipient}`);
        }
      } catch (resendErr) {
        mailError = resendErr.message;
        console.error("[Contact] Resend exception:", resendErr.message);
      }
    }

    // METHOD B: Fallback to Gmail SMTP / Nodemailer (works on local development)
    if (!mailSent) {
      const transporter = createTransporter();
      if (transporter) {
        try {
          await transporter.sendMail({
            from: `"Portfolio Contact Form" <${process.env.EMAIL_USER || process.env.GMAIL_USER}>`,
            to: recipient,
            replyTo: email,
            subject: mailSubject,
            html: mailHtml,
          });
          mailSent = true;
          console.log(`[Contact] Notification email delivered via Nodemailer to ${recipient}`);
        } catch (err) {
          mailError = err.message;
          console.error("[Contact] Nodemailer SMTP error (Render blocks ports 465/587):", err.message);
        }
      } else if (!mailError) {
        mailError = "No mail service configured. Set RESEND_API_KEY or EMAIL_PASS.";
      }
    }

    res.status(201).json({
      ok: true,
      id: saved._id,
      mailSent,
      mailError,
    });
  } catch (err) {
    console.error("[Contact] Error saving message:", err);
    res.status(500).json({ error: "Could not save your message. Try again shortly." });
  }
});

// GET /api/contact - list messages (for admin/monitoring)
router.get("/", async (_req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Could not load messages" });
  }
});

export default router;
