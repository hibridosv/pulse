"use client";
import { Button, Preset } from "@/components/button/button";
import Modal from "@/components/modal/Modal";
import { URL } from '@/constants';
import { useRestaurantOptionsAddLogic } from "@/hooks/restaurant/useRestaurantOptionsAddLogic";
import useModalStore from "@/stores/modalStorage";
import manageRestaurantStore from "@/stores/restaurant/manageRestaurantStore";
import Image from "next/image";

export interface RestaurantOptionsAddModalI {
  onClose: () => void;
  isShow: boolean;
}

export function RestaurantOptionsAddModal(props: RestaurantOptionsAddModalI) {
  const { onClose, isShow } = props;
  const { openModal } = useModalStore();
  const { loadOptions } = manageRestaurantStore();
  const {
    register,
    handleSubmit,
    onSubmit,
    modifier,
    variants,
    removeVariant,
    removeOption,
    sendOptions,
    sending,
    selectedImage,
  } = useRestaurantOptionsAddLogic();

  const imageLoader = ({ src, width, quality }: any) => {
    return `${URL}/images/ico/${src}?w=${width}&q=${quality || 75}`
  }

  return (
    <Modal show={isShow} onClose={onClose} size="sm" headerTitle="Agregar modificadores" closeOnOverlayClick={true} >
      <Modal.Body>
        <div className="mx-1">

          {modifier && (
            <div className="flex items-center justify-between bg-bg-subtle/60 rounded-md px-3 py-2 mb-3">
              <span className="text-text-base font-semibold uppercase">{modifier}</span>
              <Button onClick={removeOption} preset={Preset.smallClose} />
            </div>
          )}

          {variants.length > 0 && (
            <div className="mb-3 space-y-2">
              {variants.map((variant, index) => (
                <div key={index} className="flex items-center justify-between bg-bg-content rounded-md px-3 py-2 shadow-sm border border-bg-subtle">
                  <div className="flex items-center gap-2">
                    <Image loader={imageLoader} src={variant.img} alt={variant.name} width={32} height={32} className="rounded" />
                    <span className="text-text-base text-sm">{variant.name}</span>
                    <span className="text-text-muted text-sm">${variant.quantity.toFixed(2)}</span>
                  </div>
                  <Button onClick={() => removeVariant(variant.name)} preset={Preset.smallClose} />
                </div>
              ))}
            </div>
          )}

          <form className="max-w-lg mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full px-3 mb-4">
              <label htmlFor="name" className="input-label">
                {modifier ? "Nombre de la variante" : "Nombre del modificador"}
              </label>
              <input {...register("name", { required: true })} className="input w-full" />
            </div>

            {modifier && (
              <>
                <div className="w-full px-3 mb-4">
                  <label htmlFor="quantity" className="input-label">Precio del modificador</label>
                  <input type="number" step="any" {...register("quantity")} className="input w-full" defaultValue={0} />
                </div>

                <div className="my-2 flex justify-center">
                  <div className="input-label">Seleccionar Imagen</div>
                </div>
                <div className="w-full mb-4 px-3 flex justify-center">
                  <div className="clickeable" onClick={() => openModal("showImagesOptionModal")}>
                    <Image loader={imageLoader} src={selectedImage} alt="Icono de imagen" width={64} height={64} className="drop-shadow-lg rounded-md" />
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-center">
              <Button type="submit" disabled={sending} preset={Preset.add} />
            </div>
          </form>

          {modifier && variants.length >= 2 && (
            <>
              <hr className="my-4 border-bg-subtle" />
              <div className="flex justify-center">
                <Button onClick={sendOptions} disabled={sending} preset={sending ? Preset.saving : Preset.save} />
              </div>
            </>
          )}

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} disabled={sending} />
      </Modal.Footer>
    </Modal>
  );
}
