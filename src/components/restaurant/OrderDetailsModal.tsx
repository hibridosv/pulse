'use client';

import React, { useEffect, useState } from 'react';
import Modal from '@/components/modal/Modal';
import { Button, Preset } from '@/components/button/button';
import { useRelativeTime } from '@/hooks/useRelativeTime';
import { formatDateAsDMY, formatHourAsHM } from '@/lib/date-formats';
import { numberToMoney } from '@/lib/utils';
import useConfigStore from '@/stores/configStore';
import { TbPointFilled } from 'react-icons/tb';

const orderTypeMap: Record<number, string> = {
  1: 'Venta Rapida',
  2: 'En mesa',
  3: 'Delivery',
};

const deliveryTypeMap: Record<number, string> = {
  1: 'Comer Aqui',
  2: 'Para Llevar',
  3: 'Delivery',
};

const orderStatusMap: Record<number, { label: string; className: string }> = {
  1: { label: 'Activo', className: 'status-info' },
  2: { label: 'Guardado', className: 'status-success' },
  3: { label: 'Pagado', className: 'status-danger' },
  4: { label: 'Anulado', className: 'status-warning' },
  6: { label: 'Eliminada', className: 'status-warning' },
};

interface OrderDetailsModalProps {
  isShow: boolean;
  onClose: () => void;
  order: any;
}

export function OrderDetailsModal({ isShow, onClose, order }: OrderDetailsModalProps) {
  const { system } = useConfigStore();
  const relativeTime = useRelativeTime(order?.created_at);
  const [orderProducts, setOrderProducts] = useState<any[]>([]);

  useEffect(() => {
    if (order && isShow) {
      const products = order?.invoiceproducts?.length > 0
        ? order.invoiceproducts
        : order?.products?.length > 0
          ? order.products
          : [];
      setOrderProducts(products);
    }
  }, [order, isShow]);

  if (!order) return null;

  const status = orderStatusMap[order?.status] || { label: 'Activo', className: 'status-info' };

  return (
    <Modal show={isShow} onClose={onClose} size="xl2" headerTitle={`ORDEN NUMERO: ${order?.number}`}>
      <Modal.Body>
        <div className="mx-2">
          <div className="flex justify-between text-text-base">
            <div>
              <span className="uppercase">Usuario:</span>
              <span className="ml-2 font-semibold">{order?.employee?.name}</span>
            </div>
            <div>
              <span className="uppercase">Clientes:</span>
              <span className="ml-2 font-semibold">{order?.attributes?.clients_quantity}</span>
            </div>
          </div>

          <div className="flex justify-between font-semibold border border-bg-subtle py-2 rounded-full px-4 mt-4 shadow-sm bg-bg-content text-text-base">
            <span>Inicio: {formatDateAsDMY(order?.created_at)} {formatHourAsHM(order?.created_at)}</span>
            <span className="text-danger">Hace: {relativeTime}</span>
          </div>

          <div className="relative overflow-x-auto mt-4 bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-text-base uppercase bg-bg-subtle/60 border-b-2 border-bg-subtle">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Cant</th>
                  <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Producto</th>
                  <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Precio</th>
                  <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Descuento</th>
                  <th scope="col" className="px-4 py-3 font-bold tracking-wider whitespace-nowrap">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bg-subtle/50">
                {orderProducts.map((product: any) => (
                  <React.Fragment key={product.id}>
                    <tr className="transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle text-text-base">
                      <td className="px-4 py-2 text-center">{product.quantity}</td>
                      <td className="px-4 py-2">{product.product}</td>
                      <td className="px-4 py-2 text-right">{numberToMoney(product.unit_price, system)}</td>
                      <td className="px-4 py-2 text-right">{numberToMoney(product.discount, system)}</td>
                      <td className="px-4 py-2 text-right font-medium">{numberToMoney(product.total, system)}</td>
                    </tr>
                    {product?.options?.length > 0 && (
                      <tr className="bg-danger/5 border-y border-bg-subtle">
                        <td colSpan={5} className="px-4 py-1">
                          {product.options.map((opt: any) => (
                            <span key={opt.id} className="flex items-center gap-1 text-text-base">
                              <TbPointFilled className="text-danger" size={12} />
                              <span>{opt?.option?.name}</span>
                            </span>
                          ))}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
              <tfoot className="border-t-2 border-bg-subtle">
                <tr className="text-text-base font-semibold">
                  <td colSpan={3} className="px-4 py-3 text-right">Total</td>
                  <td className="px-4 py-3 text-right">{numberToMoney(order?.discount, system)}</td>
                  <td className="px-4 py-3 text-right">{numberToMoney(order?.total, system)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex justify-between font-semibold mt-4">
            <span className="w-full text-center border border-bg-subtle py-2 rounded-l-full shadow-sm bg-success/10 text-success">
              {orderTypeMap[order?.order_type] ?? 'En mesa'}
            </span>
            <span className="w-full text-center border border-bg-subtle py-2 shadow-sm bg-bg-content">
              <span className={status.className}>{status.label}</span>
            </span>
            <span className="w-full text-center border border-bg-subtle py-2 rounded-r-full shadow-sm bg-info/10 text-info">
              {deliveryTypeMap[order?.delivery_type] ?? 'Para Llevar'}
            </span>
          </div>

          <div className="mt-4 text-sm text-danger">
            * La propina no se encuentra incluida en el total
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} />
      </Modal.Footer>
    </Modal>
  );
}
