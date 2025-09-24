'use client'
import { useEffect } from 'react'
import useConfigStore from '@/stores/configStore'
import { extractActiveFeature } from '@/lib/config/config'

export function useConfigLogic() {
  const { isLoaded, loadConfig, setActiveConfig, configurations, activeConfig} = useConfigStore()

  useEffect(() => {
    if (!isLoaded) {
      loadConfig()
    }
  }, [isLoaded, loadConfig])

  useEffect(() => {
    if (configurations && configurations.length > 0) {
      let extracted = extractActiveFeature(configurations)
      setActiveConfig(extracted)
    }
  }, [configurations, setActiveConfig])

}
