import { useRef, useEffect } from 'react';
import type { RefObject } from 'react';

// ── Types ──────────────────────────────────────────────

export interface PhysicsNodeState {
  x: number; y: number;
  radius: number;
  opacity: number;
  cluster: number;
}

export interface PhysicsEdgeState {
  from: number; to: number;
  strength: number;
  pulseOffset: number;
}

export interface MouseState {
  x: number; y: number;
  active: boolean;
  clickPulse: number;
}

interface InternalNode {
  x: number; y: number;
  vx: number; vy: number;
  homeX: number; homeY: number;
  cluster: number;
  radius: number;
  opacity: number;
  glowPhase: number;
  driftPhase: number;
  driftAmp: number;
  driftFreq: number;
  wanderTimer: number;
}

interface InternalEdge {
  from: number; to: number;
  strength: number;
  targetStrength: number;
  pulseOffset: number;
}

export interface PhysicsParams {
  centerAttraction: number;
  repulsionRadius: number;
  repulsionForce: number;
  springLength: number;
  springStrength: number;
  mouseRadius: number;
  mouseRepulsion: number;
  friction: number;
  maxSpeed: number;
  connectDist: number;
  breakDist: number;
  edgeFadeSpeed: number;
}

const DEFAULTS: PhysicsParams = {
  centerAttraction: 0.000065,
  repulsionRadius: 155,
  repulsionForce: 110,
  springLength: 130,
  springStrength: 0.012,
  mouseRadius: 200,
  mouseRepulsion: 120,
  friction: 0.95,
  maxSpeed: 1.8,
  connectDist: 150,
  breakDist: 200,
  edgeFadeSpeed: 0.012,
};

export interface UseGraphPhysicsOptions {
  containerRef: RefObject<HTMLElement>;
  nodeHomes: Array<{ x: number; y: number; cluster: number; radius?: number }>;
  edges?: Array<{ from: number; to: number }>;
  autoConnect?: boolean;
  physicsParams?: Partial<PhysicsParams>;
  /** If true, all nodes start fully visible. If false, nodes fade in with staggered delays (Hero mode). */
  immediate?: boolean;
  /** Bump this number to force re-initialization of node positions from current homes (e.g. on resize). */
  homesVersion?: number;
}

type RenderCallback = (
  nodes: PhysicsNodeState[],
  edges: PhysicsEdgeState[],
  mouse: MouseState,
) => void;

// ── Hook ───────────────────────────────────────────────

