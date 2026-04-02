import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Search, Bell, Settings, User, LayoutGrid, FileText, Activity, BarChart3, HelpCircle, LogOut, Upload, Plus } from "lucide-react";

interface EmptyStateProps {
  onClearFilters?: () => void;
  onImportTransactions?: () => void;
  onRecordManually?: () => void;
}

export function EmptyState({ onClearFilters, onImportTransactions, onRecordManually }: EmptyStateProps) {
  return (
    <div className="min-h-screen bg-[var(--ts-surface)]">
      {/* Top Navigation Bar */}
      <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-[var(--ts-outline-variant)] px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-[var(--ts-primary)] flex items-center justify-center">
              <LayoutGrid className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-[var(--ts-neutral)]">TaxStreem</span>
          </div>
          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#" className="text-[var(--ts-primary)] border-b-2 border-[var(--ts-primary)] pb-1 font-medium">
              Dashboard
            </a>
            <a href="#" className="text-[var(--ts-secondary)] hover:text-[var(--ts-primary)] transition-colors">
              Ledger
            </a>
            <a href="#" className="text-[var(--ts-secondary)] hover:text-[var(--ts-primary)] transition-colors">
              Audits
            </a>
            <a href="#" className="text-[var(--ts-secondary)] hover:text-[var(--ts-primary)] transition-colors">
              Reports
            </a>
          </nav>
        </div>
        {/* Right side icons */}
        <div className="flex items-center gap-4">
          <div className="h-9 w-64 rounded-xl bg-[var(--ts-surface-container-high)] flex items-center px-3 gap-2">
            <Search className="h-4 w-4 text-[var(--ts-outline)]" />
            <span className="text-sm text-[var(--ts-outline)]">Search...</span>
          </div>
          <button className="text-[var(--ts-secondary)] hover:text-[var(--ts-primary)] transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <button className="text-[var(--ts-secondary)] hover:text-[var(--ts-primary)] transition-colors">
            <Settings className="h-5 w-5" />
          </button>
          <button className="text-[var(--ts-secondary)] hover:text-[var(--ts-primary)] transition-colors">
            <User className="h-5 w-5" />
          </button>
          <div className="h-8 w-8 rounded-full bg-[var(--ts-surface-container-high)]" />
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-[calc(100vh-64px)] bg-white border-r border-[var(--ts-outline-variant)] p-4">
          {/* Brand section */}
          <div className="mb-6 px-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-6 w-6 rounded bg-[var(--ts-primary)] flex items-center justify-center">
                <LayoutGrid className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-[var(--ts-neutral)] text-sm">TaxStreem</span>
            </div>
            <span className="text-xs text-[var(--ts-secondary)] ml-8">PRECISION LEDGER</span>
          </div>

          {/* Navigation items */}
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md bg-[var(--ts-primary-light)] text-[var(--ts-primary)] text-sm font-medium">
              <LayoutGrid className="h-4 w-4" />
              Overview
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-[var(--ts-secondary)] hover:bg-[var(--ts-primary-light)] text-sm">
              <FileText className="h-4 w-4" />
              Transactions
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-[var(--ts-secondary)] hover:bg-[var(--ts-primary-light)] text-sm">
              <FileText className="h-4 w-4" />
              Tax Documents
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-[var(--ts-secondary)] hover:bg-[var(--ts-primary-light)] text-sm">
              <Activity className="h-4 w-4" />
              Audit Trail
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-[var(--ts-secondary)] hover:bg-[var(--ts-primary-light)] text-sm">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </a>
          </nav>

          <Separator className="my-6 bg-[var(--ts-outline-variant)]" />

          {/* Bottom nav items */}
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-[var(--ts-secondary)] hover:bg-[var(--ts-primary-light)] text-sm">
              <HelpCircle className="h-4 w-4" />
              Help Center
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-[var(--ts-secondary)] hover:bg-[var(--ts-primary-light)] text-sm">
              <LogOut className="h-4 w-4" />
              Sign Out
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-[var(--ts-neutral)] mb-1">Ledger Overview</h1>
              <p className="text-[var(--ts-secondary)]">Real-time synchronization of your financial records.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2 border-[var(--ts-outline-variant)] text-[var(--ts-secondary)]">
                <Upload className="h-4 w-4" />
                Export
              </Button>
              <Button className="bg-[var(--ts-primary)] hover:bg-[var(--ts-primary-dark)] gap-2 text-white">
                <Plus className="h-4 w-4" />
                Record Transaction
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-[var(--ts-surface-container-high)] shadow-sm">
              <p className="text-sm text-[var(--ts-secondary)] mb-1">Total Balance</p>
              <p className="text-2xl font-semibold text-[var(--ts-neutral)]">₦2,450,000.00</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-[var(--ts-surface-container-high)] shadow-sm">
              <p className="text-sm text-[var(--ts-secondary)] mb-1">Monthly Inflow</p>
              <p className="text-2xl font-semibold text-[var(--ts-neutral)]">₦850,000.00</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-[var(--ts-surface-container-high)] shadow-sm">
              <p className="text-sm text-[var(--ts-secondary)] mb-1">Pending Reconciliation</p>
              <p className="text-2xl font-semibold text-[var(--ts-neutral)]">12</p>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Left Content - Empty State */}
            <div className="flex-1">
              {/* Search/Filter Bar */}
              <div className="bg-white rounded-t-xl border border-[var(--ts-outline-variant)] border-b-0 p-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 flex-1 rounded-lg bg-[var(--ts-surface-container-high)] flex items-center px-3 gap-2">
                    <Search className="h-4 w-4 text-[var(--ts-outline)]" />
                    <span className="text-sm text-[var(--ts-outline)]">Search transactions...</span>
                  </div>
                  <Button variant="outline" className="h-10 border-[var(--ts-outline-variant)] text-[var(--ts-secondary)]">
                    Filter
                  </Button>
                  <Button variant="outline" className="h-10 border-[var(--ts-outline-variant)] text-[var(--ts-secondary)]">
                    Sort
                  </Button>
                  <Button variant="outline" className="h-10 w-10 p-0 border-[var(--ts-outline-variant)] text-[var(--ts-secondary)]">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Empty State */}
              <div className="bg-white border border-[var(--ts-outline-variant)] rounded-b-xl p-16">
                <div className="flex flex-col items-center text-center max-w-md mx-auto">
                  {/* Empty State Icon */}
                  <div className="h-24 w-24 rounded-full bg-[var(--ts-primary-light)] flex items-center justify-center mb-6">
                    <FileText className="h-12 w-12 text-[var(--ts-primary)]/50" />
                  </div>

                  <h3 className="text-lg font-semibold text-[var(--ts-neutral)] mb-2">No transactions found</h3>
                  <p className="text-[var(--ts-secondary)] text-sm mb-8">Get started by importing your existing transactions or record a new transaction manually.</p>

                  <div className="flex gap-4">
                    <Button variant="outline" className="gap-2 border-[var(--ts-outline-variant)] text-[var(--ts-secondary)]" onClick={onImportTransactions}>
                      <Upload className="h-4 w-4" />
                      Import Transactions
                    </Button>
                    <Button className="bg-[var(--ts-primary)] hover:bg-[var(--ts-primary-dark)] gap-2 text-white" onClick={onRecordManually}>
                      <Plus className="h-4 w-4" />
                      Record Manually
                    </Button>
                  </div>

                  {onClearFilters && (
                    <button onClick={onClearFilters} className="mt-4 text-sm text-[var(--ts-primary)] hover:text-[var(--ts-primary-dark)]">
                      Clear filters and try again
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Sidebar - Audit Trail */}
            <aside className="w-80">
              <div className="bg-white rounded-xl border border-[var(--ts-surface-container-high)] shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-[var(--ts-neutral)]">Audit Trail</h3>
                  <Activity className="h-5 w-5 text-[var(--ts-primary)]" />
                </div>

                {/* Timeline */}
                <div className="space-y-6">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-[var(--ts-primary)]" />
                      <div className="h-12 w-0.5 bg-[var(--ts-outline-variant)] mt-1" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[var(--ts-outline)] mb-1">Today, 2:30 PM</p>
                      <p className="text-sm text-[var(--ts-secondary)]">System initialized</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-[var(--ts-outline-variant)]" />
                      <div className="h-12 w-0.5 bg-[var(--ts-outline-variant)] mt-1" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[var(--ts-outline)] mb-1">Today, 2:28 PM</p>
                      <p className="text-sm text-[var(--ts-secondary)]">User logged in</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-[var(--ts-outline-variant)]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[var(--ts-outline)] mb-1">Today, 2:25 PM</p>
                      <p className="text-sm text-[var(--ts-secondary)]">Session started</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
