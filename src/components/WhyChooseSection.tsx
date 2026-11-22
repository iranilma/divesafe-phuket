import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import {
  ShieldCheck,
  Award,
  Users,
  HeartHandshake,
  Compass,
  Star,
  Quote,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const WhyChooseSection: React.FC = () => {
  const { language } = useLanguage();
  const { settings } = useData();

  const testimonials = [
    {
      name: 'Daniel & Anna Meier',
      country: 'Zurich, Switzerland 🇨🇭',
      tag: 'Open Water Certification',
      text: 'Roman Zack is by far the most patient and knowledgeable dive instructor we have ever met. My partner was nervous about mask clearing, and Roman gave her 1-on-1 time in the pool until she felt 100% calm. Our ocean dives at Racha were unforgettable!',
      rating: 5,
      date: 'November 2026'
    },
    {
      name: 'Mikhail S.',
      country: 'Moscow, Russia 🇷🇺',
      tag: 'Day Trip King Cruiser Wreck',
      text: 'Великолепная организация! Ныряли на King Cruiser и Shark Point с DiveSafe. Очень профессиональный брифинг, отличное снаряжение, комфортный катер и вкусный обед. Настоящие профессионалы своего дела на Пхукете.',
      rating: 5,
      date: 'October 2026'
    },
    {
      name: 'Rotem Levi',
      country: 'Tel Aviv, Israel 🇮🇱',
      tag: 'Discover Scuba Diving (DSD)',
      text: 'חוויה מדהימה ביותר! ההדרכה הייתה מקצועית, סבלנית ובשפה העברית. יצאנו לראצ׳ה יאי וראינו צבי ים ואינספור דגים צבעוניים. מומלץ בחום לכל מי שמגיע לפוקט ורוצה לצלול בראש שקט ובטוח.',
      rating: 5,
      date: 'November 2026'
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-slate-900/60 text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>Excellence & Safety</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Why Dive With DiveSafe Phuket
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Our name says it all. We blend over two decades of local Phuket expertise with stringent international safety standards.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all hover:-translate-y-1 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Led by Roman Zack
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Managed directly by Roman Zack, one of the most respected and experienced dive professionals in Phuket with 20+ years guiding Andaman waters.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all hover:-translate-y-1 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Licensed & Insured
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Registered, approved and insured with Tourism Authority of Thailand (TAT no. 34/03074) and official SSI Dive Center ID 766703.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all hover:-translate-y-1 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Small Group Ratios
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Never get lost in a crowd. We guarantee intimate groups (max 1:2 for beginners, 1:4 for certified divers) for maximum attention and relaxation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/40 transition-all hover:-translate-y-1 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Truly Multilingual
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We offer full instruction and friendly briefings in English, Russian (Мы говорим по-русски) and Hebrew (עברית).
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-12 bg-slate-950/60 p-8 sm:p-12 rounded-3xl border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                Customer Testimonials
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                What Our Divers Say
              </h3>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-amber-300">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-white">4.9 / 5.0</span>
              <span className="text-slate-400">(TripAdvisor & Google Reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between relative group hover:border-cyan-500/30 transition-all"
              >
                <Quote className="w-6 h-6 text-cyan-500/20 mb-3" />
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                  "{t.text}"
                </p>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-white">{t.name}</h4>
                    <span className="text-slate-400 text-[11px] block">{t.country}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/20 text-[10px] font-semibold">
                    {t.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[11px] text-slate-400 mt-6">
            *Representative customer testimonials based on verified feedback from DiveSafe Phuket guest logbooks.
          </p>
        </div>
      </div>
    </section>
  );
};
