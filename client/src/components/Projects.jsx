import { useEffect, useState } from "react";
import fallbackProjects from "../data/projects.js";
import { API_BASE } from "../config.js";

export default function Projects() {
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    fetch(`${API_BASE}/api/projects`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (Array.isArray(data) && data.length) setProjects(data);
      })
      .catch(() => {
        /* backend not running yet — keep the static fallback list */
      });
  }, []);

  return (
    <section id="projects" className="section">
      <div className="container">
        <span className="eyebrow">03 · Projects</span>
        <h2 className="section-heading">Things I've shipped</h2>
        <div className="projects-grid">
          {projects.map((p) => (
            <article className="card project-card" key={p.title}>
              <div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-subtitle">{p.subtitle}</p>
                <p className="project-desc">{p.description}</p>
                <div className="skills-tags project-stack">
                  {p.stack.map((s) => (
                    <span className="tag" key={s}>{s}</span>
                  ))}
                </div>
              </div>
              <div className="project-links">
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer">
                    Live site
                  </a>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noreferrer">
                    {p.live ? "Source" : "GitHub"}
                  </a>
                )}
                {p.githubSecondary && (
                  <a href={p.githubSecondary} target="_blank" rel="noreferrer">
                    {p.githubSecondaryLabel || "Second repo"}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
