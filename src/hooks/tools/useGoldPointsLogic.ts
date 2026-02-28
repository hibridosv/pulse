'use client'
import { DateRangeValues } from '@/components/button/DateRange';
import goldPointsStore from '@/stores/tools/goldPointsStore';
import useToastMessageStore from '@/stores/toastMessageStore';
import { useEffect, useState, useCallback } from 'react';

export function useGoldPointsLogic() {
  const {
    commissions,
    loading,
    saving,
    loadCommissions,
    createGoldCommission,
  } = goldPointsStore();

  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), []);

  useEffect(() => {
    const url = `tools/commissions?filterWhere[type]==2&included=employee_deleted,referred&sort=-created_at`;
    loadCommissions(url);
  }, [refreshKey, loadCommissions]);

  const handleCreateGoldCommission = async (data: DateRangeValues) => {
    if (data.option !== '2') {
      useToastMessageStore.getState().setError('Seleccione un rango de fechas');
      return;
    }
    const payload = {
      type: 2,
      initialDate: data.initialDate,
      finalDate: data.finalDate,
      option: data.option,
    };
    await createGoldCommission(payload);
    refresh();
  };

  return {
    commissions,
    loading,
    saving,
    refresh,
    handleCreateGoldCommission,
  };
}
