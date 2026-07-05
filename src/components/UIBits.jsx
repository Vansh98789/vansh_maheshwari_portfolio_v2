import { useEffect, useRef, useState } from "react";

/* Animated number that counts up when in view */
export function Counter({ end, suffix = "", duration = 1600, decimals = 0 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now) => {
              const p = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(end * eased);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);
  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* Typewriter that cycles through phrases */
export function Typewriter({ phrases, speed = 55, pause = 1400 }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = phrases[i % phrases.length];
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setI((v) => v + 1);
      return;
    }
    const t = setTimeout(() => {
      if (deleting) setText(text.slice(0, -1));
      else setText(current.slice(0, text.length + 1));
    }, deleting ? 30 : speed);
    return () => clearTimeout(t);
  }, [text, deleting, i, phrases, speed, pause]);
  return (
    <span className="font-mono">
      {text}
      <span className="inline-block w-[2px] h-[1em] bg-[#F4B961] align-middle ml-1 animate-pulse" />
    </span>
  );
}

/* Scroll progress bar at top of page */
export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#F4B961] via-[#F4B961] to-[#8b5cf6] transition-transform duration-100"
        style={{ transform: `scaleX(${p})`, transformOrigin: "left" }}
      />
    </div>
  );
}

/* Glow cursor (desktop only) */
export function GlowCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e) => {
      pos.current.tx = e.clientX;
      pos.current.ty = e.clientY;
      if (dot.current)
        dot.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
    };
    let raf;
    const loop = () => {
      pos.current.x += (pos.current.tx - pos.current.x) * 0.18;
      pos.current.y += (pos.current.ty - pos.current.y) * 0.18;
      if (ring.current)
        ring.current.style.transform = `translate3d(${pos.current.x - 18}px, ${pos.current.y - 18}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", move);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
    };
  }, []);
  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="hidden md:block fixed top-0 left-0 w-9 h-9 rounded-full border border-[#F4B961]/50 pointer-events-none z-[90] mix-blend-difference"
        style={{ transition: "width 0.2s, height 0.2s, border-color 0.2s" }}
      />
      <div
        ref={dot}
        aria-hidden
        className="hidden md:block fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#F4B961] pointer-events-none z-[91]"
      />
    </>
  );
}

/* 3D tilt wrapper for cards */
export function Tilt({ children, className = "", max = 8 }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${-py * max}deg) rotateY(${px * max}deg) translateY(-4px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
