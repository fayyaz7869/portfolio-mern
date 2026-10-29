import { FileText, Download, Code2, Database, Server, Award, CheckCircle } from "lucide-react";

export default function About({ onOpenResume }) {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="section-head-wrap">
          <span className="eyebrow">01 · About Me</span>
          <h2 className="section-heading">Disciplined developer with deep full-stack fluency</h2>
        </div>

        <div className="about-grid">
          <div className="about-content-left">
            <p className="about-lead">
              I am a software developer and BCA graduate based in Indore, India. I specialize in architecting
              reliable web products across the entire MERN spectrum — creating intuitive interfaces in React.js
              backed by structured, performant APIs in Node.js and Express.js with MongoDB and MySQL.
            </p>

            <p className="about-body-text">
              During my internship at <strong>Ethara.ai</strong>, I gained hands-on experience building and
              maintaining real-world web applications within an agile team. I followed this up with rigorous,
              project-driven full-stack training under the <strong>InfoBeans Foundation's ITEP program</strong>,
              mastering custom React Hooks, Express middleware architectures, and Git/GitHub collaborative workflows.
            </p>

            <div className="about-strengths-grid">
              <div className="strength-item">
                <Code2 size={20} className="strength-icon text-mint" />
                <div>
                  <h4>Frontend Engineering</h4>
                  <p>React.js, dynamic component design, state management, responsive CSS</p>
                </div>
              </div>

              <div className="strength-item">
                <Server size={20} className="strength-icon text-cyan" />
                <div>
                  <h4>Backend & APIs</h4>
                  <p>Node.js, Express, RESTful endpoints, JWT auth, middleware pipelines</p>
                </div>
              </div>

              <div className="strength-item">
                <Database size={20} className="strength-icon text-amber" />
                <div>
                  <h4>Database Design</h4>
                  <p>MongoDB with Mongoose schemas, MySQL with Sequelize ORM & raw SQL</p>
                </div>
              </div>

              <div className="strength-item">
                <Award size={20} className="strength-icon text-mint" />
                <div>
                  <h4>Core Foundations</h4>
                  <p>Core Java, Object-Oriented Design, data structures, Git version control</p>
                </div>
              </div>
            </div>

            {/* Quick Resume preview trigger */}
            <div className="about-resume-cta-box">
              <div className="about-resume-info">
                <strong>Want to inspect my qualifications and full experience?</strong>
                <span>Review my tech resume directly in your browser or grab a copy.</span>
              </div>
              <div className="about-resume-buttons">
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="btn btn-ghost btn-sm"
                  title="View resume online"
                >
                  <FileText size={15} />
                  <span>Preview Resume</span>
                </button>
                <a
                  href="/resume.pdf"
                  download="Fayyaz_Mansoori_Resume.pdf"
                  className="btn btn-outline btn-sm"
                  title="Download PDF"
                >
                  <Download size={15} />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Key Metrics & Facts */}
          <div className="about-metrics-col">
            <div className="metric-card">
              <span className="metric-title">Degree & College</span>
              <strong className="metric-value">BCA</strong>
              <span className="metric-detail">Renaissance University, Indore · 2026</span>
            </div>

            <div className="metric-card">
              <span className="metric-title">Hands-on Experience</span>
              <strong className="metric-value">Ethara.ai</strong>
              <span className="metric-detail">Associate Software Developer Intern</span>
            </div>

            <div className="metric-card">
              <span className="metric-title">Technical Training</span>
              <strong className="metric-value">ITEP Program</strong>
              <span className="metric-detail">InfoBeans Foundation · Full-Stack Specialization</span>
            </div>

            <div className="metric-card highlight-card">
              <span className="metric-title">Location & Relocation</span>
              <strong className="metric-value">Indore, MP</strong>
              <span className="metric-detail">Open to on-site roles across India & remote worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
