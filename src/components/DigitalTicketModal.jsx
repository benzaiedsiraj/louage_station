import React from 'react';
import { X, Printer, CheckCircle, Bus, QrCode, ShieldCheck, MapPin, Calendar, User, Ticket } from 'lucide-react';

export default function DigitalTicketModal({ ticket, onClose, lang, t }) {
  if (!ticket) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative">
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-900 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-amber-300" />
            <span className="font-bold text-sm">{t.ticketModalTitle}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ticket Content Body */}
        <div id="printable-ticket" className="p-6 bg-slate-900 text-slate-100 relative">
          {/* Background Station Stamp Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <div className="w-48 h-48 rounded-full border-8 border-emerald-500 flex items-center justify-center text-center p-4">
              <span className="font-black text-2xl text-emerald-500">
                محطة بن قردان
              </span>
            </div>
          </div>

          {/* Ticket Header & Barcode Header */}
          <div className="border-b-2 border-dashed border-slate-700 pb-4 mb-4 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>تذكرة مؤكدة ومسجلة بالشباك</span>
            </div>
            <h3 className="text-xl font-black text-white font-cairo">
              مُحَطَّةِ اللّوَاجْ بَبِنْ قِرْدَانْ
            </h3>
            <p className="text-xs text-slate-400">BEN GUERDANE LOUAGE STATION</p>
            <div className="mt-2 text-xs font-mono text-amber-400 bg-slate-950 inline-block px-3 py-1 rounded-lg border border-slate-800">
              N° {ticket.ticketId}
            </div>
          </div>

          {/* Key Ticket Details */}
          <div className="space-y-3 text-sm">
            {/* Destination */}
            <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'ar' ? 'الوجهة' : 'Destination'}</span>
              </div>
              <span className="font-black text-lg text-emerald-400 font-cairo">
                {lang === 'ar' ? ticket.nameAr : ticket.nameFr}
              </span>
            </div>

            {/* Seat & Price */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 block mb-1">{t.seatNumber}</span>
                <span className="text-2xl font-black text-amber-400 font-mono">
                  #{ticket.seatNumber}
                </span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 block mb-1">{t.priceTND}</span>
                <span className="text-xl font-black text-white font-mono">
                  {ticket.price.toFixed(3)} {t.priceTND}
                </span>
              </div>
            </div>

            {/* Van Info & Driver */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">{t.vanPlate}:</span>
                <span className="font-mono font-bold text-white">{ticket.plateNumber}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">{t.driver}:</span>
                <span className="font-bold text-amber-300">{ticket.driverName}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">{t.issueDate}:</span>
                <span className="font-mono text-slate-400">{ticket.timestamp}</span>
              </div>
            </div>
          </div>

          {/* QR Code & Barcode Simulation */}
          <div className="mt-4 pt-4 border-t-2 border-dashed border-slate-700 flex items-center justify-between">
            <div className="text-[10px] text-slate-400 max-w-[200px]">
              <p>{t.ticketNotice}</p>
            </div>

            {/* QR Code Graphic */}
            <div className="bg-white p-2 rounded-xl shadow-md">
              <svg className="w-16 h-16 text-slate-950" viewBox="0 0 100 100" fill="currentColor">
                {/* Simplified QR grid illustration */}
                <rect x="0" y="0" width="30" height="30" />
                <rect x="5" y="5" width="20" height="20" fill="white" />
                <rect x="10" y="10" width="10" height="10" />

                <rect x="70" y="0" width="30" height="30" />
                <rect x="75" y="5" width="20" height="20" fill="white" />
                <rect x="80" y="10" width="10" height="10" />

                <rect x="0" y="70" width="30" height="30" />
                <rect x="5" y="75" width="20" height="20" fill="white" />
                <rect x="10" y="80" width="10" height="10" />

                <rect x="40" y="10" width="15" height="15" />
                <rect x="45" y="45" width="20" height="20" />
                <rect x="70" y="70" width="15" height="15" />
                <rect x="15" y="40" width="15" height="15" />
              </svg>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
          >
            <Printer className="w-4 h-4" />
            <span>{t.printTicket}</span>
          </button>

          <button
            onClick={onClose}
            className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm transition-all"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}
