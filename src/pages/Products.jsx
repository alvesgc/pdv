import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { Link } from "react-router-dom";
import Input from "../components/Input";

export default function Products() {
  const { products, addProduct, removeProduct } = useProducts();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCode, setProductCode] = useState("");
  const [mode, setMode] = useState("list");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productName.trim() === "" || productPrice <= 0) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }
    const newProduct = {
      name: productName,
      productCode: productCode,
      price: parseFloat(productPrice.replace(".", ",")),
    };
    addProduct(newProduct);
    setProductName("");
    setProductPrice("");
    setProductCode("");
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
              htmlFor="productCode"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Código do Produto:
            </label>
            <Input
              type="text"
              id="productCode"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
              placeholder="Digite o código do produto"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nome do produto:
            </label>
            <Input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Digite o nome do produto"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="productPrice"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Preço:
            </label>
            <Input
              type="number"
              id="productPrice"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              step="0.01"
              min="0.01"
              placeholder="Digite o preço do produto"
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
        {/* Lista de Produtos Cadastrados */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Produtos Cadastrados:
        </h2>
        {products.length === 0 ? (
          <p className="text-center text-gray-500">
            Nenhum produto cadastrado ainda.
          </p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {products.map((p) => (
              <li key={p.id} className="py-3 flex justify-between items-center">
                <span className="text-lg text-gray-700">
                  {p.productCode} - {p.name} R$ {p.price.toFixed(2)}
                </span>
                <button
                  onClick={() => removeProduct(p.id)}
                  className="bg-red-500 hover:bg-red-700 text-white text-sm py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Link para a Home, se estiver usando roteamento */}
        <div className="mt-8 text-center">
          <Link to="/" className="text-blue-500 hover:underline">
            Voltar para a Tela de Vendas
          </Link>
        </div>
      </div>
    </div>
  );
}
