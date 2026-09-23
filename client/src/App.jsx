import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import StackRail from "./components/StackRail.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Experience from "./components/Experience.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="page-shell">
        <StackRail />
        <main>
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
      </div>
      <Footer />
    </>
  );
}
