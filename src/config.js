// Tudo que a academia precisa trocar fica aqui.
// Itens marcados com TODO são exemplos: substitua pelos dados reais antes de publicar.

// WhatsApp do dono da Bem Estar — contato central das duas unidades (Brejo do Cruz não tem número próprio)
export const WHATSAPP_NUMBER = '5584999998182';
export const PHONE_DISPLAY = '(84) 99999-8182';
export const INSTAGRAM_URL = 'https://www.instagram.com/bemestarfit_/';

// Nota da ficha do Google (unidade Jardim de Piranhas)
export const GOOGLE_RATING = { score: '4,7', count: 14 };

// Inauguração da nova estrutura (post de 23/10/2026)
export const OPENING_DATE = new Date('2026-11-03T17:00:00-03:00');

export const whatsappLink = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

// Unidades (dados das fichas do Google Maps)
// hours.days: 0 = domingo ... 6 = sábado; slots em horas decimais [abre, fecha] (4.5 = 04h30)
export const UNITS = [
  {
    id: 'jardim',
    name: 'Jardim de Piranhas',
    uf: 'RN',
    address: 'Av. Rio Branco, 605 — Centro, Jardim de Piranhas/RN, 59324-000',
    lat: -6.3795102,
    lng: -37.3493507,
    mapsUrl: 'https://www.google.com/maps/place/Academia+Bem+Estar+Fitness/data=!4m7!3m6!1s0x7a559d6d3be9f19:0x302fa7fb00c9df68!8m2!3d-6.3795102!4d-37.3493507!16s%2Fg%2F11tg2ftysv',
    hours: [
      { short: 'SEG — SEX', days: [1, 2, 3, 4, 5], slots: [[5, 22]] },
      { short: 'SÁB', days: [6], slots: [[9, 12], [14, 17]] },
      { short: 'DOM', days: [0], slots: [[10, 13]] },
    ],
  },
  {
    id: 'brejo',
    name: 'Brejo do Cruz',
    uf: 'PB',
    address: 'R. Teodora Maria da Conceição — Brejo do Cruz/PB, 58890-000',
    lat: -6.3474719,
    lng: -37.4996614,
    mapsUrl: 'https://www.google.com/maps/place/BEM+ESTAR+FITNESS+BC/data=!4m7!3m6!1s0x7a545e1068a767d:0x78770ace83b72f3f!8m2!3d-6.3474719!4d-37.4996614!16s%2Fg%2F11v5g95z7_',
    hours: [
      { short: 'SEG — SEX', days: [1, 2, 3, 4, 5], slots: [[4.5, 21]] },
      { short: 'SÁB', days: [6], slots: [[9, 12], [14, 17]] },
      { short: 'DOM', days: [0], slots: [[10, 13]] },
    ],
  },
];

// Fotos e vídeos do Instagram @bemestarfit_ (pasta public/media)
export const MEDIA = {
  heroVideo: '/media/treino-1003.mp4',
  heroPoster: '/media/reel-1003.jpg',
  finalVideo: '/media/treino-1003.mp4',
  finalPoster: '/media/reel-1003.jpg',
  structureVideo: '/media/treino-1019.mp4',
  structurePoster: '/media/reel-1019.jpg',
  reels: [
    { src: '/media/treino-1024.mp4', poster: '/media/reel-1024.jpg', label: 'Contagem pra inauguração' },
    { img: '/media/post-1017.jpg', label: 'Equipe pós-graduada' },
    { src: '/media/treino-1008.mp4', poster: '/media/reel-1008.jpg', label: 'Outubro Rosa' },
  ],
  gallery: [
    '/media/reel-1006.jpg', '/media/post-0921.jpg', '/media/reel-1003.jpg', '/media/post-1017.jpg',
    '/media/reel-1019.jpg', '/media/post-0928.jpg', '/media/reel-1008.jpg', '/media/inauguracao.jpg',
    '/media/reel-1024.jpg',
  ],
};

// Trechos curtos de avaliações públicas no Google Maps
export const TESTIMONIALS = [
  { name: 'Avaliação no Google · Jardim de Piranhas', text: 'Bons equipamentos, personal prestativos e atenciosos.' },
  { name: 'Avaliação no Google · Jardim de Piranhas', text: 'Aparelhos novos e com a manutenção sempre em dia.' },
  { name: 'Avaliação no Google · Jardim de Piranhas', text: 'Muito bom, pessoal do personal gente boa mesmo.' },
  { name: 'Avaliação no Google · Brejo do Cruz', text: 'Melhor academia da cidade de Brejo do Cruz e região!' },
];

export const FAQ = [
  { q: 'Nunca treinei. Posso começar?', a: 'Pode e deve. Na primeira visita a equipe entende seu objetivo, sua rotina e monta um treino no seu nível. Ninguém fica perdido.' },
  { q: 'A aula experimental é grátis mesmo?', a: 'Sim. Você chama no WhatsApp, escolhe o horário e vem conhecer a estrutura e a equipe sem compromisso.' },
  { q: 'Onde ficam as unidades?', a: 'Temos duas: Av. Rio Branco, 605, no Centro de Jardim de Piranhas (RN), e na R. Teodora Maria da Conceição, em Brejo do Cruz (PB).' },
  { q: 'Qual o horário de funcionamento?', a: 'Jardim de Piranhas: segunda a sexta das 5h às 22h. Brejo do Cruz: segunda a sexta das 4h30 às 21h. Nas duas, sábado das 9h às 12h e das 14h às 17h, e domingo das 10h às 13h.' },
  { q: 'O ambiente é climatizado?', a: 'Totalmente climatizado — e a nova estrutura foi pensada pra você treinar com conforto o ano inteiro.' },
  { q: 'Como faço a matrícula?', a: 'Pelo WhatsApp (84) 99999-8182, que atende as duas unidades, ou direto na recepção. Leva só alguns minutos.' },
];
