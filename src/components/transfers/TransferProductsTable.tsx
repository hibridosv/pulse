'use client';
import { useState } from 'react';
import { numberToMoney } from '@/lib/utils';
import { IoIosAlert, IoIosCloseCircle } from 'react-icons/io';
import { DeleteModal } from '@/components/DeleteModal';
import { NothingHere } from '@/components/NothingHere';
import SkeletonTable from '@/components/skeleton/skeleton-table';
import { ChangeQuantityModal } from './ChangeQuantityModal';

interface TransferProductsTableProps {
  products: any[];
  onDelete: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  sending?: boolean;
  loading?: boolean;
  deleteActive?: boolean;
}

export function TransferProductsTable({ products, onDelete, onUpdateQuantity, sending, loading, deleteActive }: TransferProductsTableProps) {
  const [recordSelect, setRecordSelect] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showQuantityModal, setShowQuantityModal] = useState(false);

  if (loading) return <SkeletonTable rows={8} columns={6} />;

  if (!products || products.length === 0) return <NothingHere text="No se encontraron productos" />;

  const handleDeleteClick = (record: any) => {
    setRecordSelect(record);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (recordSelect) {
      onDelete(recordSelect.id);
      setShowDeleteModal(false);
      setRecordSelect(null);
    }
  };

  const handleQuantityClick = (record: any) => {
    if (record.requested_exists !== 1) return;
    setRecordSelect(record);
    setShowQuantityModal(true);
  };

  const handleQuantitySubmit = (quantity: number) => {
    if (!recordSelect) return;
    onUpdateQuantity(recordSelect.id, quantity);
    setRecordSelect(null);
  };

  let total = 0;

  return (
    <div>
      <div className="w-full overflow-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-bg-subtle/60 text-text-base border-b-2 border-bg-subtle">
            <tr>
              <th className="py-3 px-4 border-r border-bg-subtle">Código</th>
              <th className="py-3 px-4 border-r border-bg-subtle">Descripción</th>
              <th className="py-3 px-4 border-r border-bg-subtle">Precio Costo</th>
              <th className="py-3 px-4 border-r border-bg-subtle">Cantidad</th>
              <th className="py-3 px-4 border-r border-bg-subtle">Total</th>
              <th className="py-3 px-4">OP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bg-subtle">
            {products.map((record: any) => {
              const unitCost = record?.product_json ? JSON.parse(record.product_json)?.unit_cost : 0;
              const subtotal = unitCost * (record?.quantity || 0);
              total += subtotal;

              return (
                <tr
                  key={record.id}
                  className={`hover:bg-bg-subtle ${record.requested_exists === 0 ? 'bg-danger/10' : ''}`}
                  title={record.requested_exists === 0 ? 'El producto no existe en el inventario' : ''}
                >
                  <td className="py-3 px-4">{record?.cod}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{record?.description}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{numberToMoney(unitCost)}</td>
                  <td
                    className={`py-3 px-4 ${record.requested_exists === 1 ? 'clickeable text-primary font-semibold' : ''}`}
                    onClick={() => handleQuantityClick(record)}
                  >
                    {record?.quantity}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">{numberToMoney(subtotal)}</td>
                  <td className="py-2 px-4">
                    {record.requested_exists === 1 || deleteActive ? (
                      <IoIosCloseCircle
                        size={22}
                        title="Eliminar Producto"
                        className="text-danger clickeable"
                        onClick={() => handleDeleteClick(record)}
                      />
                    ) : (
                      <IoIosAlert size={22} className="text-warning" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="font-medium uppercase text-lg text-primary text-right mt-3 px-4">
          Total: {numberToMoney(total)}
        </div>
      </div>

      <DeleteModal
        isShow={showDeleteModal}
        text={`¿Está seguro de eliminar el producto ${recordSelect?.description}?`}
        onDelete={handleConfirmDelete}
        onClose={() => setShowDeleteModal(false)}
        isSending={sending}
      />

      <ChangeQuantityModal
        isShow={showQuantityModal}
        onClose={() => setShowQuantityModal(false)}
        onSubmit={handleQuantitySubmit}
        sending={sending}
      />
    </div>
  );
}
