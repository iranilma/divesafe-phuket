import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Lead } from '../../types';
import { adminWhatsAppTemplates, createWhatsAppUrl } from '../../utils/whatsapp';
import {
  Zap,
  Clock,
  Calendar,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AdminAutomationsProps {
  onSelectLead: (lead: Lead) => void;
}

export const AdminAutomations: React.FC<AdminAutomationsProps> = ({ onSelectLead }) => {
  const { leads, updateLeadStatus, setFollowUpDate, settings } = useData();

  const [activeWorkflowTab, setActiveWorkflowTab] = useState<'wf1' | 'wf2' | 'wf3' | 'wf4'>('wf1');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Leads needing follow-up
  const followUpLeads = leads.filter(l => l.status === 'Follow-up' || l.followUpDate);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const sampleLead = leads[0] || {
    id: 'DSP-8401',
    customerName: 'Alexander Petrov',
    selectedExperienceTitle: 'Phi Phi Islands & Shark Point Day Trip',
    participants: 2,
    preferredDate: '2026-11-25',
    accommodation: 'Katathani Resort',
    whatsapp: '+66 94 001 8590'
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Simulated Automation Engine</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">Automation Centre</h2>
        <p className="text-xs text-slate-400">
          Simulate, audit, and dispatch the 4 core business workflows powering DiveSafe Phuket
        </p>
      </div>

      {/* Workflow Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveWorkflowTab('wf1')}
          className={`p-4 rounded-2xl text-left border transition-all ${
            activeWorkflowTab === 'wf1'
              ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-lg'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <div className="text-[10px] font-mono text-cyan-400 mb-1">WORKFLOW 1</div>
          <h4 className="text-xs font-bold">New Enquiry Ingestion</h4>
          <span className="text-[10px] text-slate-500 block mt-1">Status assignment & audit</span>
        </button>

        <button
          onClick={() => setActiveWorkflowTab('wf2')}
          className={`p-4 rounded-2xl text-left border transition-all ${
            activeWorkflowTab === 'wf2'
              ? 'bg-amber-950/90 border-amber-400 text-white shadow-lg'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <div className="text-[10px] font-mono text-amber-400 mb-1">WORKFLOW 2</div>
          <h4 className="text-xs font-bold">Follow-up Reminders</h4>
          <span className="text-[10px] text-slate-500 block mt-1">{followUpLeads.length} active reminders</span>
        </button>

        <button
          onClick={() => setActiveWorkflowTab('wf3')}
          className={`p-4 rounded-2xl text-left border transition-all ${
            activeWorkflowTab === 'wf3'
              ? 'bg-emerald-950/90 border-emerald-400 text-white shadow-lg'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <div className="text-[10px] font-mono text-emerald-400 mb-1">WORKFLOW 3</div>
          <h4 className="text-xs font-bold">Booking Status Sync</h4>
          <span className="text-[10px] text-slate-500 block mt-1">Calendar & audit sync</span>
        </button>

        <button
          onClick={() => setActiveWorkflowTab('wf4')}
          className={`p-4 rounded-2xl text-left border transition-all ${
            activeWorkflowTab === 'wf4'
              ? 'bg-blue-950/90 border-blue-400 text-white shadow-lg'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <div className="text-[10px] font-mono text-blue-400 mb-1">WORKFLOW 4</div>
          <h4 className="text-xs font-bold">WhatsApp Dispatch Engine</h4>
          <span className="text-[10px] text-slate-500 block mt-1">Pre-written templates</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        {/* WORKFLOW 1 */}
        {activeWorkflowTab === 'wf1' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white">Workflow 1 – New Customer Enquiry Ingestion</h3>
                <p className="text-xs text-slate-400">Triggered whenever a visitor submits a questionnaire or catalogue enquiry</p>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-xs font-bold rounded-lg flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Simulated & Active</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center">1</span>
                <h5 className="font-bold text-white">Capture & Validation</h5>
                <p className="text-slate-400 leading-relaxed">
                  Extracts name, email, WhatsApp, travel dates, participants, and hotel name.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center">2</span>
                <h5 className="font-bold text-white">Assign 'New' Status</h5>
                <p className="text-slate-400 leading-relaxed">
                  Assigns a unique identifier (e.g. DSP-8401) and sets status to 'New'.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center">3</span>
                <h5 className="font-bold text-white">Record Channel Source</h5>
                <p className="text-slate-400 leading-relaxed">
                  Tags acquisition channel (e.g. Journey A Beginner, Journey B Certified).
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center">4</span>
                <h5 className="font-bold text-white">Dashboard Audit Log</h5>
                <p className="text-slate-400 leading-relaxed">
                  Pushes real-time notification to the staff dashboard overview without page reload.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* WORKFLOW 2 */}
        {activeWorkflowTab === 'wf2' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white">Workflow 2 – Pending Follow-up Reminders</h3>
                <p className="text-xs text-slate-400">Manage clients awaiting answers, schedule dates, and log notes</p>
              </div>
              <span className="text-xs text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-500/30 font-bold">
                {followUpLeads.length} Leads Pending
              </span>
            </div>

            <div className="space-y-3">
              {followUpLeads.map(lead => (
                <div
                  key={lead.id}
                  className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{lead.customerName}</span>
                      <span className="font-mono text-[10px] text-cyan-400">{lead.id}</span>
                      <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 text-[10px] font-bold">
                        {lead.status}
                      </span>
                    </div>
                    <p className="text-slate-400">
                      Experience: {lead.selectedExperienceTitle} • Diving: {lead.preferredDate} ({lead.participants} pax)
                    </p>
                    {lead.followUpDate && (
                      <div className="text-amber-300 text-[11px] font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Scheduled for: {lead.followUpDate}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => onSelectLead(lead)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl font-semibold"
                    >
                      Open Profile
                    </button>
                    <button
                      onClick={() => updateLeadStatus(lead.id, 'Contacted')}
                      className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl"
                    >
                      Mark Contacted
                    </button>
                  </div>
                </div>
              ))}

              {followUpLeads.length === 0 && (
                <div className="py-8 text-center text-xs text-slate-500">
                  No leads currently pending follow-up. Great job!
                </div>
              )}
            </div>
          </div>
        )}

        {/* WORKFLOW 3 */}
        {activeWorkflowTab === 'wf3' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white">Workflow 3 – Confirmed Booking Sync</h3>
                <p className="text-xs text-slate-400">Automated transitions when a customer confirms their dive package</p>
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">When Enquiry Status changes to "Confirmed":</h4>
                  <ul className="list-disc list-inside text-slate-400 space-y-1.5 mt-2">
                    <li>The customer booking request is converted to a green Confirmed event.</li>
                    <li>Automatically appears on the monthly <strong>Booking Calendar</strong> for boat allocation.</li>
                    <li>An audit trail entry is posted to the <strong>Activity Log</strong>.</li>
                    <li>The estimated revenue is added to the <strong>Total Pipeline Value</strong>.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WORKFLOW 4 */}
        {activeWorkflowTab === 'wf4' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white">Workflow 4 – Pre-written WhatsApp Templates</h3>
                <p className="text-xs text-slate-400">Instant client outreach via official WhatsApp protocol</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Template 1 */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-cyan-300">1. New Enquiry Greeting</h4>
                  <button
                    onClick={() => handleCopy(adminWhatsAppTemplates.newEnquiryReply(sampleLead as Lead, settings.managerName), 't1')}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedKey === 't1' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="text-[11px] text-slate-300 font-mono whitespace-pre-wrap bg-slate-900 p-3 rounded-xl border border-slate-800/80 leading-relaxed max-h-36 overflow-y-auto">
                  {adminWhatsAppTemplates.newEnquiryReply(sampleLead as Lead, settings.managerName)}
                </pre>
              </div>

              {/* Template 2 */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-amber-300">2. Follow-up Check-in</h4>
                  <button
                    onClick={() => handleCopy(adminWhatsAppTemplates.followUpReminder(sampleLead as Lead), 't2')}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedKey === 't2' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="text-[11px] text-slate-300 font-mono whitespace-pre-wrap bg-slate-900 p-3 rounded-xl border border-slate-800/80 leading-relaxed max-h-36 overflow-y-auto">
                  {adminWhatsAppTemplates.followUpReminder(sampleLead as Lead)}
                </pre>
              </div>

              {/* Template 3 */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-teal-300">3. Equipment & Shoe Sizes Request</h4>
                  <button
                    onClick={() => handleCopy(adminWhatsAppTemplates.equipmentAndShoeSize(sampleLead as Lead), 't3')}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedKey === 't3' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="text-[11px] text-slate-300 font-mono whitespace-pre-wrap bg-slate-900 p-3 rounded-xl border border-slate-800/80 leading-relaxed max-h-36 overflow-y-auto">
                  {adminWhatsAppTemplates.equipmentAndShoeSize(sampleLead as Lead)}
                </pre>
              </div>

              {/* Template 4 */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-emerald-300">4. Booking Confirmation & Pier Pickup</h4>
                  <button
                    onClick={() => handleCopy(adminWhatsAppTemplates.bookingConfirmation(sampleLead as Lead), 't4')}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedKey === 't4' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="text-[11px] text-slate-300 font-mono whitespace-pre-wrap bg-slate-900 p-3 rounded-xl border border-slate-800/80 leading-relaxed max-h-36 overflow-y-auto">
                  {adminWhatsAppTemplates.bookingConfirmation(sampleLead as Lead)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
