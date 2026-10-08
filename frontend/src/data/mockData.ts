import { 
  Destination, 
  StayListing, 
  FlightOption, 
  ExperienceListing, 
  TravelGuide, 
  Itinerary,
  TrainOption,
  BusOption,
  CabOption,
  CarRentalOption,
  EventListing,
  RestaurantListing,
  CruiseListing
} from '../types';

export const mockDestinations: Destination[] = [
  {
    id: 'dest-kyoto',
    name: 'Kyoto',
    country: 'Japan',
    region: 'East Asia',
    tagline: 'Ancient shrines, bamboo forests, and timeless zen gardens',
    description: 'Kyoto, once the capital of Japan, is a city on the island of Honshu. It is famous for its numerous classical Buddhist temples, gardens, imperial palaces, Shinto shrines, and traditional wooden houses.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewsCount: 3840,
    bestTimeToVisit: 'March to May & October to November',
    idealDurationDays: 5,
    averageDailyCostUsd: 145,
    climate: 'Temperate with distinct cherry blossom and autumn foliage seasons',
    tags: ['Culture', 'Temples', 'Culinary', 'Zen', 'Photography'],
    trending: true,
    popular: true,
    coordinates: { lat: 35.0116, lng: 135.7681 },
    topAttractions: [
      {
        id: 'att-fushimi',
        name: 'Fushimi Inari Shrine',
        image: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=600&q=80',
        category: 'Shinto Shrine',
        description: 'Iconic mountain shrine renowned for its thousands of vibrant vermilion torii gates winding through tranquil woodland.',
        estimatedTimeHours: 3,
        entryFeeUsd: 0
      },
      {
        id: 'att-arashiyama',
        name: 'Arashiyama Bamboo Grove',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
        category: 'Nature & Sightseeing',
        description: 'Immersive path flanked by soaring green bamboo stalks that whisper as the breeze blows.',
        estimatedTimeHours: 2,
        entryFeeUsd: 0
      },
      {
        id: 'att-kinkaku',
        name: 'Kinkaku-ji (Golden Pavilion)',
        image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=600&q=80',
        category: 'Buddhist Temple',
        description: 'Zen Buddhist temple whose top two floors are completely covered in dazzling gold leaf, reflected across the Kyoko-chi mirror pond.',
        estimatedTimeHours: 1.5,
        entryFeeUsd: 4
      }
    ],
    localDishes: [
      { name: 'Kaiseki Ryori', description: 'Multi-course traditional Japanese dinner celebrating seasonal ingredients and artistic plating.', mustTryLocation: 'Gion District' },
      { name: 'Kyoto Matcha Parfait', description: 'Layered dessert of ceremonial Uji green tea ice cream, dango mochi, and red bean paste.', mustTryLocation: 'Tsujiri Tea House' },
      { name: 'Yudofu (Simmered Tofu)', description: 'Delicate silky tofu simmered in kelp broth, dipped in fragrant ponzu.', mustTryLocation: 'Nanzen-ji Neighborhood' }
    ],
    travelTips: [
      'Get the ICOCA transit card for seamless bus and subway hopping.',
      'Visit Fushimi Inari at sunrise (6:00 AM) to avoid tourist crowds and get magical photos.',
      'Book traditional Kaiseki dinners at least 3 weeks in advance.'
    ]
  },
  {
    id: 'dest-amalfi',
    name: 'Amalfi Coast',
    country: 'Italy',
    region: 'Southern Europe',
    tagline: 'Cliffside pastel villages overlooking the sapphire Tyrrhenian Sea',
    description: 'A 50-kilometer stretch of coastline along the southern edge of Italy’s Sorrentine Peninsula, famed for its dramatic cliffs, pastel villas, terraced lemon orchards, and coastal gastronomy.',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.95,
    reviewsCount: 2910,
    bestTimeToVisit: 'May to September',
    idealDurationDays: 6,
    averageDailyCostUsd: 220,
    climate: 'Mediterranean sunny, warm summers and mild sea breezes',
    tags: ['Coastal', 'Luxury', 'Romance', 'Wine & Dine', 'Scenic Views'],
    trending: true,
    popular: true,
    coordinates: { lat: 40.6340, lng: 14.6027 },
    topAttractions: [
      {
        id: 'att-positano',
        name: 'Positano Cliffside Village',
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
        category: 'Historic Village',
        description: 'Cascading candy-colored villas tumbling down steep cliffs to Marina Grande pebble beach.',
        estimatedTimeHours: 4,
        entryFeeUsd: 0
      },
      {
        id: 'att-gods-path',
        name: 'Path of the Gods (Sentiero degli Dei)',
        image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80',
        category: 'Hiking & Scenic Trail',
        description: 'Epic clifftop hike between Bomerano and Nocelle offering panoramic vistas of the entire coast and Capri.',
        estimatedTimeHours: 4.5,
        entryFeeUsd: 0
      }
    ],
    localDishes: [
      { name: 'Scialatielli ai Frutti di Mare', description: 'Fresh thick pasta ribbons tossed with clams, mussels, and wild cherry tomatoes.', mustTryLocation: 'Trattoria da Gemma' },
      { name: 'Delizia al Limone', description: 'Light sponge dome filled with Sorrento lemon pastry cream and limoncello glaze.', mustTryLocation: 'Pasticceria Pansa' }
    ],
    travelTips: [
      'Use high-speed coastal ferries rather than buses to avoid serpentine cliffside traffic.',
      'Pack comfortable walking shoes with good grip for steep cobblestone stairways.'
    ]
  },
  {
    id: 'dest-bali',
    name: 'Bali & Ubud',
    country: 'Indonesia',
    region: 'Southeast Asia',
    tagline: 'Tropical serenity, sacred water temples, and emerald rice terraces',
    description: 'Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches, coral reefs, and deeply spiritual Hindu culture.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.88,
    reviewsCount: 4620,
    bestTimeToVisit: 'April to October (Dry Season)',
    idealDurationDays: 7,
    averageDailyCostUsd: 75,
    climate: 'Tropical warm and humid with refreshing mountain breezes in Ubud',
    tags: ['Wellness', 'Beaches', 'Budget Friendly', 'Spiritual', 'Adventure'],
    trending: false,
    popular: true,
    coordinates: { lat: -8.5069, lng: 115.2625 },
    topAttractions: [
      {
        id: 'att-tegalalang',
        name: 'Tegalalang Rice Terraces',
        image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80',
        category: 'UNESCO Landscape',
        description: 'Dramatic stepped rice paddies engineered with ancient Balinese subak cooperative irrigation.',
        estimatedTimeHours: 2.5,
        entryFeeUsd: 2
      }
    ],
    localDishes: [
      { name: 'Nasi Campur Bali', description: 'Aromatic steamed rice surrounded by skewers of sate lilit, lawar vegetables, and spicy sambal matah.', mustTryLocation: 'Warung Babi Guling Ibu Oka' }
    ],
    travelTips: [
      'Hire a private local driver for $40/day for flexible day trips around the island.',
      'Wear a sarong when entering any Balinese temple.'
    ]
  },
  {
    id: 'dest-reykjavik',
    name: 'Reykjavik & Golden Circle',
    country: 'Iceland',
    region: 'Northern Europe',
    tagline: 'Land of geysers, dancing Northern Lights, and geothermal lagoons',
    description: 'Iceland’s coastal capital where dramatic Nordic landscapes meet geothermal marvels, black sand beaches, thundering waterfalls, and the celestial aurora borealis.',
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.92,
    reviewsCount: 1980,
    bestTimeToVisit: 'September to March (Aurora) or June to August (Midnight Sun)',
    idealDurationDays: 6,
    averageDailyCostUsd: 210,
    climate: 'Subpolar oceanic with crisp arctic air and geothermal warmth',
    tags: ['Nature', 'Aurora', 'Geothermal', 'Road Trip', 'Adventure'],
    trending: true,
    hiddenGem: false,
    coordinates: { lat: 64.1466, lng: -21.9426 },
    topAttractions: [
      {
        id: 'att-blue-lagoon',
        name: 'Blue Lagoon Geothermal Spa',
        image: 'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&w=600&q=80',
        category: 'Geothermal Spa',
        description: 'Mineral-rich milky blue waters situated in an obsidian lava field, naturally heated to 38°C.',
        estimatedTimeHours: 3,
        entryFeeUsd: 75
      }
    ],
    localDishes: [
      { name: 'Kjötsúpa', description: 'Traditional hearty Icelandic lamb soup with root vegetables and wild herbs.', mustTryLocation: 'Icelandic Street Food' }
    ],
    travelTips: [
      'Rent a 4x4 vehicle to safely explore Ring Road and F-roads during winter.',
      'Check Vedur.is daily for Northern Lights aurora forecasts and road conditions.'
    ]
  },
  {
    id: 'dest-swiss-alps',
    name: 'Zermatt & Swiss Alps',
    country: 'Switzerland',
    region: 'Central Europe',
    tagline: 'Iconic Matterhorn vistas, glacier trains, and alpine chalet luxury',
    description: 'A car-free mountain paradise nestled at the foot of the pyramid-shaped Matterhorn peak, famous for premier ski slopes, cogwheel railways, and fondue culture.',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.96,
    reviewsCount: 3120,
    bestTimeToVisit: 'December to April (Snow) or July to September (Hiking)',
    idealDurationDays: 5,
    averageDailyCostUsd: 260,
    climate: 'Alpine crisp mountain climate with snowy winters and pristine summers',
    tags: ['Luxury', 'Mountains', 'Skiing', 'Alpine', 'Scenic Trains'],
    trending: true,
    popular: true,
    coordinates: { lat: 45.9765, lng: 7.7491 },
    topAttractions: [
      {
        id: 'att-gornergrat',
        name: 'Gornergrat Cogwheel Railway',
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80',
        category: 'Mountain Railway',
        description: 'Open-air cogwheel railway climbing to 3,089m with unmatched panoramic views of 29 four-thousand-meter peaks.',
        estimatedTimeHours: 3.5,
        entryFeeUsd: 85
      }
    ],
    localDishes: [
      { name: 'Valais Fondue & Raclette', description: 'Melted Gruyère and Emmental cheese with crusty bread and mountain potatoes.', mustTryLocation: 'Restaurant Schäferstube' }
    ],
    travelTips: [
      'Purchase a Swiss Travel Pass for unlimited rides on panoramic trains and mountain boats.',
      'Zermatt is completely car-free; arrive via the scenic Matterhorn Gotthard Bahn.'
    ]
  },
  {
    id: 'dest-santorini',
    name: 'Santorini & Oia',
    country: 'Greece',
    region: 'Southern Europe',
    tagline: 'White-washed caldera cliffs, blue domes, and legendary sunsets',
    description: 'The crown jewel of the Aegean Cyclades, formed by a cataclysmic volcanic eruption creating sheer red and black cliffs topped with brilliant white architecture.',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.91,
    reviewsCount: 5200,
    bestTimeToVisit: 'May to October',
    idealDurationDays: 4,
    averageDailyCostUsd: 230,
    climate: 'Dry sunny Mediterranean with invigorating Meltemi sea breezes',
    tags: ['Romance', 'Sunsets', 'Wine Tasting', 'Architecture', 'Island Hopping'],
    popular: true,
    coordinates: { lat: 36.3932, lng: 25.4615 },
    topAttractions: [
      {
        id: 'att-oia-sunset',
        name: 'Oia Castle Sunset Point',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80',
        category: 'Panoramic Viewpoint',
        description: 'Celebrated viewpoint where the sun plunges into the Aegean Sea against windmills and caldera walls.',
        estimatedTimeHours: 2,
        entryFeeUsd: 0
      }
    ],
    localDishes: [
      { name: 'Tomatokeftedes', description: 'Crispy Santorini cherry tomato fritters with fresh mint, oregano, and feta cheese.', mustTryLocation: 'Ammoudi Fish Tavern' }
    ],
    travelTips: [
      'Book catamaran sunset cruises around the volcanic caldera at least one week ahead.',
      'Take the scenic 10km caldera walking trail from Fira to Oia in the early morning.'
    ]
  }
];

