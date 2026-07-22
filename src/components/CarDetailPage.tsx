import React, { useState, useEffect } from 'react';
import { useCars } from '../context/CarContext';
import {
  ChevronLeft,
  ChevronRight,
  Share2,
  MapPin,
  Phone,
  Send,
  Check,
  ShieldCheck,
  ArrowLeft,
  Calendar,
  Gauge,
  Fuel,
  Palette,
  ExternalLink,
  Calculator
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { DEFAULT_SHOPCAR_URL } from '../services/carService';

export const CarDetailPage: React.FC = () => {
  const { selectedCar, setSelectedCar, cars, setFinancingCar, showToast } = useCars();
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Estados do formulário de proposta
  const [proposalName, setProposalName] = useState('');
  const [proposalPhone, setProposalPhone] = useState('');
  const [proposalCity, setProposalCity] = useState('');
  const [proposalEmail, setProposalEmail] = useState('');
  const [proposalMessage, setProposalMessage] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePhotoIndex(0);
    if (selectedCar) {
      const defaultMsg = `Olá, tenho interesse no veículo ${selectedCar.brand} ${selectedCar.model} ${selectedCar.version} (${selectedCar.yearModel}).`;
      setProposalMessage(defaultMsg);
    }
  }, [selectedCar]);

  if (!selectedCar) return null;

  const photos = selectedCar.photos && selectedCar.photos.length > 0
    ? selectedCar.photos
    : ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop'];

  const priceNum = Number(selectedCar.price);
  const formattedPrice = !isNaN(priceNum) && priceNum > 0
    ? priceNum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : 'Sob Consulta';

  const hasMileage = selectedCar.mileage !== undefined && selectedCar.mileage !== null && typeof selectedCar.mileage === 'number' && !isNaN(selectedCar.mileage);
  const formattedKm = hasMileage ? `${selectedCar.mileage!.toLocaleString('pt-BR')} km` : '';
  const shopcarTarget = selectedCar.shopcarUrl && selectedCar.shopcarUrl.trim() !== '' ? selectedCar.shopcarUrl : DEFAULT_SHOPCAR_URL;

  const handleNextPhoto = () => {
    setActivePhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = () => {
    setActivePhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Deslocamento suave das 6 miniaturas a partir da 5ª foto (índice 4)
  const maxThumbnailsVisible = 6;
  const thumbnailOffsetIndex = activePhotoIndex >= 4
    ? Math.min(activePhotoIndex - 3, Math.max(0, photos.length - maxThumbnailsVisible))
    : 0;

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalName.trim()) {
      showToast('Por favor, informe seu nome.', 'error');
      return;
    }

    const message = encodeURIComponent(
      `*PROPOSTA DO SITE - AUTO BELLINI*\n` +
      `*Veículo:* ${selectedCar.brand} ${selectedCar.model} ${selectedCar.version}\n` +
      `*Preço:* ${formattedPrice}\n\n` +
      `*Nome:* ${proposalName}\n` +
      `*Mensagem:* ${proposalMessage}`
    );

    window.open(`https://wa.me/5567984042345?text=${message}`, '_blank');
    showToast('Proposta gerada! Abrindo WhatsApp...', 'success');
  };

  // Veículos relacionados para a seção "VEJA MAIS VEÍCULOS"
  const relatedCars = cars.filter(c => c.id !== selectedCar.id).slice(0, 4);

  return (
    <div className="bg-slate-50 min-h-screen pb-16 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Botão de Voltar ao Estoque */}
        <div className="mb-4">
          <button
            onClick={() => setSelectedCar(null)}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-red-600 transition-colors py-2 px-3 bg-white rounded-lg border border-slate-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para o Estoque</span>
          </button>
        </div>

        {/* LAYOUT PRINCIPAL: 2 COLUNAS (Galeria/Detalhes à esquerda, Proposta à direita) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

          {/* COLUNA DA ESQUERDA (Grelha de Fotos, Título, Specs, Opcionais, Descrição) - 7 ou 8 cols */}
          <div className="lg:col-span-8 space-y-6">

            {/* Galeria de Fotos (Slider Horizontal Deslizante 4:3 Sem Bordas) */}
            <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl relative">
              <div className="relative aspect-[4/3] w-full bg-slate-900 flex overflow-hidden">
                <div
                  className="w-full h-full flex transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${activePhotoIndex * 100}%)` }}
                >
                  {photos.map((photo, idx) => (
                    <div key={idx} className="w-full h-full flex-shrink-0 relative">
                      <img
                        src={photo}
                        alt={`${selectedCar.brand} ${selectedCar.model}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Setas de navegação */}
                {photos.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevPhoto}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-slate-950/70 hover:bg-slate-900 text-white rounded-full transition-colors shadow-lg z-10"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNextPhoto}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-slate-950/70 hover:bg-slate-900 text-white rounded-full transition-colors shadow-lg z-10"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Contador de Fotos */}
                <span className="absolute bottom-3 right-3 bg-slate-950/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-md z-10">
                  {activePhotoIndex + 1} / {photos.length}
                </span>
              </div>

              {/* Linha de Miniaturas Paginadas Deslizantes (Sem Barra de Rolagem) */}
              {photos.length > 1 && (
                <div className="p-2.5 bg-slate-950 overflow-hidden border-t border-slate-800/60">
                  <div
                    className="flex gap-2 transition-transform duration-300 ease-out"
                    style={{ transform: `translateX(-${thumbnailOffsetIndex * (100 / Math.min(photos.length, maxThumbnailsVisible))}%)` }}
                  >
                    {photos.map((photo, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePhotoIndex(idx)}
                        className={`h-14 sm:h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all duration-200 ${idx === activePhotoIndex
                            ? 'border-red-600 scale-105 shadow-md shadow-red-950/40'
                            : 'border-transparent opacity-50 hover:opacity-100'
                          }`}
                        style={{
                          width: photos.length <= 6
                            ? `calc((100% - ${(photos.length - 1) * 0.5}rem) / ${photos.length})`
                            : `calc((100% - 2.5rem) / 6)`
                        }}
                      >
                        <img src={photo} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Título & Categoria do Veículo */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <span className="block text-xs font-black uppercase tracking-wider text-blue-900 mb-1">
                {selectedCar.brand} &bull; {selectedCar.transmission}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-red-600 leading-tight">
                {selectedCar.version}
              </h1>

              {/* Barra de Especificações (Ano/Modelo, Cor, Combustível, KM opcional) */}
              <div className={`grid grid-cols-2 ${hasMileage ? 'sm:grid-cols-4' : 'sm:grid-cols-3'} gap-4 mt-6 pt-6 border-t border-slate-100 text-center`}>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="block text-[11px] font-bold text-slate-400 uppercase mb-0.5">Ano/Modelo</span>
                  <span className="text-base font-black text-slate-900">{selectedCar.yearModel}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="block text-[11px] font-bold text-slate-400 uppercase mb-0.5">Cor</span>
                  <span className="text-base font-black text-slate-900">{selectedCar.color || 'Prata'}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="block text-[11px] font-bold text-slate-400 uppercase mb-0.5">Combustível</span>
                  <span className="text-base font-black text-slate-900">{selectedCar.fuel}</span>
                </div>
                {hasMileage && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="block text-[11px] font-bold text-slate-400 uppercase mb-0.5">KM</span>
                    <span className="text-base font-black text-slate-900">{formattedKm}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Opcionais (Lista Multi-coluna com Bullets) */}
            {selectedCar.features && selectedCar.features.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                  OPCIONAIS:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 text-xs text-slate-700 font-medium">
                  {selectedCar.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 py-0.5">
                      <span className="text-red-600 font-bold text-sm shrink-0">&bull;</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Descrição & Observações do Anunciante (Com Destaque Visual) */}
            {(selectedCar.description || selectedCar.shopcarUrl) && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                {selectedCar.description && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-4 bg-red-600 rounded-full"></span>
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                        OBSERVAÇÕES DO ANUNCIANTE:
                      </h3>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-red-50/50 via-slate-50 to-blue-50/30 rounded-xl border-l-4 border-red-600 border-y border-r border-slate-200/80 shadow-inner">
                      <p className="text-xs text-slate-800 leading-relaxed font-semibold whitespace-pre-line">
                        {selectedCar.description}
                      </p>
                    </div>
                  </div>
                )}

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={shopcarTarget}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-700 underline"
                  >
                    <span>Conferir este anúncio no Shopcar MS</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setFinancingCar(selectedCar)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
                  >
                    <Calculator className="w-4 h-4 text-blue-600" />
                    <span>Simular Financiamento</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* COLUNA DA DIREITA (Card de Proposta & Preço) - 4 cols */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sticky top-24 space-y-6">

              {/* Preço e Compartilhamento */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-black text-slate-900">
                    {formattedPrice}
                  </div>

                  {/* Ícones de Compartilhamento */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      showToast('Link do anúncio copiado!', 'success');
                    }}
                    title="Compartilhar Link"
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors text-xs"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="w-full h-px bg-slate-100 my-4" />
              </div>

              {/* Formulário "Envie sua mensagem" */}
              <form onSubmit={handleSendProposal} className="space-y-3">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Envie sua mensagem
                </h3>

                <div>
                  <input
                    type="text"
                    placeholder="Nome completo"
                    value={proposalName}
                    onChange={e => setProposalName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <textarea
                    rows={4}
                    value={proposalMessage}
                    onChange={e => setProposalMessage(e.target.value)}
                    placeholder="Sua mensagem..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>

                {/* Botão Enviar Proposta em Vermelho Auto Bellini (#b10924) */}
                <button
                  type="submit"
                  className="w-full py-3 bg-[#b10924] hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Proposta</span>
                </button>
              </form>

              {/* Rodapé da Proposta com Informações da Loja */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <img
                      src="/logo.png"
                      alt="Auto Bellini Veículos"
                      className="h-5 w-auto object-contain"
                    />
                    <span className="font-bold text-slate-900 leading-none">Auto Bellini Veículos</span>
                  </div>

                  <a
                    href="https://maps.google.com/?q=Auto+Bellini+Veiculos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Ver no Mapa</span>
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <a
                    href="https://wa.me/5567984042345"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg font-bold flex items-center justify-center gap-1 transition-colors"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                    <span>(67) 98404-2345</span>
                  </a>

                  <a
                    href="https://wa.me/5567984066870"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg font-bold flex items-center justify-center gap-1 transition-colors"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                    <span>(67) 98406-6870</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* SEÇÃO INFERIOR: "VEJA MAIS VEÍCULOS" */}
        {relatedCars.length > 0 && (
          <div className="pt-8 border-t border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-wider">
                Veja Mais Veículos
              </h2>
              <button
                onClick={() => setSelectedCar(null)}
                className="text-xs font-bold text-red-600 hover:text-red-700 underline"
              >
                + Ver Todo o Estoque
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedCars.map(car => {
                const relPriceNum = Number(car.price);
                const relPrice = !isNaN(relPriceNum) && relPriceNum > 0
                  ? relPriceNum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                  : 'Sob Consulta';
                const relPhoto = Array.isArray(car.photos) && car.photos.length > 0 && car.photos[0]
                  ? car.photos[0]
                  : 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop';

                return (
                  <div
                    key={car.id}
                    onClick={() => {
                      setSelectedCar(car);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-slate-200 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                      <img
                        src={relPhoto}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 bg-slate-950/80 text-white font-bold text-[10px] px-2 py-0.5 rounded">
                        {car.yearModel}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <span className="text-[10px] font-black uppercase text-blue-900 tracking-wider">
                        {car.brand}
                      </span>
                      <h3 className="text-sm font-black text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
                        {car.version}
                      </h3>
                      <div className="text-base font-black text-red-600">
                        {relPrice}
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 font-medium">
                        <span>{car.color || 'Prata'}</span>
                        <span>{car.fuel}</span>
                        {car.mileage !== undefined && car.mileage !== null && <span>{car.mileage.toLocaleString('pt-BR')} km</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
