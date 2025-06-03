import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import { PlusIcon, ListBulletIcon } from "@heroicons/react/24/outline";

export default function Products() {
  const [page, setPage] = useState("cadastrar");

  const menuClasses = (active) =>
    `flex items-center gap-1 px-4 py-2 border-b-2 cursor-pointer transition ${
      active
        ? "border-blue-500 text-blue-600"
        : "border-transparent text-gray-600 hover:text-blue-500"
    }`;

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Produtos
        </h1>

        {/* Menu de abas */}
        <div className="flex border-b mb-6 justify-center gap-6">
          <div className={menuClasses(page === "cadastrar")} onClick={() => setPage("cadastrar")}>
            <PlusIcon className="w-5 h-5" />
            <span>Cadastrar produto</span>
          </div>
          <div className={menuClasses(page === "listar")} onClick={() => setPage("listar")}>
            <ListBulletIcon className="w-5 h-5" />
            <span>Listar produtos</span>
          </div>
        </div>

        {/* Conteúdo conforme aba selecionada */}
        {page === "cadastrar" && <ProductForm />}
        {page === "listar" && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Produtos Cadastrados:
            </h2>
            <ProductList />
          </>
        )}

        <div className="mt-8 text-center">
          <Link to="/" className="text-blue-500 hover:underline">
            Voltar para a Tela de Vendas
          </Link>
        </div>
      </div>
    </div>
  );
}
