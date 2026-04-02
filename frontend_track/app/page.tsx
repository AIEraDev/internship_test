"use client";

import { useRef, useState, Suspense, memo, useMemo } from "react";
import { useQueryStates, parseAsString, parseAsInteger, parseAsStringLiteral } from "nuqs";
import { useTransactions } from "@/hooks/useTransactions";
import { useFilteredTransactions } from "@/hooks/useFilteredTransactions";
import type { TransactionRecord, FilterState, PaginationState, SortOrder } from "@/types";

import { LoadingSkeleton } from "@/components/states/LoadingSkeleton";
import { ErrorState } from "@/components/states/ErrorState";
import { EmptyState } from "@/components/states/EmptyState";
import { TransactionDetail } from "@/components/TransactionDetail";
import { SearchBar } from "@/components/SearchBar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Bell, Settings, User, LayoutGrid, FileText, Activity, BarChart3, HelpCircle, LogOut, Upload, Plus, ChevronLeft, ChevronRight, Filter, ArrowUpDown, MoreHorizontal } from "lucide-react";

const PAGE_SIZE = 10;

// Memoized table row for performance
interface TransactionRowProps {
  tx: TransactionRecord;
  onSelect: (tx: TransactionRecord) => void;
}

const TransactionRow = memo(function TransactionRow({ tx, onSelect }: TransactionRowProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(tx);
    }
  };

  return (
    <div key={tx.transactionId} onClick={() => onSelect(tx)} onKeyDown={handleKeyDown} role="button" tabIndex={0} aria-label={`Transaction ${tx.transactionId}: ${tx.reference}`} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-(--ts-surface-container-high) last:border-b-0 items-center hover:bg-(--ts-surface) cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-(--ts-primary) focus:ring-inset">
      <div className="col-span-2 text-sm font-medium text-(--ts-neutral)">#{tx.transactionId}</div>
      <div className="col-span-2 text-sm text-(--ts-secondary)">ACC-{tx.accountId}</div>
      <div className="col-span-4 text-sm text-(--ts-secondary) truncate" title={tx.reference}>
        {tx.reference}
      </div>
      <div className="col-span-2 text-sm text-(--ts-secondary) truncate" title={tx.description}>
        {tx.description.substring(0, 30)}...
      </div>
      <div className="col-span-2">
        <Badge variant="default" className="bg-green-100 text-green-700">
          SUCCESS
        </Badge>
      </div>
    </div>
  );
});

