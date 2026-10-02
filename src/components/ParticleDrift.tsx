import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Particle Drift — a soft constellation field for dark hero backgrounds.
 *
 * Canvas 2D, no dependencies:
 *  - nodes drift slowly and link to neighbours within LINK px
 *  - thin light streaks rise from below
 *  - nodes near the pointer light up in brand cyan and connect to it
 *
 * Pauses when off-screen or the tab is hidden; renders a single still frame
 * when the user prefers reduced motion.
 */

type Node = { x: number; y: number; vx: number; vy: number; r: number };
type Beam = { x: number; y: number; len: number; speed: number; alpha: number };

const LINK = 120; // node-to-node link distance (px)
const POINTER = 180; // pointer highlight radius (px)
const CYAN = "98, 208, 232"; // --cyan-light
const BEAM = "38, 181, 214"; // --cyan
const GREY = "156, 163, 175";

const rand = (min: number, max: number) => min + Math.random() * (max - min);

function makeNode(w: number, h: number): Node {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: rand(-0.12, 0.12),
    vy: rand(-0.28, -0.06), // slow upward drift
    r: rand(0.8, 2),
  };
}

function makeBeam(w: number, h: number, anywhere = false): Beam {
  const len = rand(50, 150);
  return {
    x: Math.random() * w,
    y: anywhere ? Math.random() * h : h + rand(0, h * 0.5),
    len,
    speed: rand(0.6, 1.8),
    alpha: rand(0.12, 0.4),
  };
}

export function ParticleDrift({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -9999, y: -9999 };
    const nodes: Node[] = [];
    const beams: Beam[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let inView = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Scale counts with area (≈90 nodes / 25 beams on a desktop hero).
      const nodeCount = Math.round(Math.min(90, Math.max(28, (w * h) / 13000)));
      const beamCount = Math.round(Math.min(25, Math.max(8, w / 55)));
      while (nodes.length < nodeCount) nodes.push(makeNode(w, h));
      nodes.length = nodeCount;
      while (beams.length < beamCount) beams.push(makeBeam(w, h, true));
      beams.length = beamCount;
      for (const n of nodes) {
        if (n.x > w) n.x = Math.random() * w;
        if (n.y > h) n.y = Math.random() * h;
      }
    };

    const step = () => {
      for (const b of beams) {
        b.y -= b.speed;
        if (b.y + b.len < 0) Object.assign(b, makeBeam(w, h));
      }
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.y < -10) {
          n.y = h + 10;
          n.x = Math.random() * w;
        }
        if (n.x < -10) n.x = w + 10;
        else if (n.x > w + 10) n.x = -10;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Rising light streaks
      ctx.lineWidth = 1.5;
      for (const b of beams) {
        const g = ctx.createLinearGradient(b.x, b.y, b.x, b.y + b.len);
        g.addColorStop(0, `rgba(${BEAM}, ${b.alpha})`);
        g.addColorStop(1, `rgba(${BEAM}, 0)`);
        ctx.strokeStyle = g;
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(b.x, b.y + b.len);
        ctx.stroke();
      }

      // Node-to-node links
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            ctx.strokeStyle = `rgba(${GREY}, ${0.15 * (1 - Math.sqrt(d2) / LINK)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Nodes, lit and linked to the pointer when close
      for (const n of nodes) {
        const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
        const near = d < POINTER;
        if (near) {
          ctx.strokeStyle = `rgba(${CYAN}, ${0.35 * (1 - d / POINTER)})`;
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
        ctx.fillStyle = near ? `rgb(${CYAN})` : `rgba(${GREY}, 0.4)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? n.r + 0.6 : n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      step();
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!raf && inView && !document.hidden && !reduceMotion) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    draw();
    start();

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={cn("pointer-events-none block", className)} aria-hidden="true" />;
}
