import { type RawPost, type TransactionRecord, type SortOrder } from "@/types";

export function mapPost(post: RawPost): TransactionRecord {
  return {
    transactionId: post.id,
    accountId: post.userId,
    reference: post.title,
    description: post.body,
  };
}

export function applySearch(records: TransactionRecord[], query: string): TransactionRecord[] {
  if (!query) return records;
  const lower = query.toLowerCase();
  return records.filter((r) => r.reference.toLowerCase().includes(lower) || r.description.toLowerCase().includes(lower));
}

export function applyAccountFilter(records: TransactionRecord[], accountId: number | null): TransactionRecord[] {
  if (accountId === null) return records;
  return records.filter((r) => r.accountId === accountId);
}

export function applySortOrder(records: TransactionRecord[], order: SortOrder): TransactionRecord[] {
  const sorted = [...records];
  sorted.sort((a, b) => (order === "asc" ? a.transactionId - b.transactionId : b.transactionId - a.transactionId));
  return sorted;
}

export function applyPagination(records: TransactionRecord[], page: number, pageSize: number): TransactionRecord[] {
  const start = (page - 1) * pageSize;
  return records.slice(start, start + pageSize);
}

export function getDistinctAccounts(records: TransactionRecord[]): number[] {
  return [...new Set(records.map((r) => r.accountId))].sort((a, b) => a - b);
}
