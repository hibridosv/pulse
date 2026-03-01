'use client'
import useDashBoardStore from '@/stores/dashboardStore'
import useConfigStore from '@/stores/configStore'
import { getCountryProperty } from '@/lib/utils'
import { useEffect } from 'react'
import { FiShoppingCart, FiCreditCard, FiTag, FiDatabase, FiArrowDownRight, FiArrowUpRight } from 'react-icons/fi'
import { HiOutlineReceiptPercent, HiOutlineClipboardDocumentList } from 'react-icons/hi2'

const iconMap: { [key: string]: React.ElementType } = {
  'descuento': FiTag,
  'gasto': HiOutlineReceiptPercent,
  'crédito': FiCreditCard,
  'credito': FiCreditCard,
  'abono': FiArrowDownRight,
  'pagar': HiOutlineClipboardDocumentList,
  'cuenta': FiArrowUpRight,
  'producto': FiShoppingCart,
  'inventario': FiDatabase,
}

const themeStyles: { [key: number]: { color: string; bg: string } } = {
  1: { color: 'text-cyan-600', bg: 'bg-cyan-500/10' },
  2: { color: 'text-red-500', bg: 'bg-red-500/10' },
  3: { color: 'text-emerald-600', bg: 'bg-emerald-500/10' },
  4: { color: 'text-blue-600', bg: 'bg-blue-500/10' },
}

function getIconForTitle(title: string): React.ElementType {
  const lower = title.toLowerCase()
  for (const key of Object.keys(iconMap)) {
    if (lower.includes(key)) return iconMap[key]
  }
  return FiTag
}

export function useDashboardDetailCardsLogic() {
  const { cards, loading, loadCards } = useDashBoardStore()
  const { system } = useConfigStore()

  useEffect(() => {
    loadCards()
  }, [loadCards])

  const hasData = Array.isArray(cards) && cards.length > 0
  const currency = system ? getCountryProperty(parseInt(system.country)).currency : '$'

  const detailCards = hasData
    ? cards.map((record: any) => {
        const style = themeStyles[record.theme] || { color: 'text-gray-600', bg: 'bg-gray-500/10' }
        const value = record.isMoney ? `${currency} ${record.value}` : record.value
        return {
          label: record.title,
          value,
          icon: getIconForTitle(record.title),
          color: style.color,
          bg: style.bg,
        }
      })
    : []

  return { detailCards, loading, hasData }
}
