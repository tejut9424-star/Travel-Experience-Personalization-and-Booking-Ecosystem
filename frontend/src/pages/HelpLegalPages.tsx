import React from 'react';
import { ShieldCheck, Sparkles, Award, Globe2, HelpCircle } from 'lucide-react';

interface HelpLegalPagesProps {
  pageType: 'about' | 'terms' | 'privacy' | 'cancellation';
  onNavigate: (tab: string, param?: any) => void;
}

export const HelpLegalPages: React.FC<HelpLegalPagesProps> = ({ pageType, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-in fade-in">
      
      {pageType === 'about' && (
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-premium space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-glow">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-navy-950">About Tripora AI</h1>
              <p className="text-xs text-brand-700 font-semibold">Your Journey. Reimagined by AI.</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Tripora AI was created to solve travel friction. By uniting large-scale geospatial knowledge, verified hotel and airline supplier APIs, and state-of-the-art neural itinerary synthesis, we transform hours of chaotic research into structured, executable travel magic.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-navy-900">100% Grounded</span>
              <p className="text-[11px] text-slate-500">Every POI and restaurant is validated against verified geo coordinates and live opening hours.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-navy-900">Direct Bookings</span>
              <p className="text-[11px] text-slate-500">Immediate supplier tokens and transparent fee breakdowns with zero hidden markups.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-navy-900">Dynamic Re-balancing</span>
              <p className="text-[11px] text-slate-500">Instantly optimize budgets, avoid peak crowds, and modify schedules on the fly.</p>
            </div>
          </div>
        </div>
      )}

      {pageType === 'terms' && (
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-premium space-y-4">
          <h1 className="font-display font-black text-2xl text-navy-950">Terms of Service</h1>
          <p className="text-xs text-slate-400">Last updated: October 2026</p>
          <div className="space-y-3 text-xs text-slate-600 leading-relaxed pt-2">
            <p>1. <strong>Platform Access:</strong> Tripora AI grants users a personal license to generate itineraries, compare accommodations, and execute verified reservations.</p>
            <p>2. <strong>Accuracy of AI Suggestions:</strong> While Tripora uses validated data streams, travelers should check local transit disruptions and seasonal weather alerts.</p>
            <p>3. <strong>Bookings & Payments:</strong> All booking transactions are processed through authenticated PCI-compliant payment gateways.</p>
          </div>
        </div>
      )}

      {pageType === 'privacy' && (
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-premium space-y-4">
          <h1 className="font-display font-black text-2xl text-navy-950">Privacy & Data Protection</h1>
          <p className="text-xs text-slate-400">GDPR & CCPA Compliant</p>
          <div className="space-y-3 text-xs text-slate-600 leading-relaxed pt-2">
            <p>Tripora AI respects your privacy. We never sell your personal travel information or itinerary preferences to third-party ad networks.</p>
            <p>All authentication tokens are secured with Argon2id/bcrypt encryption and short-lived JWT credentials.</p>
          </div>
        </div>
      )}

      {pageType === 'cancellation' && (
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-premium space-y-4">
          <h1 className="font-display font-black text-2xl text-navy-950">Cancellation & Refund Policy</h1>
          <div className="space-y-3 text-xs text-slate-600 leading-relaxed pt-2">
            <p><strong>Stays & Ryokans:</strong> Free cancellation up to 48 hours to 7 days prior to check-in as designated per property badge.</p>
            <p><strong>Flights:</strong> Refundable within 24 hours of booking or subject to airline fare rule guidelines.</p>
            <p><strong>Experiences:</strong> Full refund up to 24 hours before tour departure.</p>
          </div>
        </div>
      )}

    </div>
  );
};
