import type { Metadata } from "next";
import { Cairo, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "روبي بالعربي - تعلم البرمجة بلغة روبي",
  description: "منصة تفاعلية لتعلم لغة البرمجة روبي باللغة العربية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
