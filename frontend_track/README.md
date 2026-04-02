# TaxStreem Internship — Frontend Track

### TypeScript / React (or Next.js)

---

## Overview

Welcome to the TaxStreem Frontend Internship Assessment.

You're not being evaluated on whether you've memorized framework APIs. You're being evaluated on **how you manage state, handle real-world async complexity, and communicate through your UI**. We care about thoughtful decisions, not pixel-perfect design.

> ⏱️ **Time Budget:** 2–4 hours maximum. Prioritise working software and clean thinking over completeness.

---

## The Task: Transaction Dashboard — Data Fetch + State Management

At TaxStreem, our internal teams rely on dashboards to monitor transaction data in real time. You're building the foundational UI layer for such a dashboard.

---

## Specification

### Data Source

```
GET https://jsonplaceholder.typicode.com/posts
```

> Treat each post as a "transaction record":
>
> - `id` → Transaction ID
> - `userId` → Account ID
> - `title` → Transaction Reference
> - `body` → Transaction Description

---

## What to Build

### Core Features (Required)

1. **Transaction List View**
   - Display all records with: Transaction ID, Account ID, Reference (title), short Description preview
   - Show a **loading skeleton** while data is being fetched
   - Show a clear **error state** if the fetch fails (with a retry button)
   - Show an **empty state** if no records exist

2. **Search & Filter**
   - Client-side search across Reference and Description
   - Search must be **debounced** (300ms minimum — no on-every-keystroke calls)
   - Filter by Account ID (dropdown or select)

3. **Detail View**
   - Clicking a record should expand it or navigate to a detail view
   - Show full description, all fields, and a "Back" action

### Bonus (Top 10% separators)

- [ ] Pagination (10 records per page) OR infinite scroll
- [ ] Sort by ID ascending/descending
- [ ] URL-based state (search query + filter reflected in URL params)
- [ ] Accessible markup (ARIA labels, keyboard navigation)
- [ ] Dark mode toggle

---

## Technical Requirements

- **TypeScript** — strict mode preferred, no `any`
- **Next.js** (v13+ App Router)
- State management: React built-ins only (`useState`, `useReducer`, `useContext`) — no Redux unless you have a strong reason
- No UI component library required, but you may use one (Tailwind, shadcn, Chakra — your call)
- No backend needed — this is a pure frontend task

---

## Project Structure (Not strict)

```
frontend_task/
├── src/
│   ├── components/
│   │   ├── TransactionList.tsx
│   │   ├── TransactionCard.tsx
│   │   ├── TransactionDetail.tsx
│   │   ├── SearchBar.tsx
│   │   └── states/
│   │       ├── LoadingSkeleton.tsx
│   │       ├── ErrorState.tsx
│   │       └── EmptyState.tsx
│   ├── hooks/
│   │   ├── useTransactions.ts
│   │   └── useDebounce.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── filter.ts
│   └── App.tsx (or page.tsx for Next.js)
├── public/
├── tsconfig.json
├── package.json
└── README.md
```

---

## What NOT To Do

- Do not use `useEffect` chains to manage state that belongs in a custom hook
- Do not use `any` — ever
- Do not skip loading/error/empty states — these are not optional
- Do not submit without testing the fetch failure path (you can temporarily break the URL to verify)
- Do not over-style at the expense of functionality

---

## State Management Expectations

We expect to see deliberate state design. At minimum, your fetch state should handle:

```typescript
type FetchState<T> = { status: "idle" } | { status: "loading" } | { status: "success"; data: T } | { status: "error"; message: string };
```

> If you use a `boolean isLoading` + separate `error` + separate `data` trio of states, you will be asked why in the review call. Know your decision.

---

## Submission

- GitHub repo (preferred) OR zip archive
- The app must run locally with: `npm install && npm run dev`
- Deadline: **72 hours from receipt**
- Include a `README.md` (see below)

---

## Required README Contents

Your README **must** answer:

1. **Approach** — how did you structure state and data flow?
2. **Assumptions** — what did you decide where the spec was silent?
3. **Trade-offs** — what did you skip and why?
4. **What you'd improve** — with more time?
5. **How to run** — exact commands for a clean setup

---

## Evaluation Rubric

