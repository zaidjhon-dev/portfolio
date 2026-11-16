import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "./globals.css";
import { ThemeProvider } from "./provider";

export const metadata: Metadata = {
  title: "Jhon Renz Diaz · ZAID.DEV",
  description:
    "Web developer based in the Philippines and BSIT graduate. Creator of DermaSure PH.",
  openGraph: {
    title: "Jhon Renz Diaz · ZAID.DEV",
    description:
      "Web developer based in the Philippines and BSIT graduate. Creator of DermaSure PH.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Jhon Renz Diaz · ZAID.DEV",
    description:
      "Web developer based in the Philippines and BSIT graduate. Creator of DermaSure PH.",
  },
  icons: {
    icon: "/logo-secondary.svg",
    shortcut: "/logo-secondary.svg",
    apple: "/logo-secondary.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`light ${GeistSans.variable}`}
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="icon"
          href="/logo-secondary.svg"
          type="image/svg+xml"
          sizes="any"
        />
        <link
          rel="preload"
          as="image"
          href="/profile.webp"
          type="image/webp"
        />
      </head>
      <body className="font-sans bg-[#F8F8F6] text-[#0D0D0D] antialiased selection:bg-[#1D4ED8]/15 selection:text-[#1D4ED8]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#1D4ED8] focus:text-white focus:rounded-lg focus:font-semibold focus:text-sm shadow-md"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
