// TaxStreem Frontend Track — Starter Types
// Extend or modify as needed. These are a foundation, not a constraint.

// Raw API shape from jsonplaceholder
export interface RawPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Domain model — how your app thinks about it
export interface TransactionRecord {
  transactionId: number;
  accountId: number;
  reference: string;
  description: string;
}

// Discriminated union for async state — use this pattern
export type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };

// Filter state
export interface FilterState {
  searchQuery: string;
  accountId: number | null;
}

// Pagination state (if implementing bonus)
export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}
