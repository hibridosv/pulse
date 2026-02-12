'use client'
import { extractActiveFeature } from '@/lib/config/config'
import useConfigStore from '@/stores/configStore'
import { useEffect } from 'react'

export function useConfigLogic() {
  const { isLoaded, loadConfig, setActiveConfig, configurations, activeConfig} = useConfigStore()

  useEffect(() => {
    if (!isLoaded) {
      loadConfig()
    }
  }, [isLoaded, loadConfig])

  useEffect(() => {
    if (!activeConfig && configurations && configurations.length > 0) {
      let extracted = extractActiveFeature(configurations)
      setActiveConfig(extracted)
    }
  }, [configurations, activeConfig, setActiveConfig])

}
