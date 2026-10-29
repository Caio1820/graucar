/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HeaderProfile } from './components/HeaderProfile';
import { QuickActions } from './components/QuickActions';
import { ServiceCatalog } from './components/ServiceCatalog';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { BookingSimulator } from './components/BookingSimulator';
import { TestimonialsAndFaq } from './components/TestimonialsAndFaq';
import { LocationAndFooter } from './components/LocationAndFooter';
import { MobileStickyBar } from './components/MobileStickyBar';
import { BookingFormData, VehicleSize } from './types';
import { telemetry } from './lib/observability';

export default function App() {
  const [formData, setFormData] = useState<BookingFormData>({
    vehicleSize: 'compact',
    vehicleModel: '',
    licensePlate: '',
    selectedServices: ['lavagem-completa'],
    preferredDate: '',
    preferredTime: '09:30',
    customerName: '',
    customerPhone: '',
    notes: '',
  });

  useEffect(() => {
    telemetry.trackEvent('biosite_page_loaded', 'navigation', {
      referrer: document.referrer,
      screen: `${window.innerWidth}x${window.innerHeight}`,
    });
  }, []);

  const handleScrollToBooking = () => {
    const el = document.getElementById('agendamento');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleService = (serviceId: string) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(serviceId);
      return {
        ...prev,
        selectedServices: exists
          ? prev.selectedServices.filter((id) => id !== serviceId)
          : [...prev.selectedServices, serviceId],
      };
    });
  };

  const handleSelectVehicleSize = (size: VehicleSize) => {
    setFormData((prev) => ({ ...prev, vehicleSize: size }));
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] relative pb-20 md:pb-8 selection:bg-red-600 selection:text-white">
      {/* Background carbon texture and subtle ambient glows */}
      <div className="fixed inset-0 pointer-events-none carbon-pattern opacity-40 -z-20" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-red-600/[0.04] blur-[140px] pointer-events-none -z-10" />

      {/* Main Container */}
      <main className="max-w-4xl mx-auto w-full">
        {/* 1. Header / Perfil */}
        <HeaderProfile />

        {/* 2. Botões de Ação Rápida */}
        <QuickActions onScrollToBooking={handleScrollToBooking} />

        {/* 3. Catálogo de Serviços com Seletor Interativo */}
        <ServiceCatalog
          selectedServiceIds={formData.selectedServices}
          currentVehicleSize={formData.vehicleSize}
          onToggleService={handleToggleService}
          onSelectVehicleSize={handleSelectVehicleSize}
          onOpenBooking={handleScrollToBooking}
        />

        {/* Showcase Antes & Depois */}
        <BeforeAfterSlider />

        {/* 4. Simulador / Formulário de Agendamento Rápido */}
        <BookingSimulator
          formData={formData}
          setFormData={setFormData}
        />

        {/* Diferenciais, Avaliações e FAQ */}
        <TestimonialsAndFaq />
      </main>

      {/* 5. Rodapé com Endereço e Marca d'água */}
      <LocationAndFooter />

      {/* Mobile Sticky Conversion Bar */}
      <MobileStickyBar
        onScrollToBooking={handleScrollToBooking}
        selectedCount={formData.selectedServices.length}
      />
    </div>
  );
}
