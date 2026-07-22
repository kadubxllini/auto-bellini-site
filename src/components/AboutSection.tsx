import React from 'react';
import { Building2, ShieldCheck, Award } from 'lucide-react';
import { AutoBelliniText } from './AutoBelliniText';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-24 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Image Column with Logo Overlay */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop"
                alt="Fachada Auto Bellini Veículos em Campo Grande MS"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              {/* Floating Logo Badge on Image */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-200">
                <img src="/logo.png" alt="Auto Bellini Logo" className="h-16 w-auto object-contain" />
              </div>

              <div className="absolute bottom-6 left-6 right-6 p-6 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-red-600/50 text-white flex items-center gap-4">
                <div className="text-4xl font-black text-red-500 font-mono">+10</div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
                  Anos de Tradição e Excelência Automotiva em Campo Grande - MS
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              <span>Nossa História</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Sobre a <AutoBelliniText /> Veículos
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              Localizada no coração de Campo Grande - MS, na <strong>Avenida Bandeirantes, 2052 (Vila Bandeirante)</strong>, a <strong className="text-slate-900"><AutoBelliniText /> Veículos</strong> consolidou-se como uma das lojas de carros seminovos e usados mais respeitadas da região.
            </p>

            <p className="text-slate-600 text-base leading-relaxed">
              Nosso compromisso é selecionar veículos de procedência rigorosamente inspecionada, oferecendo transparência total no histórico, laudo cautelar e facilidade na troca do seu usado com a melhor avaliação da cidade.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Procedência 100% Garantida</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Veículos com laudo pericial aprovado.</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Parceiro Shopcar MS</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Estoque sincronizado na maior vitrine de MS.</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
