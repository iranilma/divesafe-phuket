import React, { useState } from 'react';
import { Lead, LeadStatus } from '../../types';
import { useData } from '../../context/DataContext';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  Users,
  AlertCircle,
  Eye,
  Sparkles
} from 'lucide-react';

interface AdminCalendarProps {
  onSelectLead: (lead: Lead) => void;
}

export const AdminCalendar: React.FC<AdminCalendarProps> = ({ onSelectLead }) => {
  const { leads, updateLeadStatus } = useData();

  // Selected month state (default to November 2026 based on mock data & current project date)
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 10, 1)); // 0-indexed month: 10 = November
  const [selectedDayBookings, setSelectedDayBookings] = useState<{ dateStr: string; bookings: Lead[] } | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Calendar day cells
  const days = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  const getLeadsForDate = (day: number): Lead[] => {
    const formatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return leads.filter(l => l.preferredDate === formatted);
  };

  const handleDayClick = (day: number) => {
    const formatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayLeads = getLeadsForDate(day);
    setSelectedDayBookings({ dateStr: formatted, bookings: dayLeads });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Booking & Departure Schedule</h2>
          <p className="text-xs text-slate-400">
            Day trip departures and course training calendar across Phuket
          </p>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl">
          <button
            onClick={prevMonth}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-bold text-white px-2">
            {monthNames[month]} {year}
          </span>
          <button
            onClick={nextMonth}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Legend & Disclaimer */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-slate-300">Confirmed Booking</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
            <span className="text-slate-300">Booking Pending</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span className="text-slate-300">Requested / Enquired</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-amber-300/80 text-[11px]">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Notice: Demonstration schedule. Live capacity subject to weather & boat slots.</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6">
        {/* Days of week */}
        <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, idx) => {
            if (!day) {
              return (
                <div
                  key={`empty-${idx}`}
                  className="min-h-[90px] sm:min-h-[115px] bg-slate-950/30 rounded-2xl border border-transparent"
                ></div>
              );
            }

            const dayLeads = getLeadsForDate(day);
            const hasConfirmed = dayLeads.some(l => l.status === 'Confirmed');
            const hasPending = dayLeads.some(l => l.status === 'Booking Pending');

            return (
              <div
                key={day}
                onClick={() => handleDayClick(day)}
                className={`min-h-[90px] sm:min-h-[115px] p-2.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  dayLeads.length > 0
                    ? hasConfirmed
                      ? 'bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-400 shadow-md'
                      : 'bg-slate-950/80 border-slate-800 hover:border-cyan-400'
                    : 'bg-slate-950/50 border-slate-900 hover:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${dayLeads.length > 0 ? 'text-white' : 'text-slate-500'}`}>
                    {day}
                  </span>
                  {dayLeads.length > 0 && (
                    <span className="w-4 h-4 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-extrabold flex items-center justify-center">
                      {dayLeads.length}
                    </span>
                  )}
                </div>

                <div className="space-y-1 my-1 overflow-hidden">
                  {dayLeads.slice(0, 2).map(lead => (
                    <div
                      key={lead.id}
                      className={`text-[9px] px-1.5 py-0.5 rounded truncate font-medium flex items-center justify-between gap-1 ${
                        lead.status === 'Confirmed'
                          ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-500/40'
                          : lead.status === 'Booking Pending'
                          ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                          : 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30'
                      }`}
                    >
                      <span className="truncate">
                        {lead.status === 'Confirmed' ? '● ' : '○ '}
                        {lead.customerName.split(' ')[0]} ({lead.participants}p)
                      </span>
                      <span className="text-[8px] opacity-75 shrink-0 uppercase font-mono">
                        {lead.status === 'Confirmed' ? 'CONF' : 'REQ'}
                      </span>
                    </div>
                  ))}
                  {dayLeads.length > 2 && (
                    <div className="text-[9px] text-slate-400 text-center font-mono">
                      +{dayLeads.length - 2} more
                    </div>
                  )}
                </div>

                <div className="text-[9px] text-slate-500 text-right">
                  {dayLeads.length > 0 ? `${dayLeads.reduce((a, c) => a + c.participants, 0)} divers` : ''}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DAY CLICK MODAL */}
      {selectedDayBookings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">
                  Schedule for {selectedDayBookings.dateStr}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDayBookings(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>

            {selectedDayBookings.bookings.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {selectedDayBookings.bookings.map(lead => {
                  const isConfirmed = lead.status === 'Confirmed' || lead.status === 'Completed';
                  return (
                    <div
                      key={lead.id}
                      className={`p-3.5 bg-slate-950 rounded-xl border space-y-2 ${
                        isConfirmed ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-white text-xs">{lead.customerName}</span>
                          <span className="text-[10px] text-slate-500 ml-2 font-mono">{lead.id}</span>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            isConfirmed
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          }`}
                        >
                          {isConfirmed ? '✓ Confirmed Departure' : '⏳ Requested Date (Enquiry)'}
                        </span>
                      </div>

                      <p className="text-xs text-cyan-300 font-medium">{lead.selectedExperienceTitle}</p>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px] text-slate-400 pt-1.5 border-t border-slate-900">
                        <div>
                          <span className="block text-slate-500">Participants:</span>
                          <strong className="text-slate-200">{lead.participants} divers</strong>
                        </div>
                        <div>
                          <span className="block text-slate-500">Payment Status:</span>
                          <strong className="text-slate-200">{lead.paymentStatus || 'Unpaid'}</strong>
                        </div>
                        <div>
                          <span className="block text-slate-500">Enquiry Date:</span>
                          <span className="text-slate-300">{lead.enquiryDate || lead.createdAt.split('T')[0]}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                          onClick={() => {
                            setSelectedDayBookings(null);
                            onSelectLead(lead);
                          }}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg text-xs font-semibold flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View Profile</span>
                        </button>
                        {!isConfirmed && (
                          <button
                            onClick={() => {
                              const today = new Date().toISOString().split('T')[0];
                              updateLeadStatus(lead.id, 'Confirmed');
                              setSelectedDayBookings({
                                ...selectedDayBookings,
                                bookings: selectedDayBookings.bookings.map(b =>
                                  b.id === lead.id ? { ...b, status: 'Confirmed', confirmationDate: today } : b
                                )
                              });
                            }}
                            className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg text-xs font-bold"
                          >
                            Verify & Confirm Departure
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-slate-400">
                No dives or courses scheduled on this date.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
