'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Value checklist                                                    */
/* ------------------------------------------------------------------ */

const HIGHLIGHTS = [
  {
    title: 'Local Suburb Experts',
    copy: 'Our agents live and work in the streets they sell — real street-by-street knowledge.',
  },
  {
    title: 'Honest, No-Pressure Advice',
    copy: 'Straight answers on price and process, every time. No inflated appraisals.',
  },
  {
    title: 'Marketing That Sells',
    copy: 'Professional photography, floorplans and premium campaigns as standard.',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
};

/* ------------------------------------------------------------------ */
/*  About Section — homepage teaser                                    */
/* ------------------------------------------------------------------ */

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-bg py-24 md:py-32">
      {/* Decorative blossom-pink blobs */}
      <div aria-hidden className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent-soft blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-primary/5 blur-2xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-12 lg:grid-cols-2 lg:gap-16 lg:px-20">
        {/* ---- Image panel ---- */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative order-2 lg:order-1"
        >
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden rounded-[2.5rem] shadow-2xl lg:max-w-none">
            <Image
              src="/images/hero-blossom.jpg"
              alt="A cherry-blossom-lined street in one of the suburbs Cherry Homz serves"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 45vw"
              quality={85}
            />
          </div>

          {/* Cherry accent ring behind the frame */}
          <div aria-hidden className="absolute -bottom-6 -right-6 -z-10 h-40 w-40 rounded-[2rem] border-8 border-accent-soft lg:-right-8" />

          {/* Floating experience badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute -bottom-6 left-6 rounded-2xl bg-primary px-6 py-4 text-white shadow-xl shadow-primary/30 sm:left-8"
          >
            <p className="text-2xl font-extrabold leading-none">15+</p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-white/80">Years Trusted</p>
          </motion.div>
        </motion.div>

        {/* ---- Content ---- */}
        <div className="order-1 lg:order-2">
          <motion.p {...fadeUp} transition={{ duration: 0.5 }} className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            About Cherry Homz
          </motion.p>

          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-3 text-3xl font-bold leading-tight text-ink md:text-5xl"
          >
            Australia&apos;s Premier Boutique Real Estate Agency
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 text-base leading-relaxed text-muted md:text-lg"
          >
            We combine deep local expertise with a passion for connecting people to their
            perfect spaces. Whether you&apos;re buying your first home, securing a luxury
            waterfront estate, or searching for the ideal investment property, our dedicated
            team makes sure your property journey blossoms with success.
          </motion.p>

          {/* Highlight checklist */}
          <ul className="mt-8 flex flex-col gap-5">
            {HIGHLIGHTS.map((item, i) => (
              <motion.li
                key={item.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.24 + i * 0.08 }}
                className="flex items-start gap-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-ink">{item.title}</p>
                  <p className="mt-0.5 text-sm text-muted">{item.copy}</p>
                </div>
              </motion.li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  );
}
