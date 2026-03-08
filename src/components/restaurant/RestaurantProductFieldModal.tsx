'use client';
import { Button, Preset } from '@/components/button/button';
import Modal from '@/components/modal/Modal';
import manageRestaurantStore from '@/stores/restaurant/manageRestaurantStore';
import useModalStore from '@/stores/modalStorage';
import useTempStorage from '@/stores/useTempStorage';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  isShow: boolean;
  onClose: () => void;
}

export function RestaurantProductFieldModal({ isShow, onClose }: Props) {
  const { updateProduct, sending } = manageRestaurantStore();
  const { getElement } = useTempStorage();
  const { register, handleSubmit, reset } = useForm();

  const selectedProduct = getElement('menuProduct');
  const fieldData = getElement('menuProductFieldData');

  useEffect(() => { if (isShow) reset(); }, [isShow, reset]);

  const onSubmit = async (data: any) => {
    if (!selectedProduct || !fieldData) return;
    const success = await updateProduct(selectedProduct.id, { field: fieldData.field, data: data.value });
    if (success) onClose();
  };

  return (
    <Modal show={isShow} onClose={onClose} size="sm" headerTitle={fieldData?.text ?? 'Editar'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div className="p-2 space-y-3">
            <label className="input-label">{fieldData?.text}</label>
            <input
              type={fieldData?.type ?? 'text'}
              {...register('value', { required: true })}
              className="input"
              step="any"
              autoFocus
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose} preset={Preset.close} disabled={sending} />
          <Button onClick={handleSubmit(onSubmit)} preset={sending ? Preset.saving : Preset.save} disabled={sending} text="Guardar" />
        </Modal.Footer>
      </form>
    </Modal>
  );
}
