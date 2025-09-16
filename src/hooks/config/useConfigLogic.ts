'use client'
import { useEffect } from 'react'
import useConfigStore from '@/stores/configStore'
import { extractActiveFeature } from '@/lib/config/config'
import { getSession } from 'next-auth/react';
import type { Session } from 'next-auth';

export function useConfigLogic() {
  const { isLoaded, loadConfig, setActiveConfig, configurations, activeConfig, url, setUrl } = useConfigStore()
  type CustomSession = Session & { url?: string };
  useEffect(() => {
    if (!isLoaded) {
      loadConfig()
    }
    if (configurations && !activeConfig) {
      let extracted = extractActiveFeature(configurations)
      setActiveConfig(extracted)
    }

    if (!url) {
      const fetchSession = async () => {
        const session = await getSession() as CustomSession | null;
        if (session?.url) {
          setUrl(session.url);
        }
      };
      fetchSession();
    }   


  }, [isLoaded, loadConfig, setActiveConfig, configurations, activeConfig, url, setUrl])

}
