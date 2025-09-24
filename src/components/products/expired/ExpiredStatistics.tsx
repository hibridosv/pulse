
export interface ExpiredStatisticsProps {
    statics: {
        total: number;
        expired: number;
        toexpired: number;
    } | null;
    isLoading?: boolean;
}

// --- Skeleton Component ---
function StatisticsSkeleton() {
    return (
        <div className="bg-bg-content rounded-lg shadow-sm border border-bg-subtle/50 p-4 animate-pulse">
            <div className="pb-4 border-b border-bg-subtle">
                <div className="h-5 bg-bg-subtle rounded w-1/2"></div>
            </div>
            <div className="pt-4 space-y-3">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center">
                        <div className="h-4 bg-bg-subtle rounded w-1/3"></div>
                        <div className="h-6 bg-bg-subtle rounded w-1/4"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}


export function ExpiredStatistics({ statics, isLoading }: ExpiredStatisticsProps) {

    if (isLoading) {
        return <StatisticsSkeleton />;
    }

    if (!statics) {
        return null;
    }

    const statsList = [
        { label: 'Total Mostrados', value: statics.total ?? 0, style: 'bg-bg-subtle/60 text-text-base' },
        { label: 'Expirados', value: statics.expired ?? 0, style: 'bg-danger/10 text-danger' },
        { label: 'Próximos a Expirar', value: statics.toexpired ?? 0, style: 'bg-warning/10 text-warning' },
    ];

    return (
        <div className="bg-bg-content rounded-lg shadow-sm border border-bg-subtle/50 p-4">
            <div className="pb-4 border-b border-bg-subtle">
                <h3 className="text-base font-semibold text-text-base uppercase">Estadísticas de Vencimiento</h3>
            </div>
            <div className="pt-4 space-y-3">
                {statsList.map((stat) => (
                    <div key={stat.label} className="flex justify-between items-center text-sm">
                        <p className="text-text-muted font-semibold">{stat.label}</p>
                        <p className={`font-bold px-2 py-0.5 rounded-md ${stat.style}`}>{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}