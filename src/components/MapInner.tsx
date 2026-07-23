'use client';

import { useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */

interface CityMarker {
  name: string;
  lat: number;
  lng: number;
  properties: number;
  price: string;
  image: string;
}

interface MapInnerProps {
  cities: CityMarker[];
}

/* ──────────────────────────────────────────────
   Custom cherry-red pin icon
   ────────────────────────────────────────────── */

function createCherryIcon(): L.DivIcon {
  return L.divIcon({
    className: '', // disable default leaflet styling
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -44],
    html: `
      <div style="position:relative;width:30px;height:42px;">
        <svg width="30" height="42" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 0C6.716 0 0 6.716 0 15c0 10.5 15 27 15 27s15-16.5 15-27C30 6.716 23.284 0 15 0z" fill="var(--primary)"/>
          <circle cx="15" cy="14" r="6" fill="white" fill-opacity="0.9"/>
          <circle cx="15" cy="14" r="3" fill="var(--primary)"/>
        </svg>
        <div style="
          position:absolute;
          bottom:-4px;
          left:50%;
          transform:translateX(-50%);
          width:10px;
          height:4px;
          background:rgba(0,0,0,0.3);
          border-radius:50%;
          filter:blur(2px);
        "></div>
      </div>
    `,
  });
}

/* ──────────────────────────────────────────────
   Leaflet default-icon fix
   ────────────────────────────────────────────── */

function useFixDefaultIcon() {
  useEffect(() => {
    // Remove broken default icon URLs that Webpack injects
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);
}

/* ──────────────────────────────────────────────
   Custom popup styles (injected once)
   ────────────────────────────────────────────── */

function useCustomPopupStyles() {
  useEffect(() => {
    const id = 'cherry-map-popup-styles';
    if (document.getElementById(id)) return;

    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      .cherry-popup .leaflet-popup-content-wrapper {
        background: rgba(10, 10, 10, 0.85);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        padding: 0;
        overflow: hidden;
      }
      .cherry-popup .leaflet-popup-content {
        margin: 0;
        min-width: 220px;
      }
      .cherry-popup .leaflet-popup-tip {
        background: rgba(10, 10, 10, 0.85);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-top: none;
        border-left: none;
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
      }
      .cherry-popup .leaflet-popup-close-button {
        color: rgba(255, 255, 255, 0.6) !important;
        font-size: 18px !important;
        top: 8px !important;
        right: 10px !important;
        width: 20px !important;
        height: 20px !important;
      }
      .cherry-popup .leaflet-popup-close-button:hover {
        color: var(--primary) !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const el = document.getElementById(id);
      el?.parentNode?.removeChild(el);
    };
  }, []);
}

/* ──────────────────────────────────────────────
   MapInner component
   ────────────────────────────────────────────── */

export default function MapInner({ cities }: MapInnerProps) {
  useFixDefaultIcon();
  useCustomPopupStyles();

  const cherryIcon = createCherryIcon();

  return (
    <MapContainer
      center={[-25.2744, 133.7751]}
      zoom={4}
      scrollWheelZoom={false}
      className="h-full w-full"
      style={{ background: 'var(--night)' }}
    >
      {/* Dark CartoDB tiles */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {/* City markers */}
      {cities.map((city) => (
        <Marker
          key={city.name}
          position={[city.lat, city.lng]}
          icon={cherryIcon}
        >
          <Popup className="cherry-popup" maxWidth={260} minWidth={220}>
            <div>
              {/* Thumbnail */}
              <div className="relative h-28 w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={city.image}
                  alt={city.name}
                  className="h-full w-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Info */}
              <div className="p-4">
                <h3
                  style={{
                    margin: 0,
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {city.name}
                </h3>

                <p
                  style={{
                    margin: '4px 0 0',
                    fontSize: '13px',
                    color: 'var(--primary)',
                    fontWeight: 600,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {city.price}
                </p>

                <p
                  style={{
                    margin: '6px 0 0',
                    fontSize: '12px',
                    color: 'rgba(229,229,229,0.6)',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {city.properties} properties available
                </p>

                <button
                  type="button"
                  style={{
                    marginTop: '10px',
                    width: '100%',
                    padding: '8px 0',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    background: 'var(--primary)',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = 'var(--primary-hover)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = 'var(--primary)')
                  }
                >
                  View Properties →
                </button>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
