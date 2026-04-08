'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plane } from "lucide-react";

const CTA_HREF = "/contact";

export default function FloatingCTA() {
  const pathname = usePathname();
  if (pathname?.startsWith("/contact")) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[600] sm:bottom-6 sm:right-6">
      <Link
        href={CTA_HREF}
        className="group flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(25,59,157,0.35)] transition-transform duration-200 animate-bounce hover:animate-none hover:translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:gap-3 sm:px-5 sm:py-3"
        style={{ backgroundColor: "var(--primary)" }}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white sm:h-9 sm:w-9">
          <Plane className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
        </span>
        <span className="whitespace-nowrap text-white leading-none">
          <h6>
            Contact Us
          </h6>
        </span>
      </Link>
    </div>
  );
}
