export const orderTypeMap: Record<number, string> = {
  1: 'Venta Rápida',
  2: 'En Mesa',
  3: 'Delivery',
};

export const deliveryTypeMap: Record<number, string> = {
  1: 'Comer Aquí',
  2: 'Para Llevar',
  3: 'Delivery',
};

export const orderStatusMap: Record<number, { label: string; className: string }> = {
  1: { label: 'Activo', className: 'status-info' },
  2: { label: 'Guardado', className: 'status-success' },
  3: { label: 'Pagado', className: 'status-danger' },
  4: { label: 'Anulado', className: 'status-warning' },
  6: { label: 'Eliminada', className: 'status-warning' },
};

export const orderStatusModalMap: Record<number, { label: string; className: string }> = {
  1: { label: 'Activo', className: 'bg-info/10 text-info' },
  2: { label: 'Guardado', className: 'bg-success/10 text-success' },
  3: { label: 'Pagado', className: 'bg-purple-500/10 text-purple-500' },
  4: { label: 'Anulado', className: 'bg-danger/10 text-danger' },
  6: { label: 'Eliminada', className: 'bg-warning/10 text-warning' },
};
