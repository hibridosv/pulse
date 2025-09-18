'use client'
import useCashDrawerStore from '@/stores/cashdrawersStore'
import { useEffect } from 'react'

export function useCashDrawersLogic() {
  const { loadCashDrawers} = useCashDrawerStore()

  useEffect(() => {
      loadCashDrawers()
  }, [loadCashDrawers])

}
