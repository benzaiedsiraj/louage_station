import React, { useState, useEffect } from 'react';
import { Clock, Globe, Sun, Moon, Sliders, Bus, ShieldCheck } from 'lucide-react';

export default function Header({ lang, setLang, theme, toggleTheme, simulatorOpen, setSimulatorOpen, t }) {
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString(lang === 'ar' ? 'ar-TN' : 'fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
      setDateStr(now.toLocaleDateString(lang === 'ar' ? 'ar-TN' : 'fr-FR', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-900/90 dark:bg-slate-950/90 border-b border-slate-800 transition-colors shadow-lg">
      {/* Top Utility Bar */}
      <div className="bg-emerald-600/90 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-200"></span>
            </span>
            <span>{t.liveStatus}</span>
            <span className="hidden sm:inline opacity-75">| {dateStr}</span>
          </div>

          <div className="flex items-center gap-3 font-mono font-semibold tracking-wider dir-ltr">
            <Clock className="w-3.5 h-3.5 text-emerald-200 animate-pulse" />
            <span>{timeStr}</span>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-slate-900 p-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center relative overflow-hidden">
                <Bus className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400 transform -scale-x-100" />
                <div className="absolute -bottom-1 w-full h-1 bg-red-600"></div>
              </div>
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-cairo">
                مُحَطَّةِ اللّوَاجْ بَبِنْ قِرْدَانْ
              </h1>
              <span className="hidden lg:inline-flex text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-emerald-500/30">
                BEN GUERDANE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Station Louage Ben Guerdane | {t.stationSubtitle}
            </p>
          </div>
        </div>

        {/* Controls & Simulator Button */}
        <div className="flex items-center gap-2 sm:gap-3 justify-between md:justify-end">
          {/* Simulator Toggle Button (Pitch Highlight) */}
          <button
            onClick={() => setSimulatorOpen(!simulatorOpen)}
            className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 shadow-md ${
              simulatorOpen
                ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400 shadow-amber-500/20'
                : 'bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/40 hover:border-amber-400'
            }`}
          >
            <Sliders className={`w-4 h-4 ${simulatorOpen ? 'animate-spin' : ''}`} />
            <span>{t.agentSimulator}</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'ar' ? 'fr' : 'ar')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold transition-all"
            title="تغيير اللغة / Changer la langue"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="uppercase">{lang === 'ar' ? 'Français' : 'العربية'}</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-amber-400 hover:text-amber-300 transition-all"
            title="تغيير المظهر / Mode sombre"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-300" />}
          </button>
        </div>
      </div>
    </header>
  );
}
