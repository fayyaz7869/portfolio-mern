import { useEffect, useState } from "react";
import profile from "../assets/profile.jpg";
import { FileText, Download, ArrowRight, Terminal as TerminalIcon, Sparkles } from "lucide-react";

const CODE_LINES = [
  'const dev = {',
  '  name: "Fayyaz Mansoori",',
  '  role: "MERN Stack Developer",',
  '  skills: ["React", "Node.js", "Express", "MongoDB", "Core Java"],',
  '  location: "Indore, MP, India",',
  '  status: "Open to Software Engineer roles"',
  '};',
];

export default function Hero({ onOpenResume }) {
  const [typedLineIndex, setTypedLineIndex] = useState(0);
  const [typedCharIndex, setTypedCharIndex] = useState(0);

  useEffect(() => {
    if (typedLineIndex < CODE_LINES.length) {
      const currentLine = CODE_LINES[typedLineIndex];
      if (typedCharIndex < currentLine.length) {
        const timeout = setTimeout(() => {
          setTypedCharIndex((prev) => prev + 1);
        }, 16);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setTypedLineIndex((prev) => prev + 1);
          setTypedCharIndex(0);
        }, 80);
        return () => clearTimeout(timeout);
      }
    }
  }, [typedLineIndex, typedCharIndex]);

  return (
    <section id="top" className="hero-section">
      <div className="container hero-container">
        {/* Left Column: Hero Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-pulse" />
            <span className="hero-badge-text">Available for Software Engineer Roles · Full-Stack & Frontend</span>
          </div>

          <h1 className="hero-headline">
            Crafting scalable full-stack applications with the <span className="text-gradient">MERN Stack</span>.
          </h1>

          <p className="hero-description">
            Hi, I'm <strong className="text-white">Fayyaz Mansoori</strong> — a BCA graduate based in Indore.
            I build end-to-end web products from robust RESTful APIs in Node & Express to reactive,
            fast frontends in React.js and reliable data schemas in MongoDB & MySQL.
          </p>

          {/* Action CTAs */}
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              <span>View Projects</span>
              <ArrowRight size={16} />
            </a>

            <button
              type="button"
              onClick={onOpenResume}
              className="btn btn-ghost hero-resume-preview-btn"
              title="Preview resume directly in your browser without download"
            >
              <FileText size={16} />
              <span>View Resume</span>
            </button>

            <a
              href="/resume.pdf"
              download="Fayyaz_Mansoori_Resume.pdf"
              className="btn btn-outline"
              title="Download resume PDF to your system"
            >
              <Download size={16} />
              <span>Download PDF</span>
            </a>
          </div>

          {/* Handcrafted Terminal Window */}
          <div className="hero-terminal">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <span className="terminal-title">fayyaz@portfolio: ~/developer.ts</span>
              <TerminalIcon size={14} className="terminal-icon" />
            </div>

            <div className="terminal-body">
              <pre className="terminal-code">
                {CODE_LINES.slice(0, typedLineIndex).map((line, idx) => (
                  <div key={idx} className="code-line">
                    <span className="line-num">{idx + 1}</span>
                    <span className="line-text">{line}</span>
                  </div>
                ))}
                {typedLineIndex < CODE_LINES.length && (
                  <div className="code-line">
                    <span className="line-num">{typedLineIndex + 1}</span>
                    <span className="line-text">
                      {CODE_LINES[typedLineIndex].slice(0, typedCharIndex)}
                      <span className="terminal-cursor" />
                    </span>
                  </div>
                )}
              </pre>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Photo Card */}
        <div className="hero-media">
          <div className="profile-card-wrapper">
            <div className="profile-ambient-glow" />
            <div className="profile-card">
              <div className="profile-img-frame">
                <img src={profile} alt="Fayyaz Mansoori - Full Stack Developer" className="profile-img" />
              </div>

              <div className="profile-card-meta">
                <div className="meta-info">
                  <span className="meta-name">Fayyaz Mansoori</span>
                  <span className="meta-role">Full Stack / MERN Developer</span>
                </div>
                <div className="meta-tag">
                  <span>Indore, MP</span>
                </div>
              </div>

              {/* Quick stats banner inside card */}
              <div className="profile-card-chips">
                <div className="chip-item">
                  <span className="chip-num">4+</span>
                  <span className="chip-label">Shipped Projects</span>
                </div>
                <div className="chip-divider" />
                <div className="chip-item">
                  <span className="chip-num">ITEP</span>
                  <span className="chip-label">InfoBeans Trained</span>
                </div>
                <div className="chip-divider" />
                <div className="chip-item">
                  <span className="chip-num">BCA</span>
                  <span className="chip-label">2026 Grad</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
