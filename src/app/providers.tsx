"use client";

import { ThemeProvider } from "@vic-rep/design-system/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
