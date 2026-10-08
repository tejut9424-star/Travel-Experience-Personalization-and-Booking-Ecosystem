import React, { createContext, useContext, useState, useEffect } from 'react';
import { Itinerary, Booking, ExpenseItem, ActivityItem, DayPlan } from '../types';
import { mockDefaultItinerary } from '../data/mockData';

interface TripContextType {
  activeItinerary: Itinerary;
  savedItineraries: Itinerary[];
  wishlist: {
    destinations: string[];
    stays: string[];
    activities: string[];
  };
  bookings: Booking[];
  expenses: ExpenseItem[];
  setActiveItinerary: (itinerary: Itinerary) => void;
  updateItinerary: (updated: Itinerary) => void;
  addActivityToDay: (dayNumber: number, period: 'morning' | 'afternoon' | 'evening', activity: ActivityItem) => void;
  removeActivityFromDay: (dayNumber: number, period: 'morning' | 'afternoon' | 'evening', activityId: string) => void;
  updateActivityInDay: (dayNumber: number, period: 'morning' | 'afternoon' | 'evening', activity: ActivityItem) => void;
  regenerateDayWithAI: (dayNumber: number, promptModifier?: string) => Promise<void>;
  optimizeBudgetWithAI: (reductionPercent: number) => { original: number; newTotal: number; savings: number; changes: string[] };
  toggleWishlist: (type: 'destinations' | 'stays' | 'activities', id: string) => void;
  isWishlisted: (type: 'destinations' | 'stays' | 'activities', id: string) => boolean;
  createBooking: (bookingData: Omit<Booking, 'id' | 'bookingRef' | 'createdAt' | 'status' | 'paymentStatus'>) => Booking;
  cancelBooking: (bookingId: string) => void;
  addExpense: (expense: Omit<ExpenseItem, 'id'>) => void;
  deleteExpense: (id: string) => void;
}

const initialBookings: Booking[] = [
  {
    id: 'bk-01',
    bookingRef: 'TP-KYOTO-8821',
    userId: 'usr-traveler-01',
    type: 'stay',
    itemTitle: 'Hoshinoya Kyoto Luxury Riverside Ryokan',
    itemSubtitle: 'Mizu Deluxe River View Suite (3 Nights)',
    itemImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
    itemId: 'stay-kyoto-hoshinoya',
    startDate: '2026-10-15',
    endDate: '2026-10-18',
    guestCount: 2,
    totalAmountUsd: 1440,
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'Visa •••• 4242',
    createdAt: '2026-10-01T14:22:00Z',
    guestDetails: {
      primaryGuestName: 'Alex Vance',
      email: 'alex.vance@tripora.ai',
      phone: '+1 555-382-9012',
      specialRequests: 'High floor with river view please.'
    },
    details: {
      roomType: 'Mizu Deluxe Suite',
      checkInTime: '03:00 PM',
      checkOutTime: '11:00 AM',
      confirmationCode: 'RYOKAN-8821-XP'
    }
  },
  {
    id: 'bk-02',
    bookingRef: 'TP-FLIGHT-9932',
    userId: 'usr-traveler-01',
    type: 'flight',
    itemTitle: 'All Nippon Airways (ANA) — SFO to KIX',
    itemSubtitle: 'Flight NH 108 • 2 Adults • Economy',
    itemImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80',
    itemId: 'fl-101',
    startDate: '2026-10-15',
    endDate: '2026-10-22',
    guestCount: 2,
    totalAmountUsd: 1680,
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'Mastercard •••• 8812',
    createdAt: '2026-10-01T11:05:00Z',
    guestDetails: {
      primaryGuestName: 'Alex Vance',
      email: 'alex.vance@tripora.ai',
      phone: '+1 555-382-9012'
    },
    details: {
      cabinClass: 'Economy',
      seats: '24A, 24B',
      baggage: '2 x 23kg included',
      terminal: 'International Terminal B, Gate 28'
    }
  },
  {
    id: 'bk-03',
    bookingRef: 'TP-EXP-4419',
    userId: 'usr-traveler-01',
    type: 'activity',
    itemTitle: 'Private Tea Master Ceremony & Gion Walk',
    itemSubtitle: 'Authentic 300-Year-Old Machiya • Traditional Host',
    itemImage: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=600&q=80',
    itemId: 'exp-kyoto-tea',
    startDate: '2026-10-16',
    guestCount: 2,
    totalAmountUsd: 190,
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'Apple Pay',
    createdAt: '2026-10-02T09:15:00Z',
    guestDetails: {
      primaryGuestName: 'Alex Vance',
      email: 'alex.vance@tripora.ai',
      phone: '+1 555-382-9012',
      specialRequests: 'English commentary requested.'
    },
    details: {
      meetingPoint: 'Gion-Shijo Station Exit 4',
      startTime: '10:00 AM',
      duration: '2.5 Hours',
      guideName: 'Master Kenjiro Takahashi'
    }
  }
];

