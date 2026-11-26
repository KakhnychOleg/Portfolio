import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Unbounded } from "next/font/google";
import { profile, siteUrl } from "@/content/profile";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-unbounded",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const title = `${profile.name}, ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: profile.tagline,
  alternates: { canonical: "/" },
  authors: [{ name: profile.name, url: siteUrl }],
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title,
    description: profile.tagline,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description: profile.tagline },
};

export const viewport: Viewport = { themeColor: "#0c0b0b", colorScheme: "dark" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${inter.variable} ${mono.variable}`}
    >
      <body>
        <a className="skip" href="#top">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