// Inner component that uses nuqs
function DashboardContent() {
  const [urlState, setUrlState] = useQueryStates({
    q: parseAsString.withDefault(""),
    account: parseAsInteger,
    sort: parseAsStringLiteral(["asc", "desc"] as const).withDefault("asc"),
    page: parseAsInteger.withDefault(1),
  });

  const filterState: FilterState = {
    searchQuery: urlState.q,
    accountId: urlState.account,
  };

  const setSearch = (value: string) => setUrlState({ q: value, page: 1 });
  const clearFilters = () => setUrlState({ q: "", account: null, page: 1 });

  const { state, retry } = useTransactions();
  const data = state.status === "success" ? state.data : [];

  const pagination = useMemo(
    () => ({
      currentPage: urlState.page,
      pageSize: PAGE_SIZE,
      totalItems: data.length,
    }),
    [urlState.page, data.length],
  );

  const { paginated, totalItems, distinctAccounts } = useFilteredTransactions(data, filterState, urlState.sort as SortOrder, pagination);

  const [selectedTransaction, setSelectedTransaction] = useState<TransactionRecord | null>(null);
  const lastFocusedCardRef = useRef<HTMLElement | null>(null);

  const handleSelect = (tx: TransactionRecord) => {
    lastFocusedCardRef.current = document.activeElement as HTMLElement;
    setSelectedTransaction(tx);
  };

  const handleBack = () => {
    setSelectedTransaction(null);
    requestAnimationFrame(() => {
      lastFocusedCardRef.current?.focus();
    });
  };

  // Show full dashboard layout for states that need it
  if (state.status === "loading") {
    return <LoadingSkeleton rows={6} />;
  }

  if (state.status === "error") {
    return <ErrorState message={state.message} onRetry={retry} />;
  }

  if (state.status === "success" && paginated.length === 0 && !selectedTransaction) {
    return <EmptyState onClearFilters={clearFilters} />;
  }

  if (state.status === "success" && selectedTransaction) {
    return <TransactionDetail transaction={selectedTransaction} onBack={handleBack} />;
  }

  // Success state with data - Full Dashboard Layout
  return (
    <div className="h-screen bg-(--ts-surface)">
      {/* Top Navigation Bar */}
      <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-(--ts-outline-variant) px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-(--ts-primary) flex items-center justify-center">
              <LayoutGrid className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-(--ts-neutral)">TaxStreem</span>
          </div>
          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#" className="text-(--ts-primary) border-b-2 border-(--ts-primary) pb-1 font-medium">
              Dashboard
            </a>
            <a href="#" className="text-(--ts-secondary) hover:text-(--ts-primary) transition-colors">
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
        {/* Right side icons */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-(--ts-outline)" />
            <Input placeholder="Search..." className="h-9 w-64 pl-9 bg-(--ts-surface-container-high) border-0" />
          </div>
          <button className="text-(--ts-secondary) hover:text-(--ts-primary) transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <button className="text-(--ts-secondary) hover:text-(--ts-primary) transition-colors">
            <Settings className="h-5 w-5" />
          </button>
          <button className="text-(--ts-secondary) hover:text-(--ts-primary) transition-colors">
            <User className="h-5 w-5" />
          </button>
          <div className="h-8 w-8 rounded-full bg-linear-to-br from-blue-500 to-purple-600" />
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside className="w-64 min-h-[calc(100vh-64px)] bg-white border-r border-(--ts-outline-variant) p-4">
          {/* Navigation items */}
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md bg-(--ts-primary-light) text-(--ts-primary) text-sm font-medium">
              <LayoutGrid className="h-4 w-4" />
              Overview
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-(--ts-secondary) hover:bg-(--ts-primary-light) text-sm">
              <FileText className="h-4 w-4" />
              Transactions
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-(--ts-secondary) hover:bg-(--ts-primary-light) text-sm">
              <FileText className="h-4 w-4" />
              Tax Documents
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-(--ts-secondary) hover:bg-(--ts-primary-light) text-sm">
              <Activity className="h-4 w-4" />
              Audit Trail
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-(--ts-secondary) hover:bg-(--ts-primary-light) text-sm">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </a>
          </nav>

          <Separator className="my-6 bg-(--ts-outline-variant)" />

          {/* Bottom nav items */}
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-(--ts-secondary) hover:bg-(--ts-primary-light) text-sm">
              <HelpCircle className="h-4 w-4" />
              Help Center
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-(--ts-secondary) hover:bg-(--ts-primary-light) text-sm">
              <LogOut className="h-4 w-4" />
              Sign Out
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 flex flex-col h-[calc(100vh-64px)] overflow-y-auto">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-6 shrink-0">
            <div>
              <h1 className="text-2xl font-semibold text-(--ts-neutral) mb-1">Ledger Overview</h1>
              <p className="text-(--ts-secondary)">Real-time synchronization of your financial records.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2 border-(--ts-outline-variant) text-(--ts-secondary)">
                <Upload className="h-4 w-4" />
                Export
              </Button>
              <Button className="bg-(--ts-primary) hover:bg-(--ts-primary-dark) gap-2 text-white">
                <Plus className="h-4 w-4" />
                Record Transaction
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 mb-6 shrink-0">
            <div className="bg-white rounded-xl p-5 border border-(--ts-surface-container-high) shadow-sm">
              <p className="text-sm text-(--ts-secondary) mb-1">Total Balance</p>
              <p className="text-2xl font-semibold text-(--ts-neutral)">₦2,450,000.00</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-(--ts-surface-container-high) shadow-sm">
              <p className="text-sm text-(--ts-secondary) mb-1">Monthly Inflow</p>
              <p className="text-2xl font-semibold text-(--ts-primary)">₦850,000.00</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-(--ts-surface-container-high) shadow-sm">
              <p className="text-sm text-(--ts-secondary) mb-1">Pending Reconciliation</p>
              <p className="text-2xl font-semibold text-(--ts-tertiary)">12</p>
            </div>
          </div>

          <div className="flex gap-6 min-h-0 flex-1">
            {/* Left Content - Table */}
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              {/* Search/Filter Bar */}
              <div className="bg-white rounded-t-xl border border-(--ts-outline-variant) border-b-0 p-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <SearchBar value={urlState.q} onChange={setSearch} />
                  </div>
                  <Select value={urlState.account?.toString() || "all"} onValueChange={(value) => setUrlState({ account: value === "all" ? null : parseInt(value), page: 1 })}>
                    <SelectTrigger className="w-40 h-10 border-(--ts-outline-variant) text-(--ts-secondary)">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="All Accounts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Accounts</SelectItem>
                      {distinctAccounts.map((accountId) => (
                        <SelectItem key={accountId} value={accountId.toString()}>
                          ACC-{accountId}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="h-10 gap-2 border-(--ts-outline-variant) text-(--ts-secondary)" onClick={() => setUrlState({ sort: urlState.sort === "asc" ? "desc" : "asc" })} aria-label={`Sort by ID: ${urlState.sort === "asc" ? "ascending" : "descending"}`}>
                    <ArrowUpDown className="h-4 w-4" />
                    {urlState.sort === "asc" ? "A-Z" : "Z-A"}
                  </Button>
                  <Button variant="outline" className="h-10 w-10 p-0 border-(--ts-outline-variant) text-(--ts-secondary)">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Transactions Table - Scrollable */}
              <div className="bg-white border border-(--ts-outline-variant) rounded-b-xl flex-1 flex flex-col min-h-0 max-h-[calc(100vh-340px)] overflow-hidden">
                {/* Table Header - Fixed */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-(--ts-primary-light) border-b border-(--ts-outline-variant) text-xs font-medium text-(--ts-secondary) uppercase tracking-wider shrink-0">
                  <div className="col-span-2">Transaction ID</div>
                  <div className="col-span-2">Account ID</div>
                  <div className="col-span-4">Reference</div>
                  <div className="col-span-2">Description</div>
                  <div className="col-span-2">Status</div>
                </div>

                {/* Table Rows - Scrollable Area */}
                <div className="flex-1 overflow-y-auto">
                  {paginated.map((tx) => (
                    <TransactionRow key={tx.transactionId} tx={tx} onSelect={handleSelect} />
                  ))}
                </div>

                {/* Table Footer/Pagination - Fixed */}
                <div className="px-6 py-4 border-t border-(--ts-outline-variant) flex items-center justify-between shrink-0 bg-white">
                  <span className="text-sm text-(--ts-secondary)" role="status" aria-live="polite">
                    Showing {(urlState.page - 1) * PAGE_SIZE + 1} - {Math.min(urlState.page * PAGE_SIZE, totalItems)} of {totalItems} transactions
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="h-8 w-8 flex items-center justify-center rounded-md border border-(--ts-outline-variant) bg-white text-(--ts-secondary) hover:bg-(--ts-surface) disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => {
                        setUrlState({ page: Math.max(1, urlState.page - 1) });
                      }}
                      disabled={urlState.page === 1}
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="text-sm text-(--ts-secondary)" aria-label="Page information">
                      Page {urlState.page} of {Math.ceil(totalItems / PAGE_SIZE)}
                    </span>
                    <button
                      type="button"
                      className="h-8 w-8 flex items-center justify-center rounded-md border border-(--ts-outline-variant) bg-white text-(--ts-secondary) hover:bg-(--ts-surface) disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => {
                        setUrlState({ page: urlState.page + 1 });
                      }}
                      disabled={urlState.page >= Math.ceil(totalItems / PAGE_SIZE)}
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Charts Section - Hidden to save space for scrollable table */}
            </div>

            {/* Right Sidebar - Audit Trail - Fixed */}
            <aside className="w-80 shrink-0">
              <div className="bg-white rounded-xl border border-(--ts-surface-container-high) shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-(--ts-neutral)">Audit Trail</h3>
                  <Activity className="h-5 w-5 text-(--ts-primary)" />
                </div>

                {/* Timeline */}
                <div className="space-y-6">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-(--ts-primary)" />
                      <div className="h-12 w-0.5 bg-(--ts-outline-variant) mt-1" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-(--ts-outline) mb-1">Today, 2:30 PM</p>
                      <p className="text-sm text-(--ts-secondary)">Transaction #TXN-9487 approved</p>
                      <p className="text-xs text-(--ts-outline)">by System</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-(--ts-outline-variant)" />
                      <div className="h-12 w-0.5 bg-(--ts-outline-variant) mt-1" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-(--ts-outline) mb-1">Today, 2:15 PM</p>
                      <p className="text-sm text-(--ts-secondary)">Bulk reconciliation completed</p>
                      <p className="text-xs text-(--ts-outline)">by Admin User</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-(--ts-outline-variant)" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-(--ts-outline) mb-1">Today, 1:45 PM</p>
                      <p className="text-sm text-(--ts-secondary)">Import started</p>
                      <p className="text-xs text-(--ts-outline)">by Admin User</p>
                    </div>
                  </div>
                </div>

                <Button variant="ghost" className="w-full mt-6 text-(--ts-primary)">
                  View Full History
                </Button>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

// Main export with Suspense wrapper
export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingSkeleton rows={6} />}>
      <DashboardContent />
    </Suspense>
  );
}
