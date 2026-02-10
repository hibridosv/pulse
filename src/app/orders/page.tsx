'use client'
import useConfigStore from '@/stores/configStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const { tenant } = useConfigStore();


  useEffect(() => {
    const tenantSystem = tenant?.system;
    if (tenantSystem) {
        if (tenantSystem === 2 || tenantSystem === 4) {
            router.push("/orders/restaurant");
          } else {
            router.push("/orders/products");
          }
    }
  }, [router, tenant]);
  
  return (<div></div>)
}