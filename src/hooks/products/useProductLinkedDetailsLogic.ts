import { Product } from '@/interfaces/products';
import useProductLinkedStore from '@/stores/products/productLinkedStore';
import { useEffect } from 'react';



export function useProductLinkedDetailsLogic(product: Product, isShow: boolean) {
  const { loadProducts, products: productsLinked, loading, productId} = useProductLinkedStore();



    useEffect(() => {
        if (isShow && product && product.id && product.product_type == 3 && productId != product.id) {
            loadProducts(product?.id);
        }
    }, [product, isShow, loadProducts, productId]);

    return { productsLinked, loading  };
}
