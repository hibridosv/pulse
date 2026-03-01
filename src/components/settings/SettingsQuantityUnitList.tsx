import { Switch } from '@/components/button/Switch';
import useQuantityUnitStore from '@/stores/products/QuantityUnitStore';
import { useEffect, useState } from 'react';

export default function SettingsQuantityUnitList() {
  const { quantityUnits, loading, loadQuantityUnits, updateQuantityUnit } = useQuantityUnitStore();
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    loadQuantityUnits();
  }, []);

  const handleToggle = async (unit: any) => {
    setUpdatingId(unit.id);
    const newStatus = unit.status === 1 ? 0 : 1;
    await updateQuantityUnit(unit.id, { status: newStatus });
    setUpdatingId(null);
  };

  if (!quantityUnits || quantityUnits.length === 0) return <div className="p-8 text-center text-text-muted text-sm">No hay unidades de medida</div>;

  return (
    <div className="p-4">
      <div className="mb-4">
        <span className="text-sm font-semibold text-text-base">Unidades de Medida</span>
      </div>

      <div className="divide-y divide-bg-subtle">
        {quantityUnits.map((unit: any) => (
          <div key={unit.id} className={`flex items-center justify-between py-2.5 px-2 hover:bg-bg-subtle/30 transition-colors ${updatingId === unit.id ? 'opacity-60' : ''}`}>
            <span className="text-sm text-text-base">{unit.name}</span>
            <Switch
              checked={unit.status === 1}
              onChange={() => handleToggle(unit)}
              label={unit.status === 1 ? 'Activo' : 'Inactivo'}
              sizing="sm"
              disabled={updatingId === unit.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
