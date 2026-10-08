import React, { useState } from 'react';
import { Search, Hotel, Star, Heart, MapPin, Check, SlidersHorizontal, ShieldCheck, ArrowRight } from 'lucide-react';
import { mockStays } from '../data/mockData';
import { useTrip } from '../context/TripContext';
import { StayListing } from '../types';

interface StaysPageProps {
  onNavigate: (tab: string, param?: any) => void;
  onOpenCheckoutModal: (item: any) => void;
}

export const StaysPage: React.FC<StaysPageProps> = ({ onNavigate, onOpenCheckoutModal }) => {
  const { toggleWishlist, isWishlisted } = useTrip();
  const [searchCity, setSearchCity] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [maxPrice, setMaxPrice] = useState(800);

  const stayTypes = ['All', 'Boutique Hotel', 'Resort', 'Villa', 'Hotel'];

  const filteredStays = mockStays.filter(s => {
    const matchCity = s.name.toLowerCase().includes(searchCity.toLowerCase()) || s.city.toLowerCase().includes(searchCity.toLowerCase()) || s.country.toLowerCase().includes(searchCity.toLowerCase());
    const matchType = selectedType === 'All' || s.type === selectedType;
    const matchPrice = s.pricePerNightUsd <= maxPrice;
    return matchCity && matchType && matchPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-brand-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Hotel className="w-4 h-4" />
            <span>Verified Accommodation Marketplace</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-navy-950">
            Curated Stays, Ryokans & Luxury Villas
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Hand-vetted properties with verified availability and guaranteed best direct rates.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchCity}
            onChange={e => setSearchCity(e.target.value)}
            placeholder="Search city, ryokan, or property..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-navy-900 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {stayTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                selectedType === type
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Stays Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStays.map(stay => {
          const wishlisted = isWishlisted('stays', stay.id);
          return (
            <div
              key={stay.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-premium card-hover-effect flex flex-col justify-between"
            >
              <div className="relative h-60 overflow-hidden cursor-pointer" onClick={() => onNavigate('stay-details', { id: stay.id })}>
                <img src={stay.image} alt={stay.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist('stays', stay.id);
                  }}
                  className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all ${
                    wishlisted ? 'bg-coral-500 text-white shadow-coral-glow' : 'bg-black/30 text-white hover:bg-white hover:text-coral-500'
                  }`}
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
                {stay.badge && (
                  <span className="absolute top-4 left-4 bg-brand-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                    {stay.badge}
                  </span>
                )}
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-brand-700">{stay.city}, {stay.country}</span>
                    <span className="flex items-center gap-1 text-xs font-bold text-amber-500">
                      ★ {stay.rating} ({stay.reviewsCount})
                    </span>
                  </div>

                  <h3
                    onClick={() => onNavigate('stay-details', { id: stay.id })}
                    className="font-display font-bold text-base text-navy-900 mt-1 cursor-pointer hover:text-brand-600 transition-colors line-clamp-1"
                  >
                    {stay.name}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {stay.amenities.slice(0, 3).map((amenity, i) => (
                      <span key={i} className="text-[10px] font-semibold bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-black text-navy-900">${stay.pricePerNightUsd}</span>
                    <span className="text-[10px] text-slate-400 font-normal"> / night</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigate('stay-details', { id: stay.id })}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onOpenCheckoutModal({
                        type: 'stay',
                        id: stay.id,
                        title: stay.name,
                        subtitle: `${stay.city}, ${stay.country} • 1 Night`,
                        image: stay.image,
                        price: stay.pricePerNightUsd,
                        startDate: '2026-10-15',
                        endDate: '2026-10-16'
                      })}
                      className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glow transition-all"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
