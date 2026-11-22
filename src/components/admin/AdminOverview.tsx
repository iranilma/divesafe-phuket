import React from 'react';
import { useData } from '../../context/DataContext';
import { Lead } from '../../types';
import {
  Users,
  Compass,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  MessageCircle,
  ArrowUpRight,
  Sparkles,
  Waves,
  Award
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

interface AdminOverviewProps {
  onSelectLead: (lead: Lead) => void;
  onNavigateTab: (tab: string) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ onSelectLead, onNavigateTab }) => {
  const { leads, activities, experiences } = useData();

  const totalEnquiries = leads.length;
  const newEnquiries = leads.filter(l => l.status === 'New').length;
  const pendingFollowups = leads.filter(l => l.status === 'Follow-up' || l.followUpDate).length;
  const bookingRequests = leads.filter(l => l.status === 'Booking Pending').length;
  const confirmedBookings = leads.filter(l => l.status === 'Confirmed' || l.status === 'Completed').length;

  // Verified Confirmed Revenue: only from Confirmed or Completed bookings with paid deposit/full
  const confirmedRevenue = leads
    .filter(l => (l.status === 'Confirmed' || l.status === 'Completed') && (l.paymentStatus === 'Deposit Paid' || l.paymentStatus === 'Fully Paid'))
    .reduce((acc, curr) => acc + (curr.estimatedValue || 0), 0);

  // Total Potential Pipeline (excluding lost)
  const pipelinePotential = leads
    .filter(l => l.status !== 'Lost' && l.status !== 'Completed')
    .reduce((acc, curr) => acc + (curr.estimatedValue || 0), 0);

  // Journey breakdown data
  const journeyCounts = {
    beginner: leads.filter(l => l.journeyType === 'beginner').length,
    certified: leads.filter(l => l.journeyType === 'certified').length,
    courses: leads.filter(l => l.journeyType === 'courses').length
  };

  const journeyChartData = [
    { name: 'Beginner (Journey A)', value: journeyCounts.beginner, color: '#06b6d4' },
    { name: 'Certified (Journey B)', value: journeyCounts.certified, color: '#14b8a6' },
    { name: 'Courses (Journey C)', value: journeyCounts.courses, color: '#3b82f6' }
  ];

  // Monthly trend data
  const monthlyData = [
    { month: 'Jun', enquiries: 18, bookings: 12 },
    { month: 'Jul', enquiries: 24, bookings: 16 },
    { month: 'Aug', enquiries: 22, bookings: 14 },
    { month: 'Sep', enquiries: 31, bookings: 20 },
    { month: 'Oct', enquiries: 45, bookings: 33 },
    { month: 'Nov', enquiries: leads.length + 38, bookings: confirmedBookings + 27 }
  ];

  // Popular experiences data
  const expMap: Record<string, number> = {};
  leads.forEach(l => {
    const key = l.selectedExperienceTitle.substring(0, 22) + '...';
    expMap[key] = (expMap[key] || 0) + 1;
  });

  const popularExpData = Object.entries(expMap).map(([name, count]) => ({
    name,
    count
  })).slice(0, 5);

  // Status breakdown data
  const statusColors: Record<string, string> = {
    New: '#06b6d4',
    Contacted: '#38bdf8',
    Interested: '#818cf8',
    'Follow-up': '#f59e0b',
    'Booking Pending': '#fbbf24',
    Confirmed: '#10b981',
    Completed: '#64748b',
    Lost: '#ef4444'
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 6 Top Metric KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Total Enquiries</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{totalEnquiries}</div>
          <div className="text-[11px] text-cyan-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Active pipeline</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-cyan-500/30 p-4 rounded-2xl bg-cyan-950/20">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-cyan-300">New Uncontacted</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-cyan-300">{newEnquiries}</div>
          <div className="text-[11px] text-slate-400 mt-1">Requires outreach</div>
        </div>

        <div className="bg-slate-900/80 border border-amber-500/30 p-4 rounded-2xl bg-amber-950/20">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-amber-300">Follow-ups</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-300">{pendingFollowups}</div>
          <div className="text-[11px] text-slate-400 mt-1">Scheduled reminders</div>
        </div>

        <div className="bg-slate-900/80 border border-blue-500/30 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-blue-300">Booking Pending</span>
            <Calendar className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-blue-300">{bookingRequests}</div>
          <div className="text-[11px] text-slate-400 mt-1">Date reserved</div>
        </div>

        <div className="bg-slate-900/80 border border-emerald-500/30 p-4 rounded-2xl bg-emerald-950/20">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-emerald-300">Confirmed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-300">{confirmedBookings}</div>
          <div className="text-[11px] text-emerald-400/80 mt-1">Ready for diving</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Confirmed Revenue</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-extrabold text-emerald-400">
            {confirmedRevenue > 0 ? `฿${(confirmedRevenue / 1000).toFixed(1)}k` : '฿0'}{' '}
            <span className="text-xs text-slate-400 font-normal">THB</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Pipeline: ฿{(pipelinePotential / 1000).toFixed(0)}k
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Enquiries Trend */}
        <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white">Enquiries & Bookings Trend</h3>
              <p className="text-xs text-slate-400">Monthly progression across high and green seasons</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-mono">
              2026 Data
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEnq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorBook" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="enquiries" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorEnq)" name="Enquiries" />
                <Area type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorBook)" name="Confirmed" />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Journey Breakdown Donut */}
        <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-1">Enquiries by Journey</h3>
            <p className="text-xs text-slate-400">Match engine distribution</p>
          </div>

          <div className="h-56 w-full my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={journeyChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {journeyChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs pt-3 border-t border-slate-800">
            {journeyChartData.map(item => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-300">{item.name}</span>
                </div>
                <span className="font-bold text-white">{item.value} ({totalEnquiries > 0 ? Math.round((item.value / totalEnquiries) * 100) : 0}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two columns: Recent Enquiries & Real-time Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Enquiries snippet */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Recent Enquiries</h3>
              <p className="text-xs text-slate-400">Latest submissions from customer journeys</p>
            </div>
            <button
              onClick={() => onNavigateTab('leads')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <span>View All Leads</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {leads.slice(0, 5).map(lead => (
              <div
                key={lead.id}
                onClick={() => onSelectLead(lead)}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all flex items-center justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {lead.customerName}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded">
                      {lead.id}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">
                    {lead.selectedExperienceTitle} • {lead.preferredDate} ({lead.participants} pax)
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
                    style={{
                      backgroundColor: `${statusColors[lead.status] || '#64748b'}20`,
                      color: statusColors[lead.status] || '#cbd5e1',
                      border: `1px solid ${statusColors[lead.status] || '#64748b'}40`
                    }}
                  >
                    {lead.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Activity Log */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">System Activity Log</h3>
                <p className="text-xs text-slate-400">Real-time local database audit trail</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {activities.slice(0, 6).map(act => (
                <div key={act.id} className="text-xs flex items-start gap-2.5 pb-2.5 border-b border-slate-800/80 last:border-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                  <div className="flex-1">
                    <p className="text-slate-300 leading-snug">{act.message}</p>
                    <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
                      {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400">
            Simulated locally with persistent LocalStorage across browser tabs.
          </div>
        </div>
      </div>
    </div>
  );
};
