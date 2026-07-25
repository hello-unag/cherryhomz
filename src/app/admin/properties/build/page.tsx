'use client';

export default function BuildPropertiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Build With Us Projects</h1>
          <p className="text-slate-500 font-medium mt-1">Manage construction and development projects.</p>
        </div>
        <button 
          disabled
          className="inline-flex items-center justify-center rounded-xl bg-[#9B1B30] px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#801627] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Project
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm min-h-[400px] flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4 text-[#9B1B30]">
            <svg className="h-8 w-8 text-[#9B1B30]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No projects yet</h3>
          <p className="text-slate-500 font-medium mb-6">Click "Add Project" to get started and highlight your upcoming builds.</p>
        </div>
      </div>
    </div>
  );
}
