'use client';

import { ViewTitle } from '@/components/ViewTitle';
import { Pagination } from '@/components/Pagination';
import { SearchInput } from '@/components/Search';
import { Button, Preset } from '@/components/button/button';
import { ButtonDownload } from '@/components/button/button-download';
import { CommissionsListTable } from '@/components/tools/CommissionsListTable';
import { CommissionsProductsTable } from '@/components/tools/CommissionsProductsTable';
import { CommissionViewModal } from '@/components/tools/CommissionViewModal';
import { useCommissionsLogic } from '@/hooks/tools/useCommissionsLogic';
import { useSearchTerm } from '@/hooks/useSearchTerm';
import { usePagination } from '@/hooks/usePagination';
import useModalStore from '@/stores/modalStorage';
import useTempStorage from '@/stores/useTempStorage';
import { FaDownload } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

export default function Page() {
  const { currentPage, handlePageNumber } = usePagination('&page=1');
  const { searchTerm, handleSearchTerm } = useSearchTerm(['name', 'id_number', 'code', 'phone'], 500);
  const { modals, closeModal } = useModalStore();
  const { elements } = useTempStorage();

  const {
    commissions, activeCommission, loading, saving,
    contactSelected, contacts, selectedCount, downloadFilter,
    refresh, handleSelectedCountChange,
    handleSelectContact, handleCancelContact, handleCancelSelect,
    handleCreateCommission, handleCancelCommission, handleSaveCommission,
  } = useCommissionsLogic(currentPage, searchTerm);

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-4 md:pb-10">
      <div className="md:col-span-7 md:border-r md:border-primary">
        <ViewTitle text={activeCommission ? 'FACTURAS PENDIENTES DE PAGAR' : 'REPORTE DE COMISIONES POR CLIENTE'} />
        <div className="p-2 md:p-4">
          {activeCommission ? (
            <CommissionsProductsTable
              referredId={activeCommission.data?.referred_id}
              onSelectedCountChange={handleSelectedCountChange}
            />
          ) : (
            <>
              <CommissionsListTable records={commissions} isLoading={loading} />
              <Pagination records={commissions} handlePageNumber={handlePageNumber} />
            </>
          )}
        </div>
      </div>

      <div className="md:col-span-3">
        <ViewTitle text={activeCommission ? 'NUEVA COMISION' : 'BUSCAR CLIENTE'} />

        {activeCommission ? (
          <div className="p-4">
            <div className="w-full my-4 shadow-lg rounded-lg bg-bg-content border border-bg-subtle">
              <div className="flex justify-center pt-3 font-bold text-text-base">Facturas seleccionadas</div>
              <div className="flex justify-center text-3xl pb-4 font-bold text-primary">{selectedCount}</div>
            </div>
            <div className="mt-6 flex gap-2">
              <Button
                text="Cancelar"
                isFull={selectedCount === 0}
                preset={Preset.cancel}
                onClick={handleCancelCommission}
                disabled={saving}
              />
              {selectedCount > 0 && (
                <Button
                  text="Guardar"
                  isFull
                  preset={saving ? Preset.saving : Preset.save}
                  onClick={handleSaveCommission}
                  disabled={saving}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="p-2 md:p-4">
            <SearchInput handleSearchTerm={handleSearchTerm} placeholder="Buscar cliente referido" />

            {contacts.length > 0 && (
              <div className="w-full bg-bg-content rounded-lg shadow-lg mt-3 border border-bg-subtle overflow-hidden">
                <ul className="divide-y divide-bg-subtle">
                  {contacts.map((contact: any) => (
                    <li
                      key={contact.id}
                      className="flex justify-between items-center p-3 hover:bg-primary/10 hover:text-primary cursor-pointer text-text-base transition-colors"
                      onClick={() => handleSelectContact(contact)}
                    >
                      <span>{contact.name} {contact.id_number ? `| ${contact.id_number}` : ''}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </li>
                  ))}
                  <li
                    className="flex justify-between items-center p-3 hover:bg-danger/10 hover:text-danger cursor-pointer text-text-muted transition-colors"
                    onClick={handleCancelSelect}
                  >
                    CANCELAR
                    <IoClose size={20} />
                  </li>
                </ul>
              </div>
            )}

            {contactSelected && (
              <div className="flex justify-between items-center px-3 py-2 mt-3 uppercase text-lg font-semibold bg-bg-content shadow-md rounded-lg border border-bg-subtle text-text-base">
                <span className="truncate">{contactSelected.name}</span>
                <Button noText preset={Preset.smallClose} onClick={handleCancelContact} />
              </div>
            )}

            {contactSelected && !activeCommission && (
              <div className="mt-6">
                <Button
                  disabled={!contactSelected || saving}
                  isFull
                  preset={Preset.primary}
                  text="AGREGAR"
                  onClick={handleCreateCommission}
                />
              </div>
            )}

            {commissions && (
              <div className="mt-6 pt-4 border-t border-bg-subtle">
                <div className="uppercase flex justify-center font-bold text-text-base mb-3">Descargar</div>
                <ButtonDownload
                  href={`download/excel/commissions/report/${downloadFilter}included=employee_deleted,referred,linked.product.order&sort=-created_at`}
                  autoclass={false}
                  divider="&"
                >
                  <div className="flex items-center justify-center gap-2 p-3 bg-bg-content rounded-lg border border-bg-subtle hover:bg-bg-subtle transition-colors clickeable text-text-base">
                    <FaDownload size={16} />
                    <span className="font-medium">DESCARGAR REPORTE EXCEL</span>
                  </div>
                </ButtonDownload>
              </div>
            )}
          </div>
        )}
      </div>

      <CommissionViewModal
        isShow={modals.commissionDetail}
        onClose={() => closeModal('commissionDetail')}
        record={elements.commissionDetail}
        onAction={refresh}
      />
    </div>
  );
}
