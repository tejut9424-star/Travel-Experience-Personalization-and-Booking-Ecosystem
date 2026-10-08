import React, { useState } from 'react';
import { 
  Utensils, 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  ShieldCheck, 
  Award, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import { mockRestaurants } from '../data/mockData';
import { RestaurantListing } from '../types';

interface RestaurantsPageProps {
  onNavigate: (tab: string, param?: any) => void;
  onOpenCheckoutModal: (item: any) => void;
}

export const RestaurantsPage: React.FC<RestaurantsPageProps> = ({ onNavigate, onOpenCheckoutModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [reservationDate, setReservationDate] = useState('2026-10-17');
  const [guestsCount, setGuestsCount] = useState(2);
  const [selectedSlotMap, setSelectedSlotMap] = useState<Record<string, string>>({});

  const filteredRestaurants = mockRestaurants.filter(r => {
    const q = searchQuery.toLowerCase();
    return r.name.toLowerCase().includes(q) || r.city.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q);
  });

  const handleBookTable = (restaurant: RestaurantListing) => {
    const chosenSlot = selectedSlotMap[restaurant.id] || restaurant.timeSlots[0];
    const depositPerPerson = 25; // standard reservation deposit credited towards bill
    const totalDeposit = depositPerPerson * guestsCount;

    onOpenCheckoutModal({
      type: 'restaurant',
      id: restaurant.id,
      title: restaurant.name,
      subtitle: `${guestsCount} Guests • ${reservationDate} at ${chosenSlot} • ${restaurant.cuisine}`,
      image: restaurant.image,
      price: totalDeposit,
      startDate: reservationDate,
      guests: guestsCount,
      details: {
        cuisine: restaurant.cuisine,
        address: restaurant.address,
        city: restaurant.city,
        timeSlot: chosenSlot,
        guestsCount: guestsCount,
        depositCredited: totalDeposit,
        michelinStars: restaurant.michelinStars,
        dressCode: restaurant.dressCode,
        signatureDishes: restaurant.signatureDishes
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Utensils className="w-4 h-4" />
            <span>Michelin-Starred & Destination Dining</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-navy-950">
            Restaurant & Culinary Reservations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Secure guaranteed table bookings at world-renowned chef's counters, cliffside bistros, and Kaiseki ryotai.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-rose-50 text-rose-800 border border-rose-200 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs">
            <Award className="w-3.5 h-3.5 text-rose-600" />
            <span>100% Guaranteed Seating • VIP Concierge</span>
          </div>
        </div>
      </div>

      {/* Reservation Finder */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-premium space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Cuisine / City / Restaurant</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="e.g. Kaiseki, Amalfi, Italian, Kyoto..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 font-medium focus:outline-none focus:border-rose-500 pl-8"
              />
              <Search className="w-3.5 h-3.5 text-rose-600 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Reservation Date</label>
            <input
              type="date"
              value={reservationDate}
              onChange={e => setReservationDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 font-medium focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Party Size</label>
            <div className="relative">
              <select
                value={guestsCount}
                onChange={e => setGuestsCount(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 font-medium focus:outline-none focus:border-rose-500 pl-8 appearance-none"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10].map(n => (
                  <option key={n} value={n}>{n} Guests</option>
                ))}
              </select>
              <Users className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {}}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Find Open Tables</span>
            </button>
          </div>
        </div>
      </div>

      {/* Restaurants List */}
      <div className="space-y-6">
        {filteredRestaurants.map(rest => {
          const chosenSlot = selectedSlotMap[rest.id] || rest.timeSlots[0];

          return (
            <div
              key={rest.id}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-premium transition-all grid grid-cols-1 lg:grid-cols-12 gap-6 p-6"
            >
              {/* Image */}
              <div className="lg:col-span-4 relative rounded-2xl overflow-hidden min-h-[250px]">
                <img
                  src={rest.image}
                  alt={rest.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                {rest.michelinStars && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <span>★ {rest.michelinStars} Michelin Stars</span>
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-navy-950 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {rest.rating} ({rest.reviewsCount})
                </div>
              </div>

              {/* Info & Slot Selector */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {rest.address}
                    </span>
                    <span className="text-xs font-black text-slate-700">{rest.priceRange} (Avg ${rest.avgPricePerPersonUsd}/person)</span>
                  </div>

                  <h3 className="font-display font-black text-2xl text-navy-950">
                    {rest.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {rest.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {rest.signatureDishes.map((dish, i) => (
                      <span key={i} className="text-[11px] bg-rose-50 text-rose-900 font-medium px-2.5 py-1 rounded-lg">
                        🍽️ {dish}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Available Time Slots */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>Select Time Slot for {reservationDate}:</span>
                    <span className="text-[11px] text-slate-400 font-normal">Dress Code: {rest.dressCode}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {rest.timeSlots.map(slot => {
                      const isSelected = chosenSlot === slot;
                      return (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlotMap(prev => ({ ...prev, [rest.id]: slot }))}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-rose-600 text-white shadow-xs scale-105'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          <Clock className="w-3 h-3 inline mr-1" />
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Footer action */}
                <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-rose-600" />
                    <span>$25/person deposit 100% credited toward your meal bill</span>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto">
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Deposit Due Now</div>
                      <div className="font-display font-black text-2xl text-navy-950">
                        ${25 * guestsCount}
                      </div>
                    </div>

                    <button
                      onClick={() => handleBookTable(rest)}
                      className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3 rounded-2xl text-xs transition-all shadow-glow flex items-center gap-2 hover:scale-102"
                    >
                      <Utensils className="w-4 h-4" />
                      <span>Reserve Table</span>
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
