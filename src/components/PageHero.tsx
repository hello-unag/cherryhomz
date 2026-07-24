'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Compact hero banner shared by all inner pages.                     */
/* ------------------------------------------------------------------ */

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  stats?: { value: string; label: string }[];
}

export default function PageHero({ eyebrow, title, subtitle, image, stats }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-night">
      {/* Background image + overlay */}
      <div className="absolute inset-0">
        <Image src={image} alt="" fill priority className="object-cover opacity-70" sizes="100vw" quality={80} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-14 md:px-12 md:pt-40 md:pb-20 lg:px-20">
        {/* Breadcrumb */}
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 flex items-center gap-2 text-xs font-medium text-white/70 md:text-sm"
        >
          <Link href="/" className="transition-colors hover:text-white">Home</Link>
          <span aria-hidden>/</span>
          <span className="text-white">{eyebrow}</span>
        </motion.nav>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="max-w-3xl text-3xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 md:text-lg"
        >
          {subtitle}
        </motion.p>

        {stats && stats.length > 0 && (
          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-md"
              >
                <dt className="order-2 text-[11px] font-medium uppercase tracking-wider text-white/70">
                  {s.label}
                </dt>
                <dd className="text-xl font-bold text-white md:text-2xl">{s.value}</dd>
              </div>
            ))}
          </motion.dl>
        )}
      </div>
    </section>
  );
}
