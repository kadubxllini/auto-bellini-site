import React from 'react';
import { useCars } from '../context/CarContext';
import { Search, RotateCcw } from 'lucide-react';

export const FilterBar: React.FC = () => {
  const { filters, setFilters, resetFilters, brands, filteredCars, cars } = useCars();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 mb-10">
      
      {/* Upper search & info */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            placeholder="Buscar modelo ou versão (ex: Corolla, Civic, Jeep)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
          />
        </div>

        {/* Count info */}
        <div className="flex items-center gap-3 text-sm font-semibold text-slate-600 w-full md:w-auto justify-between md:justify-end">
          <span>Exibindo <strong>{filteredCars.length}</strong> de <strong>{cars.length}</strong> veículos</span>
          
          {(filters.searchQuery || filters.brand || filters.transmission || filters.fuel || filters.sortBy !== 'recent') && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Limpar Filtros
            </button>
          )}
        </div>
      </div>

      {/* Select Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
        
        {/* Marca */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Marca
          </label>
          <select
            value={filters.brand}
            onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          >
            <option value="">Todas as Marcas</option>
            {brands.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Câmbio */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Câmbio
          </label>
          <select
            value={filters.transmission}
            onChange={(e) => setFilters(prev => ({ ...prev, transmission: e.target.value }))}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          >
            <option value="">Todos os Câmbios</option>
            <option value="Automático">Automático</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        {/* Combustível */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Combustível
          </label>
          <select
            value={filters.fuel}
            onChange={(e) => setFilters(prev => ({ ...prev, fuel: e.target.value }))}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          >
            <option value="">Todos</option>
            <option value="Flex">Flex</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Diesel">Diesel</option>
            <option value="Híbrido">Híbrido</option>
            <option value="Elétrico">Elétrico</option>
          </select>
        </div>

        {/* Ordenar Por */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Ordenar Por
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          >
            <option value="recent">Mais Recentes</option>
            <option value="price-asc">Menor Preço</option>
            <option value="price-desc">Maior Preço</option>
            <option value="year-desc">Ano mais Novo</option>
            <option value="km-asc">Menor Quilometragem</option>
          </select>
        </div>

      </div>
    </div>
  );
};
