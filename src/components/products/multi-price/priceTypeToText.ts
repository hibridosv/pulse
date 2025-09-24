import { Option } from "@/components/button/RadioButton";
import useConfigStore from "@/stores/configStore";
import { useMemo } from "react";

export const usePriceTypes = () => {
    const { activeConfig } = useConfigStore();

    const options = useMemo(() => {
        const baseOptions: Option[] = [
            { id: 0, name: "Todos" },
            { id: 1, name: "Normal" }
        ];

        if (activeConfig && Array.isArray(activeConfig)) {
            if (activeConfig.includes('product-price-wolesaler')) {
                baseOptions.push({ id: 2, name: "Mayoristas" });
            }
            if (activeConfig.includes('product-price-promotion')) {
                baseOptions.push({ id: 3, name: "Promoción" });
            }
        }
        return baseOptions;
    }, [activeConfig]);

    const priceTypeToText = (priceType: number) => {
        switch (priceType) {
            case 1: return "Normal";
            case 2: return "Mayorista";
            case 3: return "Promoción";
            default: return "Desconocido";
        }
    };

    return { options, priceTypeToText };
}