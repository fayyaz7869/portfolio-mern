import { useEffect, useState } from "react";
import fallbackProjects from "../data/projects.js";
import { ExternalLink, Layers, Server, Sparkles, FolderGit2 } from "lucide-react";
import GithubIcon from "./GithubIcon.jsx";

const FILTER_TABS = [
  { id: "all", label: "All Projects" },
  { id: "mern", label: "MERN Stack" },
  { id: "backend", label: "Backend & APIs" },
  { id: "java", label: "Core Java" },
];

const BACKEND_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? ""
    : "https://portfolio-mern-n2ct.onrender.com");

export default function Projects() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const endpoint = `${BACKEND_URL}/api/projects`;
    fetch(endpoint)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          // Merge category tag from fallback if backend doesn't store category yet
          const enhanced = data.map((item) => {
            const found = fallbackProjects.find((f) => f.title === item.title);
            return { ...item, category: item.category || (found ? found.category : "mern") };
          });
          setProjects(enhanced);
        }
      })
      .catch(() => {
        /* Backend offline — keep static list */
      });
  }, []);

  const filteredProjects = activeTab === "all"
    ? projects
    : projects.filter((p) => p.category === activeTab);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="section-head-wrap">
          <span className="eyebrow">
            <Sparkles size={14} className="inline-icon" /> 03 · Featured Work
          </span>
          <h2 className="section-heading">Shipped projects and real-world architectures</h2>
          <p className="section-subtext">
            Each project demonstrates clean separation of concerns, modern authentication patterns,
            relational or document data modelling, and production deployments.
          </p>

          {/* Interactive Filter Pills */}
          <div className="project-tabs">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`project-tab-btn ${activeTab === tab.id ? "is-active" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((p) => (
            <article className={`card project-card ${p.featured ? "is-featured" : ""}`} key={p.title}>
              <div className="project-card-top">
                <div className="project-badge-row">
                  <span className="project-category-tag">
                    {p.category === "mern"
                      ? "MERN Stack"
                      : p.category === "backend"
                      ? "Backend API"
                      : "Core Java"}
                  </span>
                  {p.featured && <span className="featured-pill">Featured</span>}
                </div>

                <h3 className="project-title">{p.title}</h3>
                <p className="project-subtitle">{p.subtitle}</p>
                <p className="project-desc">{p.description}</p>
              </div>

              <div className="project-card-bottom">
                <div className="skills-tags project-stack">
                  {p.stack.map((s) => (
                    <span className="tag" key={s}>
                      {s}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn primary-link"
                    >
                      <ExternalLink size={15} />
                      <span>Live Site</span>
                    </a>
                  )}

                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn"
                    >
                      <GithubIcon size={15} />
                      <span>{p.live ? "Source Code" : "GitHub Repo"}</span>
                    </a>
                  )}

                  {p.githubSecondary && (
                    <a
                      href={p.githubSecondary}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn"
                    >
                      <Server size={15} />
                      <span>{p.githubSecondaryLabel || "Backend Repo"}</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