export const mockStays: StayListing[] = [
  {
    id: 'stay-kyoto-hoshinoya',
    name: 'Hoshinoya Kyoto Luxury Riverside Ryokan',
    type: 'Boutique Hotel',
    destinationId: 'dest-kyoto',
    city: 'Kyoto',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.96,
    reviewsCount: 340,
    pricePerNightUsd: 480,
    originalPriceUsd: 550,
    badge: 'AI Curated Top Pick',
    amenities: ['Private Onsen', 'Kaiseki Dining', 'Riverside Boat Transfer', 'Zen Tea Garden', 'Free High-Speed Wi-Fi', 'Concierge'],
    address: 'Arashiyama, Ukyo Ward, Kyoto, 616-0007',
    coordinates: { lat: 35.013, lng: 135.676 },
    distanceToCenterKm: 6.2,
    cancellationPolicy: 'Free cancellation up to 7 days before check-in',
    roomTypes: [
      {
        id: 'room-ryokan-tatami',
        name: 'Mizu Deluxe River View Suite',
        capacity: 2,
        bedType: 'Traditional Futon on Cypress Wood Platform',
        pricePerNightUsd: 480,
        amenities: ['Riverfront View', 'Hinoki Cypress Tub', 'Yukata Robes', 'Bose Audio'],
        availableRooms: 3
      },
      {
        id: 'room-ryokan-grand',
        name: 'Yama Grand Pavilion',
        capacity: 4,
        bedType: '2 King Beds + Tatami Living Space',
        pricePerNightUsd: 790,
        amenities: ['Private Balcony', 'Outdoor Cedar Bath', 'Private Butler'],
        availableRooms: 1
      }
    ]
  },
  {
    id: 'stay-amalfi-monastero',
    name: 'Monastero Santa Rosa Hotel & Spa',
    type: 'Resort',
    destinationId: 'dest-amalfi',
    city: 'Conca dei Marini',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.98,
    reviewsCount: 420,
    pricePerNightUsd: 650,
    originalPriceUsd: 750,
    badge: 'Michelin Starred Dining',
    amenities: ['Infinity Cliffside Pool', 'Thermal Suite Spa', 'Michelin Restaurant', 'Sea View Terrace', 'Limousine Boat'],
    address: 'Via Roma 2, 84010 Conca dei Marini, Amalfi Coast',
    coordinates: { lat: 40.617, lng: 14.571 },
    distanceToCenterKm: 3.5,
    cancellationPolicy: 'Free cancellation up to 14 days before arrival',
    roomTypes: [
      {
        id: 'room-sea-suite',
        name: 'Caldera Cliff Ocean Suite',
        capacity: 2,
        bedType: '1 King Bed',
        pricePerNightUsd: 650,
        amenities: ['Sea View Terrace', 'Jacuzzi', 'Artisan Mini Bar'],
        availableRooms: 2
      }
    ]
  },
  {
    id: 'stay-bali-viceroy',
    name: 'Viceroy Bali Valley Sanctuary',
    type: 'Villa',
    destinationId: 'dest-bali',
    city: 'Ubud',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.93,
    reviewsCount: 890,
    pricePerNightUsd: 280,
    originalPriceUsd: 340,
    badge: 'Private Pool Included',
    amenities: ['Private Heated Plunge Pool', 'Jungle View', 'Helipad', 'Apres Spa', 'Organic Breakfast'],
    address: 'Jln. Lanyahan, Br Nagi, Ubud 80571',
    coordinates: { lat: -8.497, lng: 115.275 },
    distanceToCenterKm: 2.1,
    cancellationPolicy: 'Free cancellation up to 48 hours prior',
    roomTypes: [
      {
        id: 'room-pool-villa',
        name: 'Terrace Private Pool Villa',
        capacity: 2,
        bedType: '1 King Four-Poster Bed',
        pricePerNightUsd: 280,
        amenities: ['Valley Infinity Pool', 'Bespoke Balinese Gazebo', 'Espresso Bar'],
        availableRooms: 4
      }
    ]
  },
  {
    id: 'stay-zermatt-omnia',
    name: 'The Omnia Mountain Lodge',
    type: 'Hotel',
    destinationId: 'dest-swiss-alps',
    city: 'Zermatt',
    country: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.97,
    reviewsCount: 510,
    pricePerNightUsd: 520,
    badge: 'Matterhorn Panorama',
    amenities: ['Indoor/Outdoor Pool with Matterhorn View', 'Finnish Sauna', 'Whiskey Bar', 'Ski Storage with Dryers'],
    address: 'Auf dem Fels, 3920 Zermatt, Switzerland',
    coordinates: { lat: 45.981, lng: 7.749 },
    distanceToCenterKm: 0.3,
    cancellationPolicy: 'Flexible cancellation policy with refundable deposit',
    roomTypes: [
      {
        id: 'room-matterhorn-suite',
        name: 'Matterhorn Alpine Suite',
        capacity: 2,
        bedType: '1 Swiss Pine King Bed',
        pricePerNightUsd: 520,
        amenities: ['Matterhorn Balcony', 'Wood-burning Fireplace', 'Bose Surround'],
        availableRooms: 2
      }
    ]
  }
];

