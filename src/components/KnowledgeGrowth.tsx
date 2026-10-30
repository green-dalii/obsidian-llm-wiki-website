import { useRef, useEffect, useState } from 'react';
import { useGraphPhysics } from '../hooks/useGraphPhysics';
import type { PhysicsNodeState, PhysicsEdgeState, MouseState } from '../hooks/useGraphPhysics';

const CLUSTER_CENTERS = 4;
const NODE_COUNT = 38;

function generateHeroNodeHomes(width: number, height: number) {
  const homes: Array<{ x: number; y: number; cluster: number; radius: number }> = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const cluster = i % CLUSTER_CENTERS;
    const angle = (cluster / CLUSTER_CENTERS) * Math.PI * 2 + Math.random() * 0.9;
    const dist = Math.min(width, height) * 0.08 + Math.random() * Math.min(width, height) * 0.20;
    homes.push({
      x: width / 2 + Math.cos(angle) * dist,
      y: height / 2 + Math.sin(angle) * dist,
      cluster,
      radius: i < NODE_COUNT * 0.3 ? 2.5 + Math.random() * 2 : 3 + Math.random() * 3,
    });
  }
  return homes;
}

/* ── Theme bridge ───────────────────────────────────────────────
   The canvas is painted, not styled, so it cannot inherit tokens.
   These helpers read the live theme variables and re-read them when
   the theme changes, so the field is drawn in the scheme it sits on
   instead of baking the dark background into the paint (which is
   what the old rgba(15,15,15,...) trail did — the hero stayed black
   in light mode). */

