import Modal from "@/components/modal/Modal";
import { Button, Preset } from "@/components/button/button";
import { ContactAddSV } from "./ContactAddSV";

export interface AddContactModalProps {
  onClose: () => void;
  isShow: boolean;
  record?: any;
}



export function AddContactModal(props : AddContactModalProps) {
    const { onClose, isShow, record } = props;

    if (!isShow) return null;

    return (
        <Modal show={isShow} onClose={onClose} size="xl" headerTitle="Detalles del contacto">
        <Modal.Body>
            <div className="p-2">
                <ContactAddSV isShow={isShow} record={record} />
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onClose} preset={Preset.close} disabled={false} />
        </Modal.Footer>
        </Modal>
    );
}