import React from 'react';
import { Bus, Users, Clock, Compass } from 'lucide-react';

export default function StationStats({ totalDispatched, totalPassengers, t }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 my-6">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3 shadow-lg">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
          <Bus className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xl sm:text-2xl font-black text-white font-mono">{totalDispatched}</span>
          <p className="text-[11px] text-slate-400 font-medium">{t.statsTotalVans}</p>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3 shadow-lg">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xl sm:text-2xl font-black text-white font-mono">{totalPassengers}</span>
          <p className="text-[11px] text-slate-400 font-medium">{t.statsPassengers}</p>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3 shadow-lg">
        <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xl sm:text-2xl font-black text-white font-mono">12 - 15m</span>
          <p className="text-[11px] text-slate-400 font-medium">{t.statsAvgWait}</p>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3 shadow-lg">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
          <Compass className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xl sm:text-2xl font-black text-white font-mono">8</span>
          <p className="text-[11px] text-slate-400 font-medium">{t.statsLines}</p>
        </div>
      </div>
    </div>
  );
}
