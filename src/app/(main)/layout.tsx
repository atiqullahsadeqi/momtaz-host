"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Preloader from "@/components/Preloader";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Preloader /> */}
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
