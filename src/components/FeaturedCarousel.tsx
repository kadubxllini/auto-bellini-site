import React, { useState, useEffect } from 'react';
import { useCars } from '../context/CarContext';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Calculator,
  Calendar,
  Gauge,
  Fuel,
  Sparkles,
  Eye,
  Edit,
  Trash2,
  GripVertical,
  MoveLeft,
  MoveRight,
  ArrowUpDown,
  Check,
  CheckCircle2
} from 'lucide-react';
import { DEFAULT_SHOPCAR_URL } from '../services/carService';

export const FeaturedCarousel: React.FC = () => {
  const { cars, reorderCars, setSelectedCar, setFinancingCar, isAdmin, setEditingCar, setIsCarModalOpen, deleteCar } = useCars();
  const featuredCars = cars.filter(car => car.featured);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showReorderPanel, setShowReorderPanel] = useState(false);
  const [draggedCarId, setDraggedCarId] = useState<string | null>(null);

  const SLIDE_DURATION = 6000; // 6 segundos por slide
  const TICK_INTERVAL = 50; // Atualização a cada 50ms para fluidez perfeita

  const changeSlide = (newIndex: number) => {
    setProgress(0);
    setCurrentIndex(newIndex);
  };

  // Garantir que o índice atual seja sempre válido se a lista de destaques mudar
  useEffect(() => {
    if (currentIndex >= featuredCars.length && featuredCars.length > 0) {
      setCurrentIndex(0);
      setProgress(0);
    }
  }, [featuredCars.length, currentIndex]);

  // Animação de progresso contínuo e troca automática
  useEffect(() => {
    if (featuredCars.length <= 1 || isPaused || showReorderPanel) return;

    const step = (TICK_INTERVAL / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentIndex(c => (c + 1) % featuredCars.length);
          return 0;
        }
        return prev + step;
      });
    }, TICK_INTERVAL);

    return () => clearInterval(timer);
  }, [featuredCars.length, isPaused, showReorderPanel]);

  if (featuredCars.length === 0) {
    return null;
  }

  const safeIndex = currentIndex < featuredCars.length ? currentIndex : 0;
  const currentCar = featuredCars[safeIndex] || featuredCars[0];

  const priceNum = Number(currentCar.price);
  const formattedPrice = !isNaN(priceNum) && priceNum > 0
    ? priceNum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : 'Sob Consulta';

  const hasMileage = currentCar.mileage !== undefined && currentCar.mileage !== null && typeof currentCar.mileage === 'number' && !isNaN(currentCar.mileage);
  const formattedKm = hasMileage ? `${currentCar.mileage!.toLocaleString('pt-BR')} km` : '';
  const shopcarTarget = currentCar.shopcarUrl && currentCar.shopcarUrl.trim() !== '' ? currentCar.shopcarUrl : DEFAULT_SHOPCAR_URL;
  const currentPhoto = (Array.isArray(currentCar.photos) && currentCar.photos.length > 0 && currentCar.photos[0])
    ? currentCar.photos[0]
    : 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop';

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    changeSlide(safeIndex === 0 ? featuredCars.length - 1 : safeIndex - 1);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    changeSlide((safeIndex + 1) % featuredCars.length);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingCar(currentCar);
    setIsCarModalOpen(true);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Confirma a remoção do anúncio "${currentCar.brand} ${currentCar.version}"?`)) {
      deleteCar(currentCar.id);
    }
  };

  // Reordenar Carros no Carrossel
  const moveFeaturedCar = (fromFeaturedIdx: number, toFeaturedIdx: number) => {
    if (toFeaturedIdx < 0 || toFeaturedIdx >= featuredCars.length || fromFeaturedIdx === toFeaturedIdx) return;
    const carToMove = featuredCars[fromFeaturedIdx];
    const targetCar = featuredCars[toFeaturedIdx];

    const fromGlobalIdx = cars.findIndex(c => c.id === carToMove.id);
    const toGlobalIdx = cars.findIndex(c => c.id === targetCar.id);

    if (fromGlobalIdx !== -1 && toGlobalIdx !== -1) {
      const updated = [...cars];
      const [moved] = updated.splice(fromGlobalIdx, 1);
      updated.splice(toGlobalIdx, 0, moved);
      reorderCars(updated);
    }
  };

  const handleCarDragStart = (e: React.DragEvent, id: string) => {
    setDraggedCarId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleCarDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleCarDrop = (e: React.DragEvent, targetCarId: string) => {
    e.preventDefault();
    if (!draggedCarId || draggedCarId === targetCarId) return;

    const fromIdx = featuredCars.findIndex(c => c.id === draggedCarId);
    const toIdx = featuredCars.findIndex(c => c.id === targetCarId);

    if (fromIdx !== -1 && toIdx !== -1) {
      moveFeaturedCar(fromIdx, toIdx);
    }
    setDraggedCarId(null);
  };

  return (
    <section className="py-4 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Painel de Reordenação de Carros para o Administrador */}
        {isAdmin && showReorderPanel && (
          <div className="mb-4 p-4 bg-slate-950 rounded-2xl animate-slide-in">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <GripVertical className="w-5 h-5 text-amber-400" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Reordenar Ordem dos Destaques no Carrossel
                </h4>
              </div>
              <button
                onClick={() => setShowReorderPanel(false)}
                className="flex items-center gap-1 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>Concluir Ordem</span>
              </button>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Arraste os carros para a esquerda ou direita para alterar a ordem que aparecem no carrossel, ou use as setas.
            </p>

            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {featuredCars.map((car, idx) => (
                <div
                  key={car.id}
                  draggable
                  onDragStart={e => handleCarDragStart(e, car.id)}
                  onDragOver={handleCarDragOver}
                  onDrop={e => handleCarDrop(e, car.id)}
                  onDragEnd={() => setDraggedCarId(null)}
                  className={`flex-none w-64 p-3 bg-slate-900 rounded-xl flex items-center gap-3 cursor-grab active:cursor-grabbing transition-all ${draggedCarId === car.id ? 'opacity-40 scale-95' : 'hover:bg-slate-850'
                    }`}
                >
                  <GripVertical className="w-5 h-5 text-slate-500 shrink-0" />
                  <img
                    src={(Array.isArray(car.photos) && car.photos.length > 0) ? car.photos[0] : ''}
                    alt={car.version}
                    className="w-12 h-12 object-cover rounded-lg shrink-0 bg-slate-950"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">{car.brand} {car.version}</p>
                    <p className="text-[11px] text-amber-400 font-semibold">
                      {car.price ? `R$ ${Number(car.price).toLocaleString('pt-BR')}` : ''}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 shrink-0">
                    {idx > 0 && (
                      <button
                        onClick={() => moveFeaturedCar(idx, idx - 1)}
                        className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded"
                        title="Mover para antes"
                      >
                        <MoveLeft className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {idx < featuredCars.length - 1 && (
                      <button
                        onClick={() => moveFeaturedCar(idx, idx + 1)}
                        className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded"
                        title="Mover para depois"
                      >
                        <MoveRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Banner Carousel Container - ESCALA LIGEIRAMENTE REDUZIDA COM MESMAS PROPORÇÕES */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative bg-slate-950 rounded-2xl overflow-hidden shadow-xl"
        >
          {/* Conteúdo Principal: Foto Flush no Topo (Direita) + Painel de Informações com Selo (Esquerda) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative">

            {/* Foto Limpa estendida até o topo-direito sem faixas */}
            <div className="lg:col-span-7 order-1 lg:order-2 relative bg-slate-950 overflow-hidden flex items-center justify-center aspect-[4/3] w-full h-full">
              <img
                key={currentCar.id}
                src={currentPhoto}
                alt={`${currentCar.brand} ${currentCar.version}`}
                className="w-full h-full object-cover animate-smooth-fade"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop';
                }}
              />

              {/* Botões de Setas de Navegação Lateral na Foto */}
              {featuredCars.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-slate-950/80 hover:bg-red-600 text-white transition-all active:scale-95 group/btn"
                    aria-label="Destaque Anterior"
                  >
                    <ChevronLeft className="w-5 h-5 group-hover/btn:-translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-slate-950/80 hover:bg-red-600 text-white transition-all active:scale-95 group/btn"
                    aria-label="Próximo Destaque"
                  >
                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </>
              )}
            </div>

            {/* Painel Informativo na Esquerda Ligeiramente mais Compacto */}
            <div
              key={`info-${currentCar.id}`}
              className="lg:col-span-5 order-2 lg:order-1 p-5 sm:p-6 flex flex-col justify-between bg-slate-950 animate-smooth-fade"
            >
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  {/* Selo DESTAQUE DA LOJA no topo do painel esquerdo + Controles Admin */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-[11px] uppercase tracking-wider">
                      <Star className="w-3.5 h-3.5 fill-slate-950" />
                      <span>DESTAQUE DA LOJA</span>
                      <Sparkles className="w-3 h-3 text-slate-950 animate-pulse" />
                    </div>

                    {isAdmin && (
                      <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl">
                        <button
                          onClick={() => setShowReorderPanel(!showReorderPanel)}
                          className={`p-1.5 rounded-lg font-bold text-xs transition-colors ${showReorderPanel ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-200 hover:text-white'
                            }`}
                          title="Reordenar Posição dos Carros no Carrossel"
                        >
                          <ArrowUpDown className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={handleEdit}
                          className="p-1.5 bg-amber-500/20 hover:bg-amber-500 text-amber-400 hover:text-slate-950 rounded-lg transition-colors"
                          title="Editar Carro em Destaque"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={handleDelete}
                          className="p-1.5 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-colors"
                          title="Remover Carro"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="text-[11px] font-black uppercase tracking-widest text-red-500 mb-0.5">
                    {currentCar.brand}
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-[26px] font-black text-white leading-tight tracking-tight mb-3">
                    {currentCar.version}
                  </h2>

                  {/* Especificações do Carro em Pílulas Destacadas */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 text-xs font-bold text-slate-200">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      <span>{currentCar.yearModel}</span>
                    </div>

                    {hasMileage && (
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 text-xs font-bold text-slate-200">
                        <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{formattedKm}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 text-xs font-bold text-slate-200">
                      <Fuel className="w-3.5 h-3.5 text-amber-400" />
                      <span>{currentCar.fuel}</span>
                    </div>

                    {currentCar.color && (
                      <div className="px-2.5 py-1 rounded-md bg-slate-900 text-xs font-bold text-slate-300">
                        {currentCar.color}
                      </div>
                    )}
                  </div>

                  {/* Valor do Veículo */}
                  <div className="mb-3.5">
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Preço Especial</span>
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-400 tracking-tight">
                      {formattedPrice}
                    </span>
                  </div>

                  {/* Destaques & Opcionais do Veículo em Evidência */}
                  {currentCar.features && currentCar.features.length > 0 && (
                    <div className="mb-3">
                      <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                        Destaques do Anúncio
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {currentCar.features.slice(0, 4).map((feat, fIdx) => (
                          <span
                            key={fIdx}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900/90 text-[11px] font-medium text-slate-200"
                          >
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span>{feat}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Botões de Ação e Bolinhas de Carregamento Alinhadas no Rodapé */}
                <div className="space-y-2 pt-3 mt-auto">
                  <a
                    href={shopcarTarget}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#b01717] hover:bg-[#8f1212] text-white font-bold text-xs rounded-xl transition-all active:scale-95"
                  >
                    <span>Ver Anúncio no Shopcar</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedCar(currentCar)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5 text-blue-400" />
                      <span>Ver Detalhes</span>
                    </button>

                    <button
                      onClick={() => setFinancingCar(currentCar)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all active:scale-95"
                    >
                      <Calculator className="w-3.5 h-3.5 text-amber-400" />
                      <span>Simular</span>
                    </button>
                  </div>

                  {/* Barras de Progresso / Indicadores Centralizados no Rodapé da Coluna */}
                  {featuredCars.length > 1 && (
                    <div className="pt-2 flex items-center gap-2.5 justify-center">
                      {featuredCars.map((car, idx) => {
                        const isActive = currentIndex === idx;
                        const isPast = idx < currentIndex;

                        return (
                          <button
                            key={car.id}
                            onClick={() => changeSlide(idx)}
                            className={`group relative h-2 rounded-full bg-slate-800/90 overflow-hidden transition-all duration-300 focus:outline-none ${isActive ? 'w-10' : 'w-3 hover:bg-slate-700'
                              }`}
                            aria-label={`Ir para anúncio em destaque ${idx + 1}`}
                            title={`${car.brand} ${car.version}`}
                          >
                            {/* Barra Interna de Carregamento */}
                            <div
                              className={`absolute inset-y-0 left-0 rounded-full transition-all ${isActive
                                  ? 'bg-amber-400'
                                  : (isPast ? 'bg-amber-400/60' : 'bg-transparent')
                                }`}
                              style={{
                                width: isActive ? `${progress}%` : (isPast ? '100%' : '0%'),
                                transition: isActive ? 'width 50ms linear' : 'none'
                              }}
                            />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
