import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  Heart, 
  Hotel, 
  Plane, 
  Clock, 
  TrendingUp, 
  Compass, 
  CheckCircle2, 
  Zap,
  Globe2,
  DollarSign,
  Train,
  Bus,
  Car,
  Ticket,
  Utensils,
  Anchor
} from 'lucide-react';
import { mockDestinations, mockStays, mockExperiences, mockTravelGuides } from '../data/mockData';
import { useTrip } from '../context/TripContext';
import { useChat } from '../context/ChatContext';
import { InteractiveMap } from '../components/map/InteractiveMap';

interface HomeProps {
  onNavigate: (tab: string, param?: any) => void;
  onOpenPlannerModal: () => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onOpenPlannerModal }) => {
  const { toggleWishlist, isWishlisted } = useTrip();
  const { openChat } = useChat();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [naturalPrompt, setNaturalPrompt] = useState('');

  const travelCategories = [
    { label: 'All', icon: Compass },
    { label: 'Culture & Zen', icon: Sparkles },
    { label: 'Cliffside & Coast', icon: Globe2 },
    { label: 'Tropical Island', icon: Heart },
    { label: 'Alpine Luxury', icon: Hotel },
    { label: 'Aurora & Nature', icon: Zap }
  ];

  const filteredDestinations = mockDestinations.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.country.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedCategory === 'All') return matchesSearch;
    if (selectedCategory === 'Culture & Zen') return matchesSearch && d.tags.includes('Culture');
    if (selectedCategory === 'Cliffside & Coast') return matchesSearch && d.tags.includes('Coastal');
    if (selectedCategory === 'Tropical Island') return matchesSearch && d.tags.includes('Beaches');
    if (selectedCategory === 'Alpine Luxury') return matchesSearch && d.tags.includes('Alpine');
    if (selectedCategory === 'Aurora & Nature') return matchesSearch && d.tags.includes('Nature');
    return matchesSearch;
  });

  const handleNaturalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (naturalPrompt.trim()) {
      openChat(`Please plan this trip for me: "${naturalPrompt}"`);
    } else {
      onOpenPlannerModal();
    }
  };

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Glow backdrop */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-brand-400/20 blur-[130px] rounded-full -z-10 pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-800 text-xs font-bold tracking-wide shadow-xs animate-in fade-in slide-in-from-top-4 duration-500">
            <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
            <span>Next-Gen AI Travel Intelligence Engine</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-navy-950 tracking-tight leading-[1.1]">
            Discover the World. <br />
            <span className="gradient-text">Let AI Plan the Journey.</span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">
            Your personal AI travel companion for discovering verified destinations, building structured daily itineraries, and booking vetted stays & experiences with zero hassle.
          </p>

          {/* Natural Language Prompt Search Bar */}
          <form onSubmit={handleNaturalSearch} className="max-w-2xl mx-auto pt-2">
            <div className="glass-panel p-2.5 rounded-3xl shadow-premium border border-brand-500/20 flex flex-col sm:flex-row items-center gap-2 transition-all focus-within:ring-4 focus-within:ring-brand-500/10 focus-within:border-brand-500">
              <div className="flex items-center gap-3 px-4 w-full flex-1">
                <Sparkles className="w-5 h-5 text-brand-600 flex-shrink-0" />
                <input
                  type="text"
                  value={naturalPrompt}
                  onChange={e => setNaturalPrompt(e.target.value)}
                  placeholder="e.g., Plan 7 days in Kyoto for 2 with temples, matcha & ryokans..."
                  className="w-full bg-transparent text-xs sm:text-sm text-navy-900 placeholder-slate-400 focus:outline-none py-2"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-glow flex items-center justify-center gap-2 transition-all hover:scale-102 flex-shrink-0"
              >
                <span>Plan with AI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-[11px] text-slate-500">
              <span className="font-semibold text-slate-400">Try asking:</span>
              {[
                '5-day honeymoon in Amalfi',
                'Zermatt ski trip for $2,000',
                'Ubud wellness & rice terrace retreat'
              ].map(ex => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => openChat(`Plan: ${ex}`)}
                  className="bg-white/80 hover:bg-brand-50 text-slate-600 hover:text-brand-700 px-2.5 py-1 rounded-full border border-slate-200/80 transition-all font-medium"
                >
                  "{ex}"
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* Hero Visual Collage & Live AI Feature Highlights */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-80 group cursor-pointer" onClick={() => onNavigate('destination-details', { id: 'dest-kyoto' })}>
            <img 
              src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80" 
              alt="Kyoto Japan" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="bg-brand-500 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                Trending Destination
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <h3 className="font-display font-black text-2xl">Kyoto, Japan</h3>
              <p className="text-xs text-slate-300 line-clamp-2">Ancient torii gates, bamboo groves, and timeless Kaiseki tea ceremonies.</p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-teal-300">Avg $145 / day</span>
                <span className="text-xs flex items-center gap-1 font-bold text-amber-300">★ 4.9 (3.8k)</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-80 group cursor-pointer" onClick={() => onNavigate('destination-details', { id: 'dest-amalfi' })}>
            <img 
              src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80" 
              alt="Amalfi Coast Italy" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="bg-coral-500 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                Romantic Choice
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <h3 className="font-display font-black text-2xl">Amalfi Coast, Italy</h3>
              <p className="text-xs text-slate-300 line-clamp-2">Pastel cliffside villas tumbling down into crystal blue Tyrrhenian waters.</p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-teal-300">Avg $220 / day</span>
                <span className="text-xs flex items-center gap-1 font-bold text-amber-300">★ 4.95 (2.9k)</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-80 group cursor-pointer" onClick={() => onNavigate('destination-details', { id: 'dest-swiss-alps' })}>
            <img 
              src="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80" 
              alt="Swiss Alps Zermatt" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="bg-purple-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                Alpine Luxury
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <h3 className="font-display font-black text-2xl">Zermatt & Alps</h3>
              <p className="text-xs text-slate-300 line-clamp-2">Pristine Matterhorn vistas, glacier express railways, and alpine chalets.</p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-teal-300">Avg $260 / day</span>
                <span className="text-xs flex items-center gap-1 font-bold text-amber-300">★ 4.96 (3.1k)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11-Category Omni-Booking Suite Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Complete Travel Booking Infrastructure</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-navy-900">
            What You Can Book with Tripora AI
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Search, compare, and instantly reserve verified travel services across 11 integrated categories.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { id: 'flights', icon: Plane, label: 'Flights', desc: 'Search, compare, and lock airline fares', badge: 'Live GDS', color: 'from-sky-500/10 to-brand-500/10 border-sky-200 text-sky-700' },
            { id: 'stays', icon: Hotel, label: 'Hotels & Stays', desc: 'Vetted ryokans, villas & luxury boutique stays', badge: 'Price Match', color: 'from-amber-500/10 to-orange-500/10 border-amber-200 text-amber-700' },
            { id: 'trains', icon: Train, label: 'Trains & Rail', desc: 'Shinkansen bullet trains & scenic alpine glacier express', badge: '80% Less CO₂', color: 'from-emerald-500/10 to-teal-500/10 border-emerald-200 text-emerald-700' },
            { id: 'buses', icon: Bus, label: 'Intercity Buses', desc: 'AC sleeper coaches & direct tourist express lines', badge: 'Best Value', color: 'from-teal-500/10 to-cyan-500/10 border-teal-200 text-teal-700' },
            { id: 'cabs', icon: Car, label: 'Cabs & Transfers', desc: 'Airport transfers, private chauffeurs & outstation taxis', badge: 'Zero Surge', color: 'from-yellow-500/10 to-amber-500/10 border-yellow-200 text-yellow-800' },
            { id: 'car-rentals', icon: Car, label: 'Car Rentals', desc: 'Rent Tesla EVs, convertibles & 4x4 alpine SUVs', badge: 'Zero Excess', color: 'from-blue-500/10 to-indigo-500/10 border-blue-200 text-blue-700' },
            { id: 'activities', icon: Sparkles, label: 'Activities & Tours', desc: 'Top attractions, adventure sports & guided tours', badge: 'Skip Line', color: 'from-violet-500/10 to-purple-500/10 border-violet-200 text-violet-700' },
            { id: 'events', icon: Ticket, label: 'Events & Tickets', desc: 'Concerts, cultural festivals & live performing arts', badge: 'VIP Access', color: 'from-purple-500/10 to-pink-500/10 border-purple-200 text-purple-700' },
            { id: 'restaurants', icon: Utensils, label: 'Restaurants & Dining', desc: 'Michelin star counters, Kaiseki & cliffside dining', badge: 'Guaranteed Table', color: 'from-rose-500/10 to-red-500/10 border-rose-200 text-rose-700' },
            { id: 'cruises', icon: Anchor, label: 'Cruises & Yachts', desc: 'Mediterranean superyachts & Norwegian fjord expeditions', badge: 'All-Inclusive', color: 'from-cyan-500/10 to-blue-500/10 border-cyan-200 text-cyan-700' },
            { id: 'activities', icon: Heart, label: 'Experiences & Retreats', desc: 'Tea ceremonies, yoga retreats & masterclasses', badge: 'Curated', color: 'from-pink-500/10 to-rose-500/10 border-pink-200 text-pink-700' },
            { id: 'planner', icon: Calendar, label: 'AI Multi-Day Plan', desc: 'Synthesize all 11 categories into one intelligent itinerary', badge: 'AI Powered', color: 'from-brand-500/15 to-teal-500/15 border-brand-300 text-brand-800 font-bold' }
          ].map(mod => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.label}
                onClick={() => onNavigate(mod.id)}
                className={`group p-5 rounded-3xl border bg-gradient-to-br ${mod.color} hover:scale-[1.03] transition-all cursor-pointer shadow-xs hover:shadow-premium flex flex-col justify-between space-y-3`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-white shadow-xs flex items-center justify-center transition-transform group-hover:scale-110">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/90 border border-slate-200/60 shadow-2xs">
                    {mod.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-black text-base text-navy-950 flex items-center gap-1">
                    <span>{mod.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                    {mod.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Global Mesh Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-600 text-xs font-bold uppercase tracking-wider">
              <Globe2 className="w-4 h-4" />
              <span>Real-Time Geospatial Explorer</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-navy-900 mt-1">
              Live Verified Destinations
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Click any region to inspect daily budgets, verified stays, and seasonal climates.
            </p>
          </div>
          <button
            onClick={() => onNavigate('destinations')}
            className="px-5 py-2.5 rounded-xl border border-slate-300 hover:border-brand-500 text-xs font-bold text-slate-700 hover:text-brand-600 transition-colors self-start sm:self-auto flex items-center gap-2"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <InteractiveMap 
          onSelectDestination={(name) => {
            const match = mockDestinations.find(d => d.name.toLowerCase().includes(name.toLowerCase()));
            if (match) onNavigate('destination-details', { id: match.id });
          }}
          height="h-[440px]"
        />
      </section>

      {/* Travel by Style / Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-display font-black text-3xl text-navy-900">Explore by Travel Vibe</h2>
          <p className="text-xs sm:text-sm text-slate-500">Curated collections tuned to your travel personality</p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {travelCategories.map(cat => {
            const Icon = cat.icon;
            const active = selectedCategory === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex-shrink-0 ${
                  active
                    ? 'bg-brand-600 text-white shadow-glow scale-105'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map(dest => {
            const wishlisted = isWishlisted('destinations', dest.id);
            return (
              <div
                key={dest.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-premium card-hover-effect group flex flex-col justify-between"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist('destinations', dest.id);
                    }}
                    className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all ${
                      wishlisted ? 'bg-coral-500 text-white shadow-coral-glow' : 'bg-black/30 text-white hover:bg-white hover:text-coral-500'
                    }`}
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-navy-950/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full">
                    {dest.region}
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
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{dest.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Daily Est.</span>
                      <span className="text-sm font-black text-brand-700">${dest.averageDailyCostUsd} / day</span>
                    </div>
                    <button
                      onClick={() => onNavigate('destination-details', { id: dest.id })}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-brand-600 text-slate-700 hover:text-white text-xs font-bold transition-all"
                    >
                      Explore & Plan
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How Tripora AI Works Section */}
      <section className="bg-navy-900 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-3xl max-w-7xl mx-auto relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-brand-500/20 blur-3xl rounded-full" />

        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="text-brand-400 text-xs uppercase font-extrabold tracking-widest">Architected for Speed & Reliability</span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white">How Tripora AI Works</h2>
          <p className="text-xs sm:text-sm text-slate-400">From raw travel ideas to verified flight reservations and dynamic daily itineraries in seconds.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center font-display font-black text-lg border border-brand-500/30">
              01
            </div>
            <h3 className="font-display font-bold text-lg text-white">Natural Language Discovery</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Describe your journey in everyday words. Tripora interprets duration, budget constraints, group dynamics, and preferred pacing.
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-display font-black text-lg border border-teal-500/30">
              02
            </div>
            <h3 className="font-display font-bold text-lg text-white">Grounded Route Synthesis</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our FastAPI AI engine sequences POIs by proximity, avoiding transit fatigue and scheduling reservations around peak hours.
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-coral-500/20 text-coral-400 flex items-center justify-center font-display font-black text-lg border border-coral-500/30">
              03
            </div>
            <h3 className="font-display font-bold text-lg text-white">Verified 1-Click Booking</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Reserve top boutique stays, flights, and private masterclasses through direct supplier integrations with live confirmation tokens.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onOpenPlannerModal}
            className="px-8 py-4 bg-gradient-to-r from-brand-500 to-teal-400 text-navy-950 font-display font-black text-sm rounded-2xl shadow-glow hover:scale-105 transition-transform"
          >
            Start Your Free AI Trip Plan
          </button>
        </div>
      </section>

      {/* Featured Stays & Experiences */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-black text-3xl text-navy-900">Curated Stays & Sanctuaries</h2>
            <p className="text-xs sm:text-sm text-slate-500">Hand-selected boutique properties and authentic ryokans</p>
          </div>
          <button
            onClick={() => onNavigate('stays')}
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>View All Stays</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockStays.map(stay => (
            <div
              key={stay.id}
              onClick={() => onNavigate('stay-details', { id: stay.id })}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm card-hover-effect cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-48">
                <img src={stay.image} alt={stay.name} className="w-full h-full object-cover" />
                {stay.badge && (
                  <span className="absolute top-3 left-3 bg-brand-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                    {stay.badge}
                  </span>
                )}
              </div>
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-navy-900">
                    <span className="truncate">{stay.city}, {stay.country}</span>
                    <span className="text-amber-500">★ {stay.rating}</span>
                  </div>
                  <h4 className="text-xs font-bold text-navy-900 line-clamp-1 mt-1">{stay.name}</h4>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-navy-900">${stay.pricePerNightUsd} <span className="text-[10px] font-normal text-slate-500">/ night</span></span>
                  <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded-lg">Reserve</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Travel Lore & Guides Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-black text-3xl text-navy-900">AI Travel Lore & Insider Guides</h2>
            <p className="text-xs sm:text-sm text-slate-500">Deep culinary secrets, timing hacks, and cultural etiquette</p>
          </div>
          <button
            onClick={() => onNavigate('guides')}
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>Read All Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockTravelGuides.map(guide => (
            <div
              key={guide.id}
              onClick={() => onNavigate('guides')}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-premium p-6 flex flex-col justify-between card-hover-effect cursor-pointer"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-brand-50 text-brand-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-brand-200">
                    {guide.destination}
                  </span>
                  <span className="text-[10px] text-slate-400">• {guide.readTimeMinutes} min read</span>
                </div>
                <h3 className="font-display font-bold text-lg text-navy-900 leading-snug">
                  {guide.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">{guide.summary}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={guide.author.avatar} alt={guide.author.name} className="w-6 h-6 rounded-full object-cover" />
                  <span className="text-xs font-medium text-slate-700">{guide.author.name}</span>
                </div>
                <span className="text-xs font-bold text-brand-600 flex items-center gap-1">
                  Read Article <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
