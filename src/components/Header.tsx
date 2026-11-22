import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { Compass, Phone, MessageCircle, ShieldCheck, Globe, Menu, X, ArrowRight, UserCheck } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface HeaderProps {
  onNavigateToAdmin: () => void;
  onNavigateToJourneys: (journey?: 'beginner' | 'certified' | 'courses') => void;
  onNavigateToCatalogue: (category?: string) => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateToAdmin,
  onNavigateToJourneys,
  onNavigateToCatalogue,
  onNavigateToSection
}) => {
  const { language, setLanguage, t, isRtl } = useLanguage();
  const { settings, leads } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const newLeadsCount = leads.filter(l => l.status === 'New').length;

  const languages: { code: SupportedLanguage; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'he', label: 'עברית', flag: '🇮🇱' }
  ];

  const handleNav = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-cyan-900/30 text-white transition-colors">
      {/* Top micro-bar */}
      <div className="bg-gradient-to-r from-ocean-950 via-slate-900 to-ocean-950 border-b border-cyan-900/20 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-turquoise-400" />
              {settings.tatLicense}
            </span>
            <span className="hidden sm:inline-block text-slate-600">•</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-300">
              {settings.ssiCenterId}
            </span>
            <span className="hidden md:inline-block text-slate-600">•</span>
            <span className="hidden md:inline-block text-amber-300/90 font-medium">
              {language === 'ru' ? 'Говорим по-русски' : language === 'he' ? 'הדרכה בעברית ובאנגלית' : 'English • Русский • עברית'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${settings.whatsappNumber}`}
              className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
            >
              <Phone className="w-3 h-3 text-cyan-400" />
              <span className="hidden sm:inline">{settings.formattedPhone}</span>
            </a>
            <a
              href={`https://wa.me/${settings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-slate-800/80 rounded-md px-1.5 py-0.5 border border-slate-700/60">
              <Globe className="w-3 h-3 text-cyan-400 mr-1" />
              {languages.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-all ${
                    language === l.code
                      ? 'bg-cyan-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title={l.label}
                >
                  {l.code.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Admin Hub Direct Link */}
            <button
              onClick={onNavigateToAdmin}
              className="flex items-center gap-1.5 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 px-2 py-0.5 rounded text-[11px] font-semibold transition-all shadow-sm"
              title="Access Admin Booking Hub"
            >
              <UserCheck className="w-3 h-3 text-cyan-400" />
              <span>{t.nav.adminPortal}</span>
              {newLeadsCount > 0 && (
                <span className="bg-amber-400 text-slate-950 text-[10px] px-1 rounded-full font-bold">
                  {newLeadsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <div
          onClick={() => onNavigateToSection('hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/30 transition-shadow">
            <img
              src="https://divesafephuket.com/wp-content/uploads/2023/01/logo-150x150.jpeg"
              alt="DiveSafe Phuket"
              className="w-full h-full object-cover rounded-[10px]"
              onError={(e) => {
                // fallback icon if remote image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-cyan-950 rounded-[10px] -z-10">
              <Compass className="w-6 h-6 text-cyan-400 animate-spin-slow" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent font-sans">
                DIVESAFE
              </span>
              <span className="text-xs px-1.5 py-0.5 bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 font-bold rounded tracking-wider">
                PHUKET
              </span>
            </div>
            <p className="text-[10px] tracking-widest text-slate-400 uppercase font-medium">
              The sea is Calling • Experience Hub
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => onNavigateToSection('hero')}
            className="hover:text-cyan-300 transition-colors"
          >
            {t.nav.home}
          </button>
          <button
            onClick={() => onNavigateToJourneys()}
            className="hover:text-cyan-300 transition-colors text-cyan-300 flex items-center gap-1 font-semibold"
          >
            <span>{t.nav.journeys}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          </button>
          <button
            onClick={() => onNavigateToCatalogue()}
            className="hover:text-cyan-300 transition-colors"
          >
            {t.nav.catalogue}
          </button>
          <button
            onClick={() => onNavigateToSection('destinations')}
            className="hover:text-cyan-300 transition-colors"
          >
            {t.nav.destinations}
          </button>
          <button
            onClick={() => onNavigateToSection('why-us')}
            className="hover:text-cyan-300 transition-colors"
          >
            {t.nav.whyUs}
          </button>
          <button
            onClick={() => onNavigateToSection('faq')}
            className="hover:text-cyan-300 transition-colors"
          >
            {t.nav.faq}
          </button>
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => onNavigateToJourneys()}
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-semibold rounded-xl group bg-gradient-to-br from-cyan-500 to-blue-600 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all active:scale-95"
          >
            <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-slate-950/20 rounded-[10px] flex items-center gap-2">
              <span>{t.nav.bookNow}</span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </span>
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/95 border-b border-cyan-800/40 px-4 py-4 space-y-3 animate-fadeIn">
          <div className="flex flex-col space-y-2 text-sm font-medium">
            <button
              onClick={() => handleNav(() => onNavigateToSection('hero'))}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-800 text-slate-200"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleNav(() => onNavigateToJourneys())}
              className="text-left py-2 px-3 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-semibold"
            >
              {t.nav.journeys} (Find Your Dive)
            </button>
            <button
              onClick={() => handleNav(() => onNavigateToCatalogue())}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-800 text-slate-200"
            >
              {t.nav.catalogue}
            </button>
            <button
              onClick={() => handleNav(() => onNavigateToSection('destinations'))}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-800 text-slate-200"
            >
              {t.nav.destinations}
            </button>
            <button
              onClick={() => handleNav(() => onNavigateToSection('why-us'))}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-800 text-slate-200"
            >
              {t.nav.whyUs}
            </button>
            <button
              onClick={() => handleNav(() => onNavigateToSection('faq'))}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-800 text-slate-200"
            >
              {t.nav.faq}
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => handleNav(() => onNavigateToJourneys())}
              className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold rounded-xl text-center shadow-md"
            >
              {t.nav.bookNow}
            </button>
            <button
              onClick={() => handleNav(onNavigateToAdmin)}
              className="w-full py-2 bg-slate-800 text-cyan-300 border border-cyan-700/40 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>{t.nav.adminPortal}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
