import { ReactElement } from "react";
import { BiFingerprint, BiHelpCircle, BiHistory, BiMoney, BiMoneyWithdraw, BiUserPin } from "react-icons/bi";
import { FaCashRegister, FaFileInvoice, FaTools } from "react-icons/fa";
import { GrConfigure } from "react-icons/gr";
import { MdInventory, MdReport, MdTransferWithinAStation } from "react-icons/md";

export interface MenuItem {
  label: string;
  href?: string;
  icon?: ReactElement;
  children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  { label: "Panel Principal", href: "/dashboard", icon: <BiFingerprint className="mt-1 mr-2" /> },
  { label: "Control de cajas", href: "/cashdrawers", icon: <FaCashRegister className="mt-1 mr-2" /> },
  {
    label: "Inventario", icon: <MdInventory className="mt-1 mr-2" />,
    children: [
      { label: "Ver Productos", href: "/products" },
      { label: "Registrar Producto", href: "/products/new" },
      { label: "Editar Producto", href: "/products/search?page=edit" },
      { label: "Agregar Productos", href: "/products/add" },
      { label: "Descontar Productos", href: "/products/remove" },
      { label: "Productos Relacionados", href: "/products/linked" },
      { label: "Bajas Existencias", href: "/products/stock" },
      { label: "Proximos Vencimientos", href: "/products/expiring" },
      { label: "Kardex", href: "/products/search?page=kardex" },
    ],
  },
  {
    label: "Efectivo", icon: <BiMoney className="mt-1 mr-2" />,
    children: [
      { label: "Registro de Gastos", href: "/cash/expenses" },
      { label: "Remesas de Efectivo", href: "/cash/remittances" },
      { label: "Cuentas Bancarias", href: "/cash/bank-accounts" },
      { label: "Flujo de Efectivo", href: "/cash/transfers" },
      { label: "Historial de Transferencias", href: "/cash/history" },
    ],
  },
  {
    label: "Cuentas", icon: <BiMoneyWithdraw className="mt-1 mr-2" />,
    children: [
      { label: "Cuentas por cobrar", href: "/accounts/receivable" },
      { label: "Cuentas por Pagar", href: "/accounts/payable" },
    ],
  },
  {
    label: "Directorio", icon: <BiUserPin className="mt-1 mr-2" />,
    children: [
      { label: "Contactos", href: "/contacts/search" },
      { label: "Clientes", href: "/contacts/search?page=customers" },
      { label: "Repartidores", href: "/contacts/search?page=drivers" },
      { label: "Proveedores", href: "/contacts/search?page=suppliers" },
      { label: "Referidos", href: "/contacts/search?page=referrals" },
    ],
  },
  {
    label: "Historiales", icon: <BiHistory className="mt-1 mr-2" />,
    children: [
      { label: "Ventas", href: "/history/sales" },
      { label: "Gastos", href: "/history/expenses" },
      { label: "Remesas", href: "/history/remittances" },
      { label: "Cortes de Caja", href: "/history/cash-closures" },
      { label: "Ventas con descuento", href: "/history/discounted" },
      { label: "Listado de Ventas", href: "/history/list" },
      { label: "Ventas por Usuario", href: "/history/by-user" },
      { label: "Ventas por Cliente", href: "/history/by-customer" },
      { label: "Ventas por Producto", href: "/history/by-product" },
      { label: "Ordenes Eliminadas", href: "/history/deleted" },
      { label: "Listado de costos", href: "/history/costs" },
      { label: "Notas de Envio", href: "/history/shipping-notes" },
      { label: "Abonos Recibidos", href: "/history/payments" },
      { label: "Comisiones Pagadas", href: "/history/commissions" },
    ],
  },
  {
    label: "Herramientas", icon: <FaTools className="mt-1 mr-2" />,
    children: [
      { label: "Cotizaciones", href: "/tools/quotes" },
      { label: "Detalle de Comisiones", href: "/tools/commissions" },
      { label: "Puntos de Oro", href: "/tools/gold-points" },
      { label: "Ajustar Inventario", href: "/tools/adjustments" },
    ],
  },
  {
    label: "Reportes", icon: <MdReport className="mt-1 mr-2" />,
    children: [
      { label: "Detalle de Ventas", href: "/reports/sales" },
      { label: "Detalle de Gastos", href: "/reports/expenses" },
      { label: "Productos Ingresados", href: "/reports/entered" },
      { label: "Productos por lote", href: "/reports/by-batch" },
      { label: "Productos Averiados", href: "/reports/damaged" },
      { label: "Anexos de IVA y descargas", href: "/reports/tax" },
    ],
  },
  {
    label: "Facturación", icon: <FaFileInvoice className="mt-1 mr-2" />,
    children: [
      { label: "Documentos Emitidos", href: "/invoicing/documents" },
      { label: "Correlativo de Documentos", href: "/invoicing/correlatives" },
      { label: "Documentos Electrónicos", href: "/invoicing/electronic" },
      { label: "Documentos Rechazados", href: "/invoicing/rejected" },
      { label: "Notas de Remisión", href: "/invoicing/remission-notes" },
      { label: "Buscar Documentos", href: "/invoicing/search" },
    ],
  },
  {
    label: "Transferencias", icon: <MdTransferWithinAStation className="mt-1 mr-2" />,
    children: [
      { label: "Crear Transferencia", href: "/transfers/new" },
      { label: "Aceptar Transferencia", href: "/transfers/accept" },
      { label: "Solicitar Transferencia", href: "/transfers/request" },
      { label: "Listado de Transferencias", href: "/transfers/list" },
    ],
  },
  {
    label: "Configuraciones", icon: <GrConfigure className="mt-1 mr-2" />,
    children: [
      { label: "Principal", href: "/settings/general" },
      { label: "Productos", href: "/settings/products" },
      { label: "Usuarios", href: "/settings/users" },
      { label: "Permisos de Usuario", href: "/settings/permissions" },
      { label: "Sucursales", href: "/settings/branches" },
      { label: "Pagos", href: "/settings/payments" },
    ],
  },
  { label: "Ayuda", href: "/help", icon: <BiHelpCircle className="mt-1 mr-2" /> },
];
