"use client";
import { Alert } from "@/components/Alert/Alert";
import { Button, Preset } from "@/components/button/button";
import { Option, RadioButton } from "@/components/button/RadioButton";
import Modal from "@/components/modal/Modal";
import ordersProductsStore from "@/stores/orders/ordersProductsStore";
import ordersStore from "@/stores/orders/ordersStore";
import useTempStorage from "@/stores/useTempStorage";
import { useForm } from "react-hook-form";
import { OrderProductsSearchPrincipal } from "../common/OrderProductsSearchPrincipal";
import { OrderSpecialSalesTable } from "../common/OrderSpecialSalesTable";
import { groupInvoiceProductsByCodSpecial } from "../utils";

export interface SpecialSalesModalI {
  onClose: () => void;
  isShow: boolean;
}




export function SpecialSalesModal(props: SpecialSalesModalI) {
  const { onClose, isShow } = props;
  const { order, sending, error } = ordersStore();
  const { updateOrder } = ordersProductsStore();
  const { getElement, clearElement, setElement } = useTempStorage();
  const { register, handleSubmit, resetField, setFocus, setValue } = useForm();
  let special = order && order?.invoiceproducts && groupInvoiceProductsByCodSpecial(order);
  let optionsRadioButton: Option[] = [
      { id: 1, name: "Gravado" },
      { id: 2, name: "Exento" },
      { id: 3, name: "No Sujeto" },
  ];
  const option = getElement('optionSelected');


  if (!isShow) return null;

 const onSubmit = async(data: any) => {
        if ( !data.description|| !data.total) return;

        let values = {
        description: data.description,
        quantity: 1,
        total: data.total,
        order_id: order.id,
        exempt: option.id,
        };

      await updateOrder(`orders/${order.id}/others`, values);
      if (!error) {
        clearElement('optionSelected');
        clearElement('optionSelectedType');
        onClose();
      }
 }

const handleClose = ()=>{
        clearElement('optionSelected');
        clearElement('optionSelectedType');
        onClose();
}

  return (
    <Modal show={isShow} onClose={handleClose} size="xl4" headerTitle="INGRESAR PRODUCTOS DE VENTA ESPECIAL" closeOnOverlayClick={false} hideCloseButton={true} >
      <Modal.Body>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
              <div className="col-span-4 border-r md:border-sky-600">
                <OrderProductsSearchPrincipal />
              </div>
              <div className="col-span-6 border-l md:border-sky-600">
                <OrderSpecialSalesTable records={order} isLoading={sending} />
                  {special && special.length > 0 &&
                    <div className="mx-4 rounded-sm shadow-md ">
                          <form className="max-w-lg mt-4" onSubmit={handleSubmit(onSubmit)} >
                              <div className="w-full md:w-full px-3 mb-4">
                                  <label htmlFor="description" className="input-label" >Descripción</label>
                                  <input type="text" {...register("description", { required: true })} className="input" />
                              </div>
                              <div className="w-full md:w-full px-3 mb-4">
                                  <label htmlFor="total" className="input-label" >Precio</label>
                                  <input type="number" step="any" {...register("total", { required: true })} className="input" />
                              </div>
                              <div className="w-full">
                                <label className="block text-sm font-medium text-text-muted mb-1">Tipo de Gravación</label>
                                <RadioButton options={optionsRadioButton} />
                              </div>
                              <div className="flex justify-center pb-4">
                              <Button type="submit" disabled={sending} preset={sending ? Preset.saving : Preset.save} />
                              </div>
                          </form>
                      </div>
                    }

              </div>
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
            {special && special.length > 0 ?
        <Alert type="danger" isDismissible={false} text="Debe completar la petición o eliminar los productos que ha agregado para cerrar esta ventana" /> :
        <Button onClick={handleClose} preset={Preset.close} disabled={sending || (special && special.length > 0)} />
    }
      </Modal.Footer>
    </Modal>
  );

}
