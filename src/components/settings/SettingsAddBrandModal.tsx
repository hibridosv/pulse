import { Button, Preset } from '@/components/button/button';
import Modal from '@/components/modal/Modal';
import { getServices } from '@/services/services';
import useBrandsStore from '@/stores/products/brandsStore';
import { useEffect, useState } from 'react';

interface SettingsAddBrandModalProps {
  show: boolean;
  onClose: () => void;
}

export default function SettingsAddBrandModal({ show, onClose }: SettingsAddBrandModalProps) {
  const { createBrand, saving } = useBrandsStore();
  const [name, setName] = useState('');
  const [providerId, setProviderId] = useState('');
  const [providers, setProviders] = useState<any[]>([]);

  useEffect(() => {
    if (show) {
      getServices('contacts?filter[is_provider]==1&filterWhere[status]==1').then((res) => {
        setProviders(res.data.data ?? []);
      });
    }
  }, [show]);

  const handleClose = () => {
    setName('');
    setProviderId('');
    onClose();
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;
    const data: any = { name: name.trim() };
    if (providerId) data.provider_id = providerId;
    const success = await createBrand(data);
    if (success) handleClose();
  };

  return (
    <Modal show={show} onClose={handleClose} headerTitle="Agregar Marca" size="sm">
      <Modal.Body>
        <div className="space-y-4">
          <div>
            <label className="input-label">Proveedor (opcional)</label>
            <select className="input-select" value={providerId} onChange={(e) => setProviderId(e.target.value)}>
              <option value="">Sin proveedor</option>
              {providers.map((p: any) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="input-label">Nombre</label>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre de la marca" />
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
