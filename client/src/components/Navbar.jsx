const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#top" className="navbar-mark">
          FM<span>.</span>
        </a>
        <nav className="navbar-links">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a href="/resume.pdf" download className="btn btn-ghost navbar-cta">
          Resume
        </a>
      </div>
    </header>
  );
}