function hexToTriple(hex: string, fallback: string): string {
  const clean = (hex || '').trim().replace('#', '');
  const v = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const n = /^[0-9a-fA-F]{6}$/.test(v) ? parseInt(v, 16) : parseInt(fallback.replace('#', ''), 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

interface CanvasPalette {
  canvas: string;
  accent: string;
  accentSoft: string;
  source: string;
  sourceSoft: string;
}

function readPalette(): CanvasPalette {
  if (typeof window === 'undefined') {
    return { canvas: '#0B0B0F', accent: '140,123,247', accentSoft: '169,155,255', source: '217,161,91', sourceSoft: '236,190,138' };
  }
  const cs = getComputedStyle(document.documentElement);
  const raw = (name: string, fb: string) => cs.getPropertyValue(name).trim() || fb;
  const accent = hexToTriple(raw('--accent', '#8C7BF7'), '#8C7BF7');
  const source = hexToTriple(raw('--source', '#D9A15B'), '#D9A15B');
  return {
    canvas: raw('--canvas', '#0B0B0F'),
    accent,
    accentSoft: hexToTriple(raw('--focus', '#A99BFF'), '#A99BFF'),
    source,
    sourceSoft: hexToTriple(raw('--accent', '#8C7BF7'), '#8C7BF7'),
  };
}

export default function KnowledgeGrowth() {
  const paletteRef = useRef<CanvasPalette>(readPalette());
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodeHomes, setNodeHomes] = useState<ReturnType<typeof generateHeroNodeHomes>>([]);
  const homesRef = useRef(nodeHomes);
  // eslint-disable-next-line react-hooks/refs -- latest value ref for animation loop
  homesRef.current = nodeHomes;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const canvas = container.querySelector('canvas') as HTMLCanvasElement | null;
      if (canvas) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
      }
      setNodeHomes(generateHeroNodeHomes(w, h));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Repaint the field in the new scheme instead of waiting for a remount.
  useEffect(() => {
    const refresh = () => {
      paletteRef.current = readPalette();
    };
    window.addEventListener('klw:themechange', refresh);
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    mq.addEventListener('change', refresh);
    return () => {
      window.removeEventListener('klw:themechange', refresh);
      mq.removeEventListener('change', refresh);
    };
  }, []);

  const render = (nodes: PhysicsNodeState[], edges: PhysicsEdgeState[], mouse: MouseState) => {
    const container = containerRef.current;
    if (!container) return;
    const canvas = container.querySelector('canvas');
    if (!canvas) return;
    const ctx = (canvas as HTMLCanvasElement).getContext('2d');
    if (!ctx) return;

    const cssW = canvas.offsetWidth;
    const cssH = canvas.offsetHeight;
    const dpr = (canvas as HTMLCanvasElement).width / cssW;

    ctx.save();
    ctx.scale(dpr, dpr);

    const pal = paletteRef.current;

    // Clear with trail — the fill is the surface the canvas sits on.
    ctx.fillStyle = pal.canvas;
    ctx.globalAlpha = 0.55;
    ctx.fillRect(0, 0, cssW, cssH);
    ctx.globalAlpha = 1;

    // Mouse ambient glow
    if (mouse.active) {
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 240);
      grad.addColorStop(0, `rgba(${pal.accent},0.02)`);
      grad.addColorStop(1, `rgba(${pal.accent},0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, cssW, cssH);
    }

    const homes = homesRef.current;

    // Draw edges
    for (const e of edges) {
      if (e.strength < 0.05) continue;
      const a = nodes[e.from];
      const b = nodes[e.to];
      if (!a || !b) continue;

      const midX = (a.x + b.x) / 2;
      const midY = (a.y + b.y) / 2;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const perpX = -dy / len * 6 * e.strength;
      const perpY = dx / len * 6 * e.strength;
      const cpX = midX + perpX;
      const cpY = midY + perpY;

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.quadraticCurveTo(cpX, cpY, b.x, b.y);
      const alpha = e.strength * 0.18;
      ctx.strokeStyle = `rgba(${pal.accent},${alpha})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Traveling pulse
      const pulseT = ((performance.now() * 0.0005 + e.pulseOffset * 60) % 1);
      const invT = 1 - pulseT;
      const px = a.x * invT * invT + cpX * 2 * invT * pulseT + b.x * pulseT * pulseT;
      const py = a.y * invT * invT + cpY * 2 * invT * pulseT + b.y * pulseT * pulseT;
      const pulseAlpha = Math.sin(pulseT * Math.PI) * e.strength * 0.5;

      ctx.beginPath();
      ctx.arc(px, py, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${pal.accentSoft},${pulseAlpha})`;
      ctx.fill();

      const pg = ctx.createRadialGradient(px, py, 0, px, py, 6);
      pg.addColorStop(0, `rgba(${pal.accentSoft},${pulseAlpha * 0.25})`);
      pg.addColorStop(1, `rgba(${pal.accentSoft},0)`);
      ctx.fillStyle = pg;
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw nodes
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (n.opacity < 0.01) continue;

      const home = homes[i];
      const isSource = home?.radius && home.radius < 3.5;
      const glowSize = 16 + Math.sin(performance.now() * 0.001 + i) * 4;
      const baseAlpha = (0.3 + Math.sin(performance.now() * 0.001 + i) * 0.08) * n.opacity;

      if (isSource) {
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowSize);
        glow.addColorStop(0, `rgba(${pal.source},${baseAlpha * 0.18})`);
        glow.addColorStop(0.5, `rgba(${pal.source},${baseAlpha * 0.05})`);
        glow.addColorStop(1, `rgba(${pal.source},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${pal.source},${baseAlpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${pal.sourceSoft},${baseAlpha * 0.35})`;
        ctx.beginPath();
        ctx.arc(n.x - n.radius * 0.15, n.y - n.radius * 0.15, n.radius * 0.35, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowSize);
        glow.addColorStop(0, `rgba(${pal.accent},${baseAlpha * 0.2})`);
        glow.addColorStop(0.5, `rgba(${pal.accent},${baseAlpha * 0.05})`);
        glow.addColorStop(1, `rgba(${pal.accent},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${pal.accentSoft},${baseAlpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${pal.accentSoft},${baseAlpha * 0.4})`;
        ctx.beginPath();
        ctx.arc(n.x - n.radius * 0.15, n.y - n.radius * 0.15, n.radius * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Mouse cursor indicator
    if (mouse.active) {
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${pal.accent},0.12)`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    ctx.restore();
  };

  useGraphPhysics(
    { containerRef: containerRef as React.RefObject<HTMLElement>, nodeHomes, autoConnect: true, immediate: false },
    render,
  );

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-crosshair overflow-hidden">
      <canvas className="absolute inset-0 w-full h-full" />
    </div>
  );
}
