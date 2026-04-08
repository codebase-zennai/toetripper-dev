'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PackagesCard from './PackagesCard';
import { ChevronDown } from 'lucide-react';

const TRAVEL_TYPES = ['All', 'Domestic', 'International'];
const PRICE_RANGES = [
  { label: 'All', min: 0, max: Infinity },
  { label: 'Under ₹20,000', min: 0, max: 20000 },
  { label: '₹20,000 - ₹30,000', min: 20000, max: 30000 },
  { label: 'Above ₹30,000', min: 30000, max: Infinity }
];

const SORT_OPTIONS = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Duration: Shortest', value: 'duration-asc' },
  { label: 'Duration: Longest', value: 'duration-desc' }
];

const URL_TRAVEL_TYPE_MAP = {
  domestic: 'Domestic',
  international: 'International'
};

export default function PackagesGrid() {
  const searchParams = useSearchParams();
  const [packagesData, setPackagesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState('All');
  const [selectedTravelType, setSelectedTravelType] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(PRICE_RANGES[0]);
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch packages from Supabase API
  useEffect(() => {
    const travelTypeParam = searchParams.get('travelType')?.toLowerCase();
    const mappedTravelType = URL_TRAVEL_TYPE_MAP[travelTypeParam] || 'All';
    setSelectedTravelType(mappedTravelType);

    async function fetchPackages() {
      try {
        const res = await fetch('/api/packages?status=published');
        const data = await res.json();
        if (data.success) {
          setPackagesData(data.data.map(pkg => ({
            ...pkg,
            travelType: pkg.travelType || 'Domestic'
          })));
        }
      } catch (err) {
        console.error('Failed to fetch packages:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, [searchParams]);

  // Derive filter options from fetched data
  const DESTINATIONS = ['All', ...new Set(packagesData.map(p => p.destination).filter(Boolean))];
  const CATEGORIES = ['All', ...new Set(packagesData.map(p => p.category).filter(Boolean))];

  const filteredAndSortedPackages = useMemo(() => {
    let result = [...packagesData];

    // Apply filters
    if (selectedDestination !== 'All') {
      result = result.filter(pkg => pkg.destination === selectedDestination);
    }

    if (selectedTravelType !== 'All') {
      result = result.filter(pkg => pkg.travelType === selectedTravelType);
    }

    if (selectedCategory !== 'All') {
      result = result.filter(pkg => pkg.category === selectedCategory);
    }

    if (selectedPriceRange.label !== 'All') {
      result = result.filter(pkg => 
        pkg.cost >= selectedPriceRange.min && pkg.cost < selectedPriceRange.max
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.cost - b.cost);
        break;
      case 'price-desc':
        result.sort((a, b) => b.cost - a.cost);
        break;
      case 'duration-asc':
        result.sort((a, b) => a.duration - b.duration);
        break;
      case 'duration-desc':
        result.sort((a, b) => b.duration - a.duration);
        break;
      default:
        break;
    }

    return result;
  }, [packagesData, selectedDestination, selectedTravelType, selectedCategory, selectedPriceRange, sortBy]);

  const activeFilterCount = [
    selectedDestination !== 'All',
    selectedTravelType !== 'All',
    selectedCategory !== 'All',
    selectedPriceRange.label !== 'All'
  ].filter(Boolean).length;

  const resetFilters = () => {
    setSelectedDestination('All');
    setSelectedTravelType('All');
    setSelectedCategory('All');
    setSelectedPriceRange(PRICE_RANGES[0]);
    setSortBy('recommended');
  };

  if (loading) {
    return (
      <section className="bg-linear-to-b mb-24 md:mb-40 px-4 sm:px-8 lg:px-20" id="packages">
        <div className="padding-9rem">
          <div className="flex items-center justify-center py-20">
            <div className="text-lg text-gray-500">Loading packages...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-linear-to-b mb-24 md:mb-40 px-4 sm:px-8 lg:px-20" id="packages"> 
      <div className="padding-9rem">

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-6 p-4 sm:p-5 bg-white border border-black/8 mb-6 rounded-xl">
          <button 
            className="filter-bt flex items-center gap-2 py-2.5 px-5 bg-black border-none rounded-lg font-semibold cursor-pointer transition-colors duration-200 hover:bg-[#333]"
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            <ChevronDown className={`w-4.5 h-4.5 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          <div className="flex items-center gap-2 md:ml-auto w-full md:w-auto">
            <label htmlFor="sort-select" className="font-medium text-sm text-black/70">Sort by:</label>
            <select 
              id="sort-select"
              className="flex-1 md:flex-initial py-2 px-3 border border-black/20 rounded-md bg-white text-sm cursor-pointer transition-colors duration-200 hover:border-black/40"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm text-black/60 font-medium">
            {filteredAndSortedPackages.length} {filteredAndSortedPackages.length === 1 ? 'package' : 'packages'}
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white border border-black/8 rounded-xl p-6 mb-8 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label className="font-semibold text-sm text-black/80 uppercase tracking-wider">Destination</label>
              <div className="flex flex-wrap gap-2">
                {DESTINATIONS.map(dest => (
                  <button
                    key={dest}
                    className={`py-2 px-4 border rounded-[20px] text-sm cursor-pointer transition-all duration-200 ${
                      selectedDestination === dest 
                        ? 'bg-[#111] text-white border-black hover:bg-[#333]' 
                        : 'bg-white text-black border-black/20 hover:border-black/40 hover:bg-black/2'
                    }`}
                    onClick={() => setSelectedDestination(dest)}
                  >
                    {dest}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="font-semibold text-sm text-black/80 uppercase tracking-wider">Category</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    className={`py-2 px-4 border rounded-[20px] text-sm cursor-pointer transition-all duration-200 ${
                      selectedCategory === cat 
                        ? 'bg-[#111] text-white border-black hover:bg-[#333]' 
                        : 'bg-white text-black border-black/20 hover:border-black/40 hover:bg-black/2'
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="font-semibold text-sm text-black/80 uppercase tracking-wider">Travel Type</label>
              <div className="flex flex-wrap gap-2">
                {TRAVEL_TYPES.map(type => (
                  <button
                    key={type}
                    className={`py-2 px-4 border rounded-[20px] text-sm cursor-pointer transition-all duration-200 ${
                      selectedTravelType === type
                        ? 'bg-[#111] text-white border-black hover:bg-[#333]'
                        : 'bg-white text-black border-black/20 hover:border-black/40 hover:bg-black/2'
                    }`}
                    onClick={() => setSelectedTravelType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="font-semibold text-sm text-black/80 uppercase tracking-wider">Price Range</label>
              <div className="flex flex-wrap gap-2">
                {PRICE_RANGES.map(range => (
                  <button
                    key={range.label}
                    className={`py-2 px-4 border rounded-[20px] text-sm cursor-pointer transition-all duration-200 ${
                      selectedPriceRange.label === range.label 
                        ? 'bg-[#111] text-white border-black hover:bg-[#333]' 
                        : 'bg-white text-black border-black/20 hover:border-black/40 hover:bg-black/2'
                    }`}
                    onClick={() => setSelectedPriceRange(range)}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {activeFilterCount > 0 && (
              <button 
                className="self-start py-2.5 px-5 bg-transparent text-black border border-black/20 rounded-lg font-semibold cursor-pointer transition-all duration-200 hover:bg-black hover:text-white hover:border-black"
                onClick={resetFilters}
              >
                Reset All Filters
              </button>
            )}
          </div>
        )}

        {/* Results Grid */}
        {filteredAndSortedPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredAndSortedPackages.map((pkg) => (
              <PackagesCard
                key={pkg.id}
                title={pkg.title}
                description={pkg.description}
                imageSrc={pkg.imageSrc}
                href={pkg.href || `/packages/${pkg.slug}`}
                cost={pkg.cost}
                duration={pkg.duration}
                destination={pkg.destination}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-6 py-16 px-8 text-center">
            <p className="text-lg text-black/60">No packages found matching your criteria.</p>
            <button 
              className="py-2.5 px-5 bg-transparent text-black border border-black/20 rounded-lg font-semibold cursor-pointer transition-all duration-200 hover:bg-black hover:text-white hover:border-black"
              onClick={resetFilters}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
