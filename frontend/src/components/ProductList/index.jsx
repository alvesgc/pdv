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
  const [nomeEditado, setNomeEditado] = useState("");
  const [precoEditado, setPrecoEditado] = useState("");
  const [barcodeEditado, setBarcodeEditado] = useState("");
  const [quantidadeEditada, setQuantidadeEditada] = useState("");
  const [ativoEditado, setAtivoEditado] = useState(true);

  useEffect(() => {
    if (produtoSelecionado) {
      setNomeEditado(produtoSelecionado.name);
      setPrecoEditado(produtoSelecionado.price);
      setBarcodeEditado(produtoSelecionado.barcode);
      setQuantidadeEditada(produtoSelecionado.quantity);
      setAtivoEditado(produtoSelecionado.active);
    }
  }, [produtoSelecionado]);

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

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Código do Produto:
                </label>
                <input
                  type="text"
                  value={produtoSelecionado.code}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Nome:
                </label>
                <input
                  type="text"
                  value={nomeEditado}
                  onChange={(e) => setNomeEditado(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Código de Barras:
                </label>
                <input
                  type="text"
                  value={barcodeEditado}
                  onChange={(e) =>
                    setBarcodeEditado(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Quantidade:
                </label>
                <input
                  type="number"
                  min={0}
                  value={quantidadeEditada}
                  onChange={(e) => setQuantidadeEditada(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Preço:
                </label>
                <input
                  type="text"
                  value={precoEditado}
                  onChange={(e) =>
                    setPrecoEditado(
                      e.target.value.replace(",", ".").replace(/[^0-9.]/g, "")
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Produto Ativo?
                </label>
                <div className="flex gap-4 items-center">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={ativoEditado === true}
                      onChange={() => setAtivoEditado(true)}
                      className="mr-2"
                    />
                    Sim
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={ativoEditado === false}
                      onChange={() => setAtivoEditado(false)}
                      className="mr-2"
                    />
                    Não
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                onClick={() => setMostrarModal(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={async () => {
                  try {
                    if (parseInt(quantidadeEditada) < 0) {
                      alert("A quantidade não pode ser menor que zero.");
                      return;
                    }
                    if (
                      !nomeEditado.trim() ||
                      !barcodeEditado.trim() ||
                      quantidadeEditada === "" ||
                      precoEditado === ""
                    ) {
                      alert("Por favor preencher todos os campos.");
                      return;
                    }

                    await api.put(`/products/${produtoSelecionado.id}`, {
                      name: nomeEditado,
                      barcode: barcodeEditado,
                      quantity: parseInt(quantidadeEditada),
                      price: parseFloat(precoEditado),
                      active: ativoEditado,
                    });

                    alert("Produto atualizado com sucesso!");
                    setMostrarModal(false);
                  } catch (err) {
                    console.error("Erro ao atualizar o produto:", err);
                    console.log("Resposta do erro:", err.response);
                    alert("Erro ao atualizar o produto.");
                  }
                }}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
