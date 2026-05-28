import { useRef, useEffect, useState, useCallback } from 'react';
import { useGraphPhysics } from '../hooks/useGraphPhysics';
import type { PhysicsNodeState, PhysicsEdgeState, MouseState } from '../hooks/useGraphPhysics';
import type { GraphLayout } from '../data/graphLayouts';

interface WikiGraphStageProps {
  layout: GraphLayout;
  links: Array<{ from: number; to: number }>;
  pageLabels: string[];
}

// Flatten all nodes from layout into a single indexed array
function flattenNodes(layout: GraphLayout): Array<{ x: number; y: number; cluster: number; radius: number }> {
  const nodes: Array<{ x: number; y: number; cluster: number; radius: number }> = [];
  for (const n of layout.mainNodes) nodes.push({ x: n.x, y: n.y, cluster: 0, radius: 4 });
  for (const n of layout.t1Nodes) nodes.push({ x: n.x, y: n.y, cluster: 1, radius: 3.5 });
  for (const n of layout.t2Nodes) nodes.push({ x: n.x, y: n.y, cluster: 2, radius: 3 });
  for (const n of layout.t3Nodes) nodes.push({ x: n.x, y: n.y, cluster: 3, radius: 2.5 });
  return nodes;
}

// Build complete edge list: main links + satellite links
function buildEdges(
  layout: GraphLayout,
  links: Array<{ from: number; to: number }>,
): Array<{ from: number; to: number }> {
  const mainCount = layout.mainNodes.length;
  const t1Start = mainCount;
  const t2Start = t1Start + layout.t1Nodes.length;
  const t3Start = t2Start + layout.t2Nodes.length;

  const edges: Array<{ from: number; to: number }> = [];

  // Main inter-node links
  for (const l of links) {
    edges.push({ from: l.from, to: l.to });
  }

  // Exact position lookup
  const findExact = (x: number, y: number): number | null => {
    for (let i = 0; i < layout.mainNodes.length; i++) {
      if (Math.abs(layout.mainNodes[i].x - x) < 2 && Math.abs(layout.mainNodes[i].y - y) < 2) return i;
    }
    for (let i = 0; i < layout.t1Nodes.length; i++) {
      if (Math.abs(layout.t1Nodes[i].x - x) < 2 && Math.abs(layout.t1Nodes[i].y - y) < 2) return t1Start + i;
    }
    for (let i = 0; i < layout.t2Nodes.length; i++) {
      if (Math.abs(layout.t2Nodes[i].x - x) < 2 && Math.abs(layout.t2Nodes[i].y - y) < 2) return t2Start + i;
    }
    for (let i = 0; i < layout.t3Nodes.length; i++) {
      if (Math.abs(layout.t3Nodes[i].x - x) < 2 && Math.abs(layout.t3Nodes[i].y - y) < 2) return t3Start + i;
    }
    return null;
  };

  // Nearest-node fallback for phantom endpoints
  const allNodes = [...layout.mainNodes, ...layout.t1Nodes, ...layout.t2Nodes, ...layout.t3Nodes];
  const findNearest = (x: number, y: number): number => {
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < allNodes.length; i++) {
      const dx = allNodes[i].x - x;
      const dy = allNodes[i].y - y;
      const dist = dx * dx + dy * dy;
      if (dist < bestDist) { bestDist = dist; best = i; }
    }
    return best;
  };

  // Satellite links
  for (const sl of layout.satLinks) {
    let i1 = findExact(sl.x1, sl.y1);
    let i2 = findExact(sl.x2, sl.y2);
    if (i1 === null) i1 = findNearest(sl.x1, sl.y1);
    if (i2 === null) i2 = findNearest(sl.x2, sl.y2);
    edges.push({ from: i1!, to: i2! });
  }

  return edges;
}

const VIEWBOX_W = 480;
const VIEWBOX_H = 320;

