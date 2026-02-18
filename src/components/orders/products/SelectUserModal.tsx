"use client";
import { Alert } from "@/components/Alert/Alert";
import { Button, Preset } from "@/components/button/button";
import { LiComponent } from "@/components/button/LiComponent";
import Modal from "@/components/modal/Modal";
import { ShowClientSearched } from "@/components/search/ShowClientSearched";
import { useOrderFnLogic } from "@/hooks/order/product/useOrderFnLogic";
import { useOrderLoadersLogic } from "@/hooks/order/product/useOrderLoadersLogic";
import { UpdateServiceInterface } from "@/services/Interfaces";
import useConfigStore from "@/stores/configStore";
import useModalStore from "@/stores/modalStorage";
import ordersStore from "@/stores/orders/ordersStore";
import useUserStore from "@/stores/UserStore";
import useTempStorage from "@/stores/useTempStorage";
import { setNameUser, setRowToChange } from "../functions";

export interface SelectUserModalI {
  onClose: () => void;
  isShow: boolean;
}




export function SelectUserModal(props: SelectUserModalI) {
  const { onClose, isShow } = props;
  const { order, sending, error } = ordersStore();
  const { user } = useConfigStore();
  const { getSelectedElement, setSelectedElement, clearSelectedElement } = useTempStorage();
  const tempSelectedName = getSelectedElement('setUser');
  const { closeModal} = useModalStore();
  useOrderLoadersLogic(isShow)
  const { users } = useUserStore();
  const { update } = useOrderFnLogic();


  if (!isShow || !order) return null;

  const clearUser = (item: any) => {
    if (!item || !tempSelectedName || !order) return;
    let values: UpdateServiceInterface = {
      row: setRowToChange(tempSelectedName),
      value: tempSelectedName =="setSeller" ? user?.id : null
    }
    update(order.id, values);
    if (!error && !sending) {
      if (tempSelectedName =="setSeller") {
        setSelectedElement(tempSelectedName, user);
      } else {
        clearSelectedElement(tempSelectedName);
      }
      closeModal('setUser');
    }
  }
  
  const updateUser = (item: any) => {
    if (!item || !tempSelectedName || !order) return;
    let values: UpdateServiceInterface = {
      row: setRowToChange(tempSelectedName),
      value: item.id
    }
    update(order.id, values);
    if (!error) {
      setSelectedElement(tempSelectedName, item);
      closeModal('setUser');
    }
  }

  return (
    <Modal show={isShow} onClose={onClose} size="md" headerTitle={`Asignar ${setNameUser(tempSelectedName)}`} >
      <Modal.Body>
        <div className="flex flex-col gap-4">
          <div className="bg-bg-base rounded-lg border border-bg-subtle/80">
            <ul className="divide-y divide-bg-subtle max-h-72 overflow-y-auto custom-scrollbar">
              {
                  users && users.length > 0 && users.map((user: any) => {
                      return (
                            <LiComponent
                              key={user.id}
                              content={user.name}
                              onClick={user.id == order[setRowToChange(tempSelectedName)] ? ()=>{} :  ()=> updateUser(user)}
                              style={`${user.id == order[setRowToChange(tempSelectedName)] && 'font-bold bg-primary/10 text-primary hover:bg-primary/20'}`}
                            />
                          );
                  })
              }
            </ul>
          </div>
          <ShowClientSearched onClose={clearUser} tempSelectedName={tempSelectedName} />
          { error &&
          <Alert type="danger" text={`Existe un error, No se actualizo correctamente el ${setNameUser(tempSelectedName)}. Vuelva a intentarlo.`} isDismissible={false} className="mt-3" />
          }
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} disabled={sending} /> 
      </Modal.Footer>
    </Modal>
  );

}
