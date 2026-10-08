import React, { useState } from 'react';
import { Sparkles, Compass, MapPin, Calendar, Users, DollarSign, ArrowRight, ShieldCheck, Check, RotateCcw } from 'lucide-react';
import { mockDestinations } from '../data/mockData';
import { useTrip } from '../context/TripContext';
import { useChat } from '../context/ChatContext';

interface AiTripPlannerPageProps {
  onNavigate: (tab: string, param?: any) => void;
  onOpenPlannerModal: () => void;
}

export const AiTripPlannerPage: React.FC<AiTripPlannerPageProps> = ({ onNavigate, onOpenPlannerModal }) => {
  const { openChat } = useChat();
  const [promptText, setPromptText] = useState('');

  const prebuiltPrompts = [
    {
      title: '7-Day Cultural Zen Kyoto & Nara',
      prompt: 'Plan a 7-day cultural and culinary journey to Kyoto and Nara for 2 people with luxury ryokans and private tea tastings.',
      tag: 'Japan • Cultural',
      img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: '5-Day Amalfi Coast Romantic Escape',
      prompt: 'Design a 5-day romantic coastal itinerary in Amalfi with cliffside dinners, Capri boat charter, and lemon grove walks.',
      tag: 'Italy • Romance',
      img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: '6-Day Iceland Ring Road & Aurora Hunt',
      prompt: 'Build a 6-day adventure in Iceland focused on geothermal lagoons, glacier hikes, black sand beaches, and Northern Lights.',
      tag: 'Iceland • Adventure',
      img: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: '7-Day Ubud Wellness & Rice Terraces',
      prompt: 'Create a 7-day relaxing wellness retreat in Ubud Bali with yoga, organic cooking, waterfall hikes, and private pool villas.',
      tag: 'Bali • Wellness',
      img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const handleLaunchPlan = (prompt: string) => {
    openChat(`Please plan this complete trip: "${prompt}"`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
          <span>FastAPI Neural Travel Synthesizer</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-navy-950">
          AI Trip Planner Studio
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Experience zero-friction travel orchestration. Tell Tripora AI what you crave, and receive an executable multi-day itinerary with exact timings, walking routes, and budget estimates.
        </p>

        <div className="pt-4 flex items-center justify-center gap-3">
          <button
            onClick={onOpenPlannerModal}
            className="px-6 py-3.5 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-glow transition-all hover:scale-105 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch Step-by-Step AI Wizard</span>
          </button>
          <button
            onClick={() => onNavigate('itinerary-editor')}
            className="px-6 py-3.5 bg-white border border-slate-200 hover:border-brand-400 text-navy-900 font-bold text-xs sm:text-sm rounded-2xl transition-all shadow-xs"
          >
            Open Active Itinerary Studio
          </button>
        </div>
      </div>

      {/* Instant Prompt Runner Bar */}
      <div className="max-w-3xl mx-auto bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-premium space-y-4">
        <h3 className="font-bold text-xs uppercase tracking-wider text-navy-900">
          Or Type Freeform Travel Instructions:
        </h3>
        <div className="relative">
          <textarea
            value={promptText}
            onChange={e => setPromptText(e.target.value)}
            rows={3}
            placeholder="e.g. Plan a 10-day trip through Swiss Alps and Northern Italy for a family of 4 with a budget of $5,000. Include scenic trains and child-friendly hikes."
            className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs text-navy-900 placeholder-slate-400 focus:outline-none focus:border-brand-500 resize-none"
          />
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-slate-400">Validated against live opening hours & distance matrix</span>
          <button
            onClick={() => handleLaunchPlan(promptText || 'Plan a 7-day culinary and culture trip to Kyoto')}
            className="px-5 py-2.5 bg-navy-900 hover:bg-brand-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2"
          >
            <span>Execute AI Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Pre-Engineered Master Itinerary Blueprints */}
      <div className="space-y-6">
        <div>
          <h2 className="font-display font-black text-2xl text-navy-900">Popular AI-Synthesized Blueprints</h2>
          <p className="text-xs text-slate-500">Click any curated blueprint to clone, customize, and budget-optimize.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {prebuiltPrompts.map((bp, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col justify-between card-hover-effect"
            >
              <div className="relative h-44">
                <img src={bp.img} alt={bp.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-navy-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  {bp.tag}
                </span>
              </div>
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-navy-900 leading-snug">{bp.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-3">{bp.prompt}</p>
                </div>
                <button
                  onClick={() => handleLaunchPlan(bp.prompt)}
                  className="w-full py-2.5 bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Blueprint</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
