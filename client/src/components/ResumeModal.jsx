import { useEffect } from "react";
import { Download, ExternalLink, X, FileText, CheckCircle2, Briefcase, GraduationCap } from "lucide-react";

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="resume-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="resume-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="resume-modal-header">
          <div className="resume-modal-title-group">
            <div className="resume-modal-icon-badge">
              <FileText size={20} className="resume-modal-icon" />
            </div>
            <div>
              <div className="resume-modal-title-row">
                <h3 className="resume-modal-title">Fayyaz Mansoori — Resume</h3>
                <span className="resume-status-badge">Available to hire</span>
              </div>
              <p className="resume-modal-sub">MERN Stack Developer · Indore, India · 2026 BCA Graduate</p>
            </div>
          </div>

          <div className="resume-modal-actions">
            <a
              href="/resume.pdf"
              download="Fayyaz_Mansoori_Resume.pdf"
              className="btn btn-primary resume-action-btn"
              title="Download PDF directly to your device"
            >
              <Download size={16} />
              <span>Download PDF</span>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost resume-action-btn"
              title="Open full PDF in a new tab"
            >
              <ExternalLink size={16} />
              <span>Open Tab</span>
            </a>
            <button
              onClick={onClose}
              className="resume-close-btn"
              aria-label="Close resume viewer"
              title="Close (Esc)"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body / PDF Viewer */}
        <div className="resume-modal-body">
          <div className="resume-iframe-wrap">
            <iframe
              src="/resume.pdf#toolbar=1&navpanes=0"
              title="Fayyaz Mansoori Resume PDF"
              className="resume-iframe"
            />
          </div>

          {/* Quick Summary Strip for Recruiters */}
          <div className="resume-quick-strip">
            <div className="resume-quick-item">
              <Briefcase size={16} className="text-accent" />
              <span>
                <strong>Experience:</strong> Associate Software Dev Intern @ Ethara.ai · InfoBeans ITEP
              </span>
            </div>
            <div className="resume-quick-item">
              <GraduationCap size={16} className="text-accent" />
              <span>
                <strong>Education:</strong> BCA (Renaissance Univ, Indore)
              </span>
            </div>
            <div className="resume-quick-item">
              <CheckCircle2 size={16} className="text-accent" />
              <span>
                <strong>Core Stack:</strong> MongoDB, Express.js, React.js, Node.js, Core Java
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
