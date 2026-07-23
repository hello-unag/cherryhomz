'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ChineseTranslateButton from './ChineseTranslateButton';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Slide {
  src: string;
  mobileSrc?: string;
  title: string;
  subtitle: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const slides: Slide[] = [
  {
    src: '/images/hero_modern_custom_house.png',
    title: 'Find Your Dream Home',
    subtitle:
      'Discover premium Sydney properties in the most desirable neighbourhoods',
  },
  {
    src: '/images/hero-apartments.png',
    title: 'Luxury Apartment Living',
    subtitle:
      "Experience world-class high-rise living in Australia's premier cities",
  },
  {
    src: '/images/hero-blossom.jpg',
    mobileSrc: '/images/hero-blossom-mobile.jpg',
    title: '',
    subtitle: 'Your trusted partner in Sydney real estate, customer-centric throughout your property journey',
  },
];

const AUTOPLAY_MS = 5_000;

/* ------------------------------------------------------------------ */
/*  Framer-motion variants                                             */
/* ------------------------------------------------------------------ */

const imageVariants: any = {
  enter: { opacity: 0, scale: 1.08 },
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 1.04,
    transition: { duration: 0.9, ease: 'easeInOut' },
  },
};

const textContainerVariants: any = {
  enter: { opacity: 0 },
  center: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

const textChildVariants: any = {
  enter: { opacity: 0, y: 30, filter: 'blur(6px)' },
  center: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(4px)',
    transition: { duration: 0.4 },
  },
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

/** Chevron SVG arrow used for left / right navigation */
function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.2}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={
          direction === 'left'
            ? 'M15.75 19.5 8.25 12l7.5-7.5'
            : 'm8.25 4.5 7.5 7.5-7.5 7.5'
        }
      />
    </svg>
  );
}



/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---- Navigation helpers ---- */
  const goTo = useCallback((index: number) => {
    setCurrent((index + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  /* ---- Auto-play ---- */
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(next, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, isPaused, next]);

  const slide = slides[current];

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden select-none"
      onMouseEnter={() => {
        setIsPaused(true);
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsPaused(false);
        setIsHovering(false);
      }}
      aria-roledescription="carousel"
      aria-label="Hero image carousel"
    >
      {/* ============================================================ */}
      {/*  Background images with crossfade                            */}
      {/* ============================================================ */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.src}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 z-0"
        >
          {slide.mobileSrc ? (
            <>
              {/* Desktop Image */}
              <Image
                src={slide.src}
                alt={slide.title}
                fill
                priority={current === 0}
                className="object-cover hidden md:block"
                sizes="100vw"
                quality={90}
              />
              {/* Mobile Image */}
              <Image
                src={slide.mobileSrc}
                alt={slide.title}
                fill
                priority={current === 0}
                className="object-cover block md:hidden"
                sizes="100vw"
                quality={90}
              />
            </>
          ) : (
            <Image
              src={slide.src}
              alt={slide.title}
              fill
              priority={current === 0}
              className="object-cover"
              sizes="100vw"
              quality={90}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ============================================================ */}
      {/*  Gradient overlays                                           */}
      {/* ============================================================ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-black/10 to-black/70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/40 via-transparent to-black/20"
      />

      {/* ============================================================ */}
      {/*  Left-aligned text overlay                                   */}
      {/* ============================================================ */}
      <div className="absolute inset-0 z-20 flex items-end justify-start pl-0 pr-6 pb-32 md:pr-16 lg:pr-24 lg:pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            variants={textContainerVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex max-w-3xl flex-col items-start text-left mt-16 md:mt-0"
          >
            <motion.div
              variants={textChildVariants}
              className="flex flex-col items-start"
            >
              {/* Title */}
              {slide.title && (
                <motion.h1
                  variants={textChildVariants}
                  className="font-extrabold leading-[1.08] tracking-tight text-white
                             text-4xl md:text-6xl lg:text-7xl
                             drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
                >
                  {slide.title}
                </motion.h1>
              )}

              {/* Subtitle */}
              {slide.subtitle && (
                <motion.p
                  variants={textChildVariants}
                  className="mt-5 max-w-2xl text-lg font-medium text-white/90 md:mt-6 md:text-xl
                             drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
                >
                  {slide.subtitle}
                </motion.p>
              )}

              {/* CTA buttons */}
              <motion.div
                variants={textChildVariants}
                className="mt-8 flex flex-row flex-wrap items-center gap-3 md:gap-4 justify-start md:mt-10"
              >
                {/* Primary CTA */}
                <motion.a
                  href="#properties"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 md:gap-3 rounded-full bg-primary px-5 py-2.5 md:px-8 md:py-4
                             text-xs md:text-base font-bold uppercase tracking-widest text-white shadow-lg
                             shadow-primary/30 transition-colors duration-300
                             hover:bg-primary-hover active:bg-primary-active
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Featured Properties
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="h-4 w-4 md:h-5 md:w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </motion.a>

                {/* Chinese translation button */}
                <ChineseTranslateButton inline={true} />
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ============================================================ */}
      {/*  Left / Right arrows (visible on hover)                      */}
      {/* ============================================================ */}
      <motion.button
        onClick={prev}
        aria-label="Previous slide"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute left-4 top-1/2 z-30 -translate-y-1/2
                   flex h-12 w-12 items-center justify-center rounded-full
                   border border-white/20 bg-black/30 text-white backdrop-blur-md
                   transition-colors duration-200 hover:bg-primary/80
                   cursor-pointer md:left-6 md:h-14 md:w-14"
      >
        <ArrowIcon direction="left" />
      </motion.button>

      <motion.button
        onClick={next}
        aria-label="Next slide"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute right-4 top-1/2 z-30 -translate-y-1/2
                   flex h-12 w-12 items-center justify-center rounded-full
                   border border-white/20 bg-black/30 text-white backdrop-blur-md
                   transition-colors duration-200 hover:bg-primary/80
                   cursor-pointer md:right-6 md:h-14 md:w-14"
      >
        <ArrowIcon direction="right" />
      </motion.button>


    </section>
  );
}
