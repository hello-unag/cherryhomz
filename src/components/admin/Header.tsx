'use client';

export default function Header({
  onToggleSidebar,
  sidebarOpen,
}: {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}) {
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    } finally {
      window.location.href = '/admin/login';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between bg-zinc-950/80 px-4 backdrop-blur-md border-b border-zinc-800 lg:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="rounded-md p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white focus:outline-none lg:hidden"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
        >
          Logout
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#9B1B30] text-sm font-bold text-white shadow-lg">
          A
        </div>
      </div>
    </header>
  );
}
