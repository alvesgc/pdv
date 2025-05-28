import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { Link } from "react-router-dom";
import { list } from "postcss";

export default function Products() {
  const { products, addProduct, removeProduct } = useProducts();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productName.trim() === "" || productPrice <= 0) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }
    const newProduct = {
      name: productName,
      price: parseFloat(productPrice),
    };
    addProduct(newProduct);
    setProductName("");
    setProductPrice("");
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Cadastro de Produtos
        </h1>
        {/* Formulário de Cadastro */}
        <form
          onSubmit={handleSubmit}
          className="mb-8 p-4 border border-gray-200 rounded-md"
        >
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-gray-700 tex-sm font-bold mb-2"
            >
              Nome do Produto:
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
          >
            Adicionar Produto
          </button>
        </form>
        {/* Lista de Produtos Cadastrados*/}
        <h2 className="text 2xl font-bold text-gray-900 mb-4">
          Produtos Cadastrados
        </h2>
        {products.length === 0 ? (
          <p className="text-center texte-gray-500">
            Nenhum produto Cadastrado
          </p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {products.map((p) => (
              <li key={p.id} className="py-3 flex justify-between itens-center">
                <span className="text-lg text-gray-700">
                  {p.name} - R$ {p.price.toFixed(2)}
                </span>
                <button
                  onClick={() => removeProduct(p.id)}
                  className="bg-red-500 hover:bg-red-700 text-white text-sm py-1 px-3 rounded focus:outline-none focus: shadow-outline"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}
        {/* Link para a Home*/}
        <div className="mt-8 text-center">
          <Link to="/" className="text-blue-500 hover:underline">Voltar para a Tela de Vendas</Link>
        </div>
      </div>
    </div>
  );
}
