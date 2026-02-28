'use client'
import commissionsStore from '@/stores/tools/commissionsStore';
import { getServices } from '@/services/services';
import { useEffect, useState, useCallback } from 'react';

export function useCommissionsLogic(currentPage: string, searchTerm: string) {
  const {
    commissions,
    activeCommission,
    loading,
    saving,
    loadCommissions,
    loadActiveCommission,
    createCommission,
    cancelCommission,
    saveCommission,
  } = commissionsStore();

  const [refreshKey, setRefreshKey] = useState(0);
  const [contactSelected, setContactSelected] = useState<any>(null);
  const [contacts, setContacts] = useState<any[]>([]);
  const [selectedCount, setSelectedCount] = useState(0);

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), []);

  const handleSelectedCountChange = useCallback((count: number) => {
    setSelectedCount(count);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const hasActive = await loadActiveCommission();
      if (!hasActive) {
        const contactFilter = contactSelected ? `filterWhere[referred_id]==${contactSelected.id}&` : '';
        const url = `tools/commissions?${contactFilter}filterWhere[type]==1&included=employee_deleted,referred,linked.product.order&sort=-created_at&perPage=10${currentPage}`;
        loadCommissions(url);
      }
    };
    fetchData();
  }, [contactSelected, refreshKey, currentPage, loadActiveCommission, loadCommissions]);

  useEffect(() => {
    if (!searchTerm) {
      setContacts([]);
      return;
    }
    const fetchContacts = async () => {
      try {
        const response = await getServices(`contacts?filterWhere[is_referred]==1&filterWhere[status]==1&sort=-created_at&perPage=10${searchTerm}`);
        setContacts(response.data.data?.data ?? []);
      } catch {
        setContacts([]);
      }
    };
    fetchContacts();
  }, [searchTerm]);

  const clearContactState = () => {
    setContactSelected(null);
    setContacts([]);
  };

  const handleSelectContact = (contact: any) => {
    setContactSelected(contact);
    setContacts([]);
  };

  const handleCancelContact = () => {
    clearContactState();
  };

  const handleCancelSelect = () => {
    setContacts([]);
  };

  const handleCreateCommission = async () => {
    if (!contactSelected) return;
    const success = await createCommission(contactSelected.id);
    if (success) {
      clearContactState();
      refresh();
    }
  };

  const handleCancelCommission = async () => {
    if (!activeCommission?.data) return;
    const success = await cancelCommission(activeCommission.data.id, activeCommission.data.referred_id);
    if (success) {
      clearContactState();
      refresh();
    }
  };

  const handleSaveCommission = async () => {
    if (!activeCommission?.data) return;
    const success = await saveCommission(activeCommission.data.id, activeCommission.data.referred_id);
    if (success) {
      clearContactState();
      refresh();
    }
  };

  const downloadFilter = contactSelected ? `?filterWhere[referred_id]==${contactSelected.id}&` : '?';

  return {
    commissions,
    activeCommission,
    loading,
    saving,
    contactSelected,
    contacts,
    selectedCount,
    downloadFilter,
    refresh,
    handleSelectedCountChange,
    handleSelectContact,
    handleCancelContact,
    handleCancelSelect,
    handleCreateCommission,
    handleCancelCommission,
    handleSaveCommission,
  };
}
