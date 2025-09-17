"use client";
import { Button, Preset } from "../button/button";
import useConfigStore from "@/stores/configStore";
import Modal from "../modal/Modal";



export interface ProductDetailsModalProps {
  onClose: () => void;
  isShow: boolean;
  record?: any;
}

export function ProductDetailsModal(props: ProductDetailsModalProps) {
    const { onClose, isShow, record } = props;
    const { system } = useConfigStore();
    console.log(record);

  return (
    <Modal show={isShow} onClose={onClose} size="lg" headerTitle="Detalles del producto" closeOnOverlayClick={false} hideCloseButton={false}>
      <Modal.Body>
        <div className="p-4 space-y-6"> {/* Main padding and spacing */}



        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} disabled={false} />
      </Modal.Footer>
    </Modal>
  );

}

