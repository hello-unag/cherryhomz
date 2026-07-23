'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Stat {
  target: number;
  suffix: string;
  label: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const STATS: Stat[] = [
  { target: 500, suffix: '+', label: 'Properties Sold' },
  { target: 200, suffix: '+', label: 'Active Listings' },
  { target: 50, suffix: '+', label: 'Suburbs Covered' },
  { target: 15, suffix: '+', label: 'Years Experience' },
];

/* ------------------------------------------------------------------ */
/*  Animated Counter Hook                                              */
/* ------------------------------------------------------------------ */

function useCountUp(target: number, duration = 2000, start = false): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let raf: number;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return count;
}

/* ------------------------------------------------------------------ */
/*  Stat Card                                                          */
/* ------------------------------------------------------------------ */

interface StatCardProps {
  stat: Stat;
  index: number;
  inView: boolean;
}

function StatCard({ stat, index, inView }: StatCardProps) {
  const count = useCountUp(stat.target, 2000, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      className="bg-card rounded-2xl shadow-lg p-8 text-center"
    >
      <p className="text-4xl md:text-5xl font-bold text-primary">
        {count}
        <span>{stat.suffix}</span>
      </p>
      <p className="mt-3 text-lg text-ink">{stat.label}</p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats Section                                                      */
/* ------------------------------------------------------------------ */

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      });
    },
    [],
  );

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.25,
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [handleIntersection]);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="bg-surface py-24 px-6 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}
