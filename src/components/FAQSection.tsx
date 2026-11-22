import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const FAQSection: React.FC = () => {
  const { t } = useLanguage();
  const { settings } = useData();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'I’ve never dived before. Can I try scuba diving in Phuket?',
      a: 'Yes, absolutely! We offer Discover Scuba Diving (DSD) programs tailored specifically for beginners. These include a comprehensive safety briefing, gentle practice in shallow water or a swimming pool, and two guided ocean dives with a dedicated instructor at your side at all times.'
    },
    {
      q: 'Do I need to know how to swim to try scuba diving?',
      a: 'While basic swimming and water comfort are helpful, strong swimming skills are not mandatory for introductory trial diving (Discover Scuba). For full multi-day certification courses (Open Water Diver), standard agency requirements do include swimming 200m and treading water for 10 minutes.'
    },
    {
      q: 'What should I bring for my diving day trip?',
      a: 'Just bring your swimwear, sunscreen (reef-safe preferred), sunglasses, a towel, and a sense of adventure! We provide all necessary scuba equipment, tanks, weights, breakfast and hot buffet lunch on the boat, and fresh fruits.'
    },
    {
      q: 'Which diving certifications do you offer?',
      a: 'We are an official SSI Dive Center (ID 766703) and also offer certified instruction under PADI and other recognized agencies. Courses range from beginner Open Water Diver to Advanced Adventurer, Rescue Diver, Divemaster, and specialties like Nitrox and Deep Diving.'
    },
    {
      q: 'What languages does your instructional team speak?',
      a: 'We are proud to provide complete diving instruction and personalized briefings in English, Russian (Мы говорим по-русски) and Hebrew (עברית). Roman Zack and our team ensure clear communication and zero confusion underwater.'
    },
    {
      q: 'Where do the dive boats depart from?',
      a: 'Most day trips depart from Chalong Pier in southern Phuket around 7:30–8:00 AM. We provide round-trip hotel transfers from Rawai, Nai Harn, Chalong, Kata, and Karon included in our packages.'
    },
    {
      q: 'Do you offer liveaboard trips to the Similan Islands?',
      a: 'Yes! DiveSafe Phuket partners with top-rated liveaboard operators to offer multi-day voyages to the Similan Islands, Koh Tachai, and Richelieu Rock between October and May. Inquire via WhatsApp for current cabin schedules.'
    }
  ];

  const handleAskMoreWhatsApp = () => {
    const text = 'Hello DiveSafe Phuket! I have a question about diving trips in Phuket: ';
    const url = createWhatsAppUrl(settings.whatsappNumber, text);
    window.open(url, '_blank');
  };

  return (
    <section id="faq" className="py-20 bg-slate-950 text-white relative border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Everything you need to know about diving conditions, certifications, and booking with DiveSafe.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-bold text-sm sm:text-base text-white flex items-center justify-between gap-4 hover:text-cyan-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-slate-900 border border-cyan-500/30 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-bold text-white">Have a specific question?</h4>
            <p className="text-xs text-slate-400">We are happy to chat and give impartial advice on Phuket dive sites.</p>
          </div>
          <button
            onClick={handleAskMoreWhatsApp}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Directly on WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  );
};
