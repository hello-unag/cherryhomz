'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { properties } from '@/data/properties';
import PropertyCard from './PropertyCard';

type TabType = 'all' | 'buy' | 'rent' | 'sold' | 'land';

export default function FeaturedProperties() {
  const [activeTab, setActiveTab] = useState<TabType>('buy');

  const tabs: { id: TabType; label: string; disabled?: boolean }[] = [
    { id: 'buy', label: 'For Sale' },
  ];

  const filteredProperties = properties
    .filter((prop) => activeTab === 'all' || prop.category === activeTab)
    .slice(0, 6);

  return (
    <section id="properties" className="py-24 px-6 md:px-12 lg:px-20 bg-surface">
      <div className="max-w-7xl mx-auto">


        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            if (tab.disabled) {
              return (
                <span
                  key={tab.id}
                  className="px-6 py-2.5 rounded-full text-sm font-medium bg-surface text-muted opacity-60 cursor-not-allowed select-none"
                >
                  {tab.label}
                </span>
              );
            }
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  active
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-surface text-muted hover:bg-line'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Property Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="text-center">
          <button className="bg-card border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-300 inline-flex items-center gap-2 group">
            View All Properties
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transform group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
