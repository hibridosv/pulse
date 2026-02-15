'use client'
import { extractActiveFeature } from '@/lib/config/config'
import useConfigStore from '@/stores/configStore'
import { useEffect } from 'react'

export function useConfigLogic() {
  const { isLoaded, loadConfig, setActiveConfig, configurations, activeConfig, loading} = useConfigStore()

  useEffect(() => {
    if (!isLoaded && !loading) {
      loadConfig()
    }
  }, [isLoaded, loading, loadConfig])

  useEffect(() => {
    if (!activeConfig && configurations && configurations.length > 0) {
      let extracted = extractActiveFeature(configurations)
      setActiveConfig(extracted)
    }
  }, [configurations, activeConfig, setActiveConfig])

}
