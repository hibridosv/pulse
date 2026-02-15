'use client';

import { NothingHere } from '@/components/NothingHere';
import { RestaurantMenuSkeleton } from '@/components/skeleton/RestaurantMenuSkeleton';
import { URL } from '@/constants';
import useConfigStore from '@/stores/configStore';
import ordersProductsStore from '@/stores/orders/ordersProductsStore';
import restauranMenuStore from '@/stores/orders/restauranMenuStore';
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';
import useToastMessageStore from '@/stores/toastMessageStore';
import Image from 'next/image';


export function RestaurantMenu() {
  const { order } = ordersProductsStore();
  const { loading, restaurantMenu } =  restauranMenuStore();
  const { activeConfig, permission, configurations } = useConfigStore();
  const { sending } = ordersProductsStore();
  const { setError } =  useToastMessageStore();
  const { setSelectedElement, getSelectedElement, clearSelectedElement } = useTempSelectedElementStore();


  const images = restaurantMenu;

  const sendProduct = (productId: number) => {
      console.log(productId);
  }

  const selectCategory = (categoryId: number) => {
      console.log(categoryId);
    // setSelectedcategory(record.category_id); 
  // modalCategory.setIsOpen(true)
  }
  
      const imageLoader = ({ src, width, quality }: any) => {
          return `${URL}/images/ico/${src}?w=${width}&q=${quality || 75}`
        }
        


        const result = images && images.find((item: any) => item.icon_type === 2 && item.alphabet === "PRI") as any;
        const categoryId = result ? result?.category_id : null;



        const listItems = images && images.map((record: any) => {
            if (record.icon_type == 1 && record.product.category_id != categoryId || record.icon_type == 2 && record.category.id == categoryId) return
            return (
                <div key={record?.id} className="m-2 clickeable" title={record.icon_type == 1 ? record?.product?.description : record?.category?.name }>
                    <div 
                   onClick={record.icon_type == 1 ? 
                    ( sending ? ()=>{} : 
                    () => sendProduct(record.product_id)) : 
                    ()=>{ selectCategory(record.category_id) } 
                  }
                     className="rounded-md drop-shadow-lg">
                        <Image loader={imageLoader} src={record.icon_type == 1 ? record?.product?.restaurant?.image : record?.category?.img } alt="Icono de imagen" width={96} height={96} className="rounded-t-md" />
                        <p className={`w-full content-center text-center rounded-b-md overflow-hidden uppercase text-xs text-black font-medium p-1 h-9 ${record.icon_type == 1 ? 'bg-slate-300' : 'bg-cyan-200'}`} 
                           style={{ maxWidth: '96px',  wordBreak: 'keep-all', lineHeight: '1.2em' }}>
                            {record.icon_type == 1 ? record?.product?.description : record?.category?.name }
                        </p>
                    </div>
                </div>
            )
        });

  return (
      <div className="flex justify-around w-full">
          <div className="flex flex-wrap justify-center">
            {loading ? <RestaurantMenuSkeleton imageQuantity={35} /> : listItems }
            {((!images || images.length == 0) && !loading) && <div className="clickeable"><NothingHere text="No se encontraron imágenes" /></div> }
          </div>
     </div>
);
}
