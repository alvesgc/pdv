import React from "react";
import { Link } from "react-router-dom";
import {
  XMarkIcon,
  ShoppingCartIcon,
  ClipboardDocumentListIcon,
  CircleStackIcon,
} from "@heroicons/react/16/solid";

const SideBar = ({ visible, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 p-4 transition-transform duration-300 z-40 ${
        visible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-3 mt-11 border-b border-gray-600">
        <h2 className="text-lg font-bold">Módulos</h2>
        <button onClick={onClose} className="text-white text-xl">
          <XMarkIcon className="size-6" />
        </button>
      </div>
      <ul className="space-y-2">
        <li>
          <Link
            to="/"
            onClick={onClose}
            className="block hover:bg-gray-700 p-2 rounded"
          >
            <div className="flex items-center gap-2">
              <ShoppingCartIcon className="size-5" />
              Vendas
            </div>
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            onClick={onClose}
            className="block hover:bg-gray-700 p-2 rounded"
          >
            <div className="flex items-center gap-2">
              <CircleStackIcon className="size-5" />
              Produtos</div>
          </Link>
        </li>
        <li>
          <Link
            to="/stock"
            onClick={onClose}
            className="block hover:bg-gray-700 p-2 rounded"
          >
            <div className="flex items-center gap-2">
              <CircleStackIcon className="size-5" />
              Estoque
            </div>
          </Link>
        </li>
        <li>
          <Link
            to="/Log"
            onClick={onClose}
            className="block hover:bg-gray-700 p-2 rounded"
          >
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
