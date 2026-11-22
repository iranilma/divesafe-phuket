import React, { useState } from 'react';
import { ShieldCheck, Lock, User, ArrowRight, Compass, Key } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToCustomer: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onBackToCustomer
}) => {
  const { settings } = useData();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'demo123') {
      onLoginSuccess();
    } else {
      setError('Invalid demo credentials. Use admin / demo123');
    }
  };

  const handleQuickDemoLogin = () => {
    setUsername('admin');
    setPassword('demo123');
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 shadow-xl shadow-cyan-500/20 mb-4">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Compass className="w-7 h-7 text-cyan-400" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            DiveSafe Staff Portal
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Administrative Booking & Lead Management Dashboard
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* Demonstration Notice */}
          <div className="mb-5 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200/90 text-xs flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-300">Prototype Demonstration Access Only</p>
              <p className="text-[11px] text-amber-200/70 mt-0.5">
                Simulated authentication for demonstration purposes. Not production security. Data is stored locally in this browser.
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold rounded-xl text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Sign In to Hub</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Demo helper */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-center space-y-3">
            <div className="text-xs text-slate-400">
              Demo Credentials: <span className="font-mono text-cyan-300">admin</span> / <span className="font-mono text-cyan-300">demo123</span>
            </div>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2 bg-slate-800/80 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Key className="w-3.5 h-3.5" />
              <span>1-Click Instant Demo Login</span>
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onBackToCustomer}
            className="text-xs text-slate-400 hover:text-cyan-300 transition-colors underline"
          >
            ← Return to Customer Experience Hub
          </button>
        </div>
      </div>
    </div>
  );
};
