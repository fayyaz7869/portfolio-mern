import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import StackRail from "./components/StackRail.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Experience from "./components/Experience.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ResumeModal from "./components/ResumeModal.jsx";

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const openResume = () => setIsResumeOpen(true);
  const closeResume = () => setIsResumeOpen(false);

  return (
    <>
      <Navbar onOpenResume={openResume} />
      <Hero onOpenResume={openResume} />
      <div className="page-shell">
        <StackRail />
        <main>
          <About onOpenResume={openResume} />
          <Skills />
          <Projects />
          <Experience onOpenResume={openResume} />
          <Contact />
        </main>
      </div>
      <Footer onOpenResume={openResume} />

      {/* Global Interactive Resume Modal with embedded PDF viewer */}
      <ResumeModal isOpen={isResumeOpen} onClose={closeResume} />
    </>
  );
}
