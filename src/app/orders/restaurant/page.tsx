'use client';

export default function Page() {
 
  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-4 md:pb-10">
          <div className="md:col-span-6 md:border-r md:border-primary">
                
            <div>Search bar</div>
            <div className="relative z-0">
              <div>Content table</div>
            </div>
          </div>
          <div className="md:col-span-4 flex justify-center ">
            <div className="w-full mx-4">
              <div>Total</div>
            </div>
            <div className="absolute bottom-2">
              <div>Butons</div>
            </div>
          </div>
    </div>
  );
}
