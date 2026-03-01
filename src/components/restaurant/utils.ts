import { IndicatorType } from '@/components/Indicators';

export const orderTypeMap: Record<number, string> = {
  1: 'Venta Rápida',
  2: 'En Mesa',
  3: 'Delivery',
};

export const deliveryTypeMap: Record<number, { label: string; type: IndicatorType }> = {
  1: { label: 'Comer Aquí', type: 'success' },
  2: { label: 'Para Llevar', type: 'warning' },
  3: { label: 'Delivery', type: 'danger' },
};

export const orderStatusMap: Record<number, { label: string; type: IndicatorType }> = {
  1: { label: 'Activo', type: 'info' },
  2: { label: 'Guardado', type: 'success' },
  3: { label: 'Pagado', type: 'danger' },
  4: { label: 'Anulado', type: 'warning' },
  6: { label: 'Eliminada', type: 'warning' },
};

export const orderStatusModalMap: Record<number, { label: string; className: string }> = {
  1: { label: 'Activo', className: 'bg-info/10 text-info' },
  2: { label: 'Guardado', className: 'bg-success/10 text-success' },
  3: { label: 'Pagado', className: 'bg-purple-500/10 text-purple-500' },
  4: { label: 'Anulado', className: 'bg-danger/10 text-danger' },
  6: { label: 'Eliminada', className: 'bg-warning/10 text-warning' },
};
