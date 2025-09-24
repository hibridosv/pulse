import { useState } from "react";
import { DeleteModal } from "@/components/DeleteModal";
import { Button, Preset } from "@/components/button/button";
import { Price } from "@/interfaces/price";

export interface DeletePriceButtonProps {
  price: Price;
  onDeleteConfirm: (id: string) => void;
}

export function DeletePriceButton(props: DeletePriceButtonProps) {
  const { price, onDeleteConfirm } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    onDeleteConfirm(price.id);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button
        preset={Preset.smallClose}
        onClick={() => setIsModalOpen(true)}
        noText
      />
      <DeleteModal
        isShow={isModalOpen}
        text="¿Estás seguro de eliminar este precio?"
        onDelete={handleDelete}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}