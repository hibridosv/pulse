import { AiFillPrinter, AiFillSave, AiOutlineClose, AiOutlineSend } from "react-icons/ai"
import { GiCancel } from "react-icons/gi"
import { RiCheckDoubleFill } from "react-icons/ri"
import { ImSpinner5 } from "react-icons/im"
import { AiOutlineCloseCircle, AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai"
import { IoMdAddCircle } from "react-icons/io"
import { FaEdit, FaInfoCircle } from "react-icons/fa";
import { MdOutlineCheckCircle, MdOutlineError, MdOutlineInfo } from "react-icons/md"; // New icons for success, error, info

/**
 * All text will start off looking like this.
 */
const BASE = "py-2 px-4 flex justify-center items-center text-text-inverted transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 rounded-lg";

export const textPresets = {
  primary: null,
  secondary: null,
  danger: null,
  success: null,
  info: null,
  warning: null,
  close: "Cerrar",
  cancel: "Cancelar",
  save: "Guardar",
  accept: "Aceptar",
  add: "Agregar",
  send: "Enviar",

  saving: "Guardando...",
  submitting: "Enviando...",
  loading: "Cargando...",

  link: "",
  smallClose: "",
  smallCloseDisable: "",
  smallPlus: "",
  smallPlusDisable: "",
  smallMinus: "",
  smallMinusDisable: "",
  smallInfo: "",
  smallEdit: "",
  smallPrint: "",
  smallPrintDisable: "",
}

export const stylePresets = {
  primary: `${BASE} bg-primary hover:bg-primary/90 focus:ring-primary`,
  secondary: `${BASE} bg-secondary hover:bg-secondary/90 focus:ring-secondary`,
  danger: `${BASE} bg-danger hover:bg-danger/90 focus:ring-danger`,
  success: `${BASE} bg-success hover:bg-success/90 focus:ring-success`,
  info: `${BASE} bg-info hover:bg-info/90 focus:ring-info`,
  warning: `${BASE} bg-warning hover:bg-warning/90 focus:ring-warning`,

  // Action buttons (with specific colors)
  close: `${BASE} bg-danger hover:bg-danger/90 focus:ring-danger`,
  cancel: `${BASE} bg-text-muted hover:bg-text-muted/90 focus:ring-text-muted`, // Using text-muted for a neutral cancel
  save: `${BASE} bg-success hover:bg-success/90 focus:ring-success`,
  accept: `${BASE} bg-info hover:bg-info/90 focus:ring-info`,
  add: `${BASE} bg-primary hover:bg-primary/90 focus:ring-primary`,
  send: `${BASE} bg-info hover:bg-info/90 focus:ring-info`,

  // State buttons
  saving: `${BASE} bg-secondary cursor-not-allowed opacity-70`, // For "Guardando"
  submitting: `${BASE} bg-primary cursor-not-allowed opacity-70`, // For "Enviando"
  loading: `${BASE} bg-text-muted cursor-not-allowed opacity-70`, // General loading

  // Link button (no background, just text style)
  link: `transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 clickeable text-primary hover:underline`,

  // Small icon buttons (no text, just icon)
    smallClose: `transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 clickeable`,
    smallCloseDisable: `transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2`,
    smallPlus: `transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 clickeable`,
    smallPlusDisable: `transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2`,
    smallMinus: `transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 clickeable`,
    smallMinusDisable: `transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2`,
    smallInfo: `transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2`,
    smallEdit: `transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 clickeable`,
    smallPrint: `transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 clickeable`,
    smallPrintDisable: `transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2`,
};

export const iconPresets = {
  primary: "",
  secondary: "",
  danger: "",
  success: <MdOutlineCheckCircle className="mr-3" />,
  info: <MdOutlineInfo className="mr-3" />,
  warning: <MdOutlineError className="mr-3" />,

  close: <AiOutlineClose className="mr-3" />,
  cancel: <GiCancel className="mr-3" />,
  save: <AiFillSave className="mr-3"/>,
  accept: <RiCheckDoubleFill className="mr-3"/>,
  add: <IoMdAddCircle className="mr-3"/>,
  send: <AiOutlineSend className="mr-3"/>,

  saving: <ImSpinner5 className="mr-3 animate-spin" />,
  submitting: <ImSpinner5 className="mr-3 animate-spin" />,
  loading: <ImSpinner5 className="mr-3 animate-spin" />,

  link: "",
  smallClose: <AiOutlineCloseCircle color="red" size={25} />,
  smallCloseDisable: <AiOutlineCloseCircle color="grey" size={25} />,
  smallPlus: <AiOutlinePlusCircle color="green" size={25} />,
  smallPlusDisable: <AiOutlinePlusCircle color="grey" size={25} />,
  smallMinus: <AiOutlineMinusCircle color="green" size={25} />,
  smallMinusDisable: <AiOutlineMinusCircle color="grey" size={25} />,
  smallInfo: <FaInfoCircle color="#5DADE2" size={23} />,
  smallEdit: <FaEdit color="#31B92F" size={23} />,
  smallPrint: <AiFillPrinter color="#2FA0B9" size={25} />,
  smallPrintDisable: <AiFillPrinter color="grey" size={25} />,
};