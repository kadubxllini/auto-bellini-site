import type { Car, FilterState } from '../types/car';
import { SEED_CARS } from '../data/seedCars';

const STORAGE_KEY = 'auto_bellini_cars_v4';

export const DEFAULT_SHOPCAR_URL = 'https://www.shopcar.com.br/loja.php?loja=3201';

export const carService = {
  getCars(): Car[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Erro ao ler carros do localStorage:', e);
    }
    
    // Se não houver dados, inicializa com SEED_CARS e salva
    this.saveCars(SEED_CARS);
    return SEED_CARS;
  },

  saveCars(cars: Car[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
    } catch (e) {
      console.error('Erro ao salvar carros no localStorage:', e);
    }
  },

  addCar(carData: Omit<Car, 'id' | 'createdAt'>): Car {
    const cars = this.getCars();
    const newCar: Car = {
      ...carData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    const updated = [newCar, ...cars];
    this.saveCars(updated);
    return newCar;
  },

  updateCar(id: string, carData: Partial<Car>): Car | null {
    const cars = this.getCars();
    const index = cars.findIndex(c => c.id === id);
    if (index === -1) return null;

    const updatedCar = { ...cars[index], ...carData };
    cars[index] = updatedCar;
    this.saveCars(cars);
    return updatedCar;
  },

  deleteCar(id: string): boolean {
    const cars = this.getCars();
    const filtered = cars.filter(c => c.id !== id);
    if (filtered.length === cars.length) return false;
    this.saveCars(filtered);
    return true;
  },

  reorderCars(newCars: Car[]): void {
    this.saveCars(newCars);
  },

  // Obter Marcas Únicas (Agrupadas e Ordenadas)
  getUniqueBrands(cars: Car[]): string[] {
    const map = new Map<string, string>();
    cars.forEach(c => {
      if (c.brand && c.brand.trim()) {
        const key = c.brand.trim().toLowerCase();
        if (!map.has(key)) {
          map.set(key, c.brand.trim());
        }
      }
    });
    return Array.from(map.values()).sort((a, b) => a.localeCompare(b, 'pt-BR'));
  },

  // Obter Versões Únicas (Agrupadas e Ordenadas)
  getUniqueVersions(cars: Car[]): string[] {
    const map = new Map<string, string>();
    cars.forEach(c => {
      const v = (c.version || c.model || '').trim();
      if (v) {
        const key = v.toLowerCase();
        if (!map.has(key)) {
          map.set(key, v);
        }
      }
    });
    return Array.from(map.values()).sort((a, b) => a.localeCompare(b, 'pt-BR'));
  },

  // Obter Cores Únicas (Agrupadas e Ordenadas)
  getUniqueColors(cars: Car[]): string[] {
    const map = new Map<string, string>();
    cars.forEach(c => {
      if (c.color && c.color.trim()) {
        const key = c.color.trim().toLowerCase();
        if (!map.has(key)) {
          map.set(key, c.color.trim());
        }
      }
    });
    return Array.from(map.values()).sort((a, b) => a.localeCompare(b, 'pt-BR'));
  },

  // Filtrar e Ordenar
  filterCars(cars: Car[], filters: FilterState): Car[] {
    return cars.filter(car => {
      // Busca por texto livre
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchText = `${car.brand} ${car.model} ${car.version} ${car.color} ${car.yearModel}`.toLowerCase();
        if (!matchText.includes(query)) return false;
      }

      // Marca (agrupada)
      if (filters.brand && car.brand.toLowerCase() !== filters.brand.toLowerCase()) {
        return false;
      }

      // Versão Completa (agrupada)
      if (filters.version && car.version.toLowerCase() !== filters.version.toLowerCase()) {
        return false;
      }

      // Cor (agrupada)
      if (filters.color && car.color.toLowerCase() !== filters.color.toLowerCase()) {
        return false;
      }

      // Câmbio
      if (filters.transmission && car.transmission.toLowerCase() !== filters.transmission.toLowerCase()) {
        return false;
      }

      // Combustível
      if (filters.fuel && car.fuel.toLowerCase() !== filters.fuel.toLowerCase()) {
        return false;
      }

      // Carroceria / Categoria
      if (filters.bodyType) {
        if (car.bodyType && car.bodyType.toLowerCase() === filters.bodyType.toLowerCase()) {
          // match exato da carroceria cadastrada
        } else {
          const fullText = `${car.brand} ${car.model} ${car.version}`.toLowerCase();
          const target = filters.bodyType.toLowerCase();
          if (target === 'suv' && !/suv|compass|creta|hr-v|t-cross|tracker|renegade|kicks|duster|tiguan|sw4|tucson/i.test(fullText)) return false;
          if (target === 'sedan' && !/sedan|corolla|civic|onix plus|virtus|city|sentra|jetta|cruze|cronos|hb20s/i.test(fullText)) return false;
          if (target === 'hatch' && !/hatch|onix|hb20|polo|gol|argo|fit|yaris|sandero|mobi|kwid|fox/i.test(fullText)) return false;
          if (target === 'pickup' && !/pickup|picape|caminhonete|hilux|s10|ranger|toro|strada|amarok|saveiro/i.test(fullText)) return false;
          if (target === 'utilitário' && !/utilit|furg|van|kombi|master|ducato|hr|fiorino/i.test(fullText)) return false;
          if (target === 'esportivo' && !/esport|coup|mustang|camaro|tt|porsche|bmw m|audi s/i.test(fullText)) return false;
        }
      }

      // Preço De / Até
      if (filters.minPrice !== '' && Number(filters.minPrice) > 0 && car.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice !== '' && Number(filters.maxPrice) > 0 && car.price > Number(filters.maxPrice)) return false;

      // Ano De / Até (extrai ano numérico de "2021/2022" ou "2021")
      const yearNum = parseInt(String(car.yearModel).split('/')[0]) || parseInt(String(car.yearModel)) || 0;
      if (filters.minYear !== '' && Number(filters.minYear) > 0 && yearNum < Number(filters.minYear)) return false;
      if (filters.maxYear !== '' && Number(filters.maxYear) > 0 && yearNum > Number(filters.maxYear)) return false;

      // Quilometragem De / Até
      const kmNum = car.mileage ?? 0;
      if (filters.minKm !== '' && Number(filters.minKm) >= 0 && kmNum < Number(filters.minKm)) return false;
      if (filters.maxKm !== '' && Number(filters.maxKm) > 0 && kmNum > Number(filters.maxKm)) return false;

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'year-desc': {
          const yA = parseInt(String(a.yearModel).split('/')[0]) || 0;
          const yB = parseInt(String(b.yearModel).split('/')[0]) || 0;
          return yB - yA;
        }
        case 'km-asc':
          return (a.mileage ?? 0) - (b.mileage ?? 0);
        case 'recent':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }
};
