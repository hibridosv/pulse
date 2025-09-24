import useCutStore from "@/stores/cutStore";
import useModalStore from "@/stores/modalStorage";
import { DeleteModal } from "@/components/DeleteModal";
import { Button, Preset } from "@/components/button/button";
import { Price } from "@/interfaces/price";


export interface DeletePriceButtonProps {
 price: Price;
}

export function DeletePriceButton(props: DeletePriceButtonProps) {
  const { price, } = props;
  const { deleting, deleteCut } = useCutStore();
  const { modals, openModal, closeModal } = useModalStore();

  return (<div>
    <Button preset={Preset.smallClose} onClick={()=>openModal('delPrice')} noText />
    <DeleteModal
        isShow={modals['delPrice']}
        text="¿Estas seguro de eliminar este precio?"
        onDelete={() =>{ deleteCut(`prices/${price.id}`); closeModal('delPrice')}}
        onClose={() => closeModal('delPrice')}
      />
  </div>);
}
