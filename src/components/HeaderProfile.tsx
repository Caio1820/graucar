import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';

export const HeaderProfile: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <header className="relative pt-6 pb-4 px-4 text-center overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-64 bg-red-600/15 blur-[90px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Top micro badges */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 mb-5 shadow-inner"
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <span className="font-medium text-zinc-200">Estúdio de Estética Automotiva</span>
        <span className="text-zinc-500" aria-hidden="true">·</span>
        <span className="text-zinc-400 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-red-500" />
          Macapá - AP
        </span>
      </motion.div>

      {/* Profile Image with Red Glow */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto w-32 h-32 mb-4 group"
      >
        {/* Animated Glow Rings */}
        <div
          className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-red-600 via-red-500 to-amber-500 opacity-80 blur-md group-hover:opacity-100 transition-opacity animate-pulse duration-1000"
          aria-hidden="true"
        />
        <div className="relative w-full h-full rounded-full p-[3px] bg-gradient-to-b from-red-500 via-zinc-800 to-red-600 shadow-2xl">
          <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center relative">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-zinc-900 animate-pulse flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-red-500 animate-spin" />
              </div>
            )}
            <img
              src={BUSINESS_INFO.avatarImage}
              alt="Garagem Grau Car 096 - Logo Oficial"
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="eager"
            />
          </div>
        </div>

        {/* Verified Badge */}
        <div
          className="absolute bottom-0 right-1 bg-red-600 text-white p-1 rounded-full border-2 border-[#09090b] shadow-lg flex items-center justify-center"
          title="Verificado Grau Car 096"
        >
          <CheckCircle2 className="w-4 h-4 text-white" />
        </div>
      </motion.div>

      {/* Brand Name & Slogan */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="space-y-1.5"
      >
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white flex items-center justify-center gap-2 font-display">
          <span>{BUSINESS_INFO.name}</span>
        </h1>

        <p className="text-red-500 font-semibold text-sm md:text-base tracking-wide uppercase">
          {BUSINESS_INFO.slogan}
        </p>

        {/* Resumo dos serviços conforme solicitado */}
        <div className="pt-1 flex items-center justify-center gap-2 text-xs md:text-sm font-medium text-zinc-300">
          <span>Lavagem</span>
          <span className="text-red-500 font-bold" aria-hidden="true">•</span>
          <span>Higienização</span>
          <span className="text-red-500 font-bold" aria-hidden="true">•</span>
          <span>Brilho</span>
        </div>
      </motion.div>

      {/* Trust info row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.2 }}
        className="mt-4 pt-3 border-t border-zinc-800/80 max-w-sm mx-auto flex items-center justify-center gap-4 text-xs text-zinc-400"
      >
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-zinc-400" />
          <span>Seg a Sáb 08h-18h</span>
        </div>
        <span className="text-zinc-700" aria-hidden="true">|</span>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
          <span>Produtos Premium</span>
        </div>
      </motion.div>
    </header>
  );
};
