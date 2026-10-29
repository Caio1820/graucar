import { BookingFormData, VehicleSize } from '../types';
import { BUSINESS_INFO, VEHICLE_SIZES, SERVICES_LIST } from '../data/servicesData';
import { telemetry } from './observability';

export function formatWhatsAppMessage(data: BookingFormData): string {
  const vehicle = VEHICLE_SIZES.find((v) => v.id === data.vehicleSize);
  const selectedServicesObjects = SERVICES_LIST.filter((s) =>
    data.selectedServices.includes(s.id)
  );

  const vehicleLabel = vehicle ? `${vehicle.label} (${vehicle.category})` : data.vehicleSize;
  const vehicleModelStr = data.vehicleModel.trim() || 'Não informado';
  const plateStr = data.licensePlate.trim() ? ` [Placa/Ano: ${data.licensePlate.trim()}]` : '';

  const servicesText =
    selectedServicesObjects.length > 0
      ? selectedServicesObjects.map((s) => `  • ${s.name}`).join('\n')
      : '  • Avaliação técnica geral / Não especificado';

  // Format date to Brazilian standard DD/MM/AAAA if provided
  let formattedDate = data.preferredDate || 'A combinar';
  if (data.preferredDate && data.preferredDate.includes('-')) {
    const [year, month, day] = data.preferredDate.split('-');
    formattedDate = `${day}/${month}/${year}`;
  }

  const timeStr = data.preferredTime ? `às ${data.preferredTime}` : '(a combinar)';

  let message = `*Olá, Garagem Grau Car 096!* 🏁\n`;
  message += `Gostaria de agendar um serviço de estética automotiva:\n\n`;
  message += `👤 *Cliente:* ${data.customerName.trim() || 'Não informado'}\n`;
  message += `📱 *WhatsApp:* ${data.customerPhone.trim() || 'Não informado'}\n`;
  message += `🚗 *Veículo:* ${vehicleModelStr} (${vehicleLabel})${plateStr}\n\n`;
  message += `🛠️ *Serviço(s) Selecionado(s):*\n${servicesText}\n\n`;
  message += `📅 *Previsão Desejada:* ${formattedDate} ${timeStr}\n`;
  message += `📍 *Unidade:* ${BUSINESS_INFO.addressShort}, Macapá - AP\n`;

  if (data.notes.trim()) {
    message += `💬 *Observações:* ${data.notes.trim()}\n`;
  }

  message += `\n_Enviado pelo BioSite Grau Car 096_`;

  return message;
}

export function generateWhatsAppUrl(data: BookingFormData): string {
  const message = formatWhatsAppMessage(data);
  const encodedText = encodeURIComponent(message);
  
  telemetry.trackEvent('whatsapp_booking_click', 'conversion', {
    vehicleSize: data.vehicleSize,
    vehicleModel: data.vehicleModel,
    servicesCount: data.selectedServices.length,
    preferredDate: data.preferredDate,
  });

  return `https://wa.me/55${BUSINESS_INFO.phone}?text=${encodedText}`;
}

export function generateDirectWhatsAppUrl(customText?: string): string {
  const text = customText || 'Olá, Grau Car 096! Gostaria de tirar uma dúvida sobre serviços de estética automotiva.';
  return `https://wa.me/55${BUSINESS_INFO.phone}?text=${encodeURIComponent(text)}`;
}
