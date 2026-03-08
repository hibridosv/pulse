'use client';
import { Button, Preset } from '@/components/button/button';
import Modal from '@/components/modal/Modal';
import SkeletonTable from '@/components/skeleton/skeleton-table';
import manageRestaurantStore from '@/stores/restaurant/manageRestaurantStore';
import useTempStorage from '@/stores/useTempStorage';
import { useEffect } from 'react';
import { LuChevronRight } from 'react-icons/lu';

interface Props {
  isShow: boolean;
  onClose: () => void;
}

export function RestaurantProductPanelModal({ isShow, onClose }: Props) {
  const { workStations, loadingWorkStations, loadWorkStations, updateProduct, sending } = manageRestaurantStore();
  const { getElement } = useTempStorage();

  const selectedProduct = getElement('menuProduct');

  useEffect(() => {
    if (isShow && !workStations) {
      loadWorkStations('restaurant/workstations?filterWhere[status]==1');
    }
  }, [isShow, workStations, loadWorkStations]);

  const handleSelect = async (panelId: string | null) => {
    if (!selectedProduct) return;
    const success = await updateProduct(selectedProduct.id, { field: 'work_station_id', data: panelId });
    if (success) onClose();
  };

  const listItems = workStations?.map((panel: any) => {
    const isSelected = panel.id === selectedProduct?.work_station_id;
    return (
      <li
        key={panel.id}
        onClick={() => handleSelect(panel.id)}
        className={`flex justify-between items-center px-4 py-2.5 cursor-pointer transition-colors text-sm ${isSelected ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-bg-subtle text-text-base'}`}
      >
        <span>{panel.name}</span>
        <LuChevronRight size={16} className="text-text-muted" />
      </li>
    );
  });

  return (
    <Modal show={isShow} onClose={onClose} size="sm" headerTitle="Cambiar Panel">
      <Modal.Body>
        {loadingWorkStations || sending ? (
          <SkeletonTable rows={5} columns={1} />
        ) : (
          <ul className="divide-y divide-bg-subtle">
            <li
              onClick={() => handleSelect(null)}
              className="flex justify-between items-center px-4 py-2.5 cursor-pointer transition-colors text-sm text-text-muted hover:bg-bg-subtle"
            >
              <span>Ninguno</span>
              <LuChevronRight size={16} />
            </li>
            {listItems}
          </ul>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} />
      </Modal.Footer>
    </Modal>
  );
}
