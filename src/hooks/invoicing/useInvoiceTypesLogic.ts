import { AdditionalField } from '@/components/button/DateRange';
import { getServices } from '@/services/services';
import useStateStore from '@/stores/stateStorage';
import { useEffect, useMemo, useState } from 'react'; // Import useMemo


export function useInvoiceTypesLogic() {
    const [ invoiceTypes, setInvoiceTypes ] = useState(null) as any;
    const { openLoading, closeLoading, loading } = useStateStore()

    useEffect(() => {
        const handleGet = async () => {
            openLoading("invoiceTypes");
            try {
                const response = await getServices('invoice/type?filterWhere[type]=!9&FilterWhereIn[status]==1,0');
                setInvoiceTypes(response.data.data);
            } catch (error) {
                console.error(error);
            } finally {
                closeLoading("invoiceTypes");
            }
        }

        (async () => { 
            await handleGet()
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