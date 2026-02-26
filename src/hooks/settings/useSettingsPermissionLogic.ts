'use client'

import { canViewRole } from "@/app/settings/utils";
import { createService, getServices } from "@/services/services";
import useConfigStore from "@/stores/configStore";
import useToastMessageStore from "@/stores/toastMessageStore";
import { useEffect, useState } from "react";

export function useSettingsPermissionLogic() {
    const [roles, setRoles] = useState<any[]>([]);
    const [allPermissions, setAllPermissions] = useState<any[]>([]);
    const [roleData, setRoleData] = useState<any>(null);
    const [selectedRoleName, setSelectedRoleName] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const { role } = useConfigStore();

      useEffect(() => {
        const loadInitialData = async () => {
          try {
            const [permRes, rolesRes] = await Promise.all([
              getServices('roles/permissions'),
              getServices('roles/roles'),
            ]);
            setAllPermissions(permRes.data.data ?? []);
            setRoles(rolesRes.data.data ?? []);
          } catch (error) {
            useToastMessageStore.getState().setError(error);
          }
        };
        loadInitialData();
      }, []);
    
      useEffect(() => {
        if (roles.length > 0 && !roleData) {
          const firstVisible = roles.find((r: any) => role && canViewRole(role, r.name));
          if (firstVisible) handleGetPermissions(firstVisible.name);
        }
        // eslint-disable-next-line
      }, [roles]);
    
    
    
      const handleGetPermissions = async (roleName: string) => {
        setIsLoading(true);
        setSelectedRoleName(roleName);
        try {
          const response = await getServices(`roles/find/${roleName}`);
          setRoleData(response.data.data);
        } catch (error) {
          useToastMessageStore.getState().setError(error);
        } finally {
          setIsLoading(false);
        }
      };
    
      const handleChangePermission = async (isActive: boolean, iden: string) => {
        setUpdatingId(iden);
        try {
          const response = await createService('roles/change', { is_active: isActive, iden, role: roleData?.name });
          setRoleData(response.data.data);
        } catch (error) {
          useToastMessageStore.getState().setError(error);
        } finally {
          setUpdatingId(null);
        }
      };
    
    return { handleChangePermission, handleGetPermissions, allPermissions, roles, roleData, selectedRoleName, isLoading, updatingId };
}
