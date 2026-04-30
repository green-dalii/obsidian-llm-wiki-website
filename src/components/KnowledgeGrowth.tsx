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
}

interface Edge {
  from: number;
  to: number;
  strength: number;
  targetStrength: number;
  pulseOffset: number;
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
    const NODE_COUNT = 32;
    const REPULSION_RADIUS = 140;
    const REPULSION_FORCE = 80;
    const SPRING_LENGTH = 130;
    const SPRING_STRENGTH = 0.015;
    const CENTER_ATTRACTION = 0.00015;
    const MOUSE_RADIUS = 220;
    const MOUSE_REPULSION = 120;
    const FRICTION = 0.94;
    const MAX_SPEED = 2.5;
    const CONNECT_DIST = 160;
    const BREAK_DIST = 220;
    const EDGE_FADE_SPEED = 0.025;

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
        const angle = (cluster / CLUSTER_CENTERS) * Math.PI * 2 + Math.random() * 0.8;
        const dist = Math.min(width, height) * 0.15 + Math.random() * Math.min(width, height) * 0.2;
        const homeX = width / 2 + Math.cos(angle) * dist;
        const homeY = height / 2 + Math.sin(angle) * dist;

        nodes.push({
          x: homeX + (Math.random() - 0.5) * 60,
          y: homeY + (Math.random() - 0.5) * 60,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          type: i < NODE_COUNT * 0.35 ? 'source' : 'concept',
          radius: i < NODE_COUNT * 0.35 ? 3 + Math.random() * 2.5 : 4 + Math.random() * 4,
          glowPhase: Math.random() * Math.PI * 2,
          cluster,
          homeX,
          homeY,
          driftPhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const getEdgeKey = (a: number, b: number) => a < b ? `${a}-${b}` : `${b}-${a}`;

    const update = () => {
      frame++;

      // Physics: repulsion between all nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
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
        if (!a || !b) continue;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = (dist - SPRING_LENGTH) * SPRING_STRENGTH * e.strength;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        a.vx += fx;
        a.vy += fy;
        b.vx -= fx;
        b.vy -= fy;
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Gentle attraction to home position
        n.vx += (n.homeX - n.x) * CENTER_ATTRACTION;
        n.vy += (n.homeY - n.y) * CENTER_ATTRACTION;

        // Organic noise drift
        n.driftPhase += 0.008;
        n.vx += Math.sin(n.driftPhase + n.cluster * 1.5) * 0.015;
        n.vy += Math.cos(n.driftPhase * 0.7 + n.cluster) * 0.015;

        // Mouse interaction
        if (mouse.active) {
          const mdx = n.x - mouse.x;
          const mdy = n.y - mouse.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          if (mDistSq < MOUSE_RADIUS * MOUSE_RADIUS && mDistSq > 1) {
            const mDist = Math.sqrt(mDistSq);
            const force = (MOUSE_REPULSION * (1 - mDist / MOUSE_RADIUS)) / mDist;
            // Click pulse creates brief attraction, normal is repulsion
            if (mouse.clickPulse > 0) {
              n.vx -= (mdx / mDist) * force * mouse.clickPulse * 0.5;
              n.vy -= (mdy / mDist) * force * mouse.clickPulse * 0.5;
            } else {
              n.vx += (mdx / mDist) * force * 0.3;
              n.vy += (mdy / mDist) * force * 0.3;
            }
          }
        }

        // Decay click pulse
        if (mouse.clickPulse > 0) {
          mouse.clickPulse *= 0.92;
          if (mouse.clickPulse < 0.01) mouse.clickPulse = 0;
        }

        // Boundary soft repulsion
        const margin = 40;
        if (n.x < margin) n.vx += (margin - n.x) * 0.005;
        if (n.x > width - margin) n.vx -= (n.x - (width - margin)) * 0.005;
        if (n.y < margin) n.vy += (margin - n.y) * 0.005;
        if (n.y > height - margin) n.vy -= (n.y - (height - margin)) * 0.005;

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
        n.glowPhase += 0.03;
      }

      // Dynamic edge formation/breaking
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const key = getEdgeKey(i, j);
          const existing = edges.find(e => getEdgeKey(e.from, e.to) === key);

          if (dist < CONNECT_DIST && !existing) {
            edges.push({
              from: i,
              to: j,
              strength: 0,
              targetStrength: Math.max(0.3, 1 - dist / CONNECT_DIST) * (nodes[i].cluster === nodes[j].cluster ? 1 : 0.5),
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
        if (!a || !b) {
          edges.splice(i, 1);
          continue;
        }
        const dist = Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);

        if (dist > BREAK_DIST) {
          e.targetStrength = 0;
        } else {
          e.targetStrength = Math.max(0.2, 1 - dist / BREAK_DIST) * (a.cluster === b.cluster ? 1 : 0.6);
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
      // Subtle trail effect
      ctx.fillStyle = 'rgba(26,26,26,0.25)';
      ctx.fillRect(0, 0, width, height);

      // Mouse ambient glow
      if (mouse.active) {
        const r = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_RADIUS * 1.5);
        r.addColorStop(0, 'rgba(139,92,246,0.03)');
        r.addColorStop(1, 'rgba(139,92,246,0)');
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
        // Subtle curve offset
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const perpX = -dy / len * 8 * e.strength;
        const perpY = dx / len * 8 * e.strength;
        const cpX = midX + perpX;
        const cpY = midY + perpY;

        // Main connection line
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(cpX, cpY, b.x, b.y);
        const alpha = e.strength * 0.35;
        ctx.strokeStyle = a.type === 'source' && b.type === 'source'
          ? `rgba(217,119,6,${alpha * 0.5})`
          : `rgba(139,92,246,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Traveling pulse dot
        const pulseT = ((frame * 0.008 + e.pulseOffset) % 1);
        const invT = 1 - pulseT;
        const px = a.x * invT * invT + cpX * 2 * invT * pulseT + b.x * pulseT * pulseT;
        const py = a.y * invT * invT + cpY * 2 * invT * pulseT + b.y * pulseT * pulseT;
        const pulseAlpha = Math.sin(pulseT * Math.PI) * e.strength * 0.9;

        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${pulseAlpha})`;
        ctx.fill();

        // Glow around pulse
        const pg = ctx.createRadialGradient(px, py, 0, px, py, 8);
        pg.addColorStop(0, `rgba(167,139,250,${pulseAlpha * 0.4})`);
        pg.addColorStop(1, 'rgba(167,139,250,0)');
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw nodes
      for (const n of nodes) {
        const glowSize = 20 + Math.sin(n.glowPhase) * 6;
        const baseAlpha = 0.5 + Math.sin(n.glowPhase) * 0.15;

        if (n.type === 'source') {
          // Document node: small rounded rect with amber glow
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowSize);
          glow.addColorStop(0, `rgba(217,119,6,${baseAlpha * 0.25})`);
          glow.addColorStop(1, 'rgba(217,119,6,0)');
          ctx.fillStyle = glow;
          ctx.fillRect(n.x - glowSize, n.y - glowSize, glowSize * 2, glowSize * 2);

          ctx.fillStyle = `rgba(217,119,6,${baseAlpha})`;
          ctx.beginPath();
          ctx.roundRect(n.x - n.radius, n.y - n.radius * 1.4, n.radius * 2, n.radius * 2.8, 2);
          ctx.fill();

          // Inner highlight
          ctx.fillStyle = `rgba(251,191,36,${baseAlpha * 0.5})`;
          ctx.beginPath();
          ctx.roundRect(n.x - n.radius * 0.5, n.y - n.radius * 1.1, n.radius, n.radius * 0.6, 1);
          ctx.fill();
        } else {
          // Concept node: circle with purple glow
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowSize);
          glow.addColorStop(0, `rgba(139,92,246,${baseAlpha * 0.3})`);
          glow.addColorStop(0.5, `rgba(139,92,246,${baseAlpha * 0.08})`);
          glow.addColorStop(1, 'rgba(139,92,246,0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(n.x, n.y, glowSize, 0, Math.PI * 2);
          ctx.fill();

          // Core
          ctx.fillStyle = `rgba(167,139,250,${baseAlpha})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fill();

          // Inner bright core
          ctx.fillStyle = `rgba(196,181,253,${baseAlpha * 0.6})`;
          ctx.beginPath();
          ctx.arc(n.x - n.radius * 0.2, n.y - n.radius * 0.2, n.radius * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Mouse cursor indicator (subtle ring)
      if (mouse.active) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 12, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(139,92,246,0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 18 + Math.sin(frame * 0.05) * 3, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(139,92,246,0.08)';
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
