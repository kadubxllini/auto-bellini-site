import React, { Component, ErrorInfo, ReactNode } from 'react';
import { CarProvider, useCars } from './context/CarContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { CarGrid } from './components/CarGrid';
import { AboutSection } from './components/AboutSection';
import { MissionSection } from './components/MissionSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CarDetailPage } from './components/CarDetailPage';
import { FinancingModal } from './components/FinancingModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminCarModal } from './components/admin/AdminCarModal';
import { Toast } from './components/Toast';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    errorMessage: ''
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error?.message || 'Falha na renderização de dados.' };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md shadow-2xl space-y-4">
            <h2 className="text-2xl font-black text-red-500">Ops! Dados inconsistentes detectados.</h2>
            <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono break-words">
              {this.state.errorMessage}
            </p>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = '/';
              }}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg"
            >
              Resetar Estoque e Voltar ao Início
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function AppContent() {
  const { selectedCar } = useCars();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-grow">
        {selectedCar ? (
          <CarDetailPage />
        ) : (
          <>
            <Hero />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <FilterBar />
            </div>

            <CarGrid />
            <AboutSection />
            <MissionSection />
            <ContactSection />
          </>
        )}
      </main>

      <Footer />

      {/* Modals & Overlays */}
      <FinancingModal />
      <AdminLoginModal />
      <AdminCarModal />
      <Toast />
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <CarProvider>
        <AppContent />
      </CarProvider>
    </ErrorBoundary>
  );
}

export default App;
