"use client";
import { FC, ReactNode } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnOverlayClick?: boolean; // New prop
  headerTitle: string; // New prop for header title
  hideCloseButton?: boolean; // Moved from ModalHeaderProps
}

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  hideCloseButton?: boolean;
}

interface ModalSubComponentProps {
  children: ReactNode;
}

const Modal: FC<ModalProps> & {
  Header: FC<ModalHeaderProps>;
  Body: FC<ModalSubComponentProps>;
  Footer: FC<ModalSubComponentProps>;
} = ({ show, onClose, children, size = "md", closeOnOverlayClick = true, headerTitle, hideCloseButton = false }) => {
  if (!show) return null;

  const maxWidthClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  }[size];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={closeOnOverlayClick ? onClose : undefined} // Conditional onClick
    >
      <div
        className={`relative w-full ${maxWidthClass} p-6 bg-white rounded-lg shadow-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <ModalHeader title={headerTitle} onClose={onClose} hideCloseButton={hideCloseButton} />

        {children}
      </div>
    </div>
  );
};

const ModalHeader: FC<ModalHeaderProps> = ({ title, onClose, hideCloseButton }) => (
  <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-200 ">
    <h3 className="text-xl font-semibold text-gray-900 ">
      {title}
    </h3>
    {!hideCloseButton && (
      <button
        type="button"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
        onClick={onClose}
      >
        <IoClose size={24} />
        <span className="sr-only">Close modal</span>
      </button>
    )}
  </div>
);

const ModalBody: FC<ModalSubComponentProps> = ({ children }) => (
  <div className="mb-4">{children}</div>
);

const ModalFooter: FC<ModalSubComponentProps> = ({ children }) => (
  <div className="flex justify-end gap-4 pt-4 mt-4 border-t border-gray-200 ">
    {children}
  </div>
);

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;