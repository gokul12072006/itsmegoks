import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio — UI/UX Designer & Indie Game Developer | Immersive Digital Experiences",
  description: "Passionate UI/UX designer and aspiring indie game developer creating immersive digital experiences through modern design, interactive storytelling, and creative frontend development.",
  keywords: ["UI Designer", "UX Designer", "Indie Game Developer", "Frontend Development", "Interactive Storytelling", "Motion Design", "Creative Developer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.className} grain-overlay`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
