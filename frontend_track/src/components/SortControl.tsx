"use client";

import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type SortOrder } from "@/types";

interface SortControlProps {
  order: SortOrder;
  onChange: (order: SortOrder) => void;
}

export function SortControl({ order, onChange }: SortControlProps) {
  const isAsc = order === "asc";
  const nextOrder: SortOrder = isAsc ? "desc" : "asc";

  return (
    <Button variant="outline" className="dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600" aria-label={`Sort ${isAsc ? "ascending" : "descending"}, click to sort ${isAsc ? "descending" : "ascending"}`} onClick={() => onChange(nextOrder)}>
      {isAsc ? <ArrowUp /> : <ArrowDown />}
      {isAsc ? "Ascending" : "Descending"}
    </Button>
  );
}
