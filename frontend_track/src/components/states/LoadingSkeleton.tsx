import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonProps {
  rows?: number;
}

// Custom shimmer style for the skeleton effect
const shimmerClass = "animate-pulse bg-gradient-to-r from-[var(--ts-surface)] via-[var(--ts-surface-container)] to-[var(--ts-surface)] bg-[length:200%_100%]";

export function LoadingSkeleton({ rows = 5 }: LoadingSkeletonProps) {
  return (
    <div className="min-h-screen bg-[var(--ts-surface)]" aria-label="Loading dashboard" aria-busy="true">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm flex justify-between items-center px-8 h-16">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tighter text-[var(--ts-primary-dark)]">TaxStreem</span>
          <div className="hidden md:flex gap-6 items-center text-sm font-medium tracking-tight">
            <span className="text-[var(--ts-primary-dark)] border-b-2 border-[var(--ts-primary-dark)] pb-1">Dashboard</span>
            <span className="text-[var(--ts-secondary)]">Ledger</span>
            <span className="text-[var(--ts-secondary)]">Audits</span>
            <span className="text-[var(--ts-secondary)]">Reports</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <div className="w-64 h-9 rounded-xl bg-[var(--ts-surface-container-high)] flex items-center px-3 gap-2 opacity-50">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </nav>

      {/* SideNavBar */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-slate-50 flex flex-col p-4 gap-2 pt-20 border-r border-slate-200/50">
        <div className="px-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--ts-primary)] rounded-xl flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
              </svg>
            </div>
            <div>
              <p className="font-black text-[var(--ts-primary-dark)] text-sm">TaxStreem</p>
              <p className="text-[10px] uppercase tracking-widest text-[var(--ts-secondary)]">Precision Ledger</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          <div className="flex items-center gap-3 px-4 py-2.5 bg-[var(--ts-primary-light)] text-[var(--ts-primary)] font-semibold rounded-lg">
            <Skeleton className="h-5 w-5" />
            <span className="text-sm">Overview</span>
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2.5 text-[var(--ts-secondary)] rounded-lg">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t border-slate-200">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2.5 text-[var(--ts-secondary)] rounded-lg">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 pt-24 px-10 pb-12">
        {/* Header Section */}
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="font-bold text-4xl tracking-tight text-[var(--ts-on-background)] mb-2">Ledger Overview</h1>
            <p className="text-[var(--ts-secondary)] text-lg">Real-time synchronization of your financial records.</p>
          </div>
          <div className="flex gap-4">
            <Skeleton className="w-32 h-11 rounded-xl" />
            <Skeleton className="w-40 h-11 rounded-xl bg-[var(--ts-primary)]/20" />
          </div>
        </header>

        {/* Metric Ribbon (Skeleton) */}
        <section className="flex gap-6 overflow-x-auto pb-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="shrink-0 w-72 h-32 bg-white rounded-xl p-6 shadow-sm flex flex-col justify-between">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-40" />
            </div>
          ))}
        </section>

        {/* Main Ledger Table Container */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Table Controls Skeleton */}
          <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-[var(--ts-surface-container)]">
            <Skeleton className="w-full md:w-96 h-10 rounded-lg" />
            <div className="flex gap-3 w-full md:w-auto">
              <Skeleton className="w-24 h-10 rounded-lg" />
              <Skeleton className="w-24 h-10 rounded-lg" />
              <Skeleton className="w-10 h-10 rounded-lg" />
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-6 px-8 py-4 bg-[var(--ts-surface-container)] border-y border-[var(--ts-outline-variant)]/10">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--ts-secondary)]">Transaction ID</span>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--ts-secondary)]">Account ID</span>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--ts-secondary)] col-span-2">Description</span>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--ts-secondary)]">Amount</span>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--ts-secondary)]">Status</span>
          </div>

          {/* Skeleton Rows */}
          <div className="divide-y divide-[var(--ts-outline-variant)]/5">
            {Array.from({ length: rows }).map((_, i) => (
              <div key={i} className={`grid grid-cols-6 px-8 py-7 items-center ${i % 2 === 1 ? "bg-[var(--ts-surface-container)]/30" : ""}`}>
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
                <div className="col-span-2 space-y-2">
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="p-6 flex justify-between items-center border-t border-[var(--ts-outline-variant)]/10">
            <Skeleton className="h-4 w-48" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Asymmetric Insight Grid (Skeleton) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 bg-white rounded-xl p-8 shadow-sm">
            <Skeleton className="h-6 w-48 mb-8" />
            <div className="flex items-end gap-4 h-48">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <Skeleton key={i} className="flex-1 rounded-t-xl" style={{ height: `${[65, 50, 100, 75, 40, 60, 80][i - 1]}%` }} />
              ))}
            </div>
          </div>
          <div className="bg-[var(--ts-surface-container-highest)]/20 rounded-xl p-8 border border-white/40 flex flex-col justify-between">
            <div>
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="w-full h-12 rounded-xl" />
          </div>
        </div>
      </main>

      {/* Audit Trail Sticky Float (Asymmetric Element) */}
      <div className="fixed right-6 bottom-6 w-80 bg-white/60 backdrop-blur-2xl rounded-2xl shadow-2xl p-6 border border-white/20 hidden xl:block">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-[var(--ts-on-surface)]">Audit Trail</h3>
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 relative">
              {i < 3 && <div className="absolute left-2 top-6 w-0.5 h-10 bg-[var(--ts-outline-variant)]/30" />}
              <Skeleton className={`w-4 h-4 rounded-full mt-1 z-10 ${i === 1 ? "bg-[var(--ts-primary)]" : ""}`} />
              <div className="flex-1">
                <Skeleton className="h-3 w-16 mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
