export const commissionStatusMap: Record<number, { label: string; className: string }> = {
  0: { label: 'Eliminado', className: 'status-danger' },
  1: { label: 'Activo', className: 'status-warning' },
  2: { label: 'Creado', className: 'status-info' },
  3: { label: 'Pagado', className: 'status-success' },
};

export const commissionTypeMap: Record<number, { label: string; className: string }> = {
  1: { label: 'Normal', className: 'status-info' },
  2: { label: 'Puntos Oro', className: 'status-warning' },
};
