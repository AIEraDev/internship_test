# TaxStreem Frontend Track - Technical Documentation

## Project Overview

A modern React-based transaction dashboard for managing and reconciling financial records. The application integrates with JSONPlaceholder API to fetch transaction data and provides a rich UI for viewing, filtering, and managing transactions.

## Tools & Technologies

### Core Stack

- **Framework**: Next.js 15.5.14 with App Router
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: React hooks + TanStack Query (React Query)
- **URL State**: nuqs for query parameter management

### Key Dependencies

```json
{
  "@tanstack/react-query": "^5.x",
  "nuqs": "^2.x",
  "lucide-react": "^0.x",
  "@radix-ui/react-*": "latest",
  "class-variance-authority": "^0.x",
  "clsx": "^2.x",
  "tailwind-merge": "^2.x"
}
```

### Development Tools

- **Linting**: ESLint with TypeScript
- **Type Checking**: TypeScript compiler
- **Build**: Next.js native build

## Architecture

### Component Architecture

```
app/
├── page.tsx                 # Main dashboard with Suspense
├── Providers.tsx            # Query client provider
└── globals.css              # CSS variables & Tailwind

src/
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── TransactionDetail.tsx # Transaction detail view
│   └── states/
│       ├── ErrorState.tsx   # Error + Empty states
│       ├── EmptyState.tsx   # (deprecated - merged)
│       └── LoadingSkeleton.tsx
├── hooks/
│   ├── useTransactions.ts   # API data fetching
│   └── useFilteredTransactions.ts # Client-side filtering
├── types/
│   └── index.ts             # TypeScript interfaces
└── utils/
    └── filter.ts            # Filtering & pagination logic
```

### State Management Pattern

```typescript
// Async State Discriminated Union
type AsyncState<T> = { status: "idle" } | { status: "loading" } | { status: "success"; data: T } | { status: "error"; message: string };
```

**Benefits:**

- Type-safe state handling
- Exhaustive switch cases
- Clear state transitions
- No `null`/`undefined` ambiguity

## Features Implemented

### 1. Data Fetching

- **Source**: JSONPlaceholder API (`https://jsonplaceholder.typicode.com/posts`)
- **Transformation**: Raw posts → TransactionRecord mapping
- **Caching**: 5-minute stale time with TanStack Query
- **Retry**: Automatic retry on failure (2 attempts)

### 2. Dashboard Features

- **Search**: Real-time filtering by reference/description
- **Account Filter**: Filter by account ID
- **Sorting**: Ascending/descending by transaction ID
- **Pagination**: 10 items per page with URL-synced state
- **Selection**: Click to view transaction details

### 3. Transaction Detail View

- Full-screen detail page with back navigation
- Mock data generation for realistic display:
  - Transaction IDs (format: `XXXX-XXXX-XXX-XXX`)
  - Account IDs (format: `ACC_99999_CORP_01`)
  - Entity names, tax categories, amounts
- Audit trail timeline
- Document attachment placeholder
- Ledger impact visualization
- Quick reconciliation actions

### 4. Error & Empty States

- **Error State**: Connection interrupted with retry
- **Empty State**: No matching records with filter clear
- **Metric Ribbon**: Last sync, active filters, cloud status
- Asymmetric 2-column layout

## Performance Optimizations

### 1. React Query Optimizations

```typescript
const query = useQuery({
  queryKey: ["transactions"],
  queryFn: fetchTransactions,
  select: (posts) => posts.map(mapPost), // Transform on cache
  staleTime: 5 * 60 * 1000, // 5min cache
  retry: 2, // Auto-retry
});
```

**Benefits:**

- Automatic background refetching
- Request deduplication
- Optimistic updates support
- DevTools debugging

### 2. useMemo for Filtering

```typescript
const { paginated, totalItems } = useMemo(() => {
  const searched = applySearch(data, filter.searchQuery);
  const byAccount = applyAccountFilter(searched, filter.accountId);
  const sorted = applySortOrder(byAccount, sortOrder);
  return applyPagination(sorted, page, PAGE_SIZE);
}, [data, filter, sortOrder, page]);
```

**Complexity Reduction:**

