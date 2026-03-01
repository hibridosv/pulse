'use client';

import { useDashboardDetailCardsLogic } from '@/hooks/dashboard/useDashboardDetailCardsLogic';

export function DashboardDetailCards() {
    const { detailCards, loading, hasData } = useDashboardDetailCardsLogic()

    if (loading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-bg-content rounded-xl shadow-sm border border-bg-subtle p-3 h-[88px] animate-pulse">
                        <div className="w-8 h-8 rounded-lg bg-bg-subtle mx-auto mb-2"></div>
                        <div className="h-4 bg-bg-subtle rounded w-2/3 mx-auto mb-1"></div>
                        <div className="h-3 bg-bg-subtle rounded w-1/2 mx-auto"></div>
                    </div>
                ))}
            </div>
        )
    }

    if (!hasData) return null

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {detailCards.map((card: any) => (
            <div
              key={card.label}
              className="bg-bg-content rounded-xl shadow-sm border border-bg-subtle p-3 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center mx-auto mb-2`}>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <p className="text-sm font-bold text-text-base leading-tight">{card.value}</p>
              <p className="text-[10px] text-text-muted mt-0.5 leading-tight truncate">{card.label}</p>
            </div>
          ))}
        </div>
    )
}
