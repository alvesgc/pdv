import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import { Link } from "react-router-dom";
import Input from "../components/Input";
// const mockProducts = [
//   { id: 1, name: "Coca-Cola", price: 5.0 },
//   { id: 2, name: "Pastel", price: 7.5 },
//   { id: 3, name: "Suco", price: 6.0 },
//   { id: 4, name: "Salgadinho", price: 4.0 },
//   { id: 5, name: "Chocolate", price: 3.5 },
//   { id: 6, name: "Água Mineral", price: 2.5 },
//   { id: 7, name: "Bolo de Pote", price: 8.0 },
//   { id: 8, name: "Café", price: 3.0 },
// ];

export default function Home() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const { products } = useProducts();
  const total = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Seção de Produtos */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Catálogo de Produtos
          </h1>
          <Input placeholder="Pesquisar Produtos" value={""} />
          {products.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              Nenhum Produto Cadastrado ainda. Vá para a página de{" "}
              <Link to="/products" className="text-blue-500 hover:underline">
                Cadastro de Produtos
              </Link>{" "}
              para adicionar alguns
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="bg-gray-50 p-4 rounded-lg shadow flex flex-col items-center justify-between transition duration-200 ease-in-out hover:bg-gray-100 mt-6"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {p.name}
                  </h3>
                  <p clasName="text-xl font-bold text-green-600 my-2">
                    R$ {p.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => addToCart(p)}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                  >
                    Adicionar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Seção do Carrinho e Finalização */}
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-lg flex flex-col">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Carrinho de Compras
          </h2>
          <div className="flex-grow overflow-y-auto max-h-96 pr-2 custom-scrollbar">
            {" "}
            {/* Adicionado max-h e scrollbar */}
            {cart.length === 0 ? (
              <p className="text-center text-gray-500">
                Carrinho vazio. Adicione produtos!
              </p>
            ) : (
              cart.map((p, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-md mb-2 shadow-sm"
                >
                  <span className="text-gray-700">
                    {p.name} - R$ {p.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(p.id)}
                    className="text-red-500 hover:text-red-700 font-bold focus:outline-none"
                  >
                    Remover
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 pt-4 border-t-2 border-gray-200">
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
