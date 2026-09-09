import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import { SettingsProvider } from "@/state/SettingsProvider";
import { GameProvider } from "@/state/GameProvider";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Display face for headings and the wordmark — squared-off and spacefaring. */
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Imperium Companion",
    template: "%s · Imperium Companion",
  },
  description:
    "A rules companion and game tracker for Twilight Imperium: Fourth Edition, with expansion content you can switch on and off.",
};

export const viewport: Viewport = {
  themeColor: "#080b13",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable}`}
    >
      <body>
        <SettingsProvider>
          <GameProvider>
            <AppShell>{children}</AppShell>
          </GameProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
