'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ViewTitle } from '@/components/ViewTitle';
import { Button, Preset } from '@/components/button/button';
import { UsersTable } from '@/components/settings/UsersTable';
import { EditUserNameModal } from '@/components/settings/EditUserNameModal';
import { EditUserPasswordModal } from '@/components/settings/EditUserPasswordModal';
import { EditUserRoleModal } from '@/components/settings/EditUserRoleModal';
import { DeleteModal } from '@/components/DeleteModal';
import { ToasterMessage } from '@/components/toaster-message';
import { useUsersLogic } from '@/hooks/settings/useUsersLogic';
import useModalStore from '@/stores/modalStorage';
import useTempStorage from '@/stores/useTempStorage';
import { FaUser, FaUsers } from 'react-icons/fa';

export default function Page() {
  const { register, handleSubmit, reset } = useForm();
  const { onCreateUser, onDeleteUser, onUpdateName, onUpdatePassword, onUpdateRole, userType, saving } = useUsersLogic();
  const { modals, closeModal } = useModalStore();
  const { getElement } = useTempStorage();
  const [showAll, setShowAll] = useState(false);

  const onSubmit = async (data: any) => {
    const success = await onCreateUser(data);
    if (success) reset();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-4 md:pb-10">
      <div className="md:col-span-4 md:border-r md:border-primary">
        <ViewTitle text="Ingresar Usuario" />
        <div className="mx-4">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3 mb-2">
                <label htmlFor="name" className="input-label">Nombre *</label>
                <input type="text" id="name" {...register('name')} className="input" />
              </div>

              <div className="w-full px-3 mb-2">
                <label htmlFor="email" className="input-label">Email *</label>
                <input type="email" id="email" {...register('email')} className="input" />
              </div>

              <div className="w-full px-3 mb-2">
                <label htmlFor="password" className="input-label">Password *</label>
                <input type="password" id="password" {...register('password')} className="input" />
              </div>

              <div className="w-full px-3 mb-2">
                <label htmlFor="password_confirmation" className="input-label">Repetir Password *</label>
                <input type="password" id="password_confirmation" {...register('password_confirmation')} className="input" />
              </div>

              <div className="w-full px-3 mb-2">
                <label htmlFor="type" className="input-label">Tipo de usuario *</label>
                <select id="type" {...register('type')} className="input-select">
                  <option value="Gerencia">Gerencia</option>
                  <option value="Administracion">Administracion</option>
                  <option value="Cajero">Cajero</option>
                  <option value={userType}>{userType}</option>
                  <option value="Contador">Contador</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <Button type="submit" disabled={saving} preset={saving ? Preset.saving : Preset.save} />
            </div>
          </form>
        </div>
      </div>

      <div className="md:col-span-6">
        <div className="flex justify-between items-center">
          <ViewTitle text="Listado de Usuarios" />
          <div className="flex rounded-lg border border-bg-subtle overflow-hidden bg-bg-content shrink-0 mr-4">
            <button
              onClick={() => setShowAll(false)}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium transition-colors ${!showAll ? 'bg-primary text-text-inverted' : 'text-text-muted hover:bg-bg-subtle'}`}
            >
              <FaUser size={11} />
              Activos
            </button>
            <button
              onClick={() => setShowAll(true)}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium transition-colors ${showAll ? 'bg-primary text-text-inverted' : 'text-text-muted hover:bg-bg-subtle'}`}
            >
              <FaUsers size={11} />
              Todos
            </button>
          </div>
        </div>
        <div className="px-4">
          <UsersTable showAll={showAll} />
        </div>
      </div>

      <EditUserNameModal
        isShow={!!modals.editUserName}
        onClose={() => closeModal('editUserName')}
        user={getElement('editUserName')}
        onSubmit={onUpdateName}
      />

      <EditUserPasswordModal
        isShow={!!modals.editUserPassword}
        onClose={() => closeModal('editUserPassword')}
        user={getElement('editUserPassword')}
        onSubmit={onUpdatePassword}
      />

      <EditUserRoleModal
        isShow={!!modals.editUserRole}
        onClose={() => closeModal('editUserRole')}
        user={getElement('editUserRole')}
        onSubmit={onUpdateRole}
      />

      <DeleteModal
        isShow={!!modals.deleteUser}
        text="¿Estás seguro de eliminar este usuario?"
        header="Eliminar Usuario"
        onDelete={() => onDeleteUser(getElement('deleteUser')?.id)}
        onClose={() => closeModal('deleteUser')}
      />

      <ToasterMessage />
    </div>
  );
}
