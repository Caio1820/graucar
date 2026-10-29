import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  Clock,
  Car,
  User,
  Phone,
  FileText,
  Sparkles,
  Send,
  CheckCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { BookingFormData, VehicleSize } from '../types';
import { VEHICLE_SIZES, SERVICES_LIST, BUSINESS_INFO } from '../data/servicesData';
import { generateWhatsAppUrl, formatWhatsAppMessage } from '../lib/whatsapp';
import { telemetry } from '../lib/observability';

interface BookingSimulatorProps {
  formData: BookingFormData;
  setFormData: React.Dispatch<React.SetStateAction<BookingFormData>>;
}

const AVAILABLE_TIMES = [
  '08:00',
  '09:30',
  '11:00',
  '13:30',
  '15:00',
  '16:30',
];

export const BookingSimulator: React.FC<BookingSimulatorProps> = ({
  formData,
  setFormData,
}) => {
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');

  const currentVehicle =
    VEHICLE_SIZES.find((v) => v.id === formData.vehicleSize) || VEHICLE_SIZES[0];

  const selectedServicesObjects = SERVICES_LIST.filter((s) =>
    formData.selectedServices.includes(s.id)
  );

  const totalPrice = selectedServicesObjects.reduce((acc, s) => {
    return acc + Math.round(s.basePrice * currentVehicle.priceMultiplier);
  }, 0);

  // Phone input mask for Brazilian phone numbers (e.g. (96) 98436-1638)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    }

    setFormData((prev) => ({ ...prev, customerPhone: value }));
    if (phoneError) setPhoneError('');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, customerName: e.target.value }));
    if (nameError) setNameError('');
  };

  const toggleService = (id: string) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(id);
      return {
        ...prev,
        selectedServices: exists
          ? prev.selectedServices.filter((sId) => sId !== id)
          : [...prev.selectedServices, id],
      };
    });
  };

  // Get tomorrow date string in YYYY-MM-DD format as min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const handleConfirmAndSend = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    if (!formData.customerName.trim()) {
      setNameError('Por favor informe seu nome');
      hasError = true;
    }
    if (!formData.customerPhone.trim() || formData.customerPhone.replace(/\D/g, '').length < 10) {
      setPhoneError('Informe seu WhatsApp com DDD (ex: 96 98436-1638)');
      hasError = true;
    }

    if (hasError) return;

    telemetry.trackEvent('booking_form_submitted', 'booking', {
      vehicleSize: formData.vehicleSize,
      vehicleModel: formData.vehicleModel,
      services: formData.selectedServices,
      totalEstimate: totalPrice,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
    });

    const url = generateWhatsAppUrl(formData);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="agendamento" className="px-4 py-8 max-w-4xl mx-auto w-full">
      <div className="relative rounded-3xl bg-zinc-900/90 border border-zinc-800 p-6 md:p-8 shadow-2xl overflow-hidden">
        {/* Glow ambient background */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 bg-red-600/10 blur-[80px] rounded-full pointer-events-none"
          aria-hidden="true"
        />

        {/* Header */}
        <div className="mb-6 space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulador & Agendamento</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight font-display">
            Monte seu Pacote de Estética
          </h2>
          <p className="text-xs md:text-sm text-zinc-400">
            Selecione seu veículo e serviços. O agendamento será enviado direto para nosso WhatsApp de Macapá.
          </p>
        </div>

        <form onSubmit={handleConfirmAndSend} className="space-y-6">
          {/* 1. Vehicle Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
              <Car className="w-4 h-4 text-red-500" />
              <span>1. Porte do Veículo</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {VEHICLE_SIZES.map((size) => {
                const isSelected = size.id === formData.vehicleSize;
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => {
                      telemetry.trackEvent('simulator_vehicle_selected', 'interaction', { size: size.id });
                      setFormData((prev) => ({ ...prev, vehicleSize: size.id }));
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-950/50'
                        : 'bg-zinc-950/60 hover:bg-zinc-800/80 text-zinc-300 border-zinc-800'
                    }`}
                  >
                    <div className="font-bold text-xs">{size.label}</div>
                    <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-red-100' : 'text-zinc-500'}`}>
                      {size.category}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Model & Plate Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  Modelo do Carro / Moto:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Toyota Corolla, Onix, Hilux..."
                  value={formData.vehicleModel}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, vehicleModel: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  Placa ou Ano (Opcional):
                </label>
                <input
                  type="text"
                  placeholder="Ex: NEZ-2023 ou 2022"
                  value={formData.licensePlate}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, licensePlate: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* 2. Services Selection Checklist */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-500" />
                <span>2. Selecione os Serviços Desejados</span>
              </label>
              <span className="text-[11px] text-zinc-400">
                {formData.selectedServices.length} selecionado(s)
              </span>
            </div>

            <div className="space-y-2">
              {SERVICES_LIST.map((service) => {
                const isChecked = formData.selectedServices.includes(service.id);
                const price = Math.round(service.basePrice * currentVehicle.priceMultiplier);

                return (
                  <div
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      isChecked
                        ? 'bg-zinc-850 border-red-500/70 shadow-md shadow-red-950/20'
                        : 'bg-zinc-950/40 hover:bg-zinc-950/80 border-zinc-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                          isChecked
                            ? 'bg-red-600 border-red-500 text-white'
                            : 'border-zinc-700 bg-zinc-900 text-transparent'
                        }`}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-white">
                          {service.name}
                        </div>
                        <div className="text-[11px] text-zinc-400 line-clamp-1">
                          {service.tagline}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs sm:text-sm font-bold text-white tabular-nums font-display">
                        R$ {price}
                      </span>
                      <span className="text-[10px] text-zinc-500 block">
                        {service.duration}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Date & Time Preferences */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-red-500" />
              <span>3. Data e Horário Preferencial</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  Data desejada:
                </label>
                <input
                  type="date"
                  min={minDate}
                  value={formData.preferredDate}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, preferredDate: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white text-xs focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  Horário de preferência:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {AVAILABLE_TIMES.map((time) => {
                    const isTimeSelected = formData.preferredTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, preferredTime: time }))
                        }
                        className={`py-2 px-1 rounded-lg text-xs font-medium text-center transition-all ${
                          isTimeSelected
                            ? 'bg-red-600 text-white shadow-sm border border-red-500'
                            : 'bg-zinc-950/70 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 4. Customer Contact Details */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-red-500" />
              <span>4. Seus Dados de Contato</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  Seu Nome Completo: <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carlos Silva"
                    value={formData.customerName}
                    onChange={handleNameChange}
                    className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-zinc-950/80 border text-white placeholder-zinc-600 text-xs focus:outline-none transition-colors ${
                      nameError ? 'border-red-500' : 'border-zinc-800 focus:border-red-500'
                    }`}
                  />
                </div>
                {nameError && (
                  <span className="text-[11px] text-red-400 mt-1 block">
                    {nameError}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  WhatsApp com DDD: <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="(96) 98436-1638"
                    value={formData.customerPhone}
                    onChange={handlePhoneChange}
                    className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-zinc-950/80 border text-white placeholder-zinc-600 text-xs focus:outline-none transition-colors ${
                      phoneError ? 'border-red-500' : 'border-zinc-800 focus:border-red-500'
                    }`}
                  />
                </div>
                {phoneError && (
                  <span className="text-[11px] text-red-400 mt-1 block">
                    {phoneError}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">
                Observações ou Pedidos Especiais (Opcional):
              </label>
              <textarea
                rows={2}
                placeholder="Ex: O carro possui manchas de protetor solar ou mancha no banco do passageiro..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, notes: e.target.value }))
                }
                className="w-full px-3.5 py-2 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
          </div>

          {/* Investment Total Bar & Trigger Button */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-[11px] text-zinc-400 uppercase tracking-wider">
                Investimento Estimado ({formData.selectedServices.length} serviço(s)):
              </div>
              <div className="text-2xl font-black text-white tabular-nums tracking-tight font-display flex items-baseline gap-2">
                <span>R$ {totalPrice}</span>
                <span className="text-xs font-normal text-zinc-400">
                  (Porte: {currentVehicle.label})
                </span>
              </div>
            </div>

            <div className="w-full md:w-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowSummaryModal(true)}
                className="px-3.5 py-3 rounded-xl bg-zinc-850 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-medium border border-zinc-700/60 transition-colors"
                title="Visualizar mensagem antes de enviar"
              >
                <FileText className="w-4 h-4" />
              </button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex-1 md:flex-initial px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-xl shadow-red-900/50 glow-red border border-red-500 flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Confirmar Agendamento no WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </form>

        {/* Message Preview Modal */}
        {showSummaryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h4 className="text-sm font-bold text-white font-display">
                  Pré-visualização da Mensagem do WhatsApp
                </h4>
                <button
                  onClick={() => setShowSummaryModal(false)}
                  className="text-zinc-400 hover:text-white text-xs"
                >
                  Fechar
                </button>
              </div>

              <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                {formatWhatsAppMessage(formData)}
              </div>

              <div className="text-right">
                <button
                  onClick={() => setShowSummaryModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium"
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
