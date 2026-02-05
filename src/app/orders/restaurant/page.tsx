'use client';

export default function Page() {
 
  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
          <div className="col-span-6 border-r md:border-sky-600">
                
            <div>Search bar</div>
            <div className="relative z-0">
              <div>Content table</div>
            </div>
          </div>
          <div className="col-span-4 flex justify-center ">
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
