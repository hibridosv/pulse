'use client'
import { getCountryProperty } from "@/lib/utils";
import useConfigStore from "@/stores/configStore";
import { FiTrendingUp, FiDollarSign, FiBox, FiUsers } from "react-icons/fi";

interface CardDashBoardProps {
    records?: any;
    isLoading?: boolean;
}

export function CardDashBoard(props: CardDashBoardProps) {
    const { records, isLoading } = props;
    const { system } = useConfigStore();

    if (isLoading) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-md h-[100px]">
                <div className="h-5 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
                <div className="h-7 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>
        )
    }
    if (!records || !system) return null;


    const themeStyles: { [key: number]: { color: string; bgColor: string } } = {
        1: { color: "text-cyan-600", bgColor: "bg-cyan-50" },
        2: { color: "text-red-600", bgColor: "bg-red-50" },
        3: { color: "text-green-600", bgColor: "bg-green-50" },
        4: { color: "text-blue-600", bgColor: "bg-blue-50" },
    };

    const selectedTheme = themeStyles[records.theme] || { color: "text-gray-600", bgColor: "bg-gray-50" };

    const getIcon = () => {
        const iconClasses = `w-5 h-5 ${selectedTheme.color}`; // Icono más pequeño
        const title = (records.title || "").toLowerCase();
        if (title.includes('venta')) return <FiDollarSign className={iconClasses} />;
        if (title.includes('producto')) return <FiBox className={iconClasses} />;
        if (title.includes('cliente')) return <FiUsers className={iconClasses} />;
        return <FiTrendingUp className={iconClasses} />;
    }

    return (
        <div className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            {/* Icono en la parte superior */}
            <div className={`p-2 rounded-full inline-block ${selectedTheme.bgColor}`}>
                {getIcon()}
            </div>
            {/* Bloque de texto debajo, ocupando todo el ancho */}
            <div className="mt-2">
                <p className="text-sm font-medium text-gray-500 tracking-wider truncate">{records.title}</p>
                <p className="text-2xl font-bold text-gray-900 break-words">
                    {records.isMoney ? `${getCountryProperty(parseInt(system?.country)).currency} ${records.value}` : records.value}
                </p>
            </div>
        </div>
    );
}
