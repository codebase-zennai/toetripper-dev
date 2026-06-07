import { Lock, User, KeyRound, ShieldAlert } from 'lucide-react';

export default function AdminLogin({ username, setUsername, password, setPassword, error, handleLogin }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#f8fafc] via-[#f1f5f9] to-[#e0e7ff]/30 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Brand Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-[#193B9D]/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#F4A300]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-md p-10 border border-slate-200/50 rounded-2xl shadow-xl shadow-slate-100/50 relative z-10">
        <div className="text-center">
          <div className="inline-flex p-3.5 bg-[#193B9D]/5 rounded-2xl border border-[#193B9D]/10 mb-4 text-[#F4A300]">
            <KeyRound size={26} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Admin Console</h2>
          <p className="mt-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-widest">Toe Tripper Portal</p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-600 p-3.5 rounded-xl text-xs text-center flex items-center justify-center gap-2 font-medium">
            <ShieldAlert size={15} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div className="space-y-4">
            <div className="relative">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Username</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User size={15} />
                </span>
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#193B9D] focus:ring-4 focus:ring-[#193B9D]/5 text-slate-800 placeholder-slate-400 text-sm transition-all"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={15} />
                </span>
                <input
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#193B9D] focus:ring-4 focus:ring-[#193B9D]/5 text-slate-800 placeholder-slate-400 text-sm transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#193B9D] text-white py-3 rounded-xl hover:bg-[#153285] transition-all duration-300 mt-5 font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#193B9D]/10 hover:shadow-xl hover:shadow-[#193B9D]/15 cursor-pointer active:scale-[0.98]"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}
