import { useEffect } from 'react';
import useCategoriesStore from '@/stores/categoriesStore';
import { createService } from '@/services/services';
import useToastMessageStore from '@/stores/toastMessageStore';
import useStateStore from '@/stores/stateStorage';
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';



export function useProductCategoriesLogic(isShow: boolean, setFocus: any, resetField: any) {
    const { loadCategories, categories } = useCategoriesStore();
    const { openLoading, closeLoading } = useStateStore();
    const { setSelectedElement, getSelectedElement} = useTempSelectedElementStore();
    const elementSelected = getSelectedElement("option");


    useEffect(() => {
      setFocus('name', {shouldSelect: true})
      if (isShow) {
        if (!elementSelected) {
            setSelectedElement("option", 1);
        } 
     }
    }, [setFocus, isShow, elementSelected, setSelectedElement])

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