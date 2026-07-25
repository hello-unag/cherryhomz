'use client';

export default function SoldPropertiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Sold Properties</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your portfolio of sold properties.</p>
        </div>
        <button 
          disabled
          className="inline-flex items-center justify-center rounded-xl bg-[#9B1B30] px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#801627] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Property
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm min-h-[400px] flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4 text-[#9B1B30]">
            <svg className="h-8 w-8 text-[#9B1B30]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No sold properties</h3>
          <p className="text-slate-500 font-medium mb-6">Click "Add Property" to get started and showcase your successfully sold properties.</p>
        </div>
      </div>
    </div>
  );
}
