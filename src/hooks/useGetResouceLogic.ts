'use client';

import { useEffect } from 'react';

/**
 * Hook que ejecuta una función (loader) de forma segura en el montaje del componente.
 * Para evitar bucles, la función 'loaderFn' que se le pasa debe estar
 * memorizada con useCallback en el componente que lo llama.
 * @param loaderFn La función a ejecutar.
 */
export function useGetResourceLogic(loaderFn: () => void) {
  useEffect(() => {
    loaderFn();
  }, [loaderFn]); 

}
