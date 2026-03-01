import { Button, Preset } from '@/components/button/button';
import { Switch } from '@/components/button/Switch';
import Modal from '@/components/modal/Modal';
import useCategoriesStore from '@/stores/products/categoriesStore';
import { useForm } from 'react-hook-form';

interface SettingsAddCategoryModalProps {
  show: boolean;
  onClose: () => void;
  categories: any[];
}

export default function SettingsAddCategoryModal({ show, onClose, categories }: SettingsAddCategoryModalProps) {
  const { createCategory, saving } = useCategoriesStore();
  const { register, handleSubmit, reset, watch, setValue } = useForm();

  const isSubcategory = watch('isSubcategory', false);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: any) => {
    const payload = {
      name: data.name.trim(),
      pronoun: data.name.trim(),
      category_type: data.isSubcategory ? 2 : 1,
      dependable: data.isSubcategory ? data.dependable : null,
    };

    const success = await createCategory(payload);
    if (success) handleClose();
  };

  return (
    <Modal show={show} onClose={handleClose} headerTitle="Agregar Categoría" size="sm">
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Switch
            checked={isSubcategory}
            onChange={(checked: boolean) => {
              setValue('isSubcategory', checked);
              if (!checked) setValue('dependable', '');
            }}
            label="Subcategoría"
            sizing="sm"
          />

          {isSubcategory && (
            <div>
              <label className="input-label">Categoría Principal</label>
              <select className="input-select" {...register('dependable', { required: isSubcategory })}>
                <option value="">Seleccionar...</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="input-label">Nombre</label>
            <input className="input" {...register('name', { required: true })} placeholder="Nombre de la categoría" />
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
