"use client";
import { Button, Preset } from "@/components/button/button";
import Modal from "@/components/modal/Modal";
import { NothingHere } from "@/components/NothingHere";
import { URL } from "@/constants";
import ordersStore from "@/stores/orders/ordersStore";
import restauranMenuStore from "@/stores/orders/restauranMenuStore";
import useTempStorage from "@/stores/useTempStorage";
import { useEffect } from "react";
import { getModalSize } from "../functions";
import { ImageMenu } from "./ImageMenu";

export interface CategoryMenuModalI {
  onClose: () => void;
  isShow: boolean;
}



export function CategoryMenuModal(props: CategoryMenuModalI) {
  const { onClose, isShow } = props;
  const { order, sending, error } = ordersStore();
  const { loading, restaurantMenu: images } =  restauranMenuStore();
  const { getElement } = useTempStorage();
  const category = getElement('categoryMenu');
  const filter = category ? category.category_id : null;



    useEffect(() => {
    if (isShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isShow]);

  if (!images || !isShow) return <></>

        const imageLoader = ({ src, width, quality }: any) => {
            return `${URL}/images/ico/${src}?w=${width}&q=${quality || 75}`
            }
        
            const imagesFiltered = images && images.filter((item: any) => item.icon_type === 1 && item.category_id === filter);

            const listItems = imagesFiltered && imagesFiltered.map((record: any, index: number) => {
                if (record.icon_type == 2) return
                return ( <ImageMenu key={record?.id} index={index} record={record} imageLoader={imageLoader} />)
            });


  return (
    <Modal show={isShow} onClose={onClose} size={getModalSize(imagesFiltered)} headerTitle={category?.category?.name} >
      <Modal.Body>
        <div className="flex flex-wrap justify-center gap-3">
          { imagesFiltered && imagesFiltered.length == 0 ? <NothingHere text="No existen productos en esta categoria" width="120" height="120" /> : listItems }
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} disabled={sending} /> 
      </Modal.Footer>
    </Modal>
  );

}
