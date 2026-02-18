'use client';

import { useOrderRestaurantFnLogic } from '@/hooks/order/restaurant/useOrderRestaurantFnLogic';
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';
import { MdTableRestaurant } from 'react-icons/md';
import { TablesTime } from './TablesTime';

interface TableCardProps {
  record: any;
}

export function TableCard({ record }: TableCardProps) {
  const { select } = useOrderRestaurantFnLogic();
  const isOccupied = record.status == 1;
  const { setSelectedElement } = useTempSelectedElementStore();

  const handleSelect = (option: any) => {
    setSelectedElement('selectedTable', option.id);
    if (option.status == 1) {
        select(option.ticket_order_id)
    }
  }


  return (
    <div
      className="group clickeable animate-scale-in" onClick={() => handleSelect(record)}>
      <div className={` relative w-28 bg-bg-content rounded-xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${isOccupied ? 'border-danger/30' : 'border-bg-subtle'}`}>
        <div className="flex flex-col items-center px-2 pt-3 pb-2 gap-1.5">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
            <MdTableRestaurant className="w-7 h-7 text-secondary transition-transform duration-300 group-hover:scale-110" />
            <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ring-2 ring-bg-content ${isOccupied ? 'bg-danger animate-pulse' : 'bg-success'} `} />
          </div>

          {isOccupied ? (
            <span className="text-[10px] text-danger font-semibold tabular-nums">
              <TablesTime record={record} isShow={true} rowSearch="updated_at" />
            </span>
          ) : (
            <span className="text-[12px] text-success font-medium">Disponible</span>
          )}
        </div>

        <div
          className={`relative px-2 py-1.5 rounded-b-xl text-center border-t ${isOccupied ? 'bg-danger/5 border-danger/15' : 'bg-bg-subtle/30 border-bg-subtle/60'} `} title={record?.name} >
          <p className="text-[11px] font-semibold text-text-base uppercase truncate w-full">
            {record?.name}
          </p>
        </div>
      </div>
    </div>
  );
}
