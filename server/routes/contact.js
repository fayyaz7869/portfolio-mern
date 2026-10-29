import { Router } from "express";
import nodemailer from "nodemailer";
import Message from "../models/Message.js";

const router = Router();

// Configure Nodemailer transporter with SSL, strict timeouts, and whitespace trimming
const createTransporter = () => {
  const user = (process.env.EMAIL_USER || process.env.GMAIL_USER || "").trim();
  const rawPass = process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || "";
  const pass = rawPass.replace(/\s+/g, ""); // Strip spaces from App Password (e.g. "abcd efgh" -> "abcdefgh")

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // SSL
    auth: { user, pass },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
  });
};

// POST /api/contact - save message to DB and send notification email to Fayyaz
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

    // 2. Immediately respond to client with 201 Created so the UI stops buffering instantly!
    res.status(201).json({ ok: true, id: saved._id });

    // 3. Send email notification in the background (non-blocking)
    const recipient = process.env.CONTACT_RECIPIENT || "fayyazmansoori.dev@gmail.com";
    const transporter = createTransporter();

    if (transporter) {
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

      transporter
        .sendMail({
          from: `"Portfolio Contact Form" <${process.env.EMAIL_USER || process.env.GMAIL_USER}>`,
          to: recipient,
          replyTo: email,
          subject: mailSubject,
          html: mailHtml,
        })
        .then(() => {
          console.log(`[Contact] Notification email delivered to ${recipient}`);
        })
        .catch((mailErr) => {
          console.error("[Contact] Error delivering email via Nodemailer:", mailErr.message);
        });
    } else {
      console.log(`[Contact] Message saved to DB. Note: EMAIL_USER/EMAIL_PASS not set.`);
    }
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
