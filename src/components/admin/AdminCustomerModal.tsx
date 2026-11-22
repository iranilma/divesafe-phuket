import React, { useState } from 'react';
import { Lead, LeadStatus, PaymentStatus } from '../../types';
import { useData } from '../../context/DataContext';
import { createWhatsAppUrl, adminWhatsAppTemplates, buildLeadWhatsAppMessage } from '../../utils/whatsapp';
import {
  X,
  User,
  Phone,
  Mail,
  Calendar,
  Clock,
  MapPin,
  Award,
  MessageCircle,
  FileText,
  Plus,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Tag,
  CreditCard,
  ShieldAlert
} from 'lucide-react';

interface AdminCustomerModalProps {
  lead: Lead;
  onClose: () => void;
}

export const AdminCustomerModal: React.FC<AdminCustomerModalProps> = ({ lead, onClose }) => {
  const { updateLeadStatus, updateLead, updateLeadPaymentStatus, addLeadNote, setFollowUpDate, settings } = useData();

  const [newNoteText, setNewNoteText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('newEnquiry');
  const [followUpInput, setFollowUpInput] = useState(lead.followUpDate || '');
  const [saveFollowUpSuccess, setSaveFollowUpSuccess] = useState(false);
  const [paymentUpdateNotice, setPaymentUpdateNotice] = useState(false);

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

  const paymentOptions: PaymentStatus[] = ['Unpaid', 'Deposit Paid', 'Fully Paid', 'Refunded'];

  const handleStatusChange = (newStatus: LeadStatus) => {
    updateLeadStatus(lead.id, newStatus);
  };

  const handlePaymentChange = (newPayment: PaymentStatus) => {
    updateLeadPaymentStatus(lead.id, newPayment);
    setPaymentUpdateNotice(true);
    setTimeout(() => setPaymentUpdateNotice(false), 2000);
  };

  const handleMarkConfirmed = () => {
    const today = new Date().toISOString().split('T')[0];
    updateLead(lead.id, {
      status: 'Confirmed',
      confirmationDate: today
    });
    addLeadNote(lead.id, `Booking verified and confirmed on ${today}. Departure guaranteed.`, settings.managerName);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    addLeadNote(lead.id, newNoteText.trim(), settings.managerName || 'Roman Zack');
    setNewNoteText('');
  };

  const handleSaveFollowUp = () => {
    setFollowUpDate(lead.id, followUpInput);
    setSaveFollowUpSuccess(true);
    setTimeout(() => setSaveFollowUpSuccess(false), 2500);
  };

  // WhatsApp template helper
  let messageToSend = '';
  if (selectedTemplate === 'newEnquiry') {
    messageToSend = adminWhatsAppTemplates.newEnquiryReply(lead, settings.managerName);
  } else if (selectedTemplate === 'followUp') {
    messageToSend = adminWhatsAppTemplates.followUpReminder(lead);
  } else if (selectedTemplate === 'bookingConfirmed') {
    messageToSend = adminWhatsAppTemplates.bookingConfirmation(lead);
  } else if (selectedTemplate === 'shoeEquipment') {
    messageToSend = adminWhatsAppTemplates.equipmentAndShoeSize(lead);
  }

  const directWaUrl = createWhatsAppUrl(lead.whatsapp || settings.whatsappNumber, messageToSend);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative text-slate-200">
        {/* Header Bar */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{lead.customerName}</h3>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                  {lead.id}
                </span>
              </div>
              <span className="text-xs text-slate-400">
                Source: {lead.source} • Registered: {new Date(lead.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Status Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Status:</span>
              <select
                value={lead.status}
                onChange={e => handleStatusChange(e.target.value as LeadStatus)}
                className="bg-slate-950 border border-cyan-500/40 text-cyan-300 font-semibold text-xs rounded-xl px-3 py-1.5 focus:outline-none"
              >
                {statusOptions.map(st => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Quick Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-0.5">Experience</span>
              <span className="text-xs font-bold text-white line-clamp-1">{lead.selectedExperienceTitle}</span>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-0.5">Date & Divers</span>
              <span className="text-xs font-bold text-cyan-300">
                {lead.preferredDate} ({lead.participants} pax)
              </span>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-0.5">Est. Value</span>
              <span className="text-xs font-bold text-emerald-400">
                {lead.estimatedValue ? `${lead.estimatedValue.toLocaleString()} THB` : 'Pending quote'}
              </span>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-0.5">Journey Type</span>
              <span className="text-xs font-bold text-teal-300 uppercase">{lead.journeyType}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Col 1: Customer & Diving Details */}
            <div className="space-y-6">
              <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  Contact Information
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-400">Email:</span>
                    <a href={`mailto:${lead.email}`} className="text-white hover:underline">
                      {lead.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-400">Phone/WA:</span>
                    <span className="text-white font-mono">{lead.whatsapp}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-400">Hotel Accommodation:</span>
                    <span className="text-white">{lead.accommodation || 'Not provided'}</span>
                  </div>
                  {lead.footSize && (
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-400">Foot/Fin Size:</span>
                      <span className="text-amber-300 font-bold">{lead.footSize}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Diving Background */}
              <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">
                  Diving Experience & Qualifications
                </h4>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400">Certification Held:</span>{' '}
                    <strong className="text-white">{lead.certification || 'None / Beginner'}</strong>
                  </div>
                  {lead.loggedDives && (
                    <div>
                      <span className="text-slate-400">Logged Dives:</span>{' '}
                      <strong className="text-white">{lead.loggedDives}</strong>
                    </div>
                  )}
                  {lead.lastDive && (
                    <div>
                      <span className="text-slate-400">Last Scuba Dive:</span>{' '}
                      <strong className="text-white">{lead.lastDive}</strong>
                    </div>
                  )}
                  {lead.divingInterests && lead.divingInterests.length > 0 && (
                    <div>
                      <span className="text-slate-400 block mb-1">Diving Interests:</span>
                      <div className="flex flex-wrap gap-1">
                        {lead.divingInterests.map(i => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-teal-300"
                          >
                            {i}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {lead.additionalRequests && (
                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-slate-400 block mb-0.5">Client Notes / Requests:</span>
                      <p className="text-slate-300 italic bg-slate-900 p-2.5 rounded-lg border border-slate-800/80">
                        "{lead.additionalRequests}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Booking Lifecycle & Payment Tracking */}
              <div className="bg-slate-950/70 p-5 rounded-2xl border border-cyan-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-cyan-400" />
                    <span>Booking Verification & Payment (Demo)</span>
                  </h4>
                  {lead.status === 'Confirmed' ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                      Confirmed Booking
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                      Enquiry / Requested Date
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Enquiry Date:</span>
                    <strong className="text-white">{lead.enquiryDate || lead.createdAt.split('T')[0]}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Requested Diving Date:</span>
                    <strong className="text-cyan-300">{lead.requestedDivingDate || lead.preferredDate}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Confirmation Date:</span>
                    <strong className="text-emerald-400">{lead.confirmationDate || 'Not yet confirmed'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Payment Status:</span>
                    <select
                      value={lead.paymentStatus || 'Unpaid'}
                      onChange={e => handlePaymentChange(e.target.value as PaymentStatus)}
                      className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-2 py-1 mt-0.5 focus:outline-none focus:border-cyan-400"
                    >
                      {paymentOptions.map(p => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {lead.status !== 'Confirmed' && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleMarkConfirmed}
                      className="w-full py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verify & Confirm Booking</span>
                    </button>
                  </div>
                )}

                {paymentUpdateNotice && (
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Payment status updated locally.
                  </p>
                )}

                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[10px] text-slate-400 flex items-start gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    Demonstration Mode: An enquiry is not a confirmed booking until verified. Payment statuses are editable demonstration records with no real financial transactions.
                  </span>
                </div>
              </div>

              {/* Follow-up Scheduler */}
              <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Scheduled Follow-up Date</span>
                </h4>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={followUpInput}
                    onChange={e => setFollowUpInput(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                  <button
                    onClick={handleSaveFollowUp}
                    className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all"
                  >
                    Save Reminder
                  </button>
                  {saveFollowUpSuccess && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Saved!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Col 2: Notes & WhatsApp Outreach */}
            <div className="space-y-6">
              {/* WhatsApp Quick Dispatch */}
              <div className="bg-slate-950/70 p-5 rounded-2xl border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Dispatch Tool</span>
                  </h4>
                  <span className="text-[10px] text-slate-400">Pre-written templates</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedTemplate('newEnquiry')}
                    className={`p-2 rounded-lg text-left border ${
                      selectedTemplate === 'newEnquiry'
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    1. New Reply
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTemplate('followUp')}
                    className={`p-2 rounded-lg text-left border ${
                      selectedTemplate === 'followUp'
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    2. Follow-up
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTemplate('shoeEquipment')}
                    className={`p-2 rounded-lg text-left border ${
                      selectedTemplate === 'shoeEquipment'
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    3. Sizes & Details
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTemplate('bookingConfirmed')}
                    className={`p-2 rounded-lg text-left border ${
                      selectedTemplate === 'bookingConfirmed'
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    4. Confirmation
                  </button>
                </div>

                <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap bg-slate-900 p-3 rounded-xl border border-slate-800 max-h-36 overflow-y-auto leading-relaxed">
                  {messageToSend}
                </pre>

                <a
                  href={directWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open WhatsApp with This Message</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Internal Staff Notes */}
              <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>Internal Staff Notes ({lead.notes?.length || 0})</span>
                </h4>

                {/* Notes Stream */}
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {lead.notes && lead.notes.length > 0 ? (
                    lead.notes.map(n => (
                      <div key={n.id} className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                          <strong className="text-cyan-300">{n.author}</strong>
                          <span>{new Date(n.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="text-slate-200">{n.text}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-slate-500 italic py-2">
                      No internal notes recorded yet for this client.
                    </div>
                  )}
                </div>

                {/* Add note input */}
                <form onSubmit={handleAddNote} className="space-y-2 pt-2 border-t border-slate-800">
                  <textarea
                    rows={2}
                    placeholder="Add a new internal note (e.g. called client, spoke about Racha trip)..."
                    value={newNoteText}
                    onChange={e => setNewNoteText(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Internal Note</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
