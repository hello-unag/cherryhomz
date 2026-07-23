'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Floating theme switcher.                                           */
/*  Sits bottom-left (mirrors the WhatsApp button on the right) and    */
/*  clears the mobile tab bar. Writes the choice to localStorage and   */
/*  flips data-theme on <html>; the inline script in layout.tsx reads  */
/*  the same key on load to avoid a flash of the wrong theme.          */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = 'cherry-theme';

type ThemeId = 'cherry' | 'fresh' | 'tech';

interface ThemeOption {
  id: ThemeId;
  name: string;
  blurb: string;
  /* swatch: [background, accent/secondary, primary cherry] */
  swatch: [string, string, string];
}

const THEMES: ThemeOption[] = [
  {
    id: 'cherry',
    name: 'Cherry Classic',
    blurb: 'Clean white & cherry red',
    swatch: ['#FFFFFF', '#FAFAF8', '#9B1B30'],
  },
  {
    id: 'fresh',
    name: 'Fresh & Natural',
    blurb: 'Warm cream & sage green',
    swatch: ['#FBF6EC', '#CBD8BC', '#9B1B30'],
  },
  {
    id: 'tech',
    name: 'Sky Blue',
    blurb: 'Bright sky-blue & cherry',
    swatch: ['#DCEFFB', '#7FB9E0', '#9B1B30'],
  },
];

function readTheme(): ThemeId {
  if (typeof window === 'undefined') return 'cherry';
  const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
  return saved && THEMES.some((t) => t.id === saved) ? saved : 'cherry';
}

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeId>(readTheme);

  const applyTheme = useCallback((id: ThemeId) => {
    setTheme(id);
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* storage may be unavailable (private mode) — theme still applies */
    }
    document.documentElement.setAttribute('data-theme', id);
  }, []);

  return (
    <div className="fixed bottom-[60px] right-4 z-50 lg:bottom-6 lg:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute bottom-16 right-0 w-64 overflow-hidden rounded-2xl border border-line bg-card p-2 shadow-[0_16px_48px_rgba(0,0,0,0.18)]"
            role="listbox"
            aria-label="Choose a theme"
          >
            <p className="px-3 pb-1.5 pt-2 text-[11px] font-bold uppercase tracking-wider text-muted">
              Choose a theme
            </p>
            {THEMES.map((option) => {
              const active = option.id === theme;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => applyTheme(option.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    active ? 'bg-accent-soft' : 'hover:bg-surface'
                  }`}
                >
                  <span className="flex shrink-0 overflow-hidden rounded-full border border-line shadow-sm">
                    {option.swatch.map((c, i) => (
                      <span key={i} className="h-6 w-2.5" style={{ backgroundColor: c }} />
                    ))}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-ink">{option.name}</span>
                    <span className="block truncate text-xs text-muted">{option.blurb}</span>
                  </span>
                  {active && (
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4 shrink-0 text-primary"
                      aria-hidden
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 0 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-contrast shadow-lg transition-colors hover:bg-primary-hover"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5, type: 'spring' }}
        aria-label="Change colour theme"
        aria-expanded={open}
      >
        {/* Swatch / palette icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 22a10 10 0 1 1 0-20 8 8 0 0 1 8 8 4 4 0 0 1-4 4h-2.5a1.5 1.5 0 0 0-1 2.6 1.5 1.5 0 0 1-1 2.6Z" />
          <circle cx="7.5" cy="10.5" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="12" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="16.5" cy="10.5" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      </motion.button>
    </div>
  );
}