const initialExpenses: ExpenseItem[] = [
  { id: 'exp-1', tripId: 'itin-kyoto-7d', title: 'Roundtrip Flights ANA SFO-KIX', category: 'Flights', amountUsd: 1680, date: '2026-10-01', paidBy: 'Alex Vance' },
  { id: 'exp-2', tripId: 'itin-kyoto-7d', title: 'Hoshinoya Ryokan Deposit', category: 'Accommodation', amountUsd: 1440, date: '2026-10-01', paidBy: 'Alex Vance' },
  { id: 'exp-3', tripId: 'itin-kyoto-7d', title: 'JR Kansai Haruka Rail Passes', category: 'Transport', amountUsd: 56, date: '2026-10-02', paidBy: 'Alex Vance' },
  { id: 'exp-4', tripId: 'itin-kyoto-7d', title: 'Private Tea Ceremony Booking', category: 'Activities', amountUsd: 190, date: '2026-10-02', paidBy: 'Alex Vance' }
];

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeItinerary, setActiveItinerary] = useState<Itinerary>(() => {
    const saved = localStorage.getItem('tripora_active_itinerary');
    return saved ? JSON.parse(saved) : mockDefaultItinerary;
  });

  const [savedItineraries, setSavedItineraries] = useState<Itinerary[]>([mockDefaultItinerary]);

  const [wishlist, setWishlist] = useState<{
    destinations: string[];
    stays: string[];
    activities: string[];
  }>(() => {
    const saved = localStorage.getItem('tripora_wishlist');
    return saved ? JSON.parse(saved) : {
      destinations: ['dest-kyoto', 'dest-amalfi', 'dest-bali', 'dest-santorini'],
      stays: ['stay-kyoto-hoshinoya', 'stay-amalfi-monastero'],
      activities: ['exp-kyoto-tea', 'exp-amalfi-boat']
    };
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('tripora_bookings');
    return saved ? JSON.parse(saved) : initialBookings;
  });

  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => {
    const saved = localStorage.getItem('tripora_expenses');
    return saved ? JSON.parse(saved) : initialExpenses;
  });

  useEffect(() => {
    localStorage.setItem('tripora_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('tripora_active_itinerary', JSON.stringify(activeItinerary));
  }, [activeItinerary]);

  useEffect(() => {
    localStorage.setItem('tripora_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('tripora_expenses', JSON.stringify(expenses));
  }, [expenses]);

  const updateItinerary = (updated: Itinerary) => {
    setActiveItinerary(updated);
    setSavedItineraries(prev => {
      const idx = prev.findIndex(i => i.id === updated.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = updated;
        return copy;
      }
      return [...prev, updated];
    });
  };

  const addActivityToDay = (dayNumber: number, period: 'morning' | 'afternoon' | 'evening', activity: ActivityItem) => {
    const newDays = activeItinerary.days.map(d => {
      if (d.dayNumber === dayNumber) {
        return {
          ...d,
          [period]: [...d[period], activity],
          dailyEstimatedCostUsd: d.dailyEstimatedCostUsd + activity.costUsd
        };
      }
      return d;
    });
    const totalCost = newDays.reduce((acc, curr) => acc + curr.dailyEstimatedCostUsd, 0);
    updateItinerary({
      ...activeItinerary,
      days: newDays,
      totalEstimatedCostUsd: totalCost,
      updatedAt: new Date().toISOString()
    });
  };

  const removeActivityFromDay = (dayNumber: number, period: 'morning' | 'afternoon' | 'evening', activityId: string) => {
    const newDays = activeItinerary.days.map(d => {
      if (d.dayNumber === dayNumber) {
        const target = d[period].find(a => a.id === activityId);
        const costDiff = target ? target.costUsd : 0;
        return {
          ...d,
          [period]: d[period].filter(a => a.id !== activityId),
          dailyEstimatedCostUsd: Math.max(0, d.dailyEstimatedCostUsd - costDiff)
        };
      }
      return d;
    });
    const totalCost = newDays.reduce((acc, curr) => acc + curr.dailyEstimatedCostUsd, 0);
    updateItinerary({
      ...activeItinerary,
      days: newDays,
      totalEstimatedCostUsd: totalCost,
      updatedAt: new Date().toISOString()
    });
  };

  const updateActivityInDay = (dayNumber: number, period: 'morning' | 'afternoon' | 'evening', activity: ActivityItem) => {
    const newDays = activeItinerary.days.map(d => {
      if (d.dayNumber === dayNumber) {
        const updatedPeriod = d[period].map(a => a.id === activity.id ? activity : a);
        return {
          ...d,
          [period]: updatedPeriod
        };
      }
      return d;
    });
    updateItinerary({
      ...activeItinerary,
      days: newDays,
      updatedAt: new Date().toISOString()
    });
  };

  const regenerateDayWithAI = async (dayNumber: number, promptModifier?: string) => {
    // Artificial delay to demonstrate real-time AI generation animation
    await new Promise(r => setTimeout(r, 900));

    const themes = [
      'Artisan Pottery, Secret Bamboo Path & Local Noodle Atelier',
      'Historical Shogun Castles, Zen Rock Gardens & Street Eats',
      'Panoramic Mountain Passes, Cedar Forests & Sunset Teahouses'
    ];
    const pickedTheme = themes[Math.floor(Math.random() * themes.length)];

    const newDays = activeItinerary.days.map(d => {
      if (d.dayNumber === dayNumber) {
        return {
          ...d,
          theme: pickedTheme,
          summary: `AI Re-synthesized day based on your preference (${promptModifier || 'Optimized flow'}): Highlights local artisans and relaxed pacing.`,
          morning: [
            {
              id: `ai-gen-m-${Date.now()}`,
              time: '08:30 AM',
              title: 'Ryoan-ji Famous 15-Stone Zen Rock Garden',
              category: 'Culture' as const,
              description: 'Meditative viewing of the enigmatic dry landscape garden before mid-day visitors arrive.',
              location: 'Ukyo Ward',
              durationMinutes: 90,
              costUsd: 5
            }
          ],
          afternoon: [
            {
              id: `ai-gen-a-${Date.now()}`,
              time: '01:00 PM',
              title: 'Handmade Soba Workshop & Tasting',
              category: 'Food' as const,
              description: 'Grind buckwheat on granite mills and roll your own artisanal soba noodles with wasabi broth.',
              location: 'Kita Ward Atelier',
              durationMinutes: 120,
              costUsd: 45
            }
          ],
          evening: [
            {
              id: `ai-gen-e-${Date.now()}`,
              time: '06:30 PM',
              title: 'Illuminated Night Walk along Shirakawa Canal',
              category: 'Sightseeing' as const,
              description: 'Willow trees and softly lit lanterns along stone footbridges.',
              location: 'Gion Shirakawa',
              durationMinutes: 90,
              costUsd: 0
            }
          ],
          dailyEstimatedCostUsd: 50
        };
      }
      return d;
    });

    const totalCost = newDays.reduce((acc, curr) => acc + curr.dailyEstimatedCostUsd, 0);
    updateItinerary({
      ...activeItinerary,
      days: newDays,
      totalEstimatedCostUsd: totalCost,
      updatedAt: new Date().toISOString()
    });
  };

  const optimizeBudgetWithAI = (reductionPercent: number) => {
    const original = activeItinerary.totalEstimatedCostUsd;
    const savings = Math.round(original * (reductionPercent / 100));
    const newTotal = original - savings;

    const changes = [
      `Switched 2 taxi journeys to Kyoto Rapid Transit pass (-$60)`,
      `Substituted private tour with high-rated small-group audio guide (-$110)`,
      `Suggested lunch at Michelin Bib Gourmand soba house instead of multi-course kaiseki (-$95)`
    ];

    updateItinerary({
      ...activeItinerary,
      totalEstimatedCostUsd: newTotal,
      updatedAt: new Date().toISOString()
    });

    return { original, newTotal, savings, changes };
  };

  const toggleWishlist = (type: 'destinations' | 'stays' | 'activities', id: string) => {
    setWishlist(prev => {
      const list = prev[type];
      const exists = list.includes(id);
      return {
        ...prev,
        [type]: exists ? list.filter(item => item !== id) : [...list, id]
      };
    });
  };

  const isWishlisted = (type: 'destinations' | 'stays' | 'activities', id: string) => {
    return wishlist[type].includes(id);
  };

  const createBooking = (bookingData: Omit<Booking, 'id' | 'bookingRef' | 'createdAt' | 'status' | 'paymentStatus'>): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      bookingRef: `TP-${bookingData.type.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      paymentStatus: 'paid'
    };

    setBookings(prev => [newBooking, ...prev]);

    // Also register as expense automatically
    addExpense({
      tripId: activeItinerary.id,
      title: `${newBooking.itemTitle} (${newBooking.type})`,
      category: newBooking.type === 'stay' ? 'Accommodation' : newBooking.type === 'flight' ? 'Flights' : 'Activities',
      amountUsd: newBooking.totalAmountUsd,
      date: new Date().toISOString().split('T')[0],
      paidBy: newBooking.guestDetails.primaryGuestName
    });

    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'cancelled', paymentStatus: 'refunded' } : b))
    );
  };

  const addExpense = (expense: Omit<ExpenseItem, 'id'>) => {
    const newExp: ExpenseItem = {
      ...expense,
      id: `exp-${Date.now()}`
    };
    setExpenses(prev => [newExp, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  return (
    <TripContext.Provider
      value={{
        activeItinerary,
        savedItineraries,
        wishlist,
        bookings,
        expenses,
        setActiveItinerary,
        updateItinerary,
        addActivityToDay,
        removeActivityFromDay,
        updateActivityInDay,
        regenerateDayWithAI,
        optimizeBudgetWithAI,
        toggleWishlist,
        isWishlisted,
        createBooking,
        cancelBooking,
        addExpense,
        deleteExpense
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};
