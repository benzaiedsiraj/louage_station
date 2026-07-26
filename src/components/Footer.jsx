import React from 'react';
import { MapPin, Phone, Shield, ExternalLink, Heart } from 'lucide-react';

export default function Footer({ lang, t }) {
  return (
    <footer className="mt-16 bg-slate-950 border-t border-slate-800 text-slate-400 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Station Info */}
        <div className="space-y-3">
          <h3 className="text-lg font-black text-white font-cairo">
            مُحَطَّةِ اللّوَاجْ بَبِنْ قِرْدَانْ
          </h3>
          <p className="text-xs leading-relaxed text-slate-400">
            {t.stationSubtitle}. {t.emergencyText}.
          </p>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-medium pt-1">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t.stationLocation}</span>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-cairo">
            {lang === 'ar' ? 'أرقام النجدة والاستعلامات' : 'Contacts & Assistance'}
          </h4>
          <div className="space-y-2 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{t.stationPhone}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <Shield className="w-4 h-4 text-sky-400" />
              <span>شرطة المرور ببن قردان: 197</span>
            </div>
          </div>
        </div>

        {/* Pitch Badge & Credits */}
        <div className="space-y-3 md:text-right">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-cairo">
            {lang === 'ar' ? 'مشروع التطوير الرقمي' : 'Projet de Digitalisation'}
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t.pitchTag}
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <span>مصمم بأعلى معايير الأداء والسرعة</span>
              <Heart className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© 2026 Ben Guerdane Louage Management Demo System.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-slate-300 transition-colors">{lang === 'ar' ? 'سياسة الخصوصية' : 'Confidentialité'}</a>
          <a href="#" className="hover:text-slate-300 transition-colors">{lang === 'ar' ? 'الشروط والأحكام' : 'Conditions'}</a>
        </div>
      </div>
    </footer>
  );
}
