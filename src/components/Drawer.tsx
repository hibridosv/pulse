'use client';
import { FC, ReactElement, useState } from "react";
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
  { label: "Control de cajas", href: "/dashboard", icon: <FaCashRegister className="mt-1 mr-2" /> },
  {
    label: "Inventario", icon: <MdInventory className="mt-1 mr-2" />,
    children: [
      { label: "Ver Productos", href: "/products" },
      { label: "Añadir Producto", href: "/products/new" },
      { label: "Categorías", href: "/products/categories" },
    ],
  },
  {
    label: "Efectivo", icon: <BiMoney className="mt-1 mr-2" />,
    children: [
      { label: "Perfil", href: "/account/profile" },
      { label: "Facturación", href: "/account/billing" },
      { label: "Seguridad", href: "/account/security" },
    ],
  },
  {
    label: "Cuentas", icon: <BiMoneyWithdraw className="mt-1 mr-2" />,
    children: [
      { label: "Perfil", href: "/account/profile" },
      { label: "Facturación", href: "/account/billing" },
      { label: "Seguridad", href: "/account/security" },
    ],
  },
  {
    label: "Directorio", icon: <BiUserPin className="mt-1 mr-2" />,
    children: [
      { label: "Perfil", href: "/account/profile" },
      { label: "Facturación", href: "/account/billing" },
      { label: "Seguridad", href: "/account/security" },
    ],
  },
  {
    label: "Historiales", icon: <BiHistory className="mt-1 mr-2" />,
    children: [
      { label: "Perfil", href: "/account/profile" },
      { label: "Facturación", href: "/account/billing" },
      { label: "Seguridad", href: "/account/security" },
    ],
  },
  {
    label: "Herramientas", icon: <FaTools className="mt-1 mr-2" />,
    children: [
      { label: "Perfil", href: "/account/profile" },
      { label: "Facturación", href: "/account/billing" },
      { label: "Seguridad", href: "/account/security" },
    ],
  },
  {
    label: "Reportes", icon: <MdReport className="mt-1 mr-2" />,
    children: [
      { label: "Perfil", href: "/account/profile" },
      { label: "Facturación", href: "/account/billing" },
      { label: "Seguridad", href: "/account/security" },
    ],
  },
  {
    label: "Facturación", icon: <FaFileInvoice className="mt-1 mr-2" />,
    children: [
      { label: "Perfil", href: "/account/profile" },
      { label: "Facturación", href: "/account/billing" },
      { label: "Seguridad", href: "/account/security" },
    ],
  },
  {
    label: "Transferencias", icon: <MdTransferWithinAStation className="mt-1 mr-2" />,
    children: [
      { label: "Perfil", href: "/account/profile" },
      { label: "Facturación", href: "/account/billing" },
      { label: "Seguridad", href: "/account/security" },
    ],
  },
  {
    label: "Configuraciones", icon: <GrConfigure className="mt-1 mr-2" />,
    children: [
      { label: "General", href: "/settings/general" },
      { label: "Usuarios", href: "/settings/users" },
      { label: "Integraciones", href: "/settings/integrations" },
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
        className="w-full flex justify-between items-center p-2 rounded text-text-main/90 hover:bg-white/5 hover:text-text-main"
      >
        <span className="flex">{item.icon}{item.label}</span>
        <FaChevronDown
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          size={14}
        />
      </button>
      {isOpen && (
        <ul className="pl-4 pt-2">
          {item.children?.map((child, index) => (
            <li key={index} className="mb-2">
              <a
                href={child.href}
                onClick={onClose}
                className="block p-2 rounded text-text-main/70 hover:bg-white/5 hover:text-text-main"
              >
                {child.label}
              </a>
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
  if (!isOpen) return null;
  const { theme, setTheme } = useThemeStore();

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
        {/* Overlay para la opacidad */}
        <div className="absolute inset-0 bg-background-soft/70 z-0"></div>

        {/* Header */}
        <div className="relative p-4 border-b border-white/10 flex-shrink-0 bg-background-main z-10">
          <div className="w-full h-10">
            <Image
              src="/img/logo_hibrido_s.png"
              alt="Logo Hibrido SV"
              fill
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <button onClick={onClose} className="absolute top-2 right-2 z-10 text-text-main/70 hover:text-text-main">
            <IoClose size={24} />
          </button>
        </div>

        {/* Menu List (Scrollable)*/}
        <div className="flex-grow overflow-y-auto z-10 custom-scrollbar relative">
          <ul className="p-4 relative z-10">
            {menuItems.map((item, index) =>
              item.children ? (
                <SubMenu key={index} item={item} onClose={onClose} />
              ) : (
                <li key={index} className="mb-2">
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="block p-2 rounded text-text-main/90 hover:bg-white/5 hover:text-text-main flex"
                  >
                   {item.icon}
                    {item.label}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        <div className="flex justify-center items-center p-2 gap-4 z-10 bg-background-main">
            <button
              onClick={() => setTheme('indigo')}
              className={`px-3 py-1 rounded text-sm ${theme === 'indigo' ? 'bg-primary text-white' : 'bg-secondary'}`}
            >
              Indigo
            </button>
            <button
              onClick={() => setTheme('green')}
              className={`px-3 py-1 rounded text-sm ${theme === 'green' ? 'bg-primary text-white' : 'bg-secondary'}`}
            >
              Green
            </button>
        </div>

        {/* Footer (Logout) */}
        <div className="p-2 border-t border-white/10 flex-shrink-0 font-semibold z-10 bg-background-main">
          <button
            onClick={() => signOut()}
            className="w-full flex items-center justify-center p-2 rounded text-red-500 hover:bg-red-200"
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