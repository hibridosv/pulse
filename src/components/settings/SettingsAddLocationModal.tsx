import Modal from '@/components/modal/Modal';
import { Button, Preset } from '@/components/button/button';
import useLocationStore from '@/stores/products/LocationsStore';
import { useForm } from 'react-hook-form';

interface SettingsAddLocationModalProps {
  show: boolean;
  onClose: () => void;
}

export default function SettingsAddLocationModal({ show, onClose }: SettingsAddLocationModalProps) {
  const { createLocation, saving } = useLocationStore();
  const { register, handleSubmit, reset } = useForm();

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: any) => {
    const payload = { name: data.name.trim(), description: data.description?.trim() || '' };
    const success = await createLocation(payload);
    if (success) handleClose();
  };

  return (
    <Modal show={show} onClose={handleClose} headerTitle="Agregar Ubicación" size="sm">
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="input-label">Nombre</label>
            <input className="input" {...register('name', { required: true })} placeholder="Nombre de la ubicación" />
          </div>
          <div>
            <label className="input-label">Descripción</label>
            <input className="input" {...register('description')} placeholder="Descripción" />
          </div>

          <div className="flex justify-center">
            <Button type="submit" disabled={saving} preset={saving ? Preset.saving : Preset.save} />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} preset={Preset.close} disabled={saving} />
      </Modal.Footer>
    </Modal>
  );
}
