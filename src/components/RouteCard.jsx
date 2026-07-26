import React, { useState } from 'react';
import { MapPin, Navigation, Clock, ChevronDown, ChevronUp, User, Ticket, CheckCircle2, AlertTriangle, XCircle, Sparkles } from 'lucide-react';
import VanSeatVisualizer from './VanSeatVisualizer';

export default function RouteCard({ route, onBookSeat, lang, t }) {
  const [showSeatMap, setShowSeatMap] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const seatsLeft = route.seatsAvailable;
  const totalSeats = 8;
  const filledSeats = totalSeats - seatsLeft;

  // Determine Badge Status & Color Coding
  let statusBadge = {
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 glow-emerald',
    badgeText: t.statusReady,
    dotColor: 'bg-emerald-400',
    type: 'ready'
  };

  if (seatsLeft === 0) {
    statusBadge = {
      color: 'bg-red-500/10 text-red-400 border-red-500/40 glow-red',
      badgeText: t.statusFull,
      dotColor: 'bg-red-500',
      type: 'full'
    };
  } else if (seatsLeft <= 4) {
    statusBadge = {
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/40 glow-yellow',
      badgeText: t.statusFilling,
      dotColor: 'bg-amber-400',
      type: 'filling'
    };
  }

  const handleSeatSelect = (routeId, seatNum) => {
    setSelectedSeat(seatNum);
  };

  return (
    <div className="bg-slate-900/90 dark:bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col justify-between relative group overflow-hidden">
      {/* Stripe Accent on top */}
      <div className={`h-1.5 w-full absolute top-0 left-0 right-0 ${route.stripeColor === 'red' ? 'bg-gradient-to-r from-red-600 via-rose-500 to-red-600' : 'bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600'}`}></div>

      <div>
        {/* Top Header & Status Badge */}
        <div className="flex items-start justify-between gap-2 mb-3 pt-1">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white font-cairo tracking-tight">
                {lang === 'ar' ? route.nameAr : route.nameFr}
              </h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                {route.code}
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              <Navigation className="w-3 h-3 text-emerald-400" />
              <span>{route.distanceKm} km</span>
              <span>•</span>
              <Clock className="w-3 h-3 text-emerald-400" />
              <span>~{route.durationMin} {lang === 'ar' ? 'دقيقة' : 'min'}</span>
            </p>
          </div>

          {/* Price Tag */}
          <div className="text-right">
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono tracking-tight dir-ltr">
              {route.price.toFixed(3)}
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">{t.priceTND}</span>
          </div>
        </div>

        {/* Status Pill */}
        <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center justify-between gap-2 mb-4 ${statusBadge.color}`}>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${statusBadge.dotColor} animate-ping`}></span>
            <span>{statusBadge.badgeText}</span>
          </div>
          <span className="font-mono text-[11px] opacity-85">
            {seatsLeft} {t.seatWord}
          </span>
        </div>

        {/* 8-Seat Visual Grid Blocks (Requirement: Render 8 distinct van seat icons/blocks) */}
        <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 mb-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
            <span>{t.seatsLeft}</span>
            <span className="font-mono font-bold text-white">{seatsLeft} / {totalSeats}</span>
          </div>

          {/* 8 Seat Icon Blocks Bar */}
          <div className="grid grid-cols-8 gap-1.5">
            {Array.from({ length: totalSeats }).map((_, index) => {
              const isFilled = index < filledSeats;
              return (
                <div
                  key={index}
                  className={`h-8 rounded-lg flex flex-col items-center justify-center transition-all duration-300 border ${
                    isFilled
                      ? 'bg-slate-800 border-slate-700/80 text-slate-600'
                      : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-sm shadow-emerald-500/20 animate-pulse-fast'
                  }`}
                  title={isFilled ? `المقعد ${index + 1} مشغول` : `المقعد ${index + 1} شاغر`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-mono font-bold mt-0.5">{index + 1}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Expandable 8-Seat Van Cabin Visualizer */}
        {showSeatMap && (
          <VanSeatVisualizer
            route={route}
            onSeatClick={handleSeatSelect}
            selectedSeat={selectedSeat}
            lang={lang}
          />
        )}
      </div>

      {/* Card Action Buttons */}
      <div className="pt-2 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {/* Main Book Seat Action */}
          <button
            onClick={() => onBookSeat(route.id, selectedSeat)}
            disabled={seatsLeft <= 0}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 ${
              seatsLeft > 0
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-500/25'
                : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>{seatsLeft > 0 ? (selectedSeat ? `${t.bookSeat} (مقعد ${selectedSeat})` : t.bookSeat) : t.statusFull}</span>
          </button>

          {/* Toggle Full Blueprint View */}
          <button
            onClick={() => setShowSeatMap(!showSeatMap)}
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all"
            title={t.viewSeats}
          >
            {showSeatMap ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>

        <button
          onClick={() => setShowSeatMap(!showSeatMap)}
          className="text-center text-[11px] text-slate-400 hover:text-slate-200 transition-colors py-1 flex items-center justify-center gap-1"
        >
          <span>{showSeatMap ? t.hideSeats : t.viewSeats}</span>
        </button>
      </div>
    </div>
  );
}
