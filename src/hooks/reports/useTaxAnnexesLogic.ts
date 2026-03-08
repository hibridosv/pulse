'use client';
import { DateTime } from 'luxon';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const MONTHS_ES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export const ANEXO_OPTIONS = [
  { value: '1', label: 'Ventas CF',       description: 'Ventas a Consumidor Final' },
  { value: '2', label: 'Contribuyentes',  description: 'Ventas a Contribuyentes' },
  { value: '3', label: 'Anulados',        description: 'Documentos Anulados' },
  { value: '4', label: 'Compras SE',      description: 'Compras a Sujetos Excluidos' },
];

export const SUCURSAL_OPTIONS = [
  { value: '0', label: 'Esta Sucursal' },
  { value: '1', label: 'Todas' },
];

export function useTaxAnnexesLogic() {
  const { data: session } = useSession();
  const remoteUrl = session?.url;
  const [selectedSucursal, setSelectedSucursal] = useState('0');

  const months = Array.from({ length: 3 }, (_, i) => {
    const dt = DateTime.now().minus({ months: i });
    return {
      monthName:   MONTHS_ES[dt.month - 1],
      year:        String(dt.year),
      initialDate: `${dt.startOf('month').toISODate()} 00:00:00`,
      finalDate:   `${dt.endOf('month').toISODate()} 23:59:59`,
    };
  });

  const buildUrl = (month: typeof months[0], anexoValue: string) => {
    if (!remoteUrl) return '#';
    const params = [
      `option=2`,
      `initialDate=${encodeURIComponent(month.initialDate)}`,
      `finalDate=${encodeURIComponent(month.finalDate)}`,
      `anexo=${anexoValue}`,
      `sucursal=${selectedSucursal}`,
    ].join('&');
    return `${remoteUrl}/download/excel/electronic/?${params}`;
  };

  return { months, selectedSucursal, setSelectedSucursal, buildUrl };
}
