import type { Metadata } from "next";
import "@vic-rep/design-system/tokens.css";
import "./globals.css";
import { ThemeProvider } from "@vic-rep/design-system/theme";

export const metadata: Metadata = {
  title: "Trusti — Реферална програма",
  description: "Покани приятели и печели бонуси с Trusti",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg">
      <head>
        <script
          src="https://kit.fontawesome.com/your-kit-id.js"
          crossOrigin="anonymous"
          defer
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
