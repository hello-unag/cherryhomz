'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

/* ──────────────────────────────────────────────
   Option data
   ────────────────────────────────────────────── */

const LOCATIONS = [
  'All Suburbs',
  'Sydney',
  'Melbourne',
  'Brisbane',
  'Perth',
  'Gold Coast',
  'Adelaide',
] as const;

const PROPERTY_TYPES = [
  'All Types',
  'House',
  'Apartment',
  'Townhouse',
  'Land',
] as const;

const PRICE_RANGES = [
  'Any Price',
  '$0 - $500K',
  '$500K - $1M',
  '$1M - $2M',
  '$2M - $5M',
  '$5M+',
] as const;

const BEDROOMS = ['Any', '1+', '2+', '3+', '4+', '5+'] as const;

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */

interface SearchFilters {
  location: string;
  propertyType: string;
  priceRange: string;
  bedrooms: string;
}

interface FilterFieldProps {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}

/* ──────────────────────────────────────────────
   Reusable select field
   ────────────────────────────────────────────── */

function FilterField({ label, value, options, onChange }: FilterFieldProps) {
  return (
    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
      <label className="text-xs font-semibold tracking-wide uppercase text-ink/60">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full appearance-none cursor-pointer
            rounded-xl border border-line bg-surface
            px-4 py-3 pr-10
            text-sm font-medium text-ink
            outline-none
            transition-all duration-200
            hover:border-primary/40
            focus:border-primary focus:ring-2 focus:ring-primary/10
          "
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        {/* Custom chevron */}
        <svg
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Search icon SVG
   ────────────────────────────────────────────── */

function SearchIcon() {
  return (
    <svg
      className="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx={11} cy={11} r={8} />
      <line x1={21} y1={21} x2={16.65} y2={16.65} />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   SearchBar component
   ────────────────────────────────────────────── */

export default function SearchBar() {
  const [filters, setFilters] = useState<SearchFilters>({
    location: 'All Suburbs',
    propertyType: 'All Types',
    priceRange: 'Any Price',
    bedrooms: 'Any',
  });

  const updateFilter = <K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    // TODO: wire up to router / search page
    console.log('Search filters:', filters);
  };

  return (
    <div className="relative z-20 -mt-10 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="
          mx-auto max-w-[1200px]
          rounded-2xl
          border border-white/30
          bg-card/90 backdrop-blur-xl
          shadow-2xl shadow-black/8
          p-5 sm:p-6
        "
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-3">
          {/* ── Filter fields ── */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3 flex-1">
            <FilterField
              label="Location"
              value={filters.location}
              options={LOCATIONS}
              onChange={(v) => updateFilter('location', v)}
            />
            <FilterField
              label="Type"
              value={filters.propertyType}
              options={PROPERTY_TYPES}
              onChange={(v) => updateFilter('propertyType', v)}
            />
            <FilterField
              label="Price"
              value={filters.priceRange}
              options={PRICE_RANGES}
              onChange={(v) => updateFilter('priceRange', v)}
            />
            <FilterField
              label="Beds"
              value={filters.bedrooms}
              options={BEDROOMS}
              onChange={(v) => updateFilter('bedrooms', v)}
            />
          </div>

          {/* ── Search button ── */}
          <button
            type="button"
            onClick={handleSearch}
            className="
              flex items-center justify-center gap-2
              rounded-xl bg-primary px-8 py-3
              text-sm font-semibold text-white
              transition-all duration-200
              hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20
              active:bg-primary-active active:scale-[0.98]
              cursor-pointer
              w-full lg:w-auto
              whitespace-nowrap
            "
          >
            <SearchIcon />
            <span>Search</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
