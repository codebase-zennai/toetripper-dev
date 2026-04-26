'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export const DESTINATIONS = [
  {
    slug: 'bali-indonesia',
    name: 'Bali',
    country: 'Indonesia',
    tagline: 'Island of the Gods',
    badge: 'International',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&auto=format&fit=crop&q=80',
    cardImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=80',
    excerpt: 'Terraced rice paddies, sacred temples, and world-class surf breaks make Bali a timeless escape.',
    readTime: '5 min read',
    content: [
      {
        type: 'heading',
        text: 'Why Bali Captivates Every Traveller',
      },
      {
        type: 'paragraph',
        text: 'Bali is more than a destination — it is a feeling. The island\'s spiritual energy, lush green landscapes, and warm Balinese hospitality create an atmosphere unlike anywhere else on Earth. From the rice terraces of Tegallalang to the surf break at Uluwatu, every corner holds a new story.',
      },
      {
        type: 'heading',
        text: 'Top Experiences in Bali',
      },
      {
        type: 'paragraph',
        text: 'Watch the sunrise over Mount Batur, cycle through rice paddies in Ubud, witness the iconic Kecak fire dance at sunset, or simply unwind on the white sands of Nusa Dua. Bali rewards slow travellers and adventure seekers equally.',
      },
      {
        type: 'heading',
        text: 'Where to Stay',
      },
      {
        type: 'paragraph',
        text: 'Seminyak offers boutique beach clubs and designer villas. Ubud is perfect for cultural immersion and wellness retreats nestled in the jungle. Canggu draws the digital-nomad crowd with its relaxed, creative vibe. Nusa Dua delivers five-star luxury right on the beach.',
      },
      {
        type: 'blockquote',
        text: 'Bali does not just offer a holiday — it offers a transformation. You arrive a tourist and leave a devotee.',
      },
      {
        type: 'heading',
        text: 'Best Time to Visit',
      },
      {
        type: 'paragraph',
        text: 'April to October is Bali\'s dry season — sunny days, low humidity, and ideal conditions for outdoor activities. November to March brings short tropical showers that keep the island intensely green and the crowds thinner.',
      },
      {
        type: 'heading',
        text: 'Getting There',
      },
      {
        type: 'paragraph',
        text: 'Ngurah Rai International Airport (DPS) connects Bali to most major Asian hubs. Direct flights are available from Mumbai, Delhi, and Chennai. Toe Tripper handles your transfers, visas, and on-island logistics seamlessly.',
      },
    ],
  },
  {
    slug: 'maldives',
    name: 'Maldives',
    country: 'Indian Ocean',
    tagline: 'Paradise Perfected',
    badge: 'International',
    heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=900&auto=format&fit=crop&q=80',
    cardImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&auto=format&fit=crop&q=80',
    excerpt: 'Overwater bungalows, crystal-clear lagoons, and pristine coral reefs in the heart of the Indian Ocean.',
    readTime: '4 min read',
    content: [
      {
        type: 'heading',
        text: 'The World\'s Most Romantic Destination',
      },
      {
        type: 'paragraph',
        text: 'The Maldives is a nation of 1,200 coral islands spread across the Indian Ocean — a destination synonymous with overwater villas, infinite turquoise lagoons, and honeymooner sunsets. Each resort occupies its own private island, making every stay feel like an exclusive escape.',
      },
      {
        type: 'heading',
        text: 'What to Do in the Maldives',
      },
      {
        type: 'paragraph',
        text: 'Snorkelling with manta rays in Hanifaru Bay, night diving with bioluminescent plankton, and sunset dolphin-watching cruises are bucket-list moments that only the Maldives delivers. Above water, try seaplane transfers, underwater dining, and private sandbank picnics.',
      },
      {
        type: 'blockquote',
        text: 'The Maldives teaches you the art of stillness — the ocean does the rest.',
      },
      {
        type: 'heading',
        text: 'Which Atoll is Right for You?',
      },
      {
        type: 'paragraph',
        text: 'North Malé Atoll is accessible by speedboat and suits budget-conscious travellers. South Malé Atoll is a step up in luxury. The Baa Atoll is a UNESCO Biosphere Reserve famous for its marine life. The outer atolls — Raa, Lhaviyani — are for those seeking true seclusion.',
      },
      {
        type: 'heading',
        text: 'Travel Tip from Toe Tripper',
      },
      {
        type: 'paragraph',
        text: 'Always book the seaplane and speedboat transfers in advance — they fill up fast. We manage every detail of your Maldives itinerary to ensure a completely seamless, stress-free luxury experience from landing to departure.',
      },
    ],
  },
  {
    slug: 'rajasthan-india',
    name: 'Rajasthan',
    country: 'India',
    tagline: 'The Land of Kings',
    badge: 'Domestic',
    heroImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=900&auto=format&fit=crop&q=80',
    cardImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&auto=format&fit=crop&q=80',
    excerpt: 'Majestic forts, painted havelis, and the golden sands of the Thar desert await in India\'s most regal state.',
    readTime: '6 min read',
    content: [
      {
        type: 'heading',
        text: 'India\'s Royal Heritage in One State',
      },
      {
        type: 'paragraph',
        text: 'Rajasthan is India distilled into its most dramatic form — blazing sunsets over sand dunes, palaces that once housed maharajas, bazaars alive with colour and craft, and a hospitality rooted in centuries of Rajput tradition. Every city tells a different story.',
      },
      {
        type: 'heading',
        text: 'City by City: The Golden Triangle and Beyond',
      },
      {
        type: 'paragraph',
        text: 'Jaipur — the Pink City — dazzles with the Hawa Mahal and Amber Fort. Jodhpur\'s Blue City cascades beneath the impregnable Mehrangarh. Jaisalmer rises from the golden desert like a sandstone mirage. Udaipur, the City of Lakes, is perhaps the most romantic city in India.',
      },
      {
        type: 'blockquote',
        text: 'In Rajasthan, even the dust has memory — every grain carries a story of warriors, poets, and empires.',
      },
      {
        type: 'heading',
        text: 'Unique Experiences',
      },
      {
        type: 'paragraph',
        text: 'Spend a night under the stars in a luxury desert camp in Jaisalmer. Take a heritage train journey on the Palace on Wheels. Witness the Pushkar Camel Fair. Stay in a converted palace hotel — a haveli — and live like royalty for a night.',
      },
      {
        type: 'heading',
        text: 'Best Time to Visit',
      },
      {
        type: 'paragraph',
        text: 'October to March is ideal — temperatures are pleasant and the skies are clear. Avoid May and June when daytime temperatures can exceed 45°C. The Monsoon (July–September) brings lush greenery but limited desert access.',
      },
    ],
  },
  {
    slug: 'kerala-india',
    name: 'Kerala',
    country: 'India',
    tagline: "God's Own Country",
    badge: 'Domestic',
    heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=900&auto=format&fit=crop&q=80',
    cardImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&auto=format&fit=crop&q=80',
    excerpt: 'Backwater houseboats, Ayurvedic retreats, and emerald hill stations define Kerala\'s gentle, lush beauty.',
    readTime: '5 min read',
    content: [
      {
        type: 'heading',
        text: 'A State That Heals and Inspires',
      },
      {
        type: 'paragraph',
        text: 'Kerala moves at its own pace — unhurried, verdant, and deeply rooted in nature and culture. It is a state where the most memorable experiences are often the simplest: a sunrise over the backwaters, the scent of a spice plantation, the rhythm of a Kathakali performance.',
      },
      {
        type: 'heading',
        text: 'The Backwaters of Alleppey',
      },
      {
        type: 'paragraph',
        text: 'Alleppey — the Venice of the East — offers one of India\'s most unique travel experiences: a night aboard a converted rice-boat houseboat gliding through a network of canals, lakes, and lagoons. Wake up to misty mornings and meals cooked fresh on board.',
      },
      {
        type: 'heading',
        text: 'Munnar: The Tea Garden Escape',
      },
      {
        type: 'paragraph',
        text: 'Rolling hills carpeted in green tea bushes, cool mountain air, and the sweet aroma of Nilgiri tea — Munnar is the perfect counterpoint to the coast. Trek to Eravikulam National Park where Nilgiri tahr roam freely against a backdrop of mist.',
      },
      {
        type: 'blockquote',
        text: 'Kerala does not rush. And in its pace, you find things you forgot you were looking for.',
      },
      {
        type: 'heading',
        text: 'Ayurveda and Wellness',
      },
      {
        type: 'paragraph',
        text: 'Kerala is the birthplace of Ayurveda and home to some of India\'s finest wellness retreats. A Panchakarma detox, Abhyanga oil massage, or shirodhara treatment in an authentic Kerala setting is an experience that stays with you long after you return.',
      },
    ],
  },
  {
    slug: 'ladakh-india',
    name: 'Ladakh',
    country: 'India',
    tagline: 'Roof of the World',
    badge: 'Adventure',
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&auto=format&fit=crop&q=80',
    cardImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop&q=80',
    excerpt: 'Dramatic mountain passes, ancient monasteries, and the sapphire waters of Pangong Tso in the high Himalayas.',
    readTime: '6 min read',
    content: [
      {
        type: 'heading',
        text: 'Where the World Touches the Sky',
      },
      {
        type: 'paragraph',
        text: 'Ladakh is a land of extremes — extreme altitude, extreme silence, and an extreme beauty that defies easy description. Perched on the roof of the world, it is a place where Buddhist monasteries cling to cliffsides, rivers cut through desert moonscapes, and the night sky is unpolluted by city lights.',
      },
      {
        type: 'heading',
        text: 'The Road to Pangong Tso',
      },
      {
        type: 'paragraph',
        text: 'The drive from Leh to Pangong Lake — crossing the dramatic Chang La pass at 5,360 metres — is one of the great road journeys of India. When you first see the lake\'s electric-blue waters shimmering in the high-altitude light, time seems to stop.',
      },
      {
        type: 'heading',
        text: 'Monasteries of the Indus Valley',
      },
      {
        type: 'paragraph',
        text: 'Thiksey Monastery rises from a hilltop like a miniature Potala Palace. Hemis is Ladakh\'s largest and wealthiest gompa. Diskit in Nubra Valley houses a 32-metre Maitreya Buddha statue overlooking the valley below. Each monastery is a living institution, not a museum.',
      },
      {
        type: 'blockquote',
        text: 'Ladakh strips away the noise of modern life. What remains is something essential — and deeply beautiful.',
      },
      {
        type: 'heading',
        text: 'Adventure Activities',
      },
      {
        type: 'paragraph',
        text: 'White-water rafting on the Zanskar River, mountain biking the Manali-Leh Highway, trekking to Markha Valley, camel rides in Nubra Valley — Ladakh is one of India\'s premier adventure destinations for those who want to earn their views.',
      },
    ],
  },
  {
    slug: 'dubai-uae',
    name: 'Dubai',
    country: 'UAE',
    tagline: 'Where Vision Meets Reality',
    badge: 'International',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&auto=format&fit=crop&q=80',
    cardImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop&q=80',
    excerpt: 'Record-breaking skyscrapers, desert safaris, and world-class shopping in the UAE\'s iconic city-state.',
    readTime: '5 min read',
    content: [
      {
        type: 'heading',
        text: 'The City That Refuses Limits',
      },
      {
        type: 'paragraph',
        text: 'Dubai has spent three decades rewriting the rules of what a city can be. From the tallest tower in the world to indoor ski slopes in the desert, it is a place built on ambition — and visiting it feels like stepping into the near future while never losing sight of its deep Emirati roots.',
      },
      {
        type: 'heading',
        text: 'Iconic Experiences',
      },
      {
        type: 'paragraph',
        text: 'Visit the observation deck of the Burj Khalifa at sunset. Take an abra ride through the old Gold Souk in Deira. Watch the Dubai Fountain dance to music every evening. Spend a night on a desert safari complete with dune bashing, camel riding, and a traditional Bedouin dinner under the stars.',
      },
      {
        type: 'heading',
        text: 'Beyond the Bling: The Real Dubai',
      },
      {
        type: 'paragraph',
        text: 'The Al Fahidi Historical Neighbourhood tells the story of old Dubai through its wind-tower architecture and narrow lanes. The Spice Souk fills the air with cardamom and saffron. The local Emirati cuisine — machboos, harees, luqaimat — is a revelation for visitors who go beyond the hotel buffet.',
      },
      {
        type: 'blockquote',
        text: 'Dubai is not just a city. It is a proof of concept — a daily demonstration of what human will can build in the desert.',
      },
      {
        type: 'heading',
        text: 'Travel Essentials',
      },
      {
        type: 'paragraph',
        text: 'Indians receive a visa on arrival for Dubai, making it one of the easiest international destinations to access. The best time to visit is October to April when temperatures are pleasant. Ramadan is a beautiful cultural experience but requires respectful planning.',
      },
    ],
  },
  {
    slug: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    tagline: 'Garden City of Asia',
    badge: 'International',
    heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=900&auto=format&fit=crop&q=80',
    cardImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&auto=format&fit=crop&q=80',
    excerpt: 'A city-state of stunning contrasts — futuristic gardens, hawker culture, and seamless efficiency.',
    readTime: '4 min read',
    content: [
      {
        type: 'heading',
        text: 'Asia\'s Most Liveable City',
      },
      {
        type: 'paragraph',
        text: 'Singapore consistently ranks as one of the world\'s safest, cleanest, and most efficient cities — and it is one of the most rewarding to visit. In a city barely larger than Mumbai, you can move from rainforest canopy walks to rooftop infinity pools to colonial heritage streets within a single afternoon.',
      },
      {
        type: 'heading',
        text: 'Gardens by the Bay',
      },
      {
        type: 'paragraph',
        text: 'The iconic Supertrees of Gardens by the Bay have become Singapore\'s defining symbol. By night, the light-and-sound Garden Rhapsody show transforms them into something otherworldly. The adjacent Cloud Forest — a misty mountain ecosystem inside a glass dome — is equally unforgettable.',
      },
      {
        type: 'heading',
        text: 'The Hawker Centre Experience',
      },
      {
        type: 'paragraph',
        text: 'Singapore\'s hawker food culture is UNESCO-listed — and rightly so. Maxwell Food Centre, Lau Pa Sat, and Chinatown Complex serve dishes of extraordinary quality at astonishingly low prices. Chilli crab, Hainanese chicken rice, laksa, and char kway teow are non-negotiable first stops.',
      },
      {
        type: 'blockquote',
        text: 'Singapore shows you what a city can be when civic pride, cultural diversity, and thoughtful planning come together.',
      },
      {
        type: 'heading',
        text: 'Islands and Beaches',
      },
      {
        type: 'paragraph',
        text: 'Sentosa Island offers Universal Studios, beach clubs, and the S.E.A. Aquarium. A ferry from Changi Village takes you to the rustic Pulau Ubin — a glimpse of old Singapore with cycling trails through mangroves and kampung houses.',
      },
    ],
  },
  {
    slug: 'bhutan',
    name: 'Bhutan',
    country: 'Bhutan',
    tagline: 'The Last Shangri-La',
    badge: 'Adventure',
    heroImage: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=900&auto=format&fit=crop&q=80',
    cardImage: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600&auto=format&fit=crop&q=80',
    excerpt: 'Ancient monasteries, dramatic tiger\'s nest hikes, and a kingdom that measures success in happiness.',
    readTime: '5 min read',
    content: [
      {
        type: 'heading',
        text: 'A Kingdom That Chose Happiness Over GDP',
      },
      {
        type: 'paragraph',
        text: 'Bhutan is the only country in the world to measure national success through Gross National Happiness. This philosophy permeates every aspect of life — from its pristine forests (70% of the land is covered in trees by law) to its ancient dzong fortresses and the unhurried rhythm of daily life in Thimphu and Paro.',
      },
      {
        type: 'heading',
        text: 'The Tiger\'s Nest: Paro Taktsang',
      },
      {
        type: 'paragraph',
        text: 'Bhutan\'s most iconic image is the Paro Taktsang monastery — the Tiger\'s Nest — perched impossibly on a sheer cliff face 3,120 metres above sea level. The hike up takes 2–3 hours through pine forests scented with incense. The monastery itself, half-hidden in clouds, rewards every step.',
      },
      {
        type: 'heading',
        text: 'Festivals: Windows into Bhutanese Soul',
      },
      {
        type: 'paragraph',
        text: 'The Paro Tsechu and Thimphu Tsechu are annual Buddhist festivals of masked dances, thangka unfurlings, and centuries-old ritual performances. Attending a Tsechu in Bhutan is one of the most viscerally moving cultural experiences available to any traveller.',
      },
      {
        type: 'blockquote',
        text: 'In Bhutan, nature is not a backdrop to life — it is life itself, protected by royal decree and ancient belief alike.',
      },
      {
        type: 'heading',
        text: 'The Sustainable Tourism Model',
      },
      {
        type: 'paragraph',
        text: 'Bhutan follows a "High Value, Low Volume" tourism policy with a daily Sustainable Development Fee. This keeps crowds minimal and ensures tourism benefits local communities. Toe Tripper handles all Bhutan permits and itinerary planning to make access seamless.',
      },
    ],
  },
];

