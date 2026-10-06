import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ITZ FIZZ — Scroll-Driven Hero Showcase",
  description: "Next.js & GSAP ScrollTrigger performance experience featuring scroll-driven transform dynamics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
