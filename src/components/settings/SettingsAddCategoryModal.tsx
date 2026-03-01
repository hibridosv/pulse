import { Button, Preset } from '@/components/button/button';
import { Switch } from '@/components/button/Switch';
import Modal from '@/components/modal/Modal';
import useCategoriesStore from '@/stores/products/categoriesStore';
import { useState } from 'react';

interface SettingsAddCategoryModalProps {
  show: boolean;
  onClose: () => void;
  categories: any[];
}

export default function SettingsAddCategoryModal({ show, onClose, categories }: SettingsAddCategoryModalProps) {
  const { createCategory, saving } = useCategoriesStore();
  const [name, setName] = useState('');
  const [isSubcategory, setIsSubcategory] = useState(false);
  const [parentId, setParentId] = useState('');

  const handleClose = () => {
    setName('');
    setIsSubcategory(false);
    setParentId('');
    onClose();
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;
    if (isSubcategory && !parentId) return;

    const data = {
      name: name.trim(),
      pronoun: name.trim(),
      category_type: isSubcategory ? 2 : 1,
      dependable: isSubcategory ? parentId : null,
    };

    const success = await createCategory(data);
    if (success) handleClose();
  };

  return (
    <Modal show={show} onClose={handleClose} headerTitle="Agregar Categoría" size="sm">
      <Modal.Body>
        <div className="space-y-4">
          <Switch
            checked={isSubcategory}
            onChange={(checked) => {
              setIsSubcategory(checked);
              if (!checked) setParentId('');
            }}
            label="Subcategoría"
            sizing="sm"
          />

          {isSubcategory && (
            <div>
              <label className="input-label">Categoría Principal</label>
              <select className="input-select" value={parentId} onChange={(e) => setParentId(e.target.value)}>
                <option value="">Seleccionar...</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="input-label">Nombre</label>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre de la categoría" />
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