export const mockFlights: FlightOption[] = [
  {
    id: 'fl-101',
    airline: 'All Nippon Airways (ANA)',
    airlineLogo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=120&q=80',
    flightNumber: 'NH 108',
    origin: { code: 'SFO', city: 'San Francisco', airport: 'San Francisco Intl', departureTime: '11:20 AM' },
    destination: { code: 'KIX', city: 'Osaka / Kyoto', airport: 'Kansai Intl', arrivalTime: '03:45 PM (+1)' },
    duration: '11h 25m',
    stops: 0,
    cabinClass: 'Economy',
    priceUsd: 840,
    baggageAllowance: '2 checked bags (23kg each)',
    refundable: true,
    carbonEmissionsKg: 420
  },
  {
    id: 'fl-102',
    airline: 'Japan Airlines (JAL)',
    airlineLogo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=120&q=80',
    flightNumber: 'JL 001',
    origin: { code: 'JFK', city: 'New York', airport: 'John F. Kennedy Intl', departureTime: '01:15 PM' },
    destination: { code: 'HND', city: 'Tokyo / Kyoto Bullet', airport: 'Haneda Airport', arrivalTime: '04:30 PM (+1)' },
    duration: '14h 15m',
    stops: 0,
    cabinClass: 'Business',
    priceUsd: 3250,
    baggageAllowance: '3 checked bags (32kg each) + Sky Lounge',
    refundable: true,
    carbonEmissionsKg: 890
  },
  {
    id: 'fl-103',
    airline: 'ITA Airways & Lufthansa',
    airlineLogo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=120&q=80',
    flightNumber: 'AZ 609',
    origin: { code: 'JFK', city: 'New York', airport: 'John F. Kennedy', departureTime: '05:30 PM' },
    destination: { code: 'NAP', city: 'Naples (Amalfi)', airport: 'Capodichino', arrivalTime: '08:40 AM (+1)' },
    duration: '9h 10m',
    stops: 1,
    stopDetails: '1h 20m layover in Rome (FCO)',
    cabinClass: 'Economy',
    priceUsd: 790,
    baggageAllowance: '1 checked bag (23kg)',
    refundable: true,
    carbonEmissionsKg: 380
  },
  {
    id: 'fl-104',
    airline: 'Swiss International Air Lines',
    airlineLogo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=120&q=80',
    flightNumber: 'LX 19',
    origin: { code: 'EWR', city: 'New York / Newark', airport: 'Newark Liberty', departureTime: '06:45 PM' },
    destination: { code: 'ZRH', city: 'Zurich (Alps)', airport: 'Zurich Kloten', arrivalTime: '08:30 AM (+1)' },
    duration: '7h 45m',
    stops: 0,
    cabinClass: 'Economy',
    priceUsd: 695,
    baggageAllowance: '1 checked bag (23kg) + Ski gear free',
    refundable: true,
    carbonEmissionsKg: 310
  }
];

export const mockExperiences: ExperienceListing[] = [
  {
    id: 'exp-kyoto-tea',
    title: 'Private Zen Tea Ceremony with a 15th-Gen Grandmaster',
    category: 'Culinary',
    destinationId: 'dest-kyoto',
    city: 'Kyoto',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80'],
    rating: 4.98,
    reviewsCount: 230,
    durationHours: 2,
    groupSizeMax: 6,
    priceUsd: 95,
    included: ['Ceremonial Matcha', 'Handcrafted Wagashi Confections', 'Kimono Dressing', 'Calligraphy Keepsake'],
    languages: ['English', 'Japanese'],
    highlights: ['Exclusive access to 300-year-old teahouse garden', 'Learn ancient mindfulness techniques', 'Photo session in traditional kimono'],
    providerName: 'Kyoto Heritage Experiences',
    cancellationPolicy: 'Full refund up to 24 hours in advance'
  },
  {
    id: 'exp-amalfi-boat',
    title: 'Capri & Secret Sea Caves Private Riva Speedboat Cruise',
    category: 'Water Sports',
    destinationId: 'dest-amalfi',
    city: 'Amalfi',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80'],
    rating: 4.99,
    reviewsCount: 410,
    durationHours: 6,
    groupSizeMax: 8,
    priceUsd: 180,
    included: ['Prosecco & Fresh Fruit', 'Snorkeling Equipment', 'Skipper Guide', 'Fuel & Marine Park Passes'],
    languages: ['English', 'Italian', 'French'],
    highlights: ['Swim inside the Green & White Grottoes', 'Cruise past the majestic Faraglioni Rock arches', 'Disembark on Capri for designer shopping'],
    providerName: 'Amalfi Blue Yachting',
    cancellationPolicy: 'Weather guarantee or full refund'
  },
  {
    id: 'exp-bali-rafting',
    title: 'Ayung River Jungle White Water Rafting & Waterfall Trek',
    category: 'Adventure',
    destinationId: 'dest-bali',
    city: 'Ubud',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'],
    rating: 4.91,
    reviewsCount: 650,
    durationHours: 4,
    groupSizeMax: 12,
    priceUsd: 45,
    included: ['Safety Gear & Certified Guide', 'Buffet Lunch Overlooking Gorge', 'Hotel Pickup & Drop-off'],
    languages: ['English', 'Indonesian'],
    highlights: ['Navigate 33 thrilling class II-III rapids', 'Pass carved stone river reliefs and hidden waterfalls'],
    providerName: 'Bali Adventure Rafting Co.',
    cancellationPolicy: 'Free cancellation 24h prior'
  }
];

