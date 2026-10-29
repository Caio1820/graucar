export type VehicleSize = 'compact' | 'medium' | 'suv' | 'truck' | 'moto';

export interface VehicleSizeOption {
  id: VehicleSize;
  label: string;
  category: string;
  examples: string;
  priceMultiplier: number;
}

export interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  category: 'lavagem' | 'estetica' | 'protecao' | 'motor';
  basePrice: number;
  duration: string;
  image: string;
  highlights: string[];
  description: string;
  popular?: boolean;
}

export interface BookingFormData {
  vehicleSize: VehicleSize;
  vehicleModel: string;
  licensePlate: string;
  selectedServices: string[];
  preferredDate: string;
  preferredTime: string;
  customerName: string;
  customerPhone: string;
  notes: string;
}

export interface Testimonial {
  id: string;
  author: string;
  vehicle: string;
  comment: string;
  rating: number;
  service: string;
  date: string;
}
