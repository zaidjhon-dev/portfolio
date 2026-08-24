import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { GeistSans } from "geist/font/sans";

import "./globals.css";
import { ThemeProvider } from "./provider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Jhon's Portfolio",
  description: "My personal portfolio website",
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
      className={`dark ${GeistSans.variable} ${spaceGrotesk.variable}`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/logo-secondary.svg" type="image/svg+xml" sizes="any" />
      </head>
      <body className="font-sans bg-black-100 text-white antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
