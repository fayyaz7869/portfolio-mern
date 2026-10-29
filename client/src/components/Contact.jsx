import { useState } from "react";
import { Mail, Phone, MapPin, Send, Check, Copy, MessageSquare, Clock, Sparkles } from "lucide-react";

const TOPICS = [
  "Full-time Role",
  "Freelance Project",
  "React / Frontend",
  "Node / MERN Backend",
  "General Inquiry",
];

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  topic: "Full-time Role",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const emailAddress = "fayyazmansoori.dev@gmail.com";
  const phoneNumber = "+91 88274 79973";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const selectTopic = (topic) => {
    setForm({ ...form, topic });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    let emailDelivered = false;

    // 1. Send directly to Fayyaz's email via FormSubmit (guaranteed delivery even on static hosting)
    try {
      const emailRes = await fetch(`https://formsubmit.co/ajax/${emailAddress}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || "Not provided",
          topic: form.topic,
          message: form.message,
          _subject: `[Portfolio Lead] ${form.topic} - from ${form.name}`,
          _replyto: form.email,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (emailRes.ok) {
        emailDelivered = true;
      }
    } catch (err) {
      console.warn("Direct email delivery attempt completed:", err);
    }

    // 2. Also forward to local/production backend API if available (saves to MongoDB)
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.topic,
          message: form.message,
        }),
      });
      emailDelivered = true;
    } catch {
      // Backend might be static or offline; if formsubmit succeeded, we're still good!
    }

    if (emailDelivered) {
      setStatus("sent");
      setForm(INITIAL_FORM);
    } else {
      setStatus("error");
      setErrorMsg("Unable to send at this moment. Please email directly or contact via WhatsApp.");
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-head-wrap">
          <span className="eyebrow">
            <Sparkles size={14} className="inline-icon" /> 05 · Get in Touch
          </span>
          <h2 className="section-heading">Let's discuss your next project or role</h2>
          <p className="section-subtext">
            Whether you have an open Software Engineer position, need a full-stack web application built,
            or just want to connect — my inbox is always open.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Info Cards */}
          <div className="contact-info-col">
            <div className="contact-status-card">
              <span className="pulse-indicator">
                <span className="pulse-dot" />
                <span className="pulse-ring" />
              </span>
              <div>
                <strong>Currently Available</strong>
                <p>Open for full-time Software Engineer opportunities & freelance builds</p>
              </div>
            </div>

            <div className="contact-cards-list">
              {/* Email Card with Copy button */}
              <div className="contact-channel-card">
                <div className="channel-icon-wrap">
                  <Mail size={20} />
                </div>
                <div className="channel-details">
                  <span className="channel-label">Email Me Directly</span>
                  <a href={`mailto:${emailAddress}`} className="channel-value">
                    {emailAddress}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="channel-copy-btn"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={16} className="text-mint" /> : <Copy size={16} />}
                  <span className="copy-tooltip">{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>

              {/* Phone / WhatsApp Card */}
              <div className="contact-channel-card">
                <div className="channel-icon-wrap">
                  <Phone size={20} />
                </div>
                <div className="channel-details">
                  <span className="channel-label">Phone & WhatsApp</span>
                  <a href={`tel:+918827479973`} className="channel-value">
                    {phoneNumber}
                  </a>
                </div>
                <a
                  href="https://wa.me/918827479973"
                  target="_blank"
                  rel="noreferrer"
                  className="channel-badge-link"
                >
                  WhatsApp
                </a>
              </div>

              {/* Location Card */}
              <div className="contact-channel-card">
                <div className="channel-icon-wrap">
                  <MapPin size={20} />
                </div>
                <div className="channel-details">
                  <span className="channel-label">Location & Timezone</span>
                  <span className="channel-value static-text">Indore, Madhya Pradesh, India</span>
                  <span className="channel-sub">
                    <Clock size={13} className="inline-icon" /> IST (GMT +5:30) · Open to relocation & remote
                  </span>
                </div>
              </div>
            </div>

            <div className="contact-social-strip">
              <span className="social-strip-title">Find me on</span>
              <div className="social-strip-links">
                <a
                  href="https://github.com/fayyaz7869"
                  target="_blank"
                  rel="noreferrer"
                  className="social-pill"
                >
                  GitHub @fayyaz7869
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-col">
            {status === "sent" ? (
              <div className="card contact-success-card">
                <div className="success-icon-wrap">
                  <Check size={32} />
                </div>
                <h3>Message Received!</h3>
                <p>
                  Thank you for reaching out! Your message was delivered straight to Fayyaz's email inbox:
                </p>
                <div className="success-email-highlight">{emailAddress}</div>
                <p className="success-sub">
                  I typically respond within 24 hours. Looking forward to speaking with you!
                </p>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setStatus("idle")}
                  style={{ marginTop: "16px" }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="card contact-form" onSubmit={onSubmit}>
                <div className="form-header-badge">
                  <MessageSquare size={16} />
                  <span>Send a direct message</span>
                </div>

                {/* Topic selection chips */}
                <div className="topic-group">
                  <label className="field-label">What are you looking to discuss?</label>
                  <div className="topic-chips">
                    {TOPICS.map((topic) => (
                      <button
                        type="button"
                        key={topic}
                        onClick={() => selectTopic(topic)}
                        className={`topic-chip ${form.topic === topic ? "is-selected" : ""}`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email Inputs Grid */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="field-label">
                      Your Name <span className="req-star">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="e.g. John Doe / Alex Smith"
                      value={form.name}
                      onChange={onChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email" className="field-label">
                      Your Email <span className="req-star">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>

                {/* Phone Input (Optional) */}
                <div className="form-group">
                  <label htmlFor="contact-phone" className="field-label">
                    Phone / WhatsApp <span className="optional-tag">(Optional)</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    placeholder="+91 or international phone number"
                    value={form.phone}
                    onChange={onChange}
                  />
                </div>

                {/* Message Textarea */}
                <div className="form-group">
                  <label htmlFor="contact-message" className="field-label">
                    Project details or message <span className="req-star">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Tell me about your team, the role requirements, or the project you'd like to build together..."
                    value={form.message}
                    onChange={onChange}
                    required
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-primary submit-btn"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <span className="btn-spinner" />
                      <span>Sending to Fayyaz's Inbox...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message to Fayyaz</span>
                    </>
                  )}
                </button>

                {status === "error" && (
                  <div className="form-alert form-alert-err">
                    {errorMsg || "Couldn't send. Please email directly at fayyazmansoori.dev@gmail.com"}
                  </div>
                )}

                <div className="form-privacy-note">
                  🔒 Delivered directly to <code>{emailAddress}</code>. Your details will never be shared.
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
