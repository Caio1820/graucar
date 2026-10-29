import React, { useState, useRef, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { telemetry } from '../lib/observability';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    handleMove(clientX);
    telemetry.trackEvent('before_after_slider_dragged', 'interaction');
  };

  return (
    <section className="px-4 py-8 max-w-4xl mx-auto w-full">
      <div className="text-center mb-6 space-y-1.5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Transformação Real</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight font-display">
          Antes & Depois do Polimento
        </h2>
        <p className="text-xs md:text-sm text-zinc-400 max-w-md mx-auto">
          Arraste o divisor para comparar a eliminação de micro-riscos e recuperação do brilho espelhado.
        </p>
      </div>

      <div
        ref={containerRef}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={(e) => e.touches.length > 0 && handleStart(e.touches[0].clientX)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden select-none cursor-ew-resize border border-zinc-800 shadow-2xl bg-zinc-950"
      >
        {/* "AFTER" Image (Full background) */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/src/assets/images/ceramic_coating_beading_1793276354033.jpg"
            alt="Depois: Pintura corrigida e vitrificada na Grau Car 096"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-4 right-4 bg-red-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-md shadow-md">
            DEPOIS: GRAU MÁXIMO ✨
          </div>
        </div>

        {/* "BEFORE" Image (Clipped overlay) */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="relative w-full h-full min-w-[320px] md:min-w-[800px]">
            <img
              src="/src/assets/images/detailing_polishing_paint_1793276328521.jpg"
              alt="Antes: Pintura desgastada com marcas"
              className="w-full h-full object-cover filter contrast-75 brightness-75 grayscale-[35%]"
              style={{
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                maxWidth: 'none',
              }}
              loading="lazy"
            />
          </div>
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-zinc-300 text-xs font-bold px-3 py-1 rounded-md border border-white/10 shadow-md">
            ANTES: RISCOS & OPACO
          </div>
        </div>

        {/* Vertical Divider Line with tactile knob */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-red-600 border-2 border-white shadow-xl flex items-center justify-center glow-red">
            <div className="flex items-center gap-0.5 text-white">
              <span className="text-[10px] font-bold">◀</span>
              <span className="text-[10px] font-bold">▶</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-zinc-500 mt-2 px-1">
        <span>Arraste para a esquerda</span>
        <span>Arraste para a direita</span>
      </div>
    </section>
  );
};
