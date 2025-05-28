import React from "react";
import { Link } from "react-router-dom";

const SideBar = ({visible}) => {
    return (
        <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 p-4 transition-transform duration-300 z-40 ${visible ? 'translate-x-0' : '-translate-x-full'}`}>
            <h2 className="text-xl font-bold mb-4">Módulos</h2>
            <ul className="space-y-2">
                <li><Link to="/" className="block hover:bg-gray-700 p-2 rounded">Vendas</Link></li>
                <li><Link to="/products" className="block hover:bg-gray-700 p-2 rounded">Produtos</Link></li>
            </ul>
        </div>
    )
}

export default SideBar;