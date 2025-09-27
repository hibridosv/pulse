export function StatCardSkeleton() {
  return (
    <div className="bg-bg-content rounded-xl shadow-sm border border-bg-subtle overflow-hidden">
      <div className="p-5 animate-pulse">
        <div className="flex items-center">
          <div className="flex-grow">
            {/* Placeholder for subtitle */}
            <div className="h-4 bg-bg-subtle rounded w-3/4 mb-2"></div>
            {/* Placeholder for title */}
            <div className="h-6 bg-bg-subtle rounded w-1/2"></div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          {/* Placeholder for balance */}
          <div className="h-10 bg-bg-subtle rounded w-1/3"></div>
        </div>
      </div>
      <div className="bg-bg-subtle/50 h-1.5"></div>
    </div>
  );
}
