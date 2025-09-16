import { Close } from "@/styles/svg";
import { Button, Preset } from "../button/button";

export interface CashdrawerOpenModalProps {
  onClose: () => void;
  isShow?: boolean;
  drawer: string;
}

export function CashdrawerOpenModal(props: CashdrawerOpenModalProps) {
    const { onClose, isShow, drawer } = props;

    console.log(isShow);


  if (!isShow) return null; // Only render if isShow is true

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose} >
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()} >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-200 ">
          <h3 className="text-xl font-semibold text-gray-900 ">
            Apertura de caja
          </h3>
          <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={onClose} >
            { Close }
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="mx-4">


        </div>
        {/* Modal Footer */}
        <div className="flex justify-end gap-4 pt-4 mt-4 border-t border-gray-200 ">
          <Button onClick={onClose} preset={Preset.close} disabled={false} />
        </div>
      </div>
    </div>
  );
}

