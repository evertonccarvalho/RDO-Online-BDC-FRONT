"use client";

import Footer from "./components/ui/footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="grow">{children}</main>

      <Footer />
    </>
  );
}
