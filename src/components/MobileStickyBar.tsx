import React from 'react';
import { Calendar, Phone } from 'lucide-react';
import { generateDirectWhatsAppUrl } from '../lib/whatsapp';
import { telemetry } from '../lib/observability';

interface MobileStickyBarProps {
  onScrollToBooking: () => void;
  selectedCount: number;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  onScrollToBooking,
  selectedCount,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 shadow-2xl">
      <div className="max-w-md mx-auto flex items-center gap-2">
        <a
          href={generateDirectWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => telemetry.trackEvent('mobile_sticky_whatsapp_click', 'conversion')}
          className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center shrink-0"
          title="Falar no WhatsApp"
        >
          <Phone className="w-5 h-5 text-red-500" />
        </a>

        <button
          onClick={() => {
            telemetry.trackEvent('mobile_sticky_book_click', 'conversion', { selectedCount });
            onScrollToBooking();
          }}
          className="flex-1 py-3 px-4 rounded-xl bg-red-600 active:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-950/40 glow-red-subtle flex items-center justify-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          <span>
            {selectedCount > 0
              ? `Finalizar Agendamento (${selectedCount})`
              : 'Agendar Horário no Grau'}
          </span>
        </button>
      </div>
    </div>
  );
};
