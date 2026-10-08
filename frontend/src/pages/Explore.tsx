import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Heart, Compass, SlidersHorizontal, ArrowUpDown, Sparkles } from 'lucide-react';
import { mockDestinations } from '../data/mockData';
import { useTrip } from '../context/TripContext';
import { InteractiveMap } from '../components/map/InteractiveMap';

interface ExploreProps {
  onNavigate: (tab: string, param?: any) => void;
  onOpenPlannerModal: () => void;
}

export const Explore: React.FC<ExploreProps> = ({ onNavigate, onOpenPlannerModal }) => {
  const { toggleWishlist, isWishlisted } = useTrip();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [maxBudget, setMaxBudget] = useState(300);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [sortBy, setSortBy] = useState<'rating' | 'cost-asc' | 'cost-desc'>('rating');

  const regions = ['All', 'East Asia', 'Southern Europe', 'Southeast Asia', 'Northern Europe', 'Central Europe'];
  const tags = ['All', 'Culture', 'Temples', 'Culinary', 'Coastal', 'Luxury', 'Romance', 'Beaches', 'Wellness', 'Nature', 'Aurora', 'Mountains'];

  const filtered = mockDestinations
    .filter(dest => {
      const matchQuery = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || dest.country.toLowerCase().includes(searchQuery.toLowerCase());
      const matchRegion = selectedRegion === 'All' || dest.region === selectedRegion;
      const matchTag = selectedTag === 'All' || dest.tags.includes(selectedTag);
      const matchBudget = dest.averageDailyCostUsd <= maxBudget;
      return matchQuery && matchRegion && matchTag && matchBudget;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'cost-asc') return a.averageDailyCostUsd - b.averageDailyCostUsd;
      if (sortBy === 'cost-desc') return b.averageDailyCostUsd - a.averageDailyCostUsd;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-brand-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Global Destinations Catalog</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-navy-950">
            Explore Curated Destinations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Filter through validated travel data, climate trends, and daily cost indicators.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'map' : 'grid')}
            className="px-4 py-2 bg-white border border-slate-200 hover:border-brand-400 text-xs font-bold rounded-xl text-slate-700 transition-all flex items-center gap-2 shadow-xs"
          >
            <span>{viewMode === 'grid' ? 'Show Map View' : 'Show Grid View'}</span>
          </button>
          <button
            onClick={onOpenPlannerModal}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl shadow-glow transition-all flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Plan with AI</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by city, country or attraction..."
              className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-navy-900 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedRegion}
              onChange={e => setSelectedRegion(e.target.value)}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl px-3 py-2.5 text-xs text-navy-900 font-medium focus:outline-none focus:border-brand-500"
            >
              {regions.map(r => (
                <option key={r} value={r}>Region: {r}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl px-3 py-2.5 text-xs text-navy-900 font-medium focus:outline-none focus:border-brand-500"
            >
              <option value="rating">Sort: Top Rated</option>
              <option value="cost-asc">Sort: Budget (Low to High)</option>
              <option value="cost-desc">Sort: Budget (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Tag pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 mr-2 flex-shrink-0">Tags:</span>
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex-shrink-0 ${
                selectedTag === tag
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'map' ? (
        <div className="space-y-4">
          <InteractiveMap 
            onSelectDestination={(name) => {
              const match = mockDestinations.find(d => d.name.toLowerCase().includes(name.toLowerCase()));
              if (match) onNavigate('destination-details', { id: match.id });
            }}
            height="h-[550px]"
          />
        </div>
      ) : (
        <div>
          {filtered.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
              <Compass className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-bold text-base text-navy-900">No matching destinations found</h3>
              <p className="text-xs text-slate-500">Try broadening your search criteria or resetting filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedRegion('All');
                  setSelectedTag('All');
                }}
                className="px-4 py-2 bg-brand-50 text-brand-700 text-xs font-bold rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(dest => {
                const wishlisted = isWishlisted('destinations', dest.id);
                return (
                  <div
                    key={dest.id}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm card-hover-effect flex flex-col justify-between"
                  >
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <button
                        onClick={() => toggleWishlist('destinations', dest.id)}
                        className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all ${
                          wishlisted ? 'bg-coral-500 text-white shadow-coral-glow' : 'bg-black/30 text-white hover:bg-white hover:text-coral-500'
                        }`}
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                      <div className="absolute top-4 left-4 bg-navy-900/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full">
                        {dest.bestTimeToVisit}
                      </div>
                    </div>

                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-display font-black text-xl text-navy-900">{dest.name}</h3>
                          <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>{dest.rating}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-brand-700 font-semibold">{dest.country} • {dest.region}</p>
                        <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">{dest.description}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold uppercase">Daily Avg</span>
                          <span className="text-sm font-black text-brand-700">${dest.averageDailyCostUsd} / day</span>
                        </div>
                        <button
                          onClick={() => onNavigate('destination-details', { id: dest.id })}
                          className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-brand-600 text-white text-xs font-bold transition-all"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
