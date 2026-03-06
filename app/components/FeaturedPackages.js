'use client';
import Link from 'next/link';
import PackagesCard from '../packages/components/PackagesCard';

const TRENDING_PACKAGES = [
  {
    id: 1,
    title: "Himalayan Trekking",
    description: "High-altitude trails, mountain villages, and spectacular valley views.",
    imageSrc: "/images/explore2.jpg",
    href: "/packages/himalayan-trek",
    destination: "Himachal Pradesh",
    cost: 28000,
    duration: 6,
  },
  {
    id: 2,
    title: "Kerala Backwaters",
    description: "Houseboat stays, village visits, and Ayurvedic wellness in serene waterways.",
    imageSrc: "/images/explore1.jpg",
    href: "/packages/kerala-backwaters",
    destination: "Kerala",
    cost: 35000,
    duration: 6,
  },
  {
    id: 3,
    title: "Coastal Weekend",
    description: "Short, breezy getaways with boutique stays, local food, and easy transfers.",
    imageSrc: "/images/explore2.jpg",
    href: "/packages/coastal-weekend",
    destination: "Goa",
    cost: 15000,
    duration: 3,
  }
];

export default function FeaturedPackages(){
  return (
    <section className="section mb-20">
      <div className="padding-9rem">
        <div className="flex flex-col items-center gap-3 mb-12">
        <h1 className="text-center p-10">
         Trending Destinations
        </h1>
          <p className="max-w-136 text-black/65 text-base text-center">
            Discover our most popular getaways curated for unforgettable experiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {TRENDING_PACKAGES.map((pkg) => (
            <PackagesCard
              key={pkg.id}
              title={pkg.title}
              description={pkg.description}
              imageSrc={pkg.imageSrc}
              href={pkg.href}
              cost={pkg.cost}
              duration={pkg.duration}
              destination={pkg.destination}
            />
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Link
            href="/packages"
            className="inline-flex items-center justify-center py-3.5 px-8 rounded-[10px] font-semibold no-underline transition-all duration-200 text-center hover:bg-[#333] hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(15,15,15,0.2)]"
          >
            View More Packages
          </Link>
        </div>
      </div>
    </section>
  );
}
