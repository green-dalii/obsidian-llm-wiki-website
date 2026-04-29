import { useRef, useEffect } from 'react';

interface Node {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  radius: number;
  type: 'source' | 'entity' | 'concept' | 'wiki';
  discovered: boolean;
  discoverProgress: number;
  glowIntensity: number;
  clusterId: number;
  trail: { x: number; y: number; alpha: number }[];
  pulsePhase: number;
}

interface Link {
  from: number;
  to: number;
  progress: number;
  pulseOffset: number;
  pulseActive: boolean;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  color: string;
}

export default function KnowledgeGraphGenesis() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const ripplesRef = useRef<Ripple[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let links: Link[] = [];
    let phase = 0;
    let phaseTimer = 0;
    const PHASE_DURATION = 4000;
    const CLUSTER_COUNT = 3;

    const TYPE_COLORS = {
      source: { r: 217, g: 119, b: 6 },
      entity: { r: 202, g: 138, b: 4 },
      concept: { r: 139, g: 92, b: 246 },
      wiki: { r: 229, g: 229, b: 229 },
    };

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
      nodes = [];
      links = [];
      phase = 0;
      phaseTimer = 0;
      const counts: Record<Node['type'], number> = { source: 18, entity: 12, concept: 12, wiki: 0 };
      let id = 0;
      (Object.keys(counts) as Node['type'][]).forEach((type) => {
        for (let i = 0; i < counts[type]; i++) {
          nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            targetX: Math.random() * width,
            targetY: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: type === 'wiki' ? 3.5 : 2 + Math.random() * 2,
            type,
            discovered: false,
            discoverProgress: 0,
            glowIntensity: 0,
            clusterId: id % CLUSTER_COUNT,
            trail: [],
            pulsePhase: Math.random() * Math.PI * 2,
          });
          id++;
        }
      });
    };

    const getClusterCenter = (id: number) => {
      const angle = (id / CLUSTER_COUNT) * Math.PI * 2 - Math.PI / 2;
      const r = Math.min(width, height) * 0.22;
      return { x: width / 2 + Math.cos(angle) * r, y: height / 2 + Math.sin(angle) * r };
    };

    const update = (dt: number) => {
      phaseTimer += dt;
      if (phaseTimer >= PHASE_DURATION) {
        phaseTimer = 0;
        phase = (phase + 1) % 5;
        if (phase === 0) {
          nodes.forEach((n) => {
            n.discovered = false;
            n.discoverProgress = 0;
            n.glowIntensity = 0;
            n.targetX = Math.random() * width;
            n.targetY = Math.random() * height;
            n.trail = [];
          });
          links = [];
        } else if (phase === 3) {
          const base = nodes.length;
          for (let i = 0; i < 5; i++) {
            const pIdx = Math.floor(Math.random() * base);
            const parent = nodes[pIdx];
            const wiki: Node = {
              x: parent.x,
              y: parent.y,
              targetX: parent.x + (Math.random() - 0.5) * 50,
              targetY: parent.y + (Math.random() - 0.5) * 50,
              vx: 0,
              vy: 0,
              radius: 3.5,
              type: 'wiki',
              discovered: true,
              discoverProgress: 1,
              glowIntensity: 0,
              clusterId: parent.clusterId,
              trail: [],
              pulsePhase: Math.random() * Math.PI * 2,
            };
            nodes.push(wiki);
            links.push({ from: pIdx, to: nodes.length - 1, progress: 0, pulseOffset: Math.random() * Math.PI * 2, pulseActive: false });
          }
        }
      }

      const progress = phaseTimer / PHASE_DURATION;

      // Discovery
      if (phase >= 1) {
        nodes.forEach((n) => {
          if (!n.discovered && progress > (n.clusterId + 1) / CLUSTER_COUNT * 0.55) {
            n.discovered = true;
          }
          if (n.discovered) {
            n.discoverProgress = Math.min(1, n.discoverProgress + dt * 0.0018);
            n.glowIntensity = Math.max(0, n.glowIntensity - dt * 0.0008);
            if (n.discoverProgress < 1) n.glowIntensity = n.discoverProgress * 0.7;
          }
        });
      }

      // Connection
      if (phase >= 2) {
        const needed = Math.floor(progress * 22);
        while (links.length < needed && links.length < 28) {
          const a = Math.floor(Math.random() * nodes.length);
          const b = Math.floor(Math.random() * nodes.length);
          if (a !== b && nodes[a].discovered && nodes[b].discovered && !links.some((l) => (l.from === a && l.to === b) || (l.from === b && l.to === a))) {
            links.push({ from: a, to: b, progress: 0, pulseOffset: Math.random() * Math.PI * 2, pulseActive: false });
          }
        }
        links.forEach((l) => {
          if (l.progress < 1) l.progress = Math.min(1, l.progress + dt * 0.0012);
          if (l.progress >= 1 && !l.pulseActive) l.pulseActive = true;
        });
      }

      // Organization
      if (phase >= 3) {
        nodes.forEach((n) => {
          const c = getClusterCenter(n.clusterId);
          n.targetX = c.x + Math.sin(n.pulsePhase) * 80;
          n.targetY = c.y + Math.cos(n.pulsePhase * 0.7) * 60;
          n.pulsePhase += dt * 0.0003;
        });
      }

      // Physics
      nodes.forEach((n) => {
        n.vx += (n.targetX - n.x) * 0.00025;
        n.vy += (n.targetY - n.y) * 0.00025;
        n.vx *= 0.955;
        n.vy *= 0.955;
        n.x += n.vx;
        n.y += n.vy;

        // Trail
        if (Math.abs(n.vx) > 0.1 || Math.abs(n.vy) > 0.1) {
          n.trail.push({ x: n.x, y: n.y, alpha: 0.3 });
          if (n.trail.length > 8) n.trail.shift();
        }
        n.trail.forEach((t) => { t.alpha *= 0.92; });
        n.trail = n.trail.filter((t) => t.alpha > 0.01);

        // Mouse
        if (mouseRef.current.active) {
          const dx = n.x - mouseRef.current.x;
          const dy = n.y - mouseRef.current.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 200 && d > 0) {
            const f = (200 - d) / 200;
            n.vx += (dx / d) * f * 1.5;
            n.vy += (dy / d) * f * 1.5;
            n.glowIntensity = Math.min(0.8, n.glowIntensity + 0.03);
          }
        }

        n.x = Math.max(15, Math.min(width - 15, n.x));
        n.y = Math.max(15, Math.min(height - 15, n.y));
      });

      // Ripples
      ripplesRef.current.forEach((r) => {
        r.radius += dt * 0.15;
        r.alpha *= 0.97;
      });
      ripplesRef.current = ripplesRef.current.filter((r) => r.alpha > 0.02);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Grid background
      ctx.strokeStyle = 'rgba(255,255,255,0.015)';
      ctx.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Draw links
      links.forEach((l) => {
        const a = nodes[l.from], b = nodes[l.to];
        if (!a || !b) return;
        const dx = b.x - a.x, dy = b.y - a.y;
        if (l.progress < 1) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(a.x + dx * l.progress, a.y + dy * l.progress);
          ctx.strokeStyle = `rgba(139,92,246,${0.12 + l.progress * 0.25})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = 'rgba(139,92,246,0.15)';
          ctx.lineWidth = 0.7;
          ctx.stroke();

          const pos = ((time * 0.0006 + l.pulseOffset) % 1);
          const px = a.x + dx * pos, py = a.y + dy * pos;
          ctx.beginPath(); ctx.arc(px, py, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(167,139,250,${0.5 + Math.sin(time * 0.003 + l.pulseOffset) * 0.3})`;
          ctx.fill();
        }

        if (l.progress > 0.5) {
          const mx = a.x + dx * 0.5, my = a.y + dy * 0.5;
          ctx.font = '9px "JetBrains Mono"';
          ctx.fillStyle = `rgba(139,92,246,${(l.progress - 0.5) * 2 * 0.25})`;
          ctx.textAlign = 'center';
          ctx.fillText('[[]]', mx, my - 5);
        }
      });

      // Draw trails
      nodes.forEach((n) => {
        if (n.trail.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(n.trail[0].x, n.trail[0].y);
        for (let i = 1; i < n.trail.length; i++) {
          ctx.lineTo(n.trail[i].x, n.trail[i].y);
        }
        const c = TYPE_COLORS[n.type];
        ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},0.08)`;
        ctx.lineWidth = n.radius * 0.8;
        ctx.lineCap = 'round';
        ctx.stroke();
      });

      // Draw ripples
      ripplesRef.current.forEach((r) => {
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = r.color.replace('ALPHA', String(r.alpha));
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((n) => {
        const c = TYPE_COLORS[n.type];
        const alpha = n.discovered ? 0.5 + n.discoverProgress * 0.5 : 0.1;
        const r = n.discovered ? n.radius : n.radius * 0.6;

        if (n.glowIntensity > 0) {
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 18 + n.glowIntensity * 25);
          g.addColorStop(0, `rgba(${c.r},${c.g},${c.b},${n.glowIntensity * 0.2})`);
          g.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`);
          ctx.beginPath(); ctx.arc(n.x, n.y, 18 + n.glowIntensity * 25, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }

        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${alpha})`;
        ctx.fill();

        if (n.discovered && n.discoverProgress > 0.5) {
          ctx.beginPath(); ctx.arc(n.x, n.y, r + 2.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${(n.discoverProgress - 0.5) * 0.35})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        if (n.type === 'wiki' && n.discoverProgress > 0.8) {
          ctx.font = '8px "JetBrains Mono"';
          ctx.fillStyle = `rgba(229,229,229,${n.discoverProgress * 0.4})`;
          ctx.textAlign = 'center';
          ctx.fillText('.md', n.x, n.y + r + 10);
        }
      });

      // Mouse connection lines
      if (mouseRef.current.active) {
        const mx = mouseRef.current.x, my = mouseRef.current.y;
        nodes.forEach((n) => {
          const dx = n.x - mx, dy = n.y - my;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 200) {
            ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(n.x, n.y);
            ctx.strokeStyle = `rgba(139,92,246,${(1 - d / 200) * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      }

      // Phase label
      const progress = phaseTimer / PHASE_DURATION;
      const names = ['Chaos', 'Discovery', 'Connection', 'Organization', 'Stable'];
      ctx.font = '10px "JetBrains Mono"';
      ctx.fillStyle = 'rgba(163,163,163,0.35)';
      ctx.textAlign = 'left';
      ctx.fillText(`${names[phase]} · ${(progress * 100).toFixed(0)}%`, 20, height - 20);
    };

    let lastTime = 0;
    const loop = (time: number) => {
      const dt = Math.min(time - lastTime, 40);
      lastTime = time;
      update(dt);
      draw(time);
      animFrameRef.current = requestAnimationFrame(loop);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onMouseLeave = () => { mouseRef.current.active = false; };
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Find nearest node
      let nearest = -1, minDist = Infinity;
      nodes.forEach((n, i) => {
        const d = Math.sqrt((n.x - x) ** 2 + (n.y - y) ** 2);
        if (d < minDist) { minDist = d; nearest = i; }
      });
      if (nearest >= 0 && minDist < 50) {
        const n = nodes[nearest];
        const c = TYPE_COLORS[n.type];
        ripplesRef.current.push({
          x: n.x, y: n.y, radius: 5, alpha: 0.6,
          color: `rgba(${c.r},${c.g},${c.b},ALPHA)`,
        });
        // Push neighbors away
        nodes.forEach((other, i) => {
          if (i === nearest) return;
          const dx = other.x - n.x, dy = other.y - n.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100 && d > 0) {
            const f = (100 - d) / 100;
            other.vx += (dx / d) * f * 3;
            other.vy += (dy / d) * f * 3;
          }
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('click', onClick);
    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('click', onClick);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full cursor-crosshair"
    />
  );
}
