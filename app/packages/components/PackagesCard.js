import Link from "next/link";
import { MapPin, Calendar, IndianRupee } from "lucide-react";

export default function PackagesCard({
  title,
  description,
  imageSrc,
  href = "/packages",
  cost,
  duration,
  destination,
}) {
  return (
    <div className="border border-black/8 rounded-xl overflow-hidden bg-white shadow-[0_20px_45px_rgba(15,15,15,0.08)] flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(15,15,15,0.15)]">
      <div className="relative h-50 md:h-60 overflow-hidden ">
        <img
          src={imageSrc}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-350 hover:scale-105"
        />
      </div>
      <div className="p-5 md:p-6 flex flex-col h-full gap-5">
        <div className="">
        <p className="p-card-title font-semibold leading-tight">{title}</p>
        </div>
        <p className="text-black/60 leading-relaxed text-sm md:text-[0.9375rem] flex-1">
          {description}
        </p>

        {/* Package Info */}
        <div className="flex flex-col gap-2.5 pt-4 border-t border-black/8">
          {destination && (
            <div className="flex items-center gap-2 text-sm text-black/70">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{destination}</span>
            </div>
          )}
          {duration && (
            <div className="flex items-center gap-2 text-sm text-black/70">
              <Calendar className="w-4 h-4 shrink-0" />
              <span>
                {duration} {duration === 1 ? "day" : "days"}
              </span>
            </div>
          )}
          {cost && (
            <div className="flex items-center gap-2 text-sm text-black font-semibold">
              <IndianRupee className="w-4 h-4 shrink-0" />
              <span className="text-lg">{cost.toLocaleString("en-IN")}</span>
            </div>
          )}
        </div>

        <Link
          href={href}
          className="inline-flex items-center justify-center py-3 md:py-3.5 px-6 rounded-[10px] button font-semibold no-underline transition-all duration-200 text-center hover:bg-[#333] hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(15,15,15,0.2)]"
        >
          Explore Package
        </Link>
      </div>
    </div>
  );
}
