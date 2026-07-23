import React, { useState } from 'react';
import { X, Send, Car, Camera, CheckCircle2 } from 'lucide-react';
import { useCars } from '../context/CarContext';

interface SellCarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SellCarModal: React.FC<SellCarModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useCars();

  const [brand, setBrand] = useState('');
  const [version, setVersion] = useState('');
  const [yearModel, setYearModel] = useState('');
  const [mileage, setMileage] = useState('');
  const [desiredPrice, setDesiredPrice] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brand || !version || !ownerName || !ownerPhone) {
      showToast('Por favor, preencha os campos obrigatórios.', 'error');
      return;
    }

    const message = `*PROPOSTA DE AVALIAÇÃO DE VEÍCULO USADO*\n\n` +
      `*Proprietário:* ${ownerName}\n` +
      `*Telefone/WhatsApp:* ${ownerPhone}\n\n` +
      `*Veículo:* ${brand} - ${version}\n` +
      `*Ano:* ${yearModel || 'Não informado'}\n` +
      `*Quilometragem:* ${mileage ? `${mileage} km` : 'Não informada'}\n` +
      `*Preço Desejado:* ${desiredPrice ? `R$ ${desiredPrice}` : 'A combinar'}\n` +
      (notes ? `*Observações:* ${notes}\n` : '') +
      `\n_Enviado através do site Auto Bellini Veículos_`;

    const encodedMsg = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5567999999999?text=${encodedMsg}`;

    showToast('Proposta gerada! Redirecionando para o WhatsApp da Auto Bellini...', 'success');
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-red-600">
          <div className="flex items-center gap-2.5">
            <Car className="w-5 h-5 text-red-500" />
            <h3 className="font-extrabold text-base">Avaliar & Vender Meu Veículo</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <p className="text-xs text-slate-600 bg-slate-100 p-3 rounded-xl border border-slate-200">
            Preencha os dados do seu veículo seminovo para receber uma proposta rápida de avaliação ou consignação da equipe da <strong>Auto Bellini</strong>.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Marca *
              </label>
              <input
                type="text"
                value={brand}
                onChange={e => setBrand(e.target.value)}
                placeholder="Ex: Toyota, Honda, Fiat"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Versão / Modelo *
              </label>
              <input
                type="text"
                value={version}
                onChange={e => setVersion(e.target.value)}
                placeholder="Ex: Corolla XEi 2.0 Flex"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Ano
              </label>
              <input
                type="text"
                value={yearModel}
                onChange={e => setYearModel(e.target.value)}
                placeholder="Ex: 2021/2022"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                KM Atual
              </label>
              <input
                type="text"
                value={mileage}
                onChange={e => setMileage(e.target.value)}
                placeholder="Ex: 45.000"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Valor Desejado
              </label>
              <input
                type="text"
                value={desiredPrice}
                onChange={e => setDesiredPrice(e.target.value)}
                placeholder="Ex: 85.000,00"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Seu Nome *
              </label>
              <input
                type="text"
                value={ownerName}
                onChange={e => setOwnerName(e.target.value)}
                placeholder="Seu nome completo"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Seu WhatsApp *
              </label>
              <input
                type="tel"
                value={ownerPhone}
                onChange={e => setOwnerPhone(e.target.value)}
                placeholder="(67) 99999-9999"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Observações / Opcionais
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Único dono, revisões na concessionária, teto solar, etc."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-600/30 transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Solicitar Avaliação via WhatsApp</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
