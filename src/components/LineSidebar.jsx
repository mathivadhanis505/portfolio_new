import { useRef, useState, useCallback, useEffect } from "react";
import "./LineSidebar.css";

const FALLOFF_CURVES = {
  linear: p => p,
  smooth: p => p * p * (3 - 2 * p),
  sharp: p => p * p * p,
};

export const PROJECTS = [
  {
    title: "Spotify Vinyl Player",
    description:
      "A full-stack Spotify companion featuring OAuth authentication, live playback synchronization, animated vinyl visuals, artist insights, lyrics, and real-time playback controls through the Spotify Web API.",
    tech: [
      "React",
      "TypeScript",
      "Express",
      "Spotify Web API",
      "OAuth 2.0",
      "Render",
      "Vercel",
    ],
    preview:
      "https://res.cloudinary.com/crqz8dbf/image/upload/v1784622540/Screenshot_2026-07-21_135808_b7cffc.png",
    github: "https://github.com/mathivadhanis505/vinyl",
    demo: "https://www.youtube.com/watch?v=INc94dZiMOU&list=PLDCDI8MNYyQ8&pp=sAgCs",
  },
  {
    title: "GPT-Style Language Model (In Progress)",
    description:
      "Implementing a decoder-only Transformer language model from scratch in PyTorch, building the complete pipeline from tokenization and embeddings to multi-head self-attention, transformer blocks, training, and autoregressive text generation to understand the internals of modern large language models. (in progress)",
    tech: ["Python", "PyTorch", "Jupyter Notebook", "CUDA", "NLP", "Transformers", "Tokenization"],
  },
];

const LineSidebar = ({
  items = PROJECTS,
  accentColor = "#A855F7",
  textColor = "#c4c4c4",
  markerColor = "#6c6c6c",
  showIndex = true,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 30,
  falloff = "smooth",
  markerLength = 60,
  markerGap = 0,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 20,
  fontSize = 1.1,
  smoothing = 100,
  defaultActive = 0,
  onItemClick,
  className = "",
}) => {
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const targetsRef = useRef([]);
  const currentRef = useRef([]);
  const rafRef = useRef(null);
  const lastRef = useRef(0);
  const activeRef = useRef(defaultActive);
  const smoothingRef = useRef(smoothing);

  const [activeIndex, setActiveIndex] = useState(defaultActive);

  activeRef.current = activeIndex;
  smoothingRef.current = smoothing;

  const runFrame = useCallback((now) => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const tau = Math.max(smoothingRef.current, 1) / 1000;
    const k = 1 - Math.exp(-dt / tau);
    let moving = false;

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const target = Math.max(targetsRef.current[i] || 0, activeRef.current === i ? 1 : 0);
      const cur = currentRef.current[i] || 0;
      const next = cur + (target - cur) * k;
      const value = Math.abs(target - next) < 0.0015 ? target : next;
      currentRef.current[i] = value;
      el.style.setProperty("--effect", value.toFixed(4));
      if (Math.abs(target - value) > 0.0015) moving = true;
    });

    rafRef.current = moving ? requestAnimationFrame(runFrame) : null;
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current != null) return;
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  const handlePointerMove = useCallback((e) => {
    const list = listRef.current;
    if (!list) return;
    const rect = list.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const ease = FALLOFF_CURVES[falloff] ?? FALLOFF_CURVES.linear;

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const center = el.offsetTop + el.offsetHeight / 2;
      const dist = Math.abs(y - center);
      targetsRef.current[i] = ease(Math.max(0, 1 - dist / proximityRadius));
    });

    startLoop();
  }, [falloff, proximityRadius, startLoop]);

  const handleLeave = useCallback(() => {
    targetsRef.current = targetsRef.current.map(() => 0);
    startLoop();
  }, [startLoop]);

  useEffect(() => { startLoop(); }, [activeIndex, startLoop]);

  useEffect(() => () => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <nav className={`line-sidebar${showMarker ? " line-sidebar--markers" : ""}${scaleTick ? " line-sidebar--scale-tick" : ""}${className ? ` ${className}` : ""}`}>
      <ul ref={listRef} className="line-sidebar__list" onPointerMove={handlePointerMove} onPointerLeave={handleLeave}>
        {items.map((project, index) => (
          <li
            key={project.title}
            ref={el => itemRefs.current[index] = el}
            className="line-sidebar__item"
            aria-current={activeIndex === index ? "true" : undefined}
            onClick={() => {
              setActiveIndex(index);
              onItemClick?.(project, index);
            }}
          >
            {showMarker && <span className="line-sidebar__marker" />}
            <span className="line-sidebar__label">
              {showIndex && <span className="line-sidebar__index">{String(index + 1).padStart(2, "0")}</span>}
              <span className="line-sidebar__text">{project.title}</span>
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LineSidebar;
