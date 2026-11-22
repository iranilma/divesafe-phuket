import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { Destination } from '../types';
import { createWhatsAppUrl } from '../utils/whatsapp';
import {
  MapPin,
  Clock,
  Waves,
  ShieldCheck,
  MessageCircle,
  Fish,
  Anchor,
  Compass,
  ArrowRight
} from 'lucide-react';

interface DestinationsSectionProps {
  onSelectDestination?: (destName: string) => void;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  onSelectDestination
}) => {
  const { t } = useLanguage();
  const { destinations, settings } = useData();
  const [activeTab, setActiveTab] = useState<string>(destinations[0]?.id || 'phi-phi');

  const selectedDestination = destinations.find(d => d.id === activeTab) || destinations[0];

  const handleEnquireDestination = (dest: Destination) => {
    const text = `Hello DiveSafe Phuket! 🌊\nI would love to learn more about your day trips to *${dest.name}* (${dest.tripDuration}). Please share upcoming schedule and availability. Thank you!`;
    const url = createWhatsAppUrl(settings.whatsappNumber, text);
    window.open(url, '_blank');
  };

  return (
    <section id="destinations" className="py-20 bg-slate-950 text-white relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Phuket Dive Sites</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {t.destinations.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            {t.destinations.subtitle}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {destinations.map(d => (
            <button
              key={d.id}
              onClick={() => setActiveTab(d.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === d.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/25'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{d.name}</span>
            </button>
          ))}
        </div>

        {/* Featured Destination Showcase */}
        {selectedDestination && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Image side */}
              <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-[460px]">
                <img
                  src={selectedDestination.imageUrl}
                  alt={selectedDestination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4">
                  {selectedDestination.thaiName && (
                    <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md text-amber-300 text-xs font-semibold rounded-lg border border-amber-500/30">
                      {selectedDestination.thaiName}
                    </span>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-700 font-semibold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {selectedDestination.tripDuration}
                  </span>
                  {selectedDestination.marineParkFee && (
                    <span className="bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 px-3 py-1.5 rounded-lg font-bold">
                      {selectedDestination.marineParkFee}
                    </span>
                  )}
                </div>
              </div>

              {/* Text Info Side */}
              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">
                    Featured Destination
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                    {selectedDestination.name}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mt-4">
                    {selectedDestination.description}
                  </p>
                </div>

                {/* Key attributes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block font-semibold mb-1 flex items-center gap-1.5">
                      <Waves className="w-3.5 h-3.5 text-cyan-400" />
                      Depth Range:
                    </span>
                    <span className="text-white font-bold text-sm">{selectedDestination.depthRange}</span>
                  </div>

                  <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block font-semibold mb-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-turquoise-400" />
                      Requirements:
                    </span>
                    <span className="text-slate-200">{selectedDestination.requirements}</span>
                  </div>
                </div>

                {/* Marine life tags */}
                <div>
                  <span className="text-xs font-bold text-slate-300 block mb-2 flex items-center gap-1.5">
                    <Fish className="w-3.5 h-3.5 text-teal-400" />
                    Key Marine Life Sightings:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDestination.marineLife.map(m => (
                      <span
                        key={m}
                        className="px-2.5 py-1 bg-cyan-950/60 border border-cyan-500/20 text-cyan-200 text-xs rounded-lg"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dive sites included */}
                {selectedDestination.diveOptions && (
                  <div>
                    <span className="text-xs font-bold text-slate-300 block mb-2 flex items-center gap-1.5">
                      <Anchor className="w-3.5 h-3.5 text-blue-400" />
                      Available Dive Sites & Reefs:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDestination.diveOptions.map(opt => (
                        <span
                          key={opt}
                          className="px-2.5 py-1 bg-slate-950 text-slate-300 text-xs rounded-lg border border-slate-800 font-mono"
                        >
                          {opt}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action button */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => handleEnquireDestination(selectedDestination)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Check Trip Dates on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
