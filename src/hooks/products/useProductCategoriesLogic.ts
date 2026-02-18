import { createService } from '@/services/services';
import useCategoriesStore from '@/stores/products/categoriesStore';
import useStateStore from '@/stores/stateStorage';
import useToastMessageStore from '@/stores/toastMessageStore';
import useTempStorage from '@/stores/useTempStorage';
import { useEffect } from 'react';



export function useProductCategoriesLogic(isShow: boolean, setFocus: any, resetField: any) {
    const { loadCategories, categories } = useCategoriesStore();
    const { openLoading, closeLoading } = useStateStore();
    const { setElement, getElement} = useTempStorage();
    const elementSelected = getElement("option");


    useEffect(() => {
      setFocus('name', {shouldSelect: true})
      if (isShow) {
        if (!elementSelected) {
            setElement("option", 1);
        } 
     }
    }, [setFocus, isShow, elementSelected, setElement])

    useEffect(() => {
        if (!categories && isShow) {
            loadCategories("categories?sort=-created_at&included=subcategories&filterWhere[category_type]==1&filterWhere[is_restaurant]==0");
        }
    // eslint-disable-next-line
    }, [loadCategories, isShow]);

    const onSubmit = async (data: any) => { 
        data.category_type = elementSelected;
        data.dependable = elementSelected == 1 ? null : data.dependable;
        data.pronoun = data.name;
            openLoading("categoryForm");
            try {
                const response = await createService('categories', data);
                loadCategories("categories?sort=-created_at&included=subcategories&filterWhere[category_type]==1&filterWhere[is_restaurant]==0");
                useToastMessageStore.getState().setMessage(response);
                resetField("name");
            } catch (error) {
                useToastMessageStore.getState().setError(error);
                console.error(error);
            } finally {
                closeLoading("categoryForm");
            }
    };

    return { onSubmit };
}