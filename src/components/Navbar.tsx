"use client";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { IoHome } from "react-icons/io5";
import Drawer from "./Drawer";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md p-4 flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="text-gray-600 hover:text-gray-900"
          >
            <HiMenu size={28} />
          </button>
          <div className="ml-4 text-lg font-semibold text-gray-800">
            Pulse
          </div>
        </div>

        {/* Right Side */}
        <div>
          <a href="/dashboard" className="text-gray-600 hover:text-gray-900">
            <IoHome size={26} />
          </a>
        </div>
      </nav>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};

export default Navbar;
