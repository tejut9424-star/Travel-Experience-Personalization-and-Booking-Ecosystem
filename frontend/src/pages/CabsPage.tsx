import React, { useState } from 'react';
import { 
  Car, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Star, 
  Users, 
  Luggage, 
  Zap, 
  ArrowRight,
  CheckCircle2,
  Navigation,
  Sparkles
} from 'lucide-react';
import { mockCabs } from '../data/mockData';
import { CabOption } from '../types';

interface CabsPageProps {
  onNavigate: (tab: string, param?: any) => void;
  onOpenCheckoutModal: (item: any) => void;
}

export const CabsPage: React.FC<CabsPageProps> = ({ onNavigate, onOpenCheckoutModal }) => {
  const [pickupLocation, setPickupLocation] = useState('Kansai International Airport (KIX)');
  const [dropoffLocation, setDropoffLocation] = useState('Downtown Kyoto / Gion Ryokan');
  const [pickupDate, setPickupDate] = useState('2026-10-16');
  const [pickupTime, setPickupTime] = useState('11:30 AM');
  const [activeService, setActiveService] = useState<'Airport Transfer' | 'City Hourly Rental' | 'Outstation Trip' | 'Local Drop'>('Airport Transfer');

  const services = [
    { label: 'Airport Transfer', desc: 'Flight tracking & 60m free wait time' },
    { label: 'City Hourly Rental', desc: '4 to 12 hour flexible private chauffeur' },
    { label: 'Outstation Trip', desc: 'Intercity and scenic mountain journeys' },
    { label: 'Local Drop', desc: 'Quick on-demand luxury rides' }
  ];

  const filteredCabs = mockCabs.filter(cab => {
    if (cab.serviceType === activeService) return true;
    return true; // show all with current active price context
  });

  const handleBookCab = (cab: CabOption) => {
    onOpenCheckoutModal({
      type: 'cab',
      id: cab.id,
      title: `${cab.vehicleModel} (${cab.category})`,
      subtitle: `${activeService}: ${pickupLocation} → ${dropoffLocation}`,
      image: cab.image,
      price: cab.estimatedPriceUsd,
      startDate: pickupDate,
      guests: cab.passengerCapacity,
      details: {
        category: cab.category,
        serviceType: activeService,
        pickupLocation,
        dropoffLocation,
        pickupTime,
        passengerCapacity: cab.passengerCapacity,
        luggageCapacity: cab.luggageCapacity,
        driverRating: cab.driverRating,
        features: cab.features,
        freeCancellationMinutes: cab.freeCancellationMinutes
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-brand-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Car className="w-4 h-4" />
            <span>Chauffeur & On-Demand Cabs</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-navy-950">
            Airport Transfers & Local Cabs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Book professional airport meet & greet, hourly city chauffeurs, or outstation luxury taxis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Fixed Fare Guarantee • Zero Surge</span>
          </div>
        </div>
      </div>

      {/* Service Type Switcher */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {services.map(s => {
          const isActive = activeService === s.label;
          return (
            <button
              key={s.label}
              onClick={() => setActiveService(s.label as any)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isActive
                  ? 'bg-navy-950 text-white border-navy-950 shadow-md ring-2 ring-brand-500/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="font-bold text-xs sm:text-sm">{s.label}</div>
              <div className={`text-[10px] mt-1 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                {s.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* Cab Booking Form */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-premium space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Pickup Address / Airport</label>
            <div className="relative">
              <input
                type="text"
                value={pickupLocation}
                onChange={e => setPickupLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 font-medium focus:outline-none focus:border-brand-500 pl-8"
              />
              <MapPin className="w-3.5 h-3.5 text-brand-600 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Drop-off Destination</label>
            <div className="relative">
              <input
                type="text"
                value={dropoffLocation}
                onChange={e => setDropoffLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 font-medium focus:outline-none focus:border-brand-500 pl-8"
              />
              <Navigation className="w-3.5 h-3.5 text-coral-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Pickup Date</label>
            <input
              type="date"
              value={pickupDate}
              onChange={e => setPickupDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 font-medium focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Pickup Time</label>
            <input
              type="text"
              value={pickupTime}
              onChange={e => setPickupTime(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 font-medium focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>
      </div>

      {/* Available Vehicles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg text-navy-900">
            Select Vehicle Class & Chauffeur Tier
          </h2>
          <span className="text-xs text-slate-500">Includes taxes, tolls & driver gratuity</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCabs.map(cab => (
            <div
              key={cab.id}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-premium transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={cab.image}
                    alt={cab.vehicleModel}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-navy-950/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                    {cab.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-navy-950 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {cab.driverRating}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-display font-black text-xl text-navy-950">{cab.vehicleModel}</h3>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mt-1 font-medium">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        Up to {cab.passengerCapacity} Guests
                      </span>
                      <span className="flex items-center gap-1">
                        <Luggage className="w-3.5 h-3.5 text-slate-400" />
                        {cab.luggageCapacity} Luggage Bags
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {cab.features.map((f, i) => (
                      <div key={i} className="text-xs text-slate-600 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="p-6 pt-0">
                <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Estimated Total</div>
                    <div className="font-display font-black text-2xl text-navy-950">
                      ${cab.estimatedPriceUsd}
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookCab(cab)}
                    className="bg-navy-950 hover:bg-brand-600 text-white font-bold px-5 py-3 rounded-2xl text-xs transition-all shadow-md flex items-center gap-2 hover:scale-102"
                  >
                    <span>Book Transfer</span>
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
