import React, { useState } from 'react';
import { Sparkles, Mail, ShieldCheck, Globe2, Heart, Award, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-navy-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-400 flex items-center justify-center shadow-glow">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-white">
                Tripora<span className="text-brand-400">.ai</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Your Journey. Reimagined by AI. Discover bespoke destinations, generate validated multi-day itineraries, and book premier stays and experiences in one seamless ecosystem.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-400" /> Verified Supplier APIs
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-coral-400" /> 99.8% Itinerary Precision
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-white text-xs uppercase font-bold tracking-wider font-display">Explore Ecosystem</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('destinations')} className="hover:text-brand-400 transition-colors">Popular Destinations</button></li>
              <li><button onClick={() => onNavigate('stays')} className="hover:text-brand-400 transition-colors">Curated Stays & Ryokans</button></li>
              <li><button onClick={() => onNavigate('flights')} className="hover:text-brand-400 transition-colors">Flight Search & Status</button></li>
              <li><button onClick={() => onNavigate('activities')} className="hover:text-brand-400 transition-colors">Signature Experiences</button></li>
              <li><button onClick={() => onNavigate('guides')} className="hover:text-brand-400 transition-colors">Travel Guides & Lore</button></li>
            </ul>
          </div>

          {/* AI Capabilities */}
          <div className="space-y-3">
            <h4 className="text-white text-xs uppercase font-bold tracking-wider font-display">AI Intelligence</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('planner')} className="hover:text-brand-400 transition-colors">AI Trip Planner</button></li>
              <li><button onClick={() => onNavigate('itinerary-editor')} className="hover:text-brand-400 transition-colors">Interactive Itinerary Studio</button></li>
              <li><button onClick={() => onNavigate('dashboard')} className="hover:text-brand-400 transition-colors">Budget Optimizer</button></li>
              <li><button onClick={() => onNavigate('partner')} className="hover:text-brand-400 transition-colors">Partner Inventory Portal</button></li>
              <li><button onClick={() => onNavigate('admin')} className="hover:text-brand-400 transition-colors">Admin Health Console</button></li>
            </ul>
          </div>

          {/* Newsletter / Updates */}
          <div className="space-y-3">
            <h4 className="text-white text-xs uppercase font-bold tracking-wider font-display">Travel Intelligence Dispatch</h4>
            <p className="text-xs text-slate-400">Receive weekly AI-curated flight deals, seasonal travel guides, and early access destination releases.</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="traveler@world.com"
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold py-2.5 rounded-xl transition-colors shadow-glow flex items-center justify-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" /> Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Subscribed! Welcome aboard.
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Tripora AI Inc. All rights reserved. Precision Travel Architecture.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('terms')} className="hover:text-slate-300 transition-colors">Terms of Service</button>
            <button onClick={() => onNavigate('privacy')} className="hover:text-slate-300 transition-colors">Privacy Policy</button>
            <button onClick={() => onNavigate('cancellation')} className="hover:text-slate-300 transition-colors">Cancellation Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
