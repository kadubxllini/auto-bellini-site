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
  versions: string[];
  colors: string[];
  
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
  reorderCars: (newCars: Car[]) => void;

  // Toast
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const defaultFilterState: FilterState = {
  searchQuery: '',
  brand: '',
  version: '',
  color: '',
  transmission: '',
  fuel: '',
  bodyType: '',
  minPrice: '',
  maxPrice: '',
  minYear: '',
  maxYear: '',
  minKm: '',
  maxKm: '',
  sortBy: 'recent'
};

const CarContext = createContext<CarContextType | undefined>(undefined);

export const getCarSlug = (car: Car): string => {
  const text = (car.version || car.model || '').trim();
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const CarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filters, setFilters] = useState<FilterState>(defaultFilterState);
  const [selectedCar, setSelectedCarState] = useState<Car | null>(null);
  const [financingCar, setFinancingCar] = useState<Car | null>(null);
  
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isCarModalOpen, setIsCarModalOpen] = useState<boolean>(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const scrollPosRef = React.useRef<number>(0);

  // Sincronização de Rota da URL para cada veículo com restauração de Scroll
  const handleSelectCar = (car: Car | null) => {
    if (car) {
      if (!selectedCar) {
        scrollPosRef.current = window.scrollY;
      }
      setSelectedCarState(car);
      const slug = getCarSlug(car);
      const targetUrl = `/${slug}/${car.id}`;
      if (window.location.pathname !== targetUrl) {
        window.history.pushState({ carId: car.id }, '', targetUrl);
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      setSelectedCarState(null);
      if (window.location.pathname !== '/' && window.location.pathname !== '') {
        window.history.pushState(null, '', '/');
      }
      const savedPos = scrollPosRef.current;
      setTimeout(() => {
        window.scrollTo({ top: savedPos, behavior: 'instant' });
      }, 20);
    }
  };

  useEffect(() => {
    const loaded = carService.getCars();
    setCars(loaded);
    setIsAdmin(authService.isAuthenticated());

    const checkRouteAndHash = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      // Rota ADM
      if (path === '/admin' || path === '/admin/' || hash === '#admin' || hash === '#/admin') {
        window.scrollTo({ top: 0, behavior: 'instant' });
        if (!authService.isAuthenticated()) {
          setIsLoginModalOpen(true);
        }
      }

      // Rota de Veículo Específico (ex: /nivus-comfortline-1-0-12v-tsi/1623368)
      const targetString = (path !== '/' && path !== '') ? path : hash;
      if (targetString && targetString !== '#' && targetString !== '/') {
        const parts = targetString.replace('#', '').split('/').filter(Boolean);
        const possibleId = parts[parts.length - 1]; // O ID é a última parte da URL

        if (possibleId) {
          const matchedCar = loaded.find(c => {
            const slug = getCarSlug(c);
            return (
              c.id === possibleId || 
              targetString.endsWith(`/${c.id}`) ||
              targetString.includes(`/${slug}/${c.id}`)
            );
          });

          if (matchedCar) {
            setSelectedCarState(prev => {
              if (!prev) {
                scrollPosRef.current = window.scrollY;
              }
              return matchedCar;
            });
          } else {
            setSelectedCarState(null);
          }
        } else {
          setSelectedCarState(null);
        }
      } else {
        setSelectedCarState(prev => {
          if (prev) {
            const savedPos = scrollPosRef.current;
            setTimeout(() => {
              window.scrollTo({ top: savedPos, behavior: 'instant' });
            }, 20);
          }
          return null;
        });
      }
    };

    checkRouteAndHash();
    window.addEventListener('popstate', checkRouteAndHash);
    window.addEventListener('hashchange', checkRouteAndHash);

    return () => {
      window.removeEventListener('popstate', checkRouteAndHash);
      window.removeEventListener('hashchange', checkRouteAndHash);
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

  const reorderCars = (newCars: Car[]) => {
    carService.reorderCars(newCars);
    setCars(newCars);
    showToast(`Ordem dos veículos atualizada!`, 'success');
  };

  const resetFilters = () => {
    setFilters(defaultFilterState);
  };

  const filteredCars = carService.filterCars(cars, filters);
  const brands = carService.getUniqueBrands(cars);
  const versions = carService.getUniqueVersions(cars);
  const colors = carService.getUniqueColors(cars);

  return (
    <CarContext.Provider value={{
      cars,
      filteredCars,
      filters,
      setFilters,
      resetFilters,
      brands,
      versions,
      colors,
      selectedCar,
      setSelectedCar: handleSelectCar,
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
      reorderCars,
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
