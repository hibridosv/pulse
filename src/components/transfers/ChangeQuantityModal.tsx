'use client';
import { useEffect } from 'react';
import Modal from '@/components/modal/Modal';
import { Button, Preset } from '@/components/button/button';
import { useForm } from 'react-hook-form';

interface ChangeQuantityModalProps {
  isShow: boolean;
  onClose: () => void;
  onSubmit: (quantity: number) => void;
  sending?: boolean;
}

export function ChangeQuantityModal({ isShow, onClose, onSubmit, sending }: ChangeQuantityModalProps) {
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (isShow) {
      setValue('quantity', '');
    }
  }, [isShow, setValue]);

  const handleFormSubmit = (data: any) => {
    if (!data.quantity) return;
    onSubmit(data.quantity);
    onClose();
  };

  return (
    <Modal
      show={isShow}
      onClose={onClose}
      headerTitle="Cambiar Cantidad"
      size="sm"
    >
      <Modal.Body>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-4">
            <label htmlFor="modal-quantity" className="input-label">Cantidad *</label>
            <input
              type="number"
              id="modal-quantity"
              {...register('quantity')}
              className="input"
              step="any"
              min={0}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button preset={Preset.cancel} onClick={onClose} />
            <Button type="submit" preset={sending ? Preset.saving : Preset.save} />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
