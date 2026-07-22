import { CarProvider } from './context/CarContext';
import { Header } from './components/Header';
import { AdminHeaderBar } from './components/admin/AdminHeaderBar';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { CarGrid } from './components/CarGrid';
import { AboutSection } from './components/AboutSection';
import { MissionSection } from './components/MissionSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CarDetailModal } from './components/CarDetailModal';
import { FinancingModal } from './components/FinancingModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminCarModal } from './components/admin/AdminCarModal';
import { Toast } from './components/Toast';

export function App() {
  return (
    <CarProvider>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <AdminHeaderBar />
        
        <main className="flex-grow">
          <Hero />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <FilterBar />
          </div>

          <CarGrid />
          <AboutSection />
          <MissionSection />
          <ContactSection />
        </main>

        <Footer />

        {/* Modals & Portal Overlays */}
        <CarDetailModal />
        <FinancingModal />
        <AdminLoginModal />
        <AdminCarModal />
        <Toast />
      </div>
    </CarProvider>
  );
}

export default App;
