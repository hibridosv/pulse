import Modal from "@/components/modal/Modal";
import { Button, Preset } from "@/components/button/button";
import { ContactDetailsSV } from "./ContactDetailsSV";

export interface ViewContactModalProps {
  onClose: () => void;
  isShow: boolean;
  record: any;
}



export function ViewContactModal(props : ViewContactModalProps) {
    const { onClose, isShow, record } = props;

    if (!isShow) return null;

    return (
        <Modal show={isShow} onClose={onClose} size="xl" headerTitle="Detalles del contacto">
        <Modal.Body>
            <div className="p-2">
                <ContactDetailsSV isShow={isShow} record={record} />
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onClose} preset={Preset.close} disabled={false} />
        </Modal.Footer>
        </Modal>
    );
}