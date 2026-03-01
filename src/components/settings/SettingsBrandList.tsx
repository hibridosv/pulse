import { Button, Preset } from '@/components/button/button';
import { DeleteModal } from '@/components/DeleteModal';
import useBrandsStore from '@/stores/products/brandsStore';
import { useEffect, useState } from 'react';
import SettingsAddBrandModal from './SettingsAddBrandModal';

export default function SettingsBrandList() {
  const { brands, loading, loadBrands, deleteBrand, deleting } = useBrandsStore();
  const [showAdd, setShowAdd] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);

  useEffect(() => {
    loadBrands();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const success = await deleteBrand(deleteTarget.id);
    if (success) setDeleteTarget(null);
  };


  if (!brands || brands.length === 0) return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold text-text-base">Marcas</span>
        <Button preset={Preset.add} text="Agregar" onClick={() => setShowAdd(true)} />
      </div>
      <div className="p-8 text-center text-text-muted text-sm">No hay marcas</div>
      <SettingsAddBrandModal show={showAdd} onClose={() => setShowAdd(false)} />
    </div>
  );

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-text-base">Marcas</span>
          <Button preset={Preset.add} text="Agregar" onClick={() => setShowAdd(true)} />
        </div>

        <div className="divide-y divide-bg-subtle">
          {brands.map((brand: any) => (
            <div key={brand.id} className="flex items-center justify-between py-2.5 px-2 hover:bg-bg-subtle/30 transition-colors">
              <span className="text-sm text-text-base">{brand.name}</span>
              <Button preset={Preset.smallClose} onClick={() => setDeleteTarget(brand)} />
            </div>
          ))}
        </div>
      </div>

      <SettingsAddBrandModal show={showAdd} onClose={() => setShowAdd(false)} />

      <DeleteModal
        isShow={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onDelete={handleDelete}
        text={`¿Está seguro de eliminar la marca "${deleteTarget?.name}"?`}
        isSending={deleting}
      />
    </>
  );
}
