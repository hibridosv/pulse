import useTempStorage from "@/stores/useTempStorage";
import { Button, Preset } from "../button/button";

export interface ShowClientSearchedI {
  tempSelectedName?: string;
  onClose?: (item: any) => void;
}

export function ShowClientSearched(props: ShowClientSearchedI) {
  const { tempSelectedName = "clientSelectedBySearch", onClose } = props;
  const { getSelectedElement, clearSelectedElement } = useTempStorage();
  const elementSelected = getSelectedElement(tempSelectedName);

    if (!elementSelected) return null;

    const handleClose = () => {
      clearSelectedElement(tempSelectedName);
      onClose && onClose(elementSelected);
    }


    return (
          <div className="mt-2 p-3 flex justify-between text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
            <span className="font-semibold uppercase">{ elementSelected?.name}</span> 
            <Button preset={Preset.smallClose} onClick={handleClose} />
          </div>         
    );
}