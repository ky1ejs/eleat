import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";


export const metadata: Metadata = {
  title: "Eleat",
  description: "Nutrition planning made easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
