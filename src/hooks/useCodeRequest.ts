import { formatDateFor10MinWindow } from '@/lib/date-formats';
import { permissionExists } from '@/lib/utils';
import useConfigStore from '@/stores/configStore';
import CryptoJS from 'crypto-js';
import { useMemo, useState } from 'react';

export function useCodeRequest(permission: string) {
  const { permission: permissionsActive } = useConfigStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(false);

  const isRequired = useMemo(() => {
    return !!permissionsActive && !permissionExists(permissionsActive, permission);
  }, [permissionsActive, permission]);

  const verifyCode = (code: string): boolean => {
    const now = new Date();
    // We get the time from 10 minutes ago to check the previous block
    const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);

    const dateStrCurrent = formatDateFor10MinWindow(now);
    const hashCurrent = CryptoJS.MD5(dateStrCurrent).toString().substring(0, 4).toUpperCase();

    const dateStrPrevious = formatDateFor10MinWindow(tenMinutesAgo);
    const hashPrevious = CryptoJS.MD5(dateStrPrevious).toString().substring(0, 4).toUpperCase();
    
    const upperCaseCode = code.toUpperCase();
    
    // The code is valid if it matches the current hash or the previous one.
    const isValid = upperCaseCode === hashCurrent || upperCaseCode === hashPrevious;

    setError(!isValid);
    return isValid;
  };

  return {
    isRequired,
    isModalOpen,
    setIsModalOpen,
    verifyCode,
    error,
    setError,
  };
}
