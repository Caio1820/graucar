import { ServiceItem, VehicleSizeOption, Testimonial } from '../types';

export const BUSINESS_INFO = {
  name: 'Garagem Grau Car 096',
  slogan: 'Seu carro no grau máximo!',
  servicesSummary: 'Lavagem • Higienização • Brilho',
  phone: '96984361638',
  phoneDisplay: '(96) 98436-1638',
  instagram: 'graucar096',
  instagramUrl: 'https://instagram.com/graucar096',
  address: 'Av. Coraci Nunes, 907 B – Centro, Macapá - AP',
  addressShort: 'Av. Coraci Nunes, 907 B – Centro',
  cityState: 'Macapá - AP',
  mapsUrl: 'https://maps.google.com/?q=Av.+Coraci+Nunes,+907+B+–+Centro,+Macapa+-+AP',
  openingHours: 'Segunda a Sexta: 08h às 18h | Sábado: 08h às 14h',
  avatarImage: '/src/assets/images/grau_car_logo_avatar_1793276315494.jpg',
  heroImage: '/src/assets/images/detailing_polishing_paint_1793276328521.jpg',
};

export const VEHICLE_SIZES: VehicleSizeOption[] = [
  {
    id: 'compact',
    label: 'Hatch / Compacto',
    category: 'Porte P',
    examples: 'Gol, Onix, HB20, Polo, Kwid, Mobi',
    priceMultiplier: 1.0,
  },
  {
    id: 'medium',
    label: 'Sedan / Médio',
    category: 'Porte M',
    examples: 'Corolla, Civic, Cruze, Virtus, Cronos',
    priceMultiplier: 1.15,
  },
  {
    id: 'suv',
    label: 'SUV / Crossover',
    category: 'Porte G',
    examples: 'Compass, Creta, Renegade, T-Cross, Tracker',
    priceMultiplier: 1.35,
  },
  {
    id: 'truck',
    label: 'Picape / Grande',
    category: 'Porte GG',
    examples: 'Hilux, Ranger, S10, Amarok, Toro, SW4',
    priceMultiplier: 1.6,
  },
  {
    id: 'moto',
    label: 'Motocicleta',
    category: '2 Rodas',
    examples: 'Motos de baixa a alta cilindrada',
    priceMultiplier: 0.75,
  },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'lavagem-completa',
    name: 'Lavagem Simples & Completa',
    tagline: 'Limpeza técnica com pH neutro e secagem magnética',
    category: 'lavagem',
    basePrice: 70,
    duration: '1h15 - 1h45',
    image: '/src/assets/images/detailing_polishing_paint_1793276328521.jpg',
    popular: true,
    highlights: [
      'Pré-lavagem com snow foam de pH neutro (sem agressão à pintura)',
      'Lavagem dos dois baldes com luvas de microfibra macia',
      'Limpeza minuciosa de caixas de roda, pneus e calotas',
      'Aspiração interna profunda e acabamento nos plásticos com proteção UV',
      'Secagem técnica com toalha de microfibra de alta gramatura',
      'Finalização com pretinho hidrorrepelente que não gruda poeira',
    ],
    description:
      'Uma lavagem artesanal de alto padrão que remove a sujeira pesada sem riscar a pintura do veículo. Inclui limpeza detalhada de soleiras, borrachas e vidros para um brilho cristalino.',
  },
  {
    id: 'higienizacao-interna',
    name: 'Higienização Interna (Bancos & Carpetes)',
    tagline: 'Extração a vapor, hidratação de couro e oxi-sanitização',
    category: 'estetica',
    basePrice: 220,
    duration: '3h30 - 5h00',
    image: '/src/assets/images/interior_detailing_luxury_1793276341542.jpg',
    popular: true,
    highlights: [
      'Lavagem profunda e extração a vapor quente dos estofados e carpetes',
      'Desinfecção bactericida contra ácaros, fungos e odores de cigarro/animais',
      'Higienização de teto, cintos de segurança e painel detalhado com pincéis',
      'Hidratação profunda de bancos em couro legítimo ou sintético',
      'Oxi-sanitização com gerador de ozônio no duto do ar condicionado',
      'Retorno do aroma natural e aspecto de carro novo de fábrica',
    ],
    description:
      'Elimina até 99.9% dos microorganismos e manchas difíceis nos estofamentos. Ideal para quem busca um ambiente puro, saudável e protegido para toda a família.',
  },
  {
    id: 'polimento-tecnico',
    name: 'Polimento de Pintura & Faróis',
    tagline: 'Correção de verniz, eliminação de riscos e restauração ótica',
    category: 'estetica',
    basePrice: 380,
    duration: '4h00 - 7h00',
    image: '/src/assets/images/detailing_polishing_paint_1793276328521.jpg',
    popular: true,
    highlights: [
      'Descontaminação química e mecânica da pintura (Clay Bar)',
      'Polimento técnico em 3 etapas: Corte, Refino e Lustro',
      'Remoção de até 90% dos micro-riscos, teias de aranha e marcas circulares',
      'Eliminação de marcas de chuva ácida e oxidação superficial',
      'Restauração de faróis amarelados com polimento e selante protetor',
      'Brilho espelhado e reflexo vítreo impressionante',
    ],
    description:
      'Processo cirúrgico de correção do verniz que recupera a profundidade de cor original do carro e elimina o aspecto opaco causado pelo tempo e lavagens incorretas.',
  },
  {
    id: 'vitrificacao-pintura',
    name: 'Vitrificação / Proteção Cerâmica (9H)',
    tagline: 'Revestimento cerâmico de alta durabilidade e brilho absoluto',
    category: 'protecao',
    basePrice: 790,
    duration: '1 a 2 dias',
    image: '/src/assets/images/ceramic_coating_beading_1793276354033.jpg',
    popular: false,
    highlights: [
      'Camada cerâmica de dureza 9H que forma uma barreira protetora física',
      'Proteção contra a forte radiação solar UV de Macapá, fezes de aves e seiva',
      'Efeito hidrofóbico extremo (a água e sujeira deslizam sem aderir)',
      'Facilidade de lavagem e manutenção do brilho por até 36 meses',
      'Profundidade de cor e aspecto de vidro molhado constante',
      'Certificado de garantia e manual de cuidados Grau Car',
    ],
    description:
      'O ápice da proteção automotiva mundial. Uma couraça de sílica vitrificada que blinda a pintura contra as intempéries tropicais do Amapá e preserva o valor venal do veículo.',
  },
  {
    id: 'lavagem-motor',
    name: 'Lavagem Detalhada de Motor',
    tagline: 'Desengraxe técnico seguro com proteção térmica de plásticos',
    category: 'motor',
    basePrice: 130,
    duration: '1h30 - 2h00',
    image: '/src/assets/images/engine_bay_detailing_1793276367166.jpg',
    popular: false,
    highlights: [
      'Proteção e isolamento prévio de módulos eletrônicos e chicotes',
      'Desengraxe técnico seguro com produtos biodegradáveis e pincéis específicos',
      'Limpeza de capô, manta térmica, grelhas e calhas de drenagem',
      'Remoção de borras secas e oleosidades sem jatos de alta pressão',
      'Aplicação de verniz protetor térmico de motor (resiste a altas temperaturas)',
      'Restaura o aspecto fosco acetinado de fábrica das peças plásticas',
    ],
    description:
      'Higienização técnica do cofre do motor que garante segurança e valoriza o veículo. Protege mangueiras e conectores contra ressecamento sem risco para os sistemas eletrônicos.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'Renato F. Albuquerque',
    vehicle: 'Toyota Corolla Cross',
    service: 'Polimento Técnico + Vitrificação 9H',
    comment:
      'Impressionante o cuidado da equipe da Grau Car 096! Meu carro preto estava cheio de teias de aranha do lava-rápido antigo. O reflexo agora parece um espelho d’água.',
    rating: 5,
    date: 'Ontem',
  },
  {
    id: '2',
    author: 'Mariana Duarte',
    vehicle: 'Jeep Compass',
    service: 'Higienização Interna + Oxi-sanitização',
    comment:
      'Tenho dois filhos pequenos e cachorro, os bancos claros estavam bem sujos. O trabalho de extração devolveu a cor original e tirou qualquer cheiro. Atendimento nota 10!',
    rating: 5,
    date: 'Há 3 dias',
  },
  {
    id: '3',
    author: 'Carlos Eduardo Maciel',
    vehicle: 'Hilux SRV',
    service: 'Lavagem Completa + Detalhada de Motor',
    comment:
      'A melhor estética automotiva de Macapá. Fica no centro, fácil de deixar o carro. O motor ficou impecável parecendo zero km sem jogar água desordenada.',
    rating: 5,
    date: 'Há 1 semana',
  },
];

export const FAQS = [
  {
    question: 'Qual a localização da Garagem Grau Car 096?',
    answer:
      'Estamos convenientemente localizados na Av. Coraci Nunes, 907 B – Centro de Macapá - AP. Acesso rápido com vagas para recepção e entrega.',
  },
  {
    question: 'Quanto tempo leva para realizar os serviços?',
    answer:
      'A lavagem completa leva cerca de 1h30. Higienização interna leva de 3h a 5h. Polimento e vitrificação variam de 6h até 1 dia e meio para tempo de cura perfeita do verniz.',
  },
  {
    question: 'Como funciona o agendamento pelo WhatsApp?',
    answer:
      'Você escolhe o seu carro e os serviços desejados em nosso simulador. Ao clicar no botão, uma mensagem organizada é enviada direto para o nosso WhatsApp com todas as informações prontas para confirmarmos seu horário!',
  },
  {
    question: 'Quais formas de pagamento são aceitas?',
    answer:
      'Aceitamos Pix, cartões de crédito e débito com parcelamento em até 10x (consulte condições de parcelamento sem juros), e dinheiro em espécie.',
  },
];
