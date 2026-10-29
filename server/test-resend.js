import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.argv[2] || process.env.RESEND_API_KEY;
const recipient = process.env.CONTACT_RECIPIENT || "fayyazmansoori.dev@gmail.com";

console.log("\n==============================");
console.log("Resend API Email Tester (HTTPS Port 443)");
console.log("==============================");
console.log("API Key:", apiKey ? `${apiKey.substring(0, 7)}...` : "NOT PROVIDED");
console.log("Recipient:", recipient);

if (!apiKey) {
  console.log("\nUsage: node test-resend.js <YOUR_RESEND_API_KEY>");
  console.log("Or add RESEND_API_KEY=re_... to server/.env\n");
  process.exit(1);
}

const resend = new Resend(apiKey);

async function test() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: recipient,
      subject: "✅ Test Email: Resend HTTPS Mail System is Working!",
      html: `
        <div style="font-family: sans-serif; padding: 24px; background: #0f172a; color: #fff; border-radius: 8px;">
          <h2 style="color: #10b981;">Congratulations Fayyaz! 🎉</h2>
          <p>Your portfolio email system is now running via Resend HTTPS API.</p>
          <p>Render Free Tier will NEVER block this because it runs over HTTPS port 443!</p>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 20px;">Indore, India · MERN Stack Portfolio</p>
        </div>
      `,
    });

    if (error) {
      console.error("\n❌ Resend API Error:", error.message);
    } else {
      console.log("\n✅ Success! Email delivered via Resend. ID:", data.id);
      console.log(`Check your inbox at ${recipient}!`);
    }
  } catch (e) {
    console.error("\n❌ Exception:", e.message);
  }
}

test();
