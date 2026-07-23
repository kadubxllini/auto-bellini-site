export type TransmissionType = 'Automático' | 'Manual' | 'Automatizado' | 'CVT';
export type FuelType = 'Flex' | 'Gasolina' | 'Diesel' | 'Híbrido' | 'Elétrico';
export type CarStatus = 'Disponível' | 'Vendido' | 'Reservado';

export interface Car {
  id: string;
  brand: string;
  model: string;
  version: string;
  yearModel: string;
  mileage?: number;
  price: number;
  fuel: FuelType;
  transmission: TransmissionType;
  bodyType?: string;
  color: string;
  plateEnd: string;
  photos: string[];
  shopcarUrl?: string;
  features: string[];
  description?: string;
  featured: boolean;
  status: CarStatus;
  createdAt: string;
}

export interface FilterState {
  searchQuery: string;
  brand: string;
  version: string;
  color: string;
  transmission: string;
  fuel: string;
  bodyType: string;
  minPrice: number | '';
  maxPrice: number | '';
  minYear: number | '';
  maxYear: number | '';
  minKm: number | '';
  maxKm: number | '';
  sortBy: 'price-asc' | 'price-desc' | 'year-desc' | 'km-asc' | 'recent';
}
