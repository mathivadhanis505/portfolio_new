import Reveal from "./Reveal";

const Experience = () => {
  return (
    <div className="section-shell">
      <div className="section-inner">
        <span className="section-kicker">the journey so far</span>
        <Reveal as="h2" className="mb-16 text-4xl font-semibold text-white">
          Experience
        </Reveal>

        <div className="max-w-3xl">
          <Reveal className="relative border-l border-white/10 pl-8">
            <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-purple-400 shadow-[0_0_12px_3px_rgba(167,139,250,0.6)]" />

            <p className="text-sm font-mono text-purple-400">2025 — 2029</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              B.Tech, Computer Science &amp; Engineering
            </h3>
            <p className="mt-1 text-lg text-white/60">
              Indian Institute of Information Technology, Design and
              Manufacturing (IIITDM) Kancheepuram
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-white/50">
              Currently pursuing my undergraduate degree.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default Experience;
