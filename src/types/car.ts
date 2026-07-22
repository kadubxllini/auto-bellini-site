export type TransmissionType = 'Automático' | 'Manual';
export type FuelType = 'Flex' | 'Gasolina' | 'Diesel' | 'Híbrido' | 'Elétrico';
export type CarStatus = 'Disponível' | 'Vendido' | 'Reservado';

export interface Car {
  id: string;
  brand: string;
  model: string;
  version: string;
  yearModel: string;
  mileage: number;
  price: number;
  fuel: FuelType;
  transmission: TransmissionType;
  color: string;
  plateEnd: string;
  photos: string[];
  shopcarUrl?: string;
  features: string[];
  featured: boolean;
  status: CarStatus;
  createdAt: string;
}

export interface FilterState {
  searchQuery: string;
  brand: string;
  transmission: string;
  fuel: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'price-asc' | 'price-desc' | 'year-desc' | 'km-asc' | 'recent';
}
