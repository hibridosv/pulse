'use client'
import { extractActiveFeature } from '@/lib/config/config'
import useConfigStore from '@/stores/configStore'
import { useThemeStore } from '@/stores/themeStore'
import { useEffect } from 'react'

export function useConfigLogic() {
  const { isLoaded, loadConfig, setActiveConfig, configurations, activeConfig, loading, _hasHydrated, tenant } = useConfigStore()
  const { setTheme } = useThemeStore()
  
  useEffect(() => {
    if (_hasHydrated && !isLoaded && !loading) {
      loadConfig()
    }
  }, [_hasHydrated, isLoaded, loading, loadConfig])

  useEffect(() => {
    if (!activeConfig && configurations && configurations.length > 0) {
      let extracted = extractActiveFeature(configurations)
      setActiveConfig(extracted)
    }
  }, [configurations, activeConfig, setActiveConfig])


  useEffect(() => { 
    if (tenant) {
      if (tenant?.system === 1 || tenant?.system === 2) {
        setTheme('navy');
      } else {
        setTheme('green')
      }
    }
  }, [ setTheme, tenant ])

}
