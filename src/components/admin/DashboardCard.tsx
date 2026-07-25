'use client';

import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  color?: string;
}

export default function DashboardCard({ title, value, icon, trend }: DashboardCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-black text-slate-900 tracking-tight">{value}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-[#9B1B30] border border-slate-100 shadow-xs">
          {icon}
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <span className="text-emerald-600 font-medium">{trend}</span>
          <span className="ml-2 text-slate-400">vs last month</span>
        </div>
      )}
      
      {/* Subtle decorative gradient */}
      <div className="absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 pointer-events-none" style={{
        background: `radial-gradient(400px circle at bottom right, rgba(155, 27, 48, 0.05), transparent 40%)`
      }}></div>
    </div>
  );
}
