import React, { useState, useEffect } from 'react';
import { useCars } from '../../context/CarContext';
import type { FuelType, TransmissionType } from '../../types/car';
import { X, CarFront, Save } from 'lucide-react';
import { DEFAULT_SHOPCAR_URL } from '../../services/carService';

export const AdminCarModal: React.FC = () => {
  const { isCarModalOpen, setIsCarModalOpen, editingCar, setEditingCar, addCar, updateCar } = useCars();

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [version, setVersion] = useState('');
  const [yearModel, setYearModel] = useState('');
  const [mileage, setMileage] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [fuel, setFuel] = useState<FuelType>('Flex');
  const [transmission, setTransmission] = useState<TransmissionType>('Automático');
  const [color, setColor] = useState('Prata');
  const [plateEnd, setPlateEnd] = useState('0');
  const [photoUrl, setPhotoUrl] = useState('');
  const [shopcarUrl, setShopcarUrl] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    if (editingCar) {
      setBrand(editingCar.brand);
      setModel(editingCar.model);
      setVersion(editingCar.version);
      setYearModel(editingCar.yearModel);
      setMileage(editingCar.mileage);
      setPrice(editingCar.price);
      setFuel(editingCar.fuel);
      setTransmission(editingCar.transmission);
      setColor(editingCar.color);
      setPlateEnd(editingCar.plateEnd);
      setPhotoUrl(editingCar.photos[0] || '');
      setShopcarUrl(editingCar.shopcarUrl || '');
      setFeaturesText(editingCar.features ? editingCar.features.join(', ') : '');
      setFeatured(editingCar.featured || false);
    } else {
      setBrand('');
      setModel('');
      setVersion('');
      setYearModel('2023/2023');
      setMileage(30000);
      setPrice(99900);
      setFuel('Flex');
      setTransmission('Automático');
      setColor('Prata');
      setPlateEnd('0');
      setPhotoUrl('');
      setShopcarUrl(DEFAULT_SHOPCAR_URL);
      setFeaturesText('Ar Condicionado, Freios ABS, Central Multimídia, Direção Elétrica');
      setFeatured(false);
    }
  }, [editingCar, isCarModalOpen]);

  if (!isCarModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const featuresArray = featuresText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const photosList = photoUrl.trim() 
      ? [photoUrl.trim()] 
      : ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop'];

    const carData = {
      brand: brand.trim() || 'Multimarcas',
      model: model.trim() || 'Veículo',
      version: version.trim() || '1.0 Flex',
      yearModel: yearModel.trim() || '2023/2023',
      mileage: Number(mileage) || 0,
      price: Number(price) || 0,
      fuel,
      transmission,
      color: color.trim() || 'Branco',
      plateEnd: plateEnd.trim() || '0',
      photos: photosList,
      shopcarUrl: shopcarUrl.trim() || DEFAULT_SHOPCAR_URL,
      features: featuresArray,
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-8">
        
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Marca <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={brand}
                onChange={e => setBrand(e.target.value)}
                placeholder="Ex: Toyota, Jeep, Honda, Chevrolet"
                required
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Modelo <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={model}
                onChange={e => setModel(e.target.value)}
                placeholder="Ex: Corolla, Compass, Civic, Onix"
                required
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Versão Completa
            </label>
            <input
              type="text"
              value={version}
              onChange={e => setVersion(e.target.value)}
              placeholder="Ex: 2.0 XEi 16V Flex Automatico"
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Preço (R$) <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                value={price || ''}
                onChange={e => setPrice(Number(e.target.value))}
                placeholder="Ex: 124900"
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
                placeholder="Ex: 2022/2022"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Quilometragem (KM)
              </label>
              <input
                type="number"
                value={mileage || ''}
                onChange={e => setMileage(Number(e.target.value))}
                placeholder="Ex: 38500"
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
                placeholder="Ex: Prata, Branco, Preto"
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

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              URL da Foto Principal <span className="text-red-600">*</span>
            </label>
            <input
              type="url"
              value={photoUrl}
              onChange={e => setPhotoUrl(e.target.value)}
              placeholder="https://images.unsplash.com/... ou cole a URL"
              required
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none mb-2"
            />

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 font-semibold">Ou envie um arquivo local:</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"
              />
            </div>
          </div>

          {/* Preview Image */}
          {photoUrl && (
            <div className="p-2 border border-slate-200 rounded-xl bg-slate-50">
              <span className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Pré-visualização:</span>
              <img src={photoUrl} alt="Preview" className="w-full h-36 object-cover rounded-lg" />
            </div>
          )}

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
              <span>Salvar Anúncio</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
