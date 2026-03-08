"use client";
import { Button, Preset } from "@/components/button/button";
import Modal from "@/components/modal/Modal";
import { useOrderFnLogic } from "@/hooks/order/product/useOrderFnLogic";
import { useGetRequest } from "@/hooks/request/useGetRequest";
import { formatDate, formatHourAsHM } from "@/lib/date-formats";
import { UpdateServiceInterface } from "@/services/Interfaces";
import ordersStore from "@/stores/orders/ordersStore";
import useToastMessageStore from "@/stores/toastMessageStore";
import useTempStorage from "@/stores/useTempStorage";
import { useEffect } from "react";
import { FaRegSave } from "react-icons/fa";
import { RiCloseCircleFill } from "react-icons/ri";

export interface changeLotModalI {
  onClose: () => void;
  isShow: boolean;
}

export function ChangeLotModal(props: changeLotModalI) {
  const { onClose, isShow } = props;
  const { sending } = ordersStore();
  const { updateProduct } = useOrderFnLogic();
  const { getElement } = useTempStorage();
  const { setError } = useToastMessageStore();
  const { responseData, loading, getRequest } = useGetRequest();

  const product = getElement("productSelected");
  const lots: any[] = responseData?.data ?? [];

  useEffect(() => {
    if (isShow && product?.product_id) {
      getRequest(
        `registers?filterWhere[product_id]==${product.product_id}&filterWhere[status]==1`,
        false
      );
    }
  }, [isShow, product?.product_id, getRequest]);

  const onSubmit = async (lot_id: string | null) => {
    if (!product?.id) return;
    const values: UpdateServiceInterface = { row: "lot_id", value: lot_id };
    const success = await updateProduct(product.id, values);
    if (success) {
      onClose();
    } else {
      setError({ message: "No se pudo actualizar el lote. Intente nuevamente." });
    }
  };

  const listItems = lots.map((record: any) => {
    const isSelected = product?.lot_id === record.id;
    const hasStock = record.actual_stock >= (product?.quantity ?? 0);

    return (
      <tr key={record.id} className={`transition-colors duration-150 divide-x divide-bg-subtle ${isSelected ? "bg-accent/10 font-semibold text-accent" : "odd:bg-bg-subtle/40 hover:bg-bg-subtle text-text-base"}`}>
        <td className="px-3 py-2 whitespace-nowrap">{record.actual_stock}</td>
        <td className="px-3 py-2 whitespace-nowrap">{formatDate(record.created_at)} {formatHourAsHM(record.created_at)}</td>
        <td className="px-3 py-2 whitespace-nowrap">{formatDate(record.expiration)}</td>
        <td className="px-3 py-2 whitespace-nowrap">{record.lot}</td>
        <td className="px-3 py-2 text-center">
          {isSelected ? (
            <RiCloseCircleFill size={20} className="text-danger clickeable mx-auto" onClick={() => onSubmit(null)} />
          ) : hasStock ? (
            <FaRegSave size={18} className="text-success clickeable mx-auto" onClick={() => onSubmit(record.id)} />
          ) : (
            <FaRegSave size={18} className="text-text-muted mx-auto cursor-not-allowed opacity-50" onClick={() => setError({ message: "No existen cantidades suficientes en este lote." })} />
          )}
        </td>
      </tr>
    );
  });

  return (
    <Modal show={isShow} onClose={onClose} size="xl2" headerTitle="Seleccionar lote a descontar">
      <Modal.Body>
        <div className="flex flex-col gap-3">
          <p className="text-center text-text-muted font-semibold uppercase text-sm">{product?.product}</p>

          {loading ? (
            <div className="text-center text-text-muted py-6 text-sm">Cargando lotes...</div>
          ) : lots.length === 0 ? (
            <div className="text-center text-text-muted py-6 text-sm">No hay lotes disponibles para este producto.</div>
          ) : (
            <div className="relative overflow-x-auto bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-text-base uppercase bg-bg-subtle/60 border-b-2 border-bg-subtle">
                  <tr>
                    <th className="px-3 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Cant.</th>
                    <th className="px-3 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Fecha</th>
                    <th className="px-3 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Vence</th>
                    <th className="px-3 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Lote</th>
                    <th className="px-3 py-3 font-bold tracking-wider whitespace-nowrap"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bg-subtle/50">
                  {listItems}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} disabled={sending} />
      </Modal.Footer>
    </Modal>
  );
}
