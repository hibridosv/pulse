'use client'
import { useEffect } from 'react';
import useConfigStore from '@/stores/configStore';
import branchesStore from '@/stores/settings/branchesStore';
import useModalStore from '@/stores/modalStorage';
import useTempStorage from '@/stores/useTempStorage';
import { permissionExists } from '@/lib/utils';
import { getCountryProperty, getDepartmentNameById, getMunicipioNameById } from '@/lib/utils';

export function useBranchesLogic() {
  const { remoteUrls, tenants, locations, loading, sending, loadRemoteUrls, loadTenants, loadLocations, linkTenant } = branchesStore();
  const { system, user, permission } = useConfigStore();
  const { openModal } = useModalStore();
  const { setElement } = useTempStorage();

  const canAddTransfer = permissionExists(permission, 'config-transfers-add-transfer');

  useEffect(() => {
    if (user?.email) {
      loadRemoteUrls(user.email);
      loadTenants();
      loadLocations();
    }
  }, [user, loadRemoteUrls, loadTenants, loadLocations]);

  const handleSelectTenant = (tenant: any) => {
    setElement('changeTenant', tenant);
    openModal('changeTenant');
  };

  const handleLinkTenant = async (tenantId: number) => {
    await linkTenant(tenantId);
  };

  const getAddress = () => {
    const parts = [];
    if (system?.location) parts.push(system.location);
    if (system?.departament && locations) parts.push(getDepartmentNameById(system.departament, locations));
    if (system?.town && locations) parts.push(getMunicipioNameById(`${system.departament}${system.town}`, locations));
    return parts.filter(Boolean).join(', ');
  };

  const getCountryName = () => {
    return system?.country ? getCountryProperty(parseInt(system.country)).name : '';
  };

  return {
    remoteUrls,
    tenants,
    loading,
    sending,
    system,
    user,
    canAddTransfer,
    handleSelectTenant,
    handleLinkTenant,
    getAddress,
    getCountryName,
  };
}