export default function WikiGraphStage({ layout, links, pageLabels }: WikiGraphStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cssSize, setCssSize] = useState({ w: 0, h: 0 });
  const [homesVersion, setHomesVersion] = useState(0);

  // Measure container and keep canvas CSS size up to date
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const measure = () => {
      setCssSize({ w: container.offsetWidth, h: container.offsetHeight });
      setHomesVersion(v => v + 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  // Compute viewBox → pixel scale (maintain aspect ratio, center)
  const viewScale = cssSize.w > 0
    ? Math.min(cssSize.w / VIEWBOX_W, cssSize.h / VIEWBOX_H)
    : 0;
  const tx = viewScale > 0 ? (cssSize.w - VIEWBOX_W * viewScale) / 2 : 0;
  const ty = viewScale > 0 ? (cssSize.h - VIEWBOX_H * viewScale) / 2 : 0;

  // Convert viewBox coordinates to CSS pixel space
  const toPixel = useCallback(
    (vx: number, vy: number) => ({ x: vx * viewScale + tx, y: vy * viewScale + ty }),
    [viewScale, tx, ty],
  );

  // Raw nodes in viewBox space
  const rawNodes = useRef(flattenNodes(layout));
  // eslint-disable-next-line react-hooks/refs -- latest value ref for canvas rendering
  rawNodes.current = flattenNodes(layout);

  const rawEdges = useRef(buildEdges(layout, links));
  // eslint-disable-next-line react-hooks/refs -- latest value ref for canvas rendering
  rawEdges.current = buildEdges(layout, links);

  // Node homes in CSS pixel space (recomputed when scale changes)
  const nodeHomes = viewScale > 0
    ? rawNodes.current.map(n => { // eslint-disable-line react-hooks/refs
        const p = toPixel(n.x, n.y);
        return { x: p.x, y: p.y, cluster: n.cluster, radius: n.radius };
      })
    : [];

  const edges = rawEdges.current; // eslint-disable-line react-hooks/refs

  const render = useCallback(
    (nodes: PhysicsNodeState[], physicsEdges: PhysicsEdgeState[], mouse: MouseState) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const cssW = canvas.offsetWidth;
      const cssH = canvas.offsetHeight;
      if (cssW === 0 || cssH === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Transform: DPR × viewBox→pixel scale
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);

      // Dark background
      ctx.fillStyle = '#121212';
      ctx.fillRect(0, 0, cssW, cssH);

      // ── Draw edges ──────────────────────────────
      for (const e of physicsEdges) {
        if (e.strength < 0.03) continue;
        const a = nodes[e.from];
        const b = nodes[e.to];
        if (!a || !b || a.opacity < 0.01 || b.opacity < 0.01) continue;

        const avgOpacity = (a.opacity + b.opacity) / 2;
        const alpha = 0.04 + e.strength * 0.14 * avgOpacity;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = 0.5 + e.strength * 0.3;
        ctx.stroke();
      }

      // ── Draw nodes ──────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (n.opacity < 0.01) continue;

        const opacityByCluster = [0.85, 0.45, 0.28, 0.14];
        const baseOpacity = opacityByCluster[n.cluster] ?? 0.12;
        const alpha = baseOpacity * n.opacity;

        // Subtle glow for main nodes
        if (n.cluster === 0) {
          const t = performance.now() * 0.001;
          const pulse = 0.7 + 0.3 * Math.sin(t * 2 + i);
          const glowAlpha = alpha * 0.15 * pulse;

          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 10);
          glow.addColorStop(0, `rgba(255,255,255,${glowAlpha})`);
          glow.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 10, 0, Math.PI * 2);
          ctx.fill();
        }

        // Node circle
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Draw labels ─────────────────────────────
      for (let i = 0; i < layout.mainNodes.length && i < pageLabels.length; i++) {
        const n = nodes[i];
        if (!n || n.opacity < 0.1) continue;
        const label = pageLabels[i];
        const short = label.length > 18 ? label.slice(0, 16) + '...' : label;

        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = `rgba(255,255,255,${0.45 * n.opacity})`;
        ctx.fillText(short, n.x, n.y + 14);
      }

      // ── Mouse cursor indicator ──────────────────
      if (mouse.active) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 12, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(124,58,237,0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    },
    [layout.mainNodes.length, pageLabels],
  );

  useGraphPhysics(
    {
      containerRef: containerRef as React.RefObject<HTMLElement>,
      nodeHomes,
      edges,
      autoConnect: false,
      immediate: true,
      homesVersion,
      physicsParams: {
        repulsionRadius: 140,
        repulsionForce: 130,
        springLength: 85,
        springStrength: 0.010,
        mouseRadius: 130,
        mouseRepulsion: 55,
        maxSpeed: 1.2,
        centerAttraction: 0.00005,
      },
    },
    render,
  );

  return (
    <div ref={containerRef} className="relative flex-1 w-full min-h-0 overflow-hidden rounded-lg cursor-crosshair">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
