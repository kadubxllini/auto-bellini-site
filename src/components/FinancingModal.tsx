import React, { useState } from 'react';
import { useCars } from '../context/CarContext';
import { X, Calculator, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FinancingModal: React.FC = () => {
  const { financingCar, setFinancingCar } = useCars();
  const [downPayment, setDownPayment] = useState<number>(0);
  const [months, setMonths] = useState<number>(48);

  if (!financingCar) return null;

  const totalPrice = financingCar.price;
  const initialDownPayment = downPayment || Math.round(totalPrice * 0.2); // Default 20% down payment
  const amountToFinance = Math.max(0, totalPrice - initialDownPayment);
  
  // Approximate interest rate ~1.49% per month
  const monthlyRate = 0.0149;
  const monthlyPayment = amountToFinance > 0
    ? Math.round((amountToFinance * (monthlyRate * Math.pow(1 + monthlyRate, months))) / (Math.pow(1 + monthlyRate, months) - 1))
    : 0;

  const formattedTotalPrice = totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const formattedDownPayment = initialDownPayment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const formattedMonthlyPayment = monthlyPayment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de simular o financiamento do veículo ${financingCar.brand} ${financingCar.model} (${financingCar.yearModel}). Valor total: ${formattedTotalPrice}, Entrada: ${formattedDownPayment}, em ${months}x de ${formattedMonthlyPayment}. Podem analisar meu crédito?`
  );
  const whatsappUrl = `https://wa.me/5567984042345?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-red-600">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-600 rounded-xl">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">Simulador de Financiamento</h3>
              <p className="text-xs text-slate-400">{financingCar.brand} {financingCar.model} ({financingCar.yearModel})</p>
            </div>
          </div>
          <button
            onClick={() => setFinancingCar(null)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Preço do Veículo</span>
            <span className="text-xl font-black text-slate-900">{formattedTotalPrice}</span>
          </div>

          {/* Down Payment Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Valor de Entrada (R$)</label>
              <span className="text-xs text-slate-500 font-semibold">{formattedDownPayment}</span>
            </div>
            <input
              type="number"
              value={downPayment || ''}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              placeholder={`Sugerido: ${Math.round(totalPrice * 0.2)}`}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          {/* Term Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Quantidade de Parcelas
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[12, 24, 36, 48, 60].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setMonths(term)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                    months === term
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {term}x
                </button>
              ))}
            </div>
          </div>

          {/* Result Card */}
          <div className="p-5 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl shadow-xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Estimativa da Parcela</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-emerald-400">{months}x de {formattedMonthlyPayment}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Taxas aproximadas sujeitas a análise de crédito bancário.</span>
            </div>
          </div>

          {/* CTA WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition-all"
          >
            <WhatsAppIcon className="w-5 h-5 fill-current" />
            <span>Enviar Proposta de Financiamento</span>
          </a>

        </div>

      </div>
    </div>
  );
};
