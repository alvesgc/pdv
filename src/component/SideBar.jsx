import React from "react";
import { Link } from "react-router-dom";

const SideBar = ({ visible, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 p-4 transition-transform duration-300 z-40 ${
        visible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-600">
        <h2 className="text-lg font-bold">Módulos</h2>
        <button onClick={onClose} className="text-white text-xl">
          X
        </button>
      </div>
      <ul className="space-y-2">
        <li>
          <Link to="/" onClick={onClose} className="block hover:bg-gray-700 p-2 rounded">
            Vendas
          </Link>
        </li>
        <li>
          <Link to="/products" onClick={onClose} className="block hover:bg-gray-700 p-2 rounded">
            Produtos
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