export const mockTravelGuides: TravelGuide[] = [
  {
    id: 'guide-kyoto-secrets',
    title: 'The Ultimate AI-Curated Guide to Kyoto Beyond the Crowds',
    slug: 'kyoto-secrets-guide',
    destination: 'Kyoto',
    country: 'Japan',
    author: {
      name: 'Kenji Sato & Tripora AI',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      role: 'Cultural Historian & Travel Specialist'
    },
    readTimeMinutes: 7,
    publishedAt: '2026-09-15',
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
    summary: 'Discover hidden moss temples in Ohara, sunrise shrine walks, secret matcha ateliers, and seasonal etiquette tips for an unforgettable journey in Japan’s old capital.',
    sections: [
      {
        title: '1. Timing Your Visits with Astronomical Precision',
        content: 'Kyoto’s most celebrated sights can become crowded by 9:30 AM. Use Tripora AI’s pacing engine to schedule early morning visits (6:00 AM – 8:00 AM) to Fushimi Inari and Arashiyama Bamboo Grove. You’ll experience magical morning mist, serene birdsong, and completely uncrowded photo opportunities.'
      },
      {
        title: '2. The Art of the Micro-Season Kaiseki',
        content: 'Kyoto culinary masters divide the year into 72 micro-seasons (Kō). In autumn, look for matsutake mushroom broths in earthen pots (Dobin Mushi) and candied ginkgo nuts. In spring, delicate bamboo shoots (Takenoko) and sakura flower infusions take center stage.'
      }
    ],
    tags: ['Kyoto', 'Culture', 'Culinary', 'Hidden Gems', 'Zen']
  },
  {
    id: 'guide-amalfi-budget-luxury',
    title: 'Mastering the Amalfi Coast: How to Travel in Luxury Without Overpaying',
    slug: 'amalfi-coast-smart-luxury',
    destination: 'Amalfi Coast',
    country: 'Italy',
    author: {
      name: 'Elena Rossi',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
      role: 'Mediterranean Travel Curator'
    },
    readTimeMinutes: 6,
    publishedAt: '2026-09-28',
    coverImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80',
    summary: 'Insider strategies for coastal transport, booking cliffside dining, and choosing between Positano, Ravello, and Conca dei Marini.',
    sections: [
      {
        title: 'Choosing Your Home Base Wisely',
        content: 'While Positano has international fame, staying in tranquil towns like Ravello or Praiano cuts nightly stay costs by 35% while granting access to cliffside views and quieter lemon grove trails.'
      }
    ],
    tags: ['Amalfi', 'Italy', 'Luxury', 'Budget Strategy', 'Coastal']
  }
];

export const mockDefaultItinerary: Itinerary = {
  id: 'itin-kyoto-7d',
  userId: 'usr-demo-01',
  title: '7-Day Zen, Temples & Culinary Splendors of Kyoto',
  destination: 'Kyoto',
  country: 'Japan',
  coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
  startDate: '2026-10-15',
  endDate: '2026-10-21',
  durationDays: 7,
  travelersCount: 2,
  travelStyle: 'Cultural & Culinary',
  totalEstimatedCostUsd: 1980,
  currency: 'USD',
  overview: 'A balanced itinerary blending UNESCO World Heritage shrines, private bamboo tea tastings, high-speed rail trips to Nara, and Michelin-starred dining in historic Gion.',
  packingList: [
    'Slip-on comfortable walking shoes (for frequent temple entry)',
    'Lightweight rain jacket / compact umbrella',
    'Universal power adapter (Type A/B)',
    'Pocket Wi-Fi device / e-SIM voucher',
    'Smart casual attire for Kaiseki dinners'
  ],
  practicalTips: [
    'Download the Suica/Pasmo digital card to your Apple/Google Wallet.',
    'Temple sanctuaries require shoes off; pack fresh socks daily.',
    'Tipping is not customary in Japan; exceptional service is already standard.'
  ],
  status: 'saved',
  createdAt: '2026-10-01T10:00:00Z',
  updatedAt: '2026-10-02T15:30:00Z',
  days: [
    {
      dayNumber: 1,
      date: '2026-10-15',
      theme: 'Arrival, Historic Gion & Lanterns of Pontocho',
      summary: 'Arrive at Kansai Intl Airport, take the Haruka Express to Kyoto Station, check into your riverside ryokan, and stroll through historic geisha alleys.',
      dailyEstimatedCostUsd: 280,
      accommodation: {
        name: 'Hoshinoya Kyoto Luxury Ryokan',
        type: 'Ryokan',
        estCostPerNightUsd: 480,
        address: 'Arashiyama, Kyoto'
      },
      morning: [
        {
          id: 'act-1-1',
          time: '10:30 AM',
          title: 'Haruka Express Train Arrival at Kyoto Station',
          category: 'Transport',
          description: 'Scenic 75-minute direct train ride from KIX airport right into Kyoto Station with views of Japanese countryside.',
          location: 'Kyoto Station',
          durationMinutes: 75,
          costUsd: 28,
          bookingRequired: true
        }
      ],
      afternoon: [
        {
          id: 'act-1-2',
          time: '02:00 PM',
          title: 'Check-in & Welcome Matcha at Ryokan',
          category: 'Relaxation',
          description: 'Wooden boat transfer along the Oi River to check into your serene cedar suite with garden views.',
          location: 'Arashiyama River Basin',
          durationMinutes: 90,
          costUsd: 0
        },
        {
          id: 'act-1-3',
          time: '04:30 PM',
          title: 'Walking Tour of Historic Gion & Hanami-koji',
          category: 'Culture',
          description: 'Cobblestone lanes preserved from the Edo period, traditional machiya teahouses, and occasional glimpses of geiko artisans.',
          location: 'Gion District',
          durationMinutes: 120,
          costUsd: 0
        }
      ],
      evening: [
        {
          id: 'act-1-4',
          time: '07:30 PM',
          title: 'Dinner at Pontocho Alley Waterfront Kawatoko',
          category: 'Food',
          description: 'Dining on elevated wooden platforms overlooking the Kamogawa River, savoring seasonal grilled wagyu and Kyoto vegetables.',
          location: 'Pontocho Alley',
          durationMinutes: 120,
          costUsd: 85
        }
      ]
    },
    {
      dayNumber: 2,
      date: '2026-10-16',
      theme: 'Sunrise Torii Gates, Fushimi Sake & Golden Pavilion',
      summary: 'Beat the crowds at Fushimi Inari Taisha, visit the Golden Pavilion Kinkaku-ji, and taste sake brewed in centuries-old cedar vats.',
      dailyEstimatedCostUsd: 140,
      accommodation: {
        name: 'Hoshinoya Kyoto Luxury Ryokan',
        type: 'Ryokan',
        estCostPerNightUsd: 480,
        address: 'Arashiyama, Kyoto'
      },
      morning: [
        {
          id: 'act-2-1',
          time: '06:30 AM',
          title: 'Sunrise Walk through Fushimi Inari Torii Path',
          category: 'Sightseeing',
          description: 'Hike through 10,000 orange-red torii gates up Mount Inari in peaceful morning silence.',
          location: 'Fushimi Inari Taisha',
          durationMinutes: 150,
          costUsd: 0
        }
      ],
      afternoon: [
        {
          id: 'act-2-2',
          time: '12:00 PM',
          title: 'Udon & Tempura Lunch at Omen Ginkakuji',
          category: 'Food',
          description: 'Handmade wheat noodles served with chilled mountain herbs, roasted sesame, and crispy seasonal vegetable tempura.',
          location: 'Sakyo Ward',
          durationMinutes: 60,
          costUsd: 22
        },
        {
          id: 'act-2-3',
          time: '02:00 PM',
          title: 'Kinkaku-ji (The Golden Pavilion) & Zen Garden',
          category: 'Culture',
          description: 'Marvel at the gold-leaf Zen sanctuary reflecting in the mirror pond, followed by a stroll through the dry-stone landscaped garden.',
          location: 'Kita Ward',
          durationMinutes: 90,
          costUsd: 5
        }
      ],
      evening: [
        {
          id: 'act-2-4',
          time: '06:00 PM',
          title: 'Fushimi Sake Tasting & Izakaya Feast',
          category: 'Food',
          description: 'Sample 5 distinct local junmai daiginjo sakes paired with charcoal yakitori and sashimi.',
          location: 'Fushimi Sake District',
          durationMinutes: 120,
          costUsd: 65
        }
      ]
    },
    {
      dayNumber: 3,
      date: '2026-10-17',
      theme: 'Arashiyama Bamboo Forest & Tenryu-ji Dragon Temple',
      summary: 'Immerse in the emerald bamboo forest, explore the UNESCO World Heritage Tenryu-ji Zen garden, and cross the romantic Togetsukyo Bridge.',
      dailyEstimatedCostUsd: 110,
      accommodation: {
        name: 'Hoshinoya Kyoto Luxury Ryokan',
        type: 'Ryokan',
        estCostPerNightUsd: 480,
        address: 'Arashiyama, Kyoto'
      },
      morning: [
        {
          id: 'act-3-1',
          time: '08:00 AM',
          title: 'Arashiyama Bamboo Grove Walk & Tenryu-ji',
          category: 'Sightseeing',
          description: 'Wander the towering green bamboo grove followed by exploring the 14th-century cloud dragon ceiling at Tenryu-ji temple.',
          location: 'Arashiyama',
          durationMinutes: 120,
          costUsd: 6
        }
      ],
      afternoon: [
        {
          id: 'act-3-2',
          time: '01:30 PM',
          title: 'Private Zen Tea Ceremony Experience',
          category: 'Culture',
          description: 'Traditional tea preparation masterclass in a historic teahouse with ceremonial Uji matcha.',
          location: 'Arashiyama Tea Pavilion',
          durationMinutes: 90,
          costUsd: 65,
          bookingRequired: true
        }
      ],
      evening: [
        {
          id: 'act-3-3',
          time: '07:00 PM',
          title: 'Shukubo Buddhist Vegetarian (Shojin Ryori) Dinner',
          category: 'Food',
          description: 'Pure plant-based culinary art perfected by Zen monks, featuring sesame tofu, lotus root, and seasonal mountain greens.',
          location: 'Shigetsu at Tenryu-ji',
          durationMinutes: 90,
          costUsd: 45
        }
      ]
    }
  ]
};

