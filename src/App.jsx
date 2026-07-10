import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import GooeyNav from "./components/GooeyNav";
import DotField from "./components/DotField";

function App() {
  return (
    <div className="relative min-h-screen w-full bg-transparent">
      {/* Single global background — every section is transparent so this
          dot field extends across the entire page instead of being cut
          off behind opaque section backgrounds. */}
      <div className="fixed inset-0 -z-10">
        <DotField
          dotRadius={1.4}
          dotSpacing={16}
          bulgeStrength={55}
          glowRadius={180}
          cursorRadius={480}
          cursorForce={0.1}
          bulgeOnly
          gradientFrom="rgba(168, 85, 247, 0.3)"
          gradientTo="rgba(180, 151, 207, 0.2)"
          glowColor="#120F17"
        />
      </div>

      <header className="fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b border-white/[0.06] bg-[#0B0912]/70 px-3 py-4 backdrop-blur-md md:px-16">
        <a href="#about" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg font-bold text-[#0a0e1a]">
            m
          </span>
          <span className="hidden text-lg font-semibold text-white sm:inline">
            mathivadhani&apos;s portfolio
          </span>
        </a>

        <GooeyNav
          items={[
            { label: "about", href: "#about" },
            { label: "skills", href: "#skills" },
            { label: "projects", href: "#projects" },
            { label: "experience", href: "#experience" },
            { label: "contact", href: "#contact" },
          ]}
          initialActiveIndex={0}
        />
      </header>

      <main>
        <section id="about" className="snap-section">
          <Hero />
        </section>

        <section id="skills" className="snap-section">
          <Skills />
        </section>

        <section id="projects" className="snap-section">
          <Projects />
        </section>

        <section id="experience" className="snap-section">
          <Experience />
        </section>

        <section id="contact" className="snap-section">
          <Contact />
        </section>
      </main>
    </div>
  );
}

export default App;