export function useGraphPhysics(
  options: UseGraphPhysicsOptions,
  renderCallback: RenderCallback,
) {
  const {
    containerRef,
    nodeHomes,
    edges: fixedEdges = [],
    autoConnect = false,
    physicsParams: overrides = {},
    immediate = false,
    homesVersion = 0,
  } = options;

  const p = { ...DEFAULTS, ...overrides };

  const nodesRef = useRef<InternalNode[]>([]);
  const edgesRef = useRef<InternalEdge[]>([]);
  const mouseRef = useRef<MouseState>({ x: -9999, y: -9999, active: false, clickPulse: 0 });
  const frameRef = useRef(0);
  const cbRef = useRef<RenderCallback>(renderCallback);
  cbRef.current = renderCallback;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = 0;
    let height = 0;
    let animationId = 0;

    const getEdgeKey = (a: number, b: number) => a < b ? `${a}-${b}` : `${b}-${a}`;

    const measure = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      initNodes();
    };

    const initNodes = () => {
      const nodes: InternalNode[] = [];

      for (let i = 0; i < nodeHomes.length; i++) {
        const home = nodeHomes[i];
        nodes.push({
          x: home.x + (Math.random() - 0.5) * 40,
          y: home.y + (Math.random() - 0.5) * 40,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          homeX: home.x,
          homeY: home.y,
          cluster: home.cluster,
          radius: home.radius ?? (3 + Math.random() * 3),
          opacity: immediate ? 1 : 0,
          glowPhase: Math.random() * Math.PI * 2,
          driftPhase: Math.random() * Math.PI * 2,
          driftAmp: 0.5 + Math.random() * 1.0,
          driftFreq: 0.6 + Math.random() * 0.8,
          wanderTimer: Math.random() * 3000,
        });
      }

      nodesRef.current = nodes;

      // If fixed edges provided and not autoConnect mode, create them at full strength
      if (!autoConnect && fixedEdges.length > 0) {
        // Always rebuild from scratch — dedup against old edges is wrong because
        // the same keys would cause all edges to be skipped on re-init, clearing them.
        const newEdges: InternalEdge[] = [];
        const seen = new Set<string>();
        for (const fe of fixedEdges) {
          const key = getEdgeKey(fe.from, fe.to);
          if (!seen.has(key)) {
            seen.add(key);
            newEdges.push({
              from: fe.from,
              to: fe.to,
              strength: 1,
              targetStrength: 1,
              pulseOffset: Math.random() * Math.PI * 2,
            });
          }
        }
        edgesRef.current = newEdges;
      }
    };

    const update = () => {
      frameRef.current++;
      const nodes = nodesRef.current;
      const edges = edgesRef.current;
      const mouse = mouseRef.current;

      // Repulsion between all visible nodes
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].opacity < 0.3) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[j].opacity < 0.3) continue;
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < p.repulsionRadius * p.repulsionRadius && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const force = (p.repulsionForce * (1 - dist / p.repulsionRadius)) / dist;
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            a.vx -= fx;
            a.vy -= fy;
            b.vx += fx;
            b.vy += fy;
          }
        }
      }

      // Spring forces on edges
      for (const e of edges) {
        if (e.strength < 0.01) continue;
        const a = nodes[e.from];
        const b = nodes[e.to];
        if (!a || !b || a.opacity < 0.3 || b.opacity < 0.3) continue;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = (dist - p.springLength) * p.springStrength * e.strength;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        a.vx += fx;
        a.vy += fy;
        b.vx -= fx;
        b.vy -= fy;
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Fade in
        if (immediate) {
          n.opacity = 1;
        } else {
          // Hero mode: staggered fade-in based on index
          const spawnDelay = i * 15;
          if (frameRef.current > spawnDelay && n.opacity < 1) {
            n.opacity = Math.min(1, n.opacity + 0.006);
          }
          if (frameRef.current <= spawnDelay) {
            n.opacity = 0;
            continue;
          }
        }

        // Attraction to home position
        n.vx += (n.homeX - n.x) * p.centerAttraction;
        n.vy += (n.homeY - n.y) * p.centerAttraction;

        // Organic drift
        n.driftPhase += 0.003 * n.driftFreq;
        n.vx += Math.sin(n.driftPhase + n.cluster * 2.1) * 0.030 * n.driftAmp;
        n.vy += Math.cos(n.driftPhase * 0.6 + n.cluster + n.driftAmp) * 0.030 * n.driftAmp;

        // Rare spontaneous wander
        n.wanderTimer -= 1;
        if (n.wanderTimer <= 0) {
          n.wanderTimer = 1500 + Math.random() * 4000;
          if (Math.random() < 0.3) {
            const angle = Math.random() * Math.PI * 2;
            n.vx += Math.cos(angle) * (0.15 + Math.random() * 0.4);
            n.vy += Math.sin(angle) * (0.15 + Math.random() * 0.4);
          }
        }

        // Mouse interaction
        if (mouse.active) {
          const mdx = n.x - mouse.x;
          const mdy = n.y - mouse.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          if (mDistSq < p.mouseRadius * p.mouseRadius && mDistSq > 1) {
            const mDist = Math.sqrt(mDistSq);
            const force = (p.mouseRepulsion * (1 - mDist / p.mouseRadius)) / mDist;
            if (mouse.clickPulse > 0) {
              n.vx -= (mdx / mDist) * force * mouse.clickPulse * 0.4;
              n.vy -= (mdy / mDist) * force * mouse.clickPulse * 0.4;
            } else {
              n.vx += (mdx / mDist) * force * 0.25;
              n.vy += (mdy / mDist) * force * 0.25;
            }
          }
        }

        // Boundary soft repulsion
        const margin = 40;
        if (n.x < margin) n.vx += (margin - n.x) * 0.004;
        if (n.x > width - margin) n.vx -= (n.x - (width - margin)) * 0.004;
        if (n.y < margin) n.vy += (margin - n.y) * 0.004;
        if (n.y > height - margin) n.vy -= (n.y - (height - margin)) * 0.004;

        // Friction and speed clamp
        n.vx *= p.friction;
        n.vy *= p.friction;
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > p.maxSpeed) {
          n.vx = (n.vx / speed) * p.maxSpeed;
          n.vy = (n.vy / speed) * p.maxSpeed;
        }

        n.x += n.vx;
        n.y += n.vy;
        n.glowPhase += 0.025;
      }

      // Decay click pulse
      if (mouse.clickPulse > 0) {
        mouse.clickPulse *= 0.92;
        if (mouse.clickPulse < 0.01) mouse.clickPulse = 0;
      }

      // Dynamic edge formation (autoConnect mode only — Hero)
      if (autoConnect) {
        const connectChance = 0.6;
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].opacity < 0.5) continue;
          for (let j = i + 1; j < nodes.length; j++) {
            if (nodes[j].opacity < 0.5) continue;
            const dx = nodes[j].x - nodes[i].x;
            const dy = nodes[j].y - nodes[i].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const key = getEdgeKey(i, j);
            const existing = edges.find(e => getEdgeKey(e.from, e.to) === key);

            if (dist < p.connectDist && !existing && Math.random() > connectChance) {
              const sameCluster = nodes[i].cluster === nodes[j].cluster;
              edges.push({
                from: i, to: j,
                strength: 0,
                targetStrength: Math.max(0.25, 1 - dist / p.connectDist) * (sameCluster ? 1 : 0.4),
                pulseOffset: Math.random() * Math.PI * 2,
              });
            }
          }
        }

        // Update edge strengths
        for (let i = edges.length - 1; i >= 0; i--) {
          const e = edges[i];
          const a = nodes[e.from];
          const b = nodes[e.to];
          if (!a || !b || a.opacity < 0.3 || b.opacity < 0.3) {
            edges.splice(i, 1);
            continue;
          }
          const dist = Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);

          if (dist > p.breakDist) {
            e.targetStrength = 0;
          } else {
            const sameCluster = a.cluster === b.cluster;
            e.targetStrength = Math.max(0.15, 1 - dist / p.breakDist) * (sameCluster ? 1 : 0.4);
          }

          if (e.strength < e.targetStrength) {
            e.strength = Math.min(e.targetStrength, e.strength + p.edgeFadeSpeed);
          } else {
            e.strength = Math.max(e.targetStrength, e.strength - p.edgeFadeSpeed);
          }

          if (e.strength < 0.01 && e.targetStrength === 0) {
            edges.splice(i, 1);
          }
        }
      }
    };

    const loop = () => {
      update();
      // Build lightweight render state
      const rNodes: PhysicsNodeState[] = nodesRef.current.map(n => ({
        x: n.x, y: n.y, radius: n.radius, opacity: n.opacity, cluster: n.cluster,
      }));
      const rEdges: PhysicsEdgeState[] = edgesRef.current.map(e => ({
        from: e.from, to: e.to, strength: e.strength, pulseOffset: e.pulseOffset,
      }));
      cbRef.current(rNodes, rEdges, { ...mouseRef.current });
      animationId = requestAnimationFrame(loop);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.clickPulse = 0;
    };

    const handleClick = () => {
      mouseRef.current.clickPulse = 1;
    };

    measure();
    window.addEventListener('resize', measure);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('click', handleClick);
    loop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', measure);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('click', handleClick);
    };
  }, [autoConnect, immediate, nodeHomes.length, homesVersion]);

  return { nodesRef, edgesRef, mouseRef };
}
