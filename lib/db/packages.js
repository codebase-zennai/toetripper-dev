/**
 * Detailed package data for individual package pages
 */

export const DETAILED_PACKAGES = {
  "hill-trails": {
    id: 1,
    title: "Hill Trails Escape",
    description: "Curated mountain stays, scenic drives, and slow-travel moments built for recharge.",
    imageSrc: "/images/explore1.jpg",
    href: "/packages/hill-trails",
    destination: "Himachal Pradesh",
    cost: 25000,
    duration: 5,
    category: "Adventure",
    fullDescription: "Escape the hustle and bustle with our Hill Trails Escape package. Curated mountain stays, scenic drives, and slow-travel moments designed to help you recharge and reconnect with nature.",
    highlights: [
      "Stay in charming hill stations",
      "Scenic mountain drives",
      "Local cuisine experiences",
      "Trekking trails",
      "Photography opportunities"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Settling In",
        description: "Arrive at Shimla. Check into your mountain resort. Explore the local markets and enjoy evening tea with a view."
      },
      {
        day: 2,
        title: "Nature Walk & Local Exploration",
        description: "Morning nature walk through pine forests. Afternoon visit to local villages and interact with locals."
      },
      {
        day: 3,
        title: "Adventure Day",
        description: "Full-day trek to nearby peaks with packed breakfast. Experience panoramic mountain views."
      },
      {
        day: 4,
        title: "Leisure & Culture",
        description: "Visit heritage sites and enjoy Ayurvedic spa treatments. Evening bonfire with local stories."
      },
      {
        day: 5,
        title: "Departure",
        description: "Final breakfast with a view. Depart with memories and new friendships."
      }
    ],
    included: [
      "3-star accommodation",
      "Daily breakfast & dinner",
      "Guided trekking tours",
      "Vehicle & driver for transfers",
      "Activity passes",
      "Travel insurance"
    ],
    excluded: [
      "Flights",
      "Lunch",
      "Personal expenses",
      "Optional activities"
    ],
    bestTime: "March to May, September to November",
    difficulty: "Moderate",
    groupSize: "2-20 people",
    image: "/images/explore1.jpg"
  },
  "coastal-weekend": {
    id: 2,
    title: "Coastal Weekend",
    description: "Short, breezy getaways with boutique stays, local food, and easy transfers.",
    imageSrc: "/images/explore2.jpg",
    href: "/packages/coastal-weekend",
    destination: "Goa",
    cost: 15000,
    duration: 3,
    category: "Beach",
    fullDescription: "Perfect for a quick getaway, our Coastal Weekend package offers breezy beach vibes with boutique stays and authentic local food experiences.",
    highlights: [
      "Boutique beachfront hotels",
      "Beach exploring & water sports",
      "Fresh seafood dining",
      "Sunset viewpoints",
      "Local shack hopping"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Beach Time",
        description: "Arrive in Goa. Check into beachfront boutique hotel. Evening on the beach."
      },
      {
        day: 2,
        title: "Exploration Day",
        description: "Morning water sports. Afternoon beach exploring and local market visits. Evening sunset viewpoint."
      },
      {
        day: 3,
        title: "Leisure & Departure",
        description: "Morning beach walk. Lunch at local shack. Afternoon departure."
      }
    ],
    included: [
      "2-night boutique stay",
      "Daily breakfast",
      "Beach activities",
      "Transfers to key points",
      "Welcome drinks"
    ],
    excluded: [
      "Flights",
      "Meals (except breakfast)",
      "Water sports (optional paid)",
      "Personal activities"
    ],
    bestTime: "November to February",
    difficulty: "Easy",
    groupSize: "1-30 people",
    image: "/images/explore2.jpg"
  },
  "city-culture": {
    id: 3,
    title: "City + Culture",
    description: "Museum stops, heritage walks, and curated dining—planned end to end.",
    imageSrc: "/images/home.jpg",
    href: "/packages/city-culture",
    destination: "Rajasthan",
    cost: 30000,
    duration: 7,
    category: "Cultural",
    fullDescription: "Immerse yourself in culture with museum visits, heritage walks, and curated dining experiences crafted by local experts.",
    highlights: [
      "Museum tours with experts",
      "Heritage walking tours",
      "Palace visits",
      "Local traditional cuisine",
      "Artisan workshops"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & City Introduction",
        description: "Arrive in Jaipur. Hotel check-in. Evening city orientation walk."
      },
      {
        day: 2,
        title: "Palace & Fort Exploration",
        description: "Visit City Palace & Jantar Mantar. Lunch at traditional restaurant."
      },
      {
        day: 3,
        title: "Museum & Art Day",
        description: "Explore museums with expert guides. Visit local art galleries."
      },
      {
        day: 4,
        title: "Heritage Walks",
        description: "Old City walking tour. Visit local bazaars and traditional havelis."
      },
      {
        day: 5,
        title: "Day Trip & Artisan Workshop",
        description: "Visit Amber Fort. Afternoon pottery workshop with local artisans."
      },
      {
        day: 6,
        title: "Local Experiences",
        description: "Cooking class with local chef. Evening traditional dance performance."
      },
      {
        day: 7,
        title: "Departure",
        description: "Final breakfast and departure with newfound cultural insights."
      }
    ],
    included: [
      "6-night 4-star stay",
      "All breakfast & dinners",
      "Guided museum tours",
      "Heritage walking tours",
      "Workshops & activities",
      "All transfers"
    ],
    excluded: [
      "Flights",
      "Lunch on some days",
      "Optional evening activities"
    ],
    bestTime: "October to March",
    difficulty: "Easy",
    groupSize: "2-20 people",
    image: "/images/home.jpg"
  },
  "kerala-backwaters": {
    id: 4,
    title: "Kerala Backwaters",
    description: "Houseboat stays, village visits, and Ayurvedic wellness in serene waterways.",
    imageSrc: "/images/explore1.jpg",
    href: "/packages/kerala-backwaters",
    destination: "Kerala",
    cost: 35000,
    duration: 6,
    category: "Wellness",
    fullDescription: "Experience tranquility on Kerala's backwaters with houseboat stays, village visits, and Ayurvedic wellness treatments.",
    highlights: [
      "Houseboat cruising",
      "Ayurvedic spa treatments",
      "Village walks & farming",
      "Traditional cuisine",
      "Kamakazie fishing nets"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Hotel Check-in",
        description: "Arrive in Kochi. Check into resort. Explore Kochi Fort area."
      },
      {
        day: 2,
        title: "Backwater Cruise & Village Visit",
        description: "Entire day houseboat cruise through backwaters. Visit villages."
      },
      {
        day: 3,
        title: "Wellness & Ajurvedic Day",
        description: "Ayurvedic spa treatments. Relaxation and meditation sessions."
      },
      {
        day: 4,
        title: "Water Adventures",
        description: "Fishing net experience. Canoe rides through narrow channels."
      },
      {
        day: 5,
        title: "Leisure & Exploration",
        description: "Beach day. Visit spice gardens. Local market exploration."
      },
      {
        day: 6,
        title: "Departure",
        description: "Morning yoga session. Departure with spa products."
      }
    ],
    included: [
      "5-night resort stay",
      "Daily breakfast & dinner",
      "Full-day houseboat cruise",
      "Ayurvedic treatments",
      "All transfers",
      "Wellness sessions"
    ],
    excluded: [
      "Flights",
      "Lunch",
      "Optional shopping",
      "Additional treatments"
    ],
    bestTime: "June to September",
    difficulty: "Easy",
    groupSize: "1-30 people",
    image: "/images/explore1.jpg"
  },
  "desert-safari": {
    id: 5,
    title: "Desert Safari Adventure",
    description: "Camel rides, dune bashing, and traditional camps under starlit skies.",
    imageSrc: "/images/explore2.jpg",
    href: "/packages/desert-safari",
    destination: "Rajasthan",
    cost: 22000,
    duration: 4,
    category: "Adventure",
    fullDescription: "Experience the magic of the desert with camel rides, dune bashing, and nights in traditional camps under starlit skies.",
    highlights: [
      "Camel safaris",
      "Dune bashing",
      "Traditional camp stay",
      "Authentic desert cuisine",
      "Stargazing nights"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Preparation",
        description: "Arrive in Jaisalmer. Check into hotel. Evening market exploration."
      },
      {
        day: 2,
        title: "Desert Adventure Begins",
        description: "Morning camel safari. Afternoon dune bashing. Night in desert camp."
      },
      {
        day: 3,
        title: "Desert Immersion",
        description: "Sunrise over dunes. Full day exploration. Cultural show & bonfire."
      },
      {
        day: 4,
        title: "Departure",
        description: "Early breakfast. Visit ancient forts and temples. Evening departure."
      }
    ],
    included: [
      "3-night accommodation",
      "Desert camp experience",
      "All meals during desert days",
      "Camel safari",
      "Dune bashing tour",
      "Cultural program",
      "All transfers"
    ],
    excluded: [
      "Flights",
      "Additional activities",
      "Personal shopping"
    ],
    bestTime: "October to February",
    difficulty: "Moderate",
    groupSize: "2-30 people",
    image: "/images/explore2.jpg"
  },
  "northeast-explorer": {
    id: 6,
    title: "Northeast Explorer",
    description: "Misty hills, monasteries, and local cuisines across Meghalaya and Sikkim.",
    imageSrc: "/images/home.jpg",
    href: "/packages/northeast-explorer",
    destination: "Northeast India",
    cost: 40000,
    duration: 8,
    category: "Cultural",
    fullDescription: "Explore the misty hills and ancient monasteries of Northeast India with authentic local cuisine experiences.",
    highlights: [
      "Living root bridges",
      "Buddhist monasteries",
      "Mountain villages",
      "Local tribal culture",
      "Scenic landscapes"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Meghalaya",
        description: "Arrive in Shillong. Check into hotel. Explore local market."
      },
      {
        day: 2,
        title: "Living Bridges & Waterfalls",
        description: "Visit Khasi village and living root bridges. Explore waterfalls."
      },
      {
        day: 3,
        title: "Sikkim Trek Begins",
        description: "Travel to Sikkim. Trek through alpine forests."
      },
      {
        day: 4,
        title: "Monastery & Mountain Views",
        description: "Visit Kanyeyam Monastery. Trek to viewpoints."
      },
      {
        day: 5,
        title: "Cultural Immersion",
        description: "Village walks. Interaction with local Lepcha community."
      },
      {
        day: 6,
        title: "Adventure & Nature",
        description: "Trekking and nature photography opportunities."
      },
      {
        day: 7,
        title: "Leisure Day",
        description: "Rest day with spa treatments and local experiences."
      },
      {
        day: 8,
        title: "Departure",
        description: "Breakfast and departure with local souvenirs."
      }
    ],
    included: [
      "7-night accommodation",
      "All breakfast & dinners",
      "Guided tours & treks",
      "Village visits",
      "All transfers",
      "Travel insurance"
    ],
    excluded: [
      "Flights",
      "Lunch",
      "Optional activities",
      "High altitude insurance"
    ],
    bestTime: "April to October",
    difficulty: "Moderate to Hard",
    groupSize: "4-15 people",
    image: "/images/home.jpg"
  },
  "mumbai-goa-roadtrip": {
    id: 7,
    title: "Mumbai to Goa Road Trip",
    description: "Coastal drives, beach hopping, and seafood trails along the Konkan coast.",
    imageSrc: "/images/explore1.jpg",
    href: "/packages/mumbai-goa-roadtrip",
    destination: "Goa",
    cost: 18000,
    duration: 5,
    category: "Beach",
    fullDescription: "An exciting road trip along the Konkan coast with beach hopping, coastal drives, and authentic seafood experiences.",
    highlights: [
      "Scenic coastal highways",
      "Beach hopping",
      "Seafood trail",
      "Coastal villages",
      "Photography spots"
    ],
    itinerary: [
      {
        day: 1,
        title: "Mumbai Departure",
        description: "Meet in Mumbai. Begin coastal drive. First beach stop."
      },
      {
        day: 2,
        title: "Konkan Exploration",
        description: "Drive through scenic Konkan coast. Multiple beach stops."
      },
      {
        day: 3,
        title: "Coastal Stays & Beach Time",
        description: "Reach Goa. Beach exploration and water activities."
      },
      {
        day: 4,
        title: "Goa Beach Life",
        description: "Beach hopping. Seafood trail experience."
      },
      {
        day: 5,
        title: "Return to Mumbai",
        description: "Leisurely drive back with stops at scenic viewpoints."
      }
    ],
    included: [
      "4-night accommodation",
      "Breakfast & dinner",
      "Vehicle & experienced driver",
      "Beach activity passes",
      "Seafood trail",
      "Photography guide"
    ],
    excluded: [
      "Flights",
      "Lunch",
      "Water sports (some)",
      "Shopping"
    ],
    bestTime: "November to March",
    difficulty: "Easy",
    groupSize: "2-10 people",
    image: "/images/explore1.jpg"
  },
  "himalayan-trek": {
    id: 8,
    title: "Himalayan Trekking",
    description: "High-altitude trails, mountain villages, and spectacular valley views.",
    imageSrc: "/images/explore2.jpg",
    href: "/packages/himalayan-trek",
    destination: "Himachal Pradesh",
    cost: 28000,
    duration: 6,
    category: "Adventure",
    fullDescription: "Challenge yourself with high-altitude trekking through Himalayan trails, mountain villages, and panoramic valley views.",
    highlights: [
      "High-altitude trails",
      "Mountain village stays",
      "Alpine meadows",
      "Panoramic photography",
      "Local porter experience"
    ],
    itinerary: [
      {
        day: 1,
        title: "Acclimatization & Preparation",
        description: "Arrive at base camp. Meet your trekking team. Equipment check."
      },
      {
        day: 2,
        title: "Trek Begins",
        description: "Start trek to first basecamp. Enjoy mountain views."
      },
      {
        day: 3,
        title: "High Altitude Trek",
        description: "Continue trek with acclimatization walks."
      },
      {
        day: 4,
        title: "Summit Day",
        description: "Early morning summit attempt. Breakfast at altitude."
      },
      {
        day: 5,
        title: "Descent & Relaxation",
        description: "Descend to basecamp. Rest and recovery."
      },
      {
        day: 6,
        title: "Return & Celebration",
        description: "Return to civilization. Celebration dinner."
      }
    ],
    included: [
      "5-night accommodation",
      "All meals as per trek",
      "Expert trek guide",
      "Porters",
      "Equipment (sleeping bag, etc)",
      "First aid & medical support"
    ],
    excluded: [
      "Flights",
      "Personal gear",
      "High altitude medication",
      "Tips for guides"
    ],
    bestTime: "May to October",
    difficulty: "Hard",
    groupSize: "2-12 people",
    image: "/images/explore2.jpg"
  },
  "spiritual-varanasi": {
    id: 9,
    title: "Spiritual Varanasi",
    description: "Ghat walks, temple visits, and ancient rituals along the holy Ganges.",
    imageSrc: "/images/home.jpg",
    href: "/packages/spiritual-varanasi",
    destination: "Uttar Pradesh",
    cost: 12000,
    duration: 3,
    category: "Cultural",
    fullDescription: "Experience the spiritual essence of Varanasi with ghat walks, ancient temple visits, and sacred Ganges rituals.",
    highlights: [
      "Sunrise on the Ganges",
      "Ghat walks",
      "Temple ceremonies",
      "Yoga sessions",
      "Meditation experiences"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Spiritual Introduction",
        description: "Arrive in Varanasi. Check into ghat-side hotel. Evening ghat walk."
      },
      {
        day: 2,
        title: "Spiritual Immersion",
        description: "Sunrise boat ride on Ganges. Temple visits. Yoga session. Evening Aarti ceremony."
      },
      {
        day: 3,
        title: "Meditation & Departure",
        description: "Morning meditation. Final ghat visit. Departure with spiritual souvenirs."
      }
    ],
    included: [
      "2-night ghat-side stay",
      "Breakfast & dinner",
      "Guided ghat walks",
      "Boat rides",
      "Temple tour",
      "Yoga & meditation classes",
      "Aarti ceremony access"
    ],
    excluded: [
      "Flights",
      "Lunch",
      "Shopping",
      "Optional pilgrimages"
    ],
    bestTime: "October to March",
    difficulty: "Easy",
    groupSize: "1-30 people",
    image: "/images/home.jpg"
  }
};

export function getPackageBySlug(slug) {
  return DETAILED_PACKAGES[slug] || null;
}

export function getAllPackageSlugs() {
  return Object.keys(DETAILED_PACKAGES);
}
