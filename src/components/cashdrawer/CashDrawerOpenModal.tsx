
import { Button, Preset } from "../button/button";
import Modal from "../modal/Modal";

export interface CashdrawerOpenModalProps {
  onClose: () => void;
  isShow: boolean;
  drawer: string;
}

export function CashdrawerOpenModal(props: CashdrawerOpenModalProps) {
    const { onClose, isShow, drawer } = props;


  return (
    <Modal show={isShow} onClose={onClose} size="md" headerTitle="Apertura de caja" closeOnOverlayClick={false} hideCloseButton={true}>
      <Modal.Body>
        <div className="mx-4">

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.accept} disabled={false} />
      </Modal.Footer>
    </Modal>
  );
}

