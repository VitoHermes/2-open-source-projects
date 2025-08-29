"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-black/50 backdrop-blur border-b border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <Link href="#home" className="font-semibold tracking-tight">
            <Image src="/name-logo.png" alt="Hero" width={100} height={100} className="rounded-full" />
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <a href="#expertise" className="hover:opacity-80">Expertise</a>
            <a href="#work" className="hover:opacity-80">Work</a>
            <a href="#experience" className="hover:opacity-80">Experience</a>
            <a href="#contact" className="hover:opacity-80">Contact</a>
          </nav>
          
        </div>
      </div>
      
    </header>
  );
}


