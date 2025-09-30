'use client'
import useCutStore from '@/stores/cashdrawer/cutStore'
import { useEffect } from 'react'

export function useCutsLogic(url: string, currentPage: any, showAll: boolean) {
  const { loadCuts } = useCutStore()

  useEffect(() => {
      loadCuts(url)
  }, [loadCuts, currentPage, showAll, url])

}