export const mockTrains: TrainOption[] = [
  {
    id: 'train-shinkansen-nozomi',
    trainNumber: 'Nozomi N700S #219',
    operator: 'JR Central Shinkansen',
    operatorLogo: '🚄',
    origin: {
      station: 'Tokyo Station (Grand Central)',
      city: 'Tokyo',
      departureTime: '08:15 AM'
    },
    destination: {
      station: 'Kyoto Station',
      city: 'Kyoto',
      arrivalTime: '10:30 AM'
    },
    duration: '2h 15m',
    trainType: 'Bullet / High-Speed',
    punctualityRate: 99.8,
    carbonSavingsVsFlightKg: 142,
    classes: [
      {
        name: 'Standard',
        priceUsd: 110,
        availableSeats: 38,
        amenities: ['Power Socket at every seat', 'High-Speed Wi-Fi', 'Overhead Luggage Rack', 'Cart Service']
      },
      {
        name: 'First Class',
        priceUsd: 165,
        availableSeats: 12,
        amenities: ['Green Car Reclining Lounge', 'Quiet Coach', 'Hot Oshibori Towel', 'Priority Boarding', 'Footrest']
      },
      {
        name: 'Executive Panoramic',
        priceUsd: 240,
        availableSeats: 4,
        amenities: ['Gran Class Ultra-Luxury', 'Dedicated Attendant', 'Curated Bento Box & Sake', 'Noise Cancelling Headsets']
      }
    ]
  },
  {
    id: 'train-eurostar-paris-london',
    trainNumber: 'Eurostar e320 #9014',
    operator: 'Eurostar International',
    operatorLogo: '🚆',
    origin: {
      station: 'Gare du Nord',
      city: 'Paris',
      departureTime: '09:12 AM'
    },
    destination: {
      station: 'St Pancras International',
      city: 'London',
      arrivalTime: '10:30 AM'
    },
    duration: '2h 18m',
    trainType: 'Bullet / High-Speed',
    punctualityRate: 96.4,
    carbonSavingsVsFlightKg: 185,
    classes: [
      {
        name: 'Standard',
        priceUsd: 89,
        availableSeats: 45,
        amenities: ['Free Onboard Wi-Fi', 'Café Métropole Access', '2 Luggage Pieces + Hand Luggage']
      },
      {
        name: 'First Class',
        priceUsd: 175,
        availableSeats: 18,
        amenities: ['Standard Premier Extra Legroom', 'Complimentary Light Meal & Drinks', 'Magazines']
      },
      {
        name: 'Executive Panoramic',
        priceUsd: 320,
        availableSeats: 6,
        amenities: ['Business Premier Lounge Access', '3-Course Gourmet Dining by Raymond Blanc', 'Fast-Track Security']
      }
    ]
  },
  {
    id: 'train-glacier-express',
    trainNumber: 'Glacier Express GEX-902',
    operator: 'Rhaetian Railway & Matterhorn Gotthard',
    operatorLogo: '🏔️',
    origin: {
      station: 'Zermatt Bahnhof',
      city: 'Zermatt',
      departureTime: '08:52 AM'
    },
    destination: {
      station: 'St. Moritz Bahnhof',
      city: 'St. Moritz',
      arrivalTime: '04:38 PM'
    },
    duration: '7h 46m',
    trainType: 'Panoramic Alpine',
    punctualityRate: 99.1,
    carbonSavingsVsFlightKg: 95,
    classes: [
      {
        name: 'Standard',
        priceUsd: 145,
        availableSeats: 22,
        amenities: ['Floor-to-Ceiling Panorama Glass', 'Audio Commentary via Headset', 'At-seat Food Order']
      },
      {
        name: 'First Class',
        priceUsd: 260,
        availableSeats: 8,
        amenities: ['Wider Panoramic Windows', 'Spacious 2+1 Seating', '3-Course Regional Alpine Lunch']
      },
      {
        name: 'Executive Panoramic',
        priceUsd: 520,
        availableSeats: 2,
        amenities: ['Excellence Class Guaranteed Window', '5-Course Gourmet Wine Pairing Menu', 'Glacier Bar Access', 'Concierge Service']
      }
    ]
  },
  {
    id: 'train-frecciarossa-rome-naples',
    trainNumber: 'Frecciarossa 1000 #9533',
    operator: 'Trenitalia High Speed',
    operatorLogo: '🚅',
    origin: {
      station: 'Roma Termini',
      city: 'Rome',
      departureTime: '10:00 AM'
    },
    destination: {
      station: 'Napoli Centrale (Amalfi Gateway)',
      city: 'Naples',
      arrivalTime: '11:10 AM'
    },
    duration: '1h 10m',
    trainType: 'Bullet / High-Speed',
    punctualityRate: 97.5,
    carbonSavingsVsFlightKg: 88,
    classes: [
      {
        name: 'Standard',
        priceUsd: 42,
        availableSeats: 52,
        amenities: ['Ergonomic Leather Seats', 'Wi-Fi Portal & Movies', 'Power Outlet']
      },
      {
        name: 'First Class',
        priceUsd: 68,
        availableSeats: 16,
        amenities: ['Premium Class Welcome Drink', 'Italian Espresso & Sweet Snack', 'Extra Recline']
      },
      {
        name: 'Executive Panoramic',
        priceUsd: 125,
        availableSeats: 5,
        amenities: ['Executive Single Swivel Leather Chairs', 'Open Bar with Prosecco', 'Meeting Room Onboard']
      }
    ]
  }
];

