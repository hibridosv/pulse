"use client";
import { Button, Preset } from "@/components/button/button";
import { LiComponent } from "@/components/button/LiComponent";
import Modal from "@/components/modal/Modal";
import { useOrderRestaurantFnLogic } from "@/hooks/order/restaurant/useOrderRestaurantFnLogic";
import { UpdateServiceInterface } from "@/services/Interfaces";
import useModalStore from "@/stores/modalStorage";
import ordersStore from "@/stores/orders/ordersStore";
import useTempStorage from "@/stores/useTempStorage";

export interface DeliveryTypeModalI {
  onClose: () => void;
  isShow: boolean;
}

export function DeliveryTypeModal(props: DeliveryTypeModalI) {
  const { onClose, isShow } = props;
  const { order, error } = ordersStore();
    const { update: updateRestaurant } = useOrderRestaurantFnLogic();

  const { closeModal} = useModalStore();
  const { setElement, getElement} = useTempStorage();
  const deliveryType: number = getElement('deliveryType'); // aqui, llevar, delivery

  const handleUpdate = async(type: any) => {
        let values: UpdateServiceInterface = {
          row: "delivery_type",
          value: type
        }
          await updateRestaurant(order.id, values);
        if (!error) {
          setElement('deliveryType', type);
          closeModal('deliveryType');
        }

  }

  if (!isShow || !order) return null;
  
  return (
    <Modal show={isShow} onClose={onClose} size="xs" headerTitle="Tipo de entrega" closeOnOverlayClick={false} hideCloseButton={true} >
      <Modal.Body>
        <div className="flex flex-col gap-4">
          <div className="bg-bg-base rounded-lg border border-bg-subtle/80">
            <ul className="divide-y divide-bg-subtle">
              <LiComponent
                  content="Comer Aqui"
                  onClick={deliveryType == 1 ? ()=>{} :  ()=> handleUpdate(1)}
                  style={`${deliveryType == 1 && 'font-bold bg-primary/10 text-primary hover:bg-primary/20'}`}
                />
              <LiComponent
                  content="Para LLevar"
                  onClick={deliveryType == 2 ? ()=>{} :  ()=> handleUpdate(2)}
                  style={`${deliveryType == 2 && 'font-bold bg-primary/10 text-primary hover:bg-primary/20'}`}
                />
              <LiComponent
                  content="Delivery"
                  onClick={deliveryType == 3 ? ()=>{} :  ()=> handleUpdate(3)}
                  style={`${deliveryType == 3 && 'font-bold bg-primary/10 text-primary hover:bg-primary/20'}`}
                />
            </ul>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} /> 
      </Modal.Footer>
    </Modal>
  );

}
