import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Calendar, 
  Ticket, 
  Heart, 
  DollarSign, 
  Shield, 
  Plus, 
  Trash2, 
  ArrowRight, 
  CheckCircle2, 
  QrCode, 
  CreditCard, 
  Sparkles, 
  PieChart, 
  LogOut, 
  Search, 
  Printer, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  MapPin, 
  Clock, 
  Share2, 
  X, 
  Hotel, 
  Plane, 
  AlertCircle,
  Train,
  Bus,
  Car,
  Utensils,
  Anchor
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTrip } from '../context/TripContext';
import { mockDestinations, mockStays, mockExperiences } from '../data/mockData';
import { ExpenseItem, Booking } from '../types';

interface UserDashboardProps {
  initialTab?: string;
  onNavigate: (tab: string, param?: any) => void;
  onOpenPlannerModal?: (destName?: string) => void;
  onOpenCheckoutModal?: (item: any) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ 
  initialTab = 'overview', 
  onNavigate,
  onOpenPlannerModal,
  onOpenCheckoutModal
}) => {
  const { user, logout, switchRole } = useAuth();
  const { 
    activeItinerary, 
    savedItineraries, 
    bookings, 
    cancelBooking, 
    expenses, 
    addExpense, 
    deleteExpense, 
    wishlist,
    toggleWishlist
  } = useTrip();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [wishlistFilter, setWishlistFilter] = useState<'all' | 'destinations' | 'stays' | 'activities'>('all');
  const [bookingFilter, setBookingFilter] = useState<string>('all');
  const [bookingSearch, setBookingSearch] = useState('');
  const [selectedVoucher, setSelectedVoucher] = useState<Booking | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [cancelModalId, setCancelModalId] = useState<string | null>(null);

  // Sync activeTab when initialTab prop updates (e.g. from navbar clicks)
  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // New expense form
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expTitle, setExpTitle] = useState('');
  const [expCategory, setExpCategory] = useState<any>('Food');
  const [expAmount, setExpAmount] = useState(45);
  const [expPaidBy, setExpPaidBy] = useState(user?.name || 'Alex Vance');

  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amountUsd, 0);
  const plannedBudget = activeItinerary.totalEstimatedCostUsd || 2500;
  const remainingBudget = Math.max(0, plannedBudget - totalSpent);

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expTitle) return;

    addExpense({
      tripId: activeItinerary.id,
      title: expTitle,
      category: expCategory,
      amountUsd: Number(expAmount),
      date: new Date().toISOString().split('T')[0],
      paidBy: expPaidBy
    });

    setShowExpenseModal(false);
    setExpTitle('');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: UserIcon },
    { id: 'trips', label: 'My Trips', icon: Calendar, count: savedItineraries.length },
    { id: 'bookings', label: 'My Bookings', icon: Ticket, count: bookings.length },
    { id: 'budget', label: 'Budget & Ledger', icon: DollarSign },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, count: wishlist.destinations.length + wishlist.stays.length + (wishlist.activities?.length || 0) },
    { id: 'security', label: 'Profile & Security', icon: Shield }
  ];

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const filteredBookings = bookings.filter(b => {
    let matchesCategory = true;
    if (bookingFilter === 'stay') matchesCategory = b.type === 'stay';
    else if (bookingFilter === 'flight') matchesCategory = b.type === 'flight';
    else if (bookingFilter === 'train') matchesCategory = b.type === 'train';
    else if (bookingFilter === 'car') matchesCategory = b.type === 'car' || b.type === 'cab';
    else if (bookingFilter === 'activity') matchesCategory = b.type === 'activity' || b.type === 'experience' || b.type === 'event' || b.type === 'restaurant' || b.type === 'cruise' || b.type === 'bus';
    
    const query = bookingSearch.toLowerCase().trim();
    if (!query) return matchesCategory;
    const matchesQuery = 
      b.itemTitle.toLowerCase().includes(query) ||
      b.itemSubtitle.toLowerCase().includes(query) ||
      b.bookingRef.toLowerCase().includes(query) ||
      (b.guestDetails?.primaryGuestName && b.guestDetails.primaryGuestName.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Profile Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-premium flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
            alt="Profile Avatar"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-brand-500 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-2xl text-navy-950">{user?.name || 'Alex Vance'}</h1>
              <span className="text-[10px] uppercase font-bold bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full border border-brand-200">
                {user?.role || 'Traveler'} Member
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{user?.email}</p>
            <div className="flex items-center gap-3 text-xs text-slate-600 mt-2">
              <span>Preferred Currency: <strong className="text-navy-900">{user?.currency || 'USD ($)'}</strong></span>
              <span>•</span>
              <span>Pass Type: <strong className="text-emerald-600">Verified Explorer</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('planner')}
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl shadow-glow transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>New AI Trip Plan</span>
          </button>
          <button
            onClick={() => logout()}
            className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-slate-200"
            title="Log Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        {navItems.map(item => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-4 py-3 font-bold text-xs transition-all border-b-2 whitespace-nowrap ${
                active
                  ? 'border-brand-600 text-brand-700 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-navy-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${active ? 'text-brand-600' : 'text-slate-400'}`} />
              <span>{item.label}</span>
              {item.count !== undefined && item.count > 0 && (
                <span className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
                  active ? 'bg-brand-100 text-brand-800' : 'bg-slate-100 text-slate-700'
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Active Itinerary</span>
              <p className="text-base font-bold text-navy-900 truncate">{activeItinerary.destination}</p>
              <p className="text-xs text-brand-600 font-medium">{activeItinerary.durationDays} Days • {activeItinerary.travelStyle}</p>
            </div>

            <div 
              onClick={() => setActiveTab('bookings')}
              className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-1 cursor-pointer card-hover-effect group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-400">Total Bookings</span>
                <span className="text-[10px] font-bold text-brand-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                  View Bookings →
                </span>
              </div>
              <p className="text-2xl font-black text-navy-900">{bookings.length}</p>
              <p className="text-xs text-emerald-600 font-medium">All Confirmed with Digital Tokens</p>
            </div>

            <div 
              onClick={() => setActiveTab('budget')}
              className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-1 cursor-pointer card-hover-effect"
            >
              <span className="text-[10px] font-bold uppercase text-slate-400">Expenses Logged</span>
              <p className="text-2xl font-black text-navy-900">${totalSpent}</p>
              <p className="text-xs text-slate-500">Planned: ${plannedBudget}</p>
            </div>

            <div 
              onClick={() => setActiveTab('wishlist')}
              className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-1 cursor-pointer card-hover-effect"
            >
              <span className="text-[10px] font-bold uppercase text-slate-400">Saved Wishlist</span>
              <p className="text-2xl font-black text-navy-900">{wishlist.destinations.length + wishlist.stays.length + (wishlist.activities?.length || 0)}</p>
              <p className="text-xs text-coral-500 font-medium">Destinations & Stays</p>
            </div>
          </div>

          {/* Active Trip Spotlight */}
          <div className="bg-gradient-to-r from-navy-900 to-brand-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-brand-300">Upcoming Journey Focus</span>
              <h3 className="font-display font-black text-2xl text-white">{activeItinerary.title}</h3>
              <p className="text-xs text-slate-300 max-w-xl">{activeItinerary.overview}</p>
            </div>
            <button
              onClick={() => onNavigate('itinerary-editor')}
              className="px-6 py-3 bg-brand-500 hover:bg-brand-400 text-navy-950 font-bold text-xs rounded-xl shadow-glow transition-all flex items-center gap-2 flex-shrink-0"
            >
              <span>Open in Itinerary Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Recent Confirmed Bookings Preview in Overview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-black text-lg text-navy-900">Confirmed Bookings & Digital Passes</h3>
                <p className="text-xs text-slate-500">Your upcoming reservations with digital entry QR tokens</p>
              </div>
              <button
                onClick={() => setActiveTab('bookings')}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group"
              >
                <span>View All ({bookings.length})</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {bookings.length === 0 ? (
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 text-center space-y-3">
                <Ticket className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-500">No active bookings yet. Explore curated stays and experiences to book.</p>
                <button
                  onClick={() => onNavigate('stays')}
                  className="px-4 py-2 bg-brand-600 text-white text-xs font-bold rounded-xl"
                >
                  Explore Stays
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {bookings.slice(0, 3).map(bk => (
                  <div
                    key={bk.id}
                    className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm card-hover-effect flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-start gap-3">
                      <img src={bk.itemImage} alt={bk.itemTitle} className="w-14 h-14 rounded-2xl object-cover border border-slate-100 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[9px] uppercase font-bold bg-brand-50 text-brand-700 px-2 py-0.5 rounded">
                            {bk.type}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 font-bold">
                            {bk.bookingRef}
                          </span>
                        </div>
                        <h4 className="font-bold text-xs text-navy-900 truncate mt-1">{bk.itemTitle}</h4>
                        <p className="text-[11px] text-slate-500 truncate">{bk.startDate} {bk.endDate ? `• ${bk.endDate}` : ''}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-navy-900">${bk.totalAmountUsd} USD</span>
                      <button
                        onClick={() => setSelectedVoucher(bk)}
                        className="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Voucher</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: MY TRIPS */}
      {activeTab === 'trips' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-navy-900">Saved & AI-Synthesized Itineraries</h3>
            <button
              onClick={() => onNavigate('planner')}
              className="px-4 py-2 bg-brand-600 text-white font-bold text-xs rounded-xl shadow-sm"
            >
              + Create New Trip
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedItineraries.map(trip => (
              <div
                key={trip.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full">
                      {trip.destination}, {trip.country}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{trip.durationDays} Days</span>
                  </div>
                  <h4 className="font-display font-bold text-lg text-navy-900">{trip.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{trip.overview}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-black text-navy-900">${trip.totalEstimatedCostUsd} USD</span>
                  <button
                    onClick={() => onNavigate('itinerary-editor')}
                    className="px-4 py-2 bg-navy-900 hover:bg-brand-600 text-white text-xs font-bold rounded-xl transition-all"
                  >
                    Open Studio
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MY BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-brand-600" />
                <h3 className="font-display font-black text-xl text-navy-900">Confirmed Supplier Reservations</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage your confirmed stays, flight boarding passes, and activity vouchers with instant digital QR entry tokens.
              </p>
            </div>

            {/* Sub-category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'All Bookings', count: bookings.length },
                { id: 'stay', label: 'Stays', count: bookings.filter(b => b.type === 'stay').length },
                { id: 'flight', label: 'Flights', count: bookings.filter(b => b.type === 'flight').length },
                { id: 'train', label: 'Trains', count: bookings.filter(b => b.type === 'train').length },
                { id: 'car', label: 'Cars & Cabs', count: bookings.filter(b => b.type === 'car' || b.type === 'cab').length },
                { id: 'activity', label: 'Experiences & Events', count: bookings.filter(b => b.type === 'activity' || b.type === 'event' || b.type === 'restaurant' || b.type === 'cruise' || b.type === 'bus').length }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setBookingFilter(f.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    bookingFilter === f.id
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{f.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    bookingFilter === f.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {f.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar for Bookings */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={bookingSearch}
              onChange={(e) => setBookingSearch(e.target.value)}
              placeholder="Search by reservation title, reference code (e.g. TP-KYOTO), or guest name..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200/80 rounded-2xl text-xs text-navy-900 placeholder-slate-400 focus:outline-none focus:border-brand-500 shadow-sm"
            />
            {bookingSearch && (
              <button
                onClick={() => setBookingSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {filteredBookings.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
              <Ticket className="w-12 h-12 text-slate-300 mx-auto" />
              <div>
                <h4 className="font-bold text-base text-navy-900">
                  {bookingSearch ? `No bookings matching "${bookingSearch}"` : 'No bookings in this category'}
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Explore verified stays, flights, trains, cabs, and signature experiences with instant confirmation.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('stays')}
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Browse Stays
                </button>
                <button
                  onClick={() => onNavigate('flights')}
                  className="px-4 py-2 bg-navy-900 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Find Flights
                </button>
                <button
                  onClick={() => onNavigate('trains')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Book Trains
                </button>
                <button
                  onClick={() => onNavigate('cabs')}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Book Cabs
                </button>
                <button
                  onClick={() => onNavigate('activities')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Explore Experiences
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map(bk => {
                return (
                  <div
                    key={bk.id}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-premium card-hover-effect flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative flex-shrink-0">
                        <img 
                          src={bk.itemImage} 
                          alt={bk.itemTitle} 
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-slate-200 shadow-sm" 
                        />
                        <div className="absolute -bottom-2 -right-2 p-1.5 bg-white rounded-xl shadow-sm border border-slate-100">
                          {bk.type === 'stay' && <Hotel className="w-3.5 h-3.5 text-brand-600" />}
                          {bk.type === 'flight' && <Plane className="w-3.5 h-3.5 text-teal-600" />}
                          {bk.type === 'train' && <Train className="w-3.5 h-3.5 text-indigo-600" />}
                          {(bk.type === 'car' || bk.type === 'cab') && <Car className="w-3.5 h-3.5 text-amber-600" />}
                          {bk.type === 'bus' && <Bus className="w-3.5 h-3.5 text-blue-600" />}
                          {bk.type === 'cruise' && <Anchor className="w-3.5 h-3.5 text-cyan-600" />}
                          {bk.type === 'restaurant' && <Utensils className="w-3.5 h-3.5 text-emerald-600" />}
                          {bk.type === 'event' && <Ticket className="w-3.5 h-3.5 text-purple-600" />}
                          {(bk.type === 'activity' || bk.type === 'experience' || bk.type === 'package') && <Sparkles className="w-3.5 h-3.5 text-coral-500" />}
                        </div>
                      </div>

                      <div className="space-y-1.5 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] uppercase font-bold bg-brand-50 text-brand-700 border border-brand-200 px-2.5 py-0.5 rounded-full">
                            {bk.type}
                          </span>
                          <button
                            onClick={() => handleCopyCode(bk.bookingRef)}
                            className="text-xs font-mono font-bold text-navy-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-0.5 rounded-md flex items-center gap-1 transition-colors"
                            title="Click to copy booking reference"
                          >
                            <span>Ref: {bk.bookingRef}</span>
                            <Copy className="w-3 h-3 text-slate-400" />
                          </button>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize flex items-center gap-1 ${
                            bk.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {bk.status} • {bk.paymentStatus}
                          </span>
                        </div>

                        <h4 className="font-display font-bold text-base text-navy-900">{bk.itemTitle}</h4>
                        <p className="text-xs text-slate-500">{bk.itemSubtitle}</p>
                        
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <strong>{bk.startDate} {bk.endDate ? `to ${bk.endDate}` : ''}</strong>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                            Guest: <strong>{bk.guestDetails?.primaryGuestName}</strong> ({bk.guestCount} Travelers)
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                            Paid via: <strong className="text-slate-800">{bk.paymentMethod}</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 flex-shrink-0">
                      <div className="text-left sm:text-right">
                        <span className="text-2xl font-black text-navy-900">${bk.totalAmountUsd} USD</span>
                        <span className="block text-[10px] text-slate-400">Total Paid (All taxes & fees incl.)</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedVoucher(bk)}
                          className="px-4 py-2 bg-gradient-to-r from-brand-600 via-brand-500 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-glow transition-all flex items-center gap-1.5 group"
                        >
                          <QrCode className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                          <span>Digital Voucher & QR</span>
                        </button>

                        {bk.status === 'confirmed' && (
                          <button
                            onClick={() => setCancelModalId(bk.id)}
                            className="px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-xl transition-colors font-semibold"
                            title="Request cancellation and automated refund"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: BUDGET & LEDGER */}
      {activeTab === 'budget' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-navy-900">Travel Budget & Real-Time Expense Ledger</h3>
              <p className="text-xs text-slate-500">Planned vs Actual Spend for {activeItinerary.destination}</p>
            </div>
            <button
              onClick={() => setShowExpenseModal(true)}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl shadow-glow transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Expense</span>
            </button>
          </div>

          {/* Budget Gauges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Planned Budget</span>
              <p className="text-2xl font-black text-navy-900">${plannedBudget}</p>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Actual Realized Spend</span>
              <p className="text-2xl font-black text-brand-700">${totalSpent}</p>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Remaining Cushion</span>
              <p className="text-2xl font-black text-emerald-600">${remainingBudget}</p>
            </div>
          </div>

          {/* Expense Table */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 font-bold text-xs text-navy-900">
              Receipt Ledger Entries
            </div>
            <div className="divide-y divide-slate-100">
              {expenses.map(exp => (
                <div key={exp.id} className="p-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-extrabold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {exp.category}
                    </span>
                    <div>
                      <p className="font-bold text-navy-900">{exp.title}</p>
                      <p className="text-[11px] text-slate-400">{exp.date} • Paid by {exp.paidBy}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-navy-900">${exp.amountUsd}</span>
                    <button
                      onClick={() => deleteExpense(exp.id)}
                      className="p-1 text-slate-400 hover:text-red-500 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: WISHLIST */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-black text-xl text-navy-900">Saved Wishlist & Dream Journeys</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                All destinations, boutique stays, and curated experiences you have saved across Tripora AI.
              </p>
            </div>

            {/* Sub-category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'All Saved', count: wishlist.destinations.length + wishlist.stays.length + (wishlist.activities?.length || 0) },
                { id: 'destinations', label: 'Destinations', count: wishlist.destinations.length },
                { id: 'stays', label: 'Stays', count: wishlist.stays.length },
                { id: 'activities', label: 'Experiences', count: wishlist.activities?.length || 0 }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setWishlistFilter(f.id as any)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    wishlistFilter === f.id
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{f.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    wishlistFilter === f.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {f.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* DESTINATIONS SECTION */}
          {(wishlistFilter === 'all' || wishlistFilter === 'destinations') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-navy-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
                  <span>Saved Destinations ({wishlist.destinations.length})</span>
                </h4>
                <button
                  onClick={() => onNavigate('destinations')}
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  <span>Browse More Destinations</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {wishlist.destinations.length === 0 ? (
                <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-3">
                  <Heart className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs font-bold text-navy-900">No destinations saved yet</p>
                  <p className="text-[11px] text-slate-400">Click the heart icon on any destination to save it for quick AI planning.</p>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    {mockDestinations.slice(0, 4).map(d => (
                      <button
                        key={d.id}
                        onClick={() => toggleWishlist('destinations', d.id)}
                        className="px-3 py-1 bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold rounded-xl border border-brand-200"
                      >
                        + Add {d.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.destinations.map(id => {
                    const dest = mockDestinations.find(d => d.id === id);
                    if (!dest) return null;
                    return (
                      <div
                        key={dest.id}
                        className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-premium card-hover-effect flex flex-col justify-between"
                      >
                        <div className="relative h-52 overflow-hidden">
                          <img 
                            src={dest.image} 
                            alt={dest.name} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                          />
                          <button
                            onClick={() => toggleWishlist('destinations', dest.id)}
                            className="absolute top-3.5 right-3.5 p-2 rounded-full bg-coral-500 text-white shadow-coral-glow transition-all hover:scale-110"
                            title="Remove from wishlist"
                          >
                            <Heart className="w-4 h-4 fill-current" />
                          </button>
                          <span className="absolute bottom-3 left-3 bg-navy-950/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                            {dest.region}
                          </span>
                        </div>

                        <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between">
                              <h4 className="font-display font-black text-lg text-navy-900">{dest.name}</h4>
                              <span className="text-xs font-bold text-amber-500">★ {dest.rating}</span>
                            </div>
                            <p className="text-[11px] font-semibold text-brand-700">{dest.country}</p>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{dest.tagline}</p>
                            
                            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 mt-2">
                              <span>Best Season: <strong className="text-slate-800">{dest.bestTimeToVisit.split('&')[0]}</strong></span>
                              <span className="font-bold text-brand-700">${dest.averageDailyCostUsd} / day</span>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                            <button
                              onClick={() => onNavigate('destination-details', { id: dest.id })}
                              className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors text-center"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => {
                                if (onOpenPlannerModal) {
                                  onOpenPlannerModal(dest.name);
                                } else {
                                  onNavigate('planner');
                                }
                              }}
                              className="py-2 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-glow transition-all flex items-center justify-center gap-1"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Plan with AI</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* STAYS SECTION */}
          {(wishlistFilter === 'all' || wishlistFilter === 'stays') && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-navy-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                  <span>Saved Stays & Ryokans ({wishlist.stays.length})</span>
                </h4>
                <button
                  onClick={() => onNavigate('stays')}
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  <span>Browse Stays</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {wishlist.stays.length === 0 ? (
                <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center text-xs text-slate-400">
                  No accommodations saved in wishlist.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.stays.map(id => {
                    const stay = mockStays.find(s => s.id === id);
                    if (!stay) return null;
                    return (
                      <div
                        key={stay.id}
                        className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col justify-between"
                      >
                        <div className="relative h-44">
                          <img src={stay.image} alt={stay.name} className="w-full h-full object-cover" />
                          <button
                            onClick={() => toggleWishlist('stays', stay.id)}
                            className="absolute top-3 right-3 p-2 rounded-full bg-coral-500 text-white shadow-coral-glow"
                          >
                            <Heart className="w-3.5 h-3.5 fill-current" />
                          </button>
                          {stay.badge && (
                            <span className="absolute bottom-3 left-3 bg-brand-600 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                              {stay.badge}
                            </span>
                          )}
                        </div>
                        <div className="p-4 space-y-2">
                          <div className="flex justify-between text-xs font-bold text-navy-900">
                            <span className="truncate">{stay.name}</span>
                            <span className="text-amber-500">★ {stay.rating}</span>
                          </div>
                          <p className="text-[11px] text-slate-500">{stay.city}, {stay.country}</p>
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-xs font-black text-brand-700">${stay.pricePerNightUsd} / night</span>
                            <button
                              onClick={() => onNavigate('stay-details', { id: stay.id })}
                              className="px-3 py-1 bg-navy-900 text-white font-bold text-xs rounded-lg"
                            >
                              Reserve
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* EXPERIENCES SECTION */}
          {(wishlistFilter === 'all' || wishlistFilter === 'activities') && wishlist.activities && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-navy-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-coral-500" />
                  <span>Saved Experiences & Tours ({wishlist.activities.length})</span>
                </h4>
                <button
                  onClick={() => onNavigate('activities')}
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  <span>Browse Experiences</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.activities.map(id => {
                  const exp = mockExperiences.find(e => e.id === id);
                  if (!exp) return null;
                  return (
                    <div
                      key={exp.id}
                      className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col justify-between"
                    >
                      <div className="relative h-44">
                        <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" />
                        <button
                          onClick={() => toggleWishlist('activities', exp.id)}
                          className="absolute top-3 right-3 p-2 rounded-full bg-coral-500 text-white shadow-coral-glow"
                        >
                          <Heart className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                      <div className="p-4 space-y-2">
                        <h5 className="font-bold text-xs text-navy-900 line-clamp-1">{exp.title}</h5>
                        <p className="text-[11px] text-slate-500">{exp.city} • ~{exp.durationHours} Hours</p>
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-black text-brand-700">${exp.priceUsd} / person</span>
                          <button
                            onClick={() => onNavigate('activities')}
                            className="px-3 py-1 bg-brand-600 text-white font-bold text-xs rounded-lg shadow-sm"
                          >
                            Book Tour
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 6: PROFILE & SECURITY */}
      {activeTab === 'security' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6 animate-in fade-in max-w-2xl">
          <h3 className="font-bold text-base text-navy-900">Profile & Security Settings</h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Full Name</label>
              <input
                type="text"
                defaultValue={user?.name}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-navy-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Email Address</label>
              <input
                type="email"
                defaultValue={user?.email}
                disabled
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-slate-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Account Role Switcher</label>
              <div className="flex gap-2">
                {(['traveler', 'partner', 'admin'] as const).map(role => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => switchRole(role)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                      user?.role === role ? 'bg-brand-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Expense Modal */}
      {showExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in">
          <form onSubmit={handleCreateExpense} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-navy-900">Log New Travel Expense</h3>
              <button type="button" onClick={() => setShowExpenseModal(false)} className="text-slate-400">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Expense Title</label>
                <input
                  type="text"
                  value={expTitle}
                  onChange={e => setExpTitle(e.target.value)}
                  placeholder="e.g. Michelin Ramen Lunch"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Category</label>
                  <select
                    value={expCategory}
                    onChange={e => setExpCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 font-medium"
                  >
                    <option value="Food">Food & Dining</option>
                    <option value="Accommodation">Accommodation</option>
                    <option value="Flights">Flights</option>
                    <option value="Activities">Activities</option>
                    <option value="Transport">Transport</option>
                    <option value="Shopping">Shopping</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Amount ($ USD)</label>
                  <input
                    type="number"
                    value={expAmount}
                    onChange={e => setExpAmount(Number(e.target.value))}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowExpenseModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl shadow-glow transition-all"
              >
                Save Receipt
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Digital Voucher & Boarding Pass Modal */}
      {selectedVoucher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-8 animate-in zoom-in-95 duration-200">
            {/* Modal Header Bar */}
            <div className="bg-navy-900 text-white p-5 sm:p-6 flex items-center justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-400 flex items-center justify-center shadow-glow">
                  <QrCode className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-black text-base tracking-wide">Tripora Digital Pass</span>
                    <span className="text-[9px] uppercase font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Verified Active
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">Authentic Token • Instant Concierge & Gate Entry</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedVoucher(null)}
                className="relative z-10 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Voucher Body Content */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto print:max-h-none">
              
              {/* Item Overview Banner */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <img
                  src={selectedVoucher.itemImage}
                  alt={selectedVoucher.itemTitle}
                  className="w-20 h-20 rounded-xl object-cover border border-slate-200 shadow-sm flex-shrink-0"
                />
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold bg-brand-100 text-brand-800 px-2 py-0.5 rounded">
                      {selectedVoucher.type}
                    </span>
                    <span className="text-xs font-mono font-bold text-navy-900 bg-white border border-slate-200 px-2 py-0.5 rounded">
                      {selectedVoucher.bookingRef}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-navy-900 leading-snug">{selectedVoucher.itemTitle}</h4>
                  <p className="text-xs text-slate-500">{selectedVoucher.itemSubtitle}</p>
                </div>
              </div>

              {/* QR Code & Scan Token */}
              <div className="bg-gradient-to-b from-brand-50/50 to-teal-50/30 rounded-2xl p-6 border border-brand-100 text-center space-y-3">
                <div className="inline-block p-4 bg-white rounded-2xl shadow-sm border border-slate-200 relative group">
                  {/* High Quality Stylized SVG QR Code */}
                  <svg className="w-36 h-36 mx-auto text-navy-950" viewBox="0 0 100 100" fill="currentColor">
                    {/* Top-left position marker */}
                    <rect x="5" y="5" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="4" rx="3" />
                    <rect x="11" y="11" width="16" height="16" fill="currentColor" rx="2" />
                    
                    {/* Top-right position marker */}
                    <rect x="67" y="5" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="4" rx="3" />
                    <rect x="73" y="11" width="16" height="16" fill="currentColor" rx="2" />
                    
                    {/* Bottom-left position marker */}
                    <rect x="5" y="67" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="4" rx="3" />
                    <rect x="11" y="73" width="16" height="16" fill="currentColor" rx="2" />
                    
                    {/* Data grid points */}
                    <rect x="38" y="8" width="5" height="5" />
                    <rect x="48" y="8" width="5" height="5" />
                    <rect x="58" y="8" width="5" height="5" />
                    <rect x="38" y="18" width="8" height="5" />
                    <rect x="52" y="18" width="5" height="5" />
                    <rect x="8" y="38" width="5" height="8" />
                    <rect x="18" y="44" width="8" height="5" />
                    <rect x="38" y="38" width="24" height="24" fill="#0D9488" rx="4" />
                    <circle cx="50" cy="50" r="6" fill="white" />
                    <rect x="68" y="38" width="5" height="8" />
                    <rect x="78" y="44" width="8" height="5" />
                    <rect x="88" y="38" width="5" height="8" />
                    <rect x="38" y="68" width="5" height="5" />
                    <rect x="48" y="74" width="8" height="5" />
                    <rect x="58" y="68" width="5" height="8" />
                    <rect x="68" y="68" width="8" height="8" />
                    <rect x="82" y="78" width="10" height="5" />
                    <rect x="74" y="88" width="8" height="5" />
                    <rect x="48" y="88" width="5" height="5" />
                    <rect x="38" y="84" width="5" height="8" />
                  </svg>
                  <span className="block text-[10px] font-mono font-bold text-slate-400 mt-2">
                    TOKEN: {selectedVoucher.id}-{selectedVoucher.bookingRef}
                  </span>
                </div>
                <p className="text-xs font-bold text-navy-900">Present this QR code at reception, gate check-in, or tour meeting point</p>
                <p className="text-[11px] text-slate-500">Includes cryptographic signature from authorized supplier API</p>
              </div>

              {/* Booking Specifications Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Lead Guest / Passenger</span>
                  <strong className="text-navy-900 text-xs block mt-0.5">{selectedVoucher.guestDetails?.primaryGuestName || 'Alex Vance'}</strong>
                  <span className="text-[11px] text-slate-500">{selectedVoucher.guestDetails?.email}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Travel Dates</span>
                  <strong className="text-navy-900 text-xs block mt-0.5">{selectedVoucher.startDate}</strong>
                  <span className="text-[11px] text-slate-500">{selectedVoucher.endDate ? `to ${selectedVoucher.endDate}` : 'Single Day Experience'}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Party Size</span>
                  <strong className="text-navy-900 text-xs block mt-0.5">{selectedVoucher.guestCount} Travelers</strong>
                  <span className="text-[11px] text-emerald-600 font-bold">Confirmed</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Payment Method</span>
                  <strong className="text-navy-900 text-xs block mt-0.5">{selectedVoucher.paymentMethod}</strong>
                  <span className="text-[11px] text-slate-500 font-bold">${selectedVoucher.totalAmountUsd} USD Paid</span>
                </div>
              </div>

              {/* Extra Specific Details */}
              {selectedVoucher.details && Object.keys(selectedVoucher.details).length > 0 && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Reservation Notes & Supplier Details</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(selectedVoucher.details).map(([k, v]) => (
                      <div key={k}>
                        <span className="text-[10px] text-slate-400 capitalize">{k.replace(/([A-Z])/g, ' $1')}: </span>
                        <strong className="text-navy-900">{String(v)}</strong>
                      </div>
                    ))}
                  </div>
                  {selectedVoucher.guestDetails?.specialRequests && (
                    <p className="text-xs text-slate-600 pt-1 border-t border-slate-200">
                      <strong>Special Request:</strong> {selectedVoucher.guestDetails.specialRequests}
                    </p>
                  )}
                </div>
              )}

              {/* Barcode Simulation */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl text-center space-y-2">
                <div className="flex justify-center items-center gap-1 h-10 px-4">
                  {[2, 4, 1, 3, 2, 5, 1, 4, 2, 3, 1, 5, 2, 3, 4, 1, 2, 5, 3, 2, 4, 1, 3, 2, 4, 1, 5, 2, 3, 1, 4, 2, 5, 3, 1, 2, 4, 3, 2, 5, 1, 3, 4, 2, 1, 4].map((h, i) => (
                    <div
                      key={i}
                      className="bg-white"
                      style={{
                        width: `${(h % 3) + 2}px`,
                        height: '100%',
                        opacity: h === 1 ? 0.4 : 1
                      }}
                    />
                  ))}
                </div>
                <p className="font-mono text-[10px] tracking-widest text-slate-400">
                  *{selectedVoucher.bookingRef.replace(/-/g, '')}*
                </p>
              </div>

            </div>

            {/* Modal Actions Footer */}
            <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => handleCopyCode(selectedVoucher.bookingRef)}
                className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-400" />}
                <span>{copiedCode ? 'Reference Copied!' : 'Copy Reference'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Pass</span>
                </button>
                <button
                  onClick={() => setSelectedVoucher(null)}
                  className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl shadow-glow transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Reservation Confirmation Modal */}
      {cancelModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-navy-900">Cancel Confirmed Reservation?</h3>
                <p className="text-xs text-slate-500">100% automated refund will be credited to your payment method.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
              Per Tripora AI guarantee, cancellations made before departure are fully refunded and recorded in your Travel Ledger as a negative expense credit.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setCancelModalId(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Keep Booking
              </button>
              <button
                type="button"
                onClick={() => {
                  cancelBooking(cancelModalId);
                  setCancelModalId(null);
                }}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

