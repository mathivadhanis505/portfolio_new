import { useEffect, useRef, useState } from "react";

const GooeyNav = ({ items = [], initialActiveIndex = 0 }) => {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const isClickScrolling = useRef(false);

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance, i, total) => {
    const angle = ((360 + noise(8)) / total) * i * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i, total, colors) => {
    const d = [60, 8];
    const r = 90;
    const t = 200 + noise(250);
    const rotate = noise(r / 10);
    return {
      start: getXY(d[0], total - i, total),
      end: getXY(d[1] + noise(7), total - i, total),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const makeParticles = (element) => {
    const particleCount = 12;
    const colors = [1, 2, 3, 4];
    for (let i = 0; i < particleCount; i++) {
      const p = createParticle(i, particleCount, colors);
      setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.className = "gooey-particle";
        particle.style.setProperty("--start-x", `${p.start[0]}px`);
        particle.style.setProperty("--start-y", `${p.start[1]}px`);
        particle.style.setProperty("--end-x", `${p.end[0]}px`);
        particle.style.setProperty("--end-y", `${p.end[1]}px`);
        particle.style.setProperty("--time", `${p.time}ms`);
        particle.style.setProperty("--scale", `${p.scale}`);
        particle.style.setProperty("--color", `var(--gooey-color-${p.color})`);
        particle.style.setProperty("--rotate", `${p.rotate}deg`);
        point.className = "gooey-point";
        particle.appendChild(point);
        element.appendChild(particle);
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {}
        }, p.time);
      }, 30);
    }
  };

  const updateEffectPosition = (element) => {
    if (!containerRef.current || !filterRef.current || !textRef.current || !element) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.left - containerRect.left}px`,
      top: `${pos.top - containerRect.top}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };

  const scrollToSection = (href) => {
    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (!target) return;
    const headerOffset = 96;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    isClickScrolling.current = true;
    window.scrollTo({ top, behavior: "smooth" });
    window.setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  };

  const handleClick = (e, index, href) => {
    e.preventDefault();
    const liEl = e.currentTarget.closest("li");
    setActiveIndex(index);
    updateEffectPosition(liEl);

    if (filterRef.current) {
      filterRef.current.querySelectorAll(".gooey-particle").forEach((p) => filterRef.current.removeChild(p));
      makeParticles(filterRef.current);
    }
    textRef.current?.classList.remove("active");
    void textRef.current?.offsetWidth;
    textRef.current?.classList.add("active");

    scrollToSection(href);
  };

  useEffect(() => {
    if (!navRef.current) return;
    const activeLi = navRef.current.querySelectorAll("li")[activeIndex];
    if (activeLi) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add("active");
    }
  }, [activeIndex]);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(() => {
      const li = navRef.current?.querySelectorAll("li")[activeIndex];
      if (li) updateEffectPosition(li);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [activeIndex]);

  useEffect(() => {
    const sectionEls = items
      .map((item) => document.getElementById(item.href.replace("#", "")))
      .filter(Boolean);

    if (sectionEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const id = visible[0].target.id;
          const index = items.findIndex((item) => item.href === `#${id}`);
          if (index !== -1) setActiveIndex(index);
        }
      },
      { threshold: [0.3, 0.5, 0.7], rootMargin: "-100px 0px -40% 0px" }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    /*
     * FIX: The gooey effect requires that the blob elements (.gooey-effect)
     * live INSIDE the same element that has filter:url(#gooey-goo-filter).
     * Previously, the blob spans were siblings OUTSIDE the <nav> with the filter,
     * so the SVG goo filter never applied to them.
     *
     * Solution: wrap everything in a single container that gets the SVG filter.
     * The nav items use z-index:10, the blobs are z-index:1 (below the text).
     */
    <div
      className="gooey-nav-container relative"
      ref={containerRef}
      style={{ filter: "url(#gooey-goo-filter)", transform: "translateZ(0)", isolation: "isolate" }}
    >
      <style>{`
        .gooey-nav-container {
          --gooey-color-1: #a78bfa;
          --gooey-color-2: #c084fc;
          --gooey-color-3: #818cf8;
          --gooey-color-4: #8b5cf6;
        }
        .gooey-effect {
          position: absolute;
          z-index: 1;
          pointer-events: none;
          border-radius: 9999px;
          background: #8b5cf6;
          box-shadow: 0 0 20px 4px rgba(167, 139, 250, 0.55);
          transition:
            left 0.4s cubic-bezier(0.4, 0, 0.2, 1),
            top 0.4s cubic-bezier(0.4, 0, 0.2, 1),
            width 0.4s cubic-bezier(0.4, 0, 0.2, 1),
            height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .gooey-effect.text {
          background: transparent;
          box-shadow: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 14px;
          opacity: 0;
          z-index: 20;
          transition:
            opacity 0.2s ease,
            left 0.4s cubic-bezier(0.4, 0, 0.2, 1),
            top 0.4s cubic-bezier(0.4, 0, 0.2, 1),
            width 0.4s,
            height 0.4s;
        }
        .gooey-effect.text.active {
          opacity: 1;
        }
        .gooey-particle {
          position: absolute;
          top: calc(50% - 10px);
          left: calc(50% - 10px);
          width: 20px;
          height: 20px;
          animation: gooey-particle var(--time) ease 1 -350ms;
        }
        .gooey-point {
          display: block;
          width: 20px;
          height: 20px;
          border-radius: 9999px;
          background: var(--color);
          animation: gooey-point var(--time) ease 1 -350ms;
        }
        @keyframes gooey-particle {
          0%   { transform: rotate(0deg) translate(var(--start-x), var(--start-y)); opacity: 1; }
          70%  { transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2)); opacity: 1; }
          100% { transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5)); opacity: 0; }
        }
        @keyframes gooey-point {
          0%   { transform: scale(0); opacity: 0; }
          38%  { opacity: 1; }
          65%  { transform: scale(var(--scale)); opacity: 1; }
          100% { transform: scale(0); opacity: 0; }
        }
      `}</style>

      {/* FIX: The purple sliding pill blob must be INSIDE this filtered container */}
      <span className="gooey-effect" ref={filterRef} />

      <nav className="flex items-center justify-center">
        <ul
          ref={navRef}
          className="relative flex items-center gap-0.5 rounded-full bg-[#131725]/80 border border-white/10 backdrop-blur-md px-1 py-1 sm:gap-1 sm:px-1.5 sm:py-1.5"
        >
          {items.map((item, index) => (
            <li
              key={item.label}
              className={`relative z-10 px-2.5 py-1.5 text-xs rounded-full cursor-pointer select-none transition-colors duration-300 sm:px-4 sm:py-2 sm:text-sm ${
                activeIndex === index ? "text-white" : "text-white/60 hover:text-white/90"
              }`}
            >
              <a href={item.href} onClick={(e) => handleClick(e, index, item.href)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* FIX: Text overlay also inside filtered container, z-index above items */}
      <span className="gooey-effect text" ref={textRef} />

      {/* SVG filter definition — position:absolute so it takes no layout space */}
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <defs>
          <filter id="gooey-goo-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default GooeyNav;