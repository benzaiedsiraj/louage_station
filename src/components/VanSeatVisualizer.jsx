import React from 'react';
import { User, Check, X, Shield, Sparkles } from 'lucide-react';

export default function VanSeatVisualizer({ route, onSeatClick, selectedSeat, lang }) {
  const totalSeats = 8;
  const occupiedCount = totalSeats - route.seatsAvailable;

  // Generate seat arrangement array (0 = occupied, 1 = available)
  // Front row: 1 passenger seat next to driver
  // Middle row: 3 seats
  // Rear row: 3 seats + 1 (total 8 passenger seats)
  const seats = Array.from({ length: totalSeats }, (_, i) => {
    // Determine if occupied based on occupiedCount
    const isOccupied = i < occupiedCount;
    const seatNumber = i + 1;
    const isSelected = selectedSeat === seatNumber;
    return {
      id: seatNumber,
      isOccupied,
      isSelected
    };
  });

  return (
    <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 my-2 relative overflow-hidden shadow-inner">
      {/* Louage Graphic Header */}
      <div className="flex items-center justify-between mb-3 text-xs border-b border-slate-800/80 pb-2">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${route.stripeColor === 'red' ? 'bg-red-500' : 'bg-blue-500'}`} />
          <span className="font-bold text-slate-300">
            {route.stripeColor === 'red' ? (lang === 'ar' ? 'لواج بين الولايات (شريط أحمر)' : 'Intercity Red Line') : (lang === 'ar' ? 'لواج جهوي (شريط أزرق)' : 'Regional Blue Line')}
          </span>
        </div>
        <span className="font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded text-[11px]">
          {route.plateNumber}
        </span>
      </div>

      {/* 8-Seat Van Cabin Floorplan Layout */}
      <div className="max-w-xs mx-auto bg-slate-900 border-2 border-slate-700/80 rounded-3xl p-3 shadow-2xl relative">
        {/* Windshield Indicator */}
        <div className="w-2/3 mx-auto h-2 bg-gradient-to-b from-sky-400/40 to-transparent rounded-t-full mb-3 flex items-center justify-center">
          <span className="text-[9px] text-sky-300 font-bold uppercase tracking-widest">
            {lang === 'ar' ? 'مقدمة اللواج' : 'FRONT WINDSHELD'}
          </span>
        </div>

        {/* Row 1: Driver & Passenger Seat 1 */}
        <div className="grid grid-cols-3 gap-2 mb-3 items-center">
          {/* Driver Seat (Non-selectable) */}
          <div className="bg-slate-800/80 border border-amber-500/40 rounded-xl p-2 flex flex-col items-center justify-center text-amber-400">
            <User className="w-4 h-4" />
            <span className="text-[10px] font-bold mt-0.5">{lang === 'ar' ? 'سائق' : 'Driver'}</span>
          </div>

          <div className="text-center text-[10px] text-slate-600 font-mono">
            •••
          </div>

          {/* Seat 1 (Front Passenger) */}
          <SeatButton
            seat={seats[0]}
            onClick={() => onSeatClick && onSeatClick(route.id, 1)}
            label={lang === 'ar' ? 'مقعد 1' : 'Seat 1'}
          />
        </div>

        {/* Separator / Aisle */}
        <div className="w-full h-px bg-slate-800 my-2"></div>

        {/* Row 2: Seats 2, 3, 4 */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <SeatButton seat={seats[1]} onClick={() => onSeatClick && onSeatClick(route.id, 2)} label="2" />
          <SeatButton seat={seats[2]} onClick={() => onSeatClick && onSeatClick(route.id, 3)} label="3" />
          <SeatButton seat={seats[3]} onClick={() => onSeatClick && onSeatClick(route.id, 4)} label="4" />
        </div>

        {/* Row 3: Seats 5, 6, 7, 8 */}
        <div className="grid grid-cols-4 gap-1.5">
          <SeatButton seat={seats[4]} onClick={() => onSeatClick && onSeatClick(route.id, 5)} label="5" />
          <SeatButton seat={seats[5]} onClick={() => onSeatClick && onSeatClick(route.id, 6)} label="6" />
          <SeatButton seat={seats[6]} onClick={() => onSeatClick && onSeatClick(route.id, 7)} label="7" />
          <SeatButton seat={seats[7]} onClick={() => onSeatClick && onSeatClick(route.id, 8)} label="8" />
        </div>
      </div>

      {/* Seat Legend */}
      <div className="flex items-center justify-center gap-4 mt-3 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
          <span>{lang === 'ar' ? 'متوفر' : 'Available'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
          <span>{lang === 'ar' ? 'محجوز' : 'Occupied'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          <span>{lang === 'ar' ? 'محدد' : 'Selected'}</span>
        </div>
      </div>
    </div>
  );
}

function SeatButton({ seat, onClick, label }) {
  const { id, isOccupied, isSelected } = seat;

  let bgClasses = 'bg-emerald-500/20 border-emerald-500/60 text-emerald-400 hover:bg-emerald-500/30';
  if (isOccupied) {
    bgClasses = 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed';
  } else if (isSelected) {
    bgClasses = 'bg-amber-500 border-amber-300 text-slate-950 font-bold shadow-lg shadow-amber-500/40 animate-pulse';
  }

  return (
    <button
      disabled={isOccupied}
      onClick={onClick}
      className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all duration-200 ${bgClasses}`}
      title={isOccupied ? `المقعد ${id} محجوز` : `حجز المقعد ${id}`}
    >
      <User className="w-3.5 h-3.5" />
      <span className="text-[10px] font-bold mt-0.5">{label}</span>
    </button>
  );
}
