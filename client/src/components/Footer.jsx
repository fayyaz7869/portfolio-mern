import { ArrowUp, Mail, Phone, Heart } from "lucide-react";
import GithubIcon from "./GithubIcon.jsx";

export default function Footer({ onOpenResume }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-wrap">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-mark">FM<span>.</span></span>
            <p className="footer-tagline">
              Fayyaz Mansoori · Full Stack Developer (MERN Stack & Core Java)
            </p>
            <p className="footer-location">Indore, Madhya Pradesh, India</p>
          </div>

          <div className="footer-links-group">
            <div className="footer-col">
              <span className="footer-col-title">Navigation</span>
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#experience">Experience</a>
              <a href="#contact">Contact</a>
            </div>

            <div className="footer-col">
              <span className="footer-col-title">Connect</span>
              <a href="mailto:fayyazmansoori.dev@gmail.com">fayyazmansoori.dev@gmail.com</a>
              <a href="https://github.com/fayyaz7869" target="_blank" rel="noreferrer">
                GitHub @fayyaz7869
              </a>
              <a href="https://wa.me/918827479973" target="_blank" rel="noreferrer">
                WhatsApp Chat
              </a>
              <button
                type="button"
                onClick={onOpenResume}
                className="footer-resume-link"
              >
                View Tech Resume
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            © {new Date().getFullYear()} Fayyaz Mansoori. Built with React.js, Express & MongoDB.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="footer-back-to-top"
            aria-label="Back to top of page"
            title="Back to top"
          >
            <span>Top</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
