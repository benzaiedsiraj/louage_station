import React from 'react';
import { Sliders, Plus, Minus, RefreshCw, Volume2, VolumeX, Ticket, Zap, CheckCircle2 } from 'lucide-react';

export default function DeskAgentSimulator({
  routes,
  updateSeats,
  resetAllSeats,
  simulateTicketSale,
  soundEnabled,
  setSoundEnabled,
  autoSimulate,
  setAutoSimulate,
  lang,
  t
}) {
  return (
    <div className="bg-slate-900 border-b-2 border-amber-500/40 p-4 shadow-2xl relative overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Title & Pitch Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                <Sliders className="w-3 h-3" />
                {t.agentSimulator}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">LIVE DEMO MODE</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {t.agentSimulatorDesc}
            </p>
          </div>

          {/* Quick Global Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Audio Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                soundEnabled
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
              title={soundEnabled ? 'إيقاف الصوت' : 'تشغيل الصوت التفاعلي'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{t.soundEffects}</span>
            </button>

            {/* Auto Simulation Flow */}
            <button
              onClick={() => setAutoSimulate(!autoSimulate)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                autoSimulate
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 animate-pulse'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              <span>{t.autoSimulation}</span>
            </button>

            {/* Reset All Button */}
            <button
              onClick={resetAllSeats}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-bold transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.resetAll}</span>
            </button>
          </div>
        </div>

        {/* Simulator Route Cards Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {routes.map((route) => {
            const seatsLeft = route.seatsAvailable;

            return (
              <div
                key={route.id}
                className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between shadow-md hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-sm text-white">
                      {lang === 'ar' ? route.nameAr : route.nameFr}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">({route.code})</span>
                  </div>

                  {/* Seat Counter Pill */}
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-black font-mono transition-colors ${
                      seatsLeft >= 5
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : seatsLeft >= 1
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                    }`}
                  >
                    {seatsLeft} / 8 {lang === 'ar' ? 'مقاعد' : 'pts'}
                  </span>
                </div>

                {/* Counter +/- Controls & Sale Button */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateSeats(route.id, seatsLeft - 1)}
                    disabled={seatsLeft <= 0}
                    className="w-9 h-9 rounded-lg bg-red-500/20 hover:bg-red-500/30 disabled:opacity-30 disabled:cursor-not-allowed border border-red-500/40 text-red-400 flex items-center justify-center font-black transition-all active:scale-95"
                    title="حجز مقعد (-1)"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => updateSeats(route.id, seatsLeft + 1)}
                    disabled={seatsLeft >= 8}
                    className="w-9 h-9 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 disabled:opacity-30 disabled:cursor-not-allowed border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-black transition-all active:scale-95"
                    title="إلغاء حجز أو زيادة مقعد (+1)"
                  >
                    <Plus className="w-4 h-4" />
                  </button>

                  {/* Quick Ticket Issue Button */}
                  <button
                    onClick={() => simulateTicketSale(route.id)}
                    disabled={seatsLeft <= 0}
                    className="flex-1 h-9 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed text-slate-950 font-bold text-xs flex items-center justify-center gap-1 transition-all shadow-md active:scale-95"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>{t.bookSeat}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
