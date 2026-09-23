export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} Fayyaz Mansoori</span>
        <span>Built with the MERN stack</span>
      </div>
    </footer>
  );
}
