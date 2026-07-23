'use client';

import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Category {
  title: string;
  count: string;
  description: string;
  icon: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/*  SVG Icons                                                          */
/* ------------------------------------------------------------------ */

const HouseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 10.182V22h18V10.182L12 2 3 10.182Z" />
    <path d="M9 22V14h6v8" />
  </svg>
);

const KeyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="8" cy="15" r="5" />
    <path d="M11.5 11.5 21 2" />
    <path d="M17 2h4v4" />
    <path d="M16 7l-1.5 1.5" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m8 12 3 3 5-5" />
  </svg>
);

const MapIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4Z" />
    <path d="M8 2v16" />
    <path d="M16 6v16" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const categories: Category[] = [
  {
    title: 'Buy',
    count: '120+ Listings',
    description:
      'Discover your dream home from our curated selection of premium properties across Australia.',
    icon: <HouseIcon />,
  },
  {
    title: 'Rent',
    count: '85+ Listings',
    description:
      'Flexible rental options in prime locations, from studio apartments to family estates.',
    icon: <KeyIcon />,
  },
  {
    title: 'Sold',
    count: '200+ Properties',
    description:
      'Browse our track record of successfully sold properties and market-leading results.',
    icon: <CheckCircleIcon />,
  },
  {
    title: 'Land',
    count: '45+ Blocks',
    description:
      'Secure prime land parcels and build the home you\'ve always envisioned.',
    icon: <MapIcon />,
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CategorySection() {
  return (
    <section
      id="categories"
      className="relative overflow-hidden py-24 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: 'var(--accent-soft)' }}
    >
      {/* Decorative radial glow behind the section */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(155,27,48,0.08) 0%, transparent 70%)',
        }}
      />

      {/* ---- Heading ---- */}
      <motion.div
        className="relative z-10 mx-auto max-w-3xl text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-ink mb-4">
          Explore by Category
        </h2>
        <p className="text-lg" style={{ color: 'var(--muted)' }}>
          Find the perfect property to match your lifestyle
        </p>
      </motion.div>

      {/* ---- Cards grid ---- */}
      <motion.div
        className="relative z-10 mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {categories.map((cat) => (
          <CategoryCard key={cat.title} category={cat} />
        ))}
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Card                                                               */
/* ------------------------------------------------------------------ */

function CategoryCard({ category }: { category: Category }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -4,
        boxShadow: '0 0 30px 2px rgba(155,27,48,0.18)',
        borderColor: 'rgba(155,27,48,0.7)',
      }}
      className="group relative rounded-2xl p-8 cursor-pointer transition-colors duration-300 shadow-md"
      style={{
        backgroundColor: 'var(--card)',
        border: '1px solid var(--line-accent)',
      }}
    >
      {/* Icon */}
      <div className="mb-6 text-muted transition-colors duration-300 group-hover:text-primary">
        {category.icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-ink mb-1">
        {category.title}
      </h3>

      {/* Count */}
      <p className="text-sm font-medium mb-3" style={{ color: 'var(--muted)' }}>
        {category.count}
      </p>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
        {category.description}
      </p>

      {/* View All link */}
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1">
        View All
        <ArrowRightIcon />
      </span>
    </motion.div>
  );
}
