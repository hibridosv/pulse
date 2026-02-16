import { Alert } from "@/components/Alert/Alert";
import { DeleteModal } from "@/components/DeleteModal";
import { Popper } from "@/components/popper/Popper";
import { useOrderFnLogic } from "@/hooks/order/product/useOrderFnLogic";
import { requiredFieldsCCF, validateInvoiceFields } from "@/lib/validator-functions";
import useConfigStore from "@/stores/configStore";
import useModalStore from "@/stores/modalStorage";
import ordersProductsStore from "@/stores/orders/ordersProductsStore";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdOptions } from "react-icons/io";
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { PayButton } from "./Buttons/PayButton";
import { SaveButton } from "./Buttons/saveButton";

export function RestaurantButtons() {
  const { order, sending} = ordersProductsStore();

  const { cancel } = useOrderFnLogic();
  const { saving } = ordersProductsStore();
  const { modals, closeModal, openModal} = useModalStore();
  const invoice = order;
  const { system, cashdrawer, activeConfig } =useConfigStore();
  const { register, handleSubmit, reset, setFocus, setValue, watch, formState: { errors } } = useForm();
  const { getSelectedElement} = useTempSelectedElementStore();
  const payMethod = getSelectedElement('payMethod') ?? 1;
  const [input, setInput] = useState('');
  const [showInput, setShowInput] = useState<boolean>(false);
  const [keyboard, setKeyboard] = useState<any>(null);

  
  const validateFields = ()=>{
    if (invoice?.client_id && invoice?.invoice_assigned?.type == 3) {
      return validateInvoiceFields(invoice?.client, requiredFieldsCCF)
    }
  }

  let fieldsRequired = validateFields();
  
  const pay = (data: any) => {
    console.log(data);
        reset(); // Resetea el estado del formulario en react-hook-form
    if (activeConfig && activeConfig.includes("input-sales-keyboard")) {
        setInput(''); // Resetea el estado del input
        if (keyboard) {
            keyboard.clearInput(); // Resetea el teclado virtual
        }
        setShowInput(false)
    }
  }


//////keyboard
const handleKeyboardChange = (inputValue: string) => {
    // Actualiza el estado del campo de entrada y el valor en react-hook-form
    setInput(inputValue);
    setValue('cash', inputValue, { shouldValidate: true });
  };

  const handleKeyPress = (button: string) => {
    if (button === '{bksp}') {
      handleKeyboardChange(input.slice(0, -1));
    } else if (button === '.') {
      // Solo agrega el punto si no existe ya uno en el input
      if (!input.includes('.')) {
        handleKeyboardChange(input + button);
      }
    } else if (button === '{submit}') {
      handleSubmit(pay)();
    } else {
      handleKeyboardChange(input + button);
    }
  };
//////// termina keyboard

  if (!order) return null;

    return (
        <div className="w-full space-y-3 px-3 pt-3 pb-4">

        { !cashdrawer &&
        <Alert type="danger" title="Error" text="Debe seleccionar una caja para poder cobrar" isDismissible={false} /> }

        { (!invoice?.client_id && (invoice?.invoice_assigned?.type == 3 || invoice?.invoice_assigned?.type == 4)) &&
        <Alert type="danger" title="Error" text={`Seleccione un cliente para el ${invoice?.invoice_assigned?.type == 3 ? "CCF" : "Sujeto Excluido"}`} isDismissible={false} /> }

        { fieldsRequired && fieldsRequired.length > 0 &&
          <div className="rounded-lg border border-danger/20 bg-danger/10 p-2.5 text-sm text-text-base">
            Faltan los siguientes campos del cliente para facturar:
            <span className="ml-1 font-semibold text-danger">{`${fieldsRequired.join(', ')}.`}</span>
          </div>
        }
        <form id="restaurant-pay-form" onSubmit={handleSubmit(pay)}>
        { payMethod == 1 && cashdrawer && <>
          { activeConfig && activeConfig.includes("input-sales-keyboard") ? <div>
          { showInput &&
            <Keyboard inputName='cash' display={{'{bksp}': '<'}} layout={{ default: ["1 2 3", "4 5 6", "7 8 9", ". 0 {bksp}"] }}  onKeyPress={handleKeyPress} keyboardRef={r => setKeyboard(r)}/> }
            <div onClick={()=>setShowInput(!showInput)} className='clickeable p-1'>
                <input className="input-disabled" type="text" {...register('cash')} value={input} placeholder="Ingrese una cantidad" readOnly />
            </div>
          </div> :
          <input type="number" step="any" min={0} readOnly={sending} className="input" placeholder='Ingrese una cantidad' {...register("cash")} />
          }
        </>}
        <div className="grid grid-cols-[2fr_1fr_2fr]">
          <Popper label={
            <div className="button-grey clickeable">
              <IoMdOptions className="mr-1.5" /> Opciones
            </div>
          }>
            <div>Botones</div>
          </Popper>

          <SaveButton />
          <PayButton />
        </div>
      </form>
        <DeleteModal
          isShow={modals.deleteOrder}
          text={`¿Estas seguro de eliminar esta orden?`}
          onDelete={() =>{ cancel(order?.id); closeModal('deleteOrder'); }}
          onClose={() => closeModal('deleteOrder')}
        />
        </div>
    );

}
