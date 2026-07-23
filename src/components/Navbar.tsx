'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface NavLink {
  label: string;
  href: string;
  disabled?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Buy', href: '/buy' },
  { label: 'Sell', href: '/sell' },
  { label: 'Sold', href: '/sold' },
  { label: 'Build With Us', href: '/build-with-us' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];


const SCROLL_THRESHOLD = 50;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  /* ---- Scroll detection via framer-motion ---- */
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > SCROLL_THRESHOLD);
  });

  /* ---- Close drawer on route change ---- */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /* ---- Lock body scroll when mobile drawer is open ---- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          boxShadow: scrolled
            ? '0 1px 24px rgba(0, 0, 0, 0.08)'
            : '0 0px 0px rgba(0, 0, 0, 0)',
        }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-50 bg-card backdrop-blur-xl"
      >
        <nav className="mx-auto flex h-[70px] max-w-[1440px] items-center justify-between pl-2 pr-6 md:pl-4 md:pr-12 lg:pl-6 lg:pr-20">
          {/* ---- Logo ---- */}
          <Link href="/" className="flex flex-col items-center gap-0 select-none">
            <span className="text-xl font-extrabold tracking-tight md:text-2xl" style={{ color: 'var(--primary)' }}>
              CHERRY HOMZ
            </span>
            <span className="text-[10px] font-medium tracking-widest uppercase md:text-[11px]" style={{ color: '#2563eb' }}>
              Where Property Dreams Blossom
            </span>
          </Link>

          {/* ---- Desktop Nav Links (Centered) ---- */}
          <ul className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  {link.disabled ? (
                    <span
                      className="relative inline-flex items-center justify-center rounded-xl px-4 py-2 text-[15px] font-bold text-gray-400 opacity-50 cursor-not-allowed"
                    >
                      {link.label}
                    </span>
                  ) : (
                    <Link
                      href={link.href}
                      className={`relative inline-flex items-center justify-center rounded-xl px-4 py-2 text-[15px] font-bold transition-colors duration-200 ${
                        active ? 'text-[var(--primary)]' : 'text-[var(--ink)] hover:text-[var(--primary)]'
                      }`}
                      style={{
                        backgroundColor: active ? 'rgba(155, 27, 48, 0.08)' : 'transparent',
                      }}
                    >
                      {link.label}
                      {active && (
                        <motion.span
                          layoutId="nav-active-indicator"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2.5px] w-5 rounded-full"
                          style={{ backgroundColor: 'var(--primary)' }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  )}
                </li>
              );
            })}


          </ul>

          {/* ---- Right Side Elements ---- */}
          <div className="flex items-center gap-4 md:gap-6">
          {/* ---- Call Button ---- */}
          <a
            href="tel:0470593442"
            aria-label="Call Us"
            className="flex items-center justify-center rounded-xl bg-primary p-2 md:p-2.5 text-white transition-colors duration-200 hover:bg-primary-hover shadow-md shadow-primary/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-5 md:h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.273-3.973-6.869-6.87l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </a>

          {/* ---- Social Icons ---- */}
          <div className="hidden lg:flex items-center gap-3 border-l border-line pl-4 ml-1">
            <a href="#" aria-label="Facebook" className="text-ink hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" className="text-ink hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="#" aria-label="X (Twitter)" className="text-ink hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 1200 1227" fill="currentColor"><path d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.187 687.854v-.026Z"/></svg>
            </a>
          </div>

          {/* ---- Mobile Hamburger ---- */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block h-[2.5px] w-6 rounded-full"
              style={{ backgroundColor: 'var(--ink)' }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="block h-[2.5px] w-6 rounded-full"
              style={{ backgroundColor: 'var(--ink)' }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block h-[2.5px] w-6 rounded-full"
              style={{ backgroundColor: 'var(--ink)' }}
            />
          </button>
          </div>
        </nav>
      </motion.header>

      {/* ---- Mobile Drawer Overlay ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-50 flex h-full w-[280px] flex-col bg-card shadow-2xl lg:hidden"
            >
              {/* Drawer Header */}
              <div className="flex h-[70px] items-center justify-between pl-2 pr-6 border-b" style={{ borderColor: 'var(--line)' }}>
                <span className="text-lg font-extrabold tracking-tight" style={{ color: 'var(--primary)' }}>
                  CHERRY HOMZ
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-line"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round">
                    <line x1="4" y1="4" x2="16" y2="16" />
                    <line x1="16" y1="4" x2="4" y2="16" />
                  </svg>
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="flex flex-1 flex-col gap-1 px-4 pt-6 overflow-y-auto">
                {NAV_LINKS.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3 }}
                    >
                      {link.disabled ? (
                        <span className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-semibold text-gray-400 opacity-50 cursor-not-allowed">
                          <span className="h-1.5 w-1.5 rounded-full shrink-0 bg-gray-300" />
                          {link.label}
                        </span>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-semibold transition-colors duration-200"
                          style={{
                            color: active ? '#9B1B30' : '#2C2C2C',
                            backgroundColor: active ? 'rgba(155, 27, 48, 0.06)' : 'transparent',
                          }}
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full shrink-0 transition-colors duration-200"
                            style={{ backgroundColor: active ? '#9B1B30' : '#E5E5E5' }}
                          />
                          {link.label}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}


              </nav>

              {/* Drawer Footer */}
              <div className="px-6 pb-8">
                <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--surface)' }}>
                  <p className="text-xs font-medium" style={{ color: '#2563eb' }}>
                    Where Property Dreams Blossom
                  </p>
                  <p className="mt-1 text-xs" style={{ color: 'var(--primary)' }}>
                    info@cherryhomz.com.au
                  </p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
