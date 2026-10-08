import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Layers, Info } from 'lucide-react';
import { mockDestinations } from '../../data/mockData';

interface InteractiveMapProps {
  selectedDestination?: string;
  onSelectDestination?: (destName: string) => void;
  height?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  selectedDestination = 'Kyoto',
  onSelectDestination,
  height = 'h-96'
}) => {
  const [activePin, setActivePin] = useState<string>(selectedDestination);
  const [mapLayer, setMapLayer] = useState<'satellite' | 'terrain' | 'streets'>('streets');

  const pins = [
    { name: 'Kyoto', country: 'Japan', x: '78%', y: '40%', rating: 4.9, cost: '$145/day', tag: 'Temples & Zen' },
    { name: 'Amalfi Coast', country: 'Italy', x: '52%', y: '36%', rating: 4.95, cost: '$220/day', tag: 'Cliffside Romance' },
    { name: 'Bali & Ubud', country: 'Indonesia', x: '75%', y: '62%', rating: 4.88, cost: '$75/day', tag: 'Tropical Serenity' },
    { name: 'Reykjavik', country: 'Iceland', x: '44%', y: '18%', rating: 4.92, cost: '$210/day', tag: 'Northern Lights' },
    { name: 'Zermatt & Swiss Alps', country: 'Switzerland', x: '49%', y: '32%', rating: 4.96, cost: '$260/day', tag: 'Alpine Matterhorn' },
    { name: 'Santorini', country: 'Greece', x: '56%', y: '42%', rating: 4.91, cost: '$230/day', tag: 'Caldera Sunsets' }
  ];

  return (
    <div className={`relative w-full ${height} rounded-3xl overflow-hidden border border-slate-200/80 shadow-inner bg-slate-900 select-none group`}>
      {/* Background Graphic Grid / World Vector */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity filter saturate-50 contrast-125 transition-transform duration-700 group-hover:scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80')`
        }}
      />

      {/* Modern High-Tech Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />

      {/* Top Floating Controls */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="glass-dark px-3 py-1.5 rounded-full flex items-center gap-2 text-xs text-white border border-white/10 shadow-lg">
          <Navigation className="w-3.5 h-3.5 text-brand-400 animate-pulse" />
          <span className="font-bold">Global Travel Mesh</span>
          <span className="text-[10px] text-slate-400">| 6 Active Regions</span>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 glass-dark p-1 rounded-2xl border border-white/10">
        {(['streets', 'terrain', 'satellite'] as const).map(layer => (
          <button
            key={layer}
            onClick={() => setMapLayer(layer)}
            className={`px-2.5 py-1 text-[10px] font-bold rounded-xl capitalize transition-all ${
              mapLayer === layer ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            {layer}
          </button>
        ))}
      </div>

      {/* Interactive Pins */}
      {pins.map(pin => {
        const isSelected = activePin.toLowerCase().includes(pin.name.toLowerCase()) || pin.name.toLowerCase().includes(activePin.toLowerCase());
        return (
          <div
            key={pin.name}
            style={{ left: pin.x, top: pin.y }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <div className="relative group/pin cursor-pointer" onClick={() => {
              setActivePin(pin.name);
              if (onSelectDestination) onSelectDestination(pin.name);
            }}>
              {/* Pulsing ring */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isSelected ? 'bg-brand-500 text-white ring-4 ring-brand-400/40 scale-125' : 'bg-navy-900/90 text-brand-400 hover:bg-brand-600 hover:text-white'
              } shadow-glow`}>
                <MapPin className="w-4 h-4" />
              </div>

              {/* Tooltip Card */}
              <div className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-3 rounded-2xl bg-white text-navy-900 shadow-2xl border border-slate-100 transition-all duration-200 pointer-events-none ${
                isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover/pin:opacity-100 group-hover/pin:translate-y-0'
              }`}>
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>{pin.name}</span>
                  <span className="text-amber-500 font-bold">★ {pin.rating}</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">{pin.country} • {pin.tag}</p>
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="font-extrabold text-brand-700">{pin.cost}</span>
                  <span className="text-[9px] uppercase font-bold text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded">View Info</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Bottom Info Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between glass-dark px-4 py-3 rounded-2xl border border-white/10 text-white">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-bold">Active Focus: {activePin}</span>
        </div>
        <div className="text-[11px] text-slate-300 hidden sm:flex items-center gap-4">
          <span>Real-time weather routing enabled</span>
          <span className="text-brand-400 font-mono">Precision ±5m</span>
        </div>
      </div>
    </div>
  );
};
