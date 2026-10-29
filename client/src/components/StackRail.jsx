import { useEffect, useState } from "react";

const LAYERS = [
  { id: "about", label: "M", title: "MongoDB · About & Foundations" },
  { id: "skills", label: "E", title: "Express.js · Technical Toolkit" },
  { id: "projects", label: "R", title: "React.js · Shipped Products" },
  { id: "experience", label: "N", title: "Node.js · Journey & Experience" },
  { id: "contact", label: "✉", title: "Connect · Get in Touch" },
];

export default function StackRail() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const sections = LAYERS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -40% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="stack-rail" aria-label="Section progress indicator">
      <div className="stack-rail-track">
        {LAYERS.map((layer) => (
          <a
            key={layer.id}
            href={`#${layer.id}`}
            className={`stack-node ${active === layer.id ? "is-active" : ""}`}
            title={layer.title}
            aria-label={layer.title}
          >
            <span>{layer.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
