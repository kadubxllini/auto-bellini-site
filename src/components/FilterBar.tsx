import React from 'react';
import { useCars } from '../context/CarContext';
import { Search, RotateCcw } from 'lucide-react';
import { CustomSelect } from './ui/CustomSelect';

export const FilterBar: React.FC = () => {
  const { filters, setFilters, resetFilters, brands, versions, colors, filteredCars, cars } = useCars();

  const hasActiveFilters = Boolean(
    filters.searchQuery ||
    filters.brand ||
    filters.version ||
    filters.color ||
    filters.transmission ||
    filters.fuel ||
    filters.bodyType ||
    filters.minPrice !== '' ||
    filters.maxPrice !== '' ||
    filters.minYear !== '' ||
    filters.maxYear !== '' ||
    filters.minKm !== '' ||
    filters.maxKm !== '' ||
    filters.sortBy !== 'recent'
  );

  const brandOptions = [
    { value: '', label: 'Todas as Marcas' },
    ...brands.map(b => ({ value: b, label: b }))
  ];

  const versionOptions = [
    { value: '', label: 'Todas as Versões' },
    ...versions.map(v => ({ value: v, label: v }))
  ];

  const bodyOptions = [
    { value: '', label: 'Todas as Carrocerias' },
    { value: 'SUV', label: 'SUV / Crossover' },
    { value: 'Sedan', label: 'Sedan' },
    { value: 'Hatch', label: 'Hatch' },
    { value: 'Pickup', label: 'Pickup / Caminhonete' },
    { value: 'Utilitário', label: 'Utilitário / Furgão' },
    { value: 'Esportivo', label: 'Esportivo / Coupé' },
  ];

  const transmissionOptions = [
    { value: '', label: 'Todos os Câmbios' },
    { value: 'Manual', label: 'Manual' },
    { value: 'Automático', label: 'Automático' },
    { value: 'Automatizado', label: 'Automatizado' },
    { value: 'CVT', label: 'CVT' },
  ];

  const fuelOptions = [
    { value: '', label: 'Todos os Combustíveis' },
    { value: 'Flex', label: 'Flex' },
    { value: 'Gasolina', label: 'Gasolina' },
    { value: 'Diesel', label: 'Diesel' },
    { value: 'Híbrido', label: 'Híbrido' },
    { value: 'Elétrico', label: 'Elétrico' },
  ];

  const colorOptions = [
    { value: '', label: 'Todas as Cores' },
    ...colors.map(c => ({ value: c, label: c }))
  ];

  const sortOptions = [
    { value: 'recent', label: 'Mais Recentes' },
    { value: 'price-asc', label: 'Menor Preço' },
    { value: 'price-desc', label: 'Maior Preço' },
    { value: 'year-desc', label: 'Ano mais Novo' },
    { value: 'km-asc', label: 'Menor Quilometragem' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 mb-8">
      
      {/* Linha Superior: Busca Rápida + Contador + Limpar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
        
        {/* Input de Busca Livre */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            placeholder="Buscar modelo ou versão (ex: Corolla, Civic, Jeep)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all"
          />
        </div>

        {/* Contador de Veículos & Limpar Filtros */}
        <div className="flex items-center gap-3 text-sm font-semibold text-slate-600 w-full md:w-auto justify-between md:justify-end">
          <span>Exibindo <strong>{filteredCars.length}</strong> de <strong>{cars.length}</strong> veículos</span>
          
          {hasActiveFilters && (
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

      {/* Grade de Filtros de Seleção Única Estilizados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6">
        
        {/* Marca */}
        <CustomSelect
          label="Marca"
          value={filters.brand}
          onChange={(val) => setFilters(prev => ({ ...prev, brand: val }))}
          options={brandOptions}
          placeholder="Todas as Marcas"
        />

        {/* Versão Completa */}
        <CustomSelect
          label="Versão Completa"
          value={filters.version}
          onChange={(val) => setFilters(prev => ({ ...prev, version: val }))}
          options={versionOptions}
          placeholder="Todas as Versões"
        />

        {/* Carroceria */}
        <CustomSelect
          label="Carroceria"
          value={filters.bodyType || ''}
          onChange={(val) => setFilters(prev => ({ ...prev, bodyType: val }))}
          options={bodyOptions}
          placeholder="Todas as Carrocerias"
        />

        {/* Câmbio */}
        <CustomSelect
          label="Câmbio"
          value={filters.transmission}
          onChange={(val) => setFilters(prev => ({ ...prev, transmission: val }))}
          options={transmissionOptions}
          placeholder="Todos os Câmbios"
        />

        {/* Combustível */}
        <CustomSelect
          label="Combustível"
          value={filters.fuel}
          onChange={(val) => setFilters(prev => ({ ...prev, fuel: val }))}
          options={fuelOptions}
          placeholder="Todos os Combustíveis"
        />

        {/* Cor */}
        <CustomSelect
          label="Cor"
          value={filters.color}
          onChange={(val) => setFilters(prev => ({ ...prev, color: val }))}
          options={colorOptions}
          placeholder="Todas as Cores"
        />

        {/* Ordenar Por */}
        <CustomSelect
          label="Ordenar Por"
          value={filters.sortBy}
          onChange={(val) => setFilters(prev => ({ ...prev, sortBy: val as any }))}
          options={sortOptions}
        />

      </div>

      {/* Filtros de Faixas (De / Até) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-100 mt-6">
        
        {/* Preço (De / Até) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Preço (R$)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value === '' ? '' : Number(e.target.value) }))}
              placeholder="De"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-red-600 focus:bg-white focus:outline-none"
            />
            <span className="text-slate-400 font-bold text-xs">até</span>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value === '' ? '' : Number(e.target.value) }))}
              placeholder="Até"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-red-600 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Ano (De / Até) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Ano
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={filters.minYear}
              onChange={(e) => setFilters(prev => ({ ...prev, minYear: e.target.value === '' ? '' : Number(e.target.value) }))}
              placeholder="De (ex: 2018)"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-red-600 focus:bg-white focus:outline-none"
            />
            <span className="text-slate-400 font-bold text-xs">até</span>
            <input
              type="number"
              value={filters.maxYear}
              onChange={(e) => setFilters(prev => ({ ...prev, maxYear: e.target.value === '' ? '' : Number(e.target.value) }))}
              placeholder="Até (ex: 2024)"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-red-600 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Quilometragem (De / Até) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Quilometragem (KM)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={filters.minKm}
              onChange={(e) => setFilters(prev => ({ ...prev, minKm: e.target.value === '' ? '' : Number(e.target.value) }))}
              placeholder="De"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-red-600 focus:bg-white focus:outline-none"
            />
            <span className="text-slate-400 font-bold text-xs">até</span>
            <input
              type="number"
              value={filters.maxKm}
              onChange={(e) => setFilters(prev => ({ ...prev, maxKm: e.target.value === '' ? '' : Number(e.target.value) }))}
              placeholder="Até"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
          </div>
        </div>

      </div>

    </div>
  );
};
