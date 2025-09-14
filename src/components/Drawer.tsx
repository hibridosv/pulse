"use client";
import { FC, useState } from "react";
import { signOut } from "next-auth/react";
import { IoClose } from "react-icons/io5";
import { FaChevronDown, FaSignOutAlt } from "react-icons/fa";

// --- Data Structure ---
interface MenuItem {
  label: string;
  href?: string;
  children?: MenuItem[];
}

// Expanded menu items to test scrolling
const menuItems: MenuItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  {
    label: "Productos",
    children: [
      { label: "Ver Productos", href: "/products" },
      { label: "Añadir Producto", href: "/products/new" },
      { label: "Categorías", href: "/products/categories" },
    ],
  },
  {
    label: "Cuenta",
    children: [
      { label: "Perfil", href: "/account/profile" },
      { label: "Facturación", href: "/account/billing" },
      { label: "Seguridad", href: "/account/security" },
    ],
  },
  { label: "Pedidos", href: "/orders" },
  { label: "Clientes", href: "/customers" },
  { label: "Analíticas", href: "/analytics" },
  { label: "Marketing", href: "/marketing" },
  {
    label: "Configuración",
    children: [
      { label: "General", href: "/settings/general" },
      { label: "Usuarios", href: "/settings/users" },
      { label: "Integraciones", href: "/settings/integrations" },
    ],
  },
  { label: "Ayuda", href: "/help" },
  { label: "Enviar Feedback", href: "/feedback" },
  { label: "Protegido", href: "/protected" },
  { label: "Otro Item", href: "/another" },
  { label: "Y Otro Más", href: "/yet-another" },
];

// --- SubMenu Component ---
const SubMenu: FC<{ item: MenuItem; onClose: () => void }> = ({ item, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <li className="mb-2">
      <button
        onClick={handleToggle}
        className="w-full flex justify-between items-center p-2 rounded text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      >
        <span>{item.label}</span>
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
                className="block p-2 rounded text-gray-600 hover:bg-gray-100 hover:text-gray-800"
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

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
      onClick={onClose}
    >
      <div
        className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ transform: isOpen ? "translateX(0)" : "translateX(-100%)" }}
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-800">Menú</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <IoClose size={24} />
          </button>
        </div>

        {/* Menu List (Scrollable) */}
        <div className="flex-grow overflow-y-auto">
          <ul className="p-4">
            {menuItems.map((item, index) =>
              item.children ? (
                <SubMenu key={index} item={item} onClose={onClose} />
              ) : (
                <li key={index} className="mb-2">
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="block p-2 rounded text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    {item.label}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Footer (Logout) */}
        <div className="p-4 border-t flex-shrink-0">
          <button
            onClick={() => signOut()}
            className="w-full flex items-center justify-center p-2 rounded text-red-500 hover:bg-red-50"
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
