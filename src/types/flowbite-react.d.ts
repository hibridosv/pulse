import 'flowbite-react';

declare module 'flowbite-react' {
  export interface ModalProps {
    Header?: React.FC<any>;
    Body?: React.FC<any>;
    Footer?: React.FC<any>;
  }

  export const Modal: React.ForwardRefExoticComponent<ModalProps & React.RefAttributes<HTMLDivElement>> & {
    Header: React.FC<any>;
    Body: React.FC<any>;
    Footer: React.FC<any>;
  };
}
