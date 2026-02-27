import { useState } from "react";
import { Button, Preset } from "../button/button";
import { DeleteModal } from "../DeleteModal";


export interface DeleteButtonProps {
  id: string;
  disabled: boolean;
  onDeleteConfirm: (id: string) => void;
  onDelete?: () => void; // funcion que se ejecuta al hacer click en eliminar, se pasa el id del elemento a eliminar
  url?: string; // url relativa, se concatenará con el id para formar la url completa eje: products/${id} si no se provee solo se parasa  el id al onDeleteConfirm
  urlFull?: string; // url completa para casos especiales, si se provee esta prop, se usará en lugar de concatenar url + id
  text?: string;
  header?: string;
  preset?: Preset;
}

export function DeleteButton(props: DeleteButtonProps) {
  const { id, disabled, url, urlFull, onDeleteConfirm, onDelete, text = "¿Estas seguro de eliminar este elemento?", header = "Eliminar Elemento", preset } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    if(urlFull) {
      onDeleteConfirm(urlFull);
    } else {
      onDeleteConfirm(`${url}${url ? "/" : ""}${id}`);
    }
    onDelete && onDelete();
    setIsModalOpen(false);
  }
  const finalPreset = preset ? preset : disabled ? Preset.smallCloseDisable : Preset.smallClose;

  return (<>
    <Button 
          preset={finalPreset} 
          onClick={() => setIsModalOpen(true)} 
          disabled={disabled} 
          noText={preset ? false : true}
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
