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

  const formattedPrice = car.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const formattedKm = car.mileage.toLocaleString('pt-BR');
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
      {/* Image & Badges */}
      <div className="relative w-full h-56 bg-slate-900 overflow-hidden">
        <img 
          src={car.photos[0] || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop'} 
          alt={`${car.brand} ${car.model}`}
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

          <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1">
            {car.model}
          </h3>

          <p className="text-xs text-slate-500 font-medium line-clamp-1 mb-4">
            {car.version}
          </p>

          {/* Key Specs */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-xs font-semibold text-slate-600 mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{car.yearModel}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-slate-400" />
              <span>{formattedKm} km</span>
            </div>
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
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
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
