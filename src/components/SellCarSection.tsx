import React, { useState } from 'react';
import { Car, ArrowRight, ShieldCheck, DollarSign, Award } from 'lucide-react';
import { SellCarModal } from './SellCarModal';

export const SellCarSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-12 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-red-950/80 via-slate-950 to-slate-950 p-8 sm:p-10 rounded-3xl border border-red-900/40 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-black uppercase tracking-wider mb-4">
              <Car className="w-4 h-4 text-red-500" />
              <span>Avaliação de Veículos Usados</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight mb-4">
              Quer vender ou trocar seu seminovo com a melhor avaliação?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Avaliamos seu veículo na hora com transparência, pagamento rápido e possibilidade de troca com troco. Envie os dados do seu carro para nossa equipe em segundos!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold text-slate-300">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Pagamento Rápido</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Melhor Cotação de Campo Grande</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Processo 100% Seguro</span>
              </div>
            </div>
          </div>

          <div className="flex-none w-full lg:w-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full lg:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-red-600/30 transition-all transform hover:-translate-y-1 active:scale-95"
            >
              <span>Avaliar Meu Veículo Agora</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>

      <SellCarModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
