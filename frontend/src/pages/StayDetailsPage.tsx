import React from 'react';
import { ArrowLeft, Star, Heart, MapPin, CheckCircle2, ShieldCheck, Hotel, Sparkles, Phone, Mail } from 'lucide-react';
import { mockStays } from '../data/mockData';
import { useTrip } from '../context/TripContext';

interface StayDetailsPageProps {
  stayId: string;
  onNavigate: (tab: string, param?: any) => void;
  onOpenCheckoutModal: (item: any) => void;
}

export const StayDetailsPage: React.FC<StayDetailsPageProps> = ({
  stayId,
  onNavigate,
  onOpenCheckoutModal
}) => {
  const { toggleWishlist, isWishlisted } = useTrip();
  const stay = mockStays.find(s => s.id === stayId) || mockStays[0];
  const wishlisted = isWishlisted('stays', stay.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button */}
      <button
        onClick={() => onNavigate('stays')}
        className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-brand-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Stays</span>
      </button>

      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[380px] rounded-3xl overflow-hidden shadow-2xl">
        <div className="md:col-span-2 h-full">
          <img src={stay.image} alt={stay.name} className="w-full h-full object-cover" />
        </div>
        <div className="hidden md:flex flex-col gap-4 h-full">
          {stay.gallery.map((img, idx) => (
            <img key={idx} src={img} alt={`${stay.name} preview`} className="w-full h-1/2 object-cover rounded-2xl" />
          ))}
        </div>
      </div>

      {/* Main Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left 2 Cols */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700">{stay.type} in {stay.city}, {stay.country}</span>
              <button
                onClick={() => toggleWishlist('stays', stay.id)}
                className={`p-2.5 rounded-full border transition-all ${
                  wishlisted ? 'bg-coral-50 border-coral-300 text-coral-600' : 'bg-white border-slate-200 text-slate-400 hover:text-coral-500'
                }`}
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>

            <h1 className="font-display font-black text-2xl sm:text-4xl text-navy-950 mt-1">{stay.name}</h1>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{stay.address}</span>
              <span>•</span>
              <span className="text-brand-700 font-semibold">{stay.distanceToCenterKm}km from city center</span>
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-navy-900">Featured Luxury Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {stay.amenities.map((amenity, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Available Room Types */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-navy-900">Available Room Options</h3>
            <div className="space-y-4">
              {stay.roomTypes.map(room => (
                <div
                  key={room.id}
                  className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-navy-900">{room.name}</h4>
                    <p className="text-xs text-slate-500">{room.bedType} • Up to {room.capacity} Guests</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {room.amenities.map((a, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 flex-shrink-0">
                    <div>
                      <span className="text-base font-black text-brand-700">${room.pricePerNightUsd}</span>
                      <span className="text-[10px] text-slate-400"> / night</span>
                    </div>

                    <button
                      onClick={() => onOpenCheckoutModal({
                        type: 'stay',
                        id: stay.id,
                        title: `${stay.name} — ${room.name}`,
                        subtitle: `${stay.city} • ${room.bedType}`,
                        image: stay.image,
                        price: room.pricePerNightUsd,
                        startDate: '2026-10-15',
                        endDate: '2026-10-18',
                        guests: room.capacity,
                        details: {
                          roomType: room.name,
                          bedType: room.bedType
                        }
                      })}
                      className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl shadow-glow transition-all"
                    >
                      Reserve Suite
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Reservation Card */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-premium sticky top-28 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-2xl font-black text-navy-900">${stay.pricePerNightUsd}</span>
                <span className="text-xs text-slate-400"> / night</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span>{stay.rating} ({stay.reviewsCount})</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <p className="font-bold text-navy-900">Cancellation Policy</p>
                <p className="text-[11px] text-slate-500">{stay.cancellationPolicy}</p>
              </div>

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Best Rate Guaranteed</span>
                </div>
                <p className="text-[11px] text-emerald-700">Direct booking with property management token.</p>
              </div>
            </div>

            <button
              onClick={() => onOpenCheckoutModal({
                type: 'stay',
                id: stay.id,
                title: stay.name,
                subtitle: `${stay.city} • 1 Night Suite`,
                image: stay.image,
                price: stay.pricePerNightUsd,
                startDate: '2026-10-15',
                endDate: '2026-10-16'
              })}
              className="w-full py-3.5 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-glow transition-all"
            >
              Instant Checkout
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
