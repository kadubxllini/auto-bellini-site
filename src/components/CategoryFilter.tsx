import React from 'react';
import { useCars } from '../context/CarContext';
import { Car, Truck, Zap, Sparkles, Layers } from 'lucide-react';

interface CategoryOption {
  id: string;
  label: string;
  icon: React.ElementType;
}

const CATEGORIES: CategoryOption[] = [
  { id: 'todos', label: 'Todos os Seminovos', icon: Layers },
  { id: 'suv', label: 'SUVs & Crossovers', icon: Car },
  { id: 'sedan', label: 'Sedans', icon: Car },
  { id: 'hatch', label: 'Hatches', icon: Car },
  { id: 'pickup', label: 'Pickups & Utilitários', icon: Truck },
  { id: 'automatico', label: 'Automáticos', icon: Zap },
  { id: 'hibrido', label: 'Híbridos / Elétricos', icon: Sparkles }
];

export const CategoryFilter: React.FC = () => {
  const { filters, setFilters } = useCars();
  const currentCategory = filters.bodyType || 'todos';

  const handleSelectCategory = (catId: string) => {
    setFilters(prev => ({
      ...prev,
      bodyType: catId === 'todos' ? undefined : catId
    }));
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
          Navegue por Categoria
        </h3>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {CATEGORIES.map(cat => {
          const Icon = cat.icon;
          const isActive = currentCategory === cat.id || (cat.id === 'todos' && !filters.bodyType);

          return (
            <button
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className={`flex-none inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all active:scale-95 border ${
                isActive
                  ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
