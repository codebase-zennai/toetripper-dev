'use client';

import { MapPin, Calendar, IndianRupee, Users, AlertCircle } from 'lucide-react';

export default function PackageDetailsHero({ package: pkg }) {
  return (
    <section className="relative w-full bg-black text-white py-12 md:py-16 lg:py-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-white/60 flex items-center gap-2">
          <a href="/packages" className="hover:text-white transition">Packages</a>
          <span>/</span>
          <span>{pkg.category}</span>
        </div>

        {/* Title and Description */}
        <div className="max-w-2xl mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {pkg.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
            {pkg.fullDescription}
          </p>
        </div>

        {/* Key Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 md:p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-5 h-5 text-orange-400" />
              <span className="text-sm text-white/70">Destination</span>
            </div>
            <p className="text-lg md:text-xl font-semibold">{pkg.destination}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 md:p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-orange-400" />
              <span className="text-sm text-white/70">Duration</span>
            </div>
            <p className="text-lg md:text-xl font-semibold">{pkg.duration} Days</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 md:p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <IndianRupee className="w-5 h-5 text-orange-400" />
              <span className="text-sm text-white/70">Cost Per Person</span>
            </div>
            <p className="text-lg md:text-xl font-semibold">₹{pkg.cost.toLocaleString('en-IN')}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 md:p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-orange-400" />
              <span className="text-sm text-white/70">Difficulty</span>
            </div>
            <p className="text-lg md:text-xl font-semibold">{pkg.difficulty}</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 flex gap-4">
          <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200">
            Book This Package
          </button>
          <button className="px-8 py-4 border-2 border-white hover:bg-white/10 text-white font-semibold rounded-lg transition-colors duration-200">
            Request Customization
          </button>
        </div>
      </div>
    </section>
  );
}
