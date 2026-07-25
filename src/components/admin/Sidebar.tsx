'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: 'Media',
    href: '/admin/media',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const propertyItems = [
  { name: 'Buy', href: '/admin/properties/buy' },
  { name: 'Sold', href: '/admin/properties/sold' },
  { name: 'Build With Us', href: '/admin/properties/build' },
];

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(pathname.startsWith('/admin/properties'));

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-slate-200 w-64 z-50 transform transition-transform duration-300 ease-in-out shadow-sm ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-slate-100">
          <Link href="/admin" className="flex flex-col items-start gap-0 select-none">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-[#9B1B30]">CHERRY HOMZ</span>
              <span className="text-lg">🍒</span>
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600">Admin Portal</span>
          </Link>
        </div>

        <nav className="mt-4 px-3 space-y-1.5 flex-1 overflow-y-auto">
          {/* Dashboard */}
          <Link
            href="/admin"
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors font-semibold text-sm ${
              pathname === '/admin'
                ? 'bg-[#9B1B30]/10 text-[#9B1B30] border-l-4 border-[#9B1B30]'
                : 'text-slate-600 hover:text-[#9B1B30] hover:bg-slate-50 border-l-4 border-transparent'
            }`}
          >
            {navItems[0].icon}
            <span>Dashboard</span>
          </Link>

          {/* Properties Dropdown */}
          <div>
            <button
              onClick={() => setIsPropertiesOpen(!isPropertiesOpen)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors font-semibold text-sm ${
                pathname.startsWith('/admin/properties')
                  ? 'text-[#9B1B30] bg-[#9B1B30]/5'
                  : 'text-slate-600 hover:text-[#9B1B30] hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Properties</span>
              </div>
              <svg
                className={`w-4 h-4 transition-transform ${isPropertiesOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Sub-items */}
            <div className={`overflow-hidden transition-all duration-300 ${isPropertiesOpen ? 'max-h-40 mt-1' : 'max-h-0'}`}>
              <div className="pl-11 space-y-1">
                {propertyItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block py-2 text-sm transition-colors rounded-lg px-2 ${
                        isActive ? 'text-[#9B1B30] font-bold bg-[#9B1B30]/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Other Nav Items */}
          {navItems.slice(1).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors font-semibold text-sm ${
                  isActive
                    ? 'bg-[#9B1B30]/10 text-[#9B1B30] border-l-4 border-[#9B1B30]'
                    : 'text-slate-600 hover:text-[#9B1B30] hover:bg-slate-50 border-l-4 border-transparent'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
