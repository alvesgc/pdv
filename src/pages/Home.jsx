import { useState } from "react";
import { useCart } from "../context/CartContext";

const mockFetchProducts = (query) => {
  const allProducts = [
    { id: 1, name: "Coca-Cola", price: 5.0 },
    { id: 2, name: "Pastel", price: 7.5 },
    { id: 3, name: "Suco", price: 6.0 },
    { id: 4, name: "Salgadinho", price: 4.0 },
    { id: 5, name: "Chocolate", price: 3.5 },
    { id: 6, name: "Água Mineral", price: 2.5 },
    { id: 7, name: "Bolo de Pote", price: 8.0 },
    { id: 8, name: "Café", price: 3.0 },
  ];

  if (!query) return [];
  return allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      String(p.id) === query
  );
};

export default function Home() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length >= 2) {
      const results = mockFetchProducts(query);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setSuggestions([]);
    setSearchTerm("");
  };

  const handleAddToCart = () => {
    if (!selectedProduct || quantity < 1) return;
    addToCart({ ...selectedProduct, quantity: Number(quantity) });
    setSelectedProduct(null);
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 h-[90vh]">
        {/* Busca e adição de produtos */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Venda
          </h1>

          <input
            type="text"
            placeholder="Pesquisar produto por código ou nome"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full border border-gray-300 rounded px-4 py-2 mb-2"
          />

          {/* Lista de sugestões */}
          {suggestions.length > 0 && (
            <ul className="border border-gray-300 rounded max-h-48 overflow-auto mb-4">
              {suggestions.map((p) => (
                <li
                  key={p.id}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSelectProduct(p)}
                >
                  {p.name} - R$ {p.price.toFixed(2)}
                </li>
              ))}
            </ul>
          )}

          {/* Input para quantidade */}
          {selectedProduct && (
            <div className="mb-4 p-4 border border-gray-300 rounded">
              <h3 className="text-lg font-semibold mb-2">
                {selectedProduct.name} - R$ {selectedProduct.price.toFixed(2)}
              </h3>
              <label className="block mb-1 font-medium">Quantidade:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-20 border border-gray-300 rounded px-2 py-1"
              />
              <button
                onClick={handleAddToCart}
                className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Adicionar ao carrinho
              </button>
              <button
                onClick={() => setSelectedProduct(null)}
                className="ml-2 text-gray-600 hover:text-gray-900"
              >
                Cancelar
              </button>
            </div>
          )}

          {/* Carrinho */}
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Itens selecionados</h2>
            <div className="flex-grow overflow-y-auto max-h-22 pr-2 custom-scrollbar">
              {cart.length === 0 ? (
                <p className="text-gray-500">Nenhum item adicionado ainda.</p>
              ) : (
                <div className="space-y-2 max-h-96 overflow-auto">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded-md shadow-sm"
                    >
                      <div>
                        <p className="font-semibold">
                          {item.name} x {item.quantity}
                        </p>
                        <p className="text-green-600 font-bold">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Finalização da venda */}
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between h-full">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Resumo da Venda
          </h2>
          <div className="" />
          <div className="pt-4 border-t-2 border-gray-200">
            <h3 className="text-3xl font-bold text-right text-gray-900 mb-4">
              Total:{" "}
              <span className="text-blue-600">R$ {total.toFixed(2)}</span>
            </h3>
            <button
              onClick={clearCart}
              disabled={cart.length === 0}
              className={`w-full py-3 px-4 rounded-md text-white font-semibold transition duration-150 ease-in-out ${
                cart.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              }`}
            >
              Finalizar Venda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
