import "@/styles/globals.css";
import { Metadata } from "next";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Header } from "@/components/header";
import { siteConfig } from "@/config/site-config";
import Head from "next/head";
import ScrollToTop from "@/components/ui/scrollToTop";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["Julián Casaburi", "juliancasaburi"],
  bookmarks: "Julián Casaburi",
  alternates: {
    canonical: "/",
    languages: { "en-US": "/en-US" },
  },
  openGraph: {
    title: {
      default: siteConfig.title,
      template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    siteName: siteConfig.name,
    countryName: siteConfig.country,
    url: siteConfig.url,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: siteConfig.title,
      template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    creator: "@juliancasaburi",
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <main className="relative flex min-h-screen flex-col">
              <Header />
              <div className="flex-1">{children}</div>
            </main>
            <ScrollToTop />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
