import type { Metadata } from "next";
import { Exo } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import SmoothScrollProvider from "@/components/smooth-scroll-provider";

const exo = Exo({
  subsets: ["latin"],
  variable: "--font-exo",
});

export const metadata: Metadata = {
  title: "Momtaz Host - Professional Hosting & Web Services",
  description:
    "Professional hosting and web services provider offering VPS, shared hosting, cloud solutions, domain registration, and web development services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body
        className={` ${exo.variable} antialiased min-h-screen flex flex-col`}
      >
        <SmoothScrollProvider>
          <Header  />
          <main className="flex-1">{children}</main>
          <Toaster />
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
