import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";

const exo = Exo_2({
  variable: "--font-exo",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Wordt er al brood gehaald?",
  description: "Zie meteen of een collega het brood voor de lunch haalt.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl" className={`${exo.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
