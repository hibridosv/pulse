'use client';
import { ViewTitle } from "@/components/ViewTitle";
import { permissionExists } from "@/lib/utils";
import { createService, getServices } from "@/services/services";
import useConfigStore from "@/stores/configStore";
import useToastMessageStore from "@/stores/toastMessageStore";
import { useEffect, useState } from "react";
import { BiAnalyse } from "react-icons/bi";

const canViewRole = (userRole: string, roleName: string): boolean => {
  if (userRole === "Root") return true;
  if (userRole === "Gerencia" && roleName !== "Root") return true;
  if (userRole === "Administracion" && roleName !== "Root" && roleName !== "Gerencia") return true;
  return false;
};


export default function Page() {
  const { permission, role } = useConfigStore();
  const [roles, setRoles] = useState<any[]>([]);
  const [allPermissions, setAllPermissions] = useState<any[]>([]);
  const [roleData, setRoleData] = useState<any>(null);
  const [selectedRoleName, setSelectedRoleName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

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
    console.log(`Changing permission ${roleData?.name}`);
    try {
      const response = await createService('roles/change', { is_active: isActive, iden, role: roleData?.name });
      setRoleData(response.data.data);
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      setUpdatingId(null);
    }
  };


  if (!allPermissions.length) return null;

  const visibleRoles = roles.filter((r: any) => role && canViewRole(role, r.name));
  const rolePermissions = roleData?.permissions ?? [];
  const isSameRole = role === roleData?.name;

  return (
    <div className="pb-4 md:pb-10">
      <ViewTitle text="Permisos de Usuario" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
        <div className="md:col-span-3">
          <div className="bg-bg-content rounded-lg shadow-sm border border-bg-subtle overflow-hidden">
            <div className="px-4 py-3 bg-bg-subtle/60 border-b border-bg-subtle">
              <span className="text-sm font-semibold text-text-base">Roles</span>
            </div>
            {visibleRoles.map((item: any) => (
              <button
                key={item.id ?? item.name}
                onClick={() => handleGetPermissions(item.name)}
                className={`w-full flex items-center px-4 py-3 text-sm transition-colors border-b border-bg-subtle last:border-b-0 ${
                  selectedRoleName === item.name
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-text-muted hover:bg-bg-subtle/50"
                }`}
              >
                <BiAnalyse className="mr-2" />
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-9">
          {isSameRole && (
            <div className="mb-3 px-4 py-3 rounded-lg bg-danger/10 border border-danger/30 text-danger text-sm font-medium">
              Advertencia: Eliminar un permiso de usuario en su mismo rol no es revertible
            </div>
          )}

          <div className="bg-bg-content rounded-lg shadow-sm border border-bg-subtle overflow-hidden">
            <div className="px-4 py-3 bg-bg-subtle/60 border-b-2 border-bg-subtle flex items-center justify-between">
              <span className="text-sm font-semibold text-text-base">
                Permisos asignados {selectedRoleName && `— ${selectedRoleName}`}
              </span>
            </div>

            {isLoading ? (
              <div className="p-8 text-center text-text-muted text-sm animate-pulse">
                Obteniendo permisos...
              </div>
            ) : (
              <div className="divide-y divide-bg-subtle">
                {allPermissions.map((item: any, index: number) => {
                  const isChecked = permissionExists(rolePermissions, item.name);
                  const isUpdating = updatingId === item.uuid;
                  const userHasPermission = permissionExists(permission, item.name);
                  const isRootRole = roleData?.name === "Root";
                  const isDisabled = isUpdating || !userHasPermission || isRootRole;

                  return (
                    <div key={item.uuid ?? index} className={`flex items-center justify-between px-4 py-3 hover:bg-bg-subtle/30 transition-all ${isUpdating ? 'opacity-60' : ''}`}>
                      <span className="text-sm font-medium text-text-base pr-4">
                        <span className="text-text-muted mr-2">{index + 1}.</span>
                        {item.description}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        {isUpdating ? (
                          <span className="text-xs text-primary font-medium animate-pulse">Actualizando...</span>
                        ) : (
                          <span className={`text-xs font-medium transition-colors ${isChecked ? 'text-success' : 'text-text-muted'}`}>
                            {isChecked ? 'Activo' : 'Inactivo'}
                          </span>
                        )}
                        <button
                          disabled={isDisabled}
                          onClick={() => handleChangePermission(isChecked, item.uuid)}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 ${
                            isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                          } ${isChecked ? 'bg-success' : 'bg-gray-300'}`}
                        >
                          {isUpdating && (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <span className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                            </span>
                          )}
                          <span
                            className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                              isChecked ? 'translate-x-4' : 'translate-x-1'
                            } ${isUpdating ? 'opacity-0' : ''}`}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
