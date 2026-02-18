'use client';

import { useOrderRestaurantFnLogic } from '@/hooks/order/restaurant/useOrderRestaurantFnLogic';
import { Order } from '@/interfaces/order';
import { extractActiveFeature } from '@/lib/config/config';
import { permissionExists } from '@/lib/utils';
import useConfigStore from '@/stores/configStore';
import ordersStore from '@/stores/orders/ordersStore';
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';
import useToastMessageStore from '@/stores/toastMessageStore';

export interface ServiceTypeSelectI {
  order: Order;
}

export function ServiceTypeSelect(props: ServiceTypeSelectI) {
  const { order } = props
  const { activeConfig, permission, configurations } = useConfigStore();
  const { sending } = ordersStore();
  const { setError } =  useToastMessageStore();
  const { setSelectedElement, getSelectedElement, clearSelectedElement } = useTempSelectedElementStore();
  const isDelivery = activeConfig && activeConfig.includes("restaurant-sales-delivery");
  const isQuick = activeConfig && activeConfig.includes("restaurant-sales-quick");
  const isHere = activeConfig && activeConfig.includes("restaurant-sales-here");
  const permissionDelivery = permissionExists(permission, "restaurant-sales-delivery");
  const permissionQuick = permissionExists(permission, "restaurant-sales-quick");
  const permissionHere = permissionExists(permission, "restaurant-sales-here");
  const serviceType: number = getSelectedElement('serviceType');
  const { saveAndOut } = useOrderRestaurantFnLogic();
  const selectedTable = getSelectedElement('selectedTable');
  const selectedTables = getSelectedElement('selectedTables');


  const countFeatures = () => {
    let config = configurations && extractActiveFeature(configurations);
    const features = [
      "restaurant-sales-delivery",
      "restaurant-sales-quick",
      "restaurant-sales-here"
    ];
    return features.filter(feature => config && config?.includes(feature)).length;
  }
  
  if (countFeatures() === 0) return <></>;

    const handleSelected = async (option: number)=>{
    if (serviceType == 1) {
      if (option == 1 ) return;
      if(order?.invoiceproducts){
        setError({message :"Debe facturar o eliminar la orden activa"});
        return false;
      }
    }
    if (serviceType == 2) {
      if(order?.invoiceproducts){
        await saveAndOut(order.id)
      }
      clearSelectedElement('selectedTable');
    }
    if (serviceType == 3) {
      if(order?.invoiceproducts){
        // onClickOrder(OptionsClickOrder.save)
      }
      // setclientOrder([]);
    }
    setSelectedElement("serviceType", option);
  }


  return (
        <div className="flex justify-around w-full h-7 shadow-md">
          { isDelivery && permissionDelivery &&
          <div className={`w-full font-medium clickeable ${serviceType == 3 ? 'bg-slate-200 text-black' : 'bg-slate-600 text-white'} items-center text-center`} 
          onClick={sending ? ()=>{} : ()=> handleSelected(3)}>Delivery</div> 
          }
          { isQuick && permissionQuick &&
          <div className={`w-full font-medium ${serviceType == 1 ? 'bg-slate-200 text-black cursor-not-allowed' : 'bg-slate-600 text-white clickeable'} items-center text-center`} 
          onClick={sending ? ()=>{} : ()=> handleSelected(1)}>Venta Rapida</div> 
          }
          { isHere && permissionHere &&
          <div className={`w-full font-medium clickeable ${serviceType == 2 ? 'bg-slate-200 text-black' : 'bg-slate-600 text-white'} items-center text-center`} 
          onClick={sending ? ()=>{} : ()=> handleSelected(2)}>Servicio Mesa</div> 
          }
    </div>
);
}
