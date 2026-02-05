'use client'
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';



export function ShowOrders() {
    const { getSelectedElement, setSelectedElement } = useTempSelectedElementStore();
    const typeOfSearch = getSelectedElement('typeOfSearch');
    return (<>  </>)
    return (
        <div className="w-full mx-4">
              <div className="p-4 text-center font-bold text-lg">Total</div>
        </div>
    );
}