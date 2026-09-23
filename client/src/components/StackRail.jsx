import { useEffect, useState } from "react";

const LAYERS = [
  { id: "about", label: "M", title: "MongoDB — the story" },
  { id: "skills", label: "E", title: "Express — how it's built" },
  { id: "projects", label: "R", title: "React — what's shipped" },
  { id: "experience", label: "N", title: "Node — where it runs" },
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
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="stack-rail" aria-label="Section progress, mapped to the MERN stack">
      <div className="stack-rail-track">
        {LAYERS.map((layer) => (
          <a
            key={layer.id}
            href={`#${layer.id}`}
            className={`stack-node ${active === layer.id ? "is-active" : ""}`}
            title={layer.title}
          >
            <span>{layer.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
