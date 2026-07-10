import SplitText from "./SplitText";
import PixelCard from "./PixelCard";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <div className="section-shell">
      <div className="section-inner flex flex-col-reverse items-center gap-14 md:flex-row md:justify-between">
        <div className="max-w-xl text-center md:text-left">
          <span className="section-kicker">about me</span>
          <SplitText
            text="Hi, I'm Mathivadhani"
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            delay={30}
            duration={0.7}
            textAlign="left"
            tag="h1"
          />

          <Reveal delay={0.4} y={16}>
            <p className="mt-6 text-lg leading-relaxed text-white/60">
              I like turning random ideas into real projects and figuring
              things out along the way. I'm an aspiring full-stack developer
              who enjoys building modern web applications, experimenting
              with new technologies, and continuously learning. Beyond
              coding, you'll usually find me sketching, grabbing coffee,
              watching movies, or catching an F1 race.
            </p>
          </Reveal>

          <Reveal
            delay={0.55}
            y={16}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 md:justify-start"
          >
            <a
              href="#projects"
              className="rounded-full bg-purple-500 px-7 py-3 text-sm font-medium text-white transition-transform duration-300 ease-out hover:scale-105 active:scale-95"
              style={{ boxShadow: "0 0 25px rgba(168,85,247,0.45)" }}
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors duration-300 hover:border-purple-400/60 hover:bg-white/10"
            >
              Get in Touch
            </a>
          </Reveal>
        </div>

        <Reveal
          delay={0.15}
          y={0}
          duration={0.9}
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <PixelCard
            variant="pink"
            className="h-72 w-56 shrink-0 sm:h-80 sm:w-64"
          >
            <img
              src="https://res.cloudinary.com/crqz8dbf/image/upload/v1783494480/me_iuqubn.jpg"
              alt="Mathivadhani"
              className="absolute inset-0 h-full w-full rounded-[inherit] object-cover"
            />
          </PixelCard>
        </Reveal>
      </div>

      {/* Scroll cue — reinforces the one-section-per-scroll rhythm */}
      <a
        href="#skills"
        aria-label="Scroll to skills section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 transition-colors duration-300 hover:text-white/80 md:flex"
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.3em]">
          scroll
        </span>
        <span className="h-9 w-5 rounded-full border border-white/25 p-1">
          <span className="block h-2 w-full animate-bounce rounded-full bg-white/60" />
        </span>
      </a>
    </div>
  );
}
