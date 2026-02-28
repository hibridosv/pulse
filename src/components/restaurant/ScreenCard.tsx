'use client';

import React, { Fragment } from 'react';
import { useRelativeTime } from '@/hooks/useRelativeTime';
import { formatDate, formatHourAsHM } from '@/lib/date-formats';
import { filterProductsOrInvoiceProducts, groupProducts } from '@/hooks/restaurant/useScreenOrdersLogic';
import { BiCar, BiRestaurant, BiUser, BiX } from 'react-icons/bi';
import { FaClock } from 'react-icons/fa';
import { TbPointFilled } from 'react-icons/tb';

const deliveryTypeMap: Record<number, string> = {
  1: 'Comer Aqui',
  2: 'Para Llevar',
  3: 'Delivery',
};

interface ScreenCardProps {
  order: any;
  processData: (values: { order: number; product?: number; status: number; url: string }) => void;
}

export function ScreenCard({ order, processData }: ScreenCardProps) {
  const filteredResult = filterProductsOrInvoiceProducts(order);
  const groupedProducts = groupProducts(filteredResult);
  const time = useRelativeTime(order.created_at);

  return (
    <div className="bg-bg-content shadow-lg rounded-lg overflow-hidden border border-bg-subtle">
      <div
        className="py-2 px-3 cursor-pointer clickeable"
        onClick={() =>
          processData({ order: order?.id, status: 2, url: 'screen/order/process' })
        }
      >
        <div className="w-full text-xl font-bold flex justify-between items-center text-text-base">
          <span>Orden # {order.number}</span>
          {order.status == 6 && (
            <span className="status-warning text-xs px-2 py-1">ELIMINADA</span>
          )}
        </div>
        <div className="w-full text-xl font-bold text-text-base">
          {order.order_type == 2 ? order.table?.name : order.client?.name}
        </div>
        <div className="text-sm text-text-muted flex items-center">
          <FaClock size={12} className="text-danger mr-2 animate-spin" />
          {formatDate(order.created_at)} {formatHourAsHM(order.created_at)} | {time}
        </div>
        {order?.comment && (
          <div className="text-sm text-text-muted">{order.comment}</div>
        )}
      </div>

      <table className="table-auto w-full text-sm text-left">
        <tbody>
          {groupedProducts.map((product: any) => (
            <Fragment key={product.id}>
              <tr
                className="bg-bg-subtle border-y-2 border-bg-subtle cursor-pointer clickeable"
                onClick={() =>
                  processData({
                    order: order?.id,
                    product: product.id,
                    status: 2,
                    url: 'screen/product/process',
                  })
                }
              >
                <td className="font-medium h-9 flex p-2 uppercase text-text-base">
                  {product.quantity}
                  <BiX size={16} className="mt-1 mr-2" /> {product.product}
                </td>
              </tr>
              {product?.options?.length > 0 && (
                <tr className="border-y-2 border-bg-subtle">
                  <td className="font-medium h-9 flex p-2 bg-danger/10">
                    {product.options.map((option: any) => (
                      <span key={option.id} className="flex items-center text-text-base">
                        <TbPointFilled className="text-danger" size={12} />
                        <span className="mr-1">{option?.option?.name}</span>
                      </span>
                    ))}
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>

      <div className="bg-primary text-text-inverted text-center py-3">
        <ul className="list-none flex justify-around">
          <li className="flex items-center">
            <BiUser className="mr-2" /> <span>{order.employee?.name}</span>
          </li>
          <li className="flex items-center">
            {order.delivery_type == 1 ? (
              <BiRestaurant className="mr-2" />
            ) : (
              <BiCar className="mr-2" />
            )}
            <span>{deliveryTypeMap[order.delivery_type] ?? 'Para Llevar'}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
