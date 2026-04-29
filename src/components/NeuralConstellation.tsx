import { useRef, useEffect } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  glowTimer: number;
  isGlowing: boolean;
}

export default function NeuralConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    const NODE_COUNT = 70;
    const CONNECTION_DIST = 160;
    const MOUSE_REPULSION = 220;
    const GLOW_INTERVAL = 5000;
    let lastGlowTime = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: 1.5 + Math.random() * 1.5,
          baseAlpha: 0.3 + Math.random() * 0.2,
          glowTimer: 0,
          isGlowing: false,
        });
      }
    };

    const updateNodes = () => {
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        const dx = node.x - mouseRef.current.x;
        const dy = node.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_REPULSION && dist > 0) {
          const force = (MOUSE_REPULSION - dist) / MOUSE_REPULSION;
          node.vx += (dx / dist) * force * 0.8;
          node.vy += (dy / dist) * force * 0.8;
        }

        node.vx *= 0.98;
        node.vy *= 0.98;

        if (node.isGlowing) {
          node.glowTimer -= 16;
          if (node.glowTimer <= 0) node.isGlowing = false;
        }
      }

      const now = Date.now();
      if (now - lastGlowTime > GLOW_INTERVAL) {
        const count = 3 + Math.floor(Math.random() * 3);
        for (let i = 0; i < count; i++) {
          const idx = Math.floor(Math.random() * nodes.length);
          nodes[idx].isGlowing = true;
          nodes[idx].glowTimer = 1500 + Math.random() * 1000;
        }
        lastGlowTime = now;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(123, 108, 230, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw mouse connections
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx >= 0 && my >= 0) {
        for (const node of nodes) {
          const dx = node.x - mx;
          const dy = node.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_REPULSION) {
            const alpha = (1 - dist / MOUSE_REPULSION) * 0.15;
            ctx.beginPath();
            ctx.moveTo(mx, my);
            ctx.lineTo(node.x, node.y);
            ctx.strokeStyle = `rgba(200, 164, 92, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

        if (node.isGlowing) {
          const progress = 1 - node.glowTimer / 2500;
          const glowAlpha = Math.sin(progress * Math.PI) * 0.8 + 0.2;
          ctx.fillStyle = `rgba(200, 164, 92, ${glowAlpha})`;
          ctx.shadowColor = 'rgba(200, 164, 92, 0.6)';
          ctx.shadowBlur = 12;
        } else {
          ctx.fillStyle = `rgba(242, 242, 240, ${node.baseAlpha})`;
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const animate = () => {
      updateNodes();
      draw();
      animFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ touchAction: 'none' }}
    />
  );
}
