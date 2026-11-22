import React, { useState, useEffect } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { JourneysSection } from './components/JourneysSection';
import { CatalogueSection } from './components/CatalogueSection';
import { DestinationsSection } from './components/DestinationsSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { MessageCircle, UserCheck, ShieldCheck, ArrowUp, X, ExternalLink } from 'lucide-react';
import { createWhatsAppUrl } from './utils/whatsapp';

const MainAppContent: React.FC = () => {
  const { settings, leads } = useData();
  const { isRtl } = useLanguage();

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('divesafe_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  // Route state: 'customer' | 'admin-login' | 'admin-dashboard'
  const [view, setView] = useState<'customer' | 'admin-login' | 'admin-dashboard'>(() => {
    if (window.location.hash === '#admin') {
      try {
        return localStorage.getItem('divesafe_admin_auth') === 'true' ? 'admin-dashboard' : 'admin-login';
      } catch {
        return 'admin-login';
      }
    }
    return 'customer';
  });

  const [preselectedJourney, setPreselectedJourney] = useState<'beginner' | 'certified' | 'courses'>('beginner');
  const [newLeadNotification, setNewLeadNotification] = useState<string | null>(null);

  // Sync hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setView(isAdminAuthenticated ? 'admin-dashboard' : 'admin-login');
      } else {
        setView('customer');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAdminAuthenticated]);

  const handleNavigateToAdmin = () => {
    if (isAdminAuthenticated) {
      setView('admin-dashboard');
      window.location.hash = '#admin';
    } else {
      setView('admin-login');
      window.location.hash = '#admin';
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    localStorage.setItem('divesafe_admin_auth', 'true');
    setView('admin-dashboard');
    window.location.hash = '#admin';
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem('divesafe_admin_auth');
    } catch (e) {
      console.error(e);
    }
    setView('admin-login');
    window.location.hash = '#admin';
  };

  const handleNavigateToCustomer = () => {
    setView('customer');
    window.location.hash = '';
  };

  const scrollToSection = (sectionId: string) => {
    if (view !== 'customer') {
      setView('customer');
      window.location.hash = '';
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectJourney = (journey: 'beginner' | 'certified' | 'courses' = 'beginner') => {
    setPreselectedJourney(journey);
    scrollToSection('journeys');
  };

  const handleLeadEnquirySuccess = (leadId: string) => {
    setNewLeadNotification(leadId);
  };

  // WhatsApp floating widget URL
  const floatingWaUrl = createWhatsAppUrl(
    settings.whatsappNumber,
    "Hello DiveSafe Phuket! 🌊 I'm visiting your digital experience hub and would like to ask about diving availability."
  );

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 ${isRtl ? 'rtl' : 'ltr'}`}>
      {/* Customer Application View */}
      {view === 'customer' && (
        <>
          <Header
            onNavigateToAdmin={handleNavigateToAdmin}
            onNavigateToJourneys={handleSelectJourney}
            onNavigateToCatalogue={() => scrollToSection('catalogue')}
            onNavigateToSection={scrollToSection}
          />

          <main>
            <Hero
              onFindExperienceClick={() => handleSelectJourney('beginner')}
              onExploreCoursesClick={() => scrollToSection('catalogue')}
              onSelectJourney={handleSelectJourney}
            />

            <JourneysSection
              initialJourney={preselectedJourney}
              onEnquirySuccess={handleLeadEnquirySuccess}
              onNavigateToAdmin={handleNavigateToAdmin}
            />

            <CatalogueSection />

            <DestinationsSection />

            <WhyChooseSection />

            <FAQSection />
          </main>

          <Footer
            onNavigateToAdmin={handleNavigateToAdmin}
            onNavigateToSection={scrollToSection}
          />

          {/* Floating WhatsApp Button */}
          <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
            <a
              href={floatingWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-sm rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 transition-all group"
              title="Chat with DiveSafe Phuket on WhatsApp"
            >
              <MessageCircle className="w-5 h-5 fill-slate-950 text-slate-950 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">WhatsApp Roman Zack</span>
            </a>
          </div>

          {/* Demonstration Mode Switcher floating bar at bottom left */}
          <div className="fixed bottom-6 left-6 z-40">
            <button
              onClick={handleNavigateToAdmin}
              className="px-3 py-2 bg-slate-900/95 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2 backdrop-blur-md transition-all hover:scale-105"
            >
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <span>Admin Staff Portal</span>
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] px-1.5 py-0.2 rounded-md font-mono">
                {leads.length} leads
              </span>
            </button>
          </div>

          {/* Top Real-time Enquiry Notification Banner */}
          {newLeadNotification && (
            <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 max-w-lg w-[90%] bg-emerald-950/95 border border-emerald-400 text-white p-4 rounded-2xl shadow-2xl backdrop-blur-xl animate-fadeIn flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  ✓
                </span>
                <div className="text-xs">
                  <p className="font-bold text-emerald-300">Demo enquiry saved locally</p>
                  <p className="text-slate-300">Enquiry {newLeadNotification} added to demonstration dashboard (stored in this browser).</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleNavigateToAdmin}
                  className="px-3 py-1 bg-emerald-500 text-slate-950 rounded-lg text-xs font-bold shrink-0 hover:bg-emerald-400"
                >
                  View Lead
                </button>
                <button
                  onClick={() => setNewLeadNotification(null)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Admin Login View */}
      {view === 'admin-login' && (
        <AdminLogin
          onLoginSuccess={handleAdminLoginSuccess}
          onBackToCustomer={handleNavigateToCustomer}
        />
      )}

      {/* Admin Dashboard View */}
      {view === 'admin-dashboard' && (
        <AdminDashboard
          onLogout={handleAdminLogout}
          onNavigateToCustomer={handleNavigateToCustomer}
        />
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <DataProvider>
      <LanguageProvider>
        <MainAppContent />
      </LanguageProvider>
    </DataProvider>
  );
};

export default App;
