"use client";
import { Button, Preset } from "@/components/button/button";
import Modal from "@/components/modal/Modal";
import { URL } from "@/constants";
import { useOrderRestaurantFnLogic } from "@/hooks/order/restaurant/useOrderRestaurantFnLogic";
import { getLastElement } from "@/lib/utils";
import ordersRestaurantsStore from "@/stores/orders/ordersRestaurantsStore";
import Image from "next/image";



export interface ProductOptionsModalI {
  onClose: () => void;
  isShow: boolean;
}

export function ProductOptionsModal(props: ProductOptionsModalI) {
  const {  onClose, isShow } = props;
  const { order } = ordersRestaurantsStore();
  const { option } = useOrderRestaurantFnLogic();



const handleUpdate = (data: any) => {
    option(order.id, data);
    onClose();
  }



  const imageLoader = ({ src, width, quality }: any) => {
    return `${URL}/images/ico/${src}?w=${width}&q=${quality || 75}`
    }

    const LastProduct = getLastElement(order?.invoiceproducts)
    const lastOption = getLastElement(LastProduct?.options, "status", 0)

    const listItems = LastProduct && LastProduct?.options.map((record: any) => {
        if (record?.iden == lastOption?.iden) {
            return (
                <div key={record?.id} className="m-2 clickeable">
                    <div onClick={() => { handleUpdate({ id: record.id, iden: record.iden}) }}
                    className="rounded-md drop-shadow-lg">
                        <Image loader={imageLoader} src={record?.option?.image} alt="Icono" width={96} height={96} className="rounded-t-md" />
                        <p className={`w-full content-center text-center rounded-b-md overflow-hidden uppercase text-xs text-black font-medium p-1 h-9 bg-slate-300`} 
                        style={{ maxWidth: '96px',  wordBreak: 'keep-all', lineHeight: '1.2em' }}>
                            {record?.option?.name}
                        </p>
                    </div>
                </div>
            )
        }
    });

  return (
        <Modal show={isShow} onClose={onClose} size="xs" headerTitle="Seleccione la Opción" closeOnOverlayClick={false} hideCloseButton={true} >
          <Modal.Body>
                <div className="flex flex-wrap justify-center">
                    {listItems }
                </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>handleUpdate({ id: lastOption.id, iden: lastOption.iden})} preset={Preset.close} text="Saltar Opción" isFull /> 
          </Modal.Footer>
        </Modal>
  );
}
