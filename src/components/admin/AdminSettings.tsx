import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { BusinessSettings } from '../../types';
import { Save, RotateCcw, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, resetToDemoData } = useData();
  const [formData, setFormData] = useState<BusinessSettings>({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleReset = () => {
    if (window.confirm('Reset all leads, experiences, and settings to the original pristine demonstration data?')) {
      resetToDemoData();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 2500);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl animate-fadeIn">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">Hub Configuration & Settings</h2>
        <p className="text-xs text-slate-400">
          Configure official contact numbers, manager details, and demonstration persistence
        </p>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          {/* WhatsApp Settings */}
          <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Business Number</span>
            </h4>
            <p className="text-[11px] text-slate-400">
              The number that receives customer enquiry messages generated across all journeys.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Raw Number (digits only)</label>
                <input
                  type="text"
                  value={formData.whatsappNumber}
                  onChange={e => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  placeholder="e.g. 66940018590"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Formatted Display Phone</label>
                <input
                  type="text"
                  value={formData.formattedPhone}
                  onChange={e => setFormData({ ...formData, formattedPhone: e.target.value })}
                  placeholder="e.g. +66 94 001 8590"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>
            </div>
          </div>

          {/* Business & Manager Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Lead Instructor / Manager</label>
              <input
                type="text"
                value={formData.managerName}
                onChange={e => setFormData({ ...formData, managerName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Official Booking Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Shop Address (Phuket)</label>
            <input
              type="text"
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">TAT License Number</label>
              <input
                type="text"
                value={formData.tatLicense}
                onChange={e => setFormData({ ...formData, tatLicense: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">SSI Dive Center ID</label>
              <input
                type="text"
                value={formData.ssiCenterId}
                onChange={e => setFormData({ ...formData, ssiCenterId: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400"
                required
              />
            </div>
          </div>

          {/* Save button */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-800">
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>

            {savedSuccess && (
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Settings updated successfully!
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Demo Reset Danger Zone */}
      <div className="bg-slate-900/60 border border-red-500/20 rounded-3xl p-6 sm:p-8">
        <h4 className="text-sm font-bold text-white mb-1">Reset Demonstration Database</h4>
        <p className="text-xs text-slate-400 mb-4">
          Need a fresh start for a new client presentation? This restores all original demo leads, experiences, and calendar events.
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Records</span>
          </button>
          {resetSuccess && (
            <span className="text-xs text-emerald-400 font-medium">Database restored to default!</span>
          )}
        </div>
      </div>
    </div>
  );
};
