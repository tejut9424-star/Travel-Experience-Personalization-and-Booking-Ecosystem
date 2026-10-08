import React, { useState } from 'react';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  DollarSign, 
  Share2, 
  Download, 
  Users, 
  Check, 
  ArrowRight,
  TrendingDown,
  Tag,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { useChat } from '../context/ChatContext';
import { ActivityItem } from '../types';

interface ItineraryEditorPageProps {
  onNavigate: (tab: string, param?: any) => void;
  onOpenCheckoutModal: (item: any) => void;
}

export const ItineraryEditorPage: React.FC<ItineraryEditorPageProps> = ({
  onNavigate,
  onOpenCheckoutModal
}) => {
  const { 
    activeItinerary, 
    updateItinerary, 
    addActivityToDay, 
    removeActivityFromDay, 
    regenerateDayWithAI, 
    optimizeBudgetWithAI 
  } = useTrip();
  const { openChat } = useChat();

  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);
  const [regenPrompt, setRegenPrompt] = useState<string>('');
  const [showRegenModal, setShowRegenModal] = useState<boolean>(false);

  // Budget optimization modal state
  const [showBudgetModal, setShowBudgetModal] = useState<boolean>(false);
  const [reductionPercent, setReductionPercent] = useState<number>(15);
  const [optimizationResult, setOptimizationResult] = useState<any>(null);

  // Add activity modal state
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [addPeriod, setAddPeriod] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<any>('Sightseeing');
  const [newCost, setNewCost] = useState(25);
  const [newLocation, setNewLocation] = useState('');
  const [newDuration, setNewDuration] = useState(90);
  const [newDescription, setNewDescription] = useState('');

  // Share modal state
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [collaboratorEmail, setCollaboratorEmail] = useState('');
  const [invitedList, setInvitedList] = useState<string[]>(['sarah.travel@world.com']);
  const [copiedLink, setCopiedLink] = useState(false);

  const currentDay = activeItinerary.days.find(d => d.dayNumber === selectedDayNumber) || activeItinerary.days[0];

  const handleRegenerateDay = async () => {
    setIsRegenerating(true);
    await regenerateDayWithAI(selectedDayNumber, regenPrompt);
    setIsRegenerating(false);
    setShowRegenModal(false);
    setRegenPrompt('');
  };

  const handleApplyBudgetOptimization = () => {
    const res = optimizeBudgetWithAI(reductionPercent);
    setOptimizationResult(res);
  };

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newAct: ActivityItem = {
      id: `act-custom-${Date.now()}`,
      time: addPeriod === 'morning' ? '09:30 AM' : addPeriod === 'afternoon' ? '02:30 PM' : '07:30 PM',
      title: newTitle,
      category: newCategory,
      description: newDescription || `Custom traveler added activity in ${activeItinerary.destination}`,
      location: newLocation || activeItinerary.destination,
      durationMinutes: newDuration,
      costUsd: Number(newCost) || 0
    };

    addActivityToDay(selectedDayNumber, addPeriod, newAct);
    setShowAddModal(false);
    setNewTitle('');
    setNewDescription('');
    setNewLocation('');
  };

  const handleShareInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (collaboratorEmail && !invitedList.includes(collaboratorEmail)) {
      setInvitedList([...invitedList, collaboratorEmail]);
      setCollaboratorEmail('');
    }
  };

  const handleCopyShareLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner & Header */}
      <div className="relative bg-navy-900 text-white rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl border border-slate-800">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
          style={{ backgroundImage: `url(${activeItinerary.coverImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/90 to-transparent" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-brand-500 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
              {activeItinerary.travelStyle}
            </span>
            <span className="bg-white/10 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-400" />
              {activeItinerary.durationDays} Days • {activeItinerary.startDate} to {activeItinerary.endDate}
            </span>
            <span className="bg-white/10 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-coral-400" />
              {activeItinerary.travelersCount} Travelers
            </span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-4xl text-white">
            {activeItinerary.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {activeItinerary.overview}
          </p>

          {/* Actions Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowBudgetModal(true)}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-glow transition-all flex items-center gap-2"
            >
              <TrendingDown className="w-4 h-4" />
              <span>Optimize Budget with AI</span>
            </button>

            <button
              onClick={() => setShowShareModal(true)}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-colors flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share & Collaborate</span>
            </button>

            <button
              onClick={() => {
                openChat(`I am reviewing my itinerary for ${activeItinerary.destination}. Can you suggest alternative evening restaurants?`);
              }}
              className="px-4 py-2.5 bg-brand-600/80 hover:bg-brand-600 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Chat Refinement</span>
            </button>
          </div>
        </div>

        {/* Right Corner Cost Snapshot */}
        <div className="hidden lg:block absolute top-8 right-8 text-right bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15">
          <span className="text-[10px] uppercase font-bold text-slate-300">Estimated Trip Budget</span>
          <p className="text-3xl font-black text-brand-300 font-display">${activeItinerary.totalEstimatedCostUsd} USD</p>
          <p className="text-[11px] text-slate-300 mt-1">~${Math.round(activeItinerary.totalEstimatedCostUsd / activeItinerary.durationDays)} / day</p>
        </div>
      </div>

      {/* Day Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {activeItinerary.days.map(day => (
          <button
            key={day.dayNumber}
            onClick={() => setSelectedDayNumber(day.dayNumber)}
            className={`px-5 py-3 rounded-2xl text-left transition-all flex-shrink-0 flex items-center gap-3 border ${
              selectedDayNumber === day.dayNumber
                ? 'bg-brand-600 text-white border-brand-600 shadow-glow font-bold'
                : 'bg-white text-slate-700 border-slate-200 hover:border-brand-300'
            }`}
          >
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${
              selectedDayNumber === day.dayNumber ? 'bg-white text-brand-700' : 'bg-slate-100 text-navy-900'
            }`}>
              D{day.dayNumber}
            </div>
            <div>
              <p className="text-xs font-bold leading-tight">Day {day.dayNumber}</p>
              <p className="text-[10px] opacity-80">{day.date}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Day Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Morning, Afternoon, Evening Activity Feed */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Day Theme Banner */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-brand-600 text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>Day {currentDay.dayNumber} Theme</span>
              </div>
              <h2 className="font-display font-black text-xl text-navy-900 mt-1">
                {currentDay.theme}
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {currentDay.summary}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setShowRegenModal(true)}
                disabled={isRegenerating}
                className="px-3.5 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-xs transition-colors flex items-center gap-1.5 border border-brand-200"
                title="Regenerate this specific day using AI"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
                <span>AI Re-Synthesize</span>
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-3.5 py-2 rounded-xl bg-navy-900 hover:bg-brand-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Activity</span>
              </button>
            </div>
          </div>

          {/* Periods: Morning, Afternoon, Evening */}
          {(['morning', 'afternoon', 'evening'] as const).map(period => {
            const activities = currentDay[period];
            const periodLabel = period.charAt(0).toUpperCase() + period.slice(1);

            return (
              <div key={period} className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-500" />
                    {periodLabel} Schedule
                  </h3>
                  <button
                    onClick={() => {
                      setAddPeriod(period);
                      setShowAddModal(true);
                    }}
                    className="text-[11px] font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add {periodLabel} Item
                  </button>
                </div>

                {activities.length === 0 ? (
                  <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-6 text-center text-xs text-slate-400">
                    No scheduled activities for this time. Click "+ Add" to add one.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activities.map(act => (
                      <div
                        key={act.id}
                        className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm card-hover-effect flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-16 text-center flex-shrink-0 bg-slate-50 border border-slate-100 p-2 rounded-2xl">
                            <Clock className="w-4 h-4 text-brand-600 mx-auto mb-1" />
                            <span className="text-[10px] font-bold text-navy-900 block leading-tight">{act.time}</span>
                            <span className="text-[9px] text-slate-400 block">{act.durationMinutes}m</span>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-extrabold bg-brand-50 text-brand-700 border border-brand-200/60 px-2 py-0.5 rounded-md">
                                {act.category}
                              </span>
                              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-slate-400" /> {act.location}
                              </span>
                            </div>

                            <h4 className="font-bold text-sm text-navy-900">{act.title}</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">{act.description}</p>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 flex-shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                          <span className="text-sm font-black text-brand-700">
                            {act.costUsd === 0 ? 'Free' : `$${act.costUsd}`}
                          </span>

                          <div className="flex items-center gap-1">
                            {act.costUsd > 0 && (
                              <button
                                onClick={() => onOpenCheckoutModal({
                                  type: 'activity',
                                  id: act.id,
                                  title: act.title,
                                  subtitle: `${act.location} • ${act.time}`,
                                  image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=600&q=80',
                                  price: act.costUsd,
                                  startDate: currentDay.date
                                })}
                                className="px-3 py-1 bg-brand-600 hover:bg-brand-500 text-white text-[11px] font-bold rounded-lg shadow-sm"
                              >
                                Reserve
                              </button>
                            )}

                            <button
                              onClick={() => removeActivityFromDay(selectedDayNumber, period, act.id)}
                              className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                              title="Delete activity"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right 1 Col: Day Accommodation & Packing List */}
        <div className="space-y-6">
          
          {/* Day Hotel / Accommodation Box */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-navy-900">Overnight Accommodation</h3>
              <span className="text-[10px] uppercase font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">Day {currentDay.dayNumber}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <p className="font-bold text-xs text-navy-900">{currentDay.accommodation.name}</p>
              <p className="text-[11px] text-slate-500">{currentDay.accommodation.address}</p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                <span className="text-[11px] text-slate-400">Est. Rate:</span>
                <span className="font-bold text-brand-700">${currentDay.accommodation.estCostPerNightUsd} / night</span>
              </div>
            </div>

            <button
              onClick={() => onOpenCheckoutModal({
                type: 'stay',
                id: 'stay-kyoto-hoshinoya',
                title: currentDay.accommodation.name,
                subtitle: currentDay.accommodation.address,
                image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
                price: currentDay.accommodation.estCostPerNightUsd,
                startDate: currentDay.date
              })}
              className="w-full py-2.5 bg-navy-900 hover:bg-brand-600 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
            >
              Book This Accommodation
            </button>
          </div>

          {/* Packing & Practical Reminders */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-navy-900">AI Packing Checklist</h3>
            <ul className="space-y-2.5 text-xs text-slate-600">
              {activeItinerary.packingList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Expense Ledger Link */}
          <div className="bg-gradient-to-br from-brand-900 to-navy-900 text-white p-6 rounded-3xl space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-brand-400">
              <DollarSign className="w-5 h-5" />
              <h4 className="font-display font-bold text-sm text-white">Live Expense Tracker</h4>
            </div>
            <p className="text-xs text-slate-300">
              Track actual receipt spending against your AI estimated budget in real time.
            </p>
            <button
              onClick={() => onNavigate('dashboard', { tab: 'budget' })}
              className="w-full py-2 bg-white text-navy-950 hover:bg-brand-50 font-bold text-xs rounded-xl transition-colors shadow-sm"
            >
              Open Expense Ledger
            </button>
          </div>

        </div>
      </div>

      {/* AI Regenerate Day Modal */}
      {showRegenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-brand-700 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>AI Re-Synthesize Day {selectedDayNumber}</span>
              </div>
              <button onClick={() => setShowRegenModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <p className="text-xs text-slate-500">
              Provide instructions to tailor Day {selectedDayNumber} (or leave blank for balanced optimization):
            </p>

            <textarea
              value={regenPrompt}
              onChange={e => setRegenPrompt(e.target.value)}
              placeholder="e.g. Focus exclusively on matcha dessert cafes, pottery studios, and relaxed walking."
              rows={3}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-navy-900 focus:outline-none focus:border-brand-500 resize-none"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowRegenModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleRegenerateDay}
                disabled={isRegenerating}
                className="px-5 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl shadow-glow transition-all flex items-center gap-2"
              >
                {isRegenerating ? <RotateCcw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>Re-Synthesize</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Budget Optimizer Modal */}
      {showBudgetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <TrendingDown className="w-5 h-5" />
                <span>AI Algorithmic Budget Optimizer</span>
              </div>
              <button onClick={() => setShowBudgetModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <p className="text-xs text-slate-500">
              Specify your target cost reduction percentage. Tripora will substitute expensive transfers and dining while maintaining full activity coverage.
            </p>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600">Target Reduction</span>
                <span className="text-brand-700 font-mono text-sm">{reductionPercent}% (${Math.round(activeItinerary.totalEstimatedCostUsd * (reductionPercent / 100))} savings)</span>
              </div>
              <input
                type="range"
                min="5"
                max="35"
                step="5"
                value={reductionPercent}
                onChange={e => setReductionPercent(Number(e.target.value))}
                className="w-full accent-brand-600"
              />
            </div>

            {optimizationResult && (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-2 text-xs">
                <div className="flex justify-between font-bold text-emerald-900">
                  <span>New Estimated Total:</span>
                  <span className="font-mono text-sm">${optimizationResult.newTotal} USD</span>
                </div>
                <p className="text-[11px] font-bold text-emerald-800">Applied Trade-Offs:</p>
                <ul className="space-y-1 text-[11px] text-emerald-700">
                  {optimizationResult.changes.map((ch: string, i: number) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowBudgetModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={handleApplyBudgetOptimization}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-glow transition-all"
              >
                Calculate & Apply Savings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Activity Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in">
          <form onSubmit={handleCreateActivity} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-navy-900">Add Custom Activity to Day {selectedDayNumber}</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Time Period</label>
                <select
                  value={addPeriod}
                  onChange={e => setAddPeriod(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 font-medium"
                >
                  <option value="morning">Morning Schedule</option>
                  <option value="afternoon">Afternoon Schedule</option>
                  <option value="evening">Evening Schedule</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Activity Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Soba Noodle Tasting at Gion Alley"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Estimated Cost ($)</label>
                  <input
                    type="number"
                    value={newCost}
                    onChange={e => setNewCost(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Duration (Min)</label>
                  <input
                    type="number"
                    value={newDuration}
                    onChange={e => setNewDuration(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Location</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={e => setNewLocation(e.target.value)}
                  placeholder="e.g. Pontocho Waterfront"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl shadow-glow transition-all"
              >
                Save Activity
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Share & Collaboration Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-navy-900">Share & Group Collaboration</h3>
              <button onClick={() => setShowShareModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <p className="text-xs text-slate-500">
              Invite friends or family to co-plan, vote on activities, and split trip expenses.
            </p>

            <form onSubmit={handleShareInvite} className="flex gap-2">
              <input
                type="email"
                value={collaboratorEmail}
                onChange={e => setCollaboratorEmail(e.target.value)}
                placeholder="friend@travel.com"
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-navy-900 focus:outline-none focus:border-brand-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl transition-all"
              >
                Invite
              </button>
            </form>

            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Active Collaborators</span>
              {invitedList.map((email, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-xs text-slate-700">
                  <span>{email}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">Editor</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={handleCopyShareLink}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Copied to Clipboard!' : 'Copy Read-Only Link'}</span>
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-1.5 bg-navy-900 text-white text-xs font-bold rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
