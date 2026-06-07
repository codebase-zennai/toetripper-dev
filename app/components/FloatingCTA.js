'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plane } from "lucide-react";

const CTA_HREF = "/contact";
const WHATSAPP_LINK = "https://wa.me/message/TN5MBPRUZIHNC1";

export default function FloatingCTA() {
  const pathname = usePathname();
  const isContactPage = pathname?.startsWith("/contact");
  const isAdminPage = pathname?.startsWith("/admin");

  if (isAdminPage) return null;

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-3 items-end sm:bottom-6 sm:right-6" style={{ zIndex: 9999 }}>
      {/* WhatsApp Floating Button - Visible everywhere */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(37,211,102,0.35)] transition-all duration-200 animate-bounce hover:animate-none hover:translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:gap-3 sm:px-5 sm:py-3"
        style={{ backgroundColor: "#25D366" }}
        aria-label="Chat on WhatsApp"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white sm:h-9 sm:w-9">
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.967C16.528 1.973 14.066 1.01 11.5 1.01c-5.438 0-9.863 4.372-9.867 9.802-.001 1.73.457 3.41 1.32 4.91L1.879 21.1l5.53-1.43c1.56.852 3.129 1.294 4.754 1.294v-.001zM17.422 14c-.319-.16-1.891-.933-2.185-1.043-.294-.11-.508-.16-.721.16-.213.32-.826 1.043-1.013 1.259-.187.217-.373.244-.692.084-.319-.16-1.348-.497-2.568-1.586-.949-.846-1.59-1.892-1.777-2.213-.187-.32-.02-.493.14-.653.144-.144.319-.373.479-.56.16-.188.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.721-1.734-.987-2.373-.259-.623-.544-.54-.746-.54h-.638c-.22 0-.58.08-.884.412-.304.331-1.16 1.134-1.16 2.766 0 1.632 1.188 3.208 1.353 3.43.165.222 2.338 3.57 5.664 5.011 2.766 1.2 3.33 1.272 4.516 1.085 1.05-.165 2.186-.893 2.493-1.758.307-.865.307-1.607.215-1.765-.09-.158-.319-.248-.638-.408z" />
          </svg>
        </span>
        <span className="whitespace-nowrap text-white leading-none">
          <span style={{ fontSize: "0.875rem", fontWeight: "600" }}>
            WhatsApp Us
          </span>
        </span>
      </a>

      {/* Contact Us Page Link - Hidden on contact page */}
      {!isContactPage && (
        <Link
          href={CTA_HREF}
          className="group flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(25,59,157,0.35)] transition-all duration-200 hover:translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:gap-3 sm:px-5 sm:py-3"
          style={{ backgroundColor: "var(--primary)" }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white sm:h-9 sm:w-9">
            <Plane className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="whitespace-nowrap text-white leading-none">
            <span style={{ fontSize: "0.875rem", fontWeight: "600" }}>
              Contact Us
            </span>
          </span>
        </Link>
      )}
    </div>
  );
}
