"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { DarkModeProvider } from "@/hooks/useDarkMode";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            retry: 2,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <DarkModeProvider>
      <NuqsAdapter>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </NuqsAdapter>
    </DarkModeProvider>
  );
}
