import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;
const recipient = process.env.CONTACT_RECIPIENT || "fayyazmansoori.dev@gmail.com";

console.log("\n==============================");
console.log("Portfolio Email Tester");
console.log("==============================");
console.log("Sender Email (EMAIL_USER):", user || "NOT SET in .env");
console.log("App Password (EMAIL_PASS):", pass ? "******** (Set)" : "NOT SET in .env");
console.log("Recipient:", recipient);

if (!user || !pass) {
  console.error("\n❌ Error: EMAIL_USER and EMAIL_PASS must be set in server/.env");
  console.log("Guide:");
  console.log("1. Go to https://myaccount.google.com/apppasswords");
  console.log("2. Generate a 16-character App Password");
  console.log("3. Add to server/.env:");
  console.log("   EMAIL_USER=" + (user || "your_gmail@gmail.com"));
  console.log("   EMAIL_PASS=xxxx xxxx xxxx xxxx\n");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user, pass },
});

console.log("\nSending test email via Gmail SMTP...");

transporter.sendMail(
  {
    from: `"Portfolio Test" <${user}>`,
    to: recipient,
    subject: "✅ Test Email: Fayyaz Portfolio Mail System is Working!",
    html: `
      <div style="font-family: sans-serif; padding: 20px; background: #0f172a; color: #fff; border-radius: 8px;">
        <h2 style="color: #10b981;">Congratulations Fayyaz! 🎉</h2>
        <p>Your Nodemailer mail delivery system is working perfectly.</p>
        <p>Emails from your portfolio contact form will now land directly in this inbox.</p>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 20px;">Indore, India · MERN Stack Portfolio</p>
      </div>
    `,
  },
  (err, info) => {
    if (err) {
      console.error("\n❌ Nodemailer Failed:", err.message);
      console.log("\nPossible reasons:");
      console.log("- Incorrect 16-letter App Password");
      console.log("- 2-Step Verification not enabled on Google Account");
    } else {
      console.log("\n✅ Success! Test email sent successfully:", info.response);
      console.log("Check your inbox at " + recipient + "!");
    }
    process.exit(0);
  }
);
