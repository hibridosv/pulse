import { BiLoader } from 'react-icons/bi';

const ShimmerBlock = ({ className }: { className: string }) => (
  <div className={`relative overflow-hidden bg-bg-subtle ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-bg-base/30 to-transparent"></div>
  </div>
);

const DetailRowSkeleton = () => (
  <div className="flex items-center gap-2">
    <ShimmerBlock className="h-4 w-4 rounded" />
    <ShimmerBlock className="h-4 w-20 rounded" />
    <ShimmerBlock className="h-4 w-28 rounded" />
  </div>
);

export const ProductDetailsSkeleton = () => {
  return (
    <div className="p-2 space-y-4 text-text-base">
      {/* Indicador de Carga */}
      <div className="flex justify-center items-center gap-3 p-3 bg-bg-content rounded-lg border border-bg-subtle">
        <BiLoader className="animate-spin text-primary" size={20} />
        <span className="text-text-muted text-sm font-medium">Cargando detalles del producto...</span>
      </div>

      {/* Sección 1: Header - Nombre + Código + Badges */}
      <div className="grid grid-cols-10 gap-4 pb-4 border-b border-bg-subtle">
        <div className="col-span-9 space-y-2">
          <ShimmerBlock className="h-6 w-3/4 rounded" />
          <ShimmerBlock className="h-4 w-40 rounded" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <ShimmerBlock className="h-5 w-16 rounded-full" />
          <ShimmerBlock className="h-5 w-20 rounded-full" />
        </div>
      </div>

      {/* Sección 2: Métricas Clave (3 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-bg-subtle/50 p-4 rounded-lg flex items-center gap-3">
            <ShimmerBlock className="h-8 w-8 rounded" />
            <div className="flex-1 space-y-2">
              <ShimmerBlock className="h-3 w-16 rounded" />
              <ShimmerBlock className="h-5 w-24 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Sección 3: Clasificación */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 border-b border-bg-subtle pb-1">
          <ShimmerBlock className="h-5 w-28 rounded" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <DetailRowSkeleton />
          <DetailRowSkeleton />
          <DetailRowSkeleton />
          <DetailRowSkeleton />
        </div>
      </div>

      {/* Sección 4: Detalles Adicionales */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 border-b border-bg-subtle pb-1">
          <ShimmerBlock className="h-5 w-36 rounded" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <DetailRowSkeleton />
          <DetailRowSkeleton />
          <DetailRowSkeleton />
          <DetailRowSkeleton />
        </div>
      </div>

      {/* Sección 5: Características */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 border-b border-bg-subtle pb-1">
          <ShimmerBlock className="h-5 w-32 rounded" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <DetailRowSkeleton />
          <DetailRowSkeleton />
        </div>
      </div>
    </div>
  );
};
