import React from 'react';
import { useCars } from '../context/CarContext';
import { CarCard } from './CarCard';
import { Car } from 'lucide-react';

export const CarGrid: React.FC = () => {
  const { filteredCars } = useCars();

  return (
    <section id="estoque" className="pt-4 pb-16 bg-slate-100/70 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Car className="w-3.5 h-3.5" />
              <span>Estoque Atualizado</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Nosso Estoque de Seminovos
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Todos os veículos disponíveis em nossa loja física na Av. Bandeirantes e no Shopcar MS.
            </p>
          </div>
        </div>

        {/* Grid List */}
        {filteredCars.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-slate-300">
            <Car className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">Nenhum veículo encontrado</h3>
            <p className="text-slate-500 text-sm mt-1">Tente remover alguns filtros da busca acima.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
