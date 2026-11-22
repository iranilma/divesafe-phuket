import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import {
  Compass,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  MessageCircle,
  Award,
  Globe,
  UserCheck
} from 'lucide-react';

interface FooterProps {
  onNavigateToAdmin: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToAdmin,
  onNavigateToSection
}) => {
  const { t } = useLanguage();
  const { settings } = useData();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1: Brand & Credentials */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5">
                <img
                  src="https://divesafephuket.com/wp-content/uploads/2023/01/logo-150x150.jpeg"
                  alt="DiveSafe Phuket"
                  className="w-full h-full object-cover rounded-[10px]"
                  onError={e => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight">
                  DIVESAFE PHUKET
                </span>
                <p className="text-[10px] text-cyan-400 tracking-wider uppercase font-semibold">
                  The sea is Calling • Est. Phuket
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Premier certified scuba diving center in Phuket, Thailand. Guided island day trips, wreck diving, and beginner-to-advanced certification courses led by veteran dive professional Roman Zack.
            </p>

            <div className="space-y-1.5 pt-2">
              <div className="flex items-center gap-2 text-slate-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-turquoise-400" />
                <span>{settings.tatLicense} (Tourism Authority of Thailand)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 font-medium">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>{settings.ssiCenterId}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Experiences */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Diving Programs
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateToSection('journeys')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Discover Scuba (Beginners)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('catalogue')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Open Water Diver Course
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('catalogue')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Advanced Open Water
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('catalogue')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Scuba Skills Refresher
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('catalogue')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Enriched Air Nitrox
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Destinations */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Destinations
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateToSection('destinations')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Phi Phi Islands
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('destinations')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Racha Yai & Racha Noi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('destinations')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  King Cruiser Wreck
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('destinations')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Shark Point & Koh Dok Mai
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('destinations')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Kata Beach Shore Reef
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Staff */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Contact & Location
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`tel:${settings.whatsappNumber}`} className="hover:text-cyan-300">
                  {settings.formattedPhone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-cyan-300">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  Chat with Roman Zack on WA
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={onNavigateToAdmin}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-800/40 rounded-lg text-[11px] font-semibold"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Administrative Portal</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} DiveSafe Phuket. All rights reserved. Registered TAT 34/03074.
          </div>
          <div className="flex items-center gap-4">
            <span>English • Мы говорим по-русски • עברית</span>
            <span>•</span>
            <span className="text-slate-400">Digital Experience & Booking Prototype</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
