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
    <div className="fixed bottom-6 right-6 z-[600]">
      <Link
        href={CTA_HREF}
        className="group flex items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(25,59,157,0.35)] transition-transform duration-200 animate-bounce hover:animate-none hover:translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        style={{ backgroundColor: "var(--primary)" }}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white">
          <Plane className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
        </span>
        <span className="whitespace-nowrap text-white">
          <h6>
            Contact Us
          </h6>
        </span>
      </Link>
    </div>
  );
}
