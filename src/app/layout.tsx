import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import MobileTabBar from "@/components/MobileTabBar";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import ChineseTranslateButton from "@/components/ChineseTranslateButton";

// Runs synchronously during HTML parsing (before first paint) so the saved
// theme is applied without a flash of the default palette on reload.
const themeInitScript = `(function(){try{var t=localStorage.getItem("cherry-theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Cherry Homz | Where Property Dreams Blossom | Sydney Real Estate",
  description:
    "Cherry Homz is Australia's premier real estate agency. Buy, sell, rent, or find land across Sydney, Melbourne, Brisbane, Perth, and the Gold Coast. Premium properties, expert agents, exceptional service.",
  keywords: [
    "Sydney real estate",
    "buy property Australia",
    "rent property Australia",
    "Cherry Homz",
    "luxury homes Sydney",
    "Melbourne real estate",
    "Brisbane property",
    "Gold Coast real estate",
    "Perth property",
  ],
  authors: [{ name: "Cherry Homz" }],
  openGraph: {
    title: "Cherry Homz | Where Property Dreams Blossom",
    description:
      "Australia's premier real estate agency. Premium properties across Sydney, Melbourne, Brisbane, Perth & the Gold Coast.",
    type: "website",
    locale: "en_AU",
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
      data-theme="cherry"
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link
          rel="icon"
          href="/favicon.ico"
          sizes="any"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {children}

        <MobileTabBar />
        <ThemeSwitcher />
        <ChineseTranslateButton />
      </body>
    </html>
  );
}
