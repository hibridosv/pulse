import { useState, useEffect } from 'react';
import useSelectedElementStore from '@/stores/selectedElementStorage';
import useCategoriesStore from '@/stores/categoriesStore';



export function useProductCategoriesLogic(isShow: boolean, setFocus: any) {
    const { elementSelected, setElement } = useSelectedElementStore();
    const { loadCategories, categories } = useCategoriesStore();


    useEffect(() => {
      setFocus('name', {shouldSelect: true})
      if (isShow) {
        if (!elementSelected) {
            setElement(1);
        } 
     }
    }, [setFocus, isShow, elementSelected])

    useEffect(() => {
        if (!categories && isShow) {
            loadCategories("categories?sort=-created_at&included=subcategories&filterWhere[category_type]==1&filterWhere[is_restaurant]==0");
        }
    // eslint-disable-next-line
    }, [loadCategories, isShow]);

    const onSubmit = async (data: any) => { 
        data.category_type = elementSelected;
        data.dependable = elementSelected == 1 ? null : data.categoria;
        data.pronoun = data.name;
        console.log("submit category", data);
    };

    return { onSubmit };
}