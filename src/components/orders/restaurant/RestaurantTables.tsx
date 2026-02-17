'use client';

import ordersStore from '@/stores/orders/ordersStore';
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';
import Image from 'next/image';
import { useEffect } from 'react';
import { TablesTime } from './TablesTime';


export function RestaurantTables() {
  const { order, tables } = ordersStore();
  const { setSelectedElement, getSelectedElement } = useTempSelectedElementStore();
  const selectedTables = getSelectedElement('selectedTables');
  const serviceType: number = getSelectedElement('serviceType'); // 1 aqui, 2 mesas, 3 delivery
  

  useEffect(() => {
    if (tables) {
        const principalLocation = tables && tables.find((location: any) => location.is_principal === 1);
        if (!selectedTables) {
          setSelectedElement('selectedTables', principalLocation?.tables);
        }
    }
      // eslint-disable-next-line
  }, [tables, selectedTables]);


  if (order?.invoiceproducts || serviceType != 2 || !selectedTables) return <></>

      const listZones = selectedTables && tables && tables.map((record: any) => {
          return (<div key={record.id} 
            className={`w-full font-medium clickeable bg-slate-200 items-center text-center ${record.id == selectedTables[0]?.restaurant_table_location_id ? 'bg-slate-200 text-black' : 'bg-slate-600 text-white'}`} 
            onClick={() => setSelectedElement('selectedTables', record.tables)}>{record.name}
            </div>)
      });

      const listItems = selectedTables && selectedTables.map((record: any) => {
            console.log(record);
            return (
                <div key={record?.id} className="m-2 clickeable" onClick={()=>console.log(record)}>
                    <div className="rounded-md drop-shadow-lg relative">
                        <Image src="/img/table.jpg" alt="Mesa" width={146} height={146} className="rounded-t-md" />
                        <p className={`w-full content-center text-center rounded-b-md overflow-hidden uppercase text-xs text-black font-medium p-1 h-9 ${record.status == 0 ? 'bg-lime-300' : 'bg-red-300'}`} 
                           style={{ maxWidth: '146px',  wordBreak: 'keep-all', lineHeight: '1.2em' }}>
                            {record?.name }
                        </p>
                        <div className="absolute border-b-2 rounded-md shadow-md top-[38%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                          <TablesTime record={record} isShow={record.status == 1} rowSearch="updated_at" />
                        </div>
                    </div>
                </div>
            )
        });
        
        

  return (
      <div className="w-full px-2 py-3">
          <div className="flex justify-around w-full h-7 shadow-md">
            { listZones}
          </div>
          <div className="flex flex-wrap justify-center">
            { listItems }
          </div>
     </div>
);
}
