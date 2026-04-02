import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { HtmlWithDarkMode } from "./HtmlWithDarkMode";
import { Providers } from "./Providers";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Transaction Dashboard",
  description: "TaxStreem Transaction Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontClass = cn("font-sans", geist.variable);
  return (
    <Providers>
      <HtmlWithDarkMode fontClass={fontClass}>
        {/* Inline script runs before hydration to prevent flash of wrong theme */}
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`,
            }}
          />
        </head>
        <body className="bg-background text-foreground dark:bg-gray-900 dark:text-gray-100">{children}</body>
      </HtmlWithDarkMode>
    </Providers>
  );
}
