import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useCars } from '../context/CarContext';
import { AdminHeaderBar } from './admin/AdminHeaderBar';

export const Header: React.FC = () => {
  const { setSelectedCar } = useCars();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [whatsappDropdownOpen, setWhatsappDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setSelectedCar(null);
    setMobileMenuOpen(false);
    if (section === 'home') {
      if (window.location.pathname !== '/' && window.location.pathname !== '') {
        window.history.pushState(null, '', '/');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setWhatsappDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-2xl text-white">
      {/* Linha Superior da Header (Centralizada) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-center gap-6 sm:gap-8 lg:gap-10">
        
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center group py-1 flex-shrink-0"
        >
          <img 
            src="/logo.png" 
            alt="Auto Bellini Logo" 
            className="h-14 sm:h-16 md:h-18 w-auto object-contain drop-shadow-[0_4px_14px_rgba(220,38,38,0.4)] group-hover:scale-105 transition-transform duration-300"
          />
        </a>

        {/* Menu de Navegação Centralizado */}
        <nav className="hidden lg:flex items-center space-x-6 lg:space-x-8 font-heading font-black text-sm lg:text-base tracking-wider uppercase">
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className={`transition-colors duration-200 py-2 relative hover:text-red-500 ${
              activeSection === 'home' ? 'text-red-500 after:w-full' : 'text-slate-100'
            } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all hover:after:w-full`}
          >
            PÁGINA INICIAL
          </a>

          <a 
            href="#sobre" 
            onClick={() => handleNavClick('sobre')}
            className={`transition-colors duration-200 py-2 relative hover:text-red-500 ${
              activeSection === 'sobre' ? 'text-red-500 after:w-full' : 'text-slate-100'
            } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all hover:after:w-full`}
          >
            A LOJA
          </a>

          <a 
            href="#estoque" 
            onClick={() => handleNavClick('estoque')}
            className={`transition-colors duration-200 py-2 relative hover:text-red-500 ${
              activeSection === 'estoque' ? 'text-red-500 after:w-full' : 'text-slate-100'
            } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all hover:after:w-full`}
          >
            NOSSO ESTOQUE
          </a>

          <a 
            href="#missao" 
            onClick={() => handleNavClick('missao')}
            className={`transition-colors duration-200 py-2 relative hover:text-red-500 ${
              activeSection === 'missao' ? 'text-red-500 after:w-full' : 'text-slate-100'
            } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all hover:after:w-full`}
          >
            MISSÃO & VALORES
          </a>

          <a 
            href="#contato" 
            onClick={() => handleNavClick('contato')}
            className={`transition-colors duration-200 py-2 relative hover:text-red-500 ${
              activeSection === 'contato' ? 'text-red-500 after:w-full' : 'text-slate-100'
            } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all hover:after:w-full`}
          >
            CONTATO
          </a>
        </nav>

        {/* Botões de Redes Sociais */}
        <div className="hidden sm:flex items-center space-x-3 flex-shrink-0">
          
          {/* Facebook */}
          <a
            href="https://www.facebook.com/autobellini.veiculos/"
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook Oficial"
            className="p-2.5 bg-slate-900 hover:bg-blue-600 text-blue-500 hover:text-white rounded-xl border border-slate-800 transition-all transform hover:scale-110 shadow-md"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/autobelliniveiculos"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram Oficial"
            className="p-2.5 bg-slate-900 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 text-pink-500 hover:text-white rounded-xl border border-slate-800 transition-all transform hover:scale-110 shadow-md"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>

          {/* WhatsApp Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setWhatsappDropdownOpen(!whatsappDropdownOpen)}
              onMouseEnter={() => setWhatsappDropdownOpen(true)}
              title="Atendimento no WhatsApp"
              className="p-2.5 bg-slate-900 hover:bg-emerald-600 text-emerald-500 hover:text-white rounded-xl border border-slate-800 transition-all transform hover:scale-105 shadow-md flex items-center gap-1"
            >
              <WhatsAppIcon className="w-5 h-5 fill-current" />
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {whatsappDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-60 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-slide-in text-xs font-semibold"
                onMouseLeave={() => setWhatsappDropdownOpen(false)}
              >
                <div className="px-3 py-2 border-b border-slate-800 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                  Escolha um WhatsApp:
                </div>

                <a
                  href="https://wa.me/5567984042345?text=Ol%C3%A1%20Eduardo!%20Vim%20pelo%20site%20da%20Auto%20Bellini"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setWhatsappDropdownOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 hover:bg-emerald-600/20 text-emerald-400 hover:text-emerald-300 rounded-xl transition-colors mt-1"
                >
                  <div className="flex items-center gap-2">
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    <span>Eduardo</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-300">(67) 98404-2345</span>
                </a>

                <a
                  href="https://wa.me/5567984066870?text=Ol%C3%A1%20F%C3%A1bio!%20Vim%20pelo%20site%20da%20Auto%20Bellini"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setWhatsappDropdownOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 hover:bg-emerald-600/20 text-emerald-400 hover:text-emerald-300 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    <span>Fábio</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-300">(67) 98406-6870</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white absolute right-4"
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-t border-slate-800 px-6 pt-4 pb-6 space-y-4 font-heading font-black tracking-wider uppercase text-sm">
          <a href="#home" onClick={() => handleNavClick('home')} className="block py-2 text-red-500 hover:text-red-400">PÁGINA INICIAL</a>
          <a href="#sobre" onClick={() => handleNavClick('sobre')} className="block py-2 text-slate-200 hover:text-red-500">A LOJA</a>
          <a href="#estoque" onClick={() => handleNavClick('estoque')} className="block py-2 text-slate-200 hover:text-red-500">NOSSO ESTOQUE</a>
          <a href="#missao" onClick={() => handleNavClick('missao')} className="block py-2 text-slate-200 hover:text-red-500">MISSÃO & VALORES</a>
          <a href="#contato" onClick={() => handleNavClick('contato')} className="block py-2 text-slate-200 hover:text-red-500">CONTATO</a>
          
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <span className="block text-[11px] text-slate-400 font-bold uppercase">WhatsApp dos Consultores:</span>
            <a
              href="https://wa.me/5567984042345?text=Ol%C3%A1%20Eduardo!%20Vim%20pelo%20site%20da%20Auto%20Bellini"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-emerald-600/20 text-emerald-400 rounded-xl text-xs"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>Eduardo: (67) 98404-2345</span>
            </a>
            <a
              href="https://wa.me/5567984066870?text=Ol%C3%A1%20F%C3%A1bio!%20Vim%20pelo%20site%20da%20Auto%20Bellini"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-emerald-600/20 text-emerald-400 rounded-xl text-xs"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>Fábio: (67) 98406-6870</span>
            </a>
          </div>
        </div>
      )}

      {/* Header do Administrador Grudada Logo Abaixo quando Ativa */}
      <AdminHeaderBar />
    </header>
  );
};
