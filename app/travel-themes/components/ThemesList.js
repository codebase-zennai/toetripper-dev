'use client';

import { useState } from 'react';
import CustomizeItineraryModal from '../../packages/components/CustomizeItineraryModal';

const THEMES_LIST = [
  {
    id: 1,
    title: 'Adventure & Outdoor Escapes',
    image: '/images/theme_1_adventure.png',
    activities: ['Trekking', 'Hiking', 'Cycling Tours', 'Rafting & Kayaking', 'Wildlife Safaris'],
  },
  {
    id: 2,
    title: 'Cultural Immersion Journeys',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&auto=format&fit=crop&q=80',
    activities: ['Local Village Experiences', 'Heritage Walks', 'Traditional Festivals', 'Art & Craft Workshops'],
  },
  {
    id: 3,
    title: 'Food & Culinary Trails',
    image: '/images/theme_3_food.png',
    activities: ['Food Tours', 'Cooking Classes', 'Vineyard & Winery Visits', 'Farm-to-Table Experiences', 'Street Food Explorations'],
  },
  {
    id: 4,
    title: 'Wellness & Spiritual Retreats',
    image: '/images/theme_4_wellness.png',
    activities: ['Spiritual Pilgrimages', 'Yoga & Meditation', 'Ayurveda Retreats'],
  },
  {
    id: 5,
    title: 'Luxury Experiences',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
    activities: ['Private Yacht Charters', 'Luxury Train Journeys', 'Exclusive Island Escapes', 'Glamping Experiences', 'Luxury Safari Lodges'],
  },
  {
    id: 6,
    title: 'Nature & Wildlife Experiences',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&auto=format&fit=crop&q=80',
    activities: ['National Park Expeditions', 'Bird Watching Tours', 'Marine Life Encounters', 'Northern Lights Chasing', 'Eco-Tourism Holidays'],
  },
  {
    id: 7,
    title: 'Family Discovery Holidays',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&auto=format&fit=crop&q=80',
    activities: ['Educational Tours', 'Theme Park Adventures', 'Farm Stays', 'Interactive Wildlife Experiences', 'Multi-Generational Travel'],
  },
  {
    id: 8,
    title: 'Romantic & Celebration Escapes',
    image: '/images/theme_8_romantic.png',
    activities: ['Honeymoons', 'Anniversary Getaways', 'Proposal Trips', 'Destination Weddings', 'Private Island Experiences'],
  },
  {
    id: 9,
    title: 'Photography & Special Interest Tours',
    image: '/images/theme_9_photo.png',
    activities: ['Photography Expeditions', 'Astronomy Tours', 'Train Enthusiast Journeys', 'Architecture Tours', 'Film & TV Location Tours'],
  },
  {
    id: 10,
    title: 'Slow Travel & Authentic Living',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&auto=format&fit=crop&q=80',
    activities: ['Countryside Stays', 'Homestays', 'Digital Detox Retreats', 'Long-Stay Explorations', 'Workation Experiences'],
  },
  {
    id: 11,
    title: 'MICE & Corporate Experiences',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=80',
    activities: ['Incentive Travel', 'Team Building Retreats', 'Leadership Offsites', 'Corporate Wellness Retreats', 'Executive Networking Journeys'],
  },
  {
    id: 12,
    title: 'Unique Bucket List Experiences',
    image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=600&auto=format&fit=crop&q=80',
    activities: ['Arctic & Antarctic Cruises', 'Hot Air Balloon Safaris', 'Polar Bear Expeditions', 'Volcano Adventures', 'Around-the-World Journeys'],
  },
];

export default function ThemesList() {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCustomize = (themeTitle) => {
    setSelectedTheme(themeTitle);
    setIsModalOpen(true);
  };

  return (
    <section className="section background-black py-20 px-4 sm:px-8 lg:px-20" id="themes-list">
      <div className="padding-9rem max-w-5xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Experiential <span className="text-[#bb9862]">Holiday Themes</span>
        </h3>
        
        <div className="flex flex-col gap-6">
          {THEMES_LIST.map((theme) => (
            <div 
              key={theme.id}
              className="group flex flex-col md:flex-row gap-6 bg-[#131313] border border-white/5 hover:border-[#bb9862]/40 rounded-2xl p-5 md:p-6 transition-all duration-300 items-stretch"
            >
              {/* Left Side: Theme Image */}
              <div className="w-full md:w-56 h-48 md:h-auto rounded-xl overflow-hidden shrink-0 relative">
                <img 
                  src={theme.image} 
                  alt={theme.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
              </div>

              {/* Right Side: Title, Activities and Button */}
              <div className="flex flex-col flex-1 justify-between py-1">
                <div>
                  <h4 className="text-xl md:text-2xl font-bold text-white leading-tight mb-3">
                    {theme.id}. {theme.title}
                  </h4>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {theme.activities.map((act) => (
                      <span 
                        key={act} 
                        className="px-3 py-1 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/25 rounded-full text-xs text-white/80 transition-colors duration-200"
                      >
                        {act}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 md:mt-4">
                  <button
                    onClick={() => handleCustomize(theme.title)}
                    className="inline-flex items-center justify-center border border-white/20 bg-white/5 px-6 py-3 text-xs font-semibold text-white no-underline transition-all duration-200 hover:bg-[#bb9862] hover:text-black cursor-pointer rounded-lg self-start"
                  >
                    Customize Itinerary
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CustomizeItineraryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTheme(null);
        }}
        packageTitle={selectedTheme || ''}
        packageDestination={selectedTheme || ''}
      />
    </section>
  );
}
