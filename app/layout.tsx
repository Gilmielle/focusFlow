import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// TODO: import fonts to fonts folder
const inter = Inter({
  variable: "--font-inter",
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | FocusFlow",
    default: "FocusFlow",
  },
  description: "FocusFlow - трекер привычек",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
