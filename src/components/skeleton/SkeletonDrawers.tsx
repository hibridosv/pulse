export function SkeletonDrawers() {
  return (
    <div className="flex flex-wrap justify-center gap-5 py-6 px-4 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="w-36 bg-bg-content rounded-xl border-2 border-bg-subtle overflow-hidden flex flex-col">
          <div className="flex justify-center pt-4 pb-2 bg-bg-subtle/40">
            <div className="w-20 h-20 rounded-full bg-bg-subtle" />
          </div>
          <div className="px-2.5 pb-3 pt-1.5 flex flex-col gap-1.5 items-center">
            <div className="h-3 w-24 bg-bg-subtle rounded-md" />
            <div className="h-4 w-16 bg-bg-subtle rounded-full" />
            <div className="h-5 w-full bg-bg-subtle rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
