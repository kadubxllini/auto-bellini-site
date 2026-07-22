import React, { useState, useEffect } from 'react';
import { useCars } from '../../context/CarContext';
import type { FuelType, TransmissionType } from '../../types/car';
import { X, CarFront, Save, Download, Loader2, Sparkles, CheckCircle2, AlertCircle, Trash2, Plus, Image as ImageIcon, Star } from 'lucide-react';
import { DEFAULT_SHOPCAR_URL } from '../../services/carService';
import { shopcarScraperService } from '../../services/shopcarScraperService';

export const AdminCarModal: React.FC = () => {
  const { isCarModalOpen, setIsCarModalOpen, editingCar, setEditingCar, addCar, updateCar } = useCars();

  const [brand, setBrand] = useState('');
  const [version, setVersion] = useState('');
  const [yearModel, setYearModel] = useState('');
  const [mileageText, setMileageText] = useState<string>('');
  const [priceText, setPriceText] = useState<string>('');
  const [fuel, setFuel] = useState<FuelType>('Flex');
  const [transmission, setTransmission] = useState<TransmissionType>('Automático');
  const [color, setColor] = useState('');
  const [plateEnd, setPlateEnd] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [shopcarUrl, setShopcarUrl] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [description, setDescription] = useState('');
  const [featured, setFeatured] = useState(false);

  // Estados de importação do Shopcar
  const [shopcarImportInput, setShopcarImportInput] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [showRawHtmlInput, setShowRawHtmlInput] = useState(false);
  const [rawHtmlText, setRawHtmlText] = useState('');
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });

  useEffect(() => {
    if (editingCar) {
      setBrand(editingCar.brand);
      setVersion(editingCar.version);
      setYearModel(editingCar.yearModel);
      setMileageText(editingCar.mileage !== undefined && editingCar.mileage !== null ? String(editingCar.mileage) : '');
      setPriceText(editingCar.price ? String(editingCar.price) : '');
      setFuel(editingCar.fuel);
      setTransmission(editingCar.transmission);
      setColor(editingCar.color);
      setPlateEnd(editingCar.plateEnd);
      setPhotos(editingCar.photos && editingCar.photos.length > 0 ? editingCar.photos : []);
      setShopcarUrl(editingCar.shopcarUrl || '');
      setFeaturesText(editingCar.features ? editingCar.features.join(', ') : '');
      setDescription(editingCar.description || '');
      setFeatured(editingCar.featured || false);
    } else {
      setBrand('');
      setVersion('');
      setYearModel('');
      setMileageText('');
      setPriceText('');
      setFuel('Flex');
      setTransmission('Automático');
      setColor('');
      setPlateEnd('');
      setPhotos([]);
      setShopcarUrl('');
      setFeaturesText('');
      setDescription('');
      setFeatured(false);
      setShopcarImportInput('');
      setRawHtmlText('');
      setShowRawHtmlInput(false);
      setImportStatus({ type: null, message: '' });
    }
  }, [editingCar, isCarModalOpen]);

  if (!isCarModalOpen) return null;

  const handleImportFromShopcar = async () => {
    if (!shopcarImportInput.trim()) {
      setImportStatus({
        type: 'error',
        message: 'Cole o link do anúncio do Shopcar primeiro.'
      });
      return;
    }

    setIsImporting(true);
    setImportStatus({ type: null, message: '' });

    try {
      const scraped = await shopcarScraperService.scrapeCarFromUrl(shopcarImportInput.trim());
      
      if (scraped.brand) setBrand(scraped.brand);
      if (scraped.version) setVersion(scraped.version);
      if (scraped.yearModel) setYearModel(scraped.yearModel);
      if (scraped.price) setPriceText(String(scraped.price));
      setMileageText(scraped.mileage !== undefined && scraped.mileage !== null ? String(scraped.mileage) : '');
      if (scraped.fuel) setFuel(scraped.fuel);
      if (scraped.transmission) setTransmission(scraped.transmission);
      if (scraped.color) setColor(scraped.color);
      if (scraped.description) setDescription(scraped.description);
      
      // IMPORTA TODAS AS FOTOS DA GALERIA DO SHOPCAR
      if (scraped.photos && scraped.photos.length > 0) {
        setPhotos(scraped.photos);
      }

      if (scraped.shopcarUrl) setShopcarUrl(scraped.shopcarUrl);
      if (scraped.features) setFeaturesText(scraped.features.join(', '));

      setImportStatus({
        type: 'success',
        message: `Sucesso! Importadas ${scraped.photos?.length || 0} fotos e dados do Shopcar. Revise os campos abaixo.`
      });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao importar dados do Shopcar.';
      setImportStatus({
        type: 'error',
        message: errorMsg
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleImportFromRawHtml = () => {
    if (!rawHtmlText.trim()) {
      setImportStatus({
        type: 'error',
        message: 'Cole o código HTML ou texto da página do Shopcar primeiro.'
      });
      return;
    }

    try {
      const scraped = shopcarScraperService.parseShopcarHtml(rawHtmlText.trim(), shopcarImportInput || DEFAULT_SHOPCAR_URL);
      if (scraped.brand) setBrand(scraped.brand);
      if (scraped.version) setVersion(scraped.version);
      if (scraped.yearModel) setYearModel(scraped.yearModel);
      if (scraped.price) setPriceText(String(scraped.price));
      setMileageText(scraped.mileage !== undefined && scraped.mileage !== null ? String(scraped.mileage) : '');
      if (scraped.fuel) setFuel(scraped.fuel);
      if (scraped.transmission) setTransmission(scraped.transmission);
      if (scraped.color) setColor(scraped.color);
      if (scraped.description) setDescription(scraped.description);
      if (scraped.photos && scraped.photos.length > 0) setPhotos(scraped.photos);
      if (scraped.features) setFeaturesText(scraped.features.join(', '));

      setImportStatus({
        type: 'success',
        message: `Sucesso! Extraídas ${scraped.photos?.length || 0} fotos e dados do texto.`
      });
      setShowRawHtmlInput(false);
    } catch {
      setImportStatus({
        type: 'error',
        message: 'Erro ao extrair dados do código colado.'
      });
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSetCoverPhoto = (index: number) => {
    if (index === 0) return;
    setPhotos(prev => {
      const newArr = [...prev];
      const [selected] = newArr.splice(index, 1);
      newArr.unshift(selected);
      return newArr;
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotos(prev => [event.target!.result as string, ...prev]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const featuresArray = featuresText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const photosList = photos.length > 0
      ? photos
      : ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop'];

    const parsedMileage = mileageText.trim() === '' 
      ? undefined 
      : (isNaN(Number(mileageText)) ? undefined : Number(mileageText));

    const parsedPrice = priceText.trim() === '' ? 0 : (isNaN(Number(priceText)) ? 0 : Number(priceText));

    const carData = {
      brand: brand.trim(),
      model: version.trim(),
      version: version.trim(),
      yearModel: yearModel.trim(),
      mileage: parsedMileage,
      price: parsedPrice,
      fuel,
      transmission,
      color: color.trim(),
      plateEnd: plateEnd.trim(),
      photos: photosList,
      shopcarUrl: shopcarUrl.trim(),
      features: featuresArray,
      description: description.trim(),
      featured,
      status: 'Disponível' as const
    };

    if (editingCar) {
      updateCar(editingCar.id, carData);
    } else {
      addCar(carData);
    }

    setIsCarModalOpen(false);
    setEditingCar(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-8">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-red-600">
          <div className="flex items-center gap-2">
            <CarFront className="w-5 h-5 text-red-500" />
            <h3 className="font-extrabold text-base">
              {editingCar ? 'Editar Anúncio de Carro' : 'Cadastrar Novo Anúncio de Carro'}
            </h3>
          </div>
          <button
            onClick={() => {
              setIsCarModalOpen(false);
              setEditingCar(null);
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Shopcar Auto-Importer Section (Disponível na Criação e Edição) */}
          <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-red-950 p-4 rounded-xl text-white shadow-md border border-blue-800/40">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <h4 className="text-xs font-black uppercase tracking-wider text-blue-200">
                {editingCar ? 'Puxar/Atualizar Dados do Shopcar MS' : 'Importar Anúncio Direto do Shopcar MS'}
              </h4>
            </div>
              <p className="text-xs text-slate-300 mb-3">
                Cole o link do carro anunciado no Shopcar MS para puxar <strong>TODAS AS FOTOS</strong> e dados automaticamente:
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  value={shopcarImportInput}
                  onChange={e => setShopcarImportInput(e.target.value)}
                  placeholder="https://www.shopcar.com.br/veiculos/..."
                  className="flex-1 px-3.5 py-2 bg-slate-900/90 border border-slate-700 rounded-lg text-xs font-medium text-white placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
                <button
                  type="button"
                  onClick={handleImportFromShopcar}
                  disabled={isImporting}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs rounded-lg transition-all shadow"
                >
                  {isImporting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Buscando...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-white" />
                      <span>Puxar Dados e Fotos</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex justify-between items-center mt-2">
                <button
                  type="button"
                  onClick={() => setShowRawHtmlInput(!showRawHtmlInput)}
                  className="text-[11px] text-blue-300 hover:text-white underline font-medium transition-colors"
                >
                  {showRawHtmlInput ? 'Ocultar colar texto' : 'Não funcionou por link? Cole o texto da página aqui'}
                </button>
              </div>

              {/* Textarea Backup Import */}
              {showRawHtmlInput && (
                <div className="mt-3 space-y-2 pt-2 border-t border-slate-700/50">
                  <p className="text-[11px] text-slate-300">
                    Acesse o anúncio no Shopcar, pressione <kbd className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">Ctrl + A</kbd> para selecionar tudo, <kbd className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">Ctrl + C</kbd> para copiar e cole abaixo:
                  </p>
                  <textarea
                    rows={4}
                    value={rawHtmlText}
                    onChange={e => setRawHtmlText(e.target.value)}
                    placeholder="Cole todo o texto da página do Shopcar aqui..."
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-red-500"
                  />
                  <button
                    type="button"
                    onClick={handleImportFromRawHtml}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-colors shadow"
                  >
                    Extrair Dados do Texto Colado
                  </button>
                </div>
              )}

              {/* Status Message */}
              {importStatus.type === 'success' && (
                <div className="mt-3 flex items-start gap-2 p-2.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded-lg text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{importStatus.message}</span>
                </div>
              )}
              {importStatus.type === 'error' && (
                <div className="mt-3 flex items-start gap-2 p-2.5 bg-rose-950/80 border border-rose-500/40 text-rose-300 rounded-lg text-xs">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{importStatus.message}</span>
                </div>
              )}
            </div>

          {/* Dados Principais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Marca <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={brand}
                onChange={e => setBrand(e.target.value)}
                placeholder=""
                required
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Versão Completa / Título do Anúncio <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={version}
                onChange={e => setVersion(e.target.value)}
                placeholder=""
                required
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Preço (R$) <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                value={priceText}
                onChange={e => setPriceText(e.target.value)}
                placeholder=""
                required
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Ano/Modelo
              </label>
              <input
                type="text"
                value={yearModel}
                onChange={e => setYearModel(e.target.value)}
                placeholder=""
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Quilometragem (KM)
              </label>
              <input
                type="number"
                value={mileageText}
                onChange={e => setMileageText(e.target.value)}
                placeholder=""
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Combustível
              </label>
              <select
                value={fuel}
                onChange={e => setFuel(e.target.value as FuelType)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                <option value="Flex">Flex</option>
                <option value="Gasolina">Gasolina</option>
                <option value="Diesel">Diesel</option>
                <option value="Híbrido">Híbrido</option>
                <option value="Elétrico">Elétrico</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Câmbio
              </label>
              <select
                value={transmission}
                onChange={e => setTransmission(e.target.value as TransmissionType)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                <option value="Automático">Automático</option>
                <option value="CVT">CVT</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Cor
              </label>
              <input
                type="text"
                value={color}
                onChange={e => setColor(e.target.value)}
                placeholder=""
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Link do Anúncio no Shopcar
            </label>
            <input
              type="url"
              value={shopcarUrl}
              onChange={e => setShopcarUrl(e.target.value)}
              placeholder="https://www.shopcar.com.br/veiculos/..."
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          {/* GALERIA DE FOTOS DO VEÍCULO */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-blue-600" />
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Galeria de Fotos ({photos.length} foto{photos.length === 1 ? '' : 's'})
                </label>
              </div>
              {photos.length > 0 && (
                <span className="text-[11px] text-slate-500 font-semibold">
                  A 1ª foto é a Capa do anúncio
                </span>
              )}
            </div>

            {/* Upload de Imagem Local */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-slate-500 font-semibold">Adicionar foto do computador:</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"
              />
            </div>

            {/* Grade de Fotos (Thumbnails) */}
            {photos.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-2">
                {photos.map((photo, idx) => (
                  <div
                    key={idx}
                    className={`relative group rounded-xl overflow-hidden border-2 bg-slate-900 aspect-video shadow-sm transition-all ${
                      idx === 0 ? 'border-red-600 ring-2 ring-red-500/20' : 'border-slate-200 hover:border-blue-400'
                    }`}
                  >
                    <img src={photo} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                    
                    {/* Badge Capa */}
                    {idx === 0 && (
                      <span className="absolute top-1 left-1 bg-red-600 text-white font-black text-[9px] px-1.5 py-0.5 rounded shadow uppercase tracking-wider">
                        CAPA
                      </span>
                    )}

                    {/* Botão Tornar Capa (se não for a 0) */}
                    {idx > 0 && (
                      <button
                        type="button"
                        onClick={() => handleSetCoverPhoto(idx)}
                        title="Tornar Foto Capa"
                        className="absolute bottom-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/90 text-white hover:text-amber-400 p-1 rounded-md text-[10px] flex items-center gap-0.5"
                      >
                        <Star className="w-3 h-3" />
                      </button>
                    )}

                    {/* Botão Remover Foto */}
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      title="Excluir Foto"
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 hover:bg-red-700 text-white p-1 rounded-md shadow"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center border-2 border-dashed border-slate-200 rounded-xl bg-white">
                <p className="text-xs text-slate-400 font-medium">Nenhuma foto adicionada ainda. Importe do Shopcar ou envie um arquivo acima.</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Itens de Série / Opcionais (separados por vírgula)
            </label>
            <input
              type="text"
              value={featuresText}
              onChange={e => setFeaturesText(e.target.value)}
              placeholder="Ar Condicionado, Freios ABS, Bancos em Couro, Teto Solar"
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Observações do Anunciante
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Ex: Único dono, revisões na concessionária, possui chave reserva e manual..."
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="featuredCheck"
              checked={featured}
              onChange={e => setFeatured(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="featuredCheck" className="text-xs font-bold text-slate-800 cursor-pointer">
              Destacar este veículo na página inicial (Selo DESTAQUE)
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => {
                setIsCarModalOpen(false);
                setEditingCar(null);
              }}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Anúncio ({photos.length} foto{photos.length === 1 ? '' : 's'})</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
