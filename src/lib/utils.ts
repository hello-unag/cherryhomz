// ─────────────────────────────────────────
// Cherry Homz – Utility Functions
// ─────────────────────────────────────────

/**
 * Merge class names, filtering out falsy values.
 * Lightweight alternative to `clsx` + `twMerge` — works well
 * for conditional Tailwind classes without extra dependencies.
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}

/**
 * Format a number as a Sydney dollar string.
 * @example formatPrice(1250000) → "$1,250,000"
 * @example formatPrice(750)     → "$750"
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Format an area value with the square-metre symbol.
 * @example formatArea(450) → "450 m²"
 */
export function formatArea(area: number): string {
  return `${area.toLocaleString("en-AU")} m²`;
}
