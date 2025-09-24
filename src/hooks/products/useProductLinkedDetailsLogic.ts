import { useEffect } from 'react';
import { Product } from '@/interfaces/products';
import useProductLinkedStore from '@/stores/productLinkedStore';



export function useProductLinkedDetailsLogic(product: Product, isShow: boolean) {
  const { loadProducts, products: productsLinked, loading, productId} = useProductLinkedStore();



    useEffect(() => {
        if (isShow && product?.id && product.product_type == 3 && productId != product?.id) {
            loadProducts(product?.id);
        }
    }, [product, isShow]);

    return { productsLinked, loading  };
}
