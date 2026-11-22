import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { DivingExperience } from '../../types';
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Save,
  X,
  Waves,
  Clock,
  Sparkles
} from 'lucide-react';

export const AdminExperiences: React.FC = () => {
  const { experiences, updateExperience, addExperience } = useData();

  const [editingExp, setEditingExp] = useState<DivingExperience | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleEditClick = (exp: DivingExperience) => {
    setEditingExp({ ...exp });
    setIsNew(false);
  };

  const handleCreateNewClick = () => {
    const newTemplate: DivingExperience = {
      id: `exp-${Date.now()}`,
      title: 'New Phuket Dive Program',
      category: 'certified',
      shortDesc: 'A brief description of this new diving experience in Phuket.',
      description: 'Full detailed description of the day trip, dive sites, depth, marine life, and schedule.',
      duration: '1 Day (2 Dives)',
      priceThb: 4200,
      priceNote: 'Includes full scuba equipment and boat meals',
      maxDepth: '18 meters',
      prerequisites: 'Open Water Diver certification or higher.',
      minAge: '10 years',
      highlights: ['Clear Andaman visibility', 'Small group ratio', 'Experienced dive guides'],
      included: ['Full gear rental', 'Breakfast & buffet lunch', 'Hotel roundtrip transfer'],
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      active: true
    };
    setEditingExp(newTemplate);
    setIsNew(true);
  };

  const handleSaveExp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;

    if (isNew) {
      addExperience(editingExp);
    } else {
      updateExperience(editingExp.id, editingExp);
    }
    setEditingExp(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Experience & Course Catalogue Management</h2>
          <p className="text-xs text-slate-400">
            Configure published day trips, courses, prices, and requirements
          </p>
        </div>

        <button
          onClick={handleCreateNewClick}
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 self-start sm:self-auto transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Experience</span>
        </button>
      </div>

      {/* Grid of Experiences */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map(exp => (
          <div
            key={exp.id}
            className={`bg-slate-900/80 border rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between transition-all ${
              exp.active ? 'border-slate-800' : 'border-slate-800 opacity-60'
            }`}
          >
            <div className="relative aspect-video">
              <img src={exp.imageUrl} alt={exp.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded-md bg-slate-950/80 text-cyan-300 text-xs font-bold uppercase tracking-wider border border-slate-700">
                  {exp.category}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => updateExperience(exp.id, { active: !exp.active })}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1 ${
                    exp.active
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      : 'bg-red-950 text-red-300 border border-red-500/40'
                  }`}
                >
                  {exp.active ? 'Active' : 'Inactive'}
                </button>
              </div>
              <div className="absolute bottom-3 right-3 text-sm font-extrabold text-cyan-300 bg-slate-900/90 px-2.5 py-0.5 rounded-lg border border-cyan-500/30">
                {exp.priceThb ? `${exp.priceThb.toLocaleString()} THB` : 'Request Quote'}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-white text-base line-clamp-1">{exp.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{exp.shortDesc}</p>
              </div>

              <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 space-y-1">
                <div>
                  <strong className="text-slate-300">Duration:</strong> {exp.duration}
                </div>
                <div>
                  <strong className="text-slate-300">Prerequisites:</strong> {exp.prerequisites}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleEditClick(exp)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Experience</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT / CREATE MODAL */}
      {editingExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-white">
            <button
              onClick={() => setEditingExp(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-4">
              {isNew ? 'Create New Experience' : `Edit: ${editingExp.title}`}
            </h3>

            <form onSubmit={handleSaveExp} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Title</label>
                <input
                  type="text"
                  value={editingExp.title}
                  onChange={e => setEditingExp({ ...editingExp, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={editingExp.category}
                    onChange={e => setEditingExp({ ...editingExp, category: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none"
                  >
                    <option value="beginner">beginner</option>
                    <option value="certified">certified</option>
                    <option value="course">course</option>
                    <option value="refresher">refresher</option>
                    <option value="specialty">specialty</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Price (THB) - Blank for Quote</label>
                  <input
                    type="number"
                    value={editingExp.priceThb || ''}
                    onChange={e =>
                      setEditingExp({
                        ...editingExp,
                        priceThb: e.target.value ? Number(e.target.value) : null
                      })
                    }
                    placeholder="e.g. 4200"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingExp.duration}
                    onChange={e => setEditingExp({ ...editingExp, duration: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Max Depth</label>
                  <input
                    type="text"
                    value={editingExp.maxDepth || ''}
                    onChange={e => setEditingExp({ ...editingExp, maxDepth: e.target.value })}
                    placeholder="e.g. 18 meters"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={editingExp.imageUrl}
                  onChange={e => setEditingExp({ ...editingExp, imageUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Short Summary</label>
                <input
                  type="text"
                  value={editingExp.shortDesc}
                  onChange={e => setEditingExp({ ...editingExp, shortDesc: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={editingExp.description}
                  onChange={e => setEditingExp({ ...editingExp, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Prerequisites</label>
                <input
                  type="text"
                  value={editingExp.prerequisites}
                  onChange={e => setEditingExp({ ...editingExp, prerequisites: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="activeCheck"
                  checked={editingExp.active}
                  onChange={e => setEditingExp({ ...editingExp, active: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <label htmlFor="activeCheck" className="text-slate-300 font-semibold">
                  Active (visible in public customer catalogue)
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingExp(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold rounded-xl flex items-center gap-1.5 shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Experience</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
