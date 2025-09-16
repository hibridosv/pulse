'use client'
import useCashDrawerStore from '@/stores/cashdrawersStore'
import { useEffect } from 'react'

export function useCashDrawersLogic() {
  const { loadCashDrawers, cashDrawers} = useCashDrawerStore()

  useEffect(() => {
      loadCashDrawers("cashdrawers?included=employee&filterWhere[status]=!0")
  }, [loadCashDrawers])

}