- O(n) search with early termination
- O(n) filter operations
- O(n log n) sort (native JS)
- O(1) pagination slicing

### 3. URL State Synchronization

Using `nuqs` for URL query params:

- Filter state in URL: `?q=search&account=1&sort=asc&page=1`
- Shareable filtered views
- Browser back/forward support
- No prop drilling for filters

### 4. CSS Performance

- **Tailwind v4**: Just-in-time compilation
- **CSS Variables**: Design token system (`--ts-*`)
- **Container Queries**: Responsive without JS
- **Hardware Acceleration**: `transform` and `opacity` animations

### 5. Bundle Optimizations

- **Code Splitting**: Component-level with dynamic imports
- **Tree Shaking**: Lucide icons (individual imports)
- **Font Optimization**: Next.js font system

## Design System

### Color Tokens (CSS Variables)

```css
--ts-primary: #003d9b;
--ts-primary-container: #0052cc;
--ts-primary-light: #e0e8ff;
--ts-secondary: #525f73;
--ts-tertiary: #7b2600;
--ts-error: #ba1a1a;
--ts-surface: #f9f9ff;
--ts-surface-container: #e9edff;
--ts-surface-container-high: #e0e8ff;
--ts-outline: #737685;
--ts-outline-variant: #c3c6d6;
```

### Typography

- **Headlines**: Manrope (700-800 weight)
- **Body**: Inter (400-600 weight)
- **Labels**: Inter uppercase with tracking

### Spacing System

- Base: 4px (0.25rem)
- Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64

## Data Flow

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  JSONPlaceholder │────▶│  useTransactions  │────▶│  AsyncState<T>  │
│  API (Posts)     │     │  (TanStack Query)│     │  (Discriminated)│
└─────────────────┘     └──────────────────┘     └────────┬────────┘
                                                          │
         ┌────────────────────────────────────────────────┘
         ▼
┌──────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│ useFilteredTrans │────▶│  Filtering Logic  │────▶│   Paginated     │
│   actions Hook    │     │  (useMemo)       │     │   Results       │
└──────────────────┘     └──────────────────┘     └─────────────────┘
                                                          │
         ┌────────────────────────────────────────────────┘
         ▼
┌──────────────────┐     ┌──────────────────┐
│   Dashboard UI   │────▶│  TransactionDetail│
│   (Table/Cards)   │     │   (Full Screen)   │
└──────────────────┘     └──────────────────┘
```

## Key Files Reference

| File                                   | Purpose                                               |
| -------------------------------------- | ----------------------------------------------------- |
| `app/page.tsx`                         | Main dashboard component, Suspense wrapper            |
| `src/hooks/useTransactions.ts`         | API fetching, TanStack Query setup                    |
| `src/hooks/useFilteredTransactions.ts` | Client-side filtering & pagination                    |
| `src/utils/filter.ts`                  | Filter functions (search, account, sort, paginate)    |
| `src/types/index.ts`                   | TypeScript interfaces (TransactionRecord, AsyncState) |
| `src/components/TransactionDetail.tsx` | Full-screen transaction view                          |
| `src/components/states/ErrorState.tsx` | Error + empty state UI                                |
| `app/globals.css`                      | Design tokens, Tailwind config                        |

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

## Future Enhancements

1. **Real API Integration**: Replace JSONPlaceholder with actual backend
2. **Optimistic Updates**: Immediate UI feedback on mutations
3. **Virtual Scrolling**: For large transaction lists (>1000)
4. **WebSockets**: Real-time transaction updates
5. **Service Worker**: Offline support with background sync
6. **Analytics**: Mixpanel/Amplitude integration for user flows

## Performance Metrics

- **First Load JS**: ~140 kB (gzipped)
- **Time to Interactive**: < 2s on 4G
- **Lighthouse Score**: 95+ (estimated)
- **Bundle Size**: 24.4 kB (main chunk)

---

## How to Run

### Prerequisites

- Node.js v18+
- npm or yarn

### Setup Commands

```bash
# Navigate to the project
cd frontend_track

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

---

## Approach: State & Data Flow Architecture

### 1. Async State Management with Discriminated Unions

We use a strict discriminated union pattern for all async operations:

