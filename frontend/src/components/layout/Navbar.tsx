import React, { useState } from 'react';
import { 
  Sparkles, 
  Compass, 
  Hotel, 
  Plane, 
  CalendarDays, 
  BookOpen, 
  Heart, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X, 
  Shield, 
  Building2, 
  DollarSign, 
  MessageSquare,
  Ticket,
  Train,
  Bus,
  Car,
  Utensils,
  Anchor,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTrip } from '../../context/TripContext';
import { useChat } from '../../context/ChatContext';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, param?: any) => void;
  onOpenPlannerModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate, onOpenPlannerModal }) => {
  const { user, isAuthenticated, logout, switchRole } = useAuth();
  const { wishlist, bookings } = useTrip();
  const { toggleChat } = useChat();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [bookDropdownOpen, setBookDropdownOpen] = useState(false);

  const totalWishlistCount = wishlist.destinations.length + wishlist.stays.length + wishlist.activities.length;

  const bookingCategories = [
    { id: 'flights', label: 'Flights', icon: Plane, desc: 'Airlines & Fare Locks' },
    { id: 'stays', label: 'Hotels & Stays', icon: Hotel, desc: 'Vetted Luxury Stays' },
    { id: 'trains', label: 'Trains & Rail', icon: Train, desc: 'Bullet & Alpine Express' },
    { id: 'buses', label: 'Intercity Buses', icon: Bus, desc: 'AC Sleeper & Electric' },
    { id: 'cabs', label: 'Cabs & Transfers', icon: Car, desc: 'Airport & City Chauffeurs' },
    { id: 'car-rentals', label: 'Car Rentals', icon: Car, desc: 'Electric, SUV & Convertibles' },
    { id: 'activities', label: 'Activities & Tours', icon: Sparkles, desc: 'Attractions & Adventures' },
    { id: 'events', label: 'Events & Tickets', icon: Ticket, desc: 'Festivals & Concerts' },
    { id: 'restaurants', label: 'Restaurants', icon: Utensils, desc: 'Michelin & Fine Dining' },
    { id: 'cruises', label: 'Cruises & Yachts', icon: Anchor, desc: 'Luxury Sea Voyages' }
  ];

  const isBookingActive = [
    'flights', 'stays', 'trains', 'buses', 'cabs', 'car-rentals', 'cars', 'activities', 'events', 'restaurants', 'dining', 'cruises', 'experiences'
  ].includes(currentTab);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-500 to-teal-300 flex items-center justify-center shadow-glow transition-transform group-hover:scale-105">
              <Sparkles className="w-6 h-6 text-white animate-pulse-subtle" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-2xl tracking-tight text-navy-900">
                  Tripora<span className="text-brand-600">.ai</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-brand-100 text-brand-800 px-2 py-0.5 rounded-full border border-brand-200">
                  AI 2.0
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium hidden sm:block tracking-wide">
                Reimagined Travel Ecosystem
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/60 shadow-inner">
            <button
              onClick={() => onNavigate('explore')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                currentTab === 'explore' || currentTab === 'destinations'
                  ? 'bg-white text-brand-700 shadow-sm font-bold scale-[1.02]'
                  : 'text-slate-600 hover:text-navy-900 hover:bg-white/60'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-brand-600" />
              <span>Explore</span>
            </button>

            {/* Omni-Booking Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => setBookDropdownOpen(!bookDropdownOpen)}
                onMouseEnter={() => setBookDropdownOpen(true)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                  isBookingActive
                    ? 'bg-white text-brand-700 shadow-sm font-bold scale-[1.02]'
                    : 'text-slate-600 hover:text-navy-900 hover:bg-white/60'
                }`}
              >
                <span>Book Travel</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${bookDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {bookDropdownOpen && (
                <div 
                  onMouseLeave={() => setBookDropdownOpen(false)}
                  className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-premium border border-slate-200/80 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    11-Category Booking Suite
                  </div>
                  <div className="grid grid-cols-1 gap-1 max-h-96 overflow-y-auto pr-1">
                    {bookingCategories.map(cat => {
                      const Icon = cat.icon;
                      const isActive = currentTab === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            onNavigate(cat.id);
                            setBookDropdownOpen(false);
                          }}
                          className={`flex items-center gap-3 p-2 rounded-xl text-left transition-all ${
                            isActive
                              ? 'bg-brand-50 text-brand-800 font-bold'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-brand-600 flex-shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold leading-tight">{cat.label}</div>
                            <div className="text-[10px] text-slate-400 leading-tight">{cat.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('stays')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                currentTab === 'stays' ? 'bg-white text-brand-700 shadow-sm font-bold' : 'text-slate-600 hover:bg-white/60'
              }`}
            >
              <Hotel className="w-3.5 h-3.5 text-slate-400" />
              <span>Stays</span>
            </button>

            <button
              onClick={() => onNavigate('flights')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                currentTab === 'flights' ? 'bg-white text-brand-700 shadow-sm font-bold' : 'text-slate-600 hover:bg-white/60'
              }`}
            >
              <Plane className="w-3.5 h-3.5 text-slate-400" />
              <span>Flights</span>
            </button>

            <button
              onClick={() => onNavigate('trains')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                currentTab === 'trains' ? 'bg-white text-brand-700 shadow-sm font-bold' : 'text-slate-600 hover:bg-white/60'
              }`}
            >
              <Train className="w-3.5 h-3.5 text-slate-400" />
              <span>Trains</span>
            </button>

            <button
              onClick={() => onNavigate('planner')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                currentTab === 'planner'
                  ? 'bg-white text-brand-700 shadow-sm font-bold scale-[1.02]'
                  : 'text-brand-700 hover:bg-brand-50/80 font-bold'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5 text-brand-600" />
              <span>AI Planner</span>
              <span className="w-1.5 h-1.5 rounded-full bg-coral-500 animate-ping" />
            </button>

            <button
              onClick={() => onNavigate('guides')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                currentTab === 'guides' ? 'bg-white text-brand-700 shadow-sm font-bold' : 'text-slate-600 hover:bg-white/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>Guides</span>
            </button>
          </nav>

          {/* Right Action Icons & Profile */}
          <div className="hidden md:flex items-center gap-3">
            {/* AI Assistant Quick Toggle */}
            <button
              onClick={() => toggleChat()}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100/80 rounded-xl border border-brand-200/70 transition-all shadow-sm group"
              title="Open AI Assistant"
            >
              <MessageSquare className="w-4 h-4 text-brand-600 group-hover:scale-110 transition-transform" />
              <span>AI Chat</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => onNavigate('dashboard', { tab: 'wishlist' })}
              className="relative p-2.5 text-slate-600 hover:text-coral-500 hover:bg-coral-50/50 rounded-xl border border-slate-200/60 transition-colors"
              title="View Wishlist"
            >
              <Heart className="w-4 h-4" />
              {totalWishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-coral-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-coral-glow animate-pulse">
                  {totalWishlistCount}
                </span>
              )}
            </button>

            {/* Bookings shortcut */}
            <button
              onClick={() => onNavigate('dashboard', { tab: 'bookings' })}
              className={`relative px-3 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 ${
                currentTab === 'dashboard' 
                  ? 'bg-brand-50 text-brand-700 border-brand-200 shadow-sm' 
                  : 'text-slate-600 hover:text-brand-600 hover:bg-brand-50/50 border-slate-200/60'
              }`}
              title="My Bookings & Digital Passes"
            >
              <Ticket className="w-4 h-4 text-brand-600" />
              <span className="hidden xl:inline">My Bookings</span>
              {bookings.length > 0 && (
                <span className="w-4 h-4 bg-brand-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {bookings.length}
                </span>
              )}
            </button>

            {/* Partner Portal Link */}
            <button
              onClick={() => onNavigate('partner')}
              className="text-xs font-medium text-slate-600 hover:text-brand-600 px-2 py-1 transition-colors flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Partner</span>
            </button>

            {/* Authentication / User Profile Menu */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 bg-white hover:border-brand-300 transition-all shadow-sm"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80'}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-brand-500"
                  />
                  <div className="text-left hidden xl:block">
                    <p className="text-xs font-bold text-navy-900 leading-tight">{user.name}</p>
                    <p className="text-[10px] text-brand-600 capitalize font-medium">{user.role}</p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-premium border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-bold text-navy-900">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onNavigate('dashboard', { tab: 'overview' });
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                      >
                        <UserIcon className="w-4 h-4 text-slate-400" />
                        Traveler Dashboard
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onNavigate('dashboard', { tab: 'bookings' });
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <Ticket className="w-4 h-4 text-brand-600" />
                          <span>My Bookings</span>
                        </div>
                        {bookings.length > 0 && (
                          <span className="text-[10px] bg-brand-100 text-brand-800 font-bold px-2 py-0.2 rounded-full">
                            {bookings.length}
                          </span>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onNavigate('itinerary-editor');
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                      >
                        <CalendarDays className="w-4 h-4 text-brand-500" />
                        Active AI Itinerary
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onNavigate('dashboard', { tab: 'budget' });
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                      >
                        <DollarSign className="w-4 h-4 text-emerald-500" />
                        Budget & Expense Ledger
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onNavigate('admin');
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                      >
                        <Shield className="w-4 h-4 text-purple-500" />
                        Admin Console
                      </button>
                    </div>

                    {/* Role Switcher for Interactive Demonstration */}
                    <div className="px-4 py-2 border-t border-b border-slate-100 bg-slate-50/70">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 tracking-wider">Demo Role Switcher</p>
                      <div className="grid grid-cols-3 gap-1">
                        {(['traveler', 'partner', 'admin'] as const).map(role => (
                          <button
                            key={role}
                            onClick={() => switchRole(role)}
                            className={`px-2 py-1 text-[10px] font-bold rounded-lg capitalize transition-colors ${
                              user.role === role
                                ? 'bg-brand-600 text-white'
                                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                            }`}
                          >
                            {role}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2.5"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('auth-login')}
                  className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-brand-700 transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={onOpenPlannerModal}
                  className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 rounded-xl shadow-md shadow-brand-500/20 transition-all hover:shadow-lg hover:scale-105"
                >
                  Plan Trip with AI
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => toggleChat()}
              className="p-2 text-brand-600 bg-brand-50 rounded-xl"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-4 max-h-[85vh] overflow-y-auto">
          {/* Main Quick Links */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'explore', label: 'Explore', icon: Compass },
              { id: 'planner', label: 'AI Planner', icon: CalendarDays },
              { id: 'guides', label: 'Guides', icon: BookOpen }
            ].map(link => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl text-xs font-semibold text-center ${
                    currentTab === link.id
                      ? 'bg-brand-50 text-brand-700 border border-brand-200'
                      : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  <Icon className="w-5 h-5 text-brand-600 mb-1" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* 11-Category Booking Grid */}
          <div className="space-y-2">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              Book Travel & Services
            </div>
            <div className="grid grid-cols-2 gap-2">
              {bookingCategories.map(cat => {
                const Icon = cat.icon;
                const isActive = currentTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onNavigate(cat.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold text-left transition-all ${
                      isActive
                        ? 'bg-brand-50 text-brand-700 border border-brand-200'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-brand-600 flex-shrink-0" />
                    <span className="truncate">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onNavigate('dashboard', { tab: 'bookings' });
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl bg-brand-50 text-xs font-bold text-brand-700 flex items-center justify-between border border-brand-200"
            >
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-brand-600" />
                <span>My Bookings & Digital Passes</span>
              </div>
              <span className="text-[10px] bg-brand-600 text-white px-2 py-0.5 rounded-full font-bold">
                {bookings.length} Bookings
              </span>
            </button>
            <button
              onClick={() => {
                onNavigate('dashboard', { tab: 'overview' });
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Traveler Overview & Ledger</span>
            </button>
            <button
              onClick={() => {
                onNavigate('partner');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-800"
            >
              Partner Portal & Listings
            </button>
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-800"
            >
              Admin Metrics & Platform Health
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
