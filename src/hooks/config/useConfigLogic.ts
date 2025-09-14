'use client'
import { useEffect } from 'react'
import useConfigStore from '@/stores/configStore'

export function useConfigLogic() {
  const { isLoaded, loadConfig } = useConfigStore()

  useEffect(() => {
    if (!isLoaded) {
      loadConfig()
    }
  }, [isLoaded, loadConfig, ])

}
