import React from 'react';
import { MapPin, Phone, Instagram, Clock, Navigation, ExternalLink, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';
import { telemetry } from '../lib/observability';
import { generateDirectWhatsAppUrl } from '../lib/whatsapp';

export const LocationAndFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    telemetry.trackEvent('scroll_to_top_clicked', 'interaction');
  };

  return (
    <footer className="mt-12 border-t border-zinc-800/80 bg-zinc-950 text-zinc-400">
      {/* Location Banner Card */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="rounded-3xl bg-zinc-900/90 border border-zinc-800 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5" />
              <span>Visite Nossa Garagem</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight font-display">
              {BUSINESS_INFO.name}
            </h3>
            <p className="text-xs md:text-sm text-zinc-300">
              {BUSINESS_INFO.address}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-zinc-400">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              <span>{BUSINESS_INFO.openingHours}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => telemetry.trackEvent('footer_maps_direction_click', 'navigation')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-950/40 flex items-center justify-center gap-2 transition-all glow-red-subtle"
            >
              <Navigation className="w-4 h-4" />
              <span>Traçar Rota (Google Maps)</span>
            </a>
          </div>
        </div>

        {/* Links & Brand columns */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs border-b border-zinc-800/80 pb-8">
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black border border-red-500/40 p-1 flex items-center justify-center shrink-0">
                <img
                  src={BUSINESS_INFO.avatarImage}
                  alt="Grau Car 096"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="font-bold text-base text-white tracking-tight font-display">
                {BUSINESS_INFO.name}
              </div>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Estética automotiva especializada em revitalização, polimento técnico, vitrificação cerâmica e higienização profunda em Macapá - Amapá.
            </p>
            <p className="text-red-500 font-semibold tracking-wide">
              {BUSINESS_INFO.slogan}
            </p>
          </div>

          {/* Direct Contacts */}
          <div className="space-y-2.5">
            <div className="font-bold text-zinc-200 uppercase tracking-wider text-[11px]">
              Contatos Rápidos
            </div>
            <div className="space-y-2">
              <a
                href={generateDirectWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-red-500" />
                <span>WhatsApp: {BUSINESS_INFO.phoneDisplay}</span>
              </a>

              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4 text-red-500" />
                <span>Instagram: @{BUSINESS_INFO.instagram}</span>
              </a>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Nav & Top */}
          <div className="space-y-3">
            <div className="font-bold text-zinc-200 uppercase tracking-wider text-[11px]">
              Navegação
            </div>
            <ul className="space-y-1.5">
              <li>
                <a href="#catalogo-servicos" className="hover:text-white transition-colors">
                  Catálogo de Serviços
                </a>
              </li>
              <li>
                <a href="#agendamento" className="hover:text-white transition-colors">
                  Simulador de Agendamento
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Localização no Mapa</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
            </ul>

            <button
              onClick={scrollToTop}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5 text-red-500" />
              <span>Voltar ao Início</span>
            </button>
          </div>
        </div>

        {/* Watermark and Copyright as strictly required */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} {BUSINESS_INFO.name}. Todos os direitos reservados.
          </div>
          <div className="font-medium text-zinc-400 flex items-center gap-1">
            <span>Powered by</span>
            <span className="text-white font-semibold">Tapzoom</span>
            <span>&</span>
            <span className="text-red-500 font-semibold">Grau Car</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
