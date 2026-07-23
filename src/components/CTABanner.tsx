'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  CTA Banner                                                         */
/* ------------------------------------------------------------------ */

export default function CTABanner() {
  return (
    <section
      id="contact"
      className="relative bg-accent-soft py-24 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Subtle gradient overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 mx-auto max-w-4xl"
      >
        {/* Glassmorphism container */}
        <div className="rounded-3xl border border-line-accent bg-card p-12 md:p-16 text-center shadow-2xl">
          {/* Title */}
          <h2 className="text-3xl font-bold text-ink md:text-5xl leading-tight">
            Ready to Find Your Dream&nbsp;Property?
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Let our experienced team guide you through every step of your
            property journey
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Primary CTA */}
            <Link href="/contact" passHref legacyBehavior>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-primary-hover cursor-pointer"
              >
                Get Started Today
              </motion.a>
            </Link>

            {/* Secondary CTA */}
            <motion.a
              href="tel:0470593442"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(155,27,48,0.05)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center rounded-xl border border-primary px-8 py-4 text-base font-semibold text-primary transition-colors"
            >
              Call Us Now
            </motion.a>
          </div>

          {/* Phone number */}
          <p className="mt-8 text-base font-medium tracking-wide text-ink">
            0470 593 442
          </p>
        </div>
      </motion.div>
    </section>
  );
}