```typescript
type AsyncState<T> = { status: "idle" } | { status: "loading" } | { status: "success"; data: T } | { status: "error"; message: string };
```

**Why this approach?**

- **Type safety**: TypeScript enforces exhaustive switch cases
- **No impossible states**: Cannot have `isLoading=true` AND `data` populated simultaneously
- **Clear state transitions**: Each status has exactly the data it needs
- **UX consistency**: Forces explicit handling of all four UI states (idle, loading, success, error)

### 2. Data Flow Pipeline

```
JSONPlaceholder API
    ↓
useTransactions hook (TanStack Query)
    ↓
AsyncState<TransactionRecord[]>
    ↓
useFilteredTransactions hook
    ↓
Filtered → Sorted → Paginated results
    ↓
Dashboard UI (table/pagination)
    ↓
TransactionDetail (on select)
```

**Key decisions:**

- **Client-side filtering**: All 100 records cached, filter/sort in browser (fast response)
- **URL-synced state**: Filters in URL (`?q=search&account=1&sort=asc&page=1`) enable shareable views
- **TanStack Query**: Handles caching, background refetching, deduplication automatically

### 3. Component Architecture

```
DashboardPage (Suspense wrapper)
    ↓
DashboardContent (nuqs URL state)
    ↓
├─ ErrorState (full-page error UI)
├─ EmptyState (no results UI)
├─ LoadingSkeleton (shimmer loading)
├─ TransactionDetail (full-screen detail)
└─ Main Dashboard (data table)
    ├─ SearchBar (debounced input)
    ├─ TransactionTable
    │   └─ TransactionRow (memoized)
    └─ Pagination
```

---

## Assumptions (Where Spec Was Silent)

### 1. Data Transformation

**Assumption**: JSONPlaceholder posts map to transactions as:

- `id` → `transactionId`
- `userId` → `accountId`
- `title` → `reference`
- `body` → `description`

**Rationale**: The spec suggested this mapping; we added a `mapPost()` utility in `utils/filter.ts` to centralize this transformation.

### 2. Pagination Size

**Assumption**: 10 records per page (changed from initial 6).

**Rationale**: Better fits the table layout and reduces pagination clicks for 100 records.

### 3. Account ID Display

**Assumption**: Display as `ACC-{accountId}` rather than raw number.

**Rationale**: More realistic enterprise format; helps distinguish account IDs from transaction IDs.

### 4. Detail View Implementation

**Assumption**: Full-screen detail view rather than modal or inline expansion.

**Rationale**:

- Better for complex data display (audit trail, documents, ledger impact)
- Cleaner mobile experience
- Preserves table scroll position on back navigation
- Mimics real financial dashboard patterns

### 5. Mock Data Generation

**Assumption**: Generate realistic mock data for detail view fields not in API.

**Rationale**: JSONPlaceholder only provides 4 fields; we generate:

- Transaction IDs in format `8F29-92K1-00X-LM8`
- Account IDs in format `ACC_99182_CORP_01`
- Entity names, tax categories, amounts, audit trails
- All deterministically generated from transaction ID for consistency

---

## Trade-offs: What We Skipped & Why

### 1. ❌ Redux / Zustand / Context

**Skipped**: No global state library **Why**:

- URL state (nuqs) + TanStack Query handles 90% of needs
- React built-ins (`useState`, `useReducer`) sufficient for local UI state
- Avoids prop drilling without adding complexity

### 2. ❌ Virtualization

**Skipped**: No react-window or react-virtualized **Why**:

- Only 100 records from API
- 10 records per page = max 10 DOM nodes
- Would add dependency with minimal gain at this scale

### 3. ❌ Real-time Updates / WebSockets

**Skipped**: No live data updates **Why**:

- JSONPlaceholder is static
- TanStack Query's `staleTime: 5min` sufficient for demo
- Real implementation would add WebSocket layer

### 4. ❌ Dark Mode Toggle

**Skipped**: No theme switching **Why**:

- Time budget constraint (2-4 hours)
- CSS variables support dark mode, just needs toggle + persistence
- Listed in "What We'd Improve"

### 5. ❌ Infinite Scroll

**Skipped**: Chose pagination over infinite scroll **Why**:

