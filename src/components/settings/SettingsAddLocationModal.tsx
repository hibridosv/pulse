import { useState } from 'react';
import Modal from '@/components/modal/Modal';
import { Button, Preset } from '@/components/button/button';
import useLocationStore from '@/stores/products/LocationsStore';

interface SettingsAddLocationModalProps {
  show: boolean;
  onClose: () => void;
}

export default function SettingsAddLocationModal({ show, onClose }: SettingsAddLocationModalProps) {
  const { createLocation, saving } = useLocationStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleClose = () => {
    setName('');
    setDescription('');
    onClose();
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;
    const data = { name: name.trim(), description: description.trim() };
    const success = await createLocation(data);
    if (success) handleClose();
  };

  return (
    <Modal show={show} onClose={handleClose} headerTitle="Agregar Ubicación" size="sm">
      <Modal.Body>
        <div className="space-y-4">
          <div>
            <label className="input-label">Nombre</label>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre de la ubicación" />
          </div>
          <div>
            <label className="input-label">Descripción</label>
            <input className="input" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button preset={Preset.cancel} onClick={handleClose} />
        {saving
          ? <Button preset={Preset.saving} />
          : <Button preset={Preset.save} onClick={handleSubmit} />
        }
      </Modal.Footer>
    </Modal>
  );
}
