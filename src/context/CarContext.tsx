import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Car, FilterState } from '../types/car';
import { carService } from '../services/carService';
import { authService } from '../services/authService';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface CarContextType {
  cars: Car[];
  filteredCars: Car[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  brands: string[];
  
  // Selected Car Modal
  selectedCar: Car | null;
  setSelectedCar: (car: Car | null) => void;

  // Financing Modal
  financingCar: Car | null;
  setFinancingCar: (car: Car | null) => void;

  // Admin Mode
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (val: boolean) => void;
  isCarModalOpen: boolean;
  setIsCarModalOpen: (val: boolean) => void;
  editingCar: Car | null;
  setEditingCar: (car: Car | null) => void;

  // CRUD Actions
  addCar: (car: Omit<Car, 'id' | 'createdAt'>) => void;
  updateCar: (id: string, car: Partial<Car>) => void;
  deleteCar: (id: string) => void;

  // Toast
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const defaultFilterState: FilterState = {
  searchQuery: '',
  brand: '',
  transmission: '',
  fuel: '',
  minPrice: 0,
  maxPrice: 0,
  sortBy: 'recent'
};

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filters, setFilters] = useState<FilterState>(defaultFilterState);
  
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [financingCar, setFinancingCar] = useState<Car | null>(null);
  
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isCarModalOpen, setIsCarModalOpen] = useState<boolean>(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  useEffect(() => {
    const loaded = carService.getCars();
    setCars(loaded);
    setIsAdmin(authService.isAuthenticated());

    const checkAdminRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/admin' || path === '/admin/' || hash === '#admin' || hash === '#/admin') {
        if (!authService.isAuthenticated()) {
          setIsLoginModalOpen(true);
        }
      }
    };

    checkAdminRoute();
    window.addEventListener('popstate', checkAdminRoute);
    window.addEventListener('hashchange', checkAdminRoute);

    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('hashchange', checkAdminRoute);
    };
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const addCar = (carData: Omit<Car, 'id' | 'createdAt'>) => {
    const newCar = carService.addCar(carData);
    setCars(carService.getCars());
    showToast(`Veículo "${newCar.brand} ${newCar.model}" cadastrado com sucesso!`, 'success');
  };

  const updateCar = (id: string, carData: Partial<Car>) => {
    const updated = carService.updateCar(id, carData);
    if (updated) {
      setCars(carService.getCars());
      showToast(`Veículo atualizado com sucesso!`, 'success');
    }
  };

  const deleteCar = (id: string) => {
    const deleted = carService.deleteCar(id);
    if (deleted) {
      setCars(carService.getCars());
      showToast(`Anúncio removido do estoque!`, 'info');
    }
  };

  const resetFilters = () => {
    setFilters(defaultFilterState);
  };

  const filteredCars = carService.filterCars(cars, filters);
  const brands = carService.getUniqueBrands(cars);

  return (
    <CarContext.Provider value={{
      cars,
      filteredCars,
      filters,
      setFilters,
      resetFilters,
      brands,
      selectedCar,
      setSelectedCar,
      financingCar,
      setFinancingCar,
      isAdmin,
      setIsAdmin,
      isLoginModalOpen,
      setIsLoginModalOpen,
      isCarModalOpen,
      setIsCarModalOpen,
      editingCar,
      setEditingCar,
      addCar,
      updateCar,
      deleteCar,
      toasts,
      showToast
    }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCars = () => {
  const context = useContext(CarContext);
  if (!context) throw new Error('useCars deve ser usado dentro de um CarProvider');
  return context;
};
