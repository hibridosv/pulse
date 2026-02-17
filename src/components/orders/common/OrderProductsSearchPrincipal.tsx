'use client'
import ordersStore from '@/stores/orders/ordersStore';
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';
import { NameIcon, SearchIcon } from '@/styles/svg';
import { OrderProductsSearch } from './OrderProductsSearch';
import { OrderProductsSearchByCode } from './OrderProductsSearchByCode';



export function OrderProductsSearchPrincipal() {
    const { getSelectedElement, setSelectedElement } = useTempSelectedElementStore();
    const typeOfSearch = getSelectedElement('typeOfSearch');
    const { sending } = ordersStore();

    return (
        <div className="m-2 flex justify-between">
            <div className="w-full bg-white rounded-lg shadow-lg">
                <OrderProductsSearch />
                <OrderProductsSearchByCode />
            </div>
            <div className={`mx-2 grid content-center clickeable  ${sending && ' animate-pulse'}`} onClick={()=>{ setSelectedElement('typeOfSearch', !typeOfSearch)}}>
                {  typeOfSearch ? NameIcon : SearchIcon  }
            </div>
        </div>
    );
}