export const mockBuses: BusOption[] = [
  {
    id: 'bus-amalfi-rome-express',
    operator: 'Marozzi Luxury Express',
    operatorLogo: '🚌',
    busType: 'Volvo Multi-Axle AC Sleeper',
    origin: {
      city: 'Rome',
      boardingPoint: 'Rome Tiburtina Bus Terminal',
      departureTime: '07:30 AM'
    },
    destination: {
      city: 'Amalfi Coast',
      dropPoint: 'Amalfi Marina Piazza Flavio Gioia',
      arrivalTime: '11:45 AM'
    },
    duration: '4h 15m',
    priceUsd: 34,
    rating: 4.8,
    reviewsCount: 1240,
    seatsAvailable: 14,
    amenities: ['Panoramic Top-Deck Seating', 'Individual AC Vents', 'High-Speed Wi-Fi', 'USB-C Fast Chargers', 'Mineral Water & Snack', 'Luggage Assistance'],
    cancellationPolicy: 'Free cancellation up to 6 hours before departure'
  },
  {
    id: 'bus-kyoto-kanazawa-liner',
    operator: 'JR West Highway Bus',
    operatorLogo: '🚍',
    busType: 'Mercedes Executive Seater',
    origin: {
      city: 'Kyoto',
      boardingPoint: 'Kyoto Station Karasuma Exit',
      departureTime: '08:40 AM'
    },
    destination: {
      city: 'Kanazawa',
      dropPoint: 'Kanazawa Station East Gate',
      arrivalTime: '12:50 PM'
    },
    duration: '4h 10m',
    priceUsd: 38,
    rating: 4.9,
    reviewsCount: 890,
    seatsAvailable: 9,
    amenities: ['3-Row Independent Reclining Pods', 'Privacy Curtains', 'Heated Footrests', 'Free Blanket & Slippers', 'Onboard Lavatory'],
    cancellationPolicy: 'Free cancellation up to 24 hours prior'
  },
  {
    id: 'bus-swiss-postbus-alps',
    operator: 'Swiss PostBus Alpine Route',
    operatorLogo: '🚎',
    busType: 'Eco Electric Cruiser',
    origin: {
      city: 'Interlaken',
      boardingPoint: 'Interlaken Ost Station',
      departureTime: '09:15 AM'
    },
    destination: {
      city: 'Grindelwald / Alps',
      dropPoint: 'Grindelwald First Terminal',
      arrivalTime: '10:00 AM'
    },
    duration: '45m',
    priceUsd: 19,
    rating: 4.95,
    reviewsCount: 2150,
    seatsAvailable: 24,
    amenities: ['Glass Skylight Roof', 'Zero-Emission Electric Drive', 'Bicycle Storage Rack', 'Ski Gear Compartment', 'Live Alpine Audio Guide'],
    cancellationPolicy: 'Instant 100% refund up to 2 hours before trip'
  },
  {
    id: 'bus-bali-trans-shuttle',
    operator: 'Kura-Kura Premium Shuttle',
    operatorLogo: '🚐',
    busType: 'Luxury Tourist Coach',
    origin: {
      city: 'Seminyak',
      boardingPoint: 'Seminyak Square Mall Hub',
      departureTime: '10:00 AM'
    },
    destination: {
      city: 'Ubud',
      dropPoint: 'Ubud Monkey Forest Main Hub',
      arrivalTime: '11:20 AM'
    },
    duration: '1h 20m',
    priceUsd: 12,
    rating: 4.75,
    reviewsCount: 1680,
    seatsAvailable: 18,
    amenities: ['Air Conditioned Cabin', 'Free Cool Towel', 'Local Tour Guide Assistant', 'Drop-off at Villa Zone'],
    cancellationPolicy: 'Free cancellation anytime prior to boarding'
  }
];

export const mockCabs: CabOption[] = [
  {
    id: 'cab-airport-executive-sedan',
    vehicleModel: 'Mercedes-Benz E-Class or BMW 5-Series',
    category: 'Executive Sedan',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    serviceType: 'Airport Transfer',
    baseFareUsd: 45,
    pricePerKmUsd: 2.2,
    estimatedPriceUsd: 65,
    passengerCapacity: 3,
    luggageCapacity: 3,
    driverRating: 4.98,
    features: ['Chauffeur in Formal Attire', 'Flight Tracking & 60min Free Wait Time', 'Bottled San Pellegrino', 'Phone Chargers', 'Meet & Greet with Name Sign'],
    freeCancellationMinutes: 120
  },
  {
    id: 'cab-luxury-suv-chauffeur',
    vehicleModel: 'Range Rover Sport / Cadillac Escalade',
    category: 'Luxury SUV',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    serviceType: 'Outstation Trip',
    baseFareUsd: 85,
    pricePerKmUsd: 3.4,
    estimatedPriceUsd: 145,
    passengerCapacity: 6,
    luggageCapacity: 6,
    driverRating: 4.96,
    features: ['All-Wheel Drive Mountain Ready', 'Panoramic Sunroof', 'Complimentary Champagne for Coastal Drives', 'Wi-Fi Hotspot', 'Child Seats Available on Request'],
    freeCancellationMinutes: 180
  },
  {
    id: 'cab-eco-electric-tesla',
    vehicleModel: 'Tesla Model Y Long Range',
    category: 'Eco Electric',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80',
    serviceType: 'Local Drop',
    baseFareUsd: 25,
    pricePerKmUsd: 1.8,
    estimatedPriceUsd: 38,
    passengerCapacity: 4,
    luggageCapacity: 4,
    driverRating: 4.92,
    features: ['Zero Carbon Footprint', 'Silent Glide Experience', 'Custom In-Car Spotify Music', 'Fast Route Optimization'],
    freeCancellationMinutes: 30
  },
  {
    id: 'cab-hourly-sightseeing-van',
    vehicleModel: 'Toyota Alphard Royal Lounge',
    category: 'Family Van',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    serviceType: 'City Hourly Rental',
    baseFareUsd: 120,
    pricePerKmUsd: 0,
    estimatedPriceUsd: 195,
    passengerCapacity: 7,
    luggageCapacity: 8,
    driverRating: 4.99,
    features: ['4-Hour Flexible City Tour', 'Captain Ottoman Reclining Seats', 'English-Speaking Expert Driver', 'Unlimited Stops & Photo Breaks'],
    freeCancellationMinutes: 240
  }
];

