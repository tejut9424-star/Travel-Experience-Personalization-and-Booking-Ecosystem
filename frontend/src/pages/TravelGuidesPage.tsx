import React from 'react';
import { BookOpen, Clock, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { mockTravelGuides } from '../data/mockData';

interface TravelGuidesPageProps {
  onNavigate: (tab: string, param?: any) => void;
  onOpenPlannerModal: (destName?: string) => void;
}

export const TravelGuidesPage: React.FC<TravelGuidesPageProps> = ({ onNavigate, onOpenPlannerModal }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5 text-brand-600" />
          <span>Curated Travel Lore & Regional Insider Guides</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-navy-950">
          Travel Guides & Cultural Stories
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Deep-dives into regional customs, culinary micro-seasons, and precision timing strategies.
        </p>
      </div>

      {/* Featured Guide List */}
      <div className="space-y-8">
        {mockTravelGuides.map(guide => (
          <div
            key={guide.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-premium p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
          >
            <div className="lg:col-span-1 h-64 rounded-2xl overflow-hidden">
              <img src={guide.coverImage} alt={guide.title} className="w-full h-full object-cover" />
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1 rounded-full border border-brand-200">
                  {guide.destination}, {guide.country}
                </span>
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {guide.readTimeMinutes} min read
                </span>
              </div>

              <h2 className="font-display font-black text-2xl text-navy-950 leading-snug">
                {guide.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {guide.summary}
              </p>

              <div className="space-y-3 pt-2">
                {guide.sections.map((sec, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                    <h4 className="font-bold text-xs text-navy-900">{sec.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{sec.content}</p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img src={guide.author.avatar} alt={guide.author.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-bold text-navy-900">{guide.author.name}</p>
                    <p className="text-[10px] text-slate-400">{guide.author.role}</p>
                  </div>
                </div>

                <button
                  onClick={() => onOpenPlannerModal(guide.destination)}
                  className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl shadow-glow transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Plan with these tips</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
