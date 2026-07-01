import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AuthRedirect from "@/components/AuthRedirect";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Studio J Productions",
  description: "Premium cinematic films for businesses, brands, and unforgettable moments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <AuthRedirect />
        {children}
        <Footer />
      </body>
    </html>
  );
}