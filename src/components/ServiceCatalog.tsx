import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Clock, Sparkles, X, Plus, Info, Car, Shield } from 'lucide-react';
import { ServiceItem, VehicleSize } from '../types';
import { SERVICES_LIST, VEHICLE_SIZES } from '../data/servicesData';
import { Skeleton } from './SkeletonLoader';
import { telemetry } from '../lib/observability';

interface ServiceCatalogProps {
  selectedServiceIds: string[];
  currentVehicleSize: VehicleSize;
  onToggleService: (serviceId: string) => void;
  onSelectVehicleSize: (size: VehicleSize) => void;
  onOpenBooking: () => void;
}

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({
  selectedServiceIds,
  currentVehicleSize,
  onToggleService,
  onSelectVehicleSize,
  onOpenBooking,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'lavagem' | 'estetica' | 'protecao' | 'motor'>('all');
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const vehicleOption = VEHICLE_SIZES.find((v) => v.id === currentVehicleSize) || VEHICLE_SIZES[0];

  const filteredServices = SERVICES_LIST.filter((service) => {
    if (activeCategory === 'all') return true;
    return service.category === activeCategory;
  });

  const handleCategoryChange = (cat: typeof activeCategory) => {
    telemetry.trackEvent('category_filter_changed', 'interaction', { category: cat });
    setActiveCategory(cat);
  };

  const handleOpenDetails = (service: ServiceItem) => {
    telemetry.trackEvent('service_modal_opened', 'interaction', { serviceId: service.id, name: service.name });
    setActiveModalService(service);
  };

  const handleSelectServiceAndBook = (serviceId: string) => {
    if (!selectedServiceIds.includes(serviceId)) {
      onToggleService(serviceId);
    }
    setActiveModalService(null);
    onOpenBooking();
  };

  return (
    <section id="catalogo-servicos" className="px-4 py-8 max-w-4xl mx-auto w-full">
      {/* Section Header */}
      <div className="text-center mb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Serviços de Alto Padrão</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight font-display">
          Catálogo & Estética Automotiva
        </h2>
        <p className="text-xs md:text-sm text-zinc-400 max-w-lg mx-auto">
          Cuidado artesanal com produtos importados e técnicas avançadas de detalhamento em Macapá.
        </p>
      </div>

      {/* Interactive Vehicle Size Selector Strip */}
      <div className="mb-6 p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs text-zinc-400 font-medium flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-red-500" />
            Calcular valores para o seu veículo:
          </span>
          <span className="text-[11px] text-zinc-500 font-normal">
            {vehicleOption.examples}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
          {VEHICLE_SIZES.map((size) => {
            const isSelected = size.id === currentVehicleSize;
            return (
              <button
                key={size.id}
                onClick={() => {
                  telemetry.trackEvent('catalog_vehicle_size_selected', 'interaction', { size: size.id });
                  onSelectVehicleSize(size.id);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all text-left flex flex-col justify-between ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-md shadow-red-900/30 border border-red-500'
                    : 'bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/40'
                }`}
              >
                <span className="font-semibold">{size.label}</span>
                <span className={`text-[10px] ${isSelected ? 'text-red-100' : 'text-zinc-500'}`}>
                  {size.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Category Filter Tabs (Zero-Pill Discipline: Segmented Controls) */}
      <div className="flex items-center justify-start md:justify-center gap-1.5 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {[
          { id: 'all', label: 'Todos os Serviços' },
          { id: 'lavagem', label: 'Lavagem Técnica' },
          { id: 'estetica', label: 'Higienização & Polimento' },
          { id: 'protecao', label: 'Vitrificação 9H' },
          { id: 'motor', label: 'Cofre do Motor' },
        ].map((tab) => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleCategoryChange(tab.id as typeof activeCategory)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                isActive
                  ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
                  : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredServices.map((service, index) => {
          const isSelected = selectedServiceIds.includes(service.id);
          const calculatedPrice = Math.round(service.basePrice * vehicleOption.priceMultiplier);

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className={`relative rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? 'bg-zinc-900/90 border-red-500/80 shadow-lg shadow-red-950/40 ring-1 ring-red-500/50'
                  : 'bg-zinc-900/60 hover:bg-zinc-900/80 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {/* Image Container with Shimmer Skeleton */}
              <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
                {!loadedImages[service.id] && (
                  <Skeleton className="absolute inset-0 z-10 w-full h-full" />
                )}
                <img
                  src={service.image}
                  alt={service.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onLoad={() =>
                    setLoadedImages((prev) => ({ ...prev, [service.id]: true }))
                  }
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    loadedImages[service.id] ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                {/* Popular or Category Tag */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  {service.popular && (
                    <span className="bg-red-600/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md border border-red-500/50">
                      Mais Procurado
                    </span>
                  )}
                </div>

                {/* Duration Badge */}
                <div className="absolute top-3 right-3 bg-black/65 backdrop-blur-md text-zinc-300 text-xs px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-red-400" />
                  <span>{service.duration}</span>
                </div>

                {/* Service Title on Scrim */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-lg font-bold text-white tracking-tight drop-shadow-md font-display">
                    {service.name}
                  </h3>
                  <p className="text-xs text-zinc-300 drop-shadow line-clamp-1">
                    {service.tagline}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                {/* Feature Highlights List */}
                <ul className="space-y-2 text-xs text-zinc-300">
                  {service.highlights.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-red-950/80 border border-red-800/40 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Action & Price Bottom Row */}
                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-zinc-400 block uppercase tracking-wider">
                      Estimativa ({vehicleOption.category})
                    </span>
                    <div className="text-lg font-extrabold text-white tracking-tight tabular-nums font-display">
                      R$ {calculatedPrice}
                      <span className="text-[10px] font-normal text-zinc-400 ml-1">
                        {service.id === 'vitrificacao-pintura' ? 'à vista' : ''}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Ver Detalhes */}
                    <button
                      onClick={() => handleOpenDetails(service)}
                      className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                      title="Ver todos os detalhes do serviço"
                    >
                      <Info className="w-4 h-4" />
                    </button>

                    {/* Toggle Selection */}
                    <button
                      onClick={() => {
                        telemetry.trackEvent('toggle_service_card', 'interaction', {
                          serviceId: service.id,
                          selected: !isSelected,
                        });
                        onToggleService(service.id);
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-red-600 text-white shadow-md shadow-red-900/30'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Selecionado</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Adicionar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detail Modal / Drawer */}
      <AnimatePresence>
        {activeModalService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            >
              {/* Modal Image Header */}
              <div className="relative h-44 w-full shrink-0">
                <img
                  src={activeModalService.image}
                  alt={activeModalService.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
                <button
                  onClick={() => setActiveModalService(null)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-xl font-bold text-white font-display">
                    {activeModalService.name}
                  </h3>
                  <p className="text-xs text-red-400 font-medium">
                    {activeModalService.tagline}
                  </p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-5 overflow-y-auto space-y-4 text-sm text-zinc-300">
                <p className="text-xs leading-relaxed text-zinc-400">
                  {activeModalService.description}
                </p>

                <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <Clock className="w-3.5 h-3.5 text-red-500" />
                    Tempo estimado de execução:
                  </span>
                  <span className="font-semibold text-white">
                    {activeModalService.duration}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-zinc-400 mb-2.5">
                    O que está incluso neste procedimento:
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {activeModalService.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-zinc-200">
                        <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-red-950/30 border border-red-900/30 text-xs text-red-200 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-red-400 shrink-0" />
                  <span>
                    Garantia de acabamento com produtos originais e sem risco de danos ao verniz.
                  </span>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-zinc-400 block uppercase">
                    Valor base ({vehicleOption.label})
                  </span>
                  <span className="text-lg font-black text-white tabular-nums font-display">
                    R$ {Math.round(activeModalService.basePrice * vehicleOption.priceMultiplier)}
                  </span>
                </div>

                <button
                  onClick={() => handleSelectServiceAndBook(activeModalService.id)}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-900/30 transition-all flex items-center gap-2"
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span>Agendar este Serviço</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