export const mockCarRentals: CarRentalOption[] = [
  {
    id: 'car-tesla-modely',
    model: 'Model Y Performance',
    make: 'Tesla',
    year: 2026,
    category: 'Electric & Hybrid',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80',
    transmission: 'Automatic',
    seats: 5,
    doors: 5,
    fuelType: 'Electric',
    pricePerDayUsd: 85,
    originalPricePerDayUsd: 110,
    rating: 4.94,
    reviewsCount: 640,
    supplier: 'Tripora Fleet & Hertz Global',
    supplierLogo: '⚡',
    pickupLocation: 'Kyoto Station / Kansai Intl Airport (KIX)',
    mileageLimit: 'Unlimited Supercharging & Miles',
    features: ['Full Self-Driving Autopilot', '0-60 in 3.5s', 'Glass Roof', 'Heated All Seats', 'Free Cancellation up to 48h'],
    insuranceIncluded: true
  },
  {
    id: 'car-alfa-spider-convertible',
    model: '4C Spider / Giulia Spider',
    make: 'Alfa Romeo',
    year: 2025,
    category: 'Convertible',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    transmission: 'Automatic',
    seats: 2,
    doors: 2,
    fuelType: 'Petrol',
    pricePerDayUsd: 145,
    originalPricePerDayUsd: 180,
    rating: 4.98,
    reviewsCount: 380,
    supplier: 'Sixt Luxury & Amalfi Exotics',
    supplierLogo: '🏎️',
    pickupLocation: 'Naples Airport / Positano Center Hub',
    mileageLimit: '300 km / day',
    features: ['Open Soft-Top for Coastal Cruising', 'Brembo Sport Brakes', 'Sport Exhaust Note', 'GPS Navigation Included'],
    insuranceIncluded: true
  },
  {
    id: 'car-range-rover-alpine',
    model: 'Defender 110 V8 Adventure',
    make: 'Land Rover',
    year: 2026,
    category: 'SUV & 4x4',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80',
    transmission: 'Automatic',
    seats: 7,
    doors: 5,
    fuelType: 'Hybrid',
    pricePerDayUsd: 175,
    rating: 4.96,
    reviewsCount: 490,
    supplier: 'Avis Prestige Switzerland',
    supplierLogo: '🏔️',
    pickupLocation: 'Geneva Airport / Zurich Central',
    mileageLimit: 'Unlimited Alpine Mileage',
    features: ['Terrain Response 2 Off-Road', 'Integrated Ski Rack', 'Winter Studded Tires Included', 'Surround 3D Cameras'],
    insuranceIncluded: true
  },
  {
    id: 'car-toyota-prius-compact',
    model: 'Prius Hybrid Eco Prime',
    make: 'Toyota',
    year: 2025,
    category: 'Compact',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    transmission: 'Automatic',
    seats: 5,
    doors: 5,
    fuelType: 'Hybrid',
    pricePerDayUsd: 42,
    originalPricePerDayUsd: 55,
    rating: 4.88,
    reviewsCount: 1120,
    supplier: 'Toyota Rent-a-Car Japan',
    supplierLogo: '🚗',
    pickupLocation: 'Tokyo Narita / Kyoto Downtown',
    mileageLimit: 'Unlimited Kilometers',
    features: ['58 MPG Ultra High Efficiency', 'Apple CarPlay / Android Auto', 'Lane Keep Assist', 'Zero Deposit Scheme'],
    insuranceIncluded: true
  }
];

export const mockEvents: EventListing[] = [
  {
    id: 'event-gion-matsuri',
    title: 'Kyoto Gion Matsuri Grand Procession & Night Gala',
    eventType: 'Cultural Festival',
    venue: 'Yasaka Shrine & Shijo Dori Boulevard',
    city: 'Kyoto',
    country: 'Japan',
    date: '2026-10-18',
    time: '06:00 PM',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.98,
    reviewsCount: 3100,
    startingPriceUsd: 65,
    description: 'One of the most famous cultural celebrations in the world. Experience massive 25-meter wooden Yamaboko floats, traditional flutes, and luminous lantern night ceremonies.',
    performers: ['Kyoto Traditional Yamaboko Guild', 'Gion Geiko & Maiko Ensemble'],
    seatingTiers: [
      {
        id: 'tier-gen',
        name: 'General Admission',
        priceUsd: 65,
        perks: ['Street Procession Access', 'Festival Guidebook', 'Commemorative Wooden Charm'],
        availableTickets: 48
      },
      {
        id: 'tier-prem',
        name: 'Premium Reserved',
        priceUsd: 140,
        perks: ['Elevated Grandstand Covered Seat', 'English Audio Commentary', 'Bento Box & Green Tea'],
        availableTickets: 18
      },
      {
        id: 'tier-vip',
        name: 'VIP Front Row',
        priceUsd: 280,
        perks: ['Front-Row Shijo Viewing Box', 'Private Geiko Tea Ceremony Pre-Show', 'Champagne & Kaiseki Bites'],
        availableTickets: 6
      }
    ]
  },
  {
    id: 'event-amalfi-cliff-jazz',
    title: 'Ravello Cliffside Sunset Jazz & Classical Symphony',
    eventType: 'Concert & Live Music',
    venue: 'Villa Rufolo Belvedere Stage (Overhanging Cliff)',
    city: 'Amalfi Coast / Ravello',
    country: 'Italy',
    date: '2026-10-22',
    time: '07:30 PM',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.96,
    reviewsCount: 1820,
    startingPriceUsd: 95,
    description: 'Listen to world-class jazz quartets and philharmonic soloists suspended 300 meters above the glowing Mediterranean sea as dusk falls over the Amalfi coastline.',
    performers: ['European Philharmonic Jazz Sextet', 'Elena Rossi (Soprano Soloist)'],
    seatingTiers: [
      {
        id: 'tier-balcony',
        name: 'Grandstand / Mezzanine',
        priceUsd: 95,
        perks: ['Terrace Garden Seating', 'Acoustic Sound Field', 'Welcome Limoncello'],
        availableTickets: 32
      },
      {
        id: 'tier-prem',
        name: 'Premium Reserved',
        priceUsd: 185,
        perks: ['Direct Sea-Facing Mid-Orchestra', 'Campania Wine Tasting Included', 'Artist Program'],
        availableTickets: 14
      },
      {
        id: 'tier-vip',
        name: 'VIP Front Row',
        priceUsd: 350,
        perks: ['Cantilevered Cliffside Front Row', 'Private Villa Garden Cocktail Reception', 'Signed Vinyl Album'],
        availableTickets: 4
      }
    ]
  },
  {
    id: 'event-bali-arts-dance',
    title: 'Uluwatu Sunset Kecak Fire Dance & Ocean Feast',
    eventType: 'Theatre & Performing Arts',
    venue: 'Uluwatu Clifftop Amphitheatre',
    city: 'Bali',
    country: 'Indonesia',
    date: '2026-10-20',
    time: '05:45 PM',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'],
    rating: 4.93,
    reviewsCount: 2450,
    startingPriceUsd: 35,
    description: 'Witness the hypnotic chorus of 70 chanting Balinese performers reenacting the epic Ramayana legend against a blazing orange sunset over crashing Indian Ocean waves.',
    performers: ['Uluwatu Royal Heritage Troupe'],
    seatingTiers: [
      {
        id: 'tier-gen',
        name: 'General Admission',
        priceUsd: 35,
        perks: ['Amphitheatre Seating', 'Traditional Batik Sash Souvenir', 'Temple Entry Pass'],
        availableTickets: 60
      },
      {
        id: 'tier-vip',
        name: 'VIP Front Row',
        priceUsd: 85,
        perks: ['Front-Row Center Cushioned Seat', 'Jimbaran Bay Seafood Candlelight Dinner Voucher', 'Priority Exit Shuttle'],
        availableTickets: 15
      }
    ]
  }
];

