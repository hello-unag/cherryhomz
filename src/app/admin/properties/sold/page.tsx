'use client';

export default function SoldPropertiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Sold Properties</h1>
          <p className="text-zinc-400 mt-1">Manage your portfolio of sold properties.</p>
        </div>
        <button 
          disabled
          className="inline-flex items-center justify-center rounded-lg bg-[#9B1B30] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#801627] focus:outline-none focus:ring-2 focus:ring-[#9B1B30] focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Property
        </button>
      </div>

      <div className="rounded-2xl border border-white/5 bg-zinc-900/40 backdrop-blur-sm min-h-[400px] flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800/50 mb-4">
            <svg className="h-8 w-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No sold properties</h3>
          <p className="text-zinc-400 mb-6">Click "Add Property" to get started and showcase your successfully sold properties.</p>
        </div>
      </div>
    </div>
  );
}
