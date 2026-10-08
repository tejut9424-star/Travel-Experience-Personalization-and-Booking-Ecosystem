import React, { useState } from 'react';
import { 
  Bus, 
  Search, 
  Clock, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Wifi, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { mockBuses } from '../data/mockData';
import { BusOption } from '../types';

interface BusesPageProps {
  onNavigate: (tab: string, param?: any) => void;
  onOpenCheckoutModal: (item: any) => void;
}

export const BusesPage: React.FC<BusesPageProps> = ({ onNavigate, onOpenCheckoutModal }) => {
  const [originCity, setOriginCity] = useState('Rome');
  const [destinationCity, setDestinationCity] = useState('Amalfi Coast');
  const [travelDate, setTravelDate] = useState('2026-10-18');
  const [selectedBusType, setSelectedBusType] = useState('All');

  const busTypes = ['All', 'Volvo Multi-Axle AC Sleeper', 'Mercedes Executive Seater', 'Eco Electric Cruiser', 'Luxury Tourist Coach'];

  const filteredBuses = mockBuses.filter(b => {
    if (selectedBusType !== 'All' && b.busType !== selectedBusType) return false;
    return true;
  });

  const handleBookBus = (bus: BusOption) => {
    onOpenCheckoutModal({
      type: 'bus',
      id: bus.id,
      title: `${bus.operator} (${bus.busType})`,
      subtitle: `${bus.origin.city} (${bus.origin.boardingPoint}) → ${bus.destination.city} (${bus.destination.dropPoint})`,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      price: bus.priceUsd,
      startDate: travelDate,
      guests: 1,
      details: {
        operator: bus.operator,
        busType: bus.busType,
        boardingPoint: bus.origin.boardingPoint,
        dropPoint: bus.destination.dropPoint,
        departureTime: bus.origin.departureTime,
        arrivalTime: bus.destination.arrivalTime,
        duration: bus.duration,
        amenities: bus.amenities,
        cancellationPolicy: bus.cancellationPolicy
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-brand-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Bus className="w-4 h-4" />
            <span>Intercity Coach & Luxury Sleeper Buses</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-navy-950">
            Intercity Bus Booking
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Comfortable AC sleeper buses, electric coaches, and direct scenic express lines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-brand-50 text-brand-800 border border-brand-200 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
            <span>Guaranteed Boarding & Live GPS Tracking</span>
          </div>
        </div>
      </div>

      {/* Bus Search Widget */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-premium space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Boarding City</label>
            <input
              type="text"
              value={originCity}
              onChange={e => setOriginCity(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 font-medium focus:outline-none focus:border-brand-500"
              placeholder="e.g. Rome"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Destination City</label>
            <input
              type="text"
              value={destinationCity}
              onChange={e => setDestinationCity(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 font-medium focus:outline-none focus:border-brand-500"
              placeholder="e.g. Amalfi Coast"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Date of Journey</label>
            <input
              type="date"
              value={travelDate}
              onChange={e => setTravelDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 font-medium focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {}}
              className="w-full bg-navy-900 hover:bg-brand-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search Buses</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mr-1">
            <SlidersHorizontal className="w-3 h-3" /> Coach Type:
          </span>
          {busTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedBusType(type)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                selectedBusType === type
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Bus Results List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg text-navy-900">
            Available Bus Routes ({filteredBuses.length})
          </h2>
          <span className="text-xs text-slate-500">Live seat mapping available</span>
        </div>

        <div className="space-y-4">
          {filteredBuses.map(bus => (
            <div
              key={bus.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-premium transition-all space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200/60 flex items-center justify-center text-2xl">
                    {bus.operatorLogo}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-black text-lg text-navy-900">{bus.operator}</h3>
                      <span className="bg-teal-50 text-teal-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        {bus.busType}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {bus.rating}
                      </span>
                      <span>({bus.reviewsCount} verified traveler reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg text-xs font-bold">
                    {bus.seatsAvailable} Seats Left
                  </span>
                </div>
              </div>

              {/* Timing Schedule */}
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 bg-slate-50/50 p-4 rounded-2xl">
                <div>
                  <div className="font-display font-black text-2xl text-navy-950">{bus.origin.departureTime}</div>
                  <div className="text-xs font-bold text-slate-800">{bus.origin.city}</div>
                  <div className="text-[11px] text-slate-500 line-clamp-1">{bus.origin.boardingPoint}</div>
                </div>

                <div className="text-center space-y-1">
                  <div className="text-xs font-bold text-slate-600 flex items-center justify-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{bus.duration}</span>
                  </div>
                  <div className="relative flex items-center justify-center">
                    <div className="w-full h-0.5 bg-slate-300 relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-teal-600 ring-2 ring-white" />
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-400 ring-2 ring-white" />
                    </div>
                  </div>
                  <span className="text-[10px] text-teal-600 font-bold uppercase tracking-wider">AC Highway Route</span>
                </div>

                <div className="text-left md:text-right">
                  <div className="font-display font-black text-2xl text-navy-950">{bus.destination.arrivalTime}</div>
                  <div className="text-xs font-bold text-slate-800">{bus.destination.city}</div>
                  <div className="text-[11px] text-slate-500 line-clamp-1">{bus.destination.dropPoint}</div>
                </div>
              </div>

              {/* Amenities Grid */}
              <div className="flex flex-wrap gap-2">
                {bus.amenities.map((amenity, i) => (
                  <span 
                    key={i}
                    className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3 h-3 text-teal-600" />
                    {amenity}
                  </span>
                ))}
              </div>

              {/* Footer Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
                <div className="text-xs text-slate-500 font-medium">
                  {bus.cancellationPolicy}
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Seat Price</div>
                    <div className="font-display font-black text-2xl text-navy-950">
                      ${bus.priceUsd}
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookBus(bus)}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-2xl text-xs transition-all shadow-glow flex items-center gap-2 hover:scale-102"
                  >
                    <span>Select Seat</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
