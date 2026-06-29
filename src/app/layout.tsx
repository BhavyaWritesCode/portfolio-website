import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { spaceGrotesk, inter, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";
import {
  Preloader,
  Navbar,
  Footer,
  ChatbotWidget,
  EasterEggs,
} from "@/components/GlobalDynamic";
import StarCanvas from "@/components/StarCanvas";
import CinematicEffects from "@/components/effects/CinematicEffects";

export const metadata: Metadata = {
  title: {
    default: "Bhavya Saini",
    template: "%s — Bhavya Saini",
  },
  description:
    "Fourth-year CS student. Building AI-powered systems with Java, LangChain4j, MCP, and RAG pipelines. Seeking QA/SDET internship.",
  keywords: [
    "Bhavya Saini",
    "QA intern",
    "SDET intern",
    "AI systems",
    "Java developer",
    "LangChain4j",
    "RAG pipelines",
    "MCP server",
    "New Horizon College",
    "Bangalore",
    "internship",
  ],
  authors: [{ name: "Bhavya Saini" }],
  creator: "Bhavya Saini",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Bhavya Saini Portfolio",
    title: "Bhavya Saini — AI Systems Builder & QA/SDET Aspirant",
    description:
      "Fourth-year CS student building AI systems with Java, LangChain4j, MCP & RAG. Seeking QA/SDET internship.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhavya Saini — AI Systems Builder & QA/SDET Aspirant",
    description:
      "Fourth-year CS student building AI-powered systems. Java · LangChain4j · MCP · RAG · Docker.",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
    apple: "/icons/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#C4913A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body style={{ background: '#03030A' }}>
        {/* Accessibility */}
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>

        {/* Cinematic preloader — gated by sessionStorage */}
        <Preloader />

        {/* Global Cinematic Post-Processing Overlay */}
        <CinematicEffects />

        {/* StarCanvas — real 3D starfield */}
        <StarCanvas />



        {/* Global nav */}
        <Navbar />

        {/* Page content */}
        <main id="main-content" style={{ position: "relative", zIndex: 1 }}>
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* AI Chatbot widget */}
        <ChatbotWidget />

        {/* Easter eggs */}
        <EasterEggs />

        {/* Analytics */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
