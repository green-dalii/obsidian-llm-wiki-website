import { useRef, useEffect } from 'react';

export default function ProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!barRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      barRef.current.style.width = `${progress * 100}%`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-transparent">
      <div ref={barRef} className="h-full bg-obsidian-purple transition-[width] duration-75 ease-linear" style={{ width: '0%' }} />
    </div>
  );
}
