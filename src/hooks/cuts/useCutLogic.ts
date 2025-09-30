'use client'
import useCutStore from '@/stores/cashdrawer/cutStore'
import { useEffect } from 'react'


export function useCutLogic(url: string) {
  const { loadCut} = useCutStore()

  useEffect(() => {
      loadCut(url)
  }, [loadCut, url])

}
