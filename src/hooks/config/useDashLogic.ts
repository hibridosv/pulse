'use client'
import useDasboardStore from '@/stores/dashboardStore'
import { useEffect } from 'react'

export function useDashBoardLogic() {
  const { loadCards, loadChardWeek, loadChardDay } = useDasboardStore()

  useEffect(() => {
      loadCards();
      loadChardWeek();
      loadChardDay();
  }, [loadCards, loadChardWeek, loadChardDay])

}
