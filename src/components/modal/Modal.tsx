"use client";
import { FC, ReactNode } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xl2" | "xl3" | "xl4" | "xl5" | "xl6" | "xl7" | "full";
  closeOnOverlayClick?: boolean; 
  headerTitle: string; // New prop for header title
  hideCloseButton?: boolean; // Moved from ModalHeaderProps
  removeTitle?: boolean; // New prop to optionally remove title
}

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  hideCloseButton?: boolean;
  removeTitle?: boolean;
}

interface ModalSubComponentProps {
  children: ReactNode;
}

const Modal: FC<ModalProps> & {
  Header: FC<ModalHeaderProps>;
  Body: FC<ModalSubComponentProps>;
  Footer: FC<ModalSubComponentProps>;
} = ({ show, onClose, children, size = "md", closeOnOverlayClick = true, headerTitle, hideCloseButton = false, removeTitle = false }) => {
  if (!show) return null;

  const maxWidthClass = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    xl2: "max-w-2xl",
    xl3: "max-w-3xl",
    xl4: "max-w-4xl",
    xl5: "max-w-5xl",
    xl6: "max-w-6xl",
    xl7: "max-w-7xl",
    full: "max-w-full",
  }[size];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={closeOnOverlayClick ? onClose : undefined} // Conditional onClick
    >
      <div
        className={`relative flex flex-col w-full ${maxWidthClass} max-h-[90vh] p-6 bg-white rounded-lg shadow-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <ModalHeader title={headerTitle} onClose={onClose} hideCloseButton={hideCloseButton} removeTitle={removeTitle} />

        {children}
      </div>
    </div>
  );
};

const ModalHeader: FC<ModalHeaderProps> = ({ title, onClose, hideCloseButton, removeTitle }) => {
  if (removeTitle) {
    return null;
  }

  return (
  <div className="flex-shrink-0 flex items-center justify-between pb-3 mb-4 border-b border-gray-200 ">
    <h3 className="text-xl font-semibold text-gray-900 uppercase">
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
} 

const ModalBody: FC<ModalSubComponentProps> = ({ children }) => (
  <div className="overflow-y-auto">{children}</div>
);

const ModalFooter: FC<ModalSubComponentProps> = ({ children }) => (
  <div className="flex-shrink-0 flex justify-end gap-4 pt-4 mt-4 border-t border-gray-200 ">
    {children}
  </div>
);

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;