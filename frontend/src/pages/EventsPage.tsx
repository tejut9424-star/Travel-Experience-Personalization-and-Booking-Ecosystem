import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Calendar, 
  MapPin, 
  Star, 
  Ticket, 
  Music, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  SlidersHorizontal,
  Clock
} from 'lucide-react';
import { mockEvents } from '../data/mockData';
import { EventListing } from '../types';

interface EventsPageProps {
  onNavigate: (tab: string, param?: any) => void;
  onOpenCheckoutModal: (item: any) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onNavigate, onOpenCheckoutModal }) => {
  const [searchCity, setSearchCity] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('All');
  const [selectedTierMap, setSelectedTierMap] = useState<Record<string, number>>({});

  const eventTypes = ['All', 'Cultural Festival', 'Concert & Live Music', 'Theatre & Performing Arts'];

  const filteredEvents = mockEvents.filter(ev => {
    const matchesCity = searchCity === '' || ev.city.toLowerCase().includes(searchCity.toLowerCase()) || ev.title.toLowerCase().includes(searchCity.toLowerCase());
    if (selectedEventType !== 'All' && ev.eventType !== selectedEventType) return false;
    return matchesCity;
  });

  const handleBookEvent = (event: EventListing) => {
    const tierIdx = selectedTierMap[event.id] ?? 0;
    const chosenTier = event.seatingTiers[tierIdx];

    onOpenCheckoutModal({
      type: 'event',
      id: event.id,
      title: event.title,
      subtitle: `${event.venue}, ${event.city} • Tier: ${chosenTier.name}`,
      image: event.image,
      price: chosenTier.priceUsd,
      startDate: event.date,
      guests: 1,
      details: {
        eventType: event.eventType,
        venue: event.venue,
        city: event.city,
        date: event.date,
        time: event.time,
        tierName: chosenTier.name,
        perks: chosenTier.perks,
        performers: event.performers
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-purple-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Ticket className="w-4 h-4" />
            <span>Exclusive Live Performances & Festivals</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-navy-950">
            Event & Festival Reservations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Reserve official front-row tickets, cultural galas, and VIP amphitheatre experiences.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-purple-50 text-purple-800 border border-purple-200 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            <span>100% Guaranteed Official Tickets</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Widget */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-premium space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Search Event Name, Artist or City</label>
            <div className="relative">
              <input
                type="text"
                value={searchCity}
                onChange={e => setSearchCity(e.target.value)}
                placeholder="e.g. Kyoto, Amalfi, Jazz, Gion Matsuri, Fire Dance..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 font-medium focus:outline-none focus:border-purple-500 pl-8"
              />
              <Search className="w-3.5 h-3.5 text-purple-600 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {}}
              className="w-full bg-purple-900 hover:bg-purple-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Lineups</span>
            </button>
          </div>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mr-1">
            <SlidersHorizontal className="w-3 h-3" /> Event Category:
          </span>
          {eventTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedEventType(type)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                selectedEventType === type
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="space-y-6">
        {filteredEvents.map(event => {
          const tierIdx = selectedTierMap[event.id] ?? 0;
          const chosenTier = event.seatingTiers[tierIdx];

          return (
            <div
              key={event.id}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-premium transition-all grid grid-cols-1 lg:grid-cols-12 gap-6 p-6"
            >
              {/* Event Image */}
              <div className="lg:col-span-4 relative rounded-2xl overflow-hidden min-h-[240px]">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-purple-950/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                  {event.eventType}
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-navy-950/80 backdrop-blur-md text-white p-3 rounded-xl flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-purple-300" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-purple-300" />
                    {event.time}
                  </span>
                </div>
              </div>

              {/* Details and Seating */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {event.venue}, {event.city}
                    </span>
                    <span className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-50 px-2.5 py-0.5 rounded-full">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {event.rating} ({event.reviewsCount})
                    </span>
                  </div>

                  <h3 className="font-display font-black text-2xl text-navy-950">
                    {event.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-400 mr-1">Starring:</span>
                    {event.performers.map((p, i) => (
                      <span key={i} className="text-[11px] bg-purple-50 text-purple-800 font-semibold px-2 py-0.5 rounded-md">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Seating Tiers */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold text-slate-700">Choose Ticket Tier:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {event.seatingTiers.map((tier, idx) => {
                      const isSelected = tierIdx === idx;
                      return (
                        <div
                          key={tier.name}
                          onClick={() => setSelectedTierMap(prev => ({ ...prev, [event.id]: idx }))}
                          className={`cursor-pointer p-3 rounded-2xl border transition-all text-left ${
                            isSelected
                              ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-500/20'
                              : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-navy-950">{tier.name}</span>
                            <span className="font-display font-black text-sm text-purple-700">${tier.priceUsd}</span>
                          </div>
                          <div className="text-[10px] text-purple-900 font-semibold mt-0.5">
                            {tier.availableTickets} tickets left
                          </div>
                          <div className="mt-1 space-y-0.5">
                            {tier.perks.slice(0, 1).map((prk, i) => (
                              <div key={i} className="text-[10px] text-slate-500 truncate">
                                • {prk}
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
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                    <span>Instant Digital Pass with Apple Wallet / Google Pay Pass</span>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto">
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ticket Price</div>
                      <div className="font-display font-black text-2xl text-navy-950">
                        ${chosenTier.priceUsd}
                      </div>
                    </div>

                    <button
                      onClick={() => handleBookEvent(event)}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-2xl text-xs transition-all shadow-glow flex items-center gap-2 hover:scale-102"
                    >
                      <Ticket className="w-4 h-4" />
                      <span>Reserve Ticket</span>
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
