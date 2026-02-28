'use client';

import Modal from '@/components/modal/Modal';
import { Button, Preset } from '@/components/button/button';
import { formatDateAsDMY } from '@/lib/date-formats';
import { numberToMoney } from '@/lib/utils';
import useConfigStore from '@/stores/configStore';

interface InvoicePayDetailsModalProps {
  isShow: boolean;
  onClose: () => void;
  record: any;
}

export function InvoicePayDetailsModal({ isShow, onClose, record }: InvoicePayDetailsModalProps) {
  const { system } = useConfigStore();

  if (!record?.items || record.items.length === 0) return null;

  return (
    <Modal show={isShow} onClose={onClose} size="xl3" headerTitle="DETALLES DEL DOCUMENTO EMITIDO">
      <Modal.Body>
        <div className="mx-3 my-4">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            <div className="col-span-4 bg-bg-content rounded-lg shadow-sm border border-bg-subtle p-3">
              <div className="w-full text-center text-text-muted text-sm">Fecha Facturación</div>
              <div className="w-full text-center text-xl my-2 font-bold text-text-base">
                {formatDateAsDMY(record?.billing_day)}
              </div>
            </div>
            {record?.payed_at ? (
              <div className="col-span-4 bg-bg-content rounded-lg shadow-sm border border-bg-subtle p-3">
                <div className="w-full text-center text-text-muted text-sm">Fecha pagada</div>
                <div className="w-full text-center text-xl my-2 font-bold text-success">
                  {formatDateAsDMY(record?.payed_at)}
                </div>
              </div>
            ) : (
              <div className="col-span-4 bg-danger/5 rounded-lg shadow-sm border border-danger/20 p-3">
                <div className="w-full text-center text-text-muted text-sm">Vencimiento</div>
                <div className="w-full text-center text-xl my-2 font-bold text-danger">
                  {formatDateAsDMY(record?.expires_at)}
                </div>
              </div>
            )}
          </div>

          <div className="relative overflow-x-auto mt-4 bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-text-base uppercase bg-bg-subtle/60 border-b-2 border-bg-subtle">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Cant</th>
                  <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Producto</th>
                  <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Precio</th>
                  <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Subtotal</th>
                  <th scope="col" className="px-4 py-3 font-bold tracking-wider whitespace-nowrap">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bg-subtle/50">
                {record.items.map((item: any) => (
                  <tr key={item.id} className="transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle text-text-base">
                    <td className="px-4 py-2">{item?.quantity}</td>
                    <td className="px-4 py-2">{item?.payment?.concept}</td>
                    <td className="px-4 py-2 text-right">{numberToMoney(item?.unit_price ?? 0, system)}</td>
                    <td className="px-4 py-2 text-right">{numberToMoney(item?.subtotal ?? 0, system)}</td>
                    <td className="px-4 py-2 text-right">{numberToMoney(item?.total ?? 0, system)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t-2 border-bg-subtle">
                <tr className="text-text-base font-semibold">
                  <td colSpan={4} className="px-4 py-3 text-right">Total</td>
                  <td className="px-4 py-3 text-right">{numberToMoney(record?.total, system)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mt-3 uppercase font-medium text-text-base text-sm">
            <span className="mr-2">Periodo:</span>
            <span>del {formatDateAsDMY(record?.started_at)} al {formatDateAsDMY(record?.billing_day)}</span>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} />
      </Modal.Footer>
    </Modal>
  );
}
