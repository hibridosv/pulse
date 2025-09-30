'use client';
import { FC, ReactElement, useState } from "react";
import Link from 'next/link';
import { signOut } from "next-auth/react";
import { IoClose } from "react-icons/io5";
import { FaCashRegister, FaChevronDown, FaFileInvoice, FaSignOutAlt, FaTools } from "react-icons/fa";
import { useThemeStore } from "@/stores/themeStore";
import Image from "next/image";
import { BiFingerprint, BiHelpCircle, BiHistory, BiLinkAlt, BiMoney, BiMoneyWithdraw, BiUserPin } from "react-icons/bi";
import { MdInventory, MdReport, MdTransferWithinAStation } from "react-icons/md";
import { GrConfigure } from "react-icons/gr";

// --- Data Structure ---
interface MenuItem {
  label: string;
  href?: string;
  icon?: ReactElement;
  children?: MenuItem[];
}

// Expanded menu items to test scrolling
const menuItems: MenuItem[] = [
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
      { label: "Contactos", href: "/contacts" },
      { label: "Clientes", href: "/contacts?page=customers" },
      { label: "Repartidores", href: "/contacts?page=drivers" },
      { label: "Proveedores", href: "/contacts?page=suppliers" },
      { label: "Referidos", href: "/contacts?page=referrals" },
    ],
  },
  {
    label: "Historiales", icon: <BiHistory className="mt-1 mr-2" />,
    children: [
      { label: "Ventas", href: "/history/sales" },
      { label: "Gastos", href: "/history/expenses" },
      { label: "Remesas", href: "/history/remittances" },
      { label: "Corted de Caja", href: "/history/cash-closures" },
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

// --- SubMenu Component ---
const SubMenu: FC<{ item: MenuItem; onClose: () => void }> = ({ item, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <li className="mb-2">
      <button
        onClick={handleToggle}
        className="w-full flex justify-between items-center p-2 rounded text-text-inverted/90 hover:bg-white/10 hover:text-text-inverted"
      >
        <span className="flex">{item.icon}{item.label}</span>
        <FaChevronDown
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          size={14}
        />
      </button>
      {isOpen && (
        <ul className="pl-4 pt-2">
          {item.children?.map((child: any, index) => (
            <li key={index} className="mb-1">
              <Link
                href={child.href}
                onClick={onClose}
                className="block p-1 rounded text-text-inverted/70 hover:bg-white/10 hover:text-text-inverted"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

// --- Drawer Component ---
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer: FC<DrawerProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useThemeStore();
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity"
      onClick={onClose}
    >
      <div
        className={`left-0 top-0 h-full w-64 shadow-lg z-50 transform transition-all duration-500 ease-in-out flex flex-col relative bg-[url('/img/sidenav.jpg')] bg-cover bg-center ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
        style={{ transform: isOpen ? "translateX(0)" : "translateX(-100%)" }}
      >
        {/* Overlay para la opacidad del fondo */}
        <div className="absolute inset-0 bg-primary/80 z-0"></div>

        {/* Header */}
        <div className="relative p-4 border-b border-white/10 flex-shrink-0 bg-primary/95 z-10">
          <div className="w-full h-10">
            <Image
              src="/img/logo_hibrido_s.png"
              alt="Logo Hibrido SV"
              fill
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <button onClick={onClose} className="absolute top-2 right-2 z-10 text-text-inverted/70 hover:text-text-inverted">
            <IoClose size={24} />
          </button>
        </div>

        {/* Menu List (Scrollable)*/}
        <div className="flex-grow overflow-y-auto z-10 custom-scrollbar relative">
          <ul className="p-4 relative z-10">
            {menuItems.map((item: any, index: number) =>
              item.children ? (
                <SubMenu key={index} item={item} onClose={onClose} />
              ) : (
                <li key={index} className="mb-2">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="p-2 rounded text-text-inverted/90 hover:bg-white/10 hover:text-text-inverted flex"
                  >
                   {item.icon}
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        <div className="flex justify-center items-center p-2 gap-3 z-10 bg-primary/95">
            <button
              title="MDB"
              onClick={() => setTheme('mdb')}
              className={`w-6 h-6 rounded-full transition-all ${theme === 'mdb' ? 'ring-2 ring-offset-2 ring-offset-primary ring-white' : ''}`}
              style={{ backgroundColor: '#243A51' }}
            />
            <button
              title="Azul"
              onClick={() => setTheme('blue')}
              className={`w-6 h-6 rounded-full transition-all ${theme === 'blue' ? 'ring-2 ring-offset-2 ring-offset-primary ring-white' : ''}`}
              style={{ backgroundColor: '#162B69' }}
            />
            <button
              title="Verde"
              onClick={() => setTheme('green')}
              className={`w-6 h-6 rounded-full transition-all ${theme === 'green' ? 'ring-2 ring-offset-2 ring-offset-primary ring-white' : ''}`}
              style={{ backgroundColor: '#0C381F' }}
            />
            <button
              title="Navy"
              onClick={() => setTheme('navy')}
              className={`w-6 h-6 rounded-full transition-all ${theme === 'navy' ? 'ring-2 ring-offset-2 ring-offset-primary ring-white' : ''}`}
              style={{ backgroundColor: '#223E5A' }}
            />
        </div>

        {/* Footer (Logout) */}
        <div className="p-2 border-t border-white/10 flex-shrink-0 font-semibold z-10 bg-primary/95">
          <button
            onClick={() => signOut()}
            className="w-full flex items-center justify-center p-2 rounded text-danger hover:bg-danger/20"
          >
            <FaSignOutAlt className="mr-2" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;