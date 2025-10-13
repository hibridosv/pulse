import { BiLoader } from 'react-icons/bi';

// Componente base para un bloque de skeleton con efecto shimmer
const ShimmerBlock = ({ className }: { className: string }) => (
  <div className={`relative overflow-hidden bg-bg-subtle ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-bg-base/30 to-transparent"></div>
  </div>
);

export const InvoiceDetailsSkeleton = () => {
  return (
    <div className="p-4 bg-bg-base text-text-base space-y-6">
      {/* --- Indicador de Carga --- */}
      <div className="flex justify-center items-center gap-3 p-4 bg-bg-content rounded-lg border border-bg-subtle">
        <BiLoader className="animate-spin text-primary" size={24} />
        <span className="text-text-muted font-medium">Cargando detalles del documento...</span>
      </div>

      {/* --- Skeleton con Shimmer --- */}
      <div className="space-y-6">
        {/* Skeleton for InfoCards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ShimmerBlock className="h-20 rounded-lg" />
          <ShimmerBlock className="h-20 rounded-lg" />
          <ShimmerBlock className="h-20 rounded-lg" />
          <ShimmerBlock className="h-20 rounded-lg" />
        </div>

        {/* Skeleton for Table */}
        <div className="relative overflow-hidden border border-bg-subtle rounded-lg">
          <ShimmerBlock className="h-12 rounded-t-lg" />
          <div className="space-y-2 p-4 bg-bg-content">
            <ShimmerBlock className="h-8 rounded" />
            <ShimmerBlock className="h-8 rounded" />
            <ShimmerBlock className="h-8 rounded" />
            <ShimmerBlock className="h-8 rounded" />
          </div>
        </div>

        {/* Skeleton for Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ShimmerBlock className="h-24 rounded-lg" />
          <ShimmerBlock className="h-24 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

// Para que la animación funcione, es necesario agregarla a la configuración de Tailwind.
// Este es un ejemplo de cómo debería verse en `tailwind.config.ts`:
/*
module.exports = {
  // ...
  theme: {
    extend: {
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  // ...
};
*/