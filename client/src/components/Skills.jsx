const GROUPS = [
  { title: "Languages", items: ["Core Java", "JavaScript"] },
  { title: "Frontend", items: ["React.js", "HTML", "CSS", "Bootstrap"] },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "RESTful APIs", "JWT Auth", "Express Middleware", "EJS"],
  },
  { title: "Databases", items: ["MongoDB", "MySQL"] },
  { title: "Tools", items: ["Git", "GitHub", "Postman", "VS Code", "Spring Tool Suite"] },
];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <span className="eyebrow">02 · Skills</span>
        <h2 className="section-heading">What I build with</h2>
        <div className="skills-grid">
          {GROUPS.map((group) => (
            <div className="card skills-card" key={group.title}>
              <h3 className="skills-card-title">{group.title}</h3>
              <div className="skills-tags">
                {group.items.map((item) => (
                  <span className="tag" key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
