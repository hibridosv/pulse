'use client'
import useDashBoardStore from '@/stores/dashboardStore'
import useConfigStore from '@/stores/configStore'
import { getCountryProperty } from '@/lib/utils'
import { useEffect } from 'react'
import { FiDollarSign, FiShoppingCart, FiBox, FiCreditCard, FiPercent, FiTarget } from 'react-icons/fi'
import { HiOutlineBanknotes, HiOutlineDocumentText } from 'react-icons/hi2'

const iconMap: { [key: string]: React.ElementType } = {
  'venta': FiDollarSign,
  'orden': FiShoppingCart,
  'ticket': FiCreditCard,
  'ganancia': FiTarget,
  'producto': FiBox,
  'cobrar': HiOutlineBanknotes,
  'margen': FiPercent,
  'factura': HiOutlineDocumentText,
}

const themeStyles: { [key: number]: { color: string; bg: string } } = {
  1: { color: 'text-emerald-600', bg: 'bg-emerald-500/10' },
  2: { color: 'text-blue-600', bg: 'bg-blue-500/10' },
  3: { color: 'text-amber-600', bg: 'bg-amber-500/10' },
  4: { color: 'text-violet-600', bg: 'bg-violet-500/10' },
}

function getIconForTitle(title: string): React.ElementType {
  const lower = title.toLowerCase()
  for (const key of Object.keys(iconMap)) {
    if (lower.includes(key)) return iconMap[key]
  }
  return FiDollarSign
}

export function useDashboardKpiCardsLogic() {
  const { kpiCards, loading, loadKpiCards } = useDashBoardStore()
  const { system } = useConfigStore()

  useEffect(() => {
    loadKpiCards()
  }, [loadKpiCards])

  const hasData = Array.isArray(kpiCards) && kpiCards.length > 0
  const currency = system ? getCountryProperty(parseInt(system.country)).currency : '$'

  const formattedCards = hasData
    ? kpiCards.map((record: any) => {
        const style = themeStyles[record.theme] || { color: 'text-gray-600', bg: 'bg-gray-500/10' }
        const value = record.isMoney ? `${currency} ${record.value}` : record.value
        return {
          title: record.title,
          value,
          icon: getIconForTitle(record.title),
          color: style.color,
          bg: style.bg,
        }
      })
    : []

  return { formattedCards, loading, hasData }
}
