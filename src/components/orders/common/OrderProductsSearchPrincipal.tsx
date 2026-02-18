'use client'
import ordersStore from '@/stores/orders/ordersStore';
import useTempStorage from '@/stores/useTempStorage';
import { NameIcon, SearchIcon } from '@/styles/svg';
import { OrderProductsSearch } from './OrderProductsSearch';
import { OrderProductsSearchByCode } from './OrderProductsSearchByCode';



export function OrderProductsSearchPrincipal() {
    const { getElement, setElement } = useTempStorage();
    const typeOfSearch = getElement('typeOfSearch');
    const { sending } = ordersStore();

    return (
        <div className="m-2 flex justify-between">
            <div className="w-full bg-white rounded-lg shadow-lg">
                <OrderProductsSearch />
                <OrderProductsSearchByCode />
            </div>
            <div className={`mx-2 grid content-center clickeable  ${sending && ' animate-pulse'}`} onClick={()=>{ setElement('typeOfSearch', !typeOfSearch)}}>
                {  typeOfSearch ? NameIcon : SearchIcon  }
            </div>
        </div>
    );
}