const viewportOptions = { once: true, amount: 0.1 };
const baseTransition = { duration: 0.55, ease: [0.16, 1, 0.3, 1] };

export default function TrendingDestinations() {
  return (
    <section className="section background-black" id="trending-destinations">
      <div className="padding-9rem">
        {/* Header */}
        <motion.div
          className="posts-title-flex flip-from-left-animation"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOptions}
          transition={{ ...baseTransition }}
        >
          <h3 className="text-site-white">
            Trending <span>Destinations</span>
          </h3>
          <div className="posts-text-block">
            <h5 className="text-site-white">Where to next?</h5>
            <p>Handpicked destinations — each one a story waiting to be lived.</p>
          </div>
        </motion.div>

        <div className="space-1rem" />
        <div className="horizontal-line" />
        <div className="space-4rem" />

        {/* Destination cards grid */}
        <div className="destinations-grid">
          {DESTINATIONS.map((dest, i) => (
            <motion.div
              key={dest.slug}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOptions}
              transition={{ ...baseTransition, delay: i * 0.06 }}
            >
              <Link
                href={`/destinations/${dest.slug}`}
                className="destination-card"
                id={`dest-card-${dest.slug}`}
              >
                {/* Image */}
                <div className="destination-card-img-wrap">
                  <img
                    src={dest.cardImage}
                    alt={`${dest.name}, ${dest.country}`}
                    className="destination-card-img"
                  />
                  {/* Badge overlay */}
                  <div className="destination-card-badge">
                    <h5 className="whitespace-nowrap text-site-black">{dest.badge}</h5>
                  </div>
                  {/* Plus icon */}
                  <div className="plus-wrapper">
                    <img
                      width="24"
                      height="24"
                      alt=""
                      src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e517d167d5eeb317efa720_add.svg"
                      loading="lazy"
                      className="plus"
                    />
                  </div>
                </div>

                {/* Meta row */}
                <div className="featured-details-flex">
                  <div className="destination-card-meta">
                    <span className="destination-country-tag">{dest.country}</span>
                  </div>
                </div>

                {/* Name + tagline */}
                <h4 className="text-site-white">{dest.name}</h4>
                <p className="destination-card-tagline">{dest.tagline}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="space-7rem" />
      </div>
    </section>
  );
}
