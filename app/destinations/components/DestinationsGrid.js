'use client';

import DestinationsCard from './DestinationsCard';

const DESTINATIONS_LIST = [
  {
    id: 'malaysia',
    title: 'Malaysia',
    description: 'Experience a vibrant mix of modern metropolises, colonial historic towns, pristine beaches, and ancient rainforests.',
    imageSrc: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'iceland',
    title: 'Iceland',
    description: 'Embark on an unforgettable journey through a dramatic landscape of glaciers, active volcanoes, and cascading waterfalls.',
    imageSrc: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'europe',
    title: 'Europe',
    description: 'Immerse yourself in historic charm, world-class art, and diverse landscapes across timeless continental destinations.',
    imageSrc: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'australia',
    title: 'Australia',
    description: 'Explore the vast beauty of the land down under, from pristine coastal reefs to the sacred red sands of the outback.',
    imageSrc: 'https://images.unsplash.com/photo-1523482596682-cd93a6e54520?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'bali',
    title: 'Bali',
    description: 'Discover a tropical paradise with stunning beaches, lush rice terraces, ancient temples, vibrant culture, and world-class wellness retreats.',
    imageSrc: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'usa',
    title: 'USA',
    description: 'Uncover a tapestry of diverse experiences, spanning iconic urban skylines, massive national parks, and coastal roads.',
    imageSrc: 'https://images.unsplash.com/photo-1474015977336-57f3084c8a24?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'africa',
    title: 'Africa',
    description: 'Experience the raw majesty of untamed savannas, legendary wildlife safaris, and rich cultural traditions.',
    imageSrc: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'india',
    title: 'Incredible India',
    description: 'Engage your senses in a colorful land of ancient architectural marvels, spiritual heritage, and misty hill stations.',
    imageSrc: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'japan',
    title: 'Japan',
    description: 'Discover the perfect harmony of ultra-modern cities, historic temples, and serene cherry blossom landscapes.',
    imageSrc: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'singapore',
    title: 'Singapore',
    description: 'A city-state of stunning contrasts — futuristic gardens, hawker culture, and seamless efficiency.',
    imageSrc: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'south-korea',
    title: 'South Korea',
    description: 'Delight in the dynamic fusion of futuristic high-tech cities, ancient royal palaces, and scenic volcanic islands.',
    imageSrc: 'https://images.unsplash.com/photo-1538669715516-b23d53efdfb7?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'vietnam',
    title: 'Vietnam',
    description: 'Discover rich historic heritage, breathtaking landscapes of Halong Bay, delicious street food, and vibrant city life.',
    imageSrc: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'maldives',
    title: 'Maldives',
    description: 'Indulge in ultimate luxury with overwater villas, private turquoise lagoons, and colorful underwater marine sanctuaries.',
    imageSrc: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'mauritius',
    title: 'Mauritius',
    description: 'Escape to a diverse island oasis featuring dramatic volcanic peaks, historic estates, and coral-fringed beaches.',
    imageSrc: '/images/mauritius_dest.png',
  },
  {
    id: 'russia',
    title: 'Russia',
    description: 'Discover a land of grand imperial history, ornate orthodox cathedrals, and rich literary and artistic heritage.',
    imageSrc: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'middle-east',
    title: 'Middle East',
    description: 'Journey through golden desert dunes, glittering modern skylines, and ancient historic trade bazaars.',
    imageSrc: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'scandinavia',
    title: 'Scandinavia',
    description: 'Traverse deep fjord valleys, historic maritime cities, and witness the magical dance of the Northern Lights.',
    imageSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80',
  },
];

export default function DestinationsGrid() {
  return (
    <section className="bg-linear-to-b mb-24 md:mb-40 px-4 sm:px-8 lg:px-20" id="destinations-grid">
      <div className="padding-9rem">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {DESTINATIONS_LIST.map((dest) => (
            <DestinationsCard
              key={dest.id}
              title={dest.title}
              description={dest.description}
              imageSrc={dest.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
