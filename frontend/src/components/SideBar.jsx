import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  XMarkIcon,
  ShoppingCartIcon,
  ClipboardDocumentListIcon,
  CircleStackIcon,
} from "@heroicons/react/16/solid";

const SideBar = ({ visible, onClose }) => {
  const sidebarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible, onClose]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-[60px] left-0 h-full bg-gray-900 text-white w-64 p-4 transition-transform duration-300 z-50 ${
        visible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-3 border-b border-gray-600">
        <a href="/" className="flex items-center">
          <img
            src="https://avatars.githubusercontent.com/u/140769066?s=96&v=4"
            className="h-6 me-3 sm:h-7"
            alt="NeoPDV Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            NeoPDV
          </span>
        </a>
        <button onClick={onClose} className="text-white text-xl">
          <XMarkIcon className="size-6" />
        </button>
      </div>
      <ul className="space-y-2">
        <li>
          <Link to="/" onClick={onClose} className="block hover:bg-gray-700 p-2 rounded">
            <div className="flex items-center gap-2">
              <ShoppingCartIcon className="size-5" />
              Vendas
            </div>
          </Link>
        </li>
        <li>
          <Link to="/products" onClick={onClose} className="block hover:bg-gray-700 p-2 rounded">
            <div className="flex items-center gap-2">
              <CircleStackIcon className="size-5" />
              Produtos
            </div>
          </Link>
        </li>
        <li>
          <Link to="/stock" onClick={onClose} className="block hover:bg-gray-700 p-2 rounded">
            <div className="flex items-center gap-2">
              <CircleStackIcon className="size-5" />
              Estoque
            </div>
          </Link>
        </li>
        <li>
          <Link to="/Log" onClick={onClose} className="block hover:bg-gray-700 p-2 rounded">
            <div className="flex items-center gap-2">
              <ClipboardDocumentListIcon className="size-5" />
              Log
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
