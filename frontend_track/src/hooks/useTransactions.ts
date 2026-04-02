import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type RawPost, type TransactionRecord, type AsyncState } from "@/types";
import { mapPost } from "@/utils/filter";

// 3.1 — fetch raw posts from the API
export async function fetchTransactions(): Promise<RawPost[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error(`Failed to fetch transactions: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

// 3.2 — map TanStack Query result to AsyncState
export function toAsyncState(query: UseQueryResult<TransactionRecord[], Error>): AsyncState<TransactionRecord[]> {
  if (query.isLoading) return { status: "loading" };
  if (query.isError) return { status: "error", message: query.error.message };
  if (query.data !== undefined) return { status: "success", data: query.data };
  return { status: "idle" };
}

// 3.3 — hook
export interface UseTransactionsResult {
  state: AsyncState<TransactionRecord[]>;
  retry: () => void;
}

export function useTransactions(): UseTransactionsResult {
  const query = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    select: (posts) => posts.map(mapPost),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  return {
    state: toAsyncState(query),
    retry: query.refetch,
  };
}

export default useTransactions;
