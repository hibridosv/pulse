'use client';
import { Button, Preset } from '@/components/button/button';
import Modal from '@/components/modal/Modal';
import manageRestaurantStore from '@/stores/restaurant/manageRestaurantStore';
import useTempStorage from '@/stores/useTempStorage';

interface Props {
  isShow: boolean;
  onClose: () => void;
}

export function RestaurantProductDeleteModal({ isShow, onClose }: Props) {
  const { deleteRestaurantProduct, sending } = manageRestaurantStore();
  const { getElement } = useTempStorage();

  const selectedProduct = getElement('menuProduct');

  const handleDelete = async () => {
    if (!selectedProduct || sending) return;
    const success = await deleteRestaurantProduct(selectedProduct.id);
    if (success) onClose();
  };

  return (
    <Modal show={isShow} onClose={onClose} size="sm" headerTitle="Eliminar Producto">
      <Modal.Body>
        <div className="p-4 space-y-2">
          <p className="text-text-muted text-sm">
            ¿Está seguro que desea eliminar el producto{' '}
            <span className="font-semibold text-text-base">{selectedProduct?.description}</span>?
          </p>
          <p className="text-xs text-danger">Esta acción no se puede deshacer.</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} disabled={sending} />
        <Button
          onClick={handleDelete}
          preset={sending ? Preset.saving : Preset.save}
          disabled={sending}
          text="Eliminar"
        />
      </Modal.Footer>
    </Modal>
  );
}
