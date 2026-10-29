import { Code, Layout, Server, Database, Wrench, ShieldCheck } from "lucide-react";

const SKILL_CATEGORIES = [
  {
    title: "Programming Languages",
    icon: Code,
    color: "text-mint",
    skills: [
      { name: "JavaScript (ES6+)", level: "Advanced" },
      { name: "Core Java", level: "Proficient" },
      { name: "HTML5 & Modern CSS", level: "Advanced" },
      { name: "SQL", level: "Proficient" },
    ],
  },
  {
    title: "Frontend Engineering",
    icon: Layout,
    color: "text-cyan",
    skills: [
      { name: "React.js", level: "Advanced" },
      { name: "React Hooks & State", level: "Advanced" },
      { name: "Responsive UI Design", level: "Proficient" },
      { name: "Bootstrap 5", level: "Proficient" },
      { name: "Vite & Tooling", level: "Proficient" },
    ],
  },
  {
    title: "Backend & Systems",
    icon: Server,
    color: "text-amber",
    skills: [
      { name: "Node.js", level: "Advanced" },
      { name: "Express.js", level: "Advanced" },
      { name: "RESTful API Architecture", level: "Advanced" },
      { name: "JWT Authentication", level: "Proficient" },
      { name: "Express Middleware", level: "Advanced" },
      { name: "EJS Templating", level: "Proficient" },
    ],
  },
  {
    title: "Databases & ORMs",
    icon: Database,
    color: "text-mint",
    skills: [
      { name: "MongoDB", level: "Advanced" },
      { name: "Mongoose ODM", level: "Advanced" },
      { name: "MySQL", level: "Proficient" },
      { name: "Sequelize ORM", level: "Proficient" },
      { name: "JDBC (Java)", level: "Proficient" },
    ],
  },
  {
    title: "Tools & Developer Workflow",
    icon: Wrench,
    color: "text-cyan",
    skills: [
      { name: "Git & GitHub", level: "Daily Workflow" },
      { name: "Postman API Testing", level: "Proficient" },
      { name: "VS Code", level: "Primary IDE" },
      { name: "Spring Tool Suite", level: "Proficient" },
      { name: "Render & Deployment", level: "Proficient" },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <div className="section-head-wrap">
          <span className="eyebrow">02 · Technical Toolkit</span>
          <h2 className="section-heading">Technologies and engineering competencies</h2>
          <p className="section-subtext">
            My primary stack revolves around JavaScript across the entire lifecycle, combined with strong
            foundations in Core Java and relational/document databases.
          </p>
        </div>

        <div className="skills-grid">
          {SKILL_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div className="card skill-category-card" key={cat.title}>
                <div className="skill-cat-header">
                  <div className="skill-cat-icon-wrap">
                    <Icon size={18} className={cat.color} />
                  </div>
                  <h3 className="skill-cat-title">{cat.title}</h3>
                </div>

                <div className="skill-items-list">
                  {cat.skills.map((s) => (
                    <div className="skill-item-badge" key={s.name}>
                      <span className="skill-name">{s.name}</span>
                      <span className="skill-level">{s.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
