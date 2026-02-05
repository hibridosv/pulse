'use client'
import { ButtonDownload } from '@/components/button/button-download';
import { Popper } from '@/components/popper/Popper';
import { formatDateAsDMY, formatHourAsHM } from '@/lib/date-formats';
import { numberToMoney } from '@/lib/utils';
import useConfigStore from '@/stores/configStore';
import ordersProductsStore from '@/stores/orders/ordersProductsStore';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaDownload } from 'react-icons/fa';



export function ShowOrders() {
    const { system } = useConfigStore();
    const { orders } = ordersProductsStore();
    const downloadStatus = true;
    const { data: session } = useSession();
    const  remoteUrl  = session?.url;

    console.log(orders)

  const imageLoader = ({ src, width, quality }: any) => {
    return `${remoteUrl}/images/logo/${src}?w=${width}&q=${quality || 75}`
  }

  const showProducts = (products: any) =>{
   return (<div className="w-8/10">
    <table className="text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="py-2 px-2 border">Cod</th>
        <th scope="col" className="py-2 px-2 border">Producto</th>
        <th scope="col" className="py-2 px-2 border">Cant</th>
        <th scope="col" className="py-2 px-2 border">Total</th>
      </tr>
    </thead>
    <tbody>{
    products?.map((product: any):any => (
      <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="py-1 px-2">{product.cod }</td>
            <td className="py-1 px-2">{product.product }</td>
            <td className="py-1 px-2">{ product.quantity}</td>
            <td className="py-1 px-2">{ numberToMoney(product.total, system)}</td>
      </tr>
    ))
    }</tbody>
  </table>
  </div>)
  }


  
    return (
    <div className="sm:mt-3">
      { !orders || orders.length === 0 ? 
        <div className="w-full flex justify-center">
          { system && remoteUrl && <Image loader={imageLoader} src={system?.logo} alt="Hibrido" width={500} height={500} /> }
        </div> : 
          <div className="w-full rounded-lg border-2 shadow-md bg-black">
          <div className="text-center uppercase rounded-t-lg py-2 bg-teal-900 text-gray-200 font-medium">ORDENES PENDIENTES</div>

          {orders && orders.map((order: any, index: any) => (
            <div key={index} className="flex justify-around py-1 border-x-2 border-b-2 border-slate-900 text-center uppercase bg-teal-200 font-medium">
                <Popper label={<span  onClick={() => {}} className="ml-1 clickeable">{order?.client?.name ? `Cliente: ${order?.client?.name}` : `Usuario: ${order.employee.name}`}</span>}>
                    {showProducts(order.invoiceproducts)}
                </Popper>
                <span className="ml-2">
                  {formatDateAsDMY(order.created_at)} | {formatHourAsHM(order.created_at)}
                </span>
                { downloadStatus && 
                <div className="ml-1">
                  <ButtonDownload autoclass={false} href={`/download/pdf/order/${order.id}`}><FaDownload /></ButtonDownload>
                </div> }
              </div>
          ))}
        </div> 
      }
    </div>
    );
}