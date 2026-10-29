import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronDown, CheckCircle2, ShieldAlert, Award, Coffee, Clock, Wrench } from 'lucide-react';
import { TESTIMONIALS, FAQS } from '../data/servicesData';
import { telemetry } from '../lib/observability';

export const TestimonialsAndFaq: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    const nextIndex = openFaqIndex === index ? null : index;
    setOpenFaqIndex(nextIndex);
    telemetry.trackEvent('faq_toggled', 'interaction', { faqIndex: index });
  };

  return (
    <section className="px-4 py-8 max-w-4xl mx-auto w-full space-y-12">
      {/* Workshop Differentials */}
      <div>
        <div className="text-center mb-6 space-y-1.5">
          <span className="text-xs font-semibold text-red-500 uppercase tracking-widest">
            Por que escolher a Grau Car 096?
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight font-display">
            Padrão de Concessionária & Estética de Luxo
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-red-950/60 border border-red-800/40 text-red-500 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-white">Produtos Importados</div>
            <p className="text-[11px] text-zinc-400">
              Vonixx, CarPro e Menzerna originais de alta performance.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-red-950/60 border border-red-800/40 text-red-500 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-white">Detailers Certificados</div>
            <p className="text-[11px] text-zinc-400">
              Técnicas manuais que preservam a integridade do verniz.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-red-950/60 border border-red-800/40 text-red-500 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-white">Entrega no Prazo</div>
            <p className="text-[11px] text-zinc-400">
              Agendamento rigoroso sem filas e sem atrasos no centro.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-red-950/60 border border-red-800/40 text-red-500 flex items-center justify-center">
              <Coffee className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-white">Sala VIP Climatizada</div>
            <p className="text-[11px] text-zinc-400">
              Café expresso, Wi-Fi ultra rápido e conforto enquanto aguarda.
            </p>
          </div>
        </div>
      </div>

      {/* Customer Testimonials from Macapá */}
      <div>
        <div className="text-center mb-6 space-y-1.5">
          <span className="text-xs font-semibold text-red-500 uppercase tracking-widest">
            Experiência Comprovada
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight font-display">
            Quem Conhece, Recomenda
          </h2>
          <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-semibold">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-white ml-1">5.0</span>
            <span className="text-zinc-500">(Mais de 350 carros entregues em Macapá)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-zinc-500">{t.date}</span>
                </div>
                <p className="text-xs text-zinc-300 italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800/80">
                <div className="text-xs font-bold text-white">{t.author}</div>
                <div className="text-[11px] text-red-400 font-medium">
                  {t.vehicle} · {t.service}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div>
        <div className="text-center mb-6 space-y-1.5">
          <span className="text-xs font-semibold text-red-500 uppercase tracking-widest">
            Dúvidas Comuns
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight font-display">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="space-y-2.5">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-zinc-800/90 bg-zinc-900/60 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-zinc-200 hover:text-white"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-red-500' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-4 pb-4 pt-1 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/60">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
