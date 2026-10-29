import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Instagram, Phone, Share2, Check, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';
import { telemetry } from '../lib/observability';
import { generateDirectWhatsAppUrl } from '../lib/whatsapp';

interface QuickActionsProps {
  onScrollToBooking: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onScrollToBooking }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    telemetry.trackEvent('share_clicked', 'interaction');
    const shareData = {
      title: 'Garagem Grau Car 096 | Estética Automotiva',
      text: 'Agende seu serviço na Garagem Grau Car 096 em Macapá - AP! Lavagem, polimento e vitrificação.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled or unsupported
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAgendarClick = () => {
    telemetry.trackEvent('quick_agendar_click', 'conversion');
    onScrollToBooking();
  };

  const handleComoChegarClick = () => {
    telemetry.trackEvent('como_chegar_click', 'navigation', { destination: BUSINESS_INFO.address });
    window.open(BUSINESS_INFO.mapsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleInstagramClick = () => {
    telemetry.trackEvent('instagram_profile_click', 'navigation', { handle: BUSINESS_INFO.instagram });
    window.open(BUSINESS_INFO.instagramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="px-4 py-2 max-w-xl mx-auto w-full">
      <div className="space-y-3">
        {/* Primary Booking Action Button with Red Glow and Pulse */}
        <motion.button
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          onClick={handleAgendarClick}
          className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-red-600 to-red-700 text-white p-4 font-semibold shadow-xl shadow-red-900/40 glow-red border border-red-500/40 flex items-center justify-between transition-all"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-black/25 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="text-base font-bold tracking-tight flex items-center gap-1.5 font-display">
                <span>Agendar Serviço no Grau</span>
                <span className="text-xs bg-black/40 text-red-200 px-2 py-0.5 rounded-full font-normal">
                  WhatsApp
                </span>
              </div>
              <div className="text-xs text-red-100 font-normal">
                Simule valores e envie direto para nossa equipe
              </div>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform shrink-0" />
        </motion.button>

        {/* 2-Column Secondary Action Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Como Chegar (Google Maps) */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleComoChegarClick}
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900/85 hover:bg-zinc-850 border border-zinc-800 hover:border-red-500/30 text-left transition-all shadow-md group"
          >
            <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800/40 flex items-center justify-center shrink-0 text-red-400 group-hover:text-red-300">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="block text-xs text-zinc-400 uppercase tracking-wider font-medium">Local</span>
              <span className="block text-sm font-semibold text-zinc-100 truncate group-hover:text-white">
                Como Chegar
              </span>
            </div>
          </motion.button>

          {/* Ver Nossos Trabalhos (Instagram) */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleInstagramClick}
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900/85 hover:bg-zinc-850 border border-zinc-800 hover:border-red-500/30 text-left transition-all shadow-md group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-950/70 to-pink-950/70 border border-pink-800/40 flex items-center justify-center shrink-0 text-pink-400 group-hover:text-pink-300">
              <Instagram className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="block text-xs text-zinc-400 uppercase tracking-wider font-medium">Portfólio</span>
              <span className="block text-sm font-semibold text-zinc-100 truncate group-hover:text-white">
                @graucar096
              </span>
            </div>
          </motion.button>
        </div>

        {/* Contact & Share Tertiary Row */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={generateDirectWhatsAppUrl('Olá! Gostaria de conversar com a equipe da Garagem Grau Car 096.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => telemetry.trackEvent('direct_whatsapp_chat_click', 'conversion')}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-red-500" />
            <span>Falar com Atendente</span>
          </a>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Link Copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-zinc-400" />
                <span>Compartilhar Bio</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
