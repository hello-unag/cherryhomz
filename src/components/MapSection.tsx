'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Dynamically import Leaflet components to prevent SSR errors
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface CityData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  count: number;
}

const cities: CityData[] = [
  { id: 'syd', name: 'Sydney', lat: -33.8688, lng: 151.2093, count: 45 },
  { id: 'melb', name: 'Melbourne', lat: -37.8136, lng: 144.9631, count: 38 },
  { id: 'bris', name: 'Brisbane', lat: -27.4698, lng: 153.0251, count: 22 },
  { id: 'perth', name: 'Perth', lat: -31.9505, lng: 115.8605, count: 18 },
  { id: 'gc', name: 'Gold Coast', lat: -28.0167, lng: 153.4, count: 31 },
  { id: 'adl', name: 'Adelaide', lat: -34.9285, lng: 138.6007, count: 15 },
];

export default function MapSection() {
  const [mounted, setMounted] = useState(false);
  // Leaflet icon needs to be created on client side
  const [customIcon, setCustomIcon] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    // Import leaflet CSS here if not imported in layout
    import('leaflet/dist/leaflet.css');
    const L = require('leaflet');
    
    setCustomIcon(
      L.divIcon({
        className: 'custom-leaflet-icon',
        html: `<div class="w-4 h-4 bg-primary border-2 border-white rounded-full shadow-[0_0_10px_rgba(155,27,48,0.8)] flex items-center justify-center relative"><div class="absolute -bottom-1 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[5px] border-t-primary"></div></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 16],
        popupAnchor: [0, -16],
      })
    );
  }, []);

  return (
    <section id="map" className="py-24 px-6 md:px-12 lg:px-20 bg-accent-soft relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-ink mb-4"
          >
            Explore Locations
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted max-w-2xl mx-auto text-lg"
          >
            Discover properties across Australia's most sought-after suburbs
          </motion.p>
        </div>

        {/* Map Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl mx-auto h-[500px] md:h-[600px] rounded-2xl overflow-hidden border border-[rgba(155,27,48,0.1)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] mb-12 relative z-20"
        >
          {mounted && customIcon ? (
            <MapContainer 
              center={[-28.0, 135.0]} 
              zoom={4.5} 
              scrollWheelZoom={false}
              className="w-full h-full z-0"
              style={{ background: 'var(--accent-soft)' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />
              
              {cities.map((city) => (
                <Marker 
                  key={city.id} 
                  position={[city.lat, city.lng]} 
                  icon={customIcon}
                >
                  <Popup className="bg-card border border-line-accent rounded-xl overflow-hidden shadow-xl">
                    <div className="p-3 text-center min-w-[120px]">
                      <h3 className="text-ink font-bold text-lg mb-1">{city.name}</h3>
                      <p className="text-muted text-sm mb-3">{city.count} Properties</p>
                      <button className="text-primary text-sm font-semibold hover:text-primary-hover transition-colors">
                        Browse Listings →
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          ) : (
            <div className="w-full h-full bg-accent-soft flex items-center justify-center animate-pulse">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </motion.div>

        {/* City Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {cities.map((city, index) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2, borderColor: 'var(--primary)' }}
              className="bg-card border border-line-accent shadow-sm rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors group hover:bg-card"
            >
              <div className="w-2 h-2 rounded-full bg-primary mb-2 group-hover:scale-150 transition-transform shadow-[0_0_8px_rgba(155,27,48,0.8)]" />
              <h4 className="text-ink font-semibold mb-1 text-center">{city.name}</h4>
              <p className="text-muted text-xs text-center">{city.count} Properties</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
