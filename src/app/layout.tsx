import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CramBudy",
  description: "An AI study tutor for focused exam preparation.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
