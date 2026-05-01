import { useRef, useEffect } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'source' | 'concept';
  radius: number;
  glowPhase: number;
  cluster: number;
  homeX: number;
  homeY: number;
  driftPhase: number;
  driftAmp: number;
  driftFreq: number;
  wanderTimer: number;
  spawnDelay: number;
  opacity: number;
}

interface Edge {
  from: number;
  to: number;
  strength: number;
  targetStrength: number;
  pulseOffset: number;
  growthProgress: number;
}

export default function KnowledgeGrowth() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let mouse = { x: -9999, y: -9999, active: false, clickPulse: 0 };
    let frame = 0;
    let animationId = 0;

    const CLUSTER_CENTERS = 4;
    const NODE_COUNT = 47;
    const CENTER_ATTRACTION = 0.000065;
    const REPULSION_RADIUS = 155;
    const REPULSION_FORCE = 110;
    const SPRING_LENGTH = 130;
    const SPRING_STRENGTH = 0.012;
    const MOUSE_RADIUS = 200;
    const MOUSE_REPULSION = 120;
    const FRICTION = 0.95;
    const MAX_SPEED = 1.8;
    const CONNECT_DIST = 150;
    const BREAK_DIST = 200;
    const EDGE_FADE_SPEED = 0.012;

    // Evolution timeline (in frames, ~60fps)
    const SPAWN_WINDOW = 720;        // 0-12s: nodes spawn
    const CONNECT_START = 600;       // 10s: connections begin
    const CONNECT_ACCEL = 1200;      // 20s: more cross-cluster connections
    const MATURE_PHASE = 1800;       // 30s: network matures

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      edges = [];

      for (let i = 0; i < NODE_COUNT; i++) {
        const cluster = i % CLUSTER_CENTERS;
        const angle = (cluster / CLUSTER_CENTERS) * Math.PI * 2 + Math.random() * 0.9;
        const dist = Math.min(width, height) * 0.08 + Math.random() * Math.min(width, height) * 0.20;
        const homeX = width / 2 + Math.cos(angle) * dist;
        const homeY = height / 2 + Math.sin(angle) * dist;

        nodes.push({
          x: homeX + (Math.random() - 0.5) * 60,
          y: homeY + (Math.random() - 0.5) * 60,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          type: i < NODE_COUNT * 0.3 ? 'source' : 'concept',
          radius: i < NODE_COUNT * 0.3 ? 2.5 + Math.random() * 2 : 3 + Math.random() * 3,
          glowPhase: Math.random() * Math.PI * 2,
          cluster,
          homeX,
          homeY,
          driftPhase: Math.random() * Math.PI * 2,
          driftAmp: 0.5 + Math.random() * 1.0,
          driftFreq: 0.6 + Math.random() * 0.8,
          wanderTimer: Math.random() * 3000,
          spawnDelay: Math.random() * SPAWN_WINDOW * 0.8,
          opacity: 0,
        });
      }
    };

    const getEdgeKey = (a: number, b: number) => a < b ? `${a}-${b}` : `${b}-${a}`;

    const getEvolutionFactor = () => {
      if (frame < CONNECT_START) return 0;
      if (frame < CONNECT_ACCEL) return (frame - CONNECT_START) / (CONNECT_ACCEL - CONNECT_START);
      if (frame < MATURE_PHASE) return 0.5 + (frame - CONNECT_ACCEL) / (MATURE_PHASE - CONNECT_ACCEL) * 0.5;
      return 1;
    };

    const update = () => {
      frame++;
      const evo = getEvolutionFactor();

      // Physics: repulsion between all visible nodes
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].opacity < 0.3) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[j].opacity < 0.3) continue;
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < REPULSION_RADIUS * REPULSION_RADIUS && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const force = (REPULSION_FORCE * (1 - dist / REPULSION_RADIUS)) / dist;
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            a.vx -= fx;
            a.vy -= fy;
            b.vx += fx;
            b.vy += fy;
          }
        }
      }

      // Spring forces on existing edges
      for (const e of edges) {
        if (e.strength < 0.01) continue;
        const a = nodes[e.from];
        const b = nodes[e.to];
        if (!a || !b || a.opacity < 0.3 || b.opacity < 0.3) continue;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = (dist - SPRING_LENGTH) * SPRING_STRENGTH * e.strength * (0.3 + evo * 0.7);
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        a.vx += fx;
        a.vy += fy;
        b.vx -= fx;
        b.vy -= fy;
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Fade in — slower for longer timeline
        if (frame > n.spawnDelay && n.opacity < 1) {
          n.opacity = Math.min(1, n.opacity + 0.004);
        }
        if (frame <= n.spawnDelay) {
          n.opacity = 0;
          continue;
        }

        // Gentle attraction to home position (strengthens over time)
        const centerStrength = CENTER_ATTRACTION * (0.2 + evo * 0.8);
        n.vx += (n.homeX - n.x) * centerStrength;
        n.vy += (n.homeY - n.y) * centerStrength;

        // Organic drift — per-node frequency & amplitude, no synchronized movement
        n.driftPhase += 0.003 * n.driftFreq;
        const driftStrength = 1 - evo * 0.25;
        const dx = Math.sin(n.driftPhase + n.cluster * 2.1) * 0.030 * n.driftAmp * driftStrength;
        const dy = Math.cos(n.driftPhase * 0.6 + n.cluster + n.driftAmp) * 0.030 * n.driftAmp * driftStrength;
        n.vx += dx;
        n.vy += dy;

        // Rare spontaneous wander — ~0.3% chance per frame per node
        n.wanderTimer -= 1;
        if (n.wanderTimer <= 0) {
          n.wanderTimer = 1500 + Math.random() * 4000;
          if (Math.random() < 0.3 && evo > 0.4) {
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
          if (mDistSq < MOUSE_RADIUS * MOUSE_RADIUS && mDistSq > 1) {
            const mDist = Math.sqrt(mDistSq);
            const force = (MOUSE_REPULSION * (1 - mDist / MOUSE_RADIUS)) / mDist;
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

        // Apply friction and clamp speed
        n.vx *= FRICTION;
        n.vy *= FRICTION;
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > MAX_SPEED) {
          n.vx = (n.vx / speed) * MAX_SPEED;
          n.vy = (n.vy / speed) * MAX_SPEED;
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

      // Dynamic edge formation — evolves over time
      if (evo > 0) {
        const connectChance = 0.3 + evo * 0.7;
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].opacity < 0.5) continue;
          for (let j = i + 1; j < nodes.length; j++) {
            if (nodes[j].opacity < 0.5) continue;
            const dx = nodes[j].x - nodes[i].x;
            const dy = nodes[j].y - nodes[i].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const key = getEdgeKey(i, j);
            const existing = edges.find(e => getEdgeKey(e.from, e.to) === key);

            if (dist < CONNECT_DIST && !existing) {
              // Early phase: only same-cluster connections
              const sameCluster = nodes[i].cluster === nodes[j].cluster;
              if (!sameCluster && evo < 0.5) continue;

              // Staggered formation chance
              if (Math.random() > connectChance) continue;

              edges.push({
                from: i,
                to: j,
                strength: 0,
                targetStrength: Math.max(0.25, 1 - dist / CONNECT_DIST) * (sameCluster ? 1 : 0.5) * (0.4 + evo * 0.6),
                pulseOffset: Math.random() * Math.PI * 2,
                growthProgress: 0,
              });
            }
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

        if (dist > BREAK_DIST) {
          e.targetStrength = 0;
        } else {
          const sameCluster = a.cluster === b.cluster;
          e.targetStrength = Math.max(0.15, 1 - dist / BREAK_DIST) * (sameCluster ? 1 : 0.5) * (0.4 + evo * 0.6);
        }

        if (e.strength < e.targetStrength) {
          e.strength = Math.min(e.targetStrength, e.strength + EDGE_FADE_SPEED);
        } else {
          e.strength = Math.max(e.targetStrength, e.strength - EDGE_FADE_SPEED);
        }

        if (e.strength < 0.01 && e.targetStrength === 0) {
          edges.splice(i, 1);
        }
      }
    };

    const draw = () => {
      // Clear with short trail — higher opacity for faster fade
      ctx.fillStyle = 'rgba(15,15,15,0.55)';
      ctx.fillRect(0, 0, width, height);

      const evo = getEvolutionFactor();

      // Mouse ambient glow
      if (mouse.active) {
        const r = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_RADIUS * 1.2);
        r.addColorStop(0, 'rgba(124,58,237,0.02)');
        r.addColorStop(1, 'rgba(124,58,237,0)');
        ctx.fillStyle = r;
        ctx.fillRect(0, 0, width, height);
      }

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

        // Main connection line
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(cpX, cpY, b.x, b.y);
        const alpha = e.strength * 0.18;
        ctx.strokeStyle = a.type === 'source' && b.type === 'source'
          ? `rgba(217,119,6,${alpha * 0.5})`
          : `rgba(124,58,237,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Traveling pulse dot — only when mature
        if (evo > 0.3) {
          const pulseT = ((frame * 0.005 + e.pulseOffset) % 1);
          const invT = 1 - pulseT;
          const px = a.x * invT * invT + cpX * 2 * invT * pulseT + b.x * pulseT * pulseT;
          const py = a.y * invT * invT + cpY * 2 * invT * pulseT + b.y * pulseT * pulseT;
          const pulseAlpha = Math.sin(pulseT * Math.PI) * e.strength * 0.5;

          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139,92,246,${pulseAlpha})`;
          ctx.fill();

          // Soft glow around pulse
          const pg = ctx.createRadialGradient(px, py, 0, px, py, 6);
          pg.addColorStop(0, `rgba(139,92,246,${pulseAlpha * 0.25})`);
          pg.addColorStop(1, 'rgba(139,92,246,0)');
          ctx.fillStyle = pg;
          ctx.beginPath();
          ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw nodes
      for (const n of nodes) {
        if (n.opacity < 0.01) continue;

        const glowSize = 16 + Math.sin(n.glowPhase) * 4;
        const baseAlpha = (0.3 + Math.sin(n.glowPhase) * 0.08) * n.opacity;

        if (n.type === 'source') {
          // Document node: circle with amber glow
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowSize);
          glow.addColorStop(0, `rgba(217,119,6,${baseAlpha * 0.18})`);
          glow.addColorStop(0.5, `rgba(217,119,6,${baseAlpha * 0.05})`);
          glow.addColorStop(1, 'rgba(217,119,6,0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(n.x, n.y, glowSize, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(217,119,6,${baseAlpha})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fill();

          // Inner highlight
          ctx.fillStyle = `rgba(251,191,36,${baseAlpha * 0.35})`;
          ctx.beginPath();
          ctx.arc(n.x - n.radius * 0.15, n.y - n.radius * 0.15, n.radius * 0.35, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Concept node: circle with purple glow
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowSize);
          glow.addColorStop(0, `rgba(124,58,237,${baseAlpha * 0.2})`);
          glow.addColorStop(0.5, `rgba(124,58,237,${baseAlpha * 0.05})`);
          glow.addColorStop(1, 'rgba(124,58,237,0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(n.x, n.y, glowSize, 0, Math.PI * 2);
          ctx.fill();

          // Core
          ctx.fillStyle = `rgba(139,92,246,${baseAlpha})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fill();

          // Inner bright core
          ctx.fillStyle = `rgba(167,139,250,${baseAlpha * 0.4})`;
          ctx.beginPath();
          ctx.arc(n.x - n.radius * 0.15, n.y - n.radius * 0.15, n.radius * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Mouse cursor indicator
      if (mouse.active) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(124,58,237,0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const loop = () => {
      update();
      draw();
      animationId = requestAnimationFrame(loop);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.clickPulse = 0;
    };

    const handleClick = () => {
      mouse.clickPulse = 1;
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);
    loop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full cursor-crosshair"
    />
  );
}
