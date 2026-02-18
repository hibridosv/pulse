'use client';

import ordersStore from '@/stores/orders/ordersStore';
import restauranMenuStore from '@/stores/orders/restauranMenuStore';
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';
import { BiUser } from 'react-icons/bi';


export function RestaurantClients() {
  const { loading, restaurantMenu: images } =  restauranMenuStore();
  const { getSelectedElement } = useTempSelectedElementStore();
  const serviceType: number = getSelectedElement('serviceType');
  const clientActive: number = getSelectedElement('clientActive');
  const selectedTable = getSelectedElement('selectedTable');
  const { order } = ordersStore();

  if ((serviceType != 2 && !selectedTable)) return <></>;

      let clients = [1,2,3,4,5];

      // const listItems = order?.attributes && JSON.parse(order?.attributes.clients)?.map((record: any) => {
      const listItems = clients.map((record: any) => {
          return (
              <div key={record} className="m-2 clickeable" onClick={()=>console.log(record)}>
                  <div className="rounded-md drop-shadow-lg">
                      <div className="w-full flex justify-center">
                      <BiUser size={48} className={`${clientActive == record ? 'text-lime-900' : 'text-red-900'}`} />
                      </div>
                      <p className={`w-full content-center text-center rounded-b-md overflow-hidden uppercase text-xs text-black font-medium p-1 ${clientActive == record ? 'bg-lime-300' : 'bg-red-300'}`} 
                          style={{ maxWidth: '146px',  wordBreak: 'keep-all', lineHeight: '1.2em' }}>
                          Cliente {record}
                      </p>
                  </div>
              </div>
          )
      });
      
      const clientMock = ()=>{
          return (
              <div  className="m-2 animate-pulse">
                  <div className="rounded-md drop-shadow-lg">
                      <div className="w-full flex justify-center">
                      <BiUser size={48} className='text-red-900' />
                      </div>
                      <p className="w-full content-center text-center rounded-b-md overflow-hidden uppercase text-xs text-black font-medium p-1 bg-red-300" 
                          style={{ maxWidth: '146px',  wordBreak: 'keep-all', lineHeight: '1.2em' }}>
                          Cargando...
                      </p>
                  </div>
              </div>
          )
      }
  
    const clientAlone = ()=>{
        return (
            <div className="m-2" >
                <div className="rounded-md drop-shadow-lg">
                    <div className="w-full flex justify-center">
                    <BiUser size={48} className='text-lime-900' />
                    </div>
                    <p className={`w-full content-center text-center rounded-b-md overflow-hidden uppercase text-xs text-black font-medium p-1 bg-lime-300`}
                        style={{ maxWidth: '146px',  wordBreak: 'keep-all', lineHeight: '1.2em' }}>
                        Cliente 1
                    </p>
                </div>
            </div>
        )
    }
  

  return (
      <div className="w-full px-2 py-3">
          <div className="flex flex-wrap justify-center">
          { loading ? clientMock() : listItems ? listItems : clientAlone() }
          </div>
     </div>
);
}
