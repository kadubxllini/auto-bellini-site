import React from 'react';
import { ExternalLink, Phone } from 'lucide-react';
import { DEFAULT_SHOPCAR_URL } from '../services/carService';
import { AutoBelliniText } from './AutoBelliniText';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white border-t-4 border-red-600 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-slate-800">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img
                src="/logo.png"
                alt="Auto Bellini Veículos Logo"
                className="h-20 sm:h-24 w-auto object-contain bg-white p-3 rounded-2xl shadow-lg border border-slate-200"
              />
              <div>
                <div className="font-brand font-black text-2xl tracking-tight leading-none">
                  <span className="text-[#b10924] uppercase">AUTO</span>
                  <span className="text-[#042165] uppercase ml-1">BELLINI</span>
                </div>
                <span className="font-brand text-[10px] tracking-[3px] text-slate-400 font-bold uppercase mt-1 block">
                  VEÍCULOS
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm pt-2">
              <AutoBelliniText /> Veículos - Loja de carros seminovos e usados com garantia de procedência em Campo Grande - MS (Av. Bandeirantes, 2052).
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider mb-3">Navegação Rápida</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li><a href="#home" className="hover:text-red-500 transition-colors">PÁGINA INICIAL</a></li>
              <li><a href="#sobre" className="hover:text-red-500 transition-colors">A LOJA</a></li>
              <li><a href="#estoque" className="hover:text-red-500 transition-colors">NOSSO ESTOQUE</a></li>
              <li><a href="#missao" className="hover:text-red-500 transition-colors">MISSÃO & VALORES</a></li>
              <li><a href="#contato" className="hover:text-red-500 transition-colors">CONTATO</a></li>
            </ul>
          </div>

          {/* Central de Atendimento (Telefones) */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider mb-1">Central de Atendimento</h4>
            <div className="space-y-2 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500" />
                <span>Fixo: <a href="tel:06733310800" className="font-bold text-white hover:underline">(67) 3331-0800</a></span>
              </div>
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4 fill-emerald-500" />
                <span>Eduardo: <a href="https://wa.me/5567984042345" target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-400 hover:underline">(67) 98404-2345</a></span>
              </div>
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4 fill-emerald-500" />
                <span>Fábio: <a href="https://wa.me/5567984066870" target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-400 hover:underline">(67) 98406-6870</a></span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={DEFAULT_SHOPCAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-500/50 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition-all"
              >
                <span>Ver Estoque no Shopcar MS</span>
                <ExternalLink className="w-3.5 h-3.5 text-red-400" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 text-center text-xs text-slate-500">
          <p>&copy; 2026 Auto Bellini Veículos. Todos os direitos reservados. | Av. Bandeirantes, 2052 - Campo Grande - MS</p>
        </div>

      </div>
    </footer>
  );
};

