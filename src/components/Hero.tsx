import React from 'react';
import { Car, ExternalLink, ShieldCheck, Award, Zap } from 'lucide-react';
import { DEFAULT_SHOPCAR_URL } from '../services/carService';
import { AutoBelliniText } from './AutoBelliniText';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative bg-slate-950 text-white overflow-hidden py-24 lg:py-32">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transform transition-transform duration-10000 hover:scale-100"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-blue-950/70" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          
          {/* Hero Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white mb-6">
            Seu novo seminovo com procedência garantida na <AutoBelliniText />
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-10 max-w-2xl">
            A melhor seleção de veículos seminovos e usados multimarcas em Campo Grande - MS. Qualidade periciada, transparência na negociação e parceria oficial com o <strong>Shopcar</strong>.
          </p>

          {/* CTA Group */}
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <a
              href="#estoque"
              className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all transform hover:-translate-y-1"
            >
              <Car className="w-5 h-5" />
              <span>Ver Estoque Completo</span>
            </a>

            <a
              href={DEFAULT_SHOPCAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-7 py-4 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold rounded-xl backdrop-blur-md hover:border-slate-500 transition-all transform hover:-translate-y-1"
            >
              <ExternalLink className="w-5 h-5 text-blue-400" />
              <span>Loja no Shopcar MS</span>
            </a>
          </div>

          {/* Feature Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-800/80 text-sm font-semibold text-slate-300">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span>Veículos 100% Periciados</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-600/20 text-red-400">
                <Award className="w-5 h-5" />
              </div>
              <span>Melhor Avaliação no Usado</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-600/20 text-emerald-400">
                <Zap className="w-5 h-5" />
              </div>
              <span>Financiamento Facilitado</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
