import { useEffect, useState } from "react";
import profile from "../assets/profile.jpg";

const LINE = `const dev = { name: "Fayyaz Mansoori", stack: "MERN", base: "Indore, IN" };`;

export default function Hero() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(LINE.slice(0, i));
      if (i >= LINE.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="hero">
      <div className="hero-copy">
        <span className="eyebrow">Full stack developer · MongoDB, Express, React, Node</span>
        <h1 className="hero-title">
          I build the whole stack, not just the parts that show.
        </h1>
        <p className="hero-sub">
          BCA graduate based in Indore, shipping full-stack applications end to end —
          React on the frontend, Express and Node underneath, MongoDB or MySQL holding
          the data. Four self-built projects and counting.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">View projects</a>
          <a href="/resume.pdf" download className="btn btn-ghost">Download resume</a>
        </div>
        <div className="hero-terminal" aria-hidden="true">
          <div className="hero-terminal-bar">
            <span /><span /><span />
          </div>
          <code>
            <span className="hero-terminal-prompt">&gt;</span> {typed}
            <span className="hero-terminal-cursor" />
          </code>
        </div>
      </div>

      <div className="hero-photo-wrap">
        <div className="hero-photo-frame">
          <img src={profile} alt="Portrait of Fayyaz Mansoori" />
        </div>
        <div className="hero-photo-caption">
          <span className="tag">Indore, MP</span>
        </div>
      </div>
    </section>
  );
}
