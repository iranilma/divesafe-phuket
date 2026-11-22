import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { DivingExperience } from '../types';
import { createWhatsAppUrl } from '../utils/whatsapp';
import {
  Search,
  Filter,
  Clock,
  Waves,
  ShieldCheck,
  MessageCircle,
  ExternalLink,
  X,
  CheckCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CatalogueSectionProps {
  onSelectExperienceForEnquiry?: (experience: DivingExperience) => void;
}

export const CatalogueSection: React.FC<CatalogueSectionProps> = ({
  onSelectExperienceForEnquiry
}) => {
  const { t } = useLanguage();
  const { experiences, settings } = useData();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [detailModalExp, setDetailModalExp] = useState<DivingExperience | null>(null);

  const categories = [
    { id: 'all', label: t.catalogue.all },
    { id: 'beginner', label: t.catalogue.beginner },
    { id: 'certified', label: t.catalogue.certified },
    { id: 'course', label: t.catalogue.courses },
    { id: 'refresher', label: t.catalogue.refresher },
    { id: 'specialty', label: t.catalogue.specialty }
  ];

  const filteredExperiences = experiences.filter(exp => {
    if (!exp.active) return false;
    const matchesCategory = selectedCategory === 'all' || exp.category === selectedCategory;
    const matchesSearch =
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (exp.maxDepth && exp.maxDepth.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleEnquireWhatsApp = (exp: DivingExperience) => {
    const text = `Hello DiveSafe Phuket! 🌊\nI am interested in booking or learning more about:\n\n*${exp.title}*\nPrice: ${exp.priceThb ? `${exp.priceThb.toLocaleString()} THB` : 'Quotation requested'}\nDuration: ${exp.duration}\n\nPlease let me know about availability and upcoming dates. Thank you!`;
    const url = createWhatsAppUrl(settings.whatsappNumber, text);
    window.open(url, '_blank');
  };

  return (
    <section id="catalogue" className="py-20 bg-slate-900/90 text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Waves className="w-3.5 h-3.5 text-cyan-400" />
            <span>Official Catalogue</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {t.catalogue.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            {t.catalogue.subtitle}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === c.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search experiences, depths..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiences.map(exp => (
            <div
              key={exp.id}
              className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all hover:shadow-xl hover:shadow-cyan-950/40 flex flex-col justify-between group"
            >
              {/* Image & Price Tag */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={exp.imageUrl}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-slate-900/90 backdrop-blur-md text-cyan-300 text-xs font-bold uppercase tracking-wider border border-slate-700">
                    {exp.category}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 text-right">
                  <div className="text-[10px] text-slate-300 font-medium">
                    {exp.priceThb ? t.catalogue.priceFrom : ''}
                  </div>
                  <div className="text-base sm:text-lg font-extrabold text-cyan-300 bg-slate-900/90 px-2.5 py-0.5 rounded-lg border border-cyan-500/30 shadow">
                    {exp.priceThb ? `${exp.priceThb.toLocaleString()} THB` : t.catalogue.requestQuote}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {exp.shortDesc}
                  </p>
                </div>

                {/* Meta pills */}
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-3 border-t border-slate-800 text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{exp.duration}</span>
                  </div>
                  {exp.maxDepth && (
                    <div className="flex items-center gap-1.5">
                      <Waves className="w-3.5 h-3.5 text-turquoise-400 shrink-0" />
                      <span>{exp.maxDepth}</span>
                    </div>
                  )}
                </div>

                {/* CTAs */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => setDetailModalExp(exp)}
                    className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 transition-colors"
                  >
                    {t.catalogue.viewDetails}
                  </button>
                  <button
                    onClick={() => handleEnquireWhatsApp(exp)}
                    className="p-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-400 hover:text-emerald-300 transition-colors"
                    title={t.catalogue.enquireWhatsApp}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredExperiences.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <p>No experiences found matching your query.</p>
          </div>
        )}
      </div>

      {/* DETAIL MODAL */}
      {detailModalExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-cyan-500/30 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setDetailModalExp(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video">
              <img
                src={detailModalExp.imageUrl}
                alt={detailModalExp.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                <span className="px-3 py-1 bg-cyan-500 text-slate-950 text-xs font-extrabold uppercase rounded-lg">
                  {detailModalExp.category}
                </span>
                <span className="text-xl font-extrabold text-cyan-300 bg-slate-950/90 px-3 py-1 rounded-lg border border-cyan-400/30">
                  {detailModalExp.priceThb ? `${detailModalExp.priceThb.toLocaleString()} THB` : 'Request Quote'}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-2xl font-extrabold text-white">
                  {detailModalExp.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Duration: {detailModalExp.duration} • Max Depth: {detailModalExp.maxDepth || 'N/A'}
                </p>
              </div>

              <div className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                {detailModalExp.description}
              </div>

              {/* Highlights */}
              {detailModalExp.highlights && detailModalExp.highlights.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                    Key Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {detailModalExp.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-4 h-4 text-turquoise-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inclusions */}
              {detailModalExp.included && detailModalExp.included.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                    Package Inclusions
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {detailModalExp.included.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prerequisites & Note */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
                <div><strong className="text-slate-300">Prerequisites:</strong> {detailModalExp.prerequisites}</div>
                {detailModalExp.priceNote && (
                  <div><strong className="text-slate-300">Pricing Note:</strong> {detailModalExp.priceNote}</div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => handleEnquireWhatsApp(detailModalExp)}
                  className="w-full sm:flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire via WhatsApp</span>
                </button>
                <button
                  onClick={() => setDetailModalExp(null)}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-semibold transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
