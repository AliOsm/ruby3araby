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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ruby3araby.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "روبي بالعربي - تعلم البرمجة بلغة روبي",
    template: "%s | روبي بالعربي",
  },
  description:
    "منصة تفاعلية لتعلم لغة البرمجة روبي باللغة العربية. دروس شاملة من الأساسيات إلى البرمجة الكائنية مع محرر كود تفاعلي يعمل في المتصفح.",
  keywords: [
    "روبي",
    "Ruby",
    "تعلم البرمجة",
    "برمجة بالعربي",
    "دورة روبي",
    "Ruby tutorial Arabic",
    "تعلم روبي بالعربي",
    "برمجة للمبتدئين",
    "ruby.wasm",
    "محرر كود تفاعلي",
  ],
  authors: [{ name: "روبي بالعربي" }],
  creator: "روبي بالعربي",
  publisher: "روبي بالعربي",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: siteUrl,
    siteName: "روبي بالعربي",
    title: "روبي بالعربي - تعلم البرمجة بلغة روبي",
    description:
      "منصة تفاعلية لتعلم لغة البرمجة روبي باللغة العربية. دروس شاملة مع محرر كود تفاعلي يعمل في المتصفح.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "روبي بالعربي - تعلم البرمجة بلغة روبي",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "روبي بالعربي - تعلم البرمجة بلغة روبي",
    description:
      "منصة تفاعلية لتعلم لغة البرمجة روبي باللغة العربية. دروس شاملة مع محرر كود تفاعلي.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "education",
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
