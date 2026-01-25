import type { Metadata } from "next";
import { Noto_Sans_Arabic, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-sans-arabic",
  subsets: ["arabic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ruby3araby.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "روبي عربي - تعلم البرمجة بلغة روبي",
    template: "%s | روبي عربي",
  },
  description:
    "منصة تفاعلية لتعلم لغة البرمجة روبي باللغة العربية. دروس شاملة من الأساسيات إلى البرمجة الكائنية مع محرر شيفرة تفاعلي يعمل في المتصفح.",
  keywords: [
    "روبي",
    "Ruby",
    "تعلم البرمجة",
    "برمجة بالعربي",
    "دورة روبي",
    "Ruby tutorial Arabic",
    "تعلم روبي عربي",
    "برمجة للمبتدئين",
    "ruby.wasm",
    "محرر شيفرة تفاعلي",
  ],
  authors: [{ name: "روبي عربي" }],
  creator: "روبي عربي",
  publisher: "روبي عربي",
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
    siteName: "روبي عربي",
    title: "روبي عربي - تعلم البرمجة بلغة روبي",
    description:
      "منصة تفاعلية لتعلم لغة البرمجة روبي باللغة العربية. دروس شاملة مع محرر شيفرة تفاعلي يعمل في المتصفح.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "روبي عربي - تعلم البرمجة بلغة روبي",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "روبي عربي - تعلم البرمجة بلغة روبي",
    description:
      "منصة تفاعلية لتعلم لغة البرمجة روبي باللغة العربية. دروس شاملة مع محرر شيفرة تفاعلي.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "education",
};

// Inline script to apply theme before React hydrates (prevents flash)
const themeScript = `
(function() {
  var STORAGE_KEY = 'ruby3araby_theme';
  var theme = 'system';
  try {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      theme = stored;
    }
  } catch (e) {}
  var resolved = theme;
  if (theme === 'system') {
    resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.classList.add(resolved);
  document.documentElement.setAttribute('data-theme', resolved);
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${notoSansArabic.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
