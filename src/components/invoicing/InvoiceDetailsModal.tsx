
import { useInvoiceDetailsLogic } from "@/hooks/invoicing/useInvoiceDetailsLogic";
import { formatDateAsDMY } from "@/lib/date-formats";
import { getPaymentTypeName, numberToMoney } from "@/lib/utils";
import useConfigStore from "@/stores/configStore";
import { Alert } from "../Alert/Alert";
import { Button, Preset } from "../button/button";
import Modal from "../modal/Modal";

export interface InvoiceDetailsModalI {
  onClose: () => void;
  isShow: boolean;
  documentId: string;
}

export function InvoiceDetailsModal(props: InvoiceDetailsModalI) {
    const { onClose, isShow, documentId } = props;
    const { system } = useConfigStore();
    const { order } = useInvoiceDetailsLogic(documentId, isShow);
   
    const showCodeStatus = true;
    const onElectronic = false;
    
  if (!isShow || !documentId) return null;


  const listProducts = order?.products.map((record: any, key: any) => (
    <tr key={record.id} className="border-b">
      <td className="py-2 px-6 truncate">{ record?.quantity} </td>
      { showCodeStatus &&
      <td className="py-2 px-6 truncate">{ record?.cod} </td>
      }
      <th className="py-2 px-6 text-gray-900 whitespace-nowrap dark:text-white" scope="row">{ record?.product } </th>
      <td className="py-2 px-6">{ numberToMoney(record?.unit_price ? record?.unit_price : 0, system) }</td>
      <td className="py-2 px-6">{ numberToMoney(record?.subtotal ? record?.subtotal : 0, system) }</td>
      <td className="py-2 px-6">{ numberToMoney(record?.taxes ? record?.taxes : 0, system) }</td>
      <td className="py-2 px-6">{ numberToMoney(record?.discount ? record?.discount : 0, system) }</td>
      <td className="py-2 px-6">{ numberToMoney(record?.total ? record?.total : 0, system) }</td>
    </tr>
  ));



  return (
    <Modal show={isShow} onClose={onClose} size="xl4" headerTitle="Detalles del documento" closeOnOverlayClick={false}>
      <Modal.Body>
        <div className="p-4 bg-bg-content text-text-base">
         <div className="mx-3 my-8 ">

            <div className="grid grid-cols-4 md:grid-cols-8 gap-3 bg-white dark:bg-gray-900">
                    <div className={`col-span-2 border-2 border-slate-600 shadow-md shadow-cyan-500 rounded-md w-full`}>
                        <div className="w-full text-center">Cajero</div>
                        <div className="w-full text-center text-xl my-2 font-bold">{order?.employee?.name}</div>
                    </div>
                    <div className={`col-span-2 border-2 border-slate-600 shadow-md shadow-cyan-500 rounded-md w-full`}>
                        <div className="w-full text-center">Fecha</div>
                        <div className="w-full text-center text-xl my-2 font-bold">{ formatDateAsDMY(order?.charged_at) }</div>
                    </div>
                    <div className={`col-span-2 border-2 border-slate-600 shadow-md shadow-cyan-500 rounded-md w-full`}>
                        <div className="w-full text-center">Tipo</div>
                        <div className="w-full text-center text-xl my-2 font-bold">{ order?.invoice_assigned?.name }</div>
                    </div>
                    <div className={`col-span-2 border-2 border-slate-600 shadow-md shadow-cyan-500 rounded-md w-full`}>
                        <div className="w-full text-center">Pago</div>
                        <div className="w-full text-center text-xl my-2 font-bold">{ getPaymentTypeName(order?.payment_type) }</div>
                    </div>
            </div>

            <div className="w-full overflow-auto mt-4">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                    <th scope="col" className="py-3 px-4 border">Cant</th>
                    { showCodeStatus &&
                    <th scope="col" className="py-3 px-4 border">Codigo</th>
                    }
                    <th scope="col" className="py-3 px-4 border">Producto</th>
                    <th scope="col" className="py-3 px-4 border">Precio</th>
                    <th scope="col" className="py-3 px-4 border">Subtotal</th>
                    <th scope="col" className="py-3 px-4 border">Imp</th>
                    <th scope="col" className="py-3 px-4 border">Descuento</th>
                    <th scope="col" className="py-3 px-4 border">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {listProducts}
                    <tr>
                    <th scope="col" className="py-3 px-4 border" colSpan={showCodeStatus ? 4 : 3} ></th>
                    <th scope="col" className="py-3 px-4 border">{ numberToMoney(order?.subtotal, system) }</th>
                    <th scope="col" className="py-3 px-4 border">{ numberToMoney(order?.taxes, system) }</th>
                    <th scope="col" className="py-3 px-4 border">{ numberToMoney(order?.discount, system) }</th>
                    <th scope="col" className="py-3 px-4 border">{ numberToMoney(order?.total, system) }</th>
                    </tr>
                </tbody>
                </table>
            </div>

            <div className="uppercase shadow-lg border-x-2 ml-4 my-4 p-2">
                {order?.employee && <div>Atendido por: <span className="font-semibold">{order?.employee?.name}</span></div>}
                {order?.referred && <div>Nombre de referido: <span className="font-semibold">{order?.referred?.name}</span></div>}
                {order?.client && <div>Nombre del cliente: <span className="font-semibold">{order?.client?.name}</span></div>}
                {order?.delivery && <div>Nombre del repartidor: <span className="font-semibold">{order?.delivery?.name}</span></div>}
            </div>

                {
                order?.invoice_assigned?.type == 9 && 
                <Alert text="Este Documento tiene una numeración temporal" />
                }
                {
                order?.invoice_assigned?.is_electronic == 1 && 
                <Alert text="Este Documento se envió electronicamente"   />
                }
                {
                  order?.status == 4 && 
                  <div className="mt-3">
                      <Alert text="Este Documento se ha sido anulado"  />
                  </div>
                }

                {
                order?.invoice_assigned?.is_electronic == 1 && onElectronic && 
                  <div className="mt-3">
                      <div>Si este documento no se envio electronicamente, reintentelo <span className="clickeable" onClick={()=> console.log}>aqui</span></div>
                  </div>
                }
        </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-end w-full">
          <Button onClick={onClose} preset={Preset.close} text="Cerrar" disabled={false} />
        </div>
      </Modal.Footer>
    </Modal>
  );
}
