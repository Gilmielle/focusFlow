import type { Metadata } from "next";
import { inter } from "@/app/fonts";
import "./globals.css";
import "./utils.css";


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
