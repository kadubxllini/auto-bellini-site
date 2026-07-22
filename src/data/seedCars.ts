import type { Car } from '../types/car';

export const SEED_CARS: Car[] = [
  {
    id: 'car-bellini-01',
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
    id: 'car-bellini-02',
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
    id: 'car-bellini-03',
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
    features: ['Wi-Fi Embarcado', 'OnStar Integrado', 'Sensor de Estacionamento 360°', 'Park Assist (Estacionamento Aut.)', 'Chave Presencial', 'Bancos Bicolores'],
    featured: false,
    status: 'Disponível',
    createdAt: '2026-07-10T11:15:00Z'
  },
  {
    id: 'car-bellini-04',
    brand: 'Volkswagen',
    model: 'Amarok',
    version: '3.0 V6 TDI Diesel Highline 4x4 Aut.',
    yearModel: '2021/2021',
    mileage: 52000,
    price: 199900,
    fuel: 'Diesel',
    transmission: 'Automático',
    color: 'Preto Mitico',
    plateEnd: '9',
    photos: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop'
    ],
    shopcarUrl: 'https://www.shopcar.com.br/loja.php?loja=788',
    features: ['Tração Integral 4Motion', 'Motor V6 258cv', 'Capota Marítima', 'Protetor de Caçamba', 'Bancos em Couro com Ajuste Elétrico', 'Engate de Reboque'],
    featured: true,
    status: 'Disponível',
    createdAt: '2026-07-12T16:00:00Z'
  },
  {
    id: 'car-bellini-05',
    brand: 'Honda',
    model: 'Civic',
    version: '2.0 EXL 16V Flex Automatico CVT',
    yearModel: '2020/2020',
    mileage: 46000,
    price: 112900,
    fuel: 'Flex',
    transmission: 'Automático',
    color: 'Branco Estelar',
    plateEnd: '1',
    photos: [
      'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=1200&auto=format&fit=crop'
    ],
    shopcarUrl: 'https://www.shopcar.com.br/loja.php?loja=788',
    features: ['Câmbio CVT 7 Marchas', 'Ar Digital Dual Zone', 'Bancos em Couro', 'Central Apple CarPlay / Android Auto', 'Faróis de Neblina LED'],
    featured: false,
    status: 'Disponível',
    createdAt: '2026-07-15T09:20:00Z'
  },
  {
    id: 'car-bellini-06',
    brand: 'Fiat',
    model: 'Toro',
    version: '1.3 Turbo Flex Endurance Aut.',
    yearModel: '2022/2022',
    mileage: 31000,
    price: 119900,
    fuel: 'Flex',
    transmission: 'Automático',
    color: 'Vermelho Colorado',
    plateEnd: '5',
    photos: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200&auto=format&fit=crop'
    ],
    shopcarUrl: 'https://www.shopcar.com.br/loja.php?loja=788',
    features: ['Motor Turbo T270', 'Capota Marítima', 'Central Multimídia 7"', 'Sensor de Ré com Câmera', 'Controle de Estabilidade TC+'],
    featured: false,
    status: 'Disponível',
    createdAt: '2026-07-18T13:45:00Z'
  },
  {
    id: 'car-bellini-07',
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
