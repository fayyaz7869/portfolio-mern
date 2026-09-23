export default function About() {
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <div>
          <span className="eyebrow">01 · About</span>
          <h2 className="section-heading">Graduate developer, comfortable across the stack</h2>
        </div>
        <div className="about-body">
          <p>
            I'm a BCA graduate working across full-stack web development —
            React.js on the frontend, Node.js and Express.js on the backend,
            with MongoDB and MySQL handling the data layer. I've built four
            projects from scratch, including ServeConnect, a role-based NGO
            management platform with JWT authentication.
          </p>
          <p style={{ marginTop: 18 }}>
            I completed a software development internship at Ethara.ai and
            went through structured full-stack training with the InfoBeans
            Foundation's ITEP program, where I sharpened my React Hooks and
            Express middleware skills by building and refactoring practice
            applications. Every project is version-controlled through Git and
            GitHub. I'm now looking to start my career as a Software Engineer.
          </p>
          <div className="about-facts">
            <div>
              <strong>BCA</strong>
              <span>Renaissance University, Indore — 2026</span>
            </div>
            <div>
              <strong>4+</strong>
              <span>self-built projects shipped</span>
            </div>
            <div>
              <strong>Indore, MP</strong>
              <span>open to relocation / remote</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
