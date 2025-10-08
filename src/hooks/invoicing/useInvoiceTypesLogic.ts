import { AdditionalField } from '@/components/button/DateRange';
import { getServices } from '@/services/services';
import useStateStore from '@/stores/stateStorage';
import { useEffect, useMemo, useState } from 'react'; // Import useMemo


export function useInvoiceTypesLogic(url: string) {
    const [ invoiceTypes, setInvoiceTypes ] = useState(null) as any;
    const { openLoading, closeLoading, loading } = useStateStore()

    useEffect(() => {
        const handleGet = async (url: string) => {
            openLoading("invoiceTypes");
            try {
                const response = await getServices(url);
                setInvoiceTypes(response.data.data);
            } catch (error) {
                console.error(error);
            } finally {
                closeLoading("invoiceTypes");
            }
        }

        (async () => { 
            await handleGet(url)
        })();
    }, [openLoading, closeLoading]);


    const fieldsFiltered: AdditionalField[] = useMemo(() => {
        if (!invoiceTypes) {
            return [];
        }

        const typesFiltered = invoiceTypes.map((type: any) => ({ value: type.id, label: type.name }));

        return [{
            name: 'invoiceId',
            label: 'Seleccione el tipo de documento',
            type: 'select',
            options : [{ value: '', label: 'Mostrar Todos' }, ...typesFiltered]
        }];
    }, [invoiceTypes]);
    
    return { invoiceTypes, loading, fieldsFiltered }
}