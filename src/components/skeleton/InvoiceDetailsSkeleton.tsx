
export const InvoiceDetailsSkeleton = () => {
  return (
    <div className="p-4 bg-bg-base text-text-base space-y-6 animate-pulse">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-bg-subtle h-20 rounded-lg"></div>
        <div className="bg-bg-subtle h-20 rounded-lg"></div>
        <div className="bg-bg-subtle h-20 rounded-lg"></div>
        <div className="bg-bg-subtle h-20 rounded-lg"></div>
      </div>

      <div className="w-full bg-bg-subtle rounded-lg border border-bg-subtle">
        <div className="h-12 bg-bg-subtle/60 border-b-2 border-bg-subtle rounded-t-lg"></div>
        <div className="space-y-2 p-4">
          <div className="h-8 bg-bg-base rounded"></div>
          <div className="h-8 bg-bg-base rounded"></div>
          <div className="h-8 bg-bg-base rounded"></div>
          <div className="h-8 bg-bg-base rounded"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-bg-subtle h-24 rounded-lg"></div>
        <div className="bg-bg-subtle h-24 rounded-lg"></div>
      </div>
    </div>
  );
};
