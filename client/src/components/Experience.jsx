import { Briefcase, GraduationCap, Award, Calendar, MapPin, FileText, Download } from "lucide-react";

const EXPERIENCE = [
  {
    role: "Associate Software Developer — Intern",
    org: "Ethara.ai",
    period: "4 Months",
    type: "Internship",
    points: [
      "Contributed to building, debugging, and maintaining modern client-facing web application interfaces.",
      "Collaborated closely with senior developers across code reviews, Git version control branches, and release cycles.",
      "Identified and resolved frontend layout discrepancies and component state bugs, elevating user experience.",
    ],
  },
  {
    role: "Full Stack Trainee — ITEP Program",
    org: "InfoBeans Foundation",
    period: "Intensive Program",
    type: "Training",
    points: [
      "Completed structured, industry-aligned training covering the full MERN stack (MongoDB, Express, React, Node).",
      "Mastered custom React Hooks, component lifecycle, context state, and Express middleware architectures.",
      "Constructed multiple production-pattern applications with Git commit hygiene and Postman API contract testing.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Renaissance University, Indore (M.P.)",
    year: "2023 – 2026",
    status: "Final Year / Graduating 2026",
  },
  {
    degree: "Senior Secondary (Class XII)",
    school: "M.G.N Public H.S. School",
    year: "2022",
    status: "Completed",
  },
  {
    degree: "Secondary School (Class X)",
    school: "Aehmad Noor Memorial H.S. School",
    year: "2020",
    status: "Completed",
  },
];

export default function Experience({ onOpenResume }) {
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <div className="section-head-wrap">
          <span className="eyebrow">04 · Journey & Background</span>
          <h2 className="section-heading">Professional experience and academic milestones</h2>
          <p className="section-subtext">
            A combination of professional software development internship, intensive institutional training,
            and formal computer applications education.
          </p>
        </div>

        <div className="experience-grid">
          {/* Left Column: Work & Training Timeline */}
          <div className="experience-main-col">
            <div className="col-subheading-wrap">
              <Briefcase size={20} className="text-mint" />
              <h3 className="col-subheading">Work Experience & Training</h3>
            </div>

            <div className="timeline-container">
              {EXPERIENCE.map((item, idx) => (
                <div className="timeline-item-card" key={item.role}>
                  <div className="timeline-marker">
                    <span className="marker-dot" />
                    {idx < EXPERIENCE.length - 1 && <span className="marker-line" />}
                  </div>

                  <div className="timeline-item-content card">
                    <div className="timeline-item-header">
                      <div>
                        <h4 className="timeline-role-title">{item.role}</h4>
                        <div className="timeline-org-row">
                          <span className="timeline-org-name">{item.org}</span>
                          {item.period && <span className="timeline-period-pill">{item.period}</span>}
                          <span className="timeline-type-pill">{item.type}</span>
                        </div>
                      </div>
                    </div>

                    <ul className="timeline-points">
                      {item.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Resume banner */}
            <div className="resume-strip-banner card">
              <div className="strip-text">
                <FileText size={22} className="text-cyan" />
                <div>
                  <strong>Need the complete chronological resume?</strong>
                  <p>View the verified PDF with project links and technical references.</p>
                </div>
              </div>
              <div className="strip-actions">
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="btn btn-ghost btn-sm"
                >
                  View Online
                </button>
                <a
                  href="/resume.pdf"
                  download="Fayyaz_Mansoori_Resume.pdf"
                  className="btn btn-primary btn-sm"
                >
                  <Download size={14} />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Education & Achievements */}
          <div className="experience-side-col">
            <div className="col-subheading-wrap">
              <GraduationCap size={20} className="text-cyan" />
              <h3 className="col-subheading">Education</h3>
            </div>

            <div className="education-cards-list">
              {EDUCATION.map((ed) => (
                <div className="card edu-card" key={ed.degree}>
                  <div className="edu-year-badge">
                    <Calendar size={13} />
                    <span>{ed.year}</span>
                  </div>
                  <h4 className="edu-degree">{ed.degree}</h4>
                  <p className="edu-school">{ed.school}</p>
                  <span className="edu-status-tag">{ed.status}</span>
                </div>
              ))}
            </div>

            <div className="col-subheading-wrap" style={{ marginTop: "32px" }}>
              <Award size={20} className="text-amber" />
              <h3 className="col-subheading">Honors & Recognition</h3>
            </div>

            <div className="card achievements-card">
              <div className="achievement-entry">
                <span className="achievement-trophy">🏆</span>
                <div>
                  <strong>"Disciplined & Ideal Student of the Year"</strong>
                  <p>Awarded by M.G.N Public H.S. School for outstanding conduct and academic dedication.</p>
                </div>
              </div>

              <div className="achievement-entry">
                <span className="achievement-trophy">⚽</span>
                <div>
                  <strong>"Man of the Match" Honors</strong>
                  <p>Inter-school football tournament representing school athletic team in championship matches.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
