import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { getRecommendation, RecommendationResult } from '../utils/recommendationEngine';
import { buildLeadWhatsAppMessage, createWhatsAppUrl, isValidPhoneNumber } from '../utils/whatsapp';
import { Lead, CustomerJourneyType } from '../types';
import {
  Compass,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Users,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MessageCircle,
  Copy,
  ExternalLink,
  ShieldCheck,
  Award,
  Clock,
  Waves,
  Anchor
} from 'lucide-react';

interface JourneysSectionProps {
  initialJourney?: CustomerJourneyType;
  onEnquirySuccess?: (leadId: string) => void;
  onNavigateToAdmin?: () => void;
}

export const JourneysSection: React.FC<JourneysSectionProps> = ({
  initialJourney = 'beginner',
  onEnquirySuccess,
  onNavigateToAdmin
}) => {
  const { t, isRtl } = useLanguage();
  const { experiences, settings, addLead } = useData();

  const [activeJourney, setActiveJourney] = useState<CustomerJourneyType>(initialJourney);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showRecommendation, setShowRecommendation] = useState<boolean>(false);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);
  const [copiedNotice, setCopiedNotice] = useState<boolean>(false);

  // Journey A Answers (Beginner)
  const [journeyAAnswers, setJourneyAAnswers] = useState({
    q1: 'No, this will be my first time',
    q2: 'Just trying diving (1-day trial)',
    q3: 2,
    q4: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    q5: 'Yes, comfortable in water',
    q6: 'Have done snorkeling before'
  });

  // Journey B Answers (Certified Diver)
  const [journeyBAnswers, setJourneyBAnswers] = useState({
    qB1: 'Open Water Diver',
    qB2: '15 - 30 dives',
    qB3: 'Within the last 6 months',
    qB4: ['Reef diving', 'Marine life'] as string[],
    qB5: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
  });

  // Journey C Answers (Learn to Dive)
  const [journeyCAnswers, setJourneyCAnswers] = useState({
    qC1: 'No, complete beginner to scuba theory',
    qC2: 'None',
    qC3: 'Beginner Certification (Open Water)',
    qC4: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
    qC5: 2
  });

  // Contact form inputs
  const [customerForm, setCustomerForm] = useState({
    customerName: '',
    email: '',
    whatsapp: '',
    accommodation: '',
    footSize: '',
    additionalRequests: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Switch Journey Tab
  const handleSelectJourney = (journey: CustomerJourneyType) => {
    setActiveJourney(journey);
    setCurrentStep(1);
    setShowRecommendation(false);
    setSubmittedLead(null);
  };

  // Get dynamic recommendation
  const currentAnswers =
    activeJourney === 'beginner'
      ? journeyAAnswers
      : activeJourney === 'certified'
      ? journeyBAnswers
      : journeyCAnswers;

  const recommendation: RecommendationResult = getRecommendation(
    activeJourney,
    currentAnswers,
    experiences
  );

  const toggleInterestTag = (tag: string) => {
    setJourneyBAnswers(prev => {
      const exists = prev.qB4.includes(tag);
      return {
        ...prev,
        qB4: exists ? prev.qB4.filter(t => t !== tag) : [...prev.qB4, tag]
      };
    });
  };

  const handleNextStep = () => {
    const maxSteps = activeJourney === 'beginner' ? 6 : 5;
    if (currentStep < maxSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowRecommendation(true);
    }
  };

  const handlePrevStep = () => {
    if (showRecommendation) {
      setShowRecommendation(false);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!customerForm.customerName.trim()) {
      errors.customerName = 'Please enter your full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerForm.email.trim() || !emailRegex.test(customerForm.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!customerForm.whatsapp.trim() || !isValidPhoneNumber(customerForm.whatsapp.trim())) {
      errors.whatsapp = 'Please provide your mobile or WhatsApp number with country code (at least 8 digits).';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const sourceLabel =
      activeJourney === 'beginner'
        ? 'Website Journey A'
        : activeJourney === 'certified'
        ? 'Website Journey B'
        : 'Website Journey C';

    const preferredDate =
      activeJourney === 'beginner'
        ? journeyAAnswers.q4
        : activeJourney === 'certified'
        ? journeyBAnswers.qB5
        : journeyCAnswers.qC4;

    const participants =
      activeJourney === 'beginner'
        ? journeyAAnswers.q3
        : activeJourney === 'certified'
        ? 1
        : journeyCAnswers.qC5;

    const certString =
      activeJourney === 'certified'
        ? journeyBAnswers.qB1
        : activeJourney === 'courses'
        ? journeyCAnswers.qC2
        : 'None (First time)';

    const newLead = addLead({
      customerName: customerForm.customerName.trim(),
      email: customerForm.email.trim(),
      whatsapp: customerForm.whatsapp.trim(),
      journeyType: activeJourney,
      selectedExperienceId: recommendation.experienceId,
      selectedExperienceTitle: recommendation.experienceTitle,
      certification: certString,
      loggedDives: activeJourney === 'certified' ? journeyBAnswers.qB2 : '0',
      lastDive: activeJourney === 'certified' ? journeyBAnswers.qB3 : undefined,
      divingInterests: activeJourney === 'certified' ? journeyBAnswers.qB4 : undefined,
      preferredDestination: recommendation.destination,
      preferredDate,
      participants,
      accommodation: customerForm.accommodation.trim(),
      footSize: customerForm.footSize.trim(),
      additionalRequests: customerForm.additionalRequests.trim(),
      source: sourceLabel,
      questionnaireAnswers: currentAnswers
    });

    setSubmittedLead(newLead);
    if (onEnquirySuccess) {
      onEnquirySuccess(newLead.id);
    }
  };

  // WhatsApp helper
  const generatedWaMessage = submittedLead
    ? buildLeadWhatsAppMessage(submittedLead)
    : buildLeadWhatsAppMessage({
        customerName: customerForm.customerName || 'Diving Guest',
        email: customerForm.email || 'guest@example.com',
        whatsapp: customerForm.whatsapp,
        selectedExperienceTitle: recommendation.experienceTitle,
        certification: activeJourney === 'certified' ? journeyBAnswers.qB1 : 'None',
        participants: activeJourney === 'beginner' ? journeyAAnswers.q3 : journeyCAnswers.qC5,
        preferredDate: activeJourney === 'beginner' ? journeyAAnswers.q4 : journeyCAnswers.qC4,
        accommodation: customerForm.accommodation,
        footSize: customerForm.footSize,
        additionalRequests: customerForm.additionalRequests
      });

  const waUrl = createWhatsAppUrl(settings.whatsappNumber, generatedWaMessage);

  const copyMessageToClipboard = () => {
    navigator.clipboard.writeText(generatedWaMessage);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 3000);
  };

  return (
    <section id="journeys" className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900">
      {/* Glow elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Match Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {t.journeys.sectionTitle}
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            {t.journeys.sectionSubtitle}
          </p>
        </div>

        {/* 3 Main Journey Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
          {/* Tab A */}
          <button
            onClick={() => handleSelectJourney('beginner')}
            className={`p-5 rounded-2xl text-left transition-all border relative flex flex-col justify-between ${
              activeJourney === 'beginner'
                ? 'bg-gradient-to-b from-cyan-950/90 to-slate-900 border-cyan-400 shadow-xl shadow-cyan-950/60 ring-1 ring-cyan-400/50'
                : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/30">
                  JOURNEY A
                </span>
                <Compass className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                {t.journeys.beginnerTab}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.journeys.beginnerSubtitle}
              </p>
            </div>
            {activeJourney === 'beginner' && (
              <div className="mt-4 flex items-center gap-1.5 text-xs text-cyan-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>Active Questionnaire</span>
              </div>
            )}
          </button>

          {/* Tab B */}
          <button
            onClick={() => handleSelectJourney('certified')}
            className={`p-5 rounded-2xl text-left transition-all border relative flex flex-col justify-between ${
              activeJourney === 'certified'
                ? 'bg-gradient-to-b from-teal-950/90 to-slate-900 border-teal-400 shadow-xl shadow-teal-950/60 ring-1 ring-teal-400/50'
                : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-bold border border-teal-400/30">
                  JOURNEY B
                </span>
                <Waves className="w-5 h-5 text-teal-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                {t.journeys.certifiedTab}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.journeys.certifiedSubtitle}
              </p>
            </div>
            {activeJourney === 'certified' && (
              <div className="mt-4 flex items-center gap-1.5 text-xs text-teal-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                <span>Active Questionnaire</span>
              </div>
            )}
          </button>

          {/* Tab C */}
          <button
            onClick={() => handleSelectJourney('courses')}
            className={`p-5 rounded-2xl text-left transition-all border relative flex flex-col justify-between ${
              activeJourney === 'courses'
                ? 'bg-gradient-to-b from-blue-950/90 to-slate-900 border-blue-400 shadow-xl shadow-blue-950/60 ring-1 ring-blue-400/50'
                : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-400/30">
                  JOURNEY C
                </span>
                <Award className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                {t.journeys.coursesTab}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.journeys.coursesSubtitle}
              </p>
            </div>
            {activeJourney === 'courses' && (
              <div className="mt-4 flex items-center gap-1.5 text-xs text-blue-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                <span>Active Questionnaire</span>
              </div>
            )}
          </button>
        </div>

        {/* Content Box */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          {/* Header of Active Journey */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {activeJourney === 'beginner' && t.journeys.journeyATitle}
                {activeJourney === 'certified' && t.journeys.journeyBTitle}
                {activeJourney === 'courses' && t.journeys.journeyCTitle}
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                {activeJourney === 'beginner' && t.journeys.journeyADesc}
                {activeJourney === 'certified' && t.journeys.journeyBDesc}
                {activeJourney === 'courses' && t.journeys.journeyCDesc}
              </p>
            </div>

            {/* Step progress */}
            {!showRecommendation && (
              <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-950/80 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs font-semibold text-cyan-300">
                <span>{t.common.step}</span>
                <span className="text-white font-bold">{currentStep}</span>
                <span>{t.common.of}</span>
                <span>{activeJourney === 'beginner' ? 6 : 5}</span>
              </div>
            )}
          </div>

          {/* QUESTIONNAIRE STEPS */}
          {!showRecommendation ? (
            <div className="space-y-8 min-h-[280px]">
              {/* JOURNEY A STEPS */}
              {activeJourney === 'beginner' && (
                <>
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <label className="text-lg font-bold text-white block">
                        {t.journeys.q1TriedDiving}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          'No, this will be my first time ever',
                          'Yes, tried a pool trial dive once',
                          'Yes, did a tandem ocean dive in the past',
                          'Experienced snorkeler but never scuba dived'
                        ].map(opt => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setJourneyAAnswers({ ...journeyAAnswers, q1: opt })}
                            className={`p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                              journeyAAnswers.q1 === opt
                                ? 'bg-cyan-500/15 border-cyan-400 text-cyan-200 shadow-md ring-1 ring-cyan-400/40'
                                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <label className="text-lg font-bold text-white block">
                        {t.journeys.q2TryOrCert}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { val: 'Just trying diving (1-day trial)', desc: '1 Day Discover Scuba trial, no classroom exam' },
                          { val: 'Full Certification', desc: 'Earn lifetime Open Water Diver certification (3 Days)' },
                          { val: 'Both / Undecided', desc: 'Start with 1 day, then upgrade if loving it' }
                        ].map(item => (
                          <button
                            key={item.val}
                            type="button"
                            onClick={() => setJourneyAAnswers({ ...journeyAAnswers, q2: item.val })}
                            className={`p-4 rounded-xl border text-left transition-all ${
                              journeyAAnswers.q2 === item.val
                                ? 'bg-cyan-500/15 border-cyan-400 text-cyan-200 shadow-md ring-1 ring-cyan-400/40'
                                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className="font-bold text-sm text-white">{item.val}</div>
                            <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <label className="text-lg font-bold text-white block">
                        {t.journeys.q3Participants}
                      </label>
                      <div className="flex flex-wrap items-center gap-3">
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setJourneyAAnswers({ ...journeyAAnswers, q3: num })}
                            className={`w-14 h-14 rounded-2xl border text-lg font-bold transition-all flex items-center justify-center ${
                              journeyAAnswers.q3 === num
                                ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-lg'
                                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                        <span className="text-xs text-slate-400 ml-2">
                          *DiveSafe maintains strict small group ratios (max 1:2 to 1:4 per instructor).
                        </span>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-4">
                      <label className="text-lg font-bold text-white block">
                        {t.journeys.q4Date}
                      </label>
                      <div className="max-w-md">
                        <input
                          type="date"
                          value={journeyAAnswers.q4}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={e => setJourneyAAnswers({ ...journeyAAnswers, q4: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-cyan-400"
                        />
                        <p className="text-xs text-slate-400 mt-2">
                          Flexible dates can be adjusted with our team on WhatsApp anytime.
                        </p>
                      </div>
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div className="space-y-4">
                      <label className="text-lg font-bold text-white block">
                        {t.journeys.q5Swimming}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { val: 'Yes, comfortable in water', desc: 'Can swim and float easily in deep sea' },
                          { val: 'Basic swimming ability', desc: 'Can swim but prefer calm, shallow conditions' },
                          { val: 'Not very confident', desc: 'Need very patient guidance and life jacket' },
                          { val: 'Prefer shore', desc: 'Prefer starting right off Kata beach rather than a large boat' }
                        ].map(item => (
                          <button
                            key={item.val}
                            type="button"
                            onClick={() => setJourneyAAnswers({ ...journeyAAnswers, q5: item.val })}
                            className={`p-4 rounded-xl border text-left transition-all ${
                              journeyAAnswers.q5 === item.val
                                ? 'bg-cyan-500/15 border-cyan-400 text-cyan-200 shadow-md ring-1 ring-cyan-400/40'
                                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className="font-bold text-sm text-white">{item.val}</div>
                            <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep === 6 && (
                    <div className="space-y-4">
                      <label className="text-lg font-bold text-white block">
                        {t.journeys.q6PreviousExp}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          'Have done snorkeling before',
                          'Complete beginner with zero water sports',
                          'Did a trial dive years ago',
                          'Frequently swim in oceans/lakes'
                        ].map(opt => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setJourneyAAnswers({ ...journeyAAnswers, q6: opt })}
                            className={`p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                              journeyAAnswers.q6 === opt
                                ? 'bg-cyan-500/15 border-cyan-400 text-cyan-200 shadow-md ring-1 ring-cyan-400/40'
                                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* JOURNEY B STEPS (Certified Diver) */}
              {activeJourney === 'certified' && (
                <>
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <label className="text-lg font-bold text-white block">
                        {t.journeys.qB1Cert}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { val: 'Open Water Diver', agency: 'SSI / PADI / CMAS (Max 18m)' },
                          { val: 'Advanced Open Water', agency: 'SSI / PADI / RAID (Max 30m)' },
                          { val: 'Rescue Diver', agency: 'Trained in rescue & safety' },
                          { val: 'Divemaster / Instructor', agency: 'Professional rating' },
                          { val: 'Other Certification', agency: 'Specialty / National agency' }
                        ].map(item => (
                          <button
                            key={item.val}
                            type="button"
                            onClick={() => setJourneyBAnswers({ ...journeyBAnswers, qB1: item.val })}
                            className={`p-4 rounded-xl border text-left transition-all ${
                              journeyBAnswers.qB1 === item.val
                                ? 'bg-teal-500/15 border-teal-400 text-teal-200 shadow-md ring-1 ring-teal-400/40'
                                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className="font-bold text-sm text-white">{item.val}</div>
                            <div className="text-xs text-slate-400 mt-1">{item.agency}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <label className="text-lg font-bold text-white block">
                        {t.journeys.qB2LoggedDives}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['1 - 10 dives', '11 - 30 dives', '31 - 70 dives', '70+ dives'].map(opt => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setJourneyBAnswers({ ...journeyBAnswers, qB2: opt })}
                            className={`p-4 rounded-xl border text-center font-bold text-sm transition-all ${
                              journeyBAnswers.qB2 === opt
                                ? 'bg-teal-500 border-teal-400 text-slate-950 shadow-md'
                                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <label className="text-lg font-bold text-white block">
                        {t.journeys.qB3LastDive}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { val: 'Within the last 3 months', note: 'Current & ready to dive any verified site' },
                          { val: '3 - 6 months ago', note: 'Recent diver, comfortable' },
                          { val: '6 - 12 months ago', note: 'May benefit from a quick check on dive 1' },
                          { val: '1 - 3 years ago', note: 'Skills Refresher recommended for safety' },
                          { val: 'Over 3 years ago', note: 'Full Scuba Skills Update strongly advised' }
                        ].map(item => (
                          <button
                            key={item.val}
                            type="button"
                            onClick={() => setJourneyBAnswers({ ...journeyBAnswers, qB3: item.val })}
                            className={`p-4 rounded-xl border text-left transition-all ${
                              journeyBAnswers.qB3 === item.val
                                ? 'bg-teal-500/15 border-teal-400 text-teal-200 shadow-md ring-1 ring-teal-400/40'
                                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className="font-bold text-sm text-white">{item.val}</div>
                            <div className="text-xs text-slate-400 mt-1">{item.note}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-4">
                      <label className="text-lg font-bold text-white block">
                        {t.journeys.qB4Interests}
                      </label>
                      <p className="text-xs text-slate-400">Select all that apply:</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                          'Reef diving',
                          'Marine life (Sharks & Turtles)',
                          'Wreck diving',
                          'Deep diving',
                          'Island diving',
                          'Multiple dive sites (3 Dives/day)'
                        ].map(tag => {
                          const isSelected = journeyBAnswers.qB4.includes(tag);
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => toggleInterestTag(tag)}
                              className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                                isSelected
                                  ? 'bg-teal-500/20 border-teal-400 text-teal-200 shadow-sm'
                                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                              }`}
                            >
                              <span>{tag}</span>
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div className="space-y-4">
                      <label className="text-lg font-bold text-white block">
                        {t.journeys.qB5Date}
                      </label>
                      <div className="max-w-md">
                        <input
                          type="date"
                          value={journeyBAnswers.qB5}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={e => setJourneyBAnswers({ ...journeyBAnswers, qB5: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-teal-400"
                        />
                        <p className="text-xs text-slate-400 mt-2">
                          Day trips depart daily at 7:30 AM from Chalong Pier with hotel pickup.
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* JOURNEY C STEPS (Learn to Dive) */}
              {activeJourney === 'courses' && (
                <>
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <label className="text-lg font-bold text-white block">
                        {t.journeys.qC1CourseBefore}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          'No, complete beginner to scuba theory',
                          'Yes, completed online theory / e-learning',
                          'Completed pool training elsewhere (Referral)',
                          'Have read dive manuals / books'
                        ].map(opt => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setJourneyCAnswers({ ...journeyCAnswers, qC1: opt })}
                            className={`p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                              journeyCAnswers.qC1 === opt
                                ? 'bg-blue-500/15 border-blue-400 text-blue-200 shadow-md ring-1 ring-blue-400/40'
                                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <label className="text-lg font-bold text-white block">
                        {t.journeys.qC2CurrentCert}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { val: 'None', desc: 'Starting from scratch' },
                          { val: 'Open Water Diver', desc: 'Wanting Advanced 30m' },
                          { val: 'Scuba Diver (12m)', desc: 'Upgrading to full Open Water' }
                        ].map(item => (
                          <button
                            key={item.val}
                            type="button"
                            onClick={() => setJourneyCAnswers({ ...journeyCAnswers, qC2: item.val })}
                            className={`p-4 rounded-xl border text-left transition-all ${
                              journeyCAnswers.qC2 === item.val
                                ? 'bg-blue-500/15 border-blue-400 text-blue-200 shadow-md ring-1 ring-blue-400/40'
                                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className="font-bold text-sm text-white">{item.val}</div>
                            <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <label className="text-lg font-bold text-white block">
                        {t.journeys.qC3LevelWanted}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { val: 'Beginner Certification (Open Water)', desc: '3 Days: pool + 4 ocean dives down to 18m' },
                          { val: 'Advanced Training', desc: '2 Days: 5 adventure dives extending depth to 30m' },
                          { val: 'Fast-Track (2 Days)', desc: 'Complete theory at home, pool & 4 boat dives in Phuket' },
                          { val: 'Zero-to-Hero Combo (4 Days)', desc: 'Open Water + Advanced combo (save 2,300 THB)' }
                        ].map(item => (
                          <button
                            key={item.val}
                            type="button"
                            onClick={() => setJourneyCAnswers({ ...journeyCAnswers, qC3: item.val })}
                            className={`p-4 rounded-xl border text-left transition-all ${
                              journeyCAnswers.qC3 === item.val
                                ? 'bg-blue-500/15 border-blue-400 text-blue-200 shadow-md ring-1 ring-blue-400/40'
                                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className="font-bold text-sm text-white">{item.val}</div>
                            <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-4">
                      <label className="text-lg font-bold text-white block">
                        {t.journeys.qC4Date}
                      </label>
                      <div className="max-w-md">
                        <input
                          type="date"
                          value={journeyCAnswers.qC4}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={e => setJourneyCAnswers({ ...journeyCAnswers, qC4: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-blue-400"
                        />
                        <p className="text-xs text-slate-400 mt-2">
                          Courses start almost every day. Private and flexible scheduling available.
                        </p>
                      </div>
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div className="space-y-4">
                      <label className="text-lg font-bold text-white block">
                        {t.journeys.qC5Participants}
                      </label>
                      <div className="flex flex-wrap items-center gap-3">
                        {[1, 2, 3, 4].map(num => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setJourneyCAnswers({ ...journeyCAnswers, qC5: num })}
                            className={`w-14 h-14 rounded-2xl border text-lg font-bold transition-all flex items-center justify-center ${
                              journeyCAnswers.qC5 === num
                                ? 'bg-blue-500 border-blue-400 text-white shadow-lg'
                                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                        <span className="text-xs text-slate-400 ml-2">
                          Individual private tuition or small couple/family groups.
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className={`px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all flex items-center gap-2 ${
                    currentStep === 1
                      ? 'opacity-30 cursor-not-allowed border-slate-800 text-slate-600'
                      : 'border-slate-700 text-slate-300 hover:text-white hover:border-slate-600'
                  }`}
                >
                  <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                  <span>{t.common.back}</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm transition-all shadow-md flex items-center gap-2"
                >
                  <span>
                    {currentStep === (activeJourney === 'beginner' ? 6 : 5)
                      ? 'See My Recommendation'
                      : t.common.next}
                  </span>
                  <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          ) : (
            /* RECOMMENDATION ENGINE RESULT & ENQUIRY FORM */
            <div className="space-y-8 animate-fadeIn">
              {/* Recommendation Card */}
              <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 border border-cyan-500/50 p-6 sm:p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-l from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs tracking-wider rounded-bl-xl shadow-md">
                  BEST MATCH
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-5 relative rounded-xl overflow-hidden aspect-video sm:aspect-4/3 border border-slate-800">
                    <img
                      src={recommendation.imageUrl}
                      alt={recommendation.experienceTitle}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <span className="bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded-md font-semibold border border-slate-700">
                        {recommendation.duration}
                      </span>
                      <span className="bg-cyan-500 text-slate-950 px-2.5 py-1 rounded-md font-extrabold shadow">
                        {recommendation.priceDisplay}
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-3.5">
                    <div className="text-xs text-cyan-400 font-bold tracking-widest uppercase flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>{t.journeys.recTitle}</span>
                    </div>

                    <h4 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {recommendation.experienceTitle}
                    </h4>

                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                      <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="font-semibold text-white">Destination:</span>
                      <span>{recommendation.destination}</span>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                      {recommendation.explanation}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block font-semibold mb-0.5">Suitable For:</span>
                        <span className="text-slate-200">{recommendation.suitableProfile}</span>
                      </div>
                      <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block font-semibold mb-0.5">Prerequisites:</span>
                        <span className="text-slate-200">{recommendation.requirements}</span>
                      </div>
                    </div>

                    {recommendation.alternativeExperienceId && (
                      <div className="p-3 bg-slate-900/90 border border-cyan-500/30 rounded-xl flex items-center justify-between gap-3 text-xs">
                        <div>
                          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">
                            Alternative Match
                          </span>
                          <span className="text-white font-medium">{recommendation.alternativeTitle}</span>
                        </div>
                        <span className="text-[11px] text-slate-400">Available on request</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Important Operator Disclaimer as specified */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-start gap-2.5 text-xs text-amber-300/90 bg-amber-950/20 p-3 rounded-xl border border-amber-500/20">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    {t.journeys.disclaimer}
                  </p>
                </div>
              </div>

              {/* ENQUIRY & WHATSAPP SUBMISSION */}
              {!submittedLead ? (
                <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 sm:p-8">
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
                    <div>
                      <h4 className="text-xl font-bold text-white">
                        {t.journeys.contactFormTitle}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        We will prepare a customized quotation and reservation breakdown for your preferred dates.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowRecommendation(false)}
                      className="text-xs text-slate-400 hover:text-cyan-400 underline"
                    >
                      Change Answers
                    </button>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          {t.journeys.nameLabel}
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Michael Smith"
                          value={customerForm.customerName}
                          onChange={e => setCustomerForm({ ...customerForm, customerName: e.target.value })}
                          className={`w-full bg-slate-900 border rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none ${
                            formErrors.customerName ? 'border-red-500' : 'border-slate-700 focus:border-cyan-400'
                          }`}
                        />
                        {formErrors.customerName && (
                          <span className="text-red-400 text-xs mt-1 block">{formErrors.customerName}</span>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          {t.journeys.emailLabel}
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. michael@example.com"
                          value={customerForm.email}
                          onChange={e => setCustomerForm({ ...customerForm, email: e.target.value })}
                          className={`w-full bg-slate-900 border rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none ${
                            formErrors.email ? 'border-red-500' : 'border-slate-700 focus:border-cyan-400'
                          }`}
                        />
                        {formErrors.email && (
                          <span className="text-red-400 text-xs mt-1 block">{formErrors.email}</span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* WhatsApp Phone */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          {t.journeys.whatsappLabel}
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g. +44 7700 900123 or +66 94..."
                          value={customerForm.whatsapp}
                          onChange={e => setCustomerForm({ ...customerForm, whatsapp: e.target.value })}
                          className={`w-full bg-slate-900 border rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none ${
                            formErrors.whatsapp ? 'border-red-500' : 'border-slate-700 focus:border-cyan-400'
                          }`}
                        />
                        {formErrors.whatsapp && (
                          <span className="text-red-400 text-xs mt-1 block">{formErrors.whatsapp}</span>
                        )}
                      </div>

                      {/* Hotel */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          {t.journeys.hotelLabel}
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Katathani Resort, Kata Beach"
                          value={customerForm.accommodation}
                          onChange={e => setCustomerForm({ ...customerForm, accommodation: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Shoe Size - official DiveSafe note */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Foot / Fin Size (e.g. EU 42, 38)
                        </label>
                        <input
                          type="text"
                          placeholder="Helps us prep gear beforehand"
                          value={customerForm.footSize}
                          onChange={e => setCustomerForm({ ...customerForm, footSize: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      {/* Additional notes */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          {t.journeys.notesLabel}
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. dietary requirements, ear sensitivity"
                          value={customerForm.additionalRequests}
                          onChange={e => setCustomerForm({ ...customerForm, additionalRequests: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
                      >
                        <MessageCircle className="w-4 h-4 text-slate-950" />
                        <span>{t.journeys.submitEnquiry}</span>
                      </button>

                      <span className="text-xs text-slate-400">
                        Instant simulation: creates structured enquiry in local database and formats WhatsApp message.
                      </span>
                    </div>
                  </form>
                </div>
              ) : (
                /* POST-SUBMISSION SUCCESS & WHATSAPP HUB */
                <div className="bg-gradient-to-br from-emerald-950/40 via-slate-950 to-slate-900 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 animate-fadeIn">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">
                        Enquiry Successfully Registered!
                      </h4>
                      <p className="text-xs text-emerald-300">
                        Reference ID: <span className="font-mono font-bold">{submittedLead.id}</span> • Logged in Local Demo Database
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 mb-6">
                    {t.journeys.enquirySuccess} You can now click below to open the pre-formatted WhatsApp chat with Roman Zack and our team, or inspect how this lead appears live in the Staff Portal.
                  </p>

                  {/* Generated WhatsApp Message Preview */}
                  <div className="mb-6 bg-slate-950 border border-slate-800 rounded-xl p-4">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                      <span>PRE-FILLED WHATSAPP MESSAGE:</span>
                      <button
                        onClick={copyMessageToClipboard}
                        className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedNotice ? 'Copied!' : 'Copy Text'}</span>
                      </button>
                    </div>
                    <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                      {generatedWaMessage}
                    </pre>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{t.journeys.openWhatsAppBtn}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {onNavigateToAdmin && (
                      <button
                        onClick={onNavigateToAdmin}
                        className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-sm font-semibold flex items-center gap-2 transition-all"
                      >
                        <span>View in Admin Dashboard</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setSubmittedLead(null);
                        setCurrentStep(1);
                        setShowRecommendation(false);
                      }}
                      className="px-4 py-3 rounded-xl text-slate-400 hover:text-white text-xs underline"
                    >
                      Start Another Enquiry
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
