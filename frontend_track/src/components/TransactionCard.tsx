import { Badge } from "@/components/ui/badge";
import type { TransactionRecord } from "@/types";

export interface TransactionCardProps {
  transaction: TransactionRecord;
  onSelect: (tx: TransactionRecord) => void;
}

export function TransactionCard({ transaction, onSelect }: TransactionCardProps) {
  const { transactionId, accountId, reference, description } = transaction;
  const truncatedDescription = description.length > 100 ? description.slice(0, 100) + "…" : description;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(transaction);
    }
  };

  return (
    <div role="button" tabIndex={0} aria-label={`View transaction ${transactionId}`} onClick={() => onSelect(transaction)} onKeyDown={handleKeyDown} className="cursor-pointer rounded-lg border border-border bg-background p-4 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-foreground dark:text-gray-100">#{transactionId}</span>
        <Badge variant="secondary">Account {accountId}</Badge>
      </div>
      <p className="mt-1 text-sm font-semibold text-foreground dark:text-gray-100">{reference}</p>
      <p className="mt-1 text-xs text-muted-foreground dark:text-gray-400">{truncatedDescription}</p>
    </div>
  );
}
