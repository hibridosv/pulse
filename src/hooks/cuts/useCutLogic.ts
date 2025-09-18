'use client'
import { useEffect } from 'react'
import useCutStore from '@/stores/cutStore'


export function useCutLogic(url: string) {
  const { loadCut} = useCutStore()

  useEffect(() => {
      loadCut(url)
  }, [loadCut])

}
