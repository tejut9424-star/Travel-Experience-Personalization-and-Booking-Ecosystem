import React from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  Star, 
  Heart, 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  Utensils, 
  Lightbulb, 
  Hotel,
  ShieldCheck
} from 'lucide-react';
import { mockDestinations, mockStays, mockExperiences } from '../data/mockData';
import { useTrip } from '../context/TripContext';

interface DestinationDetailsProps {
  destinationId: string;
  onNavigate: (tab: string, param?: any) => void;
  onOpenPlannerModal: (destName?: string) => void;
}

export const DestinationDetails: React.FC<DestinationDetailsProps> = ({
  destinationId,
  onNavigate,
  onOpenPlannerModal
}) => {
  const { toggleWishlist, isWishlisted } = useTrip();

  const destination = mockDestinations.find(d => d.id === destinationId) || mockDestinations[0];
  const cityStays = mockStays.filter(s => s.destinationId === destination.id || s.city.toLowerCase() === destination.name.toLowerCase());
  const cityExperiences = mockExperiences.filter(e => e.destinationId === destination.id || e.city.toLowerCase() === destination.name.toLowerCase());
  const wishlisted = isWishlisted('destinations', destination.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Back Link */}
      <button
        onClick={() => onNavigate('destinations')}
        className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-brand-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Destinations</span>
      </button>

      {/* Hero Header Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[420px] sm:h-[480px]">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent" />

        {/* Top actions */}
        <div className="absolute top-6 right-6 flex items-center gap-2">
          <button
            onClick={() => toggleWishlist('destinations', destination.id)}
            className={`p-3 rounded-full backdrop-blur-md transition-all ${
              wishlisted ? 'bg-coral-500 text-white shadow-coral-glow' : 'bg-black/40 text-white hover:bg-white hover:text-coral-500'
            }`}
          >
            <Heart className="w-5 h-5 fill-current" />
          </button>
        </div>

        {/* Bottom Details */}
        <div className="absolute bottom-8 left-6 sm:left-10 right-6 sm:right-10 text-white space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {destination.region}
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-300 fill-current" /> {destination.rating} ({destination.reviewsCount} reviews)
            </span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white">
            {destination.name}, <span className="text-teal-300 font-medium">{destination.country}</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {destination.tagline}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenPlannerModal(destination.name)}
              className="px-6 py-3 bg-gradient-to-r from-brand-500 to-teal-400 hover:from-brand-600 hover:to-teal-500 text-navy-950 font-display font-black text-xs sm:text-sm rounded-2xl shadow-glow transition-all hover:scale-105 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Plan {destination.name} Trip with AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Best Season</span>
            <p className="text-xs font-bold text-navy-900">{destination.bestTimeToVisit}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Ideal Duration</span>
            <p className="text-xs font-bold text-navy-900">{destination.idealDurationDays} Days Recommended</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Daily Average</span>
            <p className="text-xs font-bold text-navy-900">${destination.averageDailyCostUsd} USD / day</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-coral-50 text-coral-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Safety Index</span>
            <p className="text-xs font-bold text-navy-900">Ranked 9.8 / 10</p>
          </div>
        </div>
      </div>

      {/* Main Narrative & Top Attractions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left 2 Cols: Description & Attractions */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="font-display font-black text-xl text-navy-900">About {destination.name}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{destination.description}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {destination.tags.map(tag => (
                <span key={tag} className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Top Attractions */}
          <div className="space-y-4">
            <h3 className="font-display font-black text-xl text-navy-900">Iconic Sights & Attractions</h3>
            <div className="space-y-4">
              {destination.topAttractions.map(att => (
                <div
                  key={att.id}
                  className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center gap-4"
                >
                  <img src={att.image} alt={att.name} className="w-full sm:w-36 h-28 rounded-2xl object-cover flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-navy-900">{att.name}</h4>
                      <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-lg">
                        {att.entryFeeUsd === 0 ? 'Free Entry' : `$${att.entryFeeUsd} Entry`}
                      </span>
                    </div>
                    <p className="text-[11px] text-brand-700 font-semibold">{att.category} • ~{att.estimatedTimeHours} hours</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{att.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Local Gastronomy & Dishes */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-brand-600">
              <Utensils className="w-5 h-5" />
              <h3 className="font-display font-black text-xl text-navy-900">Must-Try Culinary Specialties</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {destination.localDishes.map((dish, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <p className="font-bold text-xs text-navy-900">{dish.name}</p>
                  <p className="text-[11px] text-slate-500">{dish.description}</p>
                  <p className="text-[10px] text-brand-700 font-semibold pt-1">Best enjoyed at: {dish.mustTryLocation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Insider Tips & Stays */}
        <div className="space-y-6">
          
          {/* AI Tips Box */}
          <div className="bg-gradient-to-br from-navy-900 to-brand-950 text-white p-6 rounded-3xl space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-brand-400">
              <Lightbulb className="w-5 h-5" />
              <h4 className="font-display font-bold text-sm text-white">Tripora AI Insider Secrets</h4>
            </div>
            <ul className="space-y-3">
              {destination.travelTips.map((tip, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2.5 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Stays in this destination */}
          {cityStays.length > 0 && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-navy-900">Curated Stays in {destination.name}</h4>
                <Hotel className="w-4 h-4 text-slate-400" />
              </div>
              <div className="space-y-3">
                {cityStays.map(stay => (
                  <div
                    key={stay.id}
                    onClick={() => onNavigate('stay-details', { id: stay.id })}
                    className="p-3 rounded-2xl border border-slate-200 hover:border-brand-400 cursor-pointer transition-all flex items-center gap-3"
                  >
                    <img src={stay.image} alt={stay.name} className="w-14 h-14 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-xs text-navy-900 truncate">{stay.name}</h5>
                      <p className="text-[11px] text-slate-400 font-medium">★ {stay.rating} • {stay.type}</p>
                      <p className="text-xs font-extrabold text-brand-700 mt-0.5">${stay.pricePerNightUsd} / night</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
