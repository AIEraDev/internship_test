import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, FilterX, Search, LayoutGrid, FileText, Activity, HelpCircle, LogOut, Bell, Settings } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-(--ts-surface)" role="alert">
      {/* Top Navigation Bar */}
      <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-(--ts-outline-variant) px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-(--ts-primary) flex items-center justify-center">
              <LayoutGrid className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-(--ts-neutral)">TaxStreem</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#" className="text-(--ts-secondary) hover:text-(--ts-primary) transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-(--ts-primary) border-b-2 border-(--ts-primary) pb-1 font-medium">
              Ledger
            </a>
            <a href="#" className="text-(--ts-secondary) hover:text-(--ts-primary) transition-colors">
              Audits
            </a>
            <a href="#" className="text-(--ts-secondary) hover:text-(--ts-primary) transition-colors">
              Reports
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-(--ts-outline)" />
            <input type="text" placeholder="Search entries..." className="h-9 w-64 pl-10 pr-4 bg-(--ts-surface-container-high) border-none rounded-xl text-sm focus:ring-2 focus:ring-(--ts-primary)/20 focus:bg-white transition-all" />
          </div>
          <button className="w-10 h-10 flex items-center justify-center text-(--ts-secondary) hover:text-(--ts-primary)">
            <Bell className="h-5 w-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-(--ts-secondary) hover:text-(--ts-primary)">
            <Settings className="h-5 w-5" />
          </button>
          <div className="w-px h-6 bg-(--ts-outline-variant)" />
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-[calc(100vh-64px)] bg-slate-50 border-r border-(--ts-outline-variant) p-4 flex flex-col gap-2">
          <div className="flex items-center gap-3 px-2 mb-6">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-(--ts-primary) to-(--ts-primary-container) flex items-center justify-center text-white">
              <span className="text-lg font-bold">T</span>
            </div>
            <div>
              <div className="font-bold text-(--ts-primary) tracking-tight leading-none">TaxStreem</div>
              <div className="text-[10px] text-(--ts-secondary) font-bold uppercase tracking-widest">Precision Ledger</div>
            </div>
          </div>
          <nav className="flex-1 space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-(--ts-secondary) hover:bg-(--ts-primary-light) rounded-lg transition-all">
              <LayoutGrid className="h-4 w-4" />
              <span>Overview</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 bg-(--ts-primary-light) text-(--ts-primary) font-semibold rounded-lg transition-all">
              <FileText className="h-4 w-4" />
              <span>Transactions</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-(--ts-secondary) hover:bg-(--ts-primary-light) rounded-lg transition-all">
              <FileText className="h-4 w-4" />
              <span>Tax Documents</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-(--ts-secondary) hover:bg-(--ts-primary-light) rounded-lg transition-all">
              <Activity className="h-4 w-4" />
              <span>Audit Trail</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-(--ts-secondary) hover:bg-(--ts-primary-light) rounded-lg transition-all">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18" />
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
              </svg>
              <span>Analytics</span>
            </a>
          </nav>
          <div className="mt-auto space-y-1 pt-4">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-(--ts-secondary) hover:bg-(--ts-primary-light) rounded-lg transition-all">
              <HelpCircle className="h-4 w-4" />
              <span>Help Center</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-(--ts-secondary) hover:bg-(--ts-primary-light) rounded-lg transition-all">
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Context Header */}
          <div className="flex flex-col gap-1 mb-8">
            <h1 className="text-3xl font-extrabold text-(--ts-neutral) tracking-tight">Transaction Ledger</h1>
            <p className="text-(--ts-secondary) text-sm">Manage and reconcile your historical financial records.</p>
          </div>

          {/* Asymmetric Grid for States */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
            {/* Panel 1: Error State */}
            <section className="flex flex-col gap-6">
              <div className="text-[10px] font-bold uppercase tracking-widest text-(--ts-secondary)/60 ml-1">System Error Response</div>
              <div className="flex-1 bg-white rounded-xl shadow-sm flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-(--ts-error-container)/20 rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-(--ts-primary-container)/10 rounded-full blur-3xl -ml-16 -mb-16" />
                <div className="w-16 h-16 bg-(--ts-error-container) rounded-2xl flex items-center justify-center mb-6 relative z-10">
                  <AlertCircle className="h-8 w-8 text-(--ts-error)" />
                </div>
                <h2 className="text-xl font-bold text-(--ts-neutral) mb-2 relative z-10">Connection Interrupted</h2>
                <p className="text-(--ts-secondary) max-w-xs mb-8 relative z-10">{message || "Unable to fetch transaction records from the secure vault. Please check your connection or authentication status."}</p>
                <div className="flex items-center gap-3 relative z-10">
                  <Button onClick={onRetry} className="px-8 py-3 bg-gradient-to-br from-(--ts-primary) to-(--ts-primary-container) text-white font-semibold rounded-xl shadow-lg shadow-(--ts-primary)/20 hover:opacity-90 active:scale-95 transition-all">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Retry Connection
                  </Button>
                  <Button variant="outline" className="px-6 py-3 border-(--ts-outline-variant) text-(--ts-primary) font-semibold rounded-xl hover:bg-(--ts-surface-container) transition-colors">
                    Support
                  </Button>
                </div>
                <div className="mt-12 text-xs text-(--ts-secondary)/40 font-mono relative z-10">Error Code: TX_FETCH_TIMEOUT_091</div>
              </div>
            </section>

            {/* Panel 2: Empty/Query State */}
            <section className="flex flex-col gap-6">
              <div className="text-[10px] font-bold uppercase tracking-widest text-(--ts-secondary)/60 ml-1">Query Results: Zero</div>
              <div className="flex-1 bg-white rounded-xl shadow-sm flex flex-col items-center justify-center p-12 text-center relative">
                <div className="w-48 h-32 mb-8 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-(--ts-surface-container) rounded-full flex items-center justify-center relative">
                      <Search className="h-8 w-8 text-(--ts-outline-variant)" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-(--ts-surface-variant) rounded-lg transform rotate-12" />
                      <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-(--ts-surface-container-high) rounded-full opacity-50" />
                    </div>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-(--ts-neutral) mb-2">No Matching Records</h2>
                <p className="text-(--ts-secondary) max-w-xs mb-8">
                  Your current filter for <span className="font-bold text-(--ts-primary) italic">&quot;Q3 2023 - Audited&quot;</span> returned zero results. Try adjusting your parameters or view the complete ledger.
                </p>
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  <Button className="w-full py-3 bg-(--ts-surface-container-highest) text-(--ts-primary) font-bold rounded-xl hover:bg-(--ts-primary)/5 transition-colors flex items-center justify-center gap-2">
                    <FilterX className="h-4 w-4" />
                    Clear All Filters
                  </Button>
                  <button className="w-full py-3 text-(--ts-secondary) text-sm font-medium hover:underline">Import CSV Records</button>
                </div>
              </div>
            </section>
          </div>

          {/* Contextual Metric Ribbon */}
          <div className="flex overflow-x-auto gap-4 pb-4 mt-8 no-scrollbar">
            <div className="min-w-[240px] bg-white p-5 rounded-xl border border-(--ts-outline-variant)/10">
              <div className="text-xs font-bold text-(--ts-secondary) uppercase tracking-widest mb-1">Last Sync</div>
              <div className="text-xl font-extrabold text-(--ts-neutral)">14 Minutes Ago</div>
              <div className="flex items-center gap-1 text-[10px] text-(--ts-tertiary) font-bold mt-2">
                <AlertCircle className="h-3 w-3" />3 Records Pending
              </div>
            </div>
            <div className="min-w-[240px] bg-white p-5 rounded-xl border border-(--ts-outline-variant)/10">
              <div className="text-xs font-bold text-(--ts-secondary) uppercase tracking-widest mb-1">Active Filters</div>
              <div className="text-xl font-extrabold text-(--ts-neutral)">None Active</div>
              <div className="text-[10px] text-(--ts-secondary)/60 font-medium mt-2">Defaulting to Global View</div>
            </div>
            <div className="min-w-[240px] bg-white p-5 rounded-xl border border-(--ts-outline-variant)/10">
              <div className="text-xs font-bold text-(--ts-secondary) uppercase tracking-widest mb-1">Cloud Status</div>
              <div className="text-xl font-extrabold text-(--ts-primary) flex items-center gap-2">
                Degraded
                <span className="w-2 h-2 bg-(--ts-tertiary) rounded-full" />
              </div>
              <div className="text-[10px] text-(--ts-secondary)/60 font-medium mt-2">Region: us-east-1</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
