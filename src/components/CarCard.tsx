import React from 'react';
import type { Car } from '../types/car';
import { useCars } from '../context/CarContext';
import { ExternalLink, Calendar, Gauge, Fuel, Edit, Trash2, Calculator, ChevronRight, Star } from 'lucide-react';
import { DEFAULT_SHOPCAR_URL } from '../services/carService';

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { setSelectedCar, setFinancingCar, isAdmin, setEditingCar, setIsCarModalOpen, deleteCar } = useCars();

  const priceNum = Number(car.price);
  const formattedPrice = !isNaN(priceNum) && priceNum > 0
    ? priceNum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : 'Sob Consulta';

  const hasMileage = car.mileage !== undefined && car.mileage !== null && typeof car.mileage === 'number' && !isNaN(car.mileage);
  const formattedKm = hasMileage ? `${car.mileage!.toLocaleString('pt-BR')} km` : '';
  const shopcarTarget = car.shopcarUrl && car.shopcarUrl.trim() !== '' ? car.shopcarUrl : DEFAULT_SHOPCAR_URL;

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingCar(car);
    setIsCarModalOpen(true);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Confirma a remoção do anúncio "${car.brand} ${car.model}"?`)) {
      deleteCar(car.id);
    }
  };

  const handleFinancing = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFinancingCar(car);
  };

  return (
    <div 
      onClick={() => setSelectedCar(car)}
      className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Image & Badges (Proporção Padrão 1024x768 / 4:3 Sem Bordas) */}
      <div className="relative w-full aspect-[4/3] bg-slate-900 overflow-hidden">
        <img 
          src={(Array.isArray(car.photos) && car.photos.length > 0 && car.photos[0]) ? car.photos[0] : 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop'} 
          alt={`${car.brand || ''} ${car.model || ''}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop';
          }}
        />
        
        {/* Shopcar Tag */}
        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md border border-red-500/50 text-red-400 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
          <ExternalLink className="w-3 h-3 text-red-500" />
          <span>Shopcar MS</span>
        </div>

        {/* Featured Tag */}
        {car.featured && (
          <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[11px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
            <Star className="w-3 h-3 fill-slate-950" />
            <span>DESTAQUE</span>
          </div>
        )}

        {/* Admin Controls Floating Overlay */}
        {isAdmin && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-700 shadow-lg">
            <button
              onClick={handleEdit}
              className="p-1.5 bg-amber-500/20 hover:bg-amber-500 text-amber-400 hover:text-slate-950 rounded-lg transition-colors"
              title="Editar Carro"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-colors"
              title="Deletar Carro"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs font-extrabold uppercase tracking-wider text-blue-600 mb-1">
            {car.brand}
          </div>

          <h3 className="font-extrabold text-base text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 mb-4 min-h-[3rem]">
            {car.version}
          </h3>

          {/* Key Specs */}
          <div className={`grid ${hasMileage ? 'grid-cols-3' : 'grid-cols-2'} gap-2 py-3 border-y border-slate-100 text-xs font-semibold text-slate-600 mb-4`}>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{car.yearModel}</span>
            </div>
            {hasMileage && (
              <div className="flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-slate-400" />
                <span>{formattedKm}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-slate-400" />
              <span>{car.fuel}</span>
            </div>
          </div>
        </div>

        {/* Price & Actions */}
        <div>
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase">Preço</span>
            <span className="text-xl font-black text-red-600">{formattedPrice}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <a
              href={shopcarTarget}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#b01717] hover:bg-[#8f1212] text-white font-bold text-xs rounded-xl transition-all shadow-sm active:scale-[0.98]"
            >
              <span>Ver no Shopcar</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            <button
              onClick={handleFinancing}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all"
            >
              <Calculator className="w-3.5 h-3.5 text-blue-600" />
              <span>Simular</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
