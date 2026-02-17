'use client';

import { Button, Preset } from '@/components/button/button';
import Modal from '@/components/modal/Modal';
import { useCodeRequest } from '@/hooks/useCodeRequest';
import { cloneElement, isValidElement, ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';

interface CodeRequestGuardProps {
  permission: string;
  onAuthorized: () => void;
  children: ReactNode;
}

export default function CodeRequestGuard({ permission, onAuthorized, children }: CodeRequestGuardProps) {
  const { isRequired, isModalOpen, setIsModalOpen, verifyCode, error, setError } = useCodeRequest(permission);
  const [code, setCode] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (error) {
      toast.error('Código incorrecto');
      setError(false);
    }
  }, [error, setError]);

  const handleClick = () => {
    if (isRequired) {
      setIsModalOpen(true);
    } else {
      onAuthorized();
    }
  };

  const handleSubmit = () => {
    if (code.length < 4) {
      toast.error('El código debe tener 4 dígitos');
      return;
    }
    if (verifyCode(code)) {
      setIsModalOpen(false);
      setCode('');
      onAuthorized();
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setCode('');
    setError(false);
  };

  const childElement = isValidElement(children)
    ? cloneElement(children as ReactElement<{ onClick?: () => void }>, { onClick: handleClick })
    : <span onClick={handleClick}>{children}</span>;

  const modal = isModalOpen && createPortal(
    <Modal
      show={isModalOpen}
      onClose={handleClose}
      headerTitle="Código de seguridad"
      size="xs"
      closeOnOverlayClick={false}
    >
      <Modal.Body>
        <div className="flex flex-col items-center gap-4 py-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
            <svg className="h-6 w-6 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>

          <p className="text-sm text-text-muted text-center">
            Ingrese el código de seguridad para continuar
          </p>

          <input
            ref={inputRef}
            type="text"
            maxLength={4}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="input text-center text-2xl font-bold tracking-[0.5em] uppercase w-full"
            placeholder="- - - -"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button preset={Preset.close} onClick={handleClose} />
        <Button preset={Preset.save} text='Acceder' onClick={handleSubmit} />
      </Modal.Footer>
    </Modal>,
    document.body
  );

  return (
    <>
      {childElement}
      {modal}
    </>
  );
}
