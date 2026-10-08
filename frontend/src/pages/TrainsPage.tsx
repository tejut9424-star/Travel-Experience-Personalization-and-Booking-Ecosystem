import React, { useState } from 'react';
import { 
  Train, 
  Search, 
  Clock, 
  Leaf, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  Wifi, 
  Coffee, 
  ArrowRight,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { mockTrains } from '../data/mockData';
import { TrainOption } from '../types';

interface TrainsPageProps {
  onNavigate: (tab: string, param?: any) => void;
  onOpenCheckoutModal: (item: any) => void;
}

export const TrainsPage: React.FC<TrainsPageProps> = ({ onNavigate, onOpenCheckoutModal }) => {
  const [origin, setOrigin] = useState('Tokyo Station');
  const [destination, setDestination] = useState('Kyoto Station');
  const [travelDate, setTravelDate] = useState('2026-10-16');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedClassMap, setSelectedClassMap] = useState<Record<string, number>>({});

  const trainTypes = ['All', 'Bullet / High-Speed', 'Panoramic Alpine', 'Express Intercity'];

  const filteredTrains = mockTrains.filter(t => {
    if (selectedType !== 'All' && t.trainType !== selectedType) return false;
    return true;
  });

  const handleBookTrain = (train: TrainOption) => {
    const classIdx = selectedClassMap[train.id] ?? 0;
    const chosenClass = train.classes[classIdx];

    onOpenCheckoutModal({
      type: 'train',
      id: train.id,
      title: `${train.trainNumber} (${train.operator})`,
      subtitle: `${train.origin.city} (${train.origin.station}) → ${train.destination.city} (${train.destination.station}) • ${chosenClass.name}`,
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
      price: chosenClass.priceUsd,
      startDate: travelDate,
      guests: 1,
      details: {
        trainType: train.trainType,
        operator: train.operator,
        seatClass: chosenClass.name,
        departureTime: train.origin.departureTime,
        arrivalTime: train.destination.arrivalTime,
        duration: train.duration,
        amenities: chosenClass.amenities,
        carbonSavingsKg: train.carbonSavingsVsFlightKg
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-brand-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Train className="w-4 h-4" />
            <span>High-Speed Rail & Scenic Alpine Express</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-navy-950">
            Train Journey Reservations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Search bullet trains, panorama glacier routes, and intercity express rail with live seat inventory.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>Up to 80% Lower Carbon vs Flying</span>
          </div>
        </div>
      </div>

      {/* Train Search Widget */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-premium space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">From Station / City</label>
            <input
              type="text"
              value={origin}
              onChange={e => setOrigin(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 font-medium focus:outline-none focus:border-brand-500"
              placeholder="e.g. Tokyo Station"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">To Station / City</label>
            <input
              type="text"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 font-medium focus:outline-none focus:border-brand-500"
              placeholder="e.g. Kyoto Station"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Travel Date</label>
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
              <span>Search Timetable</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mr-1">
            <SlidersHorizontal className="w-3 h-3" /> Train Type:
          </span>
          {trainTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
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

      {/* Train Results List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg text-navy-900">
            Available Train Departures ({filteredTrains.length})
          </h2>
          <span className="text-xs text-slate-500">Live seat inventory updated 2s ago</span>
        </div>

        <div className="space-y-4">
          {filteredTrains.map(train => {
            const currentClassIdx = selectedClassMap[train.id] ?? 0;
            const currentClass = train.classes[currentClassIdx];

            return (
              <div 
                key={train.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-premium transition-all space-y-6"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-200/60 flex items-center justify-center text-2xl">
                      {train.operatorLogo}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-black text-lg text-navy-900">{train.trainNumber}</h3>
                        <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                          {train.trainType}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{train.operator}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto text-xs">
                    <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-emerald-600" />
                      {train.punctualityRate}% On-time
                    </span>
                    <span className="text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
                      <Leaf className="w-3.5 h-3.5 text-emerald-500" />
                      -{train.carbonSavingsVsFlightKg} kg CO₂
                    </span>
                  </div>
                </div>

                {/* Train Schedule Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 py-1 bg-slate-50/50 p-4 rounded-2xl">
                  {/* Origin */}
                  <div>
                    <div className="font-display font-black text-2xl text-navy-950">{train.origin.departureTime}</div>
                    <div className="text-xs font-bold text-slate-800">{train.origin.city}</div>
                    <div className="text-[11px] text-slate-500">{train.origin.station}</div>
                  </div>

                  {/* Middle Duration indicator */}
                  <div className="text-center space-y-1">
                    <div className="text-xs font-bold text-slate-600 flex items-center justify-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{train.duration}</span>
                    </div>
                    <div className="relative flex items-center justify-center">
                      <div className="w-full h-0.5 bg-slate-300 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-600 ring-2 ring-white" />
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-400 ring-2 ring-white" />
                      </div>
                    </div>
                    <span className="text-[10px] text-brand-600 font-bold uppercase tracking-wider">Direct Express</span>
                  </div>

                  {/* Destination */}
                  <div className="text-left md:text-right">
                    <div className="font-display font-black text-2xl text-navy-950">{train.destination.arrivalTime}</div>
                    <div className="text-xs font-bold text-slate-800">{train.destination.city}</div>
                    <div className="text-[11px] text-slate-500">{train.destination.station}</div>
                  </div>
                </div>

                {/* Travel Class Selection Tabs */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-700">Select Travel Class & Coach:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {train.classes.map((cls, idx) => {
                      const isSelected = currentClassIdx === idx;
                      return (
                        <div
                          key={cls.name}
                          onClick={() => setSelectedClassMap(prev => ({ ...prev, [train.id]: idx }))}
                          className={`cursor-pointer p-3.5 rounded-2xl border transition-all text-left ${
                            isSelected
                              ? 'bg-brand-50/70 border-brand-500 ring-2 ring-brand-500/20 shadow-xs'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-navy-950">{cls.name}</span>
                            <span className="font-display font-black text-sm text-brand-700">${cls.priceUsd}</span>
                          </div>
                          <div className="text-[11px] text-amber-700 font-semibold mt-1">
                            {cls.availableSeats} seats remaining
                          </div>
                          <div className="mt-2 space-y-1">
                            {cls.amenities.slice(0, 2).map((a, i) => (
                              <div key={i} className="text-[10px] text-slate-600 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-brand-600 flex-shrink-0" />
                                <span className="truncate">{a}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-slate-600 font-medium">
                      <ShieldCheck className="w-4 h-4 text-brand-600" />
                      Instant Ticket E-Voucher with QR
                    </span>
                    <span>•</span>
                    <span>Free seat selection</span>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto">
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Fare per traveler</div>
                      <div className="font-display font-black text-2xl text-navy-950">
                        ${currentClass.priceUsd}
                      </div>
                    </div>

                    <button
                      onClick={() => handleBookTrain(train)}
                      className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-6 py-3 rounded-2xl text-xs transition-all shadow-glow flex items-center gap-2 hover:scale-102"
                    >
                      <span>Reserve Seat</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
