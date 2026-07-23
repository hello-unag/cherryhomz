'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

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

interface PropertyMapProps {
  lat: number;
  lng: number;
}

export default function PropertyMap({ lat, lng }: PropertyMapProps) {
  const [mounted, setMounted] = useState(false);
  const [customIcon, setCustomIcon] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    import('leaflet/dist/leaflet.css');
    const L = require('leaflet');
    
    setCustomIcon(
      L.divIcon({
        className: 'bg-transparent border-none',
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 48px; height: 48px; filter: drop-shadow(0px 6px 8px rgba(155,27,48,0.5)); transform: translateY(-10px);"><circle cx="12" cy="10.5" r="4" fill="white" /><path fill="var(--primary)" fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>`,
        iconSize: [48, 48],
        iconAnchor: [24, 44],
      })
    );
  }, []);

  if (!mounted || !customIcon) {
    return (
      <div className="w-full h-full bg-surface flex items-center justify-center animate-pulse rounded-xl">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <MapContainer 
      center={[lat, lng]} 
      zoom={14} 
      scrollWheelZoom={false}
      className="w-full h-full rounded-xl z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <Marker position={[lat, lng]} icon={customIcon} />
    </MapContainer>
  );
}
