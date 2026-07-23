'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  rating: number;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Cherry Homz made our first home purchase seamless. Their knowledge of the local market is unmatched and they truly cared about finding us the perfect fit.',
    name: 'James & Sarah Mitchell',
    role: 'First Home Buyers',
    initials: 'JM',
    rating: 5,
  },
  {
    quote:
      'Selling our property was stress-free thanks to the incredible team at Cherry Homz. They achieved a price well above our expectations in just three weeks.',
    name: 'Priya Sharma',
    role: 'Property Seller',
    initials: 'PS',
    rating: 5,
  },
  {
    quote:
      'As an investor, I need agents who understand the numbers. Cherry Homz consistently delivers outstanding investment properties with excellent returns.',
    name: 'David Chen',
    role: 'Property Investor',
    initials: 'DC',
    rating: 5,
  },
  {
    quote:
      'The whole experience was wonderful — from the first consultation to handing over the keys. I would recommend Cherry Homz to anyone looking for a home in Sydney.',
    name: 'Emma Whitfield',
    role: 'Homeowner',
    initials: 'EW',
    rating: 5,
  },
];

const AUTO_ROTATE_MS = 4000;

/* ------------------------------------------------------------------ */
/*  Star Icon                                                          */
/* ------------------------------------------------------------------ */

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 text-primary"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Slide variants                                                     */
/* ------------------------------------------------------------------ */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

/* ------------------------------------------------------------------ */
/*  Testimonials Section                                               */
/* ------------------------------------------------------------------ */

export default function TestimonialsSection() {
  const [[activeIndex, direction], setActive] = useState<[number, number]>([
    0, 1,
  ]);

  const paginate = useCallback(
    (newIndex: number) => {
      const dir = newIndex > activeIndex ? 1 : -1;
      setActive([newIndex, dir]);
    },
    [activeIndex],
  );

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(() => {
      setActive(([prev]) => {
        const next = (prev + 1) % TESTIMONIALS.length;
        return [next, 1];
      });
    }, AUTO_ROTATE_MS);

    return () => clearInterval(timer);
  }, []);

  const testimonial = TESTIMONIALS[activeIndex];

  return (
    <section
      id="testimonials"
      className="bg-bg py-24 px-6 md:px-12 lg:px-20"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-16 max-w-3xl text-center text-3xl font-bold text-ink md:text-5xl"
      >
        What Our Clients Say
      </motion.h2>

      {/* Carousel */}
      <div className="relative mx-auto max-w-2xl overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="bg-card rounded-2xl shadow-xl p-8"
          >
            {/* Opening quote */}
            <span className="block text-6xl leading-none text-primary font-serif select-none">
              &ldquo;
            </span>

            {/* Quote text */}
            <p className="mt-2 text-lg italic text-ink leading-relaxed">
              {testimonial.quote}
            </p>

            {/* Star rating */}
            <div className="mt-6 flex items-center justify-center gap-1">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>

            {/* Author */}
            <div className="mt-6 flex flex-col items-center gap-3">
              {/* Avatar */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-semibold text-sm">
                {testimonial.initials}
              </div>
              <div className="text-center">
                <p className="font-semibold text-ink">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="mt-10 flex items-center justify-center gap-3">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => paginate(i)}
            className={`h-3 w-3 rounded-full transition-colors duration-300 ${
              i === activeIndex ? 'bg-primary' : 'bg-line'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
