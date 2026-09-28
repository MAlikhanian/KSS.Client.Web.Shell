'use client';

import { ReactNode } from 'react';

interface ThemeSplitFrameProps {
  title: string;
  description?: string;
  children: ReactNode;
}

/**
 * Renders the same children twice — once inside a light-mode forced wrapper
 * and once inside a dark-mode forced wrapper — side-by-side. Lets you compare
 * a design in both themes without toggling the site theme.
 *
 * Tailwind dark variants react to the `dark` class on an ancestor, so wrapping
 * one pane in `<div className="dark">` activates the dark CSS variables for
 * everything inside (e.g. `bg-card` resolves to the dark theme color).
 */
export function ThemeSplitFrame({ title, description, children }: ThemeSplitFrameProps) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Light pane — explicit white bg + dark text wins over the site theme */}
        <div className="light bg-white text-gray-900 p-4 rounded-lg border border-gray-200">
          <div className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 mb-3">
            Light
          </div>
          {children}
        </div>

        {/* Dark pane — `dark` class flips Tailwind into dark mode for descendants */}
        <div className="dark bg-gray-950 text-gray-100 p-4 rounded-lg border border-gray-800">
          <div className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 mb-3">
            Dark
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
