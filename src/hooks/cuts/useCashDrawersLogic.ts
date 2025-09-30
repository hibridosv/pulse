'use client'
import useCashDrawerStore from '@/stores/cashdrawer/cashdrawersStore'
import { useEffect } from 'react'

export function useCashDrawersLogic() {
  const { loadCashDrawers} = useCashDrawerStore()

  useEffect(() => {
      loadCashDrawers()
  }, [loadCashDrawers])

}
