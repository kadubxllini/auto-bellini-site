import React from 'react';
import { Target, Eye, Gem, CheckCircle } from 'lucide-react';

export const MissionSection: React.FC = () => {
  return (
    <section id="missao" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3 border border-slate-700">
            Princípios Fundamentais
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Missão, Visão e Valores
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            A filosofia de trabalho que impulsiona o relacionamento da Auto Bellini Veículos com cada cliente de Campo Grande.
          </p>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Missão */}
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all">
            <div className="w-14 h-14 bg-red-600/20 text-red-500 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-white mb-3">Nossa Missão</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Realizar o sonho da conquista do veículo próprio por meio de um atendimento transparente, seguro e personalizado, oferecendo soluções de financiamento e estoque diversificado com alta procedência.
            </p>
          </div>

          {/* Visão */}
          <div className="bg-gradient-to-b from-slate-900 to-blue-950 border border-red-500/40 rounded-2xl p-8 shadow-xl shadow-red-950/20 transform md:-translate-y-2">
            <div className="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-red-600/40">
              <Eye className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-white mb-3">Nossa Visão</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Ser referência absoluta no mercado automotivo de seminovos em Campo Grande - MS, integrando excelência no espaço físico da Av. Bandeirantes com forte presença digital no Shopcar.
            </p>
          </div>

          {/* Valores */}
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all">
            <div className="w-14 h-14 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6">
              <Gem className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-white mb-3">Nossos Valores</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span><strong>Transparência:</strong> Clareza total em cada contrato.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span><strong>Qualidade:</strong> Perícia minuciosa nos carros.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span><strong>Respeito:</strong> Relacionamento duradouro.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span><strong>Agilidade:</strong> Aprovação rápida de crédito.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
