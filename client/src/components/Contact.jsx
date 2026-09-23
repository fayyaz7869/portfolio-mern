import { useState } from "react";
import { API_BASE } from "../config.js";

const EMPTY = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setForm(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container contact-grid">
        <div>
          <span className="eyebrow">05 · Contact</span>
          <h2 className="section-heading">Let's build something</h2>
          <p>
            Open to Software Engineer roles and full-stack opportunities.
            Message me here or reach out directly.
          </p>
          <div className="contact-links">
            <a href="mailto:mansoorifayyaz256@gmail.com">mansoorifayyaz256@gmail.com</a>
            <a href="tel:+918827479973">+91 88274 79973</a>
            <a href="https://github.com/fayyaz7869" target="_blank" rel="noreferrer">
              github.com/fayyaz7869
            </a>
          </div>
        </div>

        <form className="card contact-form" onSubmit={onSubmit}>
          <label>
            Name
            <input name="name" value={form.name} onChange={onChange} required />
          </label>
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={onChange} required />
          </label>
          <label>
            Message
            <textarea name="message" rows={4} value={form.message} onChange={onChange} required />
          </label>
          <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
          {status === "sent" && <p className="form-note form-note-ok">Message sent — thank you.</p>}
          {status === "error" && (
            <p className="form-note form-note-err">
              Couldn't send that. Make sure the server is running, or email me directly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
