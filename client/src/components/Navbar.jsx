import { useState, useEffect } from "react";
import { FileText, Download, Menu, X, ArrowUpRight } from "lucide-react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="container navbar-inner">
        <a href="#top" className="navbar-mark">
          <span className="navbar-mark-text">FM</span>
          <span className="navbar-mark-dot" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Resume CTAs */}
        <div className="navbar-cta-group">
          <button
            type="button"
            onClick={onOpenResume}
            className="btn btn-ghost navbar-resume-btn"
            title="Preview resume without downloading"
          >
            <FileText size={15} />
            <span>Resume</span>
          </button>
          <a
            href="/resume.pdf"
            download="Fayyaz_Mansoori_Resume.pdf"
            className="navbar-icon-download"
            title="Direct download resume PDF"
          >
            <Download size={15} />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className="mobile-nav-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-links">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="mobile-nav-link"
                onClick={closeMobile}
              >
                <span>{link.label}</span>
                <ArrowUpRight size={16} />
              </a>
            ))}
          </div>

          <div className="mobile-drawer-actions">
            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={() => {
                closeMobile();
                onOpenResume();
              }}
            >
              <FileText size={16} />
              <span>Preview Resume</span>
            </button>
            <a
              href="/resume.pdf"
              download="Fayyaz_Mansoori_Resume.pdf"
              className="btn btn-ghost w-full"
              onClick={closeMobile}
            >
              <Download size={16} />
              <span>Download PDF File</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
