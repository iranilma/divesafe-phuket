import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { ArrowRight, Compass, ShieldCheck, Sparkles, Waves, Award, Users, Star } from 'lucide-react';

interface HeroProps {
  onFindExperienceClick: () => void;
  onExploreCoursesClick: () => void;
  onSelectJourney: (journey: 'beginner' | 'certified' | 'courses') => void;
}

export const Hero: React.FC<HeroProps> = ({
  onFindExperienceClick,
  onExploreCoursesClick,
  onSelectJourney
}) => {
  const { t, isRtl } = useLanguage();
  const { settings } = useData();

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* Background Image with layered tropical ocean gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=85"
          alt="Phuket diving underwater"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-pulse-slow opacity-35"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-cyan-950/40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/15 via-transparent to-transparent"></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#082f4912_1px,transparent_1px),linear-gradient(to_bottom,#082f4912_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 flex flex-col items-center text-center">
        {/* Official Credential Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs sm:text-sm font-semibold shadow-lg shadow-cyan-950/50 backdrop-blur-md mb-6 hover:border-cyan-400 transition-colors">
          <ShieldCheck className="w-4 h-4 text-turquoise-400 shrink-0" />
          <span>{t.hero.badge}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl leading-[1.12] mb-6 font-sans">
          Discover Your Next{' '}
          <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-sky-400 bg-clip-text text-transparent underline decoration-cyan-500/40 decoration-wavy decoration-2">
            Underwater Adventure
          </span>
        </h1>

        {/* Supporting text */}
        <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 max-w-3xl leading-relaxed mb-10 font-normal">
          Whether you're taking your first breath underwater or exploring new dive sites, discover the right diving experience in Phuket with DiveSafe.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14">
          <button
            onClick={onFindExperienceClick}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold text-base tracking-wide shadow-xl shadow-cyan-500/30 hover:shadow-cyan-400/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 group"
          >
            <Compass className="w-5 h-5 text-slate-950 group-hover:rotate-45 transition-transform" />
            <span>{t.hero.primaryCta}</span>
            <ArrowRight className={`w-5 h-5 text-slate-950 ${isRtl ? 'rotate-180' : ''}`} />
          </button>

          <button
            onClick={onExploreCoursesClick}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-white font-bold text-base tracking-wide transition-all backdrop-blur-sm flex items-center justify-center gap-2 group"
          >
            <Waves className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>{t.hero.secondaryCta}</span>
          </button>
        </div>

        {/* 3 Quick Persona Launchers */}
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-12 text-left">
          <div
            onClick={() => onSelectJourney('beginner')}
            className="group cursor-pointer p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 backdrop-blur-md transition-all hover:-translate-y-1 shadow-md hover:shadow-cyan-500/10"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 font-bold text-sm">
                A
              </span>
              <span className="text-[11px] text-cyan-400 font-semibold tracking-wider uppercase">
                First Time
              </span>
            </div>
            <h4 className="text-white font-bold text-base group-hover:text-cyan-300 transition-colors">
              I'm a Beginner
            </h4>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              Never dived before or want a relaxed 1-day Discover Scuba trial.
            </p>
          </div>

          <div
            onClick={() => onSelectJourney('certified')}
            className="group cursor-pointer p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-teal-500/50 backdrop-blur-md transition-all hover:-translate-y-1 shadow-md hover:shadow-teal-500/10"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 font-bold text-sm">
                B
              </span>
              <span className="text-[11px] text-teal-400 font-semibold tracking-wider uppercase">
                Certified
              </span>
            </div>
            <h4 className="text-white font-bold text-base group-hover:text-teal-300 transition-colors">
              I'm a Certified Diver
            </h4>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              Hold Open Water/Advanced. Explore Phi Phi, King Cruiser wreck & Racha.
            </p>
          </div>

          <div
            onClick={() => onSelectJourney('courses')}
            className="group cursor-pointer p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 backdrop-blur-md transition-all hover:-translate-y-1 shadow-md hover:shadow-blue-500/10"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 font-bold text-sm">
                C
              </span>
              <span className="text-[11px] text-blue-400 font-semibold tracking-wider uppercase">
                Certification
              </span>
            </div>
            <h4 className="text-white font-bold text-base group-hover:text-blue-300 transition-colors">
              I Want to Learn to Dive
            </h4>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              Earn lifetime SSI / PADI Open Water or upgrade to Advanced.
            </p>
          </div>
        </div>

        {/* 3 Core Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-800/80 w-full max-w-5xl text-slate-400 text-sm">
          <div className="flex items-center justify-center gap-2.5">
            <Users className="w-5 h-5 text-cyan-400 shrink-0" />
            <span className="font-medium text-slate-300">{t.hero.trust1}</span>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <Award className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="font-medium text-slate-300">{t.hero.trust2}</span>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-medium text-slate-300">{t.hero.trust3}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
