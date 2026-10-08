import React, { useState } from 'react';
import { Building2, Plus, Calendar, DollarSign, Users, CheckCircle2, TrendingUp, Hotel, Sparkles } from 'lucide-react';
import { mockStays } from '../data/mockData';

interface PartnerPortalProps {
  onNavigate: (tab: string, param?: any) => void;
}

export const PartnerPortal: React.FC<PartnerPortalProps> = ({ onNavigate }) => {
  const [partnerListings, setPartnerListings] = useState(mockStays);
  const [showAddListing, setShowAddListing] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCity, setNewCity] = useState('Kyoto');
  const [newPrice, setNewPrice] = useState(350);

  const handleAddListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newStay: any = {
      id: `stay-partner-${Date.now()}`,
      name: newTitle,
      type: 'Boutique Hotel',
      destinationId: 'dest-kyoto',
      city: newCity,
      country: 'Japan',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      gallery: [],
      rating: 5.0,
      reviewsCount: 1,
      pricePerNightUsd: Number(newPrice),
      badge: 'Verified Partner',
      amenities: ['Free Wi-Fi', 'Complimentary Breakfast', 'Concierge Service'],
      address: `Higashiyama District, ${newCity}`,
      coordinates: { lat: 35.0, lng: 135.7 },
      distanceToCenterKm: 1.2,
      cancellationPolicy: 'Free cancellation 48h prior',
      roomTypes: []
    };

    setPartnerListings([newStay, ...partnerListings]);
    setShowAddListing(false);
    setNewTitle('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-navy-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Tripora Hospitality Partner Network</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-white">
            Partner Revenue & Inventory Hub
          </h1>
          <p className="text-xs text-slate-300 max-w-xl">
            Manage your boutique properties, synchronize live room calendars, and access AI demand forecast telemetry.
          </p>
        </div>

        <button
          onClick={() => setShowAddListing(true)}
          className="px-5 py-3 bg-brand-500 hover:bg-brand-400 text-navy-950 font-bold text-xs rounded-xl shadow-glow transition-all flex items-center gap-2 flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Property Listing</span>
        </button>
      </div>

      {/* Partner Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Monthly Revenue</span>
          <p className="text-2xl font-black text-navy-900">$28,450</p>
          <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +18.4% vs last month
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Bookings Received</span>
          <p className="text-2xl font-black text-navy-900">42 Stays</p>
          <p className="text-xs text-slate-500">Average Stay: 3.2 nights</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Active Published Listings</span>
          <p className="text-2xl font-black text-navy-900">{partnerListings.length}</p>
          <p className="text-xs text-brand-600">100% Instant Confirmation</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Guest Review Score</span>
          <p className="text-2xl font-black text-navy-900">4.96 / 5.0</p>
          <p className="text-xs text-amber-500 font-semibold">Super-Partner Status</p>
        </div>
      </div>

      {/* Listings Management Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-navy-900">Managed Properties & Room Availability</h3>
          <span className="text-xs text-slate-400">Connected to Direct Kafka Inventory Stream</span>
        </div>

        <div className="divide-y divide-slate-100">
          {partnerListings.map(item => (
            <div key={item.id} className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-2xl object-cover" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold bg-brand-50 text-brand-700 px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                    <span className="text-xs font-bold text-navy-900">{item.name}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{item.city}, {item.country} • ${item.pricePerNightUsd} / night</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full">
                  ● Live & Accepting Guests
                </span>
                <button
                  onClick={() => onNavigate('stay-details', { id: item.id })}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                >
                  Preview Public View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Listing Modal */}
      {showAddListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in">
          <form onSubmit={handleAddListing} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-navy-900">Publish New Partner Property</h3>
              <button type="button" onClick={() => setShowAddListing(false)} className="text-slate-400">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Property Name</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Kyoto Cedar Forest Villa"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">City / Region</label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={e => setNewCity(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Nightly Rate ($ USD)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={e => setNewPrice(Number(e.target.value))}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddListing(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-brand-600 text-white font-bold text-xs rounded-xl shadow-glow"
              >
                Publish Listing
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