| Area                              | Weight |
| --------------------------------- | ------ |
| State management correctness      | 30%    |
| Component structure & reusability | 30%    |
| UX quality (loading/error/empty)  | 20%    |
| Communication (README)            | 20%    |

---

## Environment

- Node.js v18+
- TypeScript v5+
- React v18+ or Next.js v13+
- Any CSS approach (Tailwind, CSS Modules, plain CSS)

---

## Questions?

Ask. We respect engineers who identify ambiguity and resolve it with a question, not a wrong assumption.

---

## Implementation Notes

### 1. Approach — State & Data Flow Architecture

**Async State Management**: We use discriminated unions for type-safe async operations:

```typescript
type AsyncState<T> = { status: "idle" } | { status: "loading" } | { status: "success"; data: T } | { status: "error"; message: string };
```

**Data Flow Pipeline**:

```
JSONPlaceholder API → useTransactions (TanStack Query) → useFilteredTransactions → UI
```

**Key Decisions**:

- Client-side filtering with all 100 records cached locally for fast response
- URL-synced state (`?q=search&page=1`) enables shareable filtered views
- TanStack Query handles caching, deduplication, and background refetching

---

### 2. Assumptions — Where the Spec Was Silent

| Area                | Decision                                                                                       | Rationale                                          |
| ------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **Data Mapping**    | `id`→transactionId, `userId`→accountId, `title`→reference, `body`→description                  | Spec suggested this mapping                        |
| **Pagination**      | 10 records per page                                                                            | Better fits table layout                           |
| **Account Display** | `ACC-{accountId}` format                                                                       | More realistic enterprise format                   |
| **Detail View**     | Full-screen view instead of modal                                                              | Better for complex data, preserves scroll position |
| **Mock Data**       | Generate realistic detail fields (entity, tax category, audit trail) deterministically from ID | JSONPlaceholder only provides 4 fields             |

---

### 3. Trade-offs — What We Skipped & Why

| Feature         | Status      | Reason                                                                |
| --------------- | ----------- | --------------------------------------------------------------------- |
| Redux/Zustand   | ❌ Skipped  | URL state + TanStack Query sufficient; React hooks handle local state |
| Virtualization  | ❌ Skipped  | Only 100 records, 10 per page = minimal DOM nodes                     |
| WebSockets      | ❌ Skipped  | JSONPlaceholder is static; would add for real backend                 |
| Dark Mode       | ❌ Skipped  | Time budget; CSS variables support it, needs toggle only              |
| Infinite Scroll | ❌ Skipped  | Pagination better for financial data (precise navigation, URL state)  |
| Sort by ID      | ✅ Complete | Toggles A-Z / Z-A, URL synced                                         |

---

### 4. What We'd Improve — With More Time

**Real-time Features**: WebSocket integration, optimistic updates, background sync indicator

**Advanced Filtering**: Date range picker, amount range filter, multi-select account filter, saved filters

**Enhanced Detail View**: PDF viewer integration, real transaction history (not mock), comment system

**Performance**: Virtualization for >500 records, prefetch on hover, Service Worker for offline

**Accessibility**: Dark mode toggle, keyboard shortcuts (`/` for search, `j/k` for nav), focus trapping

**Testing**: Unit tests for filters, integration tests, E2E with Playwright, visual regression

**Error Handling**: Exponential backoff retry, offline detection with queue, partial failure handling

---

### 5. How to Run

```bash
# Prerequisites: Node.js v18+

# Navigate to project
cd frontend_track

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

**Build for production**:

```bash
npm run build
npm start
```

---

## Verification Checklist

| Requirement                                            | Status |
| ------------------------------------------------------ | ------ |
| Transaction List (ID, Account, Reference, Description) | ✅     |
| Loading skeleton                                       | ✅     |
| Error state with retry                                 | ✅     |
| Empty state                                            | ✅     |
| Debounced search (300ms)                               | ✅     |
| Account ID filter                                      | ✅     |
| Detail view with Back action                           | ✅     |
| Pagination (10 records/page)                           | ✅     |
| URL-based state                                        | ✅     |
| ARIA labels, keyboard navigation                       | ✅     |
| Discriminated union state                              | ✅     |
| No `any` types                                         | ✅     |
