"use client";

import { Button } from "@/components/ui/button";
import { PaginationState } from "@/types";

interface PaginationControlsProps {
  pagination: PaginationState;
  onPageChange: (page: number) => void;
}

export function PaginationControls({ pagination, onPageChange }: PaginationControlsProps) {
  const { currentPage, pageSize, totalItems } = pagination;
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-1">
      <Button variant="outline" size="sm" className="dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 disabled:dark:opacity-50" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} aria-label="Go to previous page">
        Previous
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button key={page} variant={page === currentPage ? "default" : "outline"} size="sm" className={page === currentPage ? "dark:bg-gray-100 dark:text-gray-900" : "dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"} onClick={() => onPageChange(page)} aria-label={`Go to page ${page}`} aria-current={page === currentPage ? "page" : undefined}>
          {page}
        </Button>
      ))}

      <Button variant="outline" size="sm" className="dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 disabled:dark:opacity-50" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} aria-label="Go to next page">
        Next
      </Button>
    </div>
  );
}
