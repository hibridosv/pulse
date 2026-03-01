import { Button, Preset } from "@/components/button/button";
import Modal from "@/components/modal/Modal";
import { formatDateAsNumber } from "@/lib/date-formats";
import useToastMessageStore from "@/stores/toastMessageStore";
import CryptoJS from 'crypto-js';
import { DateTime } from "luxon";
import { useState } from "react";
import { FiCheck, FiClipboard } from 'react-icons/fi';

export interface KeyModalI {
  onClose: () => void;
  isShow: boolean;
}

export function KeyModal({ onClose, isShow }: KeyModalI) {
    const [copied, setCopied] = useState(false);
    const {setMessage} = useToastMessageStore();

    if (!isShow) return null;
    
    const dateStr = formatDateAsNumber(new Date());
    const hash = CryptoJS.MD5(dateStr).toString().substring(0, 4).toUpperCase();

    const handleCopy = () => {
        navigator.clipboard.writeText(hash);
        setCopied(true);
        setMessage({ message: 'Clave copiada al portapapeles'});
        setTimeout(() => setCopied(false), 2000);
    };

    const expirationTime = DateTime.now().plus({ hours: 1 }).startOf('hour').toFormat('HH:mm');

    return (
        <Modal 
            show={isShow} 
            onClose={onClose} 
            size="sm"
            headerTitle="Clave de Autorización"
        >
            <Modal.Body>
                <div className="flex flex-col items-center justify-center p-4 text-center">
                    <p className="mb-2 text-text-muted">
                        Usa esta clave para autorizar operaciones especiales.
                    </p>
                    <p className="mb-4 font-semibold text-warning">
                        Válida hasta las {expirationTime}
                    </p>
                    <div 
                        className="relative flex items-center justify-center w-full px-4 py-3 rounded-lg cursor-pointer bg-bg-subtle hover:bg-primary/10"
                        onClick={handleCopy}
                    >
                        <span className="text-4xl font-bold tracking-widest text-primary font-mono">
                            {hash}
                        </span>
                        <div className="absolute text-lg text-text-muted right-4">
                            {copied ? <FiCheck className="text-success" /> : <FiClipboard />}
                        </div>
                    </div>
                    <small className="mt-3 text-text-muted">Haz clic en la clave para copiar</small>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose} preset={Preset.close} />
            </Modal.Footer>
        </Modal>
    );
}
