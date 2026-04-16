import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sportify – Football Talent Platform",
  description:
    "Connect football talent with opportunity. Discover players, build teams, and showcase skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
