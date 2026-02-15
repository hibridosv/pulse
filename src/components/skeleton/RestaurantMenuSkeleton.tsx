function SkeletonCard({ index }: { index: number }) {
  return (
    <div
      className="m-2 w-24"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="overflow-hidden rounded-md bg-bg-content shadow-md">
        {/* Imagen placeholder */}
        <div className="relative h-24 w-24 overflow-hidden bg-bg-subtle">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-bg-content/60 to-transparent" />
        </div>
        {/* Label placeholder */}
        <div className="flex h-9 items-center justify-center bg-bg-subtle/60 px-2">
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
    <div className="flex flex-wrap justify-center">
      {Array.from({ length: imageQuantity }, (_, i) => (
        <SkeletonCard key={i} index={i} />
      ))}
    </div>
  );
}
