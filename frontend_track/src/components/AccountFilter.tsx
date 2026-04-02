"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AccountFilterProps {
  accounts: number[];
  selected: number | null;
  onChange: (accountId: number | null) => void;
}

export function AccountFilter({ accounts, selected, onChange }: AccountFilterProps) {
  const handleChange = (value: string) => {
    if (value === "all") {
      onChange(null);
    } else {
      onChange(parseInt(value, 10));
    }
  };

  return (
    <Select value={selected === null ? "all" : String(selected)} onValueChange={handleChange}>
      <SelectTrigger className="dark:bg-gray-700 dark:text-white dark:border-gray-600" aria-label="Filter by account">
        <SelectValue placeholder="All Accounts" />
      </SelectTrigger>
      <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
        <SelectItem value="all" className="dark:text-gray-100 dark:focus:bg-gray-700">
          All Accounts
        </SelectItem>
        {accounts.map((accountId) => (
          <SelectItem key={accountId} value={String(accountId)} className="dark:text-gray-100 dark:focus:bg-gray-700">
            {accountId}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
