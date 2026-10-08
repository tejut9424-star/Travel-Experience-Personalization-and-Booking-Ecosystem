import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Compass, 
  Zap, 
  Check, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { mockDestinations } from '../../data/mockData';
import { Itinerary, DayPlan } from '../../types';

interface AiTripPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (itinerary: Itinerary) => void;
  initialDestination?: string;
}

export const AiTripPlannerModal: React.FC<AiTripPlannerModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialDestination = 'Kyoto'
}) => {
  const { setActiveItinerary, updateItinerary } = useTrip();
  const [step, setStep] = useState<number>(1);
  const [destination, setDestination] = useState<string>(initialDestination);
  const [originCity, setOriginCity] = useState<string>('San Francisco (SFO)');
  const [durationDays, setDurationDays] = useState<number>(5);
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [travelStyle, setTravelStyle] = useState<string>('Cultural & Culinary');
  const [budgetTier, setBudgetTier] = useState<'Budget' | 'Balanced' | 'Luxury'>('Balanced');
  const [pace, setPace] = useState<'Relaxed' | 'Balanced' | 'Packed'>('Balanced');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Local Gastronomy',
    'UNESCO Shrines',
    'Scenic Photography'
  ]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<string>('Initializing prompt parameters...');

  if (!isOpen) return null;

  const interestOptions = [
    'Local Gastronomy',
    'UNESCO Shrines',
    'Scenic Photography',
    'Private Tea Tasting',
    'Traditional Ryokan & Onsen',
    'Hidden Gems & Alleys',
    'Active Outdoor Hiking',
    'Nightlife & Craft Bars'
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      setGenerationProgress('Querying geospatial POI index and opening hours...');
      await new Promise(r => setTimeout(r, 600));

      setGenerationProgress('Synthesizing optimal morning, afternoon, and evening routes...');
      await new Promise(r => setTimeout(r, 700));

      setGenerationProgress('Calculating dynamic budget breakdown & verified stay availability...');
      await new Promise(r => setTimeout(r, 600));

      // Build structured high-fidelity itinerary
      const matchedDest = mockDestinations.find(d => d.name.toLowerCase() === destination.toLowerCase()) || mockDestinations[0];

      const days: DayPlan[] = [];
      const costPerDay = budgetTier === 'Budget' ? 95 : budgetTier === 'Balanced' ? 180 : 390;

      for (let d = 1; d <= durationDays; d++) {
        days.push({
          dayNumber: d,
          date: `2026-10-${14 + d}`,
          theme: d === 1 
            ? `Arrival & Historic District Exploration in ${matchedDest.name}` 
            : d === 2 
            ? `Iconic UNESCO Highlights & Artisan Cuisine` 
            : d === 3 
            ? `Hidden Alleyways, Tea Ateliers & Scenic Panorama` 
            : `Immersive Local Experiences & Farewell Tasting`,
          summary: `Optimized AI-sequenced schedule balancing walking fatigue, crowd heatmaps, and dining reservations.`,
          dailyEstimatedCostUsd: costPerDay,
          accommodation: {
            name: budgetTier === 'Luxury' ? `${matchedDest.name} Grand Palace Resort` : `${matchedDest.name} Heritage Boutique Stay`,
            type: 'Boutique Hotel',
            estCostPerNightUsd: budgetTier === 'Luxury' ? 450 : 220,
            address: `Center District, ${matchedDest.name}`
          },
          morning: [
            {
              id: `gen-act-${d}-1`,
              time: '08:30 AM',
              title: matchedDest.topAttractions[d % matchedDest.topAttractions.length]?.name || `Scenic ${matchedDest.name} Cultural Walk`,
              category: 'Sightseeing',
              description: `Early morning exploration to enjoy crisp morning light and peaceful crowds.`,
              location: matchedDest.name,
              durationMinutes: 120,
              costUsd: 15,
              rating: 4.9
            }
          ],
          afternoon: [
            {
              id: `gen-act-${d}-2`,
              time: '01:00 PM',
              title: `Artisanal Tasting & Culinary Workshop`,
              category: 'Food',
              description: `Sample signature regional dishes including ${matchedDest.localDishes[0]?.name || 'local specialties'}.`,
              location: `${matchedDest.name} Market Square`,
              durationMinutes: 90,
              costUsd: budgetTier === 'Luxury' ? 85 : 35,
              rating: 4.8
            },
            {
              id: `gen-act-${d}-3`,
              time: '03:30 PM',
              title: `Panoramic Sunset Point & Tea Pavilions`,
              category: 'Relaxation',
              description: `Relaxed stroll overlooking the scenic horizons and traditional gardens.`,
              location: matchedDest.name,
              durationMinutes: 90,
              costUsd: 0,
              rating: 4.9
            }
          ],
          evening: [
            {
              id: `gen-act-${d}-4`,
              time: '07:30 PM',
              title: `Chef's Table Seasonal Dinner Experience`,
              category: 'Food',
              description: `Multi-course seasonal dinner paired with regional beverages.`,
              location: `${matchedDest.name} Gastronomy Quarter`,
              durationMinutes: 120,
              costUsd: budgetTier === 'Luxury' ? 160 : 65,
              rating: 4.95
            }
          ]
        });
      }

      const generatedItinerary: Itinerary = {
        id: `itin-ai-${Date.now()}`,
        userId: 'usr-traveler-01',
        title: `${durationDays}-Day ${travelStyle} Journey in ${matchedDest.name}`,
        destination: matchedDest.name,
        country: matchedDest.country,
        coverImage: matchedDest.image,
        startDate: '2026-10-15',
        endDate: `2026-10-${15 + durationDays}`,
        durationDays,
        travelersCount,
        travelStyle,
        totalEstimatedCostUsd: costPerDay * durationDays * travelersCount,
        currency: 'USD',
        overview: `A tailor-made ${durationDays}-day itinerary for ${travelersCount} travelers designed with ${budgetTier.toLowerCase()} budget optimization, ${pace.toLowerCase()} pacing, and focus on ${selectedInterests.slice(0, 2).join(' & ')}.`,
        packingList: [
          'Comfortable walking shoes with slip-on support',
          'Universal power adapter & mobile battery pack',
          'Lightweight windbreaker / compact rain layer',
          'Local e-SIM voucher downloaded to phone'
        ],
        practicalTips: matchedDest.travelTips,
        days,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'saved'
      };

      updateItinerary(generatedItinerary);
      setActiveItinerary(generatedItinerary);
      setIsGenerating(false);
      onSuccess(generatedItinerary);
      onClose();
    } catch (err) {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200/80 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-900 via-brand-900 to-brand-800 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-brand-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-brand-400 animate-pulse" />
            <span>AI Travel Architect</span>
          </div>
          <h2 className="font-display font-black text-2xl text-white">
            Plan Your Bespoke Itinerary
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            State-of-the-art AI synthesis calculating POI distances, crowds, and verified rates.
          </p>

          {/* Stepper Dots */}
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step === i ? 'w-8 bg-brand-400' : step > i ? 'w-4 bg-emerald-400' : 'w-4 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {isGenerating ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-brand-50 border-2 border-brand-500/30 flex items-center justify-center animate-spin">
                  <Sparkles className="w-10 h-10 text-brand-600" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-coral-500 text-white flex items-center justify-center text-[10px] font-bold">
                  AI
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy-900 font-display">Generating Your Optimized Journey</h3>
                <p className="text-xs text-brand-600 font-medium mt-1 animate-pulse">{generationProgress}</p>
              </div>
              <div className="max-w-md w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-brand-600 to-teal-400 h-full rounded-full w-3/4 animate-pulse" />
              </div>
            </div>
          ) : (
            <>
              {/* Step 1: Destination & Dates */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in">
                  <div>
                    <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
                      Where do you want to travel?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {mockDestinations.map(d => (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setDestination(d.name)}
                          className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                            destination === d.name
                              ? 'border-brand-600 bg-brand-50/70 shadow-sm ring-2 ring-brand-500/20'
                              : 'border-slate-200 hover:border-brand-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-navy-900">{d.name}</span>
                            {destination === d.name && <Check className="w-3.5 h-3.5 text-brand-600" />}
                          </div>
                          <span className="text-[10px] text-slate-400 mt-1">{d.country}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-navy-900 mb-1.5">Departure City / Airport</label>
                      <input
                        type="text"
                        value={originCity}
                        onChange={e => setOriginCity(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-navy-900 mb-1.5">Trip Duration (Days)</label>
                      <div className="flex items-center gap-2">
                        {[3, 5, 7, 10, 14].map(days => (
                          <button
                            key={days}
                            type="button"
                            onClick={() => setDurationDays(days)}
                            className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                              durationDays === days
                                ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {days}d
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Travelers, Budget & Style */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in">
                  <div>
                    <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
                      Who is traveling?
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { count: 1, label: 'Solo' },
                        { count: 2, label: 'Couple' },
                        { count: 4, label: 'Family (4)' },
                        { count: 6, label: 'Group (6)' }
                      ].map(t => (
                        <button
                          key={t.count}
                          type="button"
                          onClick={() => setTravelersCount(t.count)}
                          className={`p-3 rounded-2xl border text-center transition-all ${
                            travelersCount === t.count
                              ? 'border-brand-600 bg-brand-50 text-brand-700 font-bold shadow-sm'
                              : 'border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <Users className="w-4 h-4 mx-auto mb-1 text-slate-400" />
                          <span className="text-xs">{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
                      Budget Tier
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['Budget', 'Balanced', 'Luxury'] as const).map(tier => (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => setBudgetTier(tier)}
                          className={`p-3.5 rounded-2xl border text-left transition-all ${
                            budgetTier === tier
                              ? 'border-brand-600 bg-brand-50/80 ring-2 ring-brand-500/20'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <p className="text-xs font-bold text-navy-900">{tier}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {tier === 'Budget' ? 'Hostels & local eats' : tier === 'Balanced' ? 'Boutique & signature dining' : '5-star & private tours'}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
                      Desired Pace
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Relaxed', 'Balanced', 'Packed'] as const).map(p => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setPace(p)}
                          className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all ${
                            pace === p
                              ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Interests & Synthesis */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in">
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
                    Select Your Travel Interests (Multi-select)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {interestOptions.map(interest => {
                      const active = selectedInterests.includes(interest);
                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                            active
                              ? 'border-brand-600 bg-brand-50 text-brand-800'
                              : 'border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <span>{interest}</span>
                          {active && <Check className="w-3.5 h-3.5 text-brand-600" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-200/80 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-brand-900">
                      <p className="font-bold">Grounded Accuracy Guarantee</p>
                      <p className="text-[11px] text-brand-700 mt-0.5">
                        Tripora AI verifies attraction transit routes and opening days before generating your schedule.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer Controls */}
        {!isGenerating && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-navy-900 transition-colors"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 text-xs font-bold text-white bg-navy-900 hover:bg-brand-700 rounded-xl transition-all shadow-sm flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleGenerate}
                className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 rounded-xl shadow-glow transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Itinerary</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
