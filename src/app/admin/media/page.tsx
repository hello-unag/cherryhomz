'use client';

export default function MediaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Media Library</h1>
        <p className="text-slate-500 font-medium mt-1">Manage your website's images and documents.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm min-h-[400px] flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4 text-[#9B1B30]">
            <svg className="h-8 w-8 text-[#9B1B30]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Coming Soon</h3>
          <p className="text-slate-500 font-medium">Media management will be available after Cloudflare R2 integration.</p>
        </div>
      </div>
    </div>
  );
}
