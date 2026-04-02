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
export type AsyncState<T> = { status: "idle" } | { status: "loading" } | { status: "success"; data: T } | { status: "error"; message: string };

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

export type SortOrder = "asc" | "desc";

export type FilterAction = { type: "SET_SEARCH"; payload: string } | { type: "SET_ACCOUNT"; payload: number | null } | { type: "RESET" };

export function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "SET_ACCOUNT":
      return { ...state, accountId: action.payload };
    case "RESET":
      return { searchQuery: "", accountId: null };
  }
}

export interface DashboardState {
  searchQuery: string;
  accountId: number | null;
  sortOrder: SortOrder;
  currentPage: number;
}
