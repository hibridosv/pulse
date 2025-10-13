import { useMemo } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { Alert } from "../Alert/Alert";
import { Button, Preset } from "../button/button";
import Modal from "../modal/Modal";

export interface DocumentErrorsModalProps {
  onClose: () => void;
  isShow: boolean;
  document: any | null;
}

// Helper para decodificar caracteres unicode, ej: \u00f3 -> ó
function decodeUnicode(str: string): string {
  if (!str) return '';
  return str.replace(/\\u([\dA-Fa-f]{4})/g, (match, grp) => {
    return String.fromCharCode(parseInt(grp, 16));
  });
}

// Hook para parsear y unificar errores de ambas fuentes
const useDocumentErrors = (document: any) => {
  return useMemo(() => {
    if (!document) return [];

    const allErrors = new Set<string>();

    // 1. Parsear `descripcion_msg`
    if (typeof document.descripcion_msg === 'string' && document.descripcion_msg.trim() !== '') {
      allErrors.add(document.descripcion_msg.trim());
    }

    // 2. Parsear `observaciones`
    if (typeof document.observaciones === 'string' && document.observaciones.trim() !== '[]' && document.observaciones.trim() !== '') {
      try {
        const parsedObservaciones = JSON.parse(document.observaciones);
        if (Array.isArray(parsedObservaciones)) {
          parsedObservaciones.forEach(obs => {
            if (typeof obs === 'string' && obs.trim() !== '') {
              allErrors.add(obs.trim());
            }
          });
        }
      } catch (e) {
        console.error("Error parsing 'observaciones' JSON string:", e);
        // Si el parseo falla, tratarlo como un string simple si no es un array vacío
        if (document.observaciones.trim() !== '[]') {
            allErrors.add(document.observaciones);
        }
      }
    }
    
    return Array.from(allErrors).map(decodeUnicode);
  }, [document]);
};

const ErrorItem = ({ error }: { error: string }) => (
  <div className="flex items-start gap-3 p-3 bg-danger/10 rounded-md">
    <FiAlertTriangle className="text-danger flex-shrink-0 mt-1" size={18} />
    <p className="text-danger font-medium text-sm">{error}</p>
  </div>
);

export function DocumentErrorsModal(props: DocumentErrorsModalProps) {
  const { onClose, isShow, document } = props;
  const errors = useDocumentErrors(document);

  return (
    <Modal show={isShow} onClose={onClose} size="lg" headerTitle="Errores del Documento">
      <Modal.Body>
        <div className="p-4">
          {errors.length === 0 ? (
            <Alert text="No se encontraron errores para este documento." type="success" />
          ) : (
            <div className="space-y-3">
              <p className="text-text-muted text-sm">
                Se encontraron los siguientes problemas que impidieron el procesamiento del documento:
              </p>
              <div className="max-h-96 overflow-y-auto space-y-3 p-3 bg-bg-subtle rounded-lg">
                {errors.map((error, idx) => (
                  <ErrorItem key={idx} error={error} />
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-end w-full">
          <Button onClick={onClose} preset={Preset.close} text="Cerrar" />
        </div>
      </Modal.Footer>
    </Modal>
  );
}