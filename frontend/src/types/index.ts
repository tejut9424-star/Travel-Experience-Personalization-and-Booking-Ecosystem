export type UserRole = 'traveler' | 'partner' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  phone?: string;
  currency: string;
  language: string;
  travelStyle?: string[];
  createdAt: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  tagline: string;
  description: string;
  image: string;
  gallery: string[];
  rating: number;
  reviewsCount: number;
  bestTimeToVisit: string;
  idealDurationDays: number;
  averageDailyCostUsd: number;
  climate: string;
  tags: string[];
  trending?: boolean;
  popular?: boolean;
  hiddenGem?: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  topAttractions: {
    id: string;
    name: string;
    image: string;
    category: string;
    description: string;
    estimatedTimeHours: number;
    entryFeeUsd: number;
  }[];
  localDishes: {
    name: string;
    description: string;
    mustTryLocation: string;
  }[];
  travelTips: string[];
}

export interface ActivityItem {
  id: string;
  time: string; // e.g. "09:00 AM"
  title: string;
  category: 'Sightseeing' | 'Culture' | 'Food' | 'Adventure' | 'Relaxation' | 'Transport';
  description: string;
  location: string;
  durationMinutes: number;
  costUsd: number;
  rating?: number;
  bookingRequired?: boolean;
  bookingRefId?: string;
  notes?: string;
}

export interface DayPlan {
  dayNumber: number;
  date: string;
  theme: string;
  summary: string;
  morning: ActivityItem[];
  afternoon: ActivityItem[];
  evening: ActivityItem[];
  accommodation: {
    name: string;
    type: string;
    estCostPerNightUsd: number;
    address: string;
  };
  dailyEstimatedCostUsd: number;
}

export interface Itinerary {
  id: string;
  userId: string;
  title: string;
  destination: string;
  country: string;
  coverImage: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  travelersCount: number;
  travelStyle: string; // 'Luxury' | 'Budget' | 'Adventure' | 'Family' | 'Cultural' | 'Relaxed'
  totalEstimatedCostUsd: number;
  currency: string;
  overview: string;
  packingList: string[];
  practicalTips: string[];
  days: DayPlan[];
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'saved' | 'completed';
  collaborators?: {
    email: string;
    role: 'editor' | 'viewer';
  }[];
}

export interface StayListing {
  id: string;
  name: string;
  type: 'Hotel' | 'Resort' | 'Villa' | 'Boutique Hotel' | 'Apartment';
  destinationId: string;
  city: string;
  country: string;
  image: string;
  gallery: string[];
  rating: number;
  reviewsCount: number;
  pricePerNightUsd: number;
  originalPriceUsd?: number;
  badge?: string;
  amenities: string[];
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distanceToCenterKm: number;
  cancellationPolicy: string;
  roomTypes: {
    id: string;
    name: string;
    capacity: number;
    bedType: string;
    pricePerNightUsd: number;
    amenities: string[];
    availableRooms: number;
  }[];
}

export interface FlightOption {
  id: string;
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  origin: {
    code: string;
    city: string;
    airport: string;
    departureTime: string;
  };
  destination: {
    code: string;
    city: string;
    airport: string;
    arrivalTime: string;
  };
  duration: string;
  stops: number;
  stopDetails?: string;
  cabinClass: 'Economy' | 'Premium Economy' | 'Business' | 'First Class';
  priceUsd: number;
  baggageAllowance: string;
  refundable: boolean;
  carbonEmissionsKg: number;
}

export interface ExperienceListing {
  id: string;
  title: string;
  category: 'Guided Tour' | 'Water Sports' | 'Culinary' | 'Hiking' | 'Wellness' | 'Photography' | 'Nightlife' | 'Adventure';
  destinationId: string;
  city: string;
  country: string;
  image: string;
  gallery: string[];
  rating: number;
  reviewsCount: number;
  durationHours: number;
  groupSizeMax: number;
  priceUsd: number;
  included: string[];
  languages: string[];
  highlights: string[];
  providerName: string;
  cancellationPolicy: string;
}

export interface TrainOption {
  id: string;
  trainNumber: string;
  operator: string;
  operatorLogo: string;
  origin: {
    station: string;
    city: string;
    departureTime: string;
  };
  destination: {
    station: string;
    city: string;
    arrivalTime: string;
  };
  duration: string;
  trainType: 'Bullet / High-Speed' | 'Express Intercity' | 'Panoramic Alpine' | 'Luxury Sleeper';
  classes: {
    name: 'Standard' | 'First Class' | 'Executive Panoramic' | 'Coupe Sleeper';
    priceUsd: number;
    availableSeats: number;
    amenities: string[];
  }[];
  punctualityRate: number;
  carbonSavingsVsFlightKg: number;
}

