import { useState, useEffect } from 'react';
import useSelectedElementStore from '@/stores/selectedElementStorage';



export function useProductCategoriesLogic(isShow: boolean, setFocus: any) {
     const { elementSelected } = useSelectedElementStore();


    useEffect(() => {
      setFocus('name', {shouldSelect: true})
    }, [setFocus, isShow, elementSelected])

    useEffect(() => {
      setFocus('name', {shouldSelect: true})
    }, [setFocus, isShow, elementSelected])

}