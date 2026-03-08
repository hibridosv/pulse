'use client';

import { Button, Preset } from '@/components/button/button';
import { ButtonDownload } from '@/components/button/button-download';
import Modal from '@/components/modal/Modal';
import { useCommissionsLogic } from '@/hooks/tools/useCommissionsLogic';
import { formatDateAsDMY, formatHourAsHM } from '@/lib/date-formats';
import { formatDuiWithAll, getTotalPercentage, numberToMoney } from '@/lib/utils';
import useConfigStore from '@/stores/configStore';
import commissionsStore from '@/stores/tools/commissionsStore';
import { FaDownload } from 'react-icons/fa';
import { LuLoaderCircle } from 'react-icons/lu';

interface CommissionViewModalProps {
  isShow: boolean;
  onClose: () => void;
  record: any;
}

export function CommissionViewModal({ isShow, onClose, record }: CommissionViewModalProps) {
  const { system } = useConfigStore();
  const { payCommission, saving } = commissionsStore();
  const { handelDeleteCommission } = useCommissionsLogic();


  if (!record) return null;

  const products = record.linked;

  const groupedProducts = products?.reduce((acc: any, item: any) => {
    const { ticket_order_id, quantity, commission, total, subtotal, order, charged_at } = item.product;
    if (!acc[ticket_order_id]) {
      acc[ticket_order_id] = {
        quantity: 0, subtotal: 0, total: 0,
        commission: 0, commissionTotal: 0, items: 0,
        order: null, charged_at: null,
      };
    }
    acc[ticket_order_id].quantity += quantity;
    acc[ticket_order_id].subtotal += subtotal;
    acc[ticket_order_id].total += total;
    acc[ticket_order_id].commission += commission * quantity;
    acc[ticket_order_id].commissionTotal += getTotalPercentage(subtotal, commission);
    acc[ticket_order_id].items += quantity;
    acc[ticket_order_id].order = order.invoice;
    acc[ticket_order_id].charged_at = order.charged_at;
    return acc;
  }, {}) ?? {};

  const handlePay = async () => {
    const success = await payCommission(record.id);
    if (success) {
      onClose();
    }
  };



  return (
    <Modal show={isShow} onClose={onClose} size="xl6" headerTitle="REPORTE DE COMISIONES">
      <Modal.Body>
        {saving ? (
          <div className="flex justify-center py-10">
            <LuLoaderCircle className="animate-spin text-primary" size={48} />
          </div>
        ) : (
          <div>
            <div className="flex justify-between font-semibold text-lg m-4 text-text-base">
              <div>{record?.referred?.name}</div>
              <div>{formatDuiWithAll(record?.referred?.document || record?.referred?.id_number)}</div>
            </div>

            <div className="relative overflow-x-auto bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-text-base uppercase bg-bg-subtle/60 border-b-2 border-bg-subtle">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Fecha</th>
                    <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Factura</th>
                    <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Comision %</th>
                    <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Comision $</th>
                    <th scope="col" className="px-4 py-3 font-bold tracking-wider whitespace-nowrap">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bg-subtle/50">
                  {Object.keys(groupedProducts).map((key, index) => {
                    const item = groupedProducts[key];
                    return (
                      <tr key={index} className="transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle text-text-base">
                        <td className="px-4 py-2">{formatDateAsDMY(item.charged_at)}</td>
                        <td className="px-4 py-2">{item.order}</td>
                        <td className="px-4 py-2 text-center">{(item.commission / item.items).toFixed(2)} %</td>
                        <td className="px-4 py-2 text-right">{numberToMoney(item.commissionTotal, system)}</td>
                        <td className="px-4 py-2 text-right font-medium">{numberToMoney(item.total, system)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {products ? (
              <div className="mt-4 mx-4 bg-bg-content rounded-lg border border-bg-subtle overflow-hidden">
                <div className="py-2 pl-4 border-b border-bg-subtle text-text-base">Facturas afectadas: <span className="font-semibold">{record.invoices}</span></div>
                <div className="py-2 pl-4 border-b border-bg-subtle text-text-base">Cantidad de productos: <span className="font-semibold">{record.products}</span></div>
                <div className="py-2 pl-4 border-b border-bg-subtle text-text-base">Total de ventas: <span className="font-semibold">{numberToMoney(record.total, system)}</span></div>
                <div className="py-2 pl-4 border-b border-bg-subtle text-text-base">Total de Comision: <span className="font-semibold">{numberToMoney(record.commissions, system)}</span></div>
                <div className="py-2 pl-4 border-b border-bg-subtle text-text-base">Total de Retenciones: <span className="font-semibold">{numberToMoney(record.commissions * 0.10, system)}</span></div>
                <div className="py-2 pl-4 bg-success/10 text-success font-semibold">Total a Pagar: <span>{numberToMoney(record.commissions - (record.commissions * 0.10), system)}</span></div>
              </div>
            ) : (
              <div className="mt-4 text-center text-text-muted">No se encuentran registros</div>
            )}

            {record.status === 0 && (
              <div className="mt-4 mx-4 p-3 bg-danger/10 rounded-lg">
                <span className="font-semibold text-danger uppercase">ELIMINADO POR: </span>
                <span className="font-semibold text-danger uppercase">{record?.employee_deleted?.name} </span>
                <span className="font-bold text-text-base">{formatDateAsDMY(record?.deleted_at)} {formatHourAsHM(record?.deleted_at)}</span>
              </div>
            )}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {record.status === 3 && (
          <ButtonDownload href={`download/pdf/commission/${record.id}`}>
            <FaDownload size={20} className="text-primary" />
          </ButtonDownload>
        )}
        {record.status === 2 && (
          <Button onClick={()=>handelDeleteCommission(record.id)} preset={Preset.cancel} disabled={saving} text="ELIMINAR REPORTE" />
        )}
        <Button onClick={onClose} preset={Preset.close} disabled={saving} />
        {record.status === 2 && (
          <Button onClick={handlePay} preset={saving ? Preset.saving : Preset.save} disabled={saving} text="PAGAR REPORTE" />
        )}
      </Modal.Footer>
    </Modal>
  );
}
