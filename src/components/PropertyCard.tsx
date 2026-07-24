'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import PropertyMap from '@/components/PropertyMap';
import { Property } from '@/data/properties';
import { formatPrice, formatArea } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  showcaseOnly?: boolean;
}

const SWIPE_THRESHOLD = 40;

export default function PropertyCard({ property, showcaseOnly = false }: PropertyCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // renamed slightly to avoid conflict if I messed up, wait the original is 'mounted'
  const [mounted, setMounted] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isWechatQrOpen, setIsWechatQrOpen] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const didSwipeRef = useRef(false);
  const shareRef = useRef<HTMLDivElement>(null);

  // Close share dropdown when clicking outside
  useEffect(() => {
    if (!isShareOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setIsShareOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isShareOpen]);

  const images = property.gallery && property.gallery.length > 0 ? property.gallery : [property.image];

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIdx((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIdx((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
  };

  const handleSwipeEnd = (_e: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) {
      didSwipeRef.current = true;
      if (info.offset.x < 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
  };

  const handleCardClick = () => {
    // Suppress the click-to-open-modal that fires right after a swipe drag.
    if (didSwipeRef.current) {
      didSwipeRef.current = false;
      return;
    }
    setIsModalOpen(true);
  };

  const handleModalImageClick = () => {
    if (didSwipeRef.current) {
      didSwipeRef.current = false;
      return;
    }
    setIsLightboxOpen(true);
  };

  useEffect(() => {
    setMounted(true);
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      // Optionally, add the property param to URL when open
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        if (url.searchParams.get('property') !== property.id.toString()) {
          url.searchParams.set('property', property.id.toString());
          window.history.replaceState({}, '', url.pathname + url.search);
        }
      }
    } else {
      document.body.style.overflow = 'unset';
      // Remove the property param from URL when closed
      if (typeof window !== 'undefined' && mounted) {
        const url = new URL(window.location.href);
        if (url.searchParams.has('property')) {
          url.searchParams.delete('property');
          window.history.replaceState({}, '', url.pathname + url.search);
        }
      }
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, property.id, mounted]);

  // Handle direct links
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('property') === property.id.toString()) {
        setIsModalOpen(true);
      }
    }
  }, [property.id]);

  const badgeColors = {
    buy: 'bg-green-600',
    rent: 'bg-blue-600',
    sold: 'bg-primary',
    land: 'bg-amber-600',
  };

  const badgeLabels = {
    buy: 'FOR SALE',
    rent: 'FOR RENT',
    sold: 'SOLD',
    land: 'LAND',
  };

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}?property=${property.id}` : '';
  const shareImage = typeof window !== 'undefined' ? `${window.location.origin}${property.image}` : '';
  const featuresText = property.type === 'land' 
    ? `Area: ${property.area ? property.area + ' m²' : 'N/A'}` 
    : `${property.bedrooms} Beds | ${property.bathrooms} Baths | ${property.carSpaces} Cars | ${property.area ? property.area + ' m²' : 'N/A'}`;
  const shareText = `Check out this amazing property!\n\n${property.address}, ${property.suburb}\nFeatures: ${featuresText}\n\nView full details here: ${shareUrl}`;
  const encodedShareText = encodeURIComponent(shareText);
  const emailSubject = encodeURIComponent(`Property for sale: ${property.address}, ${property.suburb}`);

  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Detect if the page is currently translated to Chinese
    const isChinese = document.cookie
      .split(';')
      .some(
        (c) =>
          c.trim().startsWith('googtrans=') &&
          (c.includes('zh-CN') || c.includes('zh') || c.includes('%2Fzh'))
      );

    // Helper: read translated DOM text if Chinese, else use raw JS value
    const t = (selector: string, fallback: string): string => {
      if (!isChinese) return fallback;
      const el = document.querySelector(`[data-pdf="${selector}"]`);
      return el?.textContent?.trim() || fallback;
    };

    const pdfTitle       = t('title', property.title);
    const pdfDescription = t('description', property.description);
    const pdfFeatures    = property.features.map((f, idx) => t(`feature-${idx}`, f));

    // Section headings (translated from DOM)
    const headDescription = t('h-description', 'Property Description');
    const headFeatures    = t('h-features',    'Key Features');
    const headInspection  = t('h-inspection',  'Inspection Times');
    const headAgent       = t('h-agent',       'Contact Agent');
    const labelDay        = t('col-day',        'Day');
    const labelDate       = t('col-date',       'Date');
    const labelTime       = t('col-time',       'Time');
    const labelSalesExec  = t('label-sales',    'Principal');
    const headPhotos      = t('h-photos',       'Property Photos');

    const featuresHTML = pdfFeatures
      .map((f) => `<li>&#10003; &nbsp;${f}</li>`)
      .join('');

    const inspectionHTML = property.inspectionTimes
      ? property.inspectionTimes
          .map((t) => {
            const parts = t.split(' - ');
            const dateSplit = parts[0].split(', ');
            const day = dateSplit.length > 1 ? dateSplit[0].substring(0, 3) : '';
            const date = dateSplit.length > 1 ? dateSplit[1] : parts[0];
            return `<tr><td>${day}</td><td>${date}</td><td>${parts[1] || ''}</td></tr>`;
          })
          .join('')
      : '';

    const bedsHTML =
      property.type !== 'land'
        ? `<div class="stat"><strong>${property.bedrooms}</strong><span>Beds</span></div>
           <div class="stat"><strong>${property.bathrooms}</strong><span>Baths</span></div>
           <div class="stat"><strong>${property.carSpaces}</strong><span>Cars</span></div>`
        : '';

    const badgeClass =
      property.category === 'sold'
        ? 'badge-sold'
        : property.category === 'rent'
        ? 'badge-rent'
        : property.category === 'land'
        ? 'badge-land'
        : 'badge-buy';

    // Build gallery: up to 4 images, absolute URLs so the print window can load them
    const origin = window.location.origin;
    const galleryImages = images.slice(0, 4);
    const galleryHTML = galleryImages
      .map(
        (src) =>
          `<div class="gal-item"><img src="${origin}${src}" alt="Property photo" /></div>`
      )
      .join('');

    const html = `
<!DOCTYPE html>
<html lang="${isChinese ? 'zh-CN' : 'en-AU'}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${property.address}, ${property.suburb} — Cherry Homz</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:'Segoe UI',Arial,sans-serif; color:#1a1a1a; background:#fff; padding:44px; max-width:820px; margin:0 auto; }
    /* Header */
    .header { display:flex; justify-content:space-between; align-items:flex-start; border-bottom:3px solid #9B1B30; padding-bottom:18px; margin-bottom:26px; }
    .brand { font-size:22px; font-weight:900; color:#9B1B30; letter-spacing:-0.5px; }
    .tagline { font-size:10px; color:#2563eb; letter-spacing:2.5px; text-transform:uppercase; margin-top:2px; }
    /* Badge */
    .badge { font-size:11px; font-weight:700; padding:5px 14px; border-radius:20px; text-transform:uppercase; letter-spacing:1px; color:#fff; }
    .badge-buy  { background:#16a34a; }
    .badge-sold { background:#9B1B30; }
    .badge-rent { background:#2563eb; }
    .badge-land { background:#d97706; }
    /* Property title block */
    .prop-title { font-size:24px; font-weight:800; color:#1a1a1a; margin-bottom:4px; }
    .prop-address { font-size:14px; color:#555; margin-bottom:14px; display:flex; align-items:center; gap:6px; }
    .price { font-size:30px; font-weight:900; color:#9B1B30; margin-bottom:20px; }
    /* Stats bar */
    .stats { display:flex; gap:0; background:#f8f8f8; border-radius:12px; overflow:hidden; margin-bottom:28px; border:1px solid #eee; }
    .stat { flex:1; text-align:center; padding:14px 8px; border-right:1px solid #eee; }
    .stat:last-child { border-right:none; }
    .stat strong { display:block; font-size:20px; font-weight:800; color:#1a1a1a; }
    .stat span { font-size:10px; color:#2563eb; text-transform:uppercase; letter-spacing:1.5px; }
    /* Sections */
    .section { margin-bottom:26px; }
    h2 { font-size:16px; font-weight:700; color:#1a1a1a; margin-bottom:10px; padding-bottom:7px; border-bottom:1.5px solid #f0f0f0; }
    p { font-size:13.5px; line-height:1.75; color:#444; }
    /* Features list */
    ul.features { list-style:none; display:grid; grid-template-columns:1fr 1fr; gap:7px; }
    ul.features li { font-size:13px; color:#444; padding:3px 0; }
    /* Table */
    table { width:100%; border-collapse:collapse; font-size:13px; border-radius:10px; overflow:hidden; }
    th { background:#9B1B30; color:#fff; padding:10px 14px; text-align:left; font-weight:600; }
    td { padding:9px 14px; border-bottom:1px solid #eee; color:#444; }
    tr:nth-child(even) td { background:#fafafa; }
    /* Agent box */
    .agent-box { background:#f8f8f8; border-radius:12px; padding:18px 20px; display:flex; justify-content:space-between; align-items:center; border:1px solid #eee; }
    .agent-name { font-weight:700; font-size:15px; color:#1a1a1a; }
    .agent-role { font-size:12px; color:#777; margin-bottom:6px; }
    .agent-contact div { font-size:13px; color:#444; margin-bottom:4px; }
    /* Divider */
    .divider { border:none; border-top:1.5px solid #f0f0f0; margin:26px 0; }
    /* Photo gallery – 2×2 grid, 4 images per sheet */
    .gallery { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:28px; }
    .gal-item { width:100%; height:190px; overflow:hidden; border-radius:10px; border:1px solid #eee; background:#f5f5f5; }
    .gal-item img { width:100%; height:100%; object-fit:cover; display:block; }
    /* Footer */
    .footer { margin-top:36px; padding-top:14px; border-top:1px solid #eee; text-align:center; font-size:11px; color:#aaa; line-height:1.8; }
    @media print {
      body { padding:20px; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
      .gallery { break-inside:avoid; page-break-inside:avoid; }
      .gal-item { break-inside:avoid; page-break-inside:avoid; }
      .gal-item img { width:100%; height:190px; object-fit:cover; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">CHERRY HOMZ</div>
      <div class="tagline">Where Property Dreams Blossom</div>
    </div>
    <span class="badge ${badgeClass}">${badgeLabels[property.category]}</span>
  </div>

  <div class="section">
    <div class="prop-title">${pdfTitle}</div>
    <div class="prop-address">📍 ${property.address}, ${property.suburb} ${property.state}${property.postcode ? ' ' + property.postcode : ''}</div>
    <div class="price">${formatPrice(property.price)}</div>
    <div class="stats">
      ${bedsHTML}
      <div class="stat"><strong>${property.area}</strong><span>m²</span></div>
    </div>
  </div>

  <hr class="divider" />

  <div class="section">
    <h2>${headPhotos}</h2>
    <div class="gallery">${galleryHTML}</div>
  </div>

  <hr class="divider" />

  <div class="section">
    <h2>${headDescription}</h2>
    <p>${pdfDescription}</p>
  </div>

  <div class="section">
    <h2>${headFeatures}</h2>
    <ul class="features">${featuresHTML}</ul>
  </div>

  ${property.inspectionTimes ? `
  <div class="section">
    <h2>${headInspection}</h2>
    <table>
      <thead><tr><th>${labelDay}</th><th>${labelDate}</th><th>${labelTime}</th></tr></thead>
      <tbody>${inspectionHTML}</tbody>
    </table>
  </div>` : ''}

  ${property.agent ? `
  <hr class="divider" />
  <div class="section">
    <h2>${headAgent}</h2>
    <div class="agent-box">
      <div>
        <div class="agent-name">Shree Ganesh</div>
        <div class="agent-role">${labelSalesExec}</div>
      </div>
      <div class="agent-contact">
        <div>📞 &nbsp;${property.agent.phone}</div>
        <div>✉ &nbsp;info@cherryhomz.com.au</div>
      </div>
    </div>
  </div>` : ''}

  <div class="footer">
    <p><strong>Cherry Homz</strong> &nbsp;|&nbsp; Where Property Dreams Blossom &nbsp;|&nbsp; info@cherryhomz.com.au</p>
    <p>Generated on ${new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
  </div>
</body>
</html>`;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 600);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={handleCardClick}
      className="rounded-2xl overflow-hidden bg-card shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full group cursor-pointer"
    >
      <motion.div
        className={`relative aspect-[4/3] w-full overflow-hidden group/card-image touch-pan-y ${
          property.imageObjectFit === 'contain' ? 'bg-[#dce8f5] dark:bg-slate-900' : ''
        }`}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        dragMomentum={false}
        onDragEnd={handleSwipeEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
             key={currentImageIdx}
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.3 }}
             className="absolute inset-0 pointer-events-none"
          >
            <Image
              src={images[currentImageIdx]}
              alt={`${property.title} - view ${currentImageIdx + 1}`}
              fill
              draggable={false}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={75}
              className={`${
                property.imageObjectFit === 'contain'
                  ? 'object-contain'
                  : 'object-cover object-top group-hover:scale-105'
              } transition-transform duration-500`}
            />
          </motion.div>
        </AnimatePresence>
        {property.imageObjectFit !== 'contain' && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 z-10 pointer-events-none" />
        )}
        
        {/* Badges */}
        {!showcaseOnly && (
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className={`${badgeColors[property.category]} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md`}>
              {badgeLabels[property.category]}
            </span>
          </div>
        )}
        
        {!showcaseOnly && property.isNew && (
          <div className="absolute top-4 right-4 z-20">
            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              NEW
            </span>
          </div>
        )}

        {/* Photo count indicator and Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/70 text-white rounded-full opacity-100 md:opacity-0 md:group-hover/card-image:opacity-100 transition-opacity z-30"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/70 text-white rounded-full opacity-100 md:opacity-0 md:group-hover/card-image:opacity-100 transition-opacity z-30"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-white text-xs font-semibold z-20 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
              </svg>
              {currentImageIdx + 1} / {images.length}
            </div>
          </>
        )}

        {/* Favorite Icon */}
        <button 
          onClick={(e) => e.stopPropagation()}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition"
        >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white hover:fill-cherry-red hover:text-cherry-red transition">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
        </button>
      </motion.div>

      <div className="p-5 flex flex-col flex-grow">
        
        <div className="flex items-center text-sm text-muted font-bold mb-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 flex-shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <span className="truncate">
            {showcaseOnly ? `${property.suburb}, ${property.state}` : `${property.address}, ${property.suburb} ${property.state}`}
          </span>
        </div>

        {/* Price */}
        {!showcaseOnly && (
          <div className="flex items-baseline gap-1.5 mb-3">
            <span className="text-xl font-black tracking-tight" style={{ color: 'var(--primary)' }}>
              {property.priceLabel}
            </span>
            {property.category === 'rent' && (
              <span className="text-xs font-semibold text-muted">/ week</span>
            )}
          </div>
        )}

        {!showcaseOnly && (
          <div className="flex items-center justify-between text-sm text-muted mb-4 border-t border-line pt-2">
            {property.type !== 'land' && (
              <>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 10.5H21a2.25 2.25 0 012.25 2.25v4.5a.75.75 0 01-1.5 0v-1.5h-19.5v1.5a.75.75 0 01-1.5 0v-4.5A2.25 2.25 0 013 10.5h11.25zM14.25 10.5v-4.5a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 6v4.5" />
                  </svg>
                  <span className="font-semibold mr-1">{property.bedrooms}</span>
                  <span className="text-xs uppercase">Beds</span>
                </div>
                <div className="w-px h-4 bg-line"></div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#005A9C] mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 15h16.5m-16.5 0v2.25a2.25 2.25 0 002.25 2.25h12a2.25 2.25 0 002.25-2.25V15m-16.5 0v-3a2.25 2.25 0 012.25-2.25h2.25a2.25 2.25 0 012.25 2.25v3" />
                  </svg>
                  <span className="font-semibold mr-1">{property.bathrooms}</span>
                  <span className="text-xs uppercase">Baths</span>
                </div>
                <div className="w-px h-4 bg-line"></div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#D4AF37] mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.2-8.543C16.94 8.212 15.657 7.5 14.154 7.5H9.846c-1.503 0-2.787.712-3.664 1.833A17.9 17.9 0 003 14.25v3.375" />
                  </svg>
                  <span className="font-semibold mr-1">{property.carSpaces}</span>
                  <span className="text-xs uppercase">Cars</span>
                </div>
                <div className="w-px h-4 bg-line"></div>
              </>
            )}
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#2E8B57] mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25v8.25A2.25 2.25 0 0118 21H9.75A2.25 2.25 0 017.5 18.75v-2.25m9-8.25v8.25m-9-8.25V16.5" />
              </svg>
              <span className="font-semibold mr-1">{property.area ?? 'N/A'}</span>
              {property.area && <span className="text-xs uppercase">m²</span>}
            </div>
          </div>
        )}

        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          className="mt-auto w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-xl transition-colors duration-300"
        >
          View Details
        </button>
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-3xl bg-card rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white backdrop-blur-md rounded-full shadow-md text-black transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="w-full h-full overflow-y-auto custom-scrollbar flex flex-col">
                  {/* Image & Features */}
                  <div className="w-full flex flex-col shrink-0">
                  <motion.div
                    className={`relative w-full shrink-0 group/gallery overflow-hidden touch-pan-y cursor-pointer ${
                      images[currentImageIdx] === property.floorplan
                        ? 'bg-white'
                        : 'aspect-[4/3] sm:aspect-[16/10] max-h-[460px] bg-slate-950/90 dark:bg-slate-900'
                    }`}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.15}
                    dragMomentum={false}
                    onDragEnd={handleSwipeEnd}
                    onClick={handleModalImageClick}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIdx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className={images[currentImageIdx] === property.floorplan ? 'w-full' : 'absolute inset-0 pointer-events-none'}
                      >
                        {images[currentImageIdx] === property.floorplan ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={images[currentImageIdx]}
                            alt={`${property.title} - floorplan`}
                            draggable={false}
                            className="w-full h-auto object-contain bg-white"
                          />
                        ) : (
                          <Image
                             src={images[currentImageIdx]}
                             alt={`${property.title} - view ${currentImageIdx + 1}`}
                             fill
                             draggable={false}
                             sizes="(max-width: 768px) 90vw, 60vw"
                             quality={75}
                             className="object-cover"
                           />
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/70 text-white rounded-full opacity-100 md:opacity-0 md:group-hover/gallery:opacity-100 transition-opacity z-10"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                          </svg>
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/70 text-white rounded-full opacity-100 md:opacity-0 md:group-hover/gallery:opacity-100 transition-opacity z-10"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                          </svg>
                        </button>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                          {images.map((_, idx) => (
                            <div key={idx} className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIdx ? 'bg-white' : 'bg-white/50'}`} />
                          ))}
                        </div>
                      </>
                    )}

                    {!showcaseOnly && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className={`${badgeColors[property.category]} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md`}>
                          {badgeLabels[property.category]}
                        </span>
                      </div>
                    )}
                  </motion.div>


                </div>

                  {/* Details & Map */}
                  <div className="w-full flex flex-col shrink-0 bg-card">
                  <div className="px-6 pb-6 pt-3 md:px-8 md:pb-8 md:pt-4 flex-grow flex flex-col">
                    <div className="flex items-center justify-start font-bold text-ink mb-1 -ml-4 md:-ml-6">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1 shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      {showcaseOnly ? `${property.suburb}, ${property.state}` : `${property.address}, ${property.suburb} ${property.state}`}
                    </div>

                    {!showcaseOnly && (
                      <div className="flex items-center justify-start flex-wrap gap-y-2 w-[calc(100%+1rem)] md:w-[calc(100%+1.5rem)] mb-6 border-t border-line pt-2 -ml-4 md:-ml-6">
                        <div className="flex items-center gap-1 sm:gap-2">
                          {property.type !== 'land' && (
                            <>
                              <div className="flex items-center min-w-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary mr-1">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 10.5H21a2.25 2.25 0 012.25 2.25v4.5a.75.75 0 01-1.5 0v-1.5h-19.5v1.5a.75.75 0 01-1.5 0v-4.5A2.25 2.25 0 013 10.5h11.25zM14.25 10.5v-4.5a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 6v4.5" />
                                </svg>
                                <span className="font-bold text-xs sm:text-sm text-ink mr-1">{property.bedrooms}</span>
                                <span className="text-[10px] sm:text-xs text-[#005A9C] uppercase tracking-wide truncate">Beds</span>
                              </div>
                              <div className="w-px h-3 bg-line"></div>
                              <div className="flex items-center min-w-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#005A9C] mr-1">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 15h16.5m-16.5 0v2.25a2.25 2.25 0 002.25 2.25h12a2.25 2.25 0 002.25-2.25V15m-16.5 0v-3a2.25 2.25 0 012.25-2.25h2.25a2.25 2.25 0 012.25 2.25v3" />
                                </svg>
                                <span className="font-bold text-xs sm:text-sm text-ink mr-1">{property.bathrooms}</span>
                                <span className="text-[10px] sm:text-xs text-[#005A9C] uppercase tracking-wide truncate">Baths</span>
                              </div>
                              <div className="w-px h-3 bg-line"></div>
                              <div className="flex items-center min-w-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] mr-1">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.2-8.543C16.94 8.212 15.657 7.5 14.154 7.5H9.846c-1.503 0-2.787.712-3.664 1.833A17.9 17.9 0 003 14.25v3.375" />
                                </svg>
                                <span className="font-bold text-xs sm:text-sm text-ink mr-1">{property.carSpaces}</span>
                                <span className="text-[10px] sm:text-xs text-[#005A9C] uppercase tracking-wide truncate">Cars</span>
                              </div>
                              <div className="w-px h-3 bg-line"></div>
                            </>
                          )}
                          <div className="flex items-center min-w-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2E8B57] mr-1">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25v8.25A2.25 2.25 0 0118 21H9.75A2.25 2.25 0 017.5 18.75v-2.25m9-8.25v8.25m-9-8.25V16.5" />
                            </svg>
                            <span className="font-bold text-xs sm:text-sm text-ink mr-1">{property.area ?? 'N/A'}</span>
                            {property.area && <span className="text-[10px] sm:text-xs text-[#005A9C] uppercase tracking-wide truncate">m²</span>}
                          </div>
                          
                          <div className="w-px h-3 bg-line"></div>
                          
                          <div ref={shareRef} className="relative shrink-0">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setIsShareOpen(!isShareOpen); }}
                              className="flex items-center justify-center p-2 bg-primary hover:bg-primary-hover text-white rounded-md transition-colors shadow-sm"
                              aria-label="Share"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                              </svg>
                            </button>
                            
                            <AnimatePresence>
                              {isShareOpen && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 5 }}
                                  className="absolute left-0 top-full mt-2 w-auto bg-card rounded-xl shadow-xl border border-line overflow-hidden z-20 flex flex-col"
                                >
                                  <a 
                                    href={`https://wa.me/?text=${encodedShareText}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center p-3 hover:bg-surface transition-colors border-b border-line"
                                    aria-label="Share on WhatsApp"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5 fill-green-500"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                                  </a>
                                  
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setIsShareOpen(false); setIsWechatQrOpen(true); }}
                                    className="flex items-center justify-center p-3 hover:bg-surface transition-colors border-b border-line w-full"
                                    aria-label="Share on WeChat"
                                  >
                                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#07C160">
                                      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.064-6.088v-.034zm-2.22 3.412c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.389 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
                                    </svg>
                                  </button>
                                  
                                  <a 
                                    href={`mailto:?subject=${emailSubject}&body=${encodedShareText}`}
                                    className="flex items-center justify-center p-3 hover:bg-surface transition-colors"
                                    aria-label="Share via Email"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                  </a>
                                </motion.div>
                              )}
                            </AnimatePresence>
                            
                            <AnimatePresence>
                              {isWechatQrOpen && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9, y: 8 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.9, y: 8 }}
                                  transition={{ duration: 0.2 }}
                                  className="absolute left-0 top-full mt-2 w-56 bg-card rounded-2xl shadow-2xl border border-line overflow-hidden z-30 p-4"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#07C160">
                                        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.064-6.088v-.034zm-2.22 3.412c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.389 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
                                      </svg>
                                      <span className="text-sm font-bold text-ink">微信分享</span>
                                    </div>
                                    <button 
                                      onClick={() => setIsWechatQrOpen(false)}
                                      className="text-muted hover:text-ink transition-colors"
                                      aria-label="Close"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </button>
                                  </div>
                                  <div className="rounded-xl overflow-hidden border border-line bg-white p-2">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img 
                                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=4&data=${encodeURIComponent(shareUrl)}`}
                                      alt="WeChat QR Code"
                                      width={180}
                                      height={180}
                                      className="w-full h-auto rounded-lg"
                                    />
                                  </div>
                                  <p className="mt-2.5 text-center text-[11px] text-muted leading-relaxed">
                                    用微信扫描二维码<br />分享此房源
                                  </p>
                                  <p className="mt-1 text-center text-[10px] text-muted/60">
                                    Scan with WeChat to share
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mb-8 pt-2">
                      {/* Hidden translatable seeds — read by handleDownloadPDF when page is in Chinese */}
                      <span data-pdf="title" className="sr-only">{property.title}</span>
                      <span data-pdf="h-description" className="sr-only">Property Description</span>
                      <span data-pdf="h-features" className="sr-only">Key Features</span>
                      <span data-pdf="h-inspection" className="sr-only">Inspection Times</span>
                      <span data-pdf="h-agent" className="sr-only">Contact Agent</span>
                      <span data-pdf="h-photos" className="sr-only">Property Photos</span>
                      <span data-pdf="col-day" className="sr-only">Day</span>
                      <span data-pdf="col-date" className="sr-only">Date</span>
                      <span data-pdf="col-time" className="sr-only">Time</span>
                      <span data-pdf="label-sales" className="sr-only">Principal</span>

                      <h4 className="text-xl font-bold text-ink mb-4">Property Description</h4>
                      <div className="text-muted leading-relaxed mb-6">
                        <p data-pdf="description" className={isDescriptionExpanded ? "" : "line-clamp-3"}>
                          {property.description}
                        </p>
                        {property.description && property.description.length > 150 && (
                          <button 
                            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                            className="text-primary font-semibold text-sm mt-2 hover:underline focus:outline-none"
                          >
                            {isDescriptionExpanded ? "Read less" : "Read more"}
                          </button>
                        )}
                      </div>
                      
                      <h4 className="text-xl font-bold text-ink mb-4">Key Features</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {property.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-muted text-sm">
                            <svg className="w-5 h-5 text-primary mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span data-pdf={`feature-${idx}`}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Video, Inspection, Map, Agent, PDF sections — hidden in showcaseOnly mode */}
                    {!showcaseOnly && (
                      <>
                        <div className="mb-8">
                          <h4 className="text-xl font-bold text-ink mb-4 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-primary">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                            Property Video
                          </h4>
                          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm border border-line bg-black">
                            <video 
                              className="w-full h-full object-cover" 
                              controls 
                              poster={property.image}
                              preload="metadata"
                            >
                              <source src="https://videos.pexels.com/video-files/3772828/3772828-uhd_3840_2160_30fps.mp4#t=0,10" type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        </div>

                        {property.inspectionTimes && (
                          <div className="mb-8">
                            <h4 className="text-xl font-bold text-ink mb-4 flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Inspection Times
                            </h4>
                            <div className="overflow-hidden rounded-xl border border-line shadow-sm">
                              <table className="w-full text-left text-sm">
                                <thead className="bg-primary text-white">
                                  <tr>
                                    <th className="px-4 py-3 font-semibold">Day</th>
                                    <th className="px-4 py-3 font-semibold">Date</th>
                                    <th className="px-4 py-3 font-semibold">Time</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-line">
                                  {property.inspectionTimes.map((timeString, idx) => {
                                    const parts = timeString.split(" - ");
                                    const fullDate = parts[0];
                                    const timePart = parts.length > 1 ? parts[1] : "";
                                    
                                    const dateSplit = fullDate.split(", ");
                                    const dayPart = dateSplit.length > 1 ? dateSplit[0].substring(0, 3) : "";
                                    const datePart = dateSplit.length > 1 ? dateSplit[1] : fullDate;

                                    return (
                                      <tr key={idx} className={idx % 2 === 0 ? "bg-card" : "bg-accent-soft"}>
                                        <td className="px-4 py-3.5 font-bold text-primary border-r border-line whitespace-nowrap">{dayPart}</td>
                                        <td className="px-4 py-3.5 font-bold text-ink border-r border-line whitespace-nowrap">{datePart}</td>
                                        <td className="px-4 py-3.5 text-muted font-medium">{timePart}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        <h4 className="text-xl font-bold text-ink mb-4">Location Map</h4>
                        <div className="w-full h-32 md:h-40 rounded-xl overflow-hidden shadow-sm border border-line mb-4 shrink-0 bg-card">
                          <PropertyMap lat={property.coordinates.lat} lng={property.coordinates.lng} />
                        </div>
                        <a 
                          href={`https://www.google.com/maps/dir/?api=1&destination=${property.coordinates.lat},${property.coordinates.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 bg-surface hover:bg-line border border-line text-ink font-bold py-3.5 rounded-xl transition-colors mb-8 shadow-sm"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-blue-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                          </svg>
                          Get Directions
                        </a>

                        {property.agent ? (
                          <div className="mt-auto pt-6 border-t border-line">
                            <h4 className="text-lg font-bold text-ink mb-4">Contact Agent</h4>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <div>
                                  <div className="font-bold text-ink">Shree Ganesh</div>
                                  <div className="text-sm text-muted">Principal</div>
                                </div>
                              </div>
                              <a 
                                href={`https://wa.me/${property.agent.phone.replace(/\D/g, '')}`} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-green-500 hover:text-green-600 transition-colors p-2 bg-green-50 rounded-full shrink-0" 
                                title="Chat on WhatsApp"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-8 h-8 fill-current">
                                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                                </svg>
                              </a>
                            </div>
                            <div className="flex gap-3">
                              <a href={`tel:${property.agent.phone}`} className="flex-1 bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl transition-colors duration-300 shadow-lg shadow-primary/30 text-center flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.273-3.973-6.869-6.87l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                </svg>
                                Call
                              </a>
                              <a href="mailto:info@cherryhomz.com.au" className="flex-1 bg-card border-2 border-line hover:border-primary text-ink hover:text-primary font-bold py-3 rounded-xl transition-colors duration-300 text-center flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                                Email
                              </a>
                            </div>
                          </div>
                        ) : (
                          <button 
                            className="mt-auto w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl transition-colors duration-300 shadow-lg shadow-primary/30"
                          >
                            Enquire Now
                          </button>
                        )}

                        {/* Download PDF Button */}
                        <button
                          onClick={handleDownloadPDF}
                          className="mt-4 w-full flex items-center justify-center gap-2.5 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-3.5 rounded-xl transition-colors duration-300"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                          </svg>
                          Download Property Details (PDF)
                        </button>
                      </>
                    )}
                  </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Lightbox Portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95"
              onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); setIsZoomed(false); }}
            >
              <button 
                onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); setIsZoomed(false); }}
                className="absolute top-6 right-6 z-20 p-2 text-white/80 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="relative w-full h-full max-w-7xl max-h-screen p-4 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <motion.div 
                   key={currentImageIdx}
                   initial={{ opacity: 0, scale: 1, x: 0, y: 0 }}
                   animate={{ opacity: 1, scale: isZoomed ? 2.5 : 1, x: isZoomed ? undefined : 0, y: isZoomed ? undefined : 0 }}
                   transition={{ duration: 0.3 }}
                   className={`relative w-full h-full touch-none ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                   onDoubleClick={(e) => { e.stopPropagation(); setIsZoomed(prev => !prev); }}
                   drag={isZoomed}
                   dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
                >
                  <Image 
                    src={images[currentImageIdx]} 
                    alt={`${property.title} - fullscreen ${currentImageIdx + 1}`} 
                    fill 
                    sizes="100vw"
                    quality={75}
                    className="object-contain pointer-events-none"
                    draggable={false}
                  />
                </motion.div>

                {images.length > 1 && (
                  <>
                    <button 
                      onClick={(e) => { e.stopPropagation(); prevImage(); }} 
                      className="absolute left-4 md:left-8 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors z-20"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); nextImage(); }} 
                      className="absolute right-4 md:right-8 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors z-20"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  );
}
