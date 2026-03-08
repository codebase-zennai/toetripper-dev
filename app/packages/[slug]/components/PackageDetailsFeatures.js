'use client';

import { Check, X, Calendar, MapPin, Users2 } from 'lucide-react';
import { useState } from 'react';

export default function PackageDetailsFeatures({ package: pkg }) {
  const [activeTab, setActiveTab] = useState('highlights');

  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-black/10">
          {[
            { id: 'highlights', label: 'Highlights' },
            { id: 'itinerary', label: 'Itinerary' },
            { id: 'included', label: 'What\'s Included' },
            { id: 'info', label: 'Info' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-semibold transition-all duration-200 relative ${
                activeTab === tab.id
                  ? 'text-orange-500'
                  : 'text-black/60 hover:text-black'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500"></div>
              )}
            </button>
          ))}
        </div>

        {/* Highlights Tab */}
        {activeTab === 'highlights' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-8">Package Highlights</h3>
              <div className="space-y-4">
                {pkg.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-lg hover:bg-black/5 transition">
                    <div className="mt-1 flex-shrink-0">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-orange-500 text-white">
                        <Check className="h-4 w-4" />
                      </div>
                    </div>
                    <p className="text-lg text-black/80">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg overflow-hidden h-96 md:h-auto">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Itinerary Tab */}
        {activeTab === 'itinerary' && (
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-8">Day-by-Day Itinerary</h3>
            <div className="space-y-6">
              {pkg.itinerary.map((item, idx) => (
                <div key={idx} className="border-l-4 border-orange-500 pl-6 pb-8 relative">
                  <div className="absolute -left-3.5 top-0 w-6 h-6 bg-orange-500 rounded-full border-4 border-white"></div>
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
                        Day {item.day}
                      </span>
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-black mb-2">{item.title}</h4>
                  </div>
                  
                  <p className="text-black/70 text-lg leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What's Included Tab */}
        {activeTab === 'included' && (
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Check className="w-6 h-6 text-green-500" />
                What's Included
              </h3>
              <div className="space-y-4">
                {pkg.included.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50 transition">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-black/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <X className="w-6 h-6 text-red-500" />
                What's Not Included
              </h3>
              <div className="space-y-4">
                {pkg.excluded.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-red-50 transition">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                    <p className="text-black/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Info Tab */}
        {activeTab === 'info' && (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
                <h4 className="text-lg font-bold">Best Time to Visit</h4>
              </div>
              <p className="text-black/80 text-lg">{pkg.bestTime}</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users2 className="w-6 h-6 text-purple-600" />
                <h4 className="text-lg font-bold">Group Size</h4>
              </div>
              <p className="text-black/80 text-lg">{pkg.groupSize}</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-amber-600" />
                <h4 className="text-lg font-bold">Difficulty Level</h4>
              </div>
              <p className="text-black/80 text-lg">{pkg.difficulty}</p>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 md:p-12 text-white">
          <div className="max-w-2xl mb-6">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to explore?</h3>
            <p className="text-lg text-white/90">
              Join us on this incredible journey. Our team is ready to help you customize this package to your needs.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-200">
              Book Now
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors duration-200">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
