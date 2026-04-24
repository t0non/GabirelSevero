import { Product, Category, Testimonial } from './types';

export const CATEGORIES: Category[] = [
  { id: 'astronauta', name: 'Astronauta', image: 'https://files.catbox.moe/gqt7b9.png' },
  { id: 'bailarina', name: 'Bailarina', image: 'https://files.catbox.moe/vk4481.png' },
  { id: 'dinossauro', name: 'Dinossauros', image: 'https://files.catbox.moe/ibsvow.png' },
  { id: 'fundo-do-mar', name: 'Fundo do Mar', image: 'https://files.catbox.moe/6m5rmw.png' },
  { id: 'ursinho', name: 'Ursinho', image: 'https://files.catbox.moe/9ieu9a.png' },
  { id: 'safari', name: 'Safari', image: 'https://files.catbox.moe/zsf29p.png' },
];

export const BEST_SELLERS: Product[] = [
  {
    id: '1',
    name: 'Arquivo Digital Completo - Astronauta (PDF)',
    price: 49.90,
    originalPrice: 89.00,
    image: 'https://files.catbox.moe/gqt7b9.png',
    tag: 'Download Imediato',
    category: 'Kits Digitais',
    theme: 'astronauta',
    colorCodes: ['#1e2a5e', '#c0c0c0', '#000000'],
    detailedDescription: 'Pack completo em alta resolução para imprimir em casa. Inclui artes de bandeirolas, topos de bolo, forminhas, totens de mesa e convites. Formatos: PDF e Studio (Silhouette).'
  },
  {
    id: '2',
    name: 'Kit Digital Painel e Mesa - Bailarina',
    price: 35.90,
    originalPrice: 55.00,
    image: 'https://files.catbox.moe/vk4481.png',
    tag: 'Mais Baixado',
    category: 'Kits Digitais',
    theme: 'bailarina',
    colorCodes: ['#f3a6ab', '#ffffff', '#ffd700'],
    detailedDescription: 'Artes prontas para impressão em tamanho A3/A4. Economize fazendo você mesma a decoração do seu sonho.'
  },
  {
    id: '3',
    name: 'Arquivo Especial - Dinossauros Kids',
    price: 29.90,
    image: 'https://files.catbox.moe/ibsvow.png',
    tag: 'Fácil Impressão',
    category: 'Kits Digitais',
    theme: 'dinossauro',
    colorCodes: ['#4ade80', '#92400e', '#f97316'],
    detailedDescription: 'O rugido mais fofo do mundo Jurássico em arquivos vetorizados para não perder qualidade.'
  },
  {
    id: '4',
    name: 'Combo Lembrancinhas - Astronauta (10 moldes)',
    price: 39.90,
    image: 'https://files.catbox.moe/gqt7b9.png',
    category: 'Moldes e Caixas',
    theme: 'astronauta',
    colorCodes: ['#1e2a5e', '#c0c0c0', '#000000'],
    detailedDescription: '10 moldes diferentes de caixinhas (Milk, Pirâmide, Sushi) para você imprimir e montar.'
  },
  {
    id: '5',
    name: 'Mega Pack Digital - Fundo do Mar',
    price: 69.00,
    image: 'https://files.catbox.moe/6m5rmw.png',
    tag: 'Super Oferta',
    category: 'Kits Digitais',
    theme: 'fundo-do-mar',
    colorCodes: ['#a8b590', '#32c9e6', '#ff9f43'],
    detailedDescription: 'Mais de 100 elementos digitais, papéis de parede e ícones para criar sua decoração personalizada.'
  },
  {
    id: '6',
    name: 'Topinhos e Toppers - Ursinho Baloeiro',
    price: 19.90,
    image: 'https://files.catbox.moe/9ieu9a.png',
    category: 'Topos e Tags',
    theme: 'ursinho',
    colorCodes: ['#74b9ff', '#8d6e63', '#ffffff'],
    detailedDescription: 'Arquivos em camadas (scrap) para topos de bolo maravilhosos.'
  },
  {
    id: '7',
    name: 'Kit Imprima e Monte - Safari Baby',
    price: 45.00,
    image: 'https://files.catbox.moe/zsf29p.png',
    category: 'Kits Digitais',
    theme: 'safari',
    colorCodes: ['#2e7d32', '#fbc02d', '#e67e22'],
    detailedDescription: 'Tema Safari Baby com bichinhos fofos em artes prontas para imprimir em qualquer impressora caseira.'
  },
  {
    id: '8',
    name: 'Convite Editável - Bailarina (Canva)',
    price: 15.00,
    image: 'https://files.catbox.moe/vk4481.png',
    category: 'Editáveis',
    theme: 'bailarina',
    colorCodes: ['#f3a6ab', '#ffffff', '#ffd700'],
    detailedDescription: 'Convite digital editável direto no Canva. Altere nome, data e local em segundos.'
  }
];

export const ALL_PRODUCTS = [...BEST_SELLERS];

export const TESTIMONIALS: any[] = [
  {
    id: '1',
    image: 'https://files.catbox.moe/g1gsns.jpg',
  },
  {
    id: '2',
    image: 'https://files.catbox.moe/g1gsns.jpg',
  },
  {
    id: '3',
    image: 'https://files.catbox.moe/g1gsns.jpg',
  },
  {
    id: '4',
    image: 'https://files.catbox.moe/g1gsns.jpg',
  },
  {
    id: '5',
    image: 'https://files.catbox.moe/g1gsns.jpg',
  },
  {
    id: '6',
    image: 'https://files.catbox.moe/g1gsns.jpg',
  }
];
