import { getCountryProperty, numberToMoney } from "@/lib/utils";
import { createService } from "@/services/services";
import useConfigStore from "@/stores/configStore";
import useToastMessageStore from "@/stores/toastMessageStore";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert } from "../Alert/Alert";
import { Button, Preset } from "../button/button";
import { Switch } from "../button/Switch";
import Modal from "../modal/Modal";

export interface CreateCreditNoteModalI {
  onClose: () => void;
  isShow: boolean;
  record?: any;
}
export function CreateCreditNoteModal(props: CreateCreditNoteModalI) {
    const { onClose, isShow, record } = props;
  
  const [isSending, setIsSending] = useState(false);
  const [isProductReturn, setIsProductReturn] = useState(true);
  const [formProducts, setFormProducts] = useState<any[]>([]);
  const [totalState, setTotalState] = useState(0);
  const { system } = useConfigStore();
  const { setError, setMessage } = useToastMessageStore();

  const { control, handleSubmit, setValue, getValues } = useForm({
    shouldUnregister: false,
  });
  const taxesPercent = 1 + (getCountryProperty(parseInt(system?.country)).taxes / 100);
  const productsRef = useRef<any[]>([]);

  useEffect(() => {
    if (record?.products && isShow) {
      const initializedProducts = record.products.map((product: any) => ({
        ...product,
        quantity: product.quantity || 1,
        discount: product.discount || 0,
      }));
      setFormProducts(initializedProducts);
      productsRef.current = initializedProducts;

      initializedProducts.forEach((product: any) => {
        setValue(`product-${product.id}`, product.quantity);
        setValue(`name-${product.id}`, product.product);
        setValue(`price-${product.id}`, product.unit_price);
      });
      
      setTotalState(calculateTotal(initializedProducts));
    }
    // eslint-disable-next-line
  }, [record?.products, setValue, isShow]);

  const calculateTotal = (products = formProducts) => {
    let total = 0;
    products.forEach((p) => {
      const quantity = Number(getValues(`product-${p.id}`)) || 0;
      const price = Number(getValues(`price-${p.id}`)) || 0;
      total += quantity * price;
    });
    return total;
  };

  // Update the total after blur (focus lost) rather than on every change
  const updateTotalAfterBlur = () => {
    setTimeout(() => {
      setTotalState(calculateTotal());
    }, 0);
  };

  const handleNc = async () => {
    // Calculate the final total before submission
    const currentTotal = calculateTotal();
    setTotalState(currentTotal);
    const totalIsDiferent = currentTotal !== record.total;
    
    const formattedData = formProducts
      .map((product: any) => {
        const quantity = Number(getValues(`product-${product.id}`)) || 0;
        const unit_price = Number(getValues(`price-${product.id}`)) || 0;
        const name = getValues(`name-${product.id}`);
        if (quantity === 0) return null;
        const total = quantity * unit_price;
        const subtotal = total / taxesPercent;
        const taxes = total - subtotal;
        return {
          id: product.id,
          product_id: product.product_id,
          product_type: product.product_type,
          lot_id: product.lot_id,
          product_name: name,
          product_price: unit_price,
          product_subtotal: subtotal,
          product_taxes: taxes,
          product_total: total,
          quantity,
        };
      })
      .filter((item) => item !== null);
      
      if (formattedData.length === 0) {
        setError({ message: "Debe tener al menos un producto con cantidad mayor a 0"});
        return;
      }
      
      const newData = {
        products: formattedData,
        invoice: record.id,
        subtotal: currentTotal / taxesPercent,
        taxes: currentTotal - (currentTotal / taxesPercent),
        total: currentTotal,
        credit_note_type: totalIsDiferent ? 2 : 1, // 1 for full credit note, 2 for partial
        is_product_return: isProductReturn
    };

    try {
      setIsSending(true);
      const response = await createService(`documents/credit-note`, newData);
      if (response.status === 200) {
        setMessage({ message: "Nota de crédito enviada correctamente"});
        onClose();
      }
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsSending(false);
    }
  };

  // Calculate product total for display in table
  const getProductTotal = (productId: any) => {
    const quantity = Number(getValues(`product-${productId}`)) || 0;
    const price = Number(getValues(`price-${productId}`)) || 0;
    return quantity * price;
  };


  if (!isShow || !record) return null;


  return (
    <Modal show={isShow} onClose={onClose} size="xl4" headerTitle="Crear nota de crédito">
      <Modal.Body>
        <form onSubmit={handleSubmit(handleNc)}>
          <div className="p-4">
            <Alert
              type="info"
              text="Para emitir una Nota de Crédito por el total del documento, haga clic directamente en 'Crear Nota de Crédito'. Para una nota parcial, modifique las cantidades de los productos antes de enviarla."
              isDismissible={false}
              className="mb-6"
            />
            <div className="w-full overflow-x-auto rounded-lg border border-bg-subtle">
              <table className="w-full text-sm text-left text-text-base">
                <thead className="text-xs text-text-base uppercase bg-bg-subtle/60">
                  <tr>
                    <th className="px-4 py-3 font-medium border-b-2 border-bg-subtle text-center">Cant</th>
                    <th className="px-4 py-3 font-medium border-b-2 border-bg-subtle">Código</th>
                    <th className="px-4 py-3 font-medium border-b-2 border-bg-subtle w-full">Producto</th>
                    <th className="px-4 py-3 font-medium border-b-2 border-bg-subtle text-right">Precio</th>
                    <th className="px-4 py-3 font-medium border-b-2 border-bg-subtle text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bg-subtle">
                  {formProducts.map((product: any) => (
                    <tr key={product.id} className="hover:bg-bg-subtle/40">
                      <td className="px-4 py-2">
                        <Controller
                          name={`product-${product.id}`}
                          control={control}
                          defaultValue={product.quantity}
                          render={({ field }) => (
                            <input
                              type="number"
                              {...field}
                              min={0}
                              className="w-20 bg-bg-content border border-bg-subtle rounded-md shadow-sm text-center focus:ring-primary focus:border-primary sm:text-sm"
                              onBlur={() => {
                                field.onBlur();
                                updateTotalAfterBlur();
                              }}
                            />
                          )}
                        />
                      </td>
                      <td className="px-4 py-2 truncate">{product.cod}</td>
                      <td className="px-4 py-2">
                        <Controller
                          name={`name-${product.id}`}
                          control={control}
                          defaultValue={product.product}
                          render={({ field }) => (
                            <textarea
                              rows={1}
                              maxLength={250}
                              {...field}
                              className="w-full bg-bg-content border border-bg-subtle rounded-md shadow-sm px-2 py-1 focus:ring-primary focus:border-primary sm:text-sm"
                            />
                          )}
                        />
                      </td>
                      <td className="px-4 py-2 text-right">
                        <Controller
                          name={`price-${product.id}`}
                          control={control}
                          defaultValue={product.unit_price}
                          render={({ field }) => (
                            <input
                              type="number"
                              {...field}
                              className="w-24 bg-bg-content border border-bg-subtle rounded-md shadow-sm px-2 py-1 text-right focus:ring-primary focus:border-primary sm:text-sm"
                              onBlur={() => {
                                field.onBlur();
                                updateTotalAfterBlur();
                              }}
                            />
                          )}
                        />
                      </td>
                      <td className="px-4 py-2 text-right font-medium">
                        {numberToMoney(getProductTotal(product.id), system)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-bg-subtle/60">
                  <tr>
                    <td colSpan={4} className="text-right font-bold py-3 px-4 border-t-2 border-bg-subtle">TOTAL:</td>
                    <td className="py-3 px-4 border-t-2 border-bg-subtle font-bold text-right">
                      {numberToMoney(totalState, system)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="text-right font-bold py-3 px-4">RETORNAR PRODUCTOS AL INVENTARIO:</td>
                    <td className="py-3 px-4 font-bold flex justify-end">
                      <Switch
                        disabled={false}
                        checked={isProductReturn}
                        label={isProductReturn ? "Sí" : "No"}
                        onChange={() => setIsProductReturn(!isProductReturn)}
                      />
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            {record?.invoice_assigned?.type !== 3 ? (
              <Alert
                type="warning"
                text="No se puede crear una nota de crédito en este documento."
                isDismissible={false}
                className="my-8"
              />
            ) : (
              <div className="mt-6 flex justify-end">
                <Button
                  type="submit"
                  preset={Preset.save}
                  text="Crear Nota de Crédito"
                  disabled={isSending}
                />
              </div>
            )}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} text="Cerrar" />
      </Modal.Footer>
    </Modal>
  );
}