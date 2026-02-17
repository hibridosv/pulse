'use client';

import { NothingHere } from '@/components/NothingHere';
import { RestaurantMenuSkeleton } from '@/components/skeleton/RestaurantMenuSkeleton';
import { URL } from '@/constants';
import ordersStore from '@/stores/orders/ordersStore';
import restauranMenuStore from '@/stores/orders/restauranMenuStore';
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';
import { ImageMenu } from './ImageMenu';


export function RestaurantMenu() {
  const { loading, restaurantMenu: images } =  restauranMenuStore();
  const { getSelectedElement } = useTempSelectedElementStore();
  const serviceType: number = getSelectedElement('serviceType');
  const selectedTables = getSelectedElement('selectedTables');
  const deliverySelected = getSelectedElement('deliverySelected');
  const { order } = ordersStore();

  if ((serviceType == 2 && selectedTables != "") || order?.invoiceproducts || (serviceType == 3 && deliverySelected?.id)) return <></>;


  const imageLoader = ({ src, width, quality }: any) => {
      return `${URL}/images/ico/${src}?w=${width}&q=${quality || 75}`
    }

    const result = images && images.find((item: any) => item.icon_type === 2 && item.alphabet === "PRI") as any;
    const categoryId = result ? result?.category_id : null;

    const listItems = images && images.map((record: any, index: number) => {
        if (record.icon_type == 1 && record.product.category_id != categoryId || record.icon_type == 2 && record.category.id == categoryId) return
        return (<ImageMenu key={index} record={record} index={index} imageLoader={imageLoader} />)
    });

  return (
      <div className="w-full px-2 py-3">
          <div className="flex flex-wrap justify-center gap-3">
            {loading ? <RestaurantMenuSkeleton imageQuantity={35} /> : listItems }
            {((!images || images.length == 0) && !loading) && <NothingHere text="No se encontraron productos en el menu" /> }
          </div>
     </div>
);
}
