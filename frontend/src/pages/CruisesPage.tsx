import React, { useState } from 'react';
import { 
  Ship, 
  Search, 
  Calendar, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Anchor,
  Compass,
  Wine,
  SlidersHorizontal
} from 'lucide-react';
import { mockCruises } from '../data/mockData';
import { CruiseListing } from '../types';

interface CruisesPageProps {
  onNavigate: (tab: string, param?: any) => void;
  onOpenCheckoutModal: (item: any) => void;
}

export const CruisesPage: React.FC<CruisesPageProps> = ({ onNavigate, onOpenCheckoutModal }) => {
  const [searchDestination, setSearchDestination] = useState('');
  const [selectedCabinMap, setSelectedCabinMap] = useState<Record<string, number>>({});
  const [selectedDateMap, setSelectedDateMap] = useState<Record<string, string>>({});

  const filteredCruises = mockCruises.filter(c => {
    const q = searchDestination.toLowerCase();
    return c.title.toLowerCase().includes(q) || c.departurePort.toLowerCase().includes(q) || c.portsOfCall.some(p => p.toLowerCase().includes(q));
  });

  const handleBookCruise = (cruise: CruiseListing) => {
    const cabinIdx = selectedCabinMap[cruise.id] ?? 0;
    const chosenCabin = cruise.cabinTypes[cabinIdx];
    const departureDate = selectedDateMap[cruise.id] || cruise.departureDates[0];

    onOpenCheckoutModal({
      type: 'cruise',
      id: cruise.id,
      title: cruise.title,
      subtitle: `${cruise.durationNights} Nights • ${cruise.shipName} • Cabin: ${chosenCabin.name}`,
      image: cruise.image,
      price: chosenCabin.priceUsd,
      startDate: departureDate,
      guests: chosenCabin.capacity,
      details: {
        cruiseLine: cruise.cruiseLine,
        shipName: cruise.shipName,
        departurePort: cruise.departurePort,
        portsOfCall: cruise.portsOfCall,
        departureDate: departureDate,
        cabinName: chosenCabin.name,
        amenities: chosenCabin.amenities,
        highlights: cruise.highlights
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Anchor className="w-4 h-4" />
            <span>Luxury Superyachts & Ocean Expeditions</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-navy-950">
            Cruise & Yacht Voyages
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Explore the Mediterranean, Amalfi, Norwegian Fjords, and Caribbean with all-inclusive luxury staterooms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-cyan-50 text-cyan-900 border border-cyan-200 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs">
            <Wine className="w-3.5 h-3.5 text-cyan-600" />
            <span>All-Inclusive Gourmet Dining & Shore Tenders</span>
          </div>
        </div>
      </div>

      {/* Search Widget */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-premium space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Destination, Sailing Port or Ship</label>
            <div className="relative">
              <input
                type="text"
                value={searchDestination}
                onChange={e => setSearchDestination(e.target.value)}
                placeholder="e.g. Mediterranean, Amalfi, Norway, Fjords, Evrima..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 font-medium focus:outline-none focus:border-cyan-500 pl-8"
              />
              <Search className="w-3.5 h-3.5 text-cyan-600 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {}}
              className="w-full bg-cyan-900 hover:bg-cyan-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Search Sailings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cruise Voyages List */}
      <div className="space-y-6">
        {filteredCruises.map(cruise => {
          const cabinIdx = selectedCabinMap[cruise.id] ?? 0;
          const chosenCabin = cruise.cabinTypes[cabinIdx];
          const selectedDate = selectedDateMap[cruise.id] || cruise.departureDates[0];

          return (
            <div
              key={cruise.id}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-premium transition-all grid grid-cols-1 lg:grid-cols-12 gap-6 p-6"
            >
              {/* Cruise Image */}
              <div className="lg:col-span-4 relative rounded-2xl overflow-hidden min-h-[260px]">
                <img
                  src={cruise.image}
                  alt={cruise.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-cyan-950/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                  {cruise.durationNights} Nights Voyage
                </div>
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-navy-950 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {cruise.rating} ({cruise.reviewsCount})
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-navy-950/80 backdrop-blur-md text-white p-2.5 rounded-xl text-center text-xs font-bold">
                  {cruise.shipName} • {cruise.cruiseLine}
                </div>
              </div>

              {/* Itinerary & Stateroom Selection */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-bold text-cyan-700 flex items-center gap-1.5">
                    <Anchor className="w-3.5 h-3.5" />
                    <span>Departure: {cruise.departurePort}</span>
                  </div>

                  <h3 className="font-display font-black text-2xl text-navy-950">
                    {cruise.title}
                  </h3>

                  {/* Ports of Call Chips */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[11px] font-bold text-slate-500">Ports of Call & Itinerary:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {cruise.portsOfCall.map((port, i) => (
                        <span key={i} className="text-[11px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-cyan-600" />
                          {port}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Departure Dates */}
                  <div className="pt-2 flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700">Sailing Date:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {cruise.departureDates.map(dateStr => {
                        const isDateActive = selectedDate === dateStr;
                        return (
                          <button
                            key={dateStr}
                            onClick={() => setSelectedDateMap(prev => ({ ...prev, [cruise.id]: dateStr }))}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                              isDateActive
                                ? 'bg-cyan-700 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {dateStr}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Cabin Selection */}
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-bold text-slate-700">Select Stateroom / Cabin Category:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {cruise.cabinTypes.map((cab, idx) => {
                      const isSelected = cabinIdx === idx;
                      return (
                        <div
                          key={cab.name}
                          onClick={() => setSelectedCabinMap(prev => ({ ...prev, [cruise.id]: idx }))}
                          className={`cursor-pointer p-3 rounded-2xl border transition-all text-left ${
                            isSelected
                              ? 'bg-cyan-50 border-cyan-600 ring-2 ring-cyan-600/20 shadow-xs'
                              : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-navy-950 truncate">{cab.name}</span>
                            <span className="font-display font-black text-sm text-cyan-800">${cab.priceUsd}</span>
                          </div>
                          <div className="text-[10px] text-cyan-950 font-semibold mt-0.5">
                            {cab.availableCabins} cabins left
                          </div>
                          <div className="mt-1 space-y-0.5">
                            {cab.amenities.slice(0, 1).map((a, i) => (
                              <div key={i} className="text-[10px] text-slate-500 truncate">
                                • {a}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-600" />
                    <span>Includes all port taxes, gratuities & high-speed satellite Wi-Fi</span>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto">
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Per Stateroom</div>
                      <div className="font-display font-black text-2xl text-navy-950">
                        ${chosenCabin.priceUsd}
                      </div>
                    </div>

                    <button
                      onClick={() => handleBookCruise(cruise)}
                      className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold px-6 py-3 rounded-2xl text-xs transition-all shadow-glow flex items-center gap-2 hover:scale-102"
                    >
                      <Anchor className="w-4 h-4" />
                      <span>Book Voyage</span>
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
