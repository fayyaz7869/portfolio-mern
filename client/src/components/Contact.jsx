import { useState } from "react";
import { Mail, Phone, MapPin, Send, Check, Copy, MessageSquare, Clock, Sparkles, ExternalLink } from "lucide-react";

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
  const [lastSubmitted, setLastSubmitted] = useState(null);

  const emailAddress = "fayyazmansoori.dev@gmail.com";
  const phoneNumber = "+91 88274 79973";
  const web3FormsKey = import.meta.env.VITE_WEB3FORMS_KEY || "";

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

  // Helper links for 1-click direct dispatch
  const getGmailUrl = (data) => {
    const d = data || form;
    const subject = encodeURIComponent(`[Portfolio Lead] ${d.topic} - from ${d.name}`);
    const body = encodeURIComponent(
      `Hi Fayyaz,\n\nName: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone || "N/A"}\nTopic: ${d.topic}\n\nMessage:\n${d.message}`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${subject}&body=${body}`;
  };

  const getMailtoUrl = (data) => {
    const d = data || form;
    const subject = encodeURIComponent(`[Portfolio Lead] ${d.topic} - from ${d.name}`);
    const body = encodeURIComponent(
      `Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone || "N/A"}\nTopic: ${d.topic}\n\nMessage:\n${d.message}`
    );
    return `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  };

  const getWhatsAppUrl = (data) => {
    const d = data || form;
    const text = encodeURIComponent(
      `Hi Fayyaz! I saw your portfolio.\nName: ${d.name} (${d.email})\nTopic: ${d.topic}\nMessage: ${d.message}`
    );
    return `https://wa.me/918827479973?text=${text}`;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    setLastSubmitted({ ...form });

    let sentSuccessfully = false;

    // 1. If Web3Forms Access Key is configured, use its CORS-enabled API
    if (web3FormsKey) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            name: form.name,
            email: form.email,
            phone: form.phone || "Not provided",
            subject: `[Portfolio Lead] ${form.topic} - from ${form.name}`,
            message: form.message,
            from_name: form.name,
          }),
        });
        const data = await res.json();
        if (data.success) {
          sentSuccessfully = true;
        }
      } catch (err) {
        console.warn("Web3Forms API attempt:", err);
      }
    }

    // 2. Concurrently submit via Native HTML Form to hidden iframe (bypasses CORS restrictions)
    try {
      const hiddenForm = document.getElementById("hidden_formsubmit_proxy");
      if (hiddenForm) {
        hiddenForm.submit();
        sentSuccessfully = true;
      }
    } catch (err) {
      console.warn("Form proxy submission:", err);
    }

    // 3. Forward to backend API if configured (e.g. localhost or custom VITE_API_URL)
    const apiUrl = import.meta.env.VITE_API_URL;
    const isLocal =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

    if (apiUrl || isLocal) {
      try {
        const endpoint = apiUrl ? `${apiUrl}/api/contact` : "/api/contact";
        await fetch(endpoint, {
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
        sentSuccessfully = true;
      } catch (err) {
        // Backend offline or unreachable
      }
    }

    // Mark as sent and clear form
    if (sentSuccessfully) {
      setStatus("sent");
      setForm(INITIAL_FORM);
    } else {
      setStatus("error");
      setErrorMsg("Unable to deliver automatically. You can send it directly in 1 click via Gmail or WhatsApp below!");
    }
  };

  return (
    <section id="contact" className="section contact-section">
      {/* Hidden iframe for native form submission that completely bypasses CORS restrictions */}
      <iframe
        name="contact_hidden_iframe"
        id="contact_hidden_iframe"
        style={{ display: "none", width: 0, height: 0, border: 0 }}
        title="Contact Form Dispatcher"
      />

      {/* Hidden Form targeting the hidden iframe */}
      <form
        id="hidden_formsubmit_proxy"
        action={`https://formsubmit.co/${emailAddress}`}
        method="POST"
        target="contact_hidden_iframe"
        style={{ display: "none" }}
      >
        <input type="hidden" name="_subject" value={`[Portfolio Lead] ${form.topic} - from ${form.name}`} />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="name" value={form.name} />
        <input type="hidden" name="email" value={form.email} />
        <input type="hidden" name="phone" value={form.phone} />
        <input type="hidden" name="topic" value={form.topic} />
        <input type="hidden" name="message" value={form.message} />
      </form>

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
                <h3>Message Submitted!</h3>
                <p>
                  Thank you! Your details were dispatched to Fayyaz Mansoori at:
                </p>
                <div className="success-email-highlight">{emailAddress}</div>
                <p className="success-sub">
                  I typically respond within 24 hours. For an immediate direct conversation, feel free to connect on WhatsApp:
                </p>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", marginTop: "12px" }}>
                  {lastSubmitted && (
                    <>
                      <a
                        href={getGmailUrl(lastSubmitted)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost btn-sm"
                      >
                        <ExternalLink size={14} />
                        <span>Open in Gmail Web</span>
                      </a>
                      <a
                        href={getWhatsAppUrl(lastSubmitted)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                      >
                        <span>Chat on WhatsApp</span>
                      </a>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  className="btn btn-outline btn-sm"
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
                      <span>Sending Message...</span>
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
                    <p style={{ marginBottom: "8px", color: "#fca5a5" }}>{errorMsg}</p>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <a
                        href={getGmailUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost btn-sm"
                        style={{ background: "rgba(255,255,255,0.08)" }}
                      >
                        <ExternalLink size={13} />
                        <span>Open in Gmail</span>
                      </a>
                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                      >
                        <span>Send via WhatsApp</span>
                      </a>
                    </div>
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
