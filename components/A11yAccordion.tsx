'use client';
import { useId, useState } from 'react';

export function A11yAccordion({
  title,
  children,
  defaultOpen = false,
}: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const btnId = useId();
  const panelId = `${btnId}-panel`;

  return (
    <div className="border rounded-xl">
      <h3 className="m-0">
        <button
          id={btnId}
          className="w-full text-left px-4 py-3 focus:outline-none focus-visible:ring rounded-xl"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(o => !o)}
        >
          <span className="inline-flex items-center gap-2">
            <span className="font-medium">{title}</span>
            <span aria-hidden>{open ? '−' : '+'}</span>
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        hidden={!open}
        className="px-4 pb-4"
      >
        {children}
      </div>
    </div>
  );
}
