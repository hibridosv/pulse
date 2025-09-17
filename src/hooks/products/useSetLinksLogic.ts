'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export function useSetLinkLogic() {
    const [ links, setLinks ] = useState([] as any)
    const { data: session } = useSession();
    const remoteUrl = session?.url

  useEffect(() => {
  if (remoteUrl) {
        setLinks([
          {"name": `DESCARGAR EN EXCEL`, "link": encodeURI(`${remoteUrl}/download/excel/inventory/`), "isUrl": true}, 
          {"name": `DESCARGAR EN PDF`, "link": encodeURI(`${remoteUrl}/web/inventory/`), "isUrl": true},
          {"name": `DESCARGAR PRECIOS`, "link": encodeURI(`${remoteUrl}/web/inventory/prices`), "isUrl": true}])
  }
  }, [remoteUrl]); 

  return links;
}
