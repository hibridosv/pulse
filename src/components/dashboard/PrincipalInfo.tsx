'use client'

import useDashBoardStore from "@/stores/dashboardStore";
import { CardDashBoard } from "./CardDashboard";
import { NothingHere } from "../NothingHere";

export function PrincipalInfo() {
    const { cards, loading } = useDashBoardStore();

    if (loading) {
        return (
            <div className="bg-gray-50">
                <div className="container px-5 mx-auto py-8">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[...Array(4)].map((_, index) => (
                           <CardDashBoard key={index} isLoading={true} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!cards || cards.length === 0) {
        return (
            <div className="bg-gray-50 py-8">
                <NothingHere text="No se encontraron datos" width="164" height="98" />
            </div>
        );
    }

    return (
        <div className="bg-gray-50">
            <div className="container px-5 mx-auto">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {cards.map((record: any, index: any) => (
                        <CardDashBoard key={index} records={record} />
                    ))}
                </div>
            </div>
        </div>
    );
}