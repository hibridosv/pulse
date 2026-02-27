import manageRestaurantStore from '@/stores/restaurant/manageRestaurantStore';
import { useEffect } from 'react';



export function useRestaurantAddProductLogic(isShow: boolean) {
    const { loadCategories, categories, loadOptions, options, loadWorkStations, workStations } = manageRestaurantStore();



    useEffect(() => {
        if (!categories && isShow) {
            loadCategories("categories?sort=-created_at&filterWhere[category_type]==2&filterWhere[is_restaurant]==1");
        }
        if (!options && isShow) {
            loadOptions("restaurant/options");
        }
        if (!workStations && isShow) {
            loadWorkStations("restaurant/workstations?filterWhere[status]==1");
        }
    // eslint-disable-next-line
    }, [loadCategories, loadOptions, loadWorkStations, isShow]);


    return {  };
}