'use client'
import useCutStore from '@/stores/cutStore'
import { useEffect } from 'react'

export function useCutsLogic(url: string, currentPage: any) {
  const { loadCuts } = useCutStore()

  useEffect(() => {
      loadCuts(url)
  }, [loadCuts, currentPage])

}
