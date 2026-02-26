'use client';
import Modal from '@/components/modal/Modal';
import { Button, Preset } from '@/components/button/button';
import useUserStore from '@/stores/UserStore';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

interface EditUserNameModalProps {
  isShow: boolean;
  onClose: () => void;
  user: any;
  onSubmit: (userId: string, data: any) => Promise<boolean>;
}

export function EditUserNameModal({ isShow, onClose, user, onSubmit }: EditUserNameModalProps) {
  const { saving } = useUserStore();
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (isShow && user) {
      setValue('name', user.name);
    }
  }, [isShow, user, setValue]);

  const handleFormSubmit = async (data: any) => {
    const success = await onSubmit(user.id, data);
    if (success) reset();
  };

  return (
    <Modal show={isShow} onClose={onClose} size="md" headerTitle="Cambiar nombre de usuario">
      <Modal.Body>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full">
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full px-3 mb-2">
              <label htmlFor="edit-name" className="input-label">Nombre de usuario *</label>
              <input type="text" id="edit-name" {...register('name', { required: true })} className="input" />
            </div>
          </div>
          <div className="flex justify-center">
            <Button type="submit" disabled={saving} preset={saving ? Preset.saving : Preset.save} />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} disabled={saving} />
      </Modal.Footer>
    </Modal>
  );
}
