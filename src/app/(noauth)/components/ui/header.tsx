"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import Logo from "./logo";

export default function Header() {
  const [top, setTop] = useState<boolean>(true);

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed z-30 w-full transition duration-300 ease-in-out md:bg-opacity-90 ${
        !top ? "bg-card shadow-lg backdrop-blur-sm" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Site branding */}
          <div className="mr-4 shrink-0">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow flex-wrap items-center justify-end gap-4">
              <li>
                <Link
                  className="flex h-full w-full items-center justify-center p-2 text-foreground hover:text-primary"
                  href={"/login"}
                >
                  Entrar
                </Link>
              </li>
              <li>
                <Link
                  className="flex h-full w-full items-center justify-center p-2 text-foreground hover:text-primary"
                  href={"/register"}
                >
                  Registro
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
