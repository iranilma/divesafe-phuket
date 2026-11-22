import React, { useState } from 'react';
import { Lead, LeadStatus } from '../../types';
import { useData } from '../../context/DataContext';
import { createWhatsAppUrl, adminWhatsAppTemplates } from '../../utils/whatsapp';
import {
  Users,
  Calendar,
  MessageCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  Eye,
  CheckCircle2,
  MapPin,
  Sparkles
} from 'lucide-react';

interface AdminKanbanProps {
  onSelectLead: (lead: Lead) => void;
}

export const AdminKanban: React.FC<AdminKanbanProps> = ({ onSelectLead }) => {
  const { leads, updateLeadStatus, settings } = useData();
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);

  const columns: { status: LeadStatus; label: string; color: string; bg: string }[] = [
    { status: 'New', label: 'New Enquiries', color: 'text-cyan-300', bg: 'border-cyan-500/30' },
    { status: 'Contacted', label: 'Contacted', color: 'text-sky-300', bg: 'border-sky-500/30' },
    { status: 'Follow-up', label: 'Follow-up', color: 'text-amber-300', bg: 'border-amber-500/30' },
    { status: 'Booking Pending', label: 'Booking Pending', color: 'text-yellow-300', bg: 'border-yellow-500/30' },
    { status: 'Confirmed', label: 'Confirmed', color: 'text-emerald-300', bg: 'border-emerald-500/30' },
    { status: 'Completed', label: 'Completed', color: 'text-slate-400', bg: 'border-slate-700' }
  ];

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedLeadId(id);
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStatus: LeadStatus) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain') || draggedLeadId;
    if (id) {
      updateLeadStatus(id, targetStatus);
      setDraggedLeadId(null);
    }
  };

  const moveLeadStep = (lead: Lead, direction: 'forward' | 'backward') => {
    const statusSequence: LeadStatus[] = [
      'New',
      'Contacted',
      'Follow-up',
      'Booking Pending',
      'Confirmed',
      'Completed'
    ];
    const currentIndex = statusSequence.indexOf(lead.status);
    if (currentIndex === -1) return;

    if (direction === 'forward' && currentIndex < statusSequence.length - 1) {
      updateLeadStatus(lead.id, statusSequence[currentIndex + 1]);
    } else if (direction === 'backward' && currentIndex > 0) {
      updateLeadStatus(lead.id, statusSequence[currentIndex - 1]);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Booking Pipeline Kanban</h2>
          <p className="text-xs text-slate-400">
            Drag cards between stages or use quick-step buttons to progress enquiries
          </p>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 items-start overflow-x-auto pb-4">
        {columns.map(col => {
          const colLeads = leads.filter(l => l.status === col.status);
          const colValue = colLeads.reduce((acc, c) => acc + (c.estimatedValue || 0), 0);

          return (
            <div
              key={col.status}
              onDragOver={handleDragOver}
              onDrop={e => handleDrop(e, col.status)}
              className={`bg-slate-900/90 border ${col.bg} rounded-2xl p-3 flex flex-col min-h-[500px] shadow-lg transition-colors`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <div>
                  <h3 className={`text-xs font-bold uppercase tracking-wider ${col.color}`}>
                    {col.label}
                  </h3>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {colLeads.length} leads {colValue > 0 ? `• ฿${(colValue / 1000).toFixed(0)}k` : ''}
                  </div>
                </div>
                <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-bold flex items-center justify-center">
                  {colLeads.length}
                </span>
              </div>

              {/* Cards Stream */}
              <div className="space-y-2.5 flex-1 overflow-y-auto">
                {colLeads.map(lead => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={e => handleDragStart(e, lead.id)}
                    onClick={() => onSelectLead(lead)}
                    className="p-3 bg-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-xl cursor-grab active:cursor-grabbing transition-all hover:shadow-md space-y-2 group relative"
                  >
                    {/* Top Row: Name and ID */}
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                        {lead.customerName}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400/80 shrink-0">
                        {lead.id}
                      </span>
                    </div>

                    {/* Experience Title */}
                    <p className="text-[11px] text-slate-300 font-medium line-clamp-2 leading-tight">
                      {lead.selectedExperienceTitle}
                    </p>

                    {/* Date status & Payment tag */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      {lead.status === 'Confirmed' ? (
                        <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-bold">
                          ✓ Confirmed
                        </span>
                      ) : (
                        <span className="text-[9px] bg-slate-900 text-cyan-300/90 border border-cyan-500/20 px-1.5 py-0.2 rounded font-mono">
                          Requested
                        </span>
                      )}

                      {lead.paymentStatus && (
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-bold border ${
                            lead.paymentStatus === 'Fully Paid'
                              ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                              : lead.paymentStatus === 'Deposit Paid'
                              ? 'bg-blue-950/60 text-blue-300 border-blue-500/30'
                              : lead.paymentStatus === 'Refunded'
                              ? 'bg-rose-950/60 text-rose-300 border-rose-500/30'
                              : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                        >
                          {lead.paymentStatus}
                        </span>
                      )}
                    </div>

                    {/* Meta info */}
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-cyan-400" />
                        <span>{lead.preferredDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-slate-500" />
                        <span>{lead.participants} pax</span>
                      </div>
                    </div>

                    {/* Follow-up tag if present */}
                    {lead.followUpDate && (
                      <div className="text-[10px] bg-amber-950/40 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        <span>Follow-up: {lead.followUpDate}</span>
                      </div>
                    )}

                    {/* Quick Move Buttons */}
                    <div
                      className="flex items-center justify-between pt-1 border-t border-slate-900"
                      onClick={e => e.stopPropagation()}
                    >
                      <button
                        onClick={() => moveLeadStep(lead, 'backward')}
                        className="p-1 text-slate-500 hover:text-white rounded hover:bg-slate-800"
                        title="Move Previous Stage"
                      >
                        <ArrowLeft className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => {
                          const msg = adminWhatsAppTemplates.followUpReminder(lead);
                          const url = createWhatsAppUrl(lead.whatsapp || settings.whatsappNumber, msg);
                          window.open(url, '_blank');
                        }}
                        className="p-1 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 rounded transition-colors"
                        title="WhatsApp Client"
                      >
                        <MessageCircle className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => moveLeadStep(lead, 'forward')}
                        className="p-1 text-slate-500 hover:text-white rounded hover:bg-slate-800"
                        title="Move Next Stage"
                      >
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}

                {colLeads.length === 0 && (
                  <div className="h-28 border border-dashed border-slate-800 rounded-xl flex items-center justify-center text-[11px] text-slate-500 italic text-center p-2">
                    Drag leads here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
