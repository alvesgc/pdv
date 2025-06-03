import React, { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(dadosSalvos);
  }, []);

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Código</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nome</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Valor</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center px-4 py-6 text-gray-500">
                Nenhum produto cadastrado.
              </td>
            </tr>
          ) : (
            products.map((products, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-800">{products.codigo}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{products.nome}</td>
                <td className="px-4 py-2 text-sm text-gray-800">R$ {Number(products.valor).toFixed(2)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
