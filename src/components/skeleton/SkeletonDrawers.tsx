export function SkeletonDrawers() {
  return (
    <div className="flex justify-center py-4 px-4 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="md:mx-6 mx-2">
          <div className="w-44 h-44 bg-bg-subtle rounded-t-full"></div>
        
          <div className="h-6 bg-bg-subtle rounded-md mx-auto mt-2 w-3/4"></div>
          
          <div className="h-4 bg-bg-subtle rounded-md mx-auto mt-2 mb-2 w-1/2"></div>
        </div>
      ))}
    </div>
  );
}
