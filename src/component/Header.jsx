import React, { useState } from 'react'
import { Link } from 'react-router-dom';

{/* <Link to="/">Vendas</Link> 
                <Link to="/products">Produtos</Link> */}
const Header = () => {
    const [openMenu, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!openMenu)
    }

    return (
        <header className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold">PDV WEB</h1>
            {/* Botão do menu Hamburguer */}
            <button className="md:hidden" onClick={toggleMenu} aria-label="Abrir Menu">
                <svg className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <nav className={`${openMenu ? 'block' : 'hidden'} absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 md:flex md:space-x-6 px-4 py-2 md:p-0 z-50`}>
                <Link to="/">Vendas</Link>
                <Link to="/products">Produtos</Link>
            </nav>
        </header>
    )
}

export default Header;