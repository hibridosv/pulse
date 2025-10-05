import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
import { Button, Preset } from "../button/button";



export function ShowProductSearched() {
  const { getSelectedElement, clearSelectedElement } = useTempSelectedElementStore();
  const elementSelected = getSelectedElement('productSearched');

    if (!elementSelected) return null;


    return (
          <div className="mt-2 p-3 flex justify-between text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
            <span className="font-semibold uppercase">{ elementSelected?.description}</span> <Button preset={Preset.smallClose} onClick={()=> clearSelectedElement('productSearched')} />
          </div>         
    );
}