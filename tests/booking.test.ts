import { describe, it } from 'node:test';
import assert from 'node:assert';
import { formatWhatsAppMessage, generateWhatsAppUrl } from '../src/lib/whatsapp';
import { BookingFormData } from '../src/types';

describe('Booking WhatsApp Integration & CRO Calculations', () => {
  const sampleBooking: BookingFormData = {
    vehicleSize: 'suv',
    vehicleModel: 'Toyota Corolla Cross',
    licensePlate: 'NEZ-2024',
    selectedServices: ['polimento-tecnico', 'higienizacao-interna'],
    preferredDate: '2026-11-05',
    preferredTime: '09:30',
    customerName: 'Renato F. Albuquerque',
    customerPhone: '(96) 98436-1638',
    notes: 'Favor dar atenção especial para manchas no banco do motorista.',
  };

  it('should format WhatsApp message with all customer and vehicle details', () => {
    const message = formatWhatsAppMessage(sampleBooking);

    assert.ok(message.includes('Garagem Grau Car 096'));
    assert.ok(message.includes('Renato F. Albuquerque'));
    assert.ok(message.includes('Toyota Corolla Cross'));
    assert.ok(message.includes('NEZ-2024'));
    assert.ok(message.includes('SUV / Crossover'));
    assert.ok(message.includes('Polimento de Pintura & Faróis'));
    assert.ok(message.includes('Higienização Interna'));
    assert.ok(message.includes('05/11/2026 às 09:30'));
    assert.ok(message.includes('Av. Coraci Nunes, 907 B – Centro, Macapá - AP'));
    assert.ok(message.includes('manchas no banco do motorista'));
  });

  it('should generate valid WhatsApp direct link with target phone 96984361638', () => {
    const url = generateWhatsAppUrl(sampleBooking);

    assert.ok(url.startsWith('https://wa.me/5596984361638?text='));
    assert.ok(url.includes(encodeURIComponent('Garagem Grau Car 096')));
    assert.ok(url.includes(encodeURIComponent('Renato F. Albuquerque')));
  });
});
