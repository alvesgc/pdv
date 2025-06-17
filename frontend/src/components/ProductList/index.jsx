import React, { useEffect, useState } from "react";
import FormatterPrice from "./../../utils/formatters";
import api from "../../lib/api";
import TableSkeleton from "../Skeleton";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError("Não foi possível carregar os produtos.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  if (loading) {
    return <TableSkeleton />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  return (
    <div>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Código
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Nome
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Valor
              </th>
              <th className="px-4 py-2 text-end text-sm font-semibold text-gray-700">
                Ativo
              </th>
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
              products.map((p) => (
                <tr
                  key={p.id}
                  className={`border-b cursor-pointer transition hover:bg-blue-100 ${
                    produtoSelecionado?.id === p.id ? "bg-blue-300" : ""
                  }`}
                  onClick={() => setProdutoSelecionado(p)}
                >
                  <td className="px-4 py-2 text-sm text-gray-800">{p.code}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{p.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    <FormatterPrice value={p.price} />
                  </td>
                  <td className="px-4 py-2 text-end text-sm text-gray-800">
                    {p.active ? "Sim" : "Não"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        className={`mt-5 py-2 px-4 font-bold rounded focus:outline-none focus:shadow-outline ${
          produtoSelecionado
            ? "bg-green-500 hover:bg-green-700 text-white"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
        disabled={!produtoSelecionado}
        onClick={() => setMostrarModal(true)}
      >
        Alterar Produto
      </button>
      {mostrarModal && produtoSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Editar Produto</h2>
            <p><strong>ID:</strong> {produtoSelecionado.id}</p>
            <p><strong>Nome:</strong> {produtoSelecionado.name}</p>
            <p><strong>Preço:</strong> <FormatterPrice value={produtoSelecionado.price} /></p>

            <button
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={() => setMostrarModal(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
