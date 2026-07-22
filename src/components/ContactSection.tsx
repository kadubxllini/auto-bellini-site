import React from 'react';
import { MapPin, Phone, Clock, ExternalLink, Headset } from 'lucide-react';
import { DEFAULT_SHOPCAR_URL } from '../services/carService';
import { AutoBelliniText } from './AutoBelliniText';
import { WhatsAppIcon } from './WhatsAppIcon';

export const GOOGLE_MAPS_STORE_URL = 'https://maps.app.goo.gl/u8bd8ZcxxypwP6kc7';

export const ContactSection: React.FC = () => {
  return (
    <section id="contato" className="py-24 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 grid grid-cols-1 lg:grid-cols-2">
          
          {/* Info Side */}
          <div className="p-8 sm:p-12 space-y-8 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4">
                <Headset className="w-4 h-4" />
                <span>Atendimento Directo</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Fale com a Equipe <AutoBelliniText />
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Venha conhecer o nosso pátio na Av. Bandeirantes ou fale diretamente com nossos consultores.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-6">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-100 text-red-600 rounded-xl flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">Loja Auto Bellini Veículos</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Avenida Bandeirantes, 2052 - Vila Bandeirante<br />
                    Campo Grande - MS | CEP 79006-000
                  </p>
                  <a
                    href={GOOGLE_MAPS_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:underline mt-1"
                  >
                    <span>Ver localização no Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Telefone Fixo e WhatsApps */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">Telefone Fixo da Loja</h4>
                    <a 
                      href="tel:06733310800" 
                      className="text-xs font-bold text-slate-700 hover:text-blue-600 hover:underline"
                    >
                      (67) 3331-0800
                    </a>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">Atendimento WhatsApp</h4>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                      <a 
                        href="https://wa.me/5567984042345?text=Ol%C3%A1%20Eduardo!%20Vim%20pelo%20site%20da%20Auto%20Bellini"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                        <span>Eduardo: (67) 98404-2345</span>
                      </a>

                      <a 
                        href="https://wa.me/5567984066870?text=Ol%C3%A1%20F%C3%A1bio!%20Vim%20pelo%20site%20da%20Auto%20Bellini"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                        <span>Fábio: (67) 98406-6870</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 mb-1">Horário de Funcionamento</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Segunda a Sexta: 07:30h às 18:00h<br />
                    Sábado: 08:00h às 13:00h<br />
                    Domingo: Fechado
                  </p>
                </div>
              </div>

              {/* Shopcar */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 text-amber-700 rounded-xl flex-shrink-0">
                  <ExternalLink className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">Estoque no Shopcar MS</h4>
                  <a
                    href={DEFAULT_SHOPCAR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:underline mt-0.5"
                  >
                    <span>Acessar Anúncios no Shopcar</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Map Side */}
          <div className="bg-slate-950 flex flex-col">
            <a
              href={GOOGLE_MAPS_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-slate-900 border-b border-slate-800 text-white flex items-center justify-between hover:bg-slate-800 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <h3 className="font-bold text-sm">Loja Auto Bellini Veículos no Google Maps</h3>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            </a>
            
            <div className="w-full h-full min-h-[420px]">
              <iframe
                title="Mapa Auto Bellini Veiculos Campo Grande MS"
                src="https://maps.google.com/maps?q=Auto+Bellini+Veiculos,+Av.+Bandeirantes,+2052+-+Vila+Bandeirante,+Campo+Grande+-+MS&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
