import { useRef, useEffect } from 'react';

interface DocumentNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  angle: number;
  connections: number[];
  label: string;
  cluster: number;
  opacity: number;
  scale: number;
}

interface Connection {
  from: number;
  to: number;
  progress: number;
  phase: 'growing' | 'stable' | 'sprouting';
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
    let nodes: DocumentNode[] = [];
    let connections: Connection[] = [];
    let phase = 0;
    let frameCount = 0;

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
      for (let i = 0; i < 18; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          width: 8 + Math.random() * 12,
          height: 12 + Math.random() * 16,
          angle: Math.random() * 0.2 - 0.1,
          connections: [],
          label: Math.random() > 0.5 ? 'md' : '',
          cluster: i % 4,
          opacity: 0.4,
          scale: 0.6,
        });
      }
    };

    const update = () => {
      frameCount++;

      if (frameCount % 200 === 0) {
        phase = (phase + 1) % 4;
      }

      if (phase === 0) {
        nodes.forEach(n => {
          n.vx += (Math.random() - 0.5) * 0.05;
          n.vy += (Math.random() - 0.5) * 0.05;
          n.scale = Math.max(0.6, n.scale - 0.001);
          n.opacity = Math.max(0.3, n.opacity - 0.002);
        });
      }

      if (phase === 1 && connections.length < 25) {
        const a = Math.floor(Math.random() * nodes.length);
        const b = Math.floor(Math.random() * nodes.length);
        if (a !== b && nodes[a].cluster === nodes[b].cluster) {
          const dist = Math.sqrt((nodes[a].x - nodes[b].x) ** 2 + (nodes[a].y - nodes[b].y) ** 2);
          if (dist < 150 && !connections.some(c => (c.from === a && c.to === b) || (c.from === b && c.to === a))) {
            connections.push({ from: a, to: b, progress: 0, phase: 'growing' });
            nodes[a].connections.push(b);
            nodes[b].connections.push(a);
          }
        }
      }

      if (phase === 2) {
        nodes.forEach(n => {
          const clusterNodes = nodes.filter(other => other.cluster === n.cluster && other !== n);
          if (clusterNodes.length > 0) {
            const avgX = clusterNodes.reduce((sum, other) => sum + other.x, 0) / clusterNodes.length;
            const avgY = clusterNodes.reduce((sum, other) => sum + other.y, 0) / clusterNodes.length;
            n.vx += (avgX - n.x) * 0.0001;
            n.vy += (avgY - n.y) * 0.0001;
          }
          n.scale = Math.min(1.2, n.scale + 0.002);
          n.opacity = Math.min(0.9, n.opacity + 0.003);
        });
      }

      if (phase === 3 && nodes.length < 30) {
        if (frameCount % 50 === 0) {
          const parentIdx = Math.floor(Math.random() * nodes.length);
          const parent = nodes[parentIdx];
          if (parent.connections.length > 0) {
            const newNode: DocumentNode = {
              x: parent.x + (Math.random() - 0.5) * 60,
              y: parent.y + (Math.random() - 0.5) * 60,
              vx: 0,
              vy: 0,
              width: 6 + Math.random() * 8,
              height: 10 + Math.random() * 12,
              angle: 0,
              connections: [parentIdx],
              label: 'wiki',
              cluster: parent.cluster,
              opacity: 0,
              scale: 0.3,
            };
            nodes.push(newNode);
            connections.push({ from: parentIdx, to: nodes.length - 1, progress: 0, phase: 'sprouting' });
          }
        }
      }

      connections.forEach(c => {
        if (c.phase === 'growing' || c.phase === 'sprouting') {
          c.progress = Math.min(1, c.progress + 0.02);
        }
      });

      nodes.forEach(n => {
        n.vx *= 0.98;
        n.vy *= 0.98;
        n.x += n.vx;
        n.y += n.vy;
        n.x = Math.max(20, Math.min(width - 20, n.x));
        n.y = Math.max(20, Math.min(height - 20, n.y));
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      connections.forEach(c => {
        const a = nodes[c.from];
        const b = nodes[c.to];
        if (!a || !b) return;

        const dx = b.x - a.x;
        const dy = b.y - a.y;

        if (c.progress > 0) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          const midX = (a.x + b.x) / 2 + dy * 0.1;
          const midY = (a.y + b.y) / 2 - dx * 0.1;
          ctx.quadraticCurveTo(midX, midY, a.x + dx * c.progress, a.y + dy * c.progress);
          ctx.strokeStyle = `rgba(139,92,246,${0.15 + c.progress * 0.3})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      nodes.forEach(n => {
        ctx.save();
        ctx.translate(n.x, n.y);
        ctx.rotate(n.angle);
        ctx.scale(n.scale, n.scale);

        if (n.connections.length > 0 && n.opacity > 0.6) {
          ctx.shadowColor = 'rgba(139,92,246,0.3)';
          ctx.shadowBlur = 15;
        }

        ctx.fillStyle = n.label === 'wiki'
          ? `rgba(139,92,246,${n.opacity})`
          : `rgba(217,119,6,${n.opacity})`;

        ctx.beginPath();
        ctx.roundRect(-n.width / 2, -n.height / 2, n.width, n.height, 2);
        ctx.fill();

        if (n.label && n.scale > 0.8) {
          ctx.fillStyle = `rgba(255,255,255,${n.opacity * 0.6})`;
          ctx.font = '6px JetBrains Mono';
          ctx.textAlign = 'center';
          ctx.fillText(n.label === 'wiki' ? '.md' : '📄', 0, 0);
        }

        ctx.restore();
      });

      const phaseNames = ['Scatter', 'Growth', 'Cluster', 'Sprout'];
      ctx.font = '10px JetBrains Mono';
      ctx.fillStyle = 'rgba(163,163,163,0.3)';
      ctx.fillText(`Phase: ${phaseNames[phase]}`, 20, height - 20);
    };

    const loop = () => {
      update();
      draw();
      requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener('resize', resize);
    loop();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}