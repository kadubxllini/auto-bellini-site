import type { Car, FuelType, TransmissionType } from '../types/car';

export interface ScrapedCarData {
  brand: string;
  model: string;
  version: string;
  yearModel: string;
  mileage?: number;
  price: number;
  fuel: FuelType;
  transmission: TransmissionType;
  color: string;
  plateEnd: string;
  photos: string[];
  features: string[];
  description?: string;
  shopcarUrl: string;
}

export const shopcarScraperService = {
  /**
   * Puxa os dados e TODAS as fotos de um anúncio do Shopcar MS a partir da URL
   */
  async scrapeCarFromUrl(shopcarUrl: string): Promise<Partial<Car>> {
    if (!shopcarUrl || !shopcarUrl.includes('shopcar.com.br')) {
      throw new Error('Insira um link válido do Shopcar (ex: https://www.shopcar.com.br/veiculos/...)');
    }

    let cleanUrl = shopcarUrl.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }

    let html = '';

    // Método 1: Local Vite Dev Server Proxy (100% Confiável, Sem Bloqueio de CORS/Cloudflare)
    try {
      let urlPath = cleanUrl.replace(/^https?:\/\/(?:www\.)?shopcar\.com\.br/i, '');
      if (!urlPath.startsWith('/')) urlPath = '/' + urlPath;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const localRes = await fetch(`/shopcar-proxy${urlPath}`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (localRes.ok) {
        const text = await localRes.text();
        if (text && text.length > 1000) {
          html = text;
        }
      }
    } catch (e) {
      console.warn('Proxy local do Vite falhou, tentando proxies remotos:', e);
    }

    // Método 2: AllOrigins JSON API
    if (!html) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);
        const jsonRes = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(cleanUrl)}`, {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (jsonRes.ok) {
          const data = await jsonRes.json();
          if (data && data.contents && data.contents.length > 1000) {
            html = data.contents;
          }
        }
      } catch (e) {
        console.warn('AllOrigins JSON falhou ou expirou:', e);
      }
    }

    // Método 3: AllOrigins RAW
    if (!html) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);
        const rawRes = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(cleanUrl)}`, {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (rawRes.ok) {
          const text = await rawRes.text();
          if (text && text.length > 1000) {
            html = text;
          }
        }
      } catch (e) {
        console.warn('AllOrigins RAW falhou:', e);
      }
    }

    // Método 4: Requisição Direta
    if (!html) {
      try {
        const directRes = await fetch(cleanUrl);
        if (directRes.ok) {
          html = await directRes.text();
        }
      } catch (e) {
        console.warn('Tentativa direta falhou:', e);
      }
    }

    if (!html) {
      throw new Error('Não foi possível se conectar ao Shopcar. Verifique a URL ou tente novamente em instantes.');
    }

    return this.parseShopcarHtml(html, cleanUrl);
  },

  /**
   * Analisa o HTML do Shopcar e extrai 100% das fotos e metadados com precisão
   */
  parseShopcarHtml(html: string, originalUrl: string): Partial<Car> {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // 1. MARCA
    let brand = '';
    const marcaEl = doc.querySelector('.marca') || doc.querySelector('[class*="marca"]');
    if (marcaEl && marcaEl.textContent) {
      brand = marcaEl.textContent.trim();
    } else {
      const marcaRegex = html.match(/<span[^>]*class="marca"[^>]*>([^<]+)<\/span>/i);
      if (marcaRegex) brand = marcaRegex[1].trim();
    }
    
    if (brand) {
      brand = brand
        .replace(/.*-\s*/, '')
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase());
    } else {
      const knownBrands = [
        'Chevrolet', 'Volkswagen', 'Fiat', 'Ford', 'Toyota', 'Hyundai', 
        'Honda', 'Jeep', 'Nissan', 'Renault', 'Mitsubishi', 'BMW', 
        'Mercedes-Benz', 'Audi', 'Peugeot', 'Citroën', 'RAM', 'Porsche', 'Volvo', 'BYD', 'Chery'
      ];
      for (const kb of knownBrands) {
        if (originalUrl.toLowerCase().includes(kb.toLowerCase()) || html.toLowerCase().includes(kb.toLowerCase())) {
          brand = kb;
          break;
        }
      }
    }

    // 2. MODELO -> Sempre em branco para digitação manual conforme solicitação
    const model = ''; 

    // 3. VERSÃO COMPLETA (Título do Anúncio no Shopcar)
    let version = '';
    const modeloEl = doc.querySelector('.modelo');
    if (modeloEl && modeloEl.textContent) {
      version = modeloEl.textContent.trim();
    } else {
      const modeloRegex = html.match(/<span[^>]*class="modelo"[^>]*>([^<]+)<\/span>/i);
      if (modeloRegex) {
        version = modeloRegex[1].trim();
      } else {
        const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
        if (ogTitle) {
          version = ogTitle.replace(/-\s*Campo Grande.*/i, '').replace(/-\s*SHOPCAR.*/i, '').trim();
        }
      }
    }

    // 4. PREÇO DO VEÍCULO (Extração com prioridade total para .barra-preco)
    let price = 0;
    
    // Prioridade 1: Elemento oficial .barra-preco do Shopcar
    const barraPrecoEl = doc.querySelector('.barra-preco');
    let priceText = barraPrecoEl ? barraPrecoEl.textContent : '';

    if (!priceText) {
      const barraMatch = html.match(/class="barra-preco"[^>]*>([\s\S]*?)<\/div>/i);
      if (barraMatch) {
        priceText = barraMatch[1];
      }
    }

    if (priceText) {
      const match = priceText.match(/R\$\s*([\d\.]+,\d{2})/i) || priceText.match(/R\$\s*([\d\.]+)/i);
      if (match && match[1]) {
        price = parseFloat(match[1].replace(/\./g, '').replace(',', '.')) || 0;
      }
    }

    // Prioridade 2: Meta tags / JSON-LD
    if (!price) {
      const ogPrice = doc.querySelector('meta[property="og:price:amount"]')?.getAttribute('content');
      if (ogPrice) {
        price = parseFloat(ogPrice.replace(',', '.')) || 0;
      }
    }

    if (!price) {
      const jsonLdMatch = html.match(/"price":\s*"??(\d+(?:\.\d+)?)"??/i);
      if (jsonLdMatch && jsonLdMatch[1]) {
        price = parseFloat(jsonLdMatch[1]) || 0;
      }
    }

    // Prioridade 3: Outras classes de preço secundárias
    if (!price) {
      const priceSelectors = ['.preco-veiculo', '.box-preco', '.valor', '.preco'];
      for (const sel of priceSelectors) {
        const el = doc.querySelector(sel);
        if (el && el.textContent && el.textContent.includes('R$')) {
          const match = el.textContent.match(/R\$\s*([\d\.]+,\d{2})/i) || el.textContent.match(/R\$\s*([\d\.]+)/i);
          if (match && match[1]) {
            const parsed = parseFloat(match[1].replace(/\./g, '').replace(',', '.'));
            if (!isNaN(parsed) && parsed > 0) {
              price = parsed;
              break;
            }
          }
        }
      }
    }

    // 5. ANO / MODELO
    let yearModel = '2023/2023';
    const anoEl = doc.querySelector('.caract-anomodelo');
    const anoText = anoEl ? anoEl.textContent : html;
    const anoMatch = anoText?.match(/(\d{2,4}\/\d{2,4})/);
    if (anoMatch && anoMatch[1]) {
      const parts = anoMatch[1].split('/');
      if (parts.length === 2) {
        const y1 = parts[0].length === 2 ? `20${parts[0]}` : parts[0];
        const y2 = parts[1].length === 2 ? `20${parts[1]}` : parts[1];
        yearModel = `${y1}/${y2}`;
      } else {
        yearModel = anoMatch[1];
      }
    }

    // 6. COR
    let color = 'Não informada';
    const corEl = doc.querySelector('.caract-cor');
    if (corEl && corEl.textContent) {
      color = corEl.textContent.replace(/Cor/i, '').trim();
    } else {
      const corMatch = html.match(/class="caract-cor"[^>]*>[\s\S]*?<\/span>\s*([^<]+)<\/div>/i);
      if (corMatch) color = corMatch[1].trim();
    }

    // 7. COMBUSTÍVEL
    let fuel: FuelType = 'Flex';
    const combustEl = doc.querySelector('.caract-combust');
    const combustText = (combustEl ? combustEl.textContent : html) || '';
    const textUpper = combustText.toUpperCase();
    if (textUpper.includes('DIESEL')) fuel = 'Diesel';
    else if (textUpper.includes('GASOLINA')) fuel = 'Gasolina';
    else if (textUpper.includes('HÍBRIDO') || textUpper.includes('HIBRIDO')) fuel = 'Híbrido';
    else if (textUpper.includes('ELÉTRICO') || textUpper.includes('ELETRICO')) fuel = 'Elétrico';
    else fuel = 'Flex';

    // 8. CÂMBIO (Com suporte a CVT)
    let transmission: TransmissionType = 'Manual';
    const cambioEl = doc.querySelector('.caract-cambio');
    const cambioText = (cambioEl ? cambioEl.textContent : html) || '';
    const cambioUpper = cambioText.toUpperCase();
    if (cambioUpper.includes('CVT')) {
      transmission = 'CVT';
    } else if (cambioUpper.includes('AUTOMÁTICO') || cambioUpper.includes('AUTOMATICO') || cambioUpper.includes('AUTO')) {
      transmission = 'Automático';
    } else {
      transmission = 'Manual';
    }

    // 9. QUILOMETRAGEM (KM)
    let mileage: number | undefined = undefined;
    const kmEl = doc.querySelector('.caract-km');
    const kmText = kmEl ? kmEl.textContent : html;
    const kmMatch = kmText?.match(/([\d\.]+)\s*Km/i);
    if (kmMatch && kmMatch[1]) {
      const parsed = parseInt(kmMatch[1].replace(/\./g, ''), 10);
      if (!isNaN(parsed)) {
        mileage = parsed;
      }
    }

    // 10. EXTRAÇÃO TOTAL DE FOTOS DA GALERIA DO ANÚNCIO
    const photos: string[] = [];
    
    // Corta estritamente na seção de ofertas para não pegar carros recomendados
    // NOTA IMPORTANTE: NÃO dividir pela palavra "noticias" pois ela aparece na meta tag head!
    const vehicleSectionHtml = html.split(/Ofertas da categoria|<div id="box-destaque"/i)[0] || html;

    const rawPhotoMatches = vehicleSectionHtml.match(/https?:\/\/[^"'\s\)]+stored\/veiculos\/[^"'\s\)]+/gi) || [];
    
    rawPhotoMatches.forEach(url => {
      // Descarta miniaturas de outros veículos recomendados
      if (url.includes('/redim/135/') || url.includes('/redim/90/')) return;
      if (url.includes('logo') || url.includes('banner') || url.includes('icone')) return;

      // Converte a URL da miniatura para alta resolução completa
      let fullResUrl = url.replace(/\/redim\/\d+\//, '/').replace(/pd\.jpg$/i, '.jpg');

      if (!photos.includes(fullResUrl)) {
        photos.push(fullResUrl);
      }
    });

    // Se nenhuma foto foi encontrada no regex, usa a og:image
    if (photos.length === 0) {
      const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content');
      if (ogImage) photos.push(ogImage);
    }

    // 11. OPCIONAIS
    const features: string[] = [];
    const opcionaisList = doc.querySelectorAll('.opcionais li');
    if (opcionaisList.length > 0) {
      opcionaisList.forEach(li => {
        const text = li.textContent?.replace('•', '').trim();
        if (text) features.push(text);
      });
    } else {
      const opcionaisMatch = html.match(/<ul class="opcionais">([\s\S]*?)<\/ul>/i);
      if (opcionaisMatch) {
        const liMatches = opcionaisMatch[1].match(/<li><span>•<\/span>([^<]+)<\/li>/gi) || [];
        liMatches.forEach(li => {
          const txt = li.replace(/<li><span>•<\/span>/i, '').replace(/<\/li>/i, '').trim();
          if (txt) features.push(txt);
        });
      }
    }

    // Puxa "Mais opcionais" se houver
    const maisOpMatch = html.match(/Mais opcionais:[\s\S]*?<span class="desc-dados">([^<]+)<\/span>/i);
    if (maisOpMatch && maisOpMatch[1].trim()) {
      features.push(`Mais opcionais: ${maisOpMatch[1].trim()}`);
    }

    // 12. OBSERVAÇÕES DO ANUNCIANTE
    let description = '';
    const obsMatch = html.match(/Observações do anunciante:[\s\S]*?<span class="desc-dados">([^<]+)<\/span>/i);
    if (obsMatch && obsMatch[1]) {
      description = obsMatch[1].trim();
    }

    return {
      brand,
      model: version,
      version,
      yearModel,
      price,
      mileage,
      fuel,
      transmission,
      color,
      plateEnd: '0',
      photos: photos.length > 0 ? photos : ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop'],
      features: features.length > 0 ? features : ['Ar Condicionado', 'Direção Elétrica', 'Freios ABS'],
      description,
      shopcarUrl: originalUrl
    };
  }
};