export const mockRestaurants: RestaurantListing[] = [
  {
    id: 'rest-gion-sasaki',
    name: 'Gion Sasaki (3-Star Michelin)',
    cuisine: 'Modern Kaiseki & Chef’s Table',
    priceRange: '$$$$',
    avgPricePerPersonUsd: 220,
    rating: 4.98,
    reviewsCount: 840,
    city: 'Kyoto',
    country: 'Japan',
    address: '566-23-4 Gionmachi Minamigawa, Higashiyama Ward, Kyoto',
    image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
    ],
    michelinStars: 3,
    description: 'Kyoto’s most thrilling culinary counter led by Master Chef Hiroshi Sasaki. Dynamic, theatrical preparation of wild Matsutake, A5 Miyazaki Wagyu, and charcoal-grilled Otoro.',
    signatureDishes: ['Chargrilled Wagyu with Winter Truffle & Dashi', 'Ezo Abalone with Liver Sauce over Steamed Rice', 'Smoked Otoro Nigiri with Fresh Wasabi'],
    features: ['12-Seat Hinoki Wood Counter', 'Sommelier Sake Pairings', 'Private Garden View Room', 'English Menu Available'],
    dressCode: 'Smart Casual / Elegant (No shorts or flip flops)',
    timeSlots: ['05:30 PM', '06:30 PM', '07:45 PM', '08:45 PM']
  },
  {
    id: 'rest-torre-normanna',
    name: 'Ristorante Torre Normanna (Cliffside Fortress)',
    cuisine: 'Coastal Italian & Fresh Seafood',
    priceRange: '$$$',
    avgPricePerPersonUsd: 140,
    rating: 4.95,
    reviewsCount: 1210,
    city: 'Amalfi Coast',
    country: 'Italy',
    address: 'Via Diego Taiani 4, Maiori, Amalfi Coast',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Dine in a 13th-century coastal fortress perched directly over crashing turquoise waves. Enjoy the freshest Mediterranean catch paired with vintage Greco di Tufo wines.',
    signatureDishes: ['Handmade Tagliolini with Red King Prawns & Lemon Zest', 'Salt-Crusted Whole Wild Sea Bass', 'Warm Limoncello Soufflé with Pistachio Gelato'],
    features: ['Private Seaside Rock Tables', 'Sunset Cocktail Tower', 'Boat Mooring Dock for Guests', 'Extensive 600+ Label Wine Cellar'],
    dressCode: 'Resort Chic',
    timeSlots: ['12:30 PM', '01:30 PM', '07:00 PM', '08:30 PM', '09:30 PM']
  },
  {
    id: 'rest-chez-vrony-zermatt',
    name: 'Chez Vrony (Michelin Guide Alpine Panorama)',
    cuisine: 'Alpine Gourmet & Organic Swiss Cuisine',
    priceRange: '$$$',
    avgPricePerPersonUsd: 115,
    rating: 4.94,
    reviewsCount: 990,
    city: 'Zermatt',
    country: 'Switzerland',
    address: 'Findeln 2100m, Zermatt, Valais Alps',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'],
    description: 'Iconic rustic-chic chalet nestled at 2,100 meters directly facing the majestic Matterhorn pyramid. Known for 100-year-old family recipes and organically reared alpine beef.',
    signatureDishes: ['Famous Vrony Dry-Aged Alpine Beef Burger', 'Handcrafted Truffle Mountain Cheese Ravioli', 'Warm Caramelized Apple Rosti with Vanilla Bean Cream'],
    features: ['Unobstructed Matterhorn Sun Terrace', 'Sheepskin Lounge Blankets', 'Ski-in / Ski-out Access', 'Organic Farm-to-Table'],
    dressCode: 'Alpine Casual',
    timeSlots: ['11:45 AM', '01:15 PM', '02:45 PM', '06:30 PM']
  },
  {
    id: 'rest-locavore-ubud',
    name: 'Locavore NXT Culinary Lab',
    cuisine: 'Hyper-Local Indonesian Gastronomy',
    priceRange: '$$$$',
    avgPricePerPersonUsd: 130,
    rating: 4.96,
    reviewsCount: 1420,
    city: 'Bali / Ubud',
    country: 'Indonesia',
    address: 'Jalan Dewisita No. 10, Ubud, Bali',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'],
    description: 'Voted Asia’s Top 50. Every single ingredient (even the salt and peppercorns) is 100% sourced from sustainable Balinese farms, volcanic soil, and indigenous foragers.',
    signatureDishes: ['16-Course Discovery Tasting Journey', 'Fermented Wild Honey Glazed Duck', 'Charred Sunchoke with Kintamani Arabica Coffee Soil'],
    features: ['Zero-Waste Sustainable Philosophy', 'Botanical Cocktail Lab', 'Open Glass Kitchen Experience'],
    dressCode: 'Smart Casual',
    timeSlots: ['06:00 PM', '07:00 PM', '08:00 PM']
  }
];

export const mockCruises: CruiseListing[] = [
  {
    id: 'cruise-med-luxury-riviera',
    title: '7-Night Mediterranean Azure & Amalfi Mega-Yacht Cruise',
    cruiseLine: 'Ritz-Carlton Yacht Collection & Explora Journeys',
    shipName: 'Evrima (Superyacht Class)',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.97,
    reviewsCount: 780,
    durationNights: 7,
    departurePort: 'Civitavecchia (Rome Port), Italy',
    portsOfCall: ['Civitavecchia (Rome)', 'Capri & Blue Grotto', 'Positano & Amalfi Coast', 'Taormina (Sicily)', 'Monaco / Monte Carlo', 'Barcelona (Spain)'],
    startingPriceUsd: 2150,
    departureDates: ['Oct 24, 2026', 'Nov 07, 2026', 'Dec 12, 2026', 'Apr 18, 2027'],
    highlights: ['All-Balcony Yacht Suites', 'Michelin-Curated Onboard Dining', 'Marina Platform with Water Toys & Kayaks', 'Unlimited Moët & Chandon Champagne Included'],
    cabinTypes: [
      {
        id: 'cabin-oceanview',
        name: 'Oceanview Window',
        priceUsd: 2150,
        capacity: 2,
        amenities: ['Floor-to-Ceiling Picture Window', 'King Custom Bed', 'Espresso Machine', '24/7 Room Service'],
        availableCabins: 8
      },
      {
        id: 'cabin-balcony',
        name: 'Private Balcony',
        priceUsd: 2850,
        capacity: 2,
        amenities: ['Teak Veranda with Daybed', 'Marble Dual Vanity Bathroom', 'Complimentary Minibar', 'Priority Shore Tender'],
        availableCabins: 5
      },
      {
        id: 'cabin-suite',
        name: 'Presidential Suite',
        priceUsd: 5900,
        capacity: 4,
        amenities: ['1,100 sq ft Two-Story Loft', 'Private Whirlpool on Balcony', 'Dedicated Personal Butler', 'Helicopter Transfer Inclusions'],
        availableCabins: 2
      }
    ]
  },
  {
    id: 'cruise-norwegian-fjords-glacier',
    title: '8-Night Norwegian Fjords, Waterfalls & Northern Lights Cruise',
    cruiseLine: 'Hurtigruten Coastal Express',
    shipName: 'MS Roald Amundsen (Hybrid Electric)',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.95,
    reviewsCount: 1140,
    durationNights: 8,
    departurePort: 'Bergen Harbor, Norway',
    portsOfCall: ['Bergen', 'Geirangerfjord (UNESCO)', 'Alesund Art Nouveau', 'Lofoten Islands', 'Tromsø (Aurora Capital)'],
    startingPriceUsd: 1790,
    departureDates: ['Oct 28, 2026', 'Nov 14, 2026', 'Dec 05, 2026'],
    highlights: ['Expedition Science Center & Glaciologists Onboard', 'Outdoor Infinity Hot Tubs facing Glacier Walls', 'Aurora Borealis Alert Guarantee', 'RIB Boat Fjord Safaris'],
    cabinTypes: [
      {
        id: 'cabin-interior',
        name: 'Interior Stateroom',
        priceUsd: 1790,
        capacity: 2,
        amenities: ['Cozy Nordic Wood Decor', 'Digital Live Bow Camera TV', 'Heated Bathroom Floor'],
        availableCabins: 12
      },
      {
        id: 'cabin-balcony',
        name: 'Private Balcony',
        priceUsd: 2650,
        capacity: 2,
        amenities: ['Heated Balcony Seating', 'Binoculars Provided', 'Artisan Nordic Bathrobes', 'All Excursions 15% Off'],
        availableCabins: 6
      },
      {
        id: 'cabin-suite',
        name: 'Presidential Suite',
        priceUsd: 4800,
        capacity: 3,
        amenities: ['Top Deck Corner Panoramic Suite', 'Private Outdoor Jacuzzi', 'Caviar & Aquavit Welcome', 'Expedition Jacket Gifts'],
        availableCabins: 1
      }
    ]
  }
];
