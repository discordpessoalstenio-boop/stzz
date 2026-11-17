// ============================================================
//  STZZ.DEV — configuração central do site
//  Edite este arquivo para trocar textos, contatos e projetos.
// ============================================================

const env = import.meta.env;

export const brand = {
  name: 'STZZ.DEV',
  commercialName: 'STZZ | Dev de Sites',
  instagramHandle: '@stzz.dev',
  instagramUrl: 'https://www.instagram.com/stzz.dev/',
};

// WhatsApp para orçamentos (DDI 55 + DDD 31). Pode ser sobrescrito por VITE_WHATSAPP_NUMBER.
const waNumber = (env.VITE_WHATSAPP_NUMBER || '5531984076623').replace(/\D/g, '');
const waMessage =
  env.VITE_WHATSAPP_MESSAGE || 'Olá! Vim pelo site da STZZ.DEV e quero iniciar um projeto.';

export const contact = {
  whatsappNumber: waNumber,
  whatsappUrl: waNumber ? `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}` : null,
  // Formulário: endpoint JSON (ex.: Formspree). Vazio = Netlify Forms.
  formEndpoint: env.VITE_FORM_ENDPOINT || '',
  netlifyFormName: 'orcamento',
};

export const navLinks = [
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Processo', href: '#processo' },
  { label: 'Contato', href: '#contato' },
];

export const differentials = [
  { title: 'Design exclusivo', text: 'Nada de templates. Cada layout nasce para a sua marca.' },
  { title: 'Desenvolvimento personalizado', text: 'Código feito sob medida para o que o seu projeto precisa.' },
  { title: 'Sites responsivos', text: 'Experiência impecável no celular, tablet e computador.' },
  { title: 'Navegação moderna', text: 'Animações, microinterações e fluidez em cada rolagem.' },
  { title: 'Performance e otimização', text: 'Carregamento rápido e boas práticas desde a primeira linha.' },
  { title: 'Atendimento direto', text: 'Você fala com quem desenvolve. Sem intermediários.' },
];

// icon: chave do ícone em src/components/Icons.jsx
export const services = [
  {
    id: 'landing',
    icon: 'landing',
    title: 'Landing Pages',
    text: 'Páginas modernas e estratégicas para apresentar produtos, serviços e converter visitantes em clientes.',
  },
  {
    id: 'portfolio',
    icon: 'portfolio',
    title: 'Portfólios Digitais',
    text: 'Apresente seus trabalhos, habilidades e projetos com uma identidade profissional.',
  },
  {
    id: 'loja',
    icon: 'store',
    title: 'Lojas Virtuais',
    text: 'Soluções digitais para apresentar e comercializar produtos online.',
  },
  {
    id: 'empresarial',
    icon: 'company',
    title: 'Sites Empresariais',
    text: 'Uma presença digital profissional para fortalecer sua empresa.',
  },
  {
    id: 'personalizado',
    icon: 'custom',
    title: 'Projetos Personalizados',
    text: 'Desenvolvimento de experiências digitais exclusivas de acordo com as necessidades do cliente.',
  },
];

export const projectTypes = [
  ...services.map((s) => ({ value: s.id, label: s.title })),
  { value: 'outro', label: 'Outro / ainda não sei' },
];

export const budgetRanges = [
  'Até R$ 1.000',
  'R$ 1.000 a R$ 3.000',
  'R$ 3.000 a R$ 6.000',
  'Acima de R$ 6.000',
  'Ainda não sei',
];

// ------------------------------------------------------------
//  PORTFÓLIO
//  Os itens abaixo são DEMONSTRAÇÕES (demo: true) e aparecem
//  identificados como tal. Para cadastrar um projeto real:
//   - demo: false
//   - name, category, description, tags
//   - image: '/projetos/meu-site.webp'  (coloque o arquivo em /public/projetos)
//   - url: 'https://site-do-cliente.com'
// ------------------------------------------------------------
export const projects = [
  {
    id: 'demo-barber',
    demo: true,
    name: 'NOIR Barber Club',
    category: 'Landing page · Barbearia',
    description:
      'Marca fictícia criada para demonstração. Landing page de barbearia premium com tabela de serviços, planos de assinatura e agendamento direto pelo WhatsApp.',
    features: ['Hero com chamada para agendamento', 'Tabela de serviços e preços', 'Planos mensais', 'Botão fixo de WhatsApp'],
    tags: ['Landing page', 'Conversão', 'Mobile first'],
    image: null,
    url: null,
    variant: 'barber',
    domain: 'noirbarber.demo',
  },
  {
    id: 'demo-store',
    demo: true,
    name: 'AURUM Store',
    category: 'Loja virtual · Moda',
    description:
      'Marca fictícia criada para demonstração. Loja de roupas com vitrine de coleção, categorias, carrinho e benefícios de compra em destaque.',
    features: ['Vitrine de produtos com preço', 'Categorias e busca', 'Carrinho e selo de frete', 'Banner de coleção animado'],
    tags: ['E-commerce', 'Catálogo', 'UI premium'],
    image: null,
    url: null,
    variant: 'store',
    domain: 'aurumstore.demo',
  },
  {
    id: 'demo-lens',
    demo: true,
    name: 'LENS Studio',
    category: 'Portfólio · Fotografia',
    description:
      'Marca fictícia criada para demonstração. Portfólio de fotógrafo com galeria em mosaico, categorias de ensaio e formulário de contato.',
    features: ['Galeria em mosaico', 'Filtro por categoria', 'Página sobre', 'Contato rápido'],
    tags: ['Portfólio', 'Galeria', 'Animações'],
    image: null,
    url: null,
    variant: 'portfolio',
    domain: 'lensstudio.demo',
  },
  {
    id: 'demo-vertice',
    demo: true,
    name: 'VÉRTICE Engenharia',
    category: 'Site empresarial · Construção',
    description:
      'Marca fictícia criada para demonstração. Site institucional com áreas de atuação, números da empresa, projetos e canal de orçamento.',
    features: ['Página institucional', 'Áreas de atuação', 'Galeria de obras', 'Formulário de orçamento'],
    tags: ['Institucional', 'SEO', 'Responsivo'],
    image: null,
    url: null,
    variant: 'company',
    domain: 'vertice.demo',
  },
];

export const steps = [
  { n: '01', title: 'SUA IDEIA', text: 'Você apresenta o que deseja, suas referências e objetivos.' },
  { n: '02', title: 'PLANEJAMENTO', text: 'Definimos a estrutura, identidade visual e funcionalidades.' },
  { n: '03', title: 'DESENVOLVIMENTO', text: 'Transformamos o planejamento em um site moderno e funcional.' },
  { n: '04', title: 'ENTREGA', text: 'Seu projeto é finalizado, testado e preparado para publicação.' },
];
