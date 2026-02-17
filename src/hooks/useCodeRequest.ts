import { formatDateAsNumber } from '@/lib/date-formats';
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
    const dateStr = formatDateAsNumber(new Date());
    const hash = CryptoJS.MD5(dateStr).toString().substring(0, 4).toUpperCase();
    const isValid = code.toUpperCase() === hash;
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
