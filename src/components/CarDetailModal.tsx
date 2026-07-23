import React, { useState } from 'react';
import { useCars } from '../context/CarContext';
import { X, ExternalLink, Calendar, Gauge, Fuel, ShieldCheck, Calculator, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { DEFAULT_SHOPCAR_URL } from '../services/carService';
import { WhatsAppIcon } from './WhatsAppIcon';

export const CarDetailModal: React.FC = () => {
  const { selectedCar, setSelectedCar, setFinancingCar } = useCars();
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  if (!selectedCar) return null;

  const priceNum = Number(selectedCar.price);
  const formattedPrice = !isNaN(priceNum) && priceNum > 0
    ? priceNum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : 'Sob Consulta';

  const hasMileage = selectedCar.mileage !== undefined && selectedCar.mileage !== null && typeof selectedCar.mileage === 'number' && !isNaN(selectedCar.mileage);
  const formattedKm = hasMileage ? `${selectedCar.mileage!.toLocaleString('pt-BR')} km` : '';
  const shopcarTarget = selectedCar.shopcarUrl && selectedCar.shopcarUrl.trim() !== '' ? selectedCar.shopcarUrl : DEFAULT_SHOPCAR_URL;
  const photos = Array.isArray(selectedCar.photos) && selectedCar.photos.length > 0 ? selectedCar.photos : ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop'];

  const handleNextPhoto = () => {
    setActivePhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = () => {
    setActivePhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no veículo ${selectedCar.brand} ${selectedCar.model} ${selectedCar.version} (${selectedCar.yearModel}) anunciado por ${formattedPrice}. Podem me passar mais detalhes?`
  );
  const whatsappUrl1 = `https://wa.me/5567984042345?text=${whatsappMessage}`;
  const whatsappUrl2 = `https://wa.me/5567984066870?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8 flex flex-col md:flex-row">
        
        {/* Gallery Column */}
        <div className="md:w-1/2 bg-slate-950 relative flex flex-col justify-between min-h-[320px] md:min-h-[480px]">
          <div className="relative flex-1 w-full h-full">
            <img
              src={photos[activePhotoIndex]}
              alt={`${selectedCar.brand} ${selectedCar.model}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            
            {/* Arrows if multiple photos */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {photos.length > 1 && (
            <div className="p-3 bg-slate-900/90 flex gap-2 overflow-x-auto">
              {photos.map((photo: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    idx === activePhotoIndex ? 'border-red-500 scale-105' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Column */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-blue-600">
                {selectedCar.brand}
              </span>
              <button
                onClick={() => setSelectedCar(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {selectedCar.model}
            </h2>

            <p className="text-xs text-slate-500 font-medium mt-1 mb-4">
              {selectedCar.version}
            </p>

            {/* Price Badge */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-slate-500 uppercase">Valor à Vista</span>
              <span className="text-2xl font-black text-red-600">{formattedPrice}</span>
            </div>

            {/* Technical Specs */}
            <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-slate-700 mb-6">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Ano</span>
                  <span>{selectedCar.yearModel}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-slate-400" />
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Quilometragem</span>
                  <span>{formattedKm} km</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                <Fuel className="w-4 h-4 text-slate-400" />
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Combustível</span>
                  <span>{selectedCar.fuel}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Câmbio</span>
                  <span>{selectedCar.transmission}</span>
                </div>
              </div>
            </div>

            {/* Features (Opcionais no estilo Shopcar) */}
            {selectedCar.features && selectedCar.features.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-600"></span>
                  Opcionais do Veículo ({selectedCar.features.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-[11px] text-slate-700 max-h-36 overflow-y-auto">
                  {selectedCar.features.map((feat: string, i: number) => (
                    <div key={i} className="flex items-center gap-1.5 py-0.5">
                      <span className="text-red-600 font-black text-xs">•</span>
                      <span className="font-medium text-slate-800">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Observações do Anunciante */}
            {selectedCar.description && (
              <div className="mb-4 p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                <h4 className="text-[11px] font-black text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                  Observações do Anunciante
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {selectedCar.description}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href={whatsappUrl1}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>Eduardo: 98404-2345</span>
              </a>

              <a
                href={whatsappUrl2}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>Fábio: 98406-6870</span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={shopcarTarget}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl transition-colors"
              >
                <span>Ver no Shopcar MS</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => {
                  const carToSimulate = selectedCar;
                  setSelectedCar(null);
                  setFinancingCar(carToSimulate);
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors"
              >
                <Calculator className="w-4 h-4 text-blue-600" />
                <span>Simular Parcela</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
