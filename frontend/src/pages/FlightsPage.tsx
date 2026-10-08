import React, { useState } from 'react';
import { Plane, Search, Calendar, Users, ArrowRight, ShieldCheck, Clock, Luggage, Leaf } from 'lucide-react';
import { mockFlights } from '../data/mockData';
import { FlightOption } from '../types';

interface FlightsPageProps {
  onNavigate: (tab: string, param?: any) => void;
  onOpenCheckoutModal: (item: any) => void;
}

export const FlightsPage: React.FC<FlightsPageProps> = ({ onNavigate, onOpenCheckoutModal }) => {
  const [origin, setOrigin] = useState('San Francisco (SFO)');
  const [destination, setDestination] = useState('Kyoto / Osaka (KIX)');
  const [cabinClass, setCabinClass] = useState<'Economy' | 'Business'>('Economy');
  const [tripType, setTripType] = useState<'round' | 'oneway'>('round');

  const filteredFlights = mockFlights.filter(f => {
    if (cabinClass === 'Business') return f.cabinClass === 'Business';
    return f.cabinClass === 'Economy';
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-brand-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Plane className="w-4 h-4" />
            <span>Multi-Carrier Global Flight Search</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-navy-950">
            Intelligent Flight Comparison
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time airline routes, carbon emission metrics, and guaranteed fare lock.
          </p>
        </div>
      </div>

      {/* Flight Search Widget */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-premium space-y-4">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold">
            <button
              onClick={() => setTripType('round')}
              className={`px-3 py-1 rounded-lg transition-colors ${tripType === 'round' ? 'bg-brand-50 text-brand-700' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Roundtrip
            </button>
            <button
              onClick={() => setTripType('oneway')}
              className={`px-3 py-1 rounded-lg transition-colors ${tripType === 'oneway' ? 'bg-brand-50 text-brand-700' : 'text-slate-500 hover:text-slate-800'}`}
            >
              One-way
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold ml-auto">
            {(['Economy', 'Business'] as const).map(cls => (
              <button
                key={cls}
                onClick={() => setCabinClass(cls)}
                className={`px-3 py-1 rounded-lg transition-colors ${cabinClass === cls ? 'bg-navy-900 text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">From</label>
            <input
              type="text"
              value={origin}
              onChange={e => setOrigin(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 font-medium focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">To</label>
            <input
              type="text"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 font-medium focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Departure Date</label>
            <input
              type="date"
              defaultValue="2026-10-15"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 font-medium focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Return Date</label>
            <input
              type="date"
              defaultValue="2026-10-22"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 font-medium focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>
      </div>

      {/* Flight Results */}
      <div className="space-y-4">
        <h3 className="font-bold text-sm text-navy-900">Available Validated Flights</h3>

        <div className="space-y-4">
          {filteredFlights.map(flight => (
            <div
              key={flight.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm card-hover-effect flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              {/* Airline & Route */}
              <div className="flex items-center gap-4">
                <img src={flight.airlineLogo} alt={flight.airline} className="w-12 h-12 rounded-2xl object-cover border border-slate-200" />
                <div>
                  <h4 className="font-bold text-sm text-navy-900">{flight.airline}</h4>
                  <p className="text-[11px] text-slate-400 font-mono">{flight.flightNumber} • {flight.cabinClass}</p>
                </div>
              </div>

              {/* Timing & Leg Schedule */}
              <div className="flex items-center gap-6 sm:gap-10">
                <div className="text-center">
                  <span className="font-black text-base text-navy-900 block">{flight.origin.departureTime}</span>
                  <span className="text-[10px] font-bold text-slate-400 font-mono">{flight.origin.code}</span>
                  <span className="text-[10px] text-slate-500 block truncate max-w-[80px]">{flight.origin.city}</span>
                </div>

                <div className="flex-1 flex flex-col items-center min-w-[120px]">
                  <span className="text-[10px] font-bold text-brand-700 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {flight.duration}
                  </span>
                  <div className="w-full flex items-center my-1">
                    <div className="h-0.5 bg-slate-300 flex-1" />
                    <Plane className="w-3.5 h-3.5 text-brand-600 mx-1 transform rotate-90" />
                    <div className="h-0.5 bg-slate-300 flex-1" />
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {flight.stops === 0 ? 'Nonstop Direct' : `${flight.stops} Stop (${flight.stopDetails})`}
                  </span>
                </div>

                <div className="text-center">
                  <span className="font-black text-base text-navy-900 block">{flight.destination.arrivalTime}</span>
                  <span className="text-[10px] font-bold text-slate-400 font-mono">{flight.destination.code}</span>
                  <span className="text-[10px] text-slate-500 block truncate max-w-[80px]">{flight.destination.city}</span>
                </div>
              </div>

              {/* Perks & Carbon */}
              <div className="hidden sm:flex flex-col gap-1 text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Luggage className="w-3.5 h-3.5 text-slate-400" /> {flight.baggageAllowance}
                </span>
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <Leaf className="w-3.5 h-3.5 text-emerald-500" /> {flight.carbonEmissionsKg}kg CO2e
                </span>
              </div>

              {/* Price & CTA */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 flex-shrink-0">
                <div className="text-right">
                  <span className="text-xl font-black text-navy-900">${flight.priceUsd}</span>
                  <span className="text-[10px] text-slate-400 block">incl. taxes & fees</span>
                </div>

                <button
                  onClick={() => onOpenCheckoutModal({
                    type: 'flight',
                    id: flight.id,
                    title: `${flight.airline} (${flight.flightNumber})`,
                    subtitle: `${flight.origin.code} to ${flight.destination.code} • ${flight.cabinClass}`,
                    image: flight.airlineLogo,
                    price: flight.priceUsd,
                    startDate: '2026-10-15',
                    endDate: '2026-10-22',
                    guests: 2,
                    details: {
                      airline: flight.airline,
                      flightNumber: flight.flightNumber,
                      cabin: flight.cabinClass,
                      duration: flight.duration
                    }
                  })}
                  className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl shadow-glow transition-all"
                >
                  Select Flight
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
