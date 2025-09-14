'use client'
import { useEffect } from 'react'
import useConfigStore from '@/stores/configStore'
import { extractActiveFeature } from '@/lib/config/config'

export function useConfigLogic() {
  const { isLoaded, loadConfig, setActiveConfig, configurations, activeConfig } = useConfigStore()

  useEffect(() => {
    if (!isLoaded) {
      loadConfig()
    }
    if (configurations && !activeConfig) {
      setActiveConfig(extractActiveFeature(configurations))
      console.log("Se renderizo")
    }
  }, [isLoaded, loadConfig, setActiveConfig, configurations, activeConfig])

}