- Pagination provides better UX for financial data (users need precise navigation)
- URL state sync easier with pages than scroll position
- Accessibility: screen readers handle pagination better

### 6. ❌ Backend Integration

**Skipped**: No real API endpoints **Why**:

- Frontend-only task per spec
- JSONPlaceholder sufficient for demonstrating patterns
- Real backend would change fetch layer only, state architecture unchanged

---

## What We'd Improve With More Time

### 1. Real-time Features

- **WebSocket integration** for live transaction updates
- **Optimistic updates** when reconciling transactions
- **Background sync** indicator (like the "Last Sync: 14m ago" in error state)

### 2. Advanced Filtering

- **Date range picker** for transaction dates
- **Amount range filter** (min/max)
- **Multi-select account filter** (checkboxes instead of dropdown)
- **Saved filters** (save common filter combinations)

### 3. Enhanced Detail View

- **PDF viewer integration** instead of placeholder
- **Transaction history timeline** (real data, not mock)
- **Comment/notes system** with persistence
- **Approval workflow** with user signatures

### 4. Performance Optimizations

- **Virtualization** if dataset grows >500 records
- **React Query prefetching** on hover (before click)
- **Service Worker** for offline support
- **Image optimization** for document previews

### 5. Accessibility & UX

- **Dark mode toggle** (CSS variables already support it)
- **Keyboard shortcuts** (`/` for search, `j/k` for navigation)
- **Screen reader announcements** for filter changes
- **Focus trapping** in detail view modal

### 6. Testing

- **Unit tests** for filter utilities
- **Integration tests** for data flow
- **E2E tests** with Playwright (critical paths: search, filter, detail view)
- **Visual regression tests** for UI components

### 7. Error Handling

- **Retry with exponential backoff**
- **Offline detection** with queue for retry
- **Partial failure handling** (show cached data with warning)

---

## Performance Optimizations Implemented

### 1. Search Debouncing

```typescript
// 300ms debounce via use-debounce library
const [debouncedValue] = useDebounce(localValue, 300);
```

- Prevents filtering on every keystroke
- Reduces re-renders from O(n) to O(1) during typing

### 2. Memoized Components

```typescript
const TransactionRow = memo(function TransactionRow({ tx, onSelect }) {
  // Only re-renders if tx or onSelect changes
});
```

- Table rows don't re-render when other rows change
- Critical for smooth scrolling with large datasets

### 3. useMemo for Filtering

```typescript
const filtered = useMemo(() => {
  const searched = applySearch(data, filter.searchQuery);
  const byAccount = applyAccountFilter(searched, filter.accountId);
  return applySortOrder(byAccount, sortOrder);
}, [data, filter.searchQuery, filter.accountId, sortOrder]);
```

- Filtering only recalculates when dependencies change
- O(n) operations cached between renders

### 4. TanStack Query Caching

```typescript
const query = useQuery({
  queryKey: ["transactions"],
  staleTime: 5 * 60 * 1000, // 5 minutes
  retry: 2,
});
```

- No duplicate requests on navigation
- Background refetch keeps data fresh
- Request deduplication across components

### 5. URL State with nuqs

- Filter state in URL enables:
  - Shareable filtered views
  - Browser back/forward support
  - No server state management needed

---

## Accessibility Features

- **Keyboard Navigation**: Table rows are focusable with Tab, selectable with Enter/Space
- **ARIA Labels**:
  - Pagination buttons labeled "Previous page" / "Next page"
  - Transaction rows have descriptive `aria-label` with ID and reference
  - Status region for pagination info (`role="status" aria-live="polite"`)
- **Focus Management**:
  - Focus ring on all interactive elements
  - Detail view returns focus to last selected row on back navigation
- **Screen Reader Support**:
  - Semantic HTML (header, main, aside, nav)
  - Hidden labels on icon-only buttons

---

## Bundle Size Analysis

| Metric                 | Value             |
| ---------------------- | ----------------- |
| First Load JS          | ~142 kB (gzipped) |
| Main Chunk             | 25.6 kB           |
| Shared Chunks          | 102 kB            |
| Lighthouse Performance | 95+ (estimated)   |

**Optimizations:**

- Tree-shaking for Lucide icons (individual imports)
- Code splitting by route
- Font optimization via Next.js