export interface BusOption {
  id: string;
  operator: string;
  operatorLogo: string;
  busType: 'Volvo Multi-Axle AC Sleeper' | 'Mercedes Executive Seater' | 'Luxury Tourist Coach' | 'Eco Electric Cruiser';
  origin: {
    city: string;
    boardingPoint: string;
    departureTime: string;
  };
  destination: {
    city: string;
    dropPoint: string;
    arrivalTime: string;
  };
  duration: string;
  priceUsd: number;
  rating: number;
  reviewsCount: number;
  seatsAvailable: number;
  amenities: string[];
  cancellationPolicy: string;
}

export interface CabOption {
  id: string;
  vehicleModel: string;
  category: 'Executive Sedan' | 'Luxury SUV' | 'Eco Electric' | 'Family Van' | 'Airport Chauffeur';
  image: string;
  serviceType: 'Airport Transfer' | 'City Hourly Rental' | 'Outstation Trip' | 'Local Drop';
  baseFareUsd: number;
  pricePerKmUsd: number;
  estimatedPriceUsd: number;
  passengerCapacity: number;
  luggageCapacity: number;
  driverRating: number;
  features: string[];
  freeCancellationMinutes: number;
}

export interface CarRentalOption {
  id: string;
  model: string;
  make: string;
  year: number;
  category: 'Compact' | 'SUV & 4x4' | 'Convertible' | 'Luxury Sedan' | 'Electric & Hybrid';
  image: string;
  transmission: 'Automatic' | 'Manual';
  seats: number;
  doors: number;
  fuelType: 'Electric' | 'Hybrid' | 'Petrol' | 'Diesel';
  pricePerDayUsd: number;
  originalPricePerDayUsd?: number;
  rating: number;
  reviewsCount: number;
  supplier: string;
  supplierLogo: string;
  pickupLocation: string;
  mileageLimit: string;
  features: string[];
  insuranceIncluded: boolean;
}

export interface EventListing {
  id: string;
  title: string;
  eventType: 'Concert & Live Music' | 'Cultural Festival' | 'Theatre & Performing Arts' | 'Sports & Racing' | 'Food & Wine Gala';
  venue: string;
  city: string;
  country: string;
  date: string;
  time: string;
  image: string;
  gallery: string[];
  rating: number;
  reviewsCount: number;
  startingPriceUsd: number;
  description: string;
  performers: string[];
  seatingTiers: {
    id: string;
    name: 'VIP Front Row' | 'Premium Reserved' | 'Grandstand / Mezzanine' | 'General Admission';
    priceUsd: number;
    perks: string[];
    availableTickets: number;
  }[];
}

export interface RestaurantListing {
  id: string;
  name: string;
  cuisine: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  avgPricePerPersonUsd: number;
  rating: number;
  reviewsCount: number;
  city: string;
  country: string;
  address: string;
  image: string;
  gallery: string[];
  michelinStars?: number;
  description: string;
  signatureDishes: string[];
  features: string[];
  dressCode: string;
  timeSlots: string[];
}

export interface CruiseListing {
  id: string;
  title: string;
  cruiseLine: string;
  shipName: string;
  image: string;
  gallery: string[];
  rating: number;
  reviewsCount: number;
  durationNights: number;
  departurePort: string;
  portsOfCall: string[];
  startingPriceUsd: number;
  departureDates: string[];
  highlights: string[];
  cabinTypes: {
    id: string;
    name: 'Interior Stateroom' | 'Oceanview Window' | 'Private Balcony' | 'Presidential Suite';
    priceUsd: number;
    capacity: number;
    amenities: string[];
    availableCabins: number;
  }[];
}

export interface Booking {
  id: string;
  bookingRef: string;
  userId: string;
  type: 'stay' | 'flight' | 'activity' | 'package' | 'train' | 'bus' | 'cab' | 'car' | 'event' | 'restaurant' | 'cruise' | 'experience';
  itemTitle: string;
  itemSubtitle: string;
  itemImage: string;
  itemId: string;
  startDate: string;
  endDate?: string;
  guestCount: number;
  totalAmountUsd: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'refunded';
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  paymentMethod: string;
  createdAt: string;
  guestDetails: {
    primaryGuestName: string;
    email: string;
    phone: string;
    specialRequests?: string;
  };
  details: Record<string, any>;
}

export interface ExpenseItem {
  id: string;
  tripId: string;
  title: string;
  category: 'Accommodation' | 'Flights' | 'Food' | 'Activities' | 'Shopping' | 'Transport' | 'Other';
  amountUsd: number;
  date: string;
  paidBy: string;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  suggestedPrompts?: string[];
  actionLink?: {
    text: string;
    type: 'destination' | 'stay' | 'flight' | 'itinerary';
    id?: string;
  };
}

export interface TravelGuide {
  id: string;
  title: string;
  slug: string;
  destination: string;
  country: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  readTimeMinutes: number;
  publishedAt: string;
  coverImage: string;
  summary: string;
  sections: {
    title: string;
    content: string;
    image?: string;
  }[];
  tags: string[];
}
