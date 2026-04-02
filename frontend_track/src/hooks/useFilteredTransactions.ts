import { useMemo } from "react";
import { type TransactionRecord, type FilterState, type SortOrder, type PaginationState } from "@/types";
import { applySearch, applyAccountFilter, applySortOrder, applyPagination, getDistinctAccounts } from "@/utils/filter";

export interface UseFilteredTransactionsResult {
  filtered: TransactionRecord[];
  paginated: TransactionRecord[];
  totalItems: number;
  distinctAccounts: number[];
}

export function useFilteredTransactions(data: TransactionRecord[], filter: FilterState, sortOrder: SortOrder, pagination: PaginationState): UseFilteredTransactionsResult {
  const distinctAccounts = useMemo(() => getDistinctAccounts(data), [data]);

  const filtered = useMemo(() => {
    const searched = applySearch(data, filter.searchQuery);
    const byAccount = applyAccountFilter(searched, filter.accountId);
    return applySortOrder(byAccount, sortOrder);
  }, [data, filter.searchQuery, filter.accountId, sortOrder]);

  const paginated = useMemo(() => applyPagination(filtered, pagination.currentPage, pagination.pageSize), [filtered, pagination.currentPage, pagination.pageSize]);

  return {
    filtered,
    paginated,
    totalItems: filtered.length,
    distinctAccounts,
  };
}

export default useFilteredTransactions;
