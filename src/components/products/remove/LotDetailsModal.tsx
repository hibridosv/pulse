
import Modal from "@/components/modal/Modal";
import { Button, Preset } from "@/components/button/button";
import { formatDate, formatHourAsHM } from "@/lib/date-formats";
import { typeFailure } from "./ProductsRegistersTable";
import { ButtonDownload } from "@/components/button/button-download";
import { FaDownload } from "react-icons/fa";



export interface LotDetailsModalProps {
  onClose: () => void;
  isShow: boolean;
  product: any;
}

export function LotDetailsModal(props: LotDetailsModalProps) {
    const { onClose, isShow, product } = props;


  const listItems = product.failures && product.failures.map((record: any) => (
        <tr key={record.id} className={`transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle ${record.status === 0 ? 'bg-danger/10 text-danger' : 'text-text-base'}`}>
        <td className="px-3 py-2 whitespace-nowrap font-medium text-primary text-center">
            { record?.product?.cod }
        </td>
        <td className="px-3 py-2 whitespace-nowrap font-medium text-primary text-center">
            { record?.product?.description }
        </td>
        <td className="px-3 py-2 whitespace-nowrap font-medium text-primary text-center">
            { record.quantity }
        </td>
        <td className="px-3 py-2 whitespace-nowrap font-medium text-primary text-center">
             { record.reason }
        </td>
        <td className="px-3 py-2 whitespace-nowrap font-medium text-primary text-center">
            { record?.employee?.name }
        </td>
        </tr>
    ));


  return (
    <Modal show={isShow} onClose={onClose} size="xl4" headerTitle="Asignar Lote" closeOnOverlayClick={false} hideCloseButton={true}>
      <Modal.Body>

        <div className="p-4 bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
            <div className="flex justify-between items-center p-4">
                <div><span className="font-medium text-text-base">Tipo de Salida:</span> { typeFailure(product?.type)}</div>
                <div><span className="font-medium text-text-base">Fecha de Salida:</span> { formatDate(product?.created_at)} { formatHourAsHM(product?.created_at)}</div>
            </div>
            {product && product.failures ? (
                <div className="relative overflow-x-auto border border-bg-subtle rounded-lg">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-text-base uppercase bg-bg-subtle/60 border-b-2 border-bg-subtle">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0 text-center">Cod</th>
                                <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0 text-center">Producto</th>
                                <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0 text-center">Cant</th>
                                <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0 text-center">Razón</th>
                                <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0 text-center">Usuario</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-bg-subtle/50">
                            {listItems}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="p-3 text-center bg-blue-500/10 text-blue-500 rounded-lg">
                    <p>No hay registros para este item.</p>
                </div>
            )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ButtonDownload href={`download/pdf/failure/${product?.id}`}><FaDownload size={24}/></ButtonDownload>
        <Button onClick={onClose} preset={Preset.close} disabled={false} />
      </Modal.Footer>
    </Modal>
  );
}