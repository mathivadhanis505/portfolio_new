import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import LineSidebar, { PROJECTS } from "./LineSidebar";
import Reveal from "./Reveal";
import { EASE } from "../lib/motion";

const Projects = () => {
  const [active, setActive] = useState(0);
  const project = PROJECTS[active];

  return (
    <div className="section-shell">
      <div className="section-inner">
        <span className="section-kicker">selected work</span>
        <Reveal as="h2" className="mb-12 text-4xl font-semibold text-white">
          Projects
        </Reveal>

        <div className="flex flex-col gap-12 md:flex-row">
          {/* Project Selector */}
          <Reveal delay={0.1} className="md:w-[280px]">
            <LineSidebar onItemClick={(_, index) => setActive(index)} />
          </Reveal>

          {/* Project Details */}
          <div className="flex-1">
            <Reveal
              as="h3"
              delay={0.2}
              className="mb-6 text-2xl text-white/40"
            >
              description
            </Reveal>

            <AnimatePresence mode="wait">
              <motion.p
  key={active}
  initial={{ opacity: 0, y: 14 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -14 }}
  transition={{ duration: 0.45, ease: EASE }}
  className="max-w-3xl text-3xl font-bold leading-snug text-white md:text-4xl"
>
  {project.description}
</motion.p>
            </AnimatePresence>

            {/* Tech Stack */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                }}
                className="mt-10 flex flex-wrap gap-3"
              >
                {project.tech.map((item) => (
                  <motion.span
                    key={item}
                    variants={{
                      hidden: { opacity: 0, y: 10, scale: 0.95 },
                      show: { opacity: 1, y: 0, scale: 1 },
                    }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-2 text-sm text-purple-300"
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Project Preview Box */}
            {/* Project Preview */}
<Reveal
  delay={0.25}
  className="mt-12 overflow-hidden rounded-2xl border border-white/10"
>
  <AnimatePresence mode="wait">
    <motion.img
      key={active}
      src={project.preview}
      alt={project.title}
      initial={{ opacity: 0, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="w-full rounded-2xl object-cover"
    />
  </AnimatePresence>
</Reveal>

{/* Project Links */}
<div className="mt-6 flex gap-4">
  <a
    href={project.github}
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-lg border border-white/15 px-5 py-2 text-sm text-white transition hover:border-purple-400 hover:text-purple-300"
  >
    GitHub ↗
  </a>

  <a
    href={project.demo}
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-lg bg-purple-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-purple-400"
  >
    Live Demo ↗
  </a>
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
