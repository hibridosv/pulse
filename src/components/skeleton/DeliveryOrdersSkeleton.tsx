function DeliveryCardSkeleton({ index }: { index: number }) {
  return (
    <div className="animate-scale-in" style={{ animationDelay: `${index * 60}ms` }}>
      <div className="w-44 bg-bg-content rounded-xl border border-bg-subtle overflow-hidden">

        <div className="flex flex-col items-center px-2.5 pt-3 pb-2 gap-1.5">
          <div className="relative w-11 h-11 rounded-xl bg-bg-subtle overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-bg-content/60 to-transparent" />
          </div>

          <div className="relative h-2.5 w-14 rounded bg-bg-subtle overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-bg-content/60 to-transparent" />
          </div>

          <div className="relative h-2.5 w-16 rounded bg-bg-subtle overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-bg-content/60 to-transparent" />
          </div>
        </div>

        <div className="px-2.5 py-1.5 border-t border-bg-subtle bg-bg-subtle/30 rounded-b-xl space-y-1.5">
          <div className="flex items-center gap-1.5">
            <div className="relative w-3 h-3 rounded bg-bg-subtle overflow-hidden shrink-0">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-bg-content/60 to-transparent" />
            </div>
            <div className="relative h-2.5 w-20 rounded bg-bg-subtle overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-bg-content/60 to-transparent" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="relative h-2 w-14 rounded bg-bg-subtle overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-bg-content/60 to-transparent" />
            </div>
            <div className="relative h-2.5 w-10 rounded bg-bg-subtle overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-bg-content/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DeliveryOrdersSkeleton() {
  return (
    <div className="w-full px-3 py-1">
      <div className="flex flex-wrap justify-center gap-3">
        {Array.from({ length: 6 }, (_, i) => (
          <DeliveryCardSkeleton key={i} index={i} />
        ))}
      </div>
    </div>
  );
}
