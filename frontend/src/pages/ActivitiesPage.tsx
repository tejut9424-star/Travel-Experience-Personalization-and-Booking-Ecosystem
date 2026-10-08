import React, { useState } from 'react';
import { Sparkles, Search, Star, Heart, Clock, Users, ShieldCheck, MapPin } from 'lucide-react';
import { mockExperiences } from '../data/mockData';
import { useTrip } from '../context/TripContext';

interface ActivitiesPageProps {
  onNavigate: (tab: string, param?: any) => void;
  onOpenCheckoutModal: (item: any) => void;
}

export const ActivitiesPage: React.FC<ActivitiesPageProps> = ({ onNavigate, onOpenCheckoutModal }) => {
  const { toggleWishlist, isWishlisted } = useTrip();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'Culinary', 'Water Sports', 'Adventure', 'Guided Tour', 'Hiking', 'Wellness'];

  const filtered = mockExperiences.filter(exp => {
    const matchSearch = exp.title.toLowerCase().includes(search.toLowerCase()) || exp.city.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCat === 'All' || exp.category === selectedCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-brand-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Signature Experiences Marketplace</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-navy-950">
            Unforgettable Tours & Local Masterclasses
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Certified local guides, private workshops, and curated outdoor adventures.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search activities or cities..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-navy-900 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                selectedCat === cat
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Experience Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(exp => {
          const wishlisted = isWishlisted('activities', exp.id);
          return (
            <div
              key={exp.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-premium card-hover-effect flex flex-col justify-between"
            >
              <div className="relative h-60">
                <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => toggleWishlist('activities', exp.id)}
                  className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all ${
                    wishlisted ? 'bg-coral-500 text-white shadow-coral-glow' : 'bg-black/30 text-white hover:bg-white hover:text-coral-500'
                  }`}
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
                <span className="absolute bottom-4 left-4 bg-navy-900/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full">
                  {exp.category}
                </span>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-brand-700 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {exp.city}, {exp.country}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-amber-500">
                      ★ {exp.rating} ({exp.reviewsCount})
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-navy-900 mt-1 leading-snug">
                    {exp.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> ~{exp.durationHours} Hours
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" /> Max {exp.groupSizeMax} People
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-base font-black text-brand-700">${exp.priceUsd}</span>
                    <span className="text-[10px] text-slate-400 font-normal"> / person</span>
                  </div>

                  <button
                    onClick={() => onOpenCheckoutModal({
                      type: 'activity',
                      id: exp.id,
                      title: exp.title,
                      subtitle: `${exp.city} • ${exp.durationHours} Hours`,
                      image: exp.image,
                      price: exp.priceUsd,
                      startDate: '2026-10-16'
                    })}
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl shadow-glow transition-all"
                  >
                    Book Experience
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
