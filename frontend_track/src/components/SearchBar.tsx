"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);

  const debouncedOnChange = useDebouncedCallback((next: string) => {
    onChange(next);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setLocalValue(next);
    debouncedOnChange(next);
  };

  // Sync when parent clears the value externally (e.g. clearFilters)
  if (value === "" && localValue !== "") {
    setLocalValue("");
    debouncedOnChange.cancel();
  }

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground dark:text-gray-400" />
      <Input type="text" placeholder="Search by reference or description..." value={localValue} onChange={handleChange} className="pl-9 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder:text-gray-400" aria-label="Search transactions" />
    </div>
  );
}
