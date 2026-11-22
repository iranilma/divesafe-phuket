import React, { useState } from 'react';
import { Lead, LeadStatus, CustomerJourneyType } from '../../types';
import { useData } from '../../context/DataContext';
import { createWhatsAppUrl, adminWhatsAppTemplates } from '../../utils/whatsapp';
import {
  Search,
  Filter,
  Eye,
  MessageCircle,
  Trash2,
  Calendar,
  Users,
  MapPin,
  Tag,
  CheckCircle2,
  Plus
} from 'lucide-react';

interface AdminLeadsProps {
  onSelectLead: (lead: Lead) => void;
}

export const AdminLeads: React.FC<AdminLeadsProps> = ({ onSelectLead }) => {
  const { leads, updateLeadStatus, deleteLead, settings, addLead } = useData();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterJourney, setFilterJourney] = useState<string>('all');

  const statusOptions: LeadStatus[] = [
    'New',
    'Contacted',
    'Interested',
    'Follow-up',
    'Booking Pending',
    'Confirmed',
    'Completed',
    'Lost'
  ];

  const statusColors: Record<LeadStatus, { bg: string; text: string; border: string }> = {
    New: { bg: 'bg-cyan-950/80', text: 'text-cyan-300', border: 'border-cyan-500/40' },
    Contacted: { bg: 'bg-sky-950/80', text: 'text-sky-300', border: 'border-sky-500/40' },
    Interested: { bg: 'bg-indigo-950/80', text: 'text-indigo-300', border: 'border-indigo-500/40' },
    'Follow-up': { bg: 'bg-amber-950/80', text: 'text-amber-300', border: 'border-amber-500/40' },
    'Booking Pending': { bg: 'bg-yellow-950/80', text: 'text-yellow-300', border: 'border-yellow-500/40' },
    Confirmed: { bg: 'bg-emerald-950/80', text: 'text-emerald-300', border: 'border-emerald-500/40' },
    Completed: { bg: 'bg-slate-900', text: 'text-slate-400', border: 'border-slate-700' },
    Lost: { bg: 'bg-rose-950/80', text: 'text-rose-300', border: 'border-rose-500/40' }
  };

  const filteredLeads = leads.filter(l => {
    const matchesStatus = filterStatus === 'all' || l.status === filterStatus;
    const matchesJourney = filterJourney === 'all' || l.journeyType === filterJourney;
    const term = search.toLowerCase();
    const matchesSearch =
      l.customerName.toLowerCase().includes(term) ||
      l.id.toLowerCase().includes(term) ||
      l.email.toLowerCase().includes(term) ||
      l.whatsapp.toLowerCase().includes(term) ||
      l.selectedExperienceTitle.toLowerCase().includes(term) ||
      (l.accommodation && l.accommodation.toLowerCase().includes(term));
    return matchesStatus && matchesJourney && matchesSearch;
  });

  const handleOpenWhatsApp = (lead: Lead) => {
    const message = adminWhatsAppTemplates.newEnquiryReply(lead, settings.managerName);
    const url = createWhatsAppUrl(lead.whatsapp || settings.whatsappNumber, message);
    window.open(url, '_blank');
  };

  const handleSimulateNewLead = () => {
    const mockNames = ['Liam Johnson', 'Olga Smirnova', 'Amit Cohen', 'Sofia Hernandez', 'Kenji Sato'];
    const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
    const newLead = addLead({
      customerName: randomName,
      email: `${randomName.toLowerCase().replace(' ', '.')}@demo.com`,
      whatsapp: '+66 94 999 8888',
      journeyType: 'beginner',
      selectedExperienceTitle: 'Discover Scuba Diving (DSD) / Try Dive',
      certification: 'None',
      preferredDestination: 'Racha Yai Island',
      preferredDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
      participants: 2,
      accommodation: 'Centara Grand Beach Resort',
      footSize: 'EU 42, EU 38',
      source: 'Simulated Demo Enquiry',
      estimatedValue: 8400
    });
    onSelectLead(newLead);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Lead & Enquiry Management</h2>
          <p className="text-xs text-slate-400">
            {leads.length} total enquiries registered across all channels
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateNewLead}
            className="px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Simulate New Lead</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, ID, email, hotel..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400">Status:</span>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
            >
              <option value="all">All Statuses ({leads.length})</option>
              {statusOptions.map(st => (
                <option key={st} value={st}>
                  {st} ({leads.filter(l => l.status === st).length})
                </option>
              ))}
            </select>
          </div>

          {/* Journey Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400">Journey:</span>
            <select
              value={filterJourney}
              onChange={e => setFilterJourney(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
            >
              <option value="all">All Journeys</option>
              <option value="beginner">Beginner (Journey A)</option>
              <option value="certified">Certified (Journey B)</option>
              <option value="courses">Courses (Journey C)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">ID & Customer</th>
                <th className="py-3.5 px-4">Journey & Experience</th>
                <th className="py-3.5 px-4">Date & Pax</th>
                <th className="py-3.5 px-4">Hotel / Notes</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLeads.map(lead => {
                const colors = statusColors[lead.status] || {
                  bg: 'bg-slate-900',
                  text: 'text-slate-300',
                  border: 'border-slate-700'
                };
                return (
                  <tr
                    key={lead.id}
                    className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                    onClick={() => onSelectLead(lead)}
                  >
                    {/* ID & Customer */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                        <span>{lead.customerName}</span>
                      </div>
                      <div className="text-[11px] font-mono text-cyan-400/80 mt-0.5">
                        {lead.id} • {lead.whatsapp}
                      </div>
                    </td>

                    {/* Journey & Experience */}
                    <td className="py-3.5 px-4">
                      <div className="text-white font-medium line-clamp-1 max-w-xs">
                        {lead.selectedExperienceTitle}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="capitalize text-teal-300">{lead.journeyType}</span>
                        <span>•</span>
                        <span>{lead.certification || 'None'}</span>
                      </div>
                    </td>

                    {/* Date & Pax */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>Diving: {lead.preferredDate}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>Enquired: {lead.enquiryDate || lead.createdAt.split('T')[0]}</span>
                        <span>•</span>
                        <span>{lead.participants} pax</span>
                      </div>
                    </td>

                    {/* Hotel / Notes */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="text-slate-300 line-clamp-1">
                        {lead.accommodation || <span className="text-slate-500 italic">No hotel provided</span>}
                      </div>
                      {lead.footSize && (
                        <div className="text-[10px] text-amber-300 font-semibold mt-0.5">
                          Size: {lead.footSize}
                        </div>
                      )}
                    </td>

                    {/* Status & Payment */}
                    <td className="py-3.5 px-4" onClick={e => e.stopPropagation()}>
                      <div className="space-y-1">
                        <select
                          value={lead.status}
                          onChange={e => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                          className={`text-[11px] font-bold rounded-lg px-2.5 py-1 border focus:outline-none cursor-pointer w-full ${colors.bg} ${colors.text} ${colors.border}`}
                        >
                          {statusOptions.map(st => (
                            <option key={st} value={st} className="bg-slate-900 text-white">
                              {st}
                            </option>
                          ))}
                        </select>
                        <div className="flex items-center gap-1 text-[9px]">
                          <span className="text-slate-500 font-mono">Payment:</span>
                          <span
                            className={`px-1.5 py-0.2 rounded font-bold border ${
                              lead.paymentStatus === 'Fully Paid'
                                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                                : lead.paymentStatus === 'Deposit Paid'
                                ? 'bg-blue-950/60 text-blue-300 border-blue-500/30'
                                : lead.paymentStatus === 'Refunded'
                                ? 'bg-rose-950/60 text-rose-300 border-rose-500/30'
                                : 'bg-slate-900 text-slate-400 border-slate-800'
                            }`}
                          >
                            {lead.paymentStatus || 'Unpaid'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onSelectLead(lead)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors"
                          title="View Profile Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenWhatsApp(lead)}
                          className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 transition-colors"
                          title="Dispatch WhatsApp Message"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Remove enquiry ${lead.id} (${lead.customerName})?`)) {
                              deleteLead(lead.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/20 transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-xs">
            No leads found matching your search and filter criteria.
          </div>
        )}
      </div>
    </div>
  );
};
