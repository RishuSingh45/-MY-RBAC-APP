import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Login = ({ loginForm, handleChange, handleLogin, loading, message }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        
        <div className="bg-indigo-600 p-6 text-center">
            <ShieldCheck size={48} className="text-indigo-100 mx-auto mb-2" />
            <h2 className="text-3xl font-bold text-white tracking-tight">RBAC Portal</h2>
            <p className="text-indigo-200 text-sm mt-1">Secure Access Management</p>
        </div>

        <div className="p-8">
          <p className="text-center text-sm text-slate-500 mb-8 bg-slate-50 py-3 rounded-lg border border-slate-200">
            Use <strong>password</strong> for all demo accounts.
          </p>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={loginForm.username}
                onChange={handleChange}
                placeholder="e.g., admin_ravi"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div className={`mt-6 text-center text-sm font-medium ${message.includes('Failed') ? 'text-rose-600' : 'text-slate-600'}`}>
              {message}
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Demo Credentials</h3>
            <div className="grid grid-cols-3 gap-2 text-sm text-center">
                <div className="bg-pink-50 text-pink-700 py-1.5 rounded-md font-medium">Admin</div>
                <div className="bg-indigo-50 text-indigo-700 py-1.5 rounded-md font-medium">Editor</div>
                <div className="bg-emerald-50 text-emerald-700 py-1.5 rounded-md font-medium">Viewer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;