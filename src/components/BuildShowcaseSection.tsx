'use client';

import Link from 'next/link';
import { properties } from '@/data/properties';
import PropertyCard from './PropertyCard';

export default function BuildShowcaseSection() {
  // Select 6 house & land packages / built homes
  const buildProperties = properties.filter((p) =>
    [
      'prop-strathfield-showcase',
      'prop-wahroonga-showcase',
      'prop-box-hill-lot6',
      'prop-marsden-park-5bed',
      'prop-austral',
      'prop-thornleigh-showcase',
    ].includes(p.id)
  );

  return (
    <section className="py-16 md:py-24 px-6 bg-surface border-t border-b border-line">
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="text-center mb-14">
          <span className="text-primary text-sm font-bold uppercase tracking-widest block mb-2">
            Homes Built With Cherry Homz
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
            Recent Projects & House Packages
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg leading-relaxed">
            Explore homes and packages created with the guidance of Cherry Homz and our network of trusted licensed builders across Sydney.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {buildProperties.map((property) => (
            <PropertyCard key={property.id} property={property} showcaseOnly={true} />
          ))}
        </div>

        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/buy"
            className="px-8 py-3.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover transition-colors shadow-md"
          >
            View All Buy Listings
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            Inquire About Building
          </Link>
        </div>
      </div>
    </section>
  );
}
