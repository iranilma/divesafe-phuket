import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Lead } from '../../types';
import { AdminOverview } from './AdminOverview';
import { AdminLeads } from './AdminLeads';
import { AdminKanban } from './AdminKanban';
import { AdminCalendar } from './AdminCalendar';
import { AdminExperiences } from './AdminExperiences';
import { AdminAnalytics } from './AdminAnalytics';
import { AdminAutomations } from './AdminAutomations';
import { AdminSettings } from './AdminSettings';
import { AdminCustomerModal } from './AdminCustomerModal';
import {
  LayoutDashboard,
  Users,
  Kanban,
  Calendar,
  Compass,
  BarChart3,
  Zap,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
  UserCheck
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
  onNavigateToCustomer: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onLogout,
  onNavigateToCustomer
}) => {
  const { leads, settings } = useData();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'leads' | 'kanban' | 'calendar' | 'experiences' | 'analytics' | 'automations' | 'settings'
  >('overview');

  const [selectedLeadForModal, setSelectedLeadForModal] = useState<Lead | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const newLeadsCount = leads.filter(l => l.status === 'New').length;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads & Enquiries', icon: Users, badge: newLeadsCount > 0 ? newLeadsCount : undefined },
    { id: 'kanban', label: 'Booking Pipeline', icon: Kanban },
    { id: 'calendar', label: 'Booking Calendar', icon: Calendar },
    { id: 'experiences', label: 'Experience Catalogue', icon: Compass },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'automations', label: 'Automation Centre', icon: Zap },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleSelectTab = (tabId: any) => {
    setActiveTab(tabId);
    setMobileNavOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Header Brand */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-cyan-400 text-sm">
                  DS
                </div>
              </div>
              <div>
                <h1 className="font-extrabold text-white text-sm tracking-tight">DIVESAFE ADMIN</h1>
                <p className="text-[10px] text-cyan-400 font-mono">Phuket Hub Manager</p>
              </div>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="md:hidden p-1.5 text-slate-400 hover:text-white"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className={`p-3 space-y-1 ${mobileNavOpen ? 'block' : 'hidden md:block'}`}>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-slate-950 text-cyan-300' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={onNavigateToCustomer}
            className="w-full py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <span>Customer View</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onLogout}
            className="w-full py-2 px-3 rounded-xl bg-red-950/20 hover:bg-red-950/50 text-red-400 border border-red-500/20 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top bar */}
        <header className="bg-slate-900/60 border-b border-slate-800 px-6 py-3.5 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-slate-500 font-mono">STAFF ACCESS</span>
            <span>/</span>
            <span className="text-white font-semibold capitalize">{activeTab}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-400 font-medium">Operator:</span>
              <strong className="text-white">{settings.managerName}</strong>
            </div>

            <button
              onClick={onNavigateToCustomer}
              className="px-3 py-1.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <span>Back to Customer Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Demonstration Mode Banner */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>
              <strong className="text-cyan-300">Demonstration Mode:</strong> Data is saved in this local browser only. Submissions appear here immediately.
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            Origin: Local Browser Storage • Demo Auth (admin/demo123)
          </span>
        </div>

        {/* Tab View Container */}
        <div className="p-4 sm:p-8 flex-1">
          {activeTab === 'overview' && (
            <AdminOverview
              onSelectLead={lead => setSelectedLeadForModal(lead)}
              onNavigateTab={tab => setActiveTab(tab as any)}
            />
          )}

          {activeTab === 'leads' && (
            <AdminLeads onSelectLead={lead => setSelectedLeadForModal(lead)} />
          )}

          {activeTab === 'kanban' && (
            <AdminKanban onSelectLead={lead => setSelectedLeadForModal(lead)} />
          )}

          {activeTab === 'calendar' && (
            <AdminCalendar onSelectLead={lead => setSelectedLeadForModal(lead)} />
          )}

          {activeTab === 'experiences' && <AdminExperiences />}

          {activeTab === 'analytics' && <AdminAnalytics />}

          {activeTab === 'automations' && (
            <AdminAutomations onSelectLead={lead => setSelectedLeadForModal(lead)} />
          )}

          {activeTab === 'settings' && <AdminSettings />}
        </div>
      </main>

      {/* Customer Profile Deep-Dive Modal */}
      {selectedLeadForModal && (
        <AdminCustomerModal
          lead={selectedLeadForModal}
          onClose={() => setSelectedLeadForModal(null)}
        />
      )}
    </div>
  );
};
