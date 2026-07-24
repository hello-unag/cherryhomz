'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  About page body — story, values, team and milestones.              */
/* ------------------------------------------------------------------ */

const VALUES = [
  {
    title: 'Local Knowledge',
    copy: 'Our agents live in the suburbs they sell. Street-by-street insight, from school catchments to future rezoning.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    title: 'Honest Advice',
    copy: 'No inflated appraisals, no pressure tactics. We tell you what your property is really worth — and how to get more for it.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    title: 'Results Driven',
    copy: 'Data-led campaigns, premium marketing and skilled negotiation. Our auction clearance rate sits well above the Sydney average.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
  },
  {
    title: 'Community First',
    copy: 'A share of every sale supports local schools, surf clubs and community gardens across the suburbs we call home.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
];

const TEAM = [
  { name: 'Sophie Nguyen', role: 'Principal & Licensed Agent', photo: '/images/team-sophie-nguyen.png?v=2' },
  { name: 'Marcus Sterling', role: 'Sales Executive', photo: '/images/agent_photo_1783129600216.png' },
  { name: 'Daniel Rossi', role: 'Head of Sales', photo: '/images/team-daniel-rossi.png?v=2' },
  { name: 'Aisha Khan', role: 'Senior Property Manager', photo: '/images/team-aisha-khan.png?v=2' },
  { name: 'Oliver Bennett', role: 'Buyers Agent', photo: '/images/team-oliver-bennett.png?v=2' },
  { name: 'Grace Taylor', role: 'Marketing Director', photo: '/images/team-grace-taylor.png?v=2' },
];

const MILESTONES = [
  { year: '2011', text: 'Cherry Homz opens its first office on George Street, Sydney — two agents and one very optimistic whiteboard.' },
  { year: '2015', text: '100th property sold. Property management division launches with a 24-hour maintenance promise.' },
  { year: '2019', text: 'Named Sydney Boutique Agency of the Year. Expansion into Melbourne, Brisbane and Perth.' },
  { year: '2022', text: '$1 billion in total sales. Our Kellyville land division helps 60 families build their first homes.' },
  { year: '2026', text: '500+ properties sold across 50+ suburbs — and we still answer every call like it\'s our first.' },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function AboutPageContent() {
  return (
    <>
      {/* ---- Our story ---- */}
      <section className="bg-bg py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:px-12 lg:grid-cols-2 lg:gap-16 lg:px-20">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/images/about-office.png?v=2"
                alt="The Cherry Homz office on George Street, Sydney"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={75}
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 left-5 rounded-2xl bg-primary px-6 py-4 text-white shadow-xl shadow-primary/30">
              <p className="text-xl font-extrabold leading-none">Customer First</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/80">In Every Journey</p>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Our Story</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-ink md:text-5xl">
              A Boutique Agency With a Big-City Track Record
            </h2>
             <div className="mt-6 space-y-4 text-base leading-relaxed text-muted md:text-lg">
              <p>
                At Cherry Homz, we believe that real estate should be about people, not just transactions. 
                Our mission is to support and guide our clients with honest advice, local expertise, and 
                a truly customer-centric approach throughout their entire home purchase and selling journey.
              </p>
              <p>
                Whether you are buying your first home, upgrading, or searching for the perfect investment, 
                our team is dedicated to providing transparent advice, exceptional marketing, and personalized service 
                every step of the way.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---- Values ---- */}
      <section className="bg-accent-soft py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mb-12 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">What We Stand For</p>
            <h2 className="mt-3 text-3xl font-bold text-ink md:text-5xl">The Cherry Homz Way</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-line-accent bg-card p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-primary">
                  {v.icon}
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
