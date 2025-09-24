import { Button, Preset } from "../button/button";
import { DeleteModal } from "../DeleteModal";
import { useState } from "react";


export interface DeleteButtonProps {
  id: string;
  disabled: boolean;
  url?: string;
  onDeleteConfirm: (id: string) => void;
  text?: string;
  header?: string;
  preset?: Preset;
}

export function DeleteButton(props: DeleteButtonProps) {
  const { id, disabled, url, onDeleteConfirm, text = "¿Estas seguro de eliminar este elemento?", header = "Eliminar Elemento", preset } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    onDeleteConfirm(`${url}${url ? "/" : ""}${id}`);
    setIsModalOpen(false);
  }
  const finalPreset = preset ? preset : disabled ? Preset.smallCloseDisable : Preset.smallClose;

  return (<>
    <Button 
          preset={finalPreset} 
          onClick={() => setIsModalOpen(true)} 
          disabled={disabled} 
          noText 
        />
    <DeleteModal
        isShow={isModalOpen}
        text={text}
        header={header}
        onDelete={handleDelete}
        onClose={() => setIsModalOpen(false)}
      />
  </>);
}
