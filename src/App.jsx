import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { initialRoutes } from './data/routesData';
import { translations } from './data/translations';
import Header from './components/Header';
import DeskAgentSimulator from './components/DeskAgentSimulator';
import RouteCard from './components/RouteCard';
import StationStats from './components/StationStats';
import DigitalTicketModal from './components/DigitalTicketModal';
import Footer from './components/Footer';
import { Search, Filter, RefreshCw, Bus, Sparkles, AlertCircle, ShieldAlert } from 'lucide-react';

export default function App() {
  const [routes, setRoutes] = useState(initialRoutes);
  const [lang, setLang] = useState('ar');
  const [theme, setTheme] = useState('dark');
  const [simulatorOpen, setSimulatorOpen] = useState(true); // Open by default for pitching demo
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoSimulate, setAutoSimulate] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [activeTicket, setActiveTicket] = useState(null);
  const [totalDispatched, setTotalDispatched] = useState(48);
  const [totalPassengers, setTotalPassengers] = useState(384);

  const t = translations[lang];

  // Sync RTL / LTR direction on <html> element
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Sync Dark / Light Mode on <html> element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Play pleasant web audio chime on seat changes
  const playChime = (type = 'book') => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      if (type === 'full') {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else {
        osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08); // A5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      }
    } catch (e) {
      console.warn('Audio Context sound play error', e);
    }
  };

  // Update Seats Function (Simulator or Direct click)
  const updateSeats = (routeId, newSeatCount) => {
    const clampedSeats = Math.max(0, Math.min(8, newSeatCount));
    
    setRoutes((prevRoutes) =>
      prevRoutes.map((r) => {
        if (r.id === routeId) {
          const isFillingUp = clampedSeats < r.seatsAvailable;
          const isNowFull = clampedSeats === 0 && r.seatsAvailable > 0;

          if (isNowFull) {
            playChime('full');
            // Trigger celebration confetti on full van dispatch!
            confetti({
              particleCount: 60,
              spread: 70,
              origin: { y: 0.6 }
            });
            setTotalDispatched((prev) => prev + 1);
          } else if (isFillingUp) {
            playChime('book');
          }

          return { ...r, seatsAvailable: clampedSeats };
        }
        return r;
      })
    );
  };

  // Reset All Seats back to initial demo state
  const resetAllSeats = () => {
    setRoutes(initialRoutes);
    playChime('book');
  };

  // Simulate Ticket Sale & Modal Popup
  const simulateTicketSale = (routeId, targetSeatNum = null) => {
    const targetRoute = routes.find((r) => r.id === routeId);
    if (!targetRoute || targetRoute.seatsAvailable <= 0) return;

    const assignedSeat = targetSeatNum || (8 - targetRoute.seatsAvailable + 1);
    updateSeats(routeId, targetRoute.seatsAvailable - 1);
    setTotalPassengers((prev) => prev + 1);

    // Create ticket object
    const newTicket = {
      ticketId: `BG-${Math.floor(1000 + Math.random() * 9000)}`,
      nameAr: targetRoute.nameAr,
      nameFr: targetRoute.nameFr,
      price: targetRoute.price,
      seatNumber: assignedSeat,
      plateNumber: targetRoute.plateNumber,
      driverName: targetRoute.driverName,
      timestamp: new Date().toLocaleString(lang === 'ar' ? 'ar-TN' : 'fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    };

    setActiveTicket(newTicket);
  };

  // Auto-simulation Interval (For live pitch presentations)
  useEffect(() => {
    if (!autoSimulate) return;
    const interval = setInterval(() => {
      // Pick random route that has seats
      const availableRoutes = routes.filter((r) => r.seatsAvailable > 0);
      if (availableRoutes.length > 0) {
        const randomRoute = availableRoutes[Math.floor(Math.random() * availableRoutes.length)];
        updateSeats(randomRoute.id, randomRoute.seatsAvailable - 1);
        setTotalPassengers((prev) => prev + 1);
      } else {
        // Reset all when all are full
        resetAllSeats();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [autoSimulate, routes]);

  // Search & Filter Logic
  const filteredRoutes = routes.filter((r) => {
    const matchSearch =
      r.nameAr.includes(searchQuery) ||
      r.nameFr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.code.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchSearch) return false;

    if (filterCategory === 'ready') return r.seatsAvailable >= 5;
    if (filterCategory === 'filling') return r.seatsAvailable >= 1 && r.seatsAvailable <= 4;
    if (filterCategory === 'full') return r.seatsAvailable === 0;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-cairo selection:bg-emerald-500 selection:text-white transition-colors duration-300">
      {/* Header */}
      <Header
        lang={lang}
        setLang={setLang}
        theme={theme}
        toggleTheme={toggleTheme}
        simulatorOpen={simulatorOpen}
        setSimulatorOpen={setSimulatorOpen}
        t={t}
      />

      {/* Collapsible Pitch Simulator Panel */}
      {simulatorOpen && (
        <DeskAgentSimulator
          routes={routes}
          updateSeats={updateSeats}
          resetAllSeats={resetAllSeats}
          simulateTicketSale={simulateTicketSale}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          autoSimulate={autoSimulate}
          setAutoSimulate={setAutoSimulate}
          lang={lang}
          t={t}
        />
      )}

      {/* Main Passenger Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8">
        
        {/* Pitch Hero Callout */}
        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 inline-flex items-center gap-1.5 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'منظومة إدارة المحطة الذكية' : 'Système Intelligent de Station'}</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-3">
              {lang === 'ar' ? 'مواعيد وشغور مقاعد سيارات اللواج ببقردان' : 'Disponibilité en Temps Réel des Louages à Ben Guerdane'}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {lang === 'ar'
                ? 'تابع حالة المقاعد المباشرة للرحلات المغادرة نحو مدنين، جرجيس، قابس، رأس جدير، وتونس العاصمة. تحديث فوري بشباك التذاكر.'
                : 'Suivez en direct le remplissage des véhicules vers Médenine, Zarzis, Gabès, Ras Jedir et Tunis. Mise à jour instantanée au guichet.'}
            </p>
          </div>
        </div>

        {/* Real-time Station Metrics Bar */}
        <StationStats
          totalDispatched={totalDispatched}
          totalPassengers={totalPassengers}
          t={t}
        />

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          {/* Search Box */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-4.5 dir-rtl:right-4 font-bold" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-4 pr-11 py-3 rounded-2xl bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-100 text-sm placeholder-slate-500 outline-none transition-all"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: t.filterAll },
              { id: 'ready', label: t.filterReady },
              { id: 'filling', label: t.filterFilling },
              { id: 'full', label: t.filterFull }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  filterCategory === tab.id
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-black'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Outgoing Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredRoutes.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              onBookSeat={(rId, sNum) => simulateTicketSale(rId, sNum)}
              lang={lang}
              t={t}
            />
          ))}
        </div>

        {filteredRoutes.length === 0 && (
          <div className="text-center py-16 bg-slate-900/50 rounded-3xl border border-slate-800 my-6">
            <AlertCircle className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-300">
              {lang === 'ar' ? 'لم يتم العثور على خطوط مطابقة' : 'Aucune ligne trouvée'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'ar' ? 'جرب البحث باسم وجهة أخرى أو تغيير الفلتر' : 'Essayez de rechercher une autre destination'}
            </p>
          </div>
        )}
      </main>

      {/* Ticket Modal Popup */}
      <DigitalTicketModal
        ticket={activeTicket}
        onClose={() => setActiveTicket(null)}
        lang={lang}
        t={t}
      />

      {/* Footer */}
      <Footer lang={lang} t={t} />
    </div>
  );
}
