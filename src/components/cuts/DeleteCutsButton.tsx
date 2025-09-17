import useCutStore from "@/stores/cutStore";
import { Button, Preset } from "../button/button";
import { Cut } from "@/interfaces/Cuts";
import { DeleteModal } from "../DeleteModal";
import useModalStore from "@/stores/modalStorage";


export interface DeleteCutButtonProps {
 cut: Cut;
 isInitial: boolean;
}

export function DeleteCutButton(props: DeleteCutButtonProps) {
  const { cut, isInitial } = props;
  const { deleting, deleteCut } = useCutStore();
  const { modals, openModal, closeModal } = useModalStore();

  return (<div className="flex items-center">
    <Button preset={isInitial ? Preset.smallClose : Preset.smallCloseDisable} onClick={()=>openModal('delCut')} disabled={!isInitial || deleting} noText />
    <DeleteModal
        isShow={modals['delCut']}
        text="¿Estas seguro de eliminar este corte?"
        onDelete={() =>deleteCut(`cuts/${cut.id}`)}
        onClose={() => closeModal('delCut')}
      />
  </div>);
}
