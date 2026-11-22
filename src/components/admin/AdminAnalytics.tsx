import React from 'react';
import { useData } from '../../context/DataContext';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { TrendingUp, Users, Compass, CheckCircle2, Award, PieChart as PieIcon } from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const { leads, experiences, destinations } = useData();

  // Status breakdown
  const statusCounts: Record<string, number> = {};
  leads.forEach(l => {
    statusCounts[l.status] = (statusCounts[l.status] || 0) + 1;
  });

  const statusData = Object.entries(statusCounts).map(([name, count]) => ({
    name,
    count
  }));

  // Journey breakdown
  const journeyCounts = {
    beginner: leads.filter(l => l.journeyType === 'beginner').length,
    certified: leads.filter(l => l.journeyType === 'certified').length,
    courses: leads.filter(l => l.journeyType === 'courses').length
  };

  const journeyData = [
    { name: 'Beginner (Journey A)', count: journeyCounts.beginner, color: '#06b6d4' },
    { name: 'Certified (Journey B)', count: journeyCounts.certified, color: '#14b8a6' },
    { name: 'Courses (Journey C)', count: journeyCounts.courses, color: '#3b82f6' }
  ];

  // Lead Sources
  const sourceCounts: Record<string, number> = {};
  leads.forEach(l => {
    sourceCounts[l.source] = (sourceCounts[l.source] || 0) + 1;
  });

  const sourceData = Object.entries(sourceCounts).map(([name, count]) => ({
    name,
    count
  }));

  // Popular Destinations from leads
  const destCounts: Record<string, number> = {};
  leads.forEach(l => {
    if (l.preferredDestination) {
      const short = l.preferredDestination.split('(')[0].trim().substring(0, 18);
      destCounts[short] = (destCounts[short] || 0) + 1;
    }
  });

  const destinationData = Object.entries(destCounts).map(([name, count]) => ({
    name,
    count
  }));

  // Funnel progression
  const funnelData = [
    { stage: '1. Enquiries Logged', count: leads.length, fill: '#06b6d4' },
    { stage: '2. Contacted / Follow-up', count: leads.filter(l => l.status !== 'New').length, fill: '#38bdf8' },
    { stage: '3. Booking Pending', count: leads.filter(l => l.status === 'Booking Pending' || l.status === 'Confirmed' || l.status === 'Completed').length, fill: '#f59e0b' },
    { stage: '4. Confirmed & Paid', count: leads.filter(l => l.status === 'Confirmed' || l.status === 'Completed').length, fill: '#10b981' }
  ];

  const conversionRate = leads.length > 0
    ? Math.round((leads.filter(l => l.status === 'Confirmed' || l.status === 'Completed').length / leads.length) * 100)
    : 0;

  const confirmedRevenue = leads
    .filter(l => (l.status === 'Confirmed' || l.status === 'Completed') && (l.paymentStatus === 'Deposit Paid' || l.paymentStatus === 'Fully Paid'))
    .reduce((acc, curr) => acc + (curr.estimatedValue || 0), 0);

  const potentialPipeline = leads
    .filter(l => l.status !== 'Lost' && l.status !== 'Completed')
    .reduce((acc, curr) => acc + (curr.estimatedValue || 0), 0);

  const COLORS = ['#06b6d4', '#14b8a6', '#3b82f6', '#f59e0b', '#10b981', '#64748b', '#ef4444'];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Commercial Enquiry & Conversion Analytics</h2>
          <p className="text-xs text-slate-400">
            Real-time visual insights generated dynamically from your active demonstration database
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-300">
            <span>Conversion:</span>{' '}
            <strong className="text-emerald-400 font-mono text-xs">{conversionRate}%</strong>
          </div>
          <div className="bg-slate-900 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-xs text-slate-300">
            <span>Confirmed Revenue:</span>{' '}
            <strong className="text-emerald-400 font-mono text-xs">฿{confirmedRevenue.toLocaleString()} THB</strong>
          </div>
          <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-300">
            <span>Potential Pipeline:</span>{' '}
            <strong className="text-cyan-300 font-mono text-xs">฿{potentialPipeline.toLocaleString()} THB</strong>
          </div>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-3xl">
          <p className="text-sm text-slate-300 font-semibold">No demonstration leads currently available.</p>
          <p className="text-xs text-slate-500 mt-1">Submit enquiries from the customer experience hub or click "Reset Demo Records" in Settings to restore data.</p>
        </div>
      ) : (
      /* Grid of 4 analytical charts */
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funnel Stage Progression */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Booking Conversion Funnel</h3>
              <p className="text-xs text-slate-400">Progression from initial enquiry to confirmed booking</p>
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                <XAxis type="number" stroke="#64748b" fontSize={11} />
                <YAxis dataKey="stage" type="category" stroke="#94a3b8" fontSize={10} width={130} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Popular Destinations</h3>
              <p className="text-xs text-slate-400">Client demand per dive location</p>
            </div>
            <Compass className="w-5 h-5 text-cyan-400" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={destinationData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} angle={-15} textAnchor="end" />
                <YAxis stroke="#64748b" fontSize={11} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#14b8a6" radius={[6, 6, 0, 0]} name="Enquiries" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Status Distribution */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Status Distribution</h3>
              <p className="text-xs text-slate-400">Current allocation across pipeline stages</p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-amber-400" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} angle={-20} textAnchor="end" />
                <YAxis stroke="#64748b" fontSize={11} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#38bdf8" radius={[6, 6, 0, 0]} name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Enquiry Sources */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-base font-bold text-white">Enquiry Acquisition Channel</h3>
                <p className="text-xs text-slate-400">Sources delivering diving leads</p>
              </div>
              <PieIcon className="w-5 h-5 text-indigo-400" />
            </div>

            <div className="h-52 w-full my-auto">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="count"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1 text-xs pt-3 border-t border-slate-800">
            {sourceData.map((s, idx) => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                  <span className="text-slate-300">{s.name}</span>
                </div>
                <strong className="text-white">{s.count}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
