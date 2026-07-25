'use client';

import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  color?: string;
}

export default function DashboardCard({ title, value, icon, trend, color = 'bg-zinc-900/50' }: DashboardCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/40 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 group`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white tracking-tight">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-white shadow-inner`}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <span className="text-emerald-400 font-medium">{trend}</span>
          <span className="ml-2 text-zinc-500">vs last month</span>
        </div>
      )}
      
      {/* Subtle decorative gradient */}
      <div className="absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100" style={{
        background: `radial-gradient(400px circle at bottom right, rgba(155, 27, 48, 0.1), transparent 40%)`
      }}></div>
    </div>
  );
}
