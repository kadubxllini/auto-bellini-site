import type { Car } from '../types/car';

export const SEED_CARS: Car[] = [
  {
    id: '1623301',
    brand: 'Toyota',
    model: 'Corolla',
    version: '2.0 XEi 16V Flex Automatico',
    yearModel: '2022/2022',
    mileage: 38500,
    price: 124900,
    fuel: 'Flex',
    transmission: 'Automático',
    color: 'Prata Nevoa',
    plateEnd: '4',
    photos: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop'
    ],
    shopcarUrl: 'https://www.shopcar.com.br/loja.php?loja=788',
    features: ['Ar Condicionado Digital', 'Freios ABS', 'Airbag Duplo e Lateral', 'Bancos em Couro', 'Central Multimídia', 'Piloto Automático', 'Rodas de Liga Leve R17'],
    featured: true,
    status: 'Disponível',
    createdAt: '2026-07-01T10:00:00Z'
  },
  {
    id: '1623302',
    brand: 'Jeep',
    model: 'Compass',
    version: '1.3 T270 Turbo Flex Limited Aut.',
    yearModel: '2023/2023',
    mileage: 24000,
    price: 158900,
    fuel: 'Flex',
    transmission: 'Automático',
    color: 'Branco Polar',
    plateEnd: '7',
    photos: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop'
    ],
    shopcarUrl: 'https://www.shopcar.com.br/loja.php?loja=788',
    features: ['Painel 100% Digital', 'Teto Solar Panorâmico', 'Bancos de Couro', 'Central Multimídia 10.1"', 'Carregador por Indução', 'Faróis Full LED', 'Assistente de Permanência em Faixa'],
    featured: true,
    status: 'Disponível',
    createdAt: '2026-07-05T14:30:00Z'
  },
  {
    id: '1623303',
    brand: 'Chevrolet',
    model: 'Onix',
    version: '1.0 Turbo Flex Premier Aut.',
    yearModel: '2023/2023',
    mileage: 18900,
    price: 84900,
    fuel: 'Flex',
    transmission: 'Automático',
    color: 'Cinza Drake',
    plateEnd: '2',
    photos: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop'
    ],
    shopcarUrl: 'https://www.shopcar.com.br/loja.php?loja=788',
    features: ['OnStar', 'Wi-Fi Naútico Integrado', 'Assistente de Estacionamento', 'Chave Presencial', 'Bancos de Couro Bi-Tom'],
    featured: false,
    status: 'Disponível',
    createdAt: '2026-07-08T09:15:00Z'
  },
  {
    id: '1623304',
    brand: 'Volkswagen',
    model: 'Nivus',
    version: 'Highline 200 TSI Flex Automatico',
    yearModel: '2023/2024',
    mileage: 12500,
    price: 119900,
    fuel: 'Flex',
    transmission: 'Automático',
    color: 'Cinza Moonstone',
    plateEnd: '9',
    photos: [
      'https://images.unsplash.com/photo-1541348263662-e068662d82af?q=80&w=1200&auto=format&fit=crop'
    ],
    shopcarUrl: 'https://www.shopcar.com.br/loja.php?loja=788',
    features: ['ACC (Controle Adaptativo)', 'Frenagem Autônoma de Emergência', 'Painel Active Info Display', 'VW Play 10"', 'Rodas R17 escurecidas'],
    featured: true,
    status: 'Disponível',
    createdAt: '2026-07-10T16:45:00Z'
  },
  {
    id: '1623305',
    brand: 'Hyundai',
    model: 'Creta',
    version: '1.0 TGDI Flex Ultimate Aut.',
    yearModel: '2024/2024',
    mileage: 8200,
    price: 139900,
    fuel: 'Flex',
    transmission: 'Automático',
    color: 'Preto Onix',
    plateEnd: '5',
    photos: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop'
    ],
    shopcarUrl: 'https://www.shopcar.com.br/loja.php?loja=788',
    features: ['Câmera 360 Graus', 'Teto Solar Elétrico', 'Bancos com Ventilação', 'SmartSense completo'],
    featured: false,
    status: 'Disponível',
    createdAt: '2026-07-12T11:20:00Z'
  },
  {
    id: '1623306',
    brand: 'Honda',
    model: 'Civic',
    version: '2.0 EXL 16V Flex Automatico',
    yearModel: '2021/2021',
    mileage: 45000,
    price: 118900,
    fuel: 'Flex',
    transmission: 'CVT',
    color: 'Branco Estelar',
    plateEnd: '1',
    photos: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=1200&auto=format&fit=crop'
    ],
    shopcarUrl: 'https://www.shopcar.com.br/loja.php?loja=788',
    features: ['Faróis de Neblina LED', 'Bancos de Couro', 'Ar Digital Dual Zone', 'Freio de Mão Eletrônico com Auto Hold'],
    featured: false,
    status: 'Disponível',
    createdAt: '2026-07-15T08:00:00Z'
  },
  {
    id: '1623307',
    brand: 'BMW',
    model: '320i',
    version: '2.0 Turbo Flex GP Automatico',
    yearModel: '2024/2024',
    mileage: 9500,
    price: 279900,
    fuel: 'Flex',
    transmission: 'Automático',
    color: 'Azul Portimao',
    plateEnd: '0',
    photos: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop'
    ],
    shopcarUrl: 'https://www.shopcar.com.br/loja.php?loja=788',
    features: ['BMW Curved Display', 'Assistente Virtual Hey BMW', 'Teto Solar Elétrico', 'Som Premium Hi-Fi', 'Faróis Full LED Adaptativos', 'Tracionamento Traseiro'],
    featured: true,
    status: 'Disponível',
    createdAt: '2026-07-20T08:00:00Z'
  }
];
