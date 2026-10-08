import React, { useState } from 'react';
import { 
  Car, 
  Search, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Fuel, 
  Users, 
  Star, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react';
import { mockCarRentals } from '../data/mockData';
import { CarRentalOption } from '../types';

interface CarRentalsPageProps {
  onNavigate: (tab: string, param?: any) => void;
  onOpenCheckoutModal: (item: any) => void;
}

export const CarRentalsPage: React.FC<CarRentalsPageProps> = ({ onNavigate, onOpenCheckoutModal }) => {
  const [pickupLocation, setPickupLocation] = useState('Kyoto Station');
  const [pickupDate, setPickupDate] = useState('2026-10-16');
  const [returnDate, setReturnDate] = useState('2026-10-21');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Electric & Hybrid', 'SUV & 4x4', 'Convertible', 'Compact'];

  const filteredCars = mockCarRentals.filter(car => {
    if (selectedCategory !== 'All' && car.category !== selectedCategory) return false;
    return true;
  });

  const calculateDays = () => {
    const d1 = new Date(pickupDate).getTime();
    const d2 = new Date(returnDate).getTime();
    const diff = Math.max(1, Math.round((d2 - d1) / (1000 * 3600 * 24)));
    return diff;
  };

  const rentalDays = calculateDays();

  const handleBookCar = (car: CarRentalOption) => {
    const totalCost = car.pricePerDayUsd * rentalDays;

    onOpenCheckoutModal({
      type: 'car',
      id: car.id,
      title: `${car.make} ${car.model} (${car.year})`,
      subtitle: `${rentalDays} Days Rental • Pickup at ${car.pickupLocation}`,
      image: car.image,
      price: totalCost,
      startDate: pickupDate,
      endDate: returnDate,
      guests: car.seats,
      details: {
        make: car.make,
        model: car.model,
        category: car.category,
        supplier: car.supplier,
        seats: car.seats,
        fuelType: car.fuelType,
        transmission: car.transmission,
        mileageLimit: car.mileageLimit,
        pricePerDay: car.pricePerDayUsd,
        totalDays: rentalDays,
        insuranceIncluded: car.insuranceIncluded,
        features: car.features
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
            <span>Self-Drive Car Hire & Electric Fleets</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-navy-950">
            Car Rental & Road Trip Fleet
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Rent Tesla EVs, alpine SUVs, and Italian coastal convertibles with full zero-excess coverage.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Comprehensive Insurance Included</span>
          </div>
        </div>
      </div>

      {/* Search Widget */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-premium space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Pickup & Return Location</label>
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
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Pickup Date</label>
            <input
              type="date"
              value={pickupDate}
              onChange={e => setPickupDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 font-medium focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Return Date</label>
            <input
              type="date"
              value={returnDate}
              onChange={e => setReturnDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 font-medium focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {}}
              className="w-full bg-navy-900 hover:bg-brand-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Find Available Cars</span>
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mr-1">
            <SlidersHorizontal className="w-3 h-3" /> Category:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Available Cars Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg text-navy-900">
            Available Rental Vehicles ({filteredCars.length})
          </h2>
          <span className="text-xs text-slate-500 font-medium">Pricing calculated for {rentalDays} days rental</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredCars.map(car => (
            <div
              key={car.id}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-premium transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-slate-100 group">
                  <img
                    src={car.image}
                    alt={car.model}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-navy-950/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                    {car.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-navy-950 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {car.rating} ({car.reviewsCount})
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-brand-600">
                      <span>{car.supplier}</span>
                      <span>•</span>
                      <span>{car.year} Model</span>
                    </div>
                    <h3 className="font-display font-black text-xl text-navy-950 mt-0.5">
                      {car.make} {car.model}
                    </h3>
                  </div>

                  {/* Quick specs */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl text-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block">Transmission</span>
                      <span className="font-bold text-navy-900">{car.transmission}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block">Capacity</span>
                      <span className="font-bold text-navy-900">{car.seats} Seats</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block">Fuel</span>
                      <span className="font-bold text-navy-900">{car.fuelType}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1.5">
                    {car.features.map((f, i) => (
                      <div key={i} className="text-xs text-slate-600 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price footer */}
              <div className="p-6 pt-0">
                <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display font-black text-2xl text-navy-950">${car.pricePerDayUsd}</span>
                      <span className="text-xs text-slate-400">/ day</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">Total: ${car.pricePerDayUsd * rentalDays} ({rentalDays} days)</span>
                  </div>

                  <button
                    onClick={() => handleBookCar(car)}
                    className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-5 py-3 rounded-2xl text-xs transition-all shadow-glow flex items-center gap-2 hover:scale-102"
                  >
                    <span>Reserve Car</span>
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
