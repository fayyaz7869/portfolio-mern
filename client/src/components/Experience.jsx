const EXPERIENCE = [
  {
    role: "Associate Software Developer — Intern",
    org: "Ethara.ai",
    period: "4 months",
    points: [
      "Contributed to developing and maintaining web applications using modern development practices.",
    ],
  },
  {
    role: "Full Stack Trainee — ITEP Program",
    org: "InfoBeans Foundation",
    period: "",
    points: [
      "Completed an intensive full-stack training program covering the MERN stack, Git/GitHub workflows and RESTful API design.",
      "Strengthened React Hooks and Express middleware by building and refactoring multiple practice applications.",
    ],
  },
];

const EDUCATION = [
  { degree: "Bachelor of Computer Applications (BCA)", school: "Renaissance University, Indore (M.P.)", year: "2026" },
  { degree: "Class XII", school: "M.G.N Public H.S. School", year: "2022" },
  { degree: "Class X", school: "Aehmad Noor Memorial H.S. School", year: "2020" },
];

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container experience-grid">
        <div>
          <span className="eyebrow">04 · Experience</span>
          <h2 className="section-heading">Where I've worked and trained</h2>
          <div className="timeline">
            {EXPERIENCE.map((item) => (
              <div className="timeline-item" key={item.role}>
                <h3 className="timeline-role">{item.role}</h3>
                <p className="timeline-org">
                  {item.org}{item.period && ` · ${item.period}`}
                </p>
                <ul>
                  {item.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="side-title">Education</h3>
          {EDUCATION.map((ed) => (
            <div className="edu-item" key={ed.degree}>
              <strong>{ed.degree}</strong>
              <span>{ed.school}</span>
              <span className="edu-year">{ed.year}</span>
            </div>
          ))}

          <h3 className="side-title" style={{ marginTop: 34 }}>Achievements</h3>
          <ul className="achieve-list">
            <li>"Disciplined and Ideal Student of the Year" — 12th grade</li>
            <li>"Man of the Match" — inter-school football tournament</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
