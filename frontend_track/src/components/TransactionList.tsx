import { TransactionCard } from "@/components/TransactionCard";
import type { TransactionRecord } from "@/types";

export interface TransactionListProps {
  transactions: TransactionRecord[];
  onSelect: (tx: TransactionRecord) => void;
}

export function TransactionList({ transactions, onSelect }: TransactionListProps) {
  return (
    <ul className="flex flex-col gap-2">
      {transactions.map((tx) => (
        <li key={tx.transactionId}>
          <TransactionCard transaction={tx} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  );
}
