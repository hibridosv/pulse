'use client';

import ordersStore from '@/stores/orders/ordersStore';
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';
import { useEffect } from 'react';
import { TableCard } from './TableCard';

export function RestaurantTables() {
  const { order, tables } = ordersStore();
  const { setSelectedElement, getSelectedElement } = useTempSelectedElementStore();
  const selectedTables = getSelectedElement('selectedTables');
  const serviceType: number = getSelectedElement('serviceType');
  const selectedTable: number = getSelectedElement('selectedTable');


  useEffect(() => {
    if (!tables) return;
    if (!selectedTables) {
      const principalLocation = tables.find((location: any) => location.is_principal === 1);
      setSelectedElement('selectedTables', principalLocation?.tables);
    } else {
      const activeZone = tables.find((location: any) =>
        location.id === selectedTables[0]?.restaurant_table_location_id
      );
      if (activeZone) {
        setSelectedElement('selectedTables', activeZone.tables);
      }
    }
    // eslint-disable-next-line
  }, [tables]);

  if (order?.invoiceproducts || serviceType != 2 || !selectedTables || selectedTable) return <></>;

  const activeZoneId = selectedTables[0]?.restaurant_table_location_id;

  return (
    <div className="w-full px-3 py-1 animate-fade-in">
      {tables && tables.length > 1 && (
        <div className="flex gap-1 mb-5 bg-bg-subtle/50 p-1 rounded-lg">
          {tables.map((record: any) => {
            const isActive = record.id == activeZoneId;
            return (
              <button key={record.id}
                className={` flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all duration-100
                  ${isActive  ? 'bg-primary text-text-inverted shadow-sm' : 'text-text-muted hover:text-text-base hover:bg-bg-content' } `}
                onClick={() => setSelectedElement('selectedTables', record.tables)} >
                {record.name}
              </button>
            );
          })}
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-4">
        {selectedTables.map((record: any) => (
          <TableCard
            key={record?.id}
            record={record}
          />
        ))}
      </div>
    </div>
  );
}
