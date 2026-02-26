'use client';
import { Button, Preset } from '@/components/button/button';
import Modal from '@/components/modal/Modal';
import useUserStore from '@/stores/UserStore';
import { useForm } from 'react-hook-form';

interface EditUserPasswordModalProps {
  isShow: boolean;
  onClose: () => void;
  user: any;
  onSubmit: (userId: string, data: any) => Promise<boolean>;
}

export function EditUserPasswordModal({ isShow, onClose, user, onSubmit }: EditUserPasswordModalProps) {
  const { saving } = useUserStore();
  const { register, handleSubmit, reset } = useForm();

  const handleFormSubmit = async (data: any) => {
    const success = await onSubmit(user.id, data);
    if (success) reset();
  };

  return (
    <Modal show={isShow} onClose={onClose} size="md" headerTitle="Cambiar password">
      <Modal.Body>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full">
          <div className="flex flex-wrap mb-4">
            <div className="w-full px-3 mb-2">
              <label htmlFor="edit-password" className="input-label">Password *</label>
              <input type="password" id="edit-password" {...register('password', { required: true })} className="input" />
            </div>
            <div className="w-full px-3 mb-2">
              <label htmlFor="edit-password-confirm" className="input-label">Repetir Password *</label>
              <input type="password" id="edit-password-confirm" {...register('password_confirmation', { required: true })} className="input" />
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
