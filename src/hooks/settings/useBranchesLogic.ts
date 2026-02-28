'use client'
import { getCountryProperty, getDepartmentNameById, getMunicipioNameById, permissionExists } from '@/lib/utils';
import useConfigStore from '@/stores/configStore';
import useModalStore from '@/stores/modalStorage';
import branchesStore from '@/stores/settings/branchesStore';
import useTempStorage from '@/stores/useTempStorage';
import { useEffect } from 'react';
import { useDepartaments } from '../locations/useDepartaments';

export function useBranchesLogic() {
  const { remoteUrls, tenants, loading, sending, loadRemoteUrls, loadTenants, linkTenant } = branchesStore();
  const { system, user, permission } = useConfigStore();
  const { openModal } = useModalStore();
  const { setElement } = useTempStorage();
  const { departaments } = useDepartaments();
  const canAddTransfer = permissionExists(permission, 'config-transfers-add-transfer');

  useEffect(() => {
    if (user?.email) {
      loadRemoteUrls(user.email);
      loadTenants();
    }
  }, [user, loadRemoteUrls, loadTenants]);

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
    if (system?.departament && departaments) parts.push(getDepartmentNameById(system.departament, departaments));
    if (system?.town && departaments) parts.push(getMunicipioNameById(`${system.departament}${system.town}`, departaments));
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
