'use client';

import { useMemo, useState } from 'react';
import PropertyCard from '@/components/PropertyCard';
import { properties, Property } from '@/data/properties';

/* ------------------------------------------------------------------ */
/*  ListingsExplorer — shared filterable grid for Buy/Rent/Sold/Land.  */
/*  Mobile-first: search + quick type chips always visible, extra      */
/*  filters live in a collapsible panel behind a "Filters" toggle.     */
/* ------------------------------------------------------------------ */

interface PriceRange {
  label: string;
  min: number;
  max: number;
}

const SALE_PRICE_RANGES: PriceRange[] = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under $1M', min: 0, max: 1_000_000 },
  { label: '$1M – $2M', min: 1_000_000, max: 2_000_000 },
  { label: '$2M – $5M', min: 2_000_000, max: 5_000_000 },
  { label: '$5M+', min: 5_000_000, max: Infinity },
];

const RENT_PRICE_RANGES: PriceRange[] = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under $600 /wk', min: 0, max: 600 },
  { label: '$600 – $900 /wk', min: 600, max: 900 },
  { label: '$900 – $1,200 /wk', min: 900, max: 1_200 },
  { label: '$1,200+ /wk', min: 1_200, max: Infinity },
];

const BEDROOM_OPTIONS = ['Any', '1+', '2+', '3+', '4+', '5+'] as const;

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]['value'];

const TYPE_LABELS: Record<Property['type'], string> = {
  house: 'House',
  apartment: 'Apartment',
  townhouse: 'Townhouse',
  land: 'Land',
};

interface ListingsExplorerProps {
  category: Property['category'];
  headline: string;
}

export default function ListingsExplorer({ category, headline }: ListingsExplorerProps) {
  const pool = useMemo(() => properties.filter((p) => p.category === category), [category]);

  const priceRanges = category === 'rent' ? RENT_PRICE_RANGES : SALE_PRICE_RANGES;

  /* Types present in category + primary chips (House, Apartment, Townhouse) */
  const availableTypes = useMemo(() => {
    const typesInPool = new Set(pool.map((p) => p.type));
    const orderedTypes: Property['type'][] = ['house', 'apartment', 'townhouse', 'land'];
    return orderedTypes.filter((t) => typesInPool.has(t) || t === 'house' || t === 'apartment' || t === 'townhouse');
  }, [pool]);

  const [query, setQuery] = useState('');
  const [type, setType] = useState<'all' | Property['type']>('all');
  const [beds, setBeds] = useState<(typeof BEDROOM_OPTIONS)[number]>('Any');
  const [priceIdx, setPriceIdx] = useState(0);
  const [sort, setSort] = useState<SortValue>('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeFilterCount =
    (beds !== 'Any' ? 1 : 0) + (priceIdx !== 0 ? 1 : 0) + (sort !== 'featured' ? 1 : 0);

  const clearAll = () => {
    setQuery('');
    setType('all');
    setBeds('Any');
    setPriceIdx(0);
    setSort('featured');
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const range = priceRanges[priceIdx];
    const minBeds = beds === 'Any' ? 0 : Number(beds[0]);

    const filtered = pool.filter((p) => {
      if (q && !`${p.title} ${p.suburb} ${p.address} ${p.state}`.toLowerCase().includes(q)) return false;
      if (type !== 'all' && p.type !== type) return false;
      if (p.bedrooms < minBeds) return false;
      if (p.price < range.min || p.price >= range.max) return false;
      return true;
    });

    const sorted = [...filtered];
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      default:
        sorted.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    }
    return sorted;
  }, [pool, query, type, beds, priceIdx, sort, priceRanges]);

  const selectClass =
    'w-full appearance-none cursor-pointer rounded-xl border border-line bg-card px-4 py-3 pr-9 text-sm font-medium text-ink outline-none transition-all duration-200 hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/10';

  return (
    <section className="bg-surface py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 lg:px-20">
        {/* ---- Search + filter controls ---- */}
        <div className="rounded-2xl border border-line-accent bg-card p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] md:p-5">
          <div className="flex gap-2">
            {/* Search input */}
            <div className="relative flex-1">
              <svg
                className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-primary"
                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              >
                <circle cx={11} cy={11} r={8} />
                <line x1={21} y1={21} x2={16.65} y2={16.65} />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search suburb, street or keyword…"
                aria-label="Search listings"
                className="w-full rounded-xl border border-line bg-surface py-3 pl-10 pr-4 text-sm font-medium text-ink outline-none transition-all duration-200 placeholder:text-faint focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* Filters toggle (mobile) */}
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              className="relative flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-primary/40 md:hidden"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="6" x2="20" y2="6" /><line x1="7" y1="12" x2="17" y2="12" /><line x1="10" y1="18" x2="14" y2="18" />
              </svg>
              Filters
              {activeFilterCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Quick type chips — horizontally scrollable on mobile */}
          <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {(['all', ...availableTypes] as const).map((t) => {
              const active = type === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className="shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200"
                  style={{
                    backgroundColor: active ? 'var(--primary)' : 'var(--accent-soft)',
                    color: active ? 'var(--primary-contrast)' : 'var(--primary)',
                    border: `1px solid ${active ? 'var(--primary)' : 'var(--line-accent)'}`,
                  }}
                >
                  {t === 'all' ? 'All Types' : TYPE_LABELS[t]}
                </button>
              );
            })}
          </div>

          {/* Extra filters — collapsible on mobile, always open on md+ */}
          <div className={`${filtersOpen ? 'grid' : 'hidden'} mt-4 grid-cols-1 gap-3 sm:grid-cols-3 md:grid`}>
                {category !== 'land' && (
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-ink/60">Bedrooms</span>
                    <div className="relative">
                      <select value={beds} onChange={(e) => setBeds(e.target.value as typeof beds)} className={selectClass}>
                        {BEDROOM_OPTIONS.map((b) => (
                          <option key={b} value={b}>{b === 'Any' ? 'Any Bedrooms' : `${b} Beds`}</option>
                        ))}
                      </select>
                      <Chevron />
                    </div>
                  </label>
                )}

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-ink/60">Price</span>
                  <div className="relative">
                    <select value={priceIdx} onChange={(e) => setPriceIdx(Number(e.target.value))} className={selectClass}>
                      {priceRanges.map((r, i) => (
                        <option key={r.label} value={i}>{r.label}</option>
                      ))}
                    </select>
                    <Chevron />
                  </div>
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-ink/60">Sort By</span>
                  <div className="relative">
                    <select value={sort} onChange={(e) => setSort(e.target.value as SortValue)} className={selectClass}>
                      {SORT_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                    <Chevron />
                  </div>
                </label>
          </div>
        </div>

        {/* ---- Result count ---- */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-ink md:text-2xl">
            {headline}
            <span className="ml-2 text-sm font-semibold text-primary md:text-base">
              {results.length} {results.length === 1 ? 'property' : 'properties'}
            </span>
          </h2>

          {(activeFilterCount > 0 || query || type !== 'all') && (
            <button
              type="button"
              onClick={clearAll}
              className="text-sm font-semibold text-primary underline-offset-4 transition-colors hover:text-primary-hover hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* ---- Grid ---- */}
        {results.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {results.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-line-accent bg-card px-6 py-16 text-center">
            <span className="text-4xl" aria-hidden>🌸</span>
            <h3 className="mt-4 text-lg font-bold text-ink">No properties match your search</h3>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Try widening your price range or removing a filter — new Sydney listings are added every week.
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="btn-cherry mt-6 rounded-xl px-6 py-3 text-sm font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Chevron() {
  return (
    <svg
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden
    >
      <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
  );
}
