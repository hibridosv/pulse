function SkeletonCard({ index }: { index: number }) {
  return (
    <div
      className="animate-scale-in"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div className="w-[104px] overflow-hidden rounded-xl bg-bg-content shadow-md">
        {/* Imagen placeholder */}
        <div className="relative h-[104px] w-[104px] overflow-hidden bg-bg-subtle">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-bg-content/60 to-transparent" />
        </div>
        {/* Label placeholder */}
        <div className="flex h-10 items-center justify-center bg-bg-subtle/60 px-2">
          <div className="relative h-2.5 w-16 overflow-hidden rounded-full bg-bg-subtle">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-bg-content/60 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function RestaurantMenuSkeleton({ imageQuantity = 35 }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {Array.from({ length: imageQuantity }, (_, i) => (
        <SkeletonCard key={i} index={i} />
      ))}
    </div>
  );
}
