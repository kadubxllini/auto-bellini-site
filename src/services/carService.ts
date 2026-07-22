import type { Car, FilterState } from '../types/car';
import { SEED_CARS } from '../data/seedCars';

const STORAGE_KEY = 'auto_bellini_cars_prod_v1';
export const DEFAULT_SHOPCAR_URL = 'https://www.shopcar.com.br/loja.php?loja=788';

export const carService = {
  // Obter todos os carros
  getCars(): Car[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      this.saveCars(SEED_CARS);
      return SEED_CARS;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Erro ao ler localStorage:', e);
      return SEED_CARS;
    }
  },

  // Salvar lista
  saveCars(cars: Car[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
  },

  // Adicionar carro
  addCar(carData: Omit<Car, 'id' | 'createdAt'>): Car {
    const cars = this.getCars();
    const newCar: Car = {
      ...carData,
      id: `car-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newCar, ...cars];
    this.saveCars(updated);
    return newCar;
  },

  // Editar carro
  updateCar(id: string, updatedData: Partial<Car>): Car | null {
    const cars = this.getCars();
    const index = cars.findIndex(c => c.id === id);
    if (index === -1) return null;

    cars[index] = { ...cars[index], ...updatedData };
    this.saveCars(cars);
    return cars[index];
  },

  // Deletar carro
  deleteCar(id: string): boolean {
    const cars = this.getCars();
    const filtered = cars.filter(c => c.id !== id);
    if (filtered.length === cars.length) return false;
    this.saveCars(filtered);
    return true;
  },

  // Filtrar e Ordenar
  filterCars(cars: Car[], filters: FilterState): Car[] {
    return cars.filter(car => {
      // Busca por texto (marca, modelo, versão)
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchText = `${car.brand} ${car.model} ${car.version}`.toLowerCase();
        if (!matchText.includes(query)) return false;
      }

      // Marca
      if (filters.brand && car.brand.toLowerCase() !== filters.brand.toLowerCase()) {
        return false;
      }

      // Câmbio
      if (filters.transmission && car.transmission !== filters.transmission) {
        return false;
      }

      // Combustível
      if (filters.fuel && car.fuel !== filters.fuel) {
        return false;
      }

      // Preço
      if (filters.minPrice > 0 && car.price < filters.minPrice) return false;
      if (filters.maxPrice > 0 && car.price > filters.maxPrice) return false;

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'year-desc':
          return b.yearModel.localeCompare(a.yearModel);
        case 'km-asc':
          return a.mileage - b.mileage;
        case 'recent':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  },

  // Obter marcas únicas para o filtro
  getUniqueBrands(cars: Car[]): string[] {
    const brands = new Set(cars.map(c => c.brand));
    return Array.from(brands).sort();
  }
};
