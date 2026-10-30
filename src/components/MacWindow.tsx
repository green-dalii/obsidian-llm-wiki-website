import type { ReactNode } from 'react';

interface Props {
  title: ReactNode;
  children: ReactNode;
  contentClassName?: string;
  className?: string;
}

export default function MacWindow({ title, children, contentClassName = 'p-4 overflow-y-auto h-[520px]', className = '' }: Props) {
  return (
    <div className={`rounded-xl border border-line-strong bg-surface-2 overflow-hidden font-mono text-xs leading-relaxed ${className}`}>
      <div className="h-9 bg-surface-2 border-b border-line-strong flex items-center px-3.5 gap-2">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57] opacity-90" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e] opacity-90" />
        <span className="w-3 h-3 rounded-full bg-[#28c840] opacity-90" />
        <div className="ml-3 flex items-center gap-1.5">
          {title}
        </div>
      </div>
      <div className={contentClassName}>
        {children}
      </div>
    </div>
  );
}
