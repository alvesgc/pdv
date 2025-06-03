import { useState } from "react";
import { useCart } from "../context/CartContext";
import { mockFetchProducts } from "../lib/mockFetchProducts";

import ProductSuggestions from "../components/ProductSuggestions";
import SelectedProduct from "../components/SelectedProduct/";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import ActionButton from "../components/ActionButton";
import Input from "../components/Input";


export default function Home() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const itemCount = cart.reduce((sum, p) => sum + p.quantity, 0);
  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const itemPrice = (selectedProduct?.price ?? 0) * quantity;
  const discount = 0;
  
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

  const handleAddToCart = () => {
    if (!selectedProduct || quantity < 1) return;
    addToCart({ ...selectedProduct, quantity });
    setSelectedProduct(null);
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 h-[90vh]">
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Venda
          </h1>

          <Input
            type="text"
            placeholder="Pesquisar produto por código ou nome"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full border border-gray-300 rounded px-4 py-2 mb-2"
          />

          <ProductSuggestions
            suggestions={suggestions}
            onSelect={(p) => {
              setSelectedProduct(p);
              setQuantity(1);
              setSearchTerm("");
              setSuggestions([]);
            }}
          />

          <SelectedProduct
            product={selectedProduct}
            quantity={quantity}
            onQuantityChange={setQuantity}
            onAdd={handleAddToCart}
            onCancel={() => setSelectedProduct(null)}
          />

          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Itens selecionados</h2>
            <div className="space-y-2 max-h-96 overflow-auto">
              {cart.length === 0 ? (
                <p className="text-gray-500">Nenhum item adicionado ainda.</p>
              ) : (
                cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={removeFromCart}
                  />
                ))
              )}
            </div>
          </div>

          <CartSummary itemCount={itemCount} total={total} itemPrice={itemPrice} discount={discount}/>
        </div>

        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between h-full">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Resumo da Venda
          </h2>
          <div className="flex flex-end justify-between items-center">
            <ActionButton
              text="Finalizar Venda"
              onClick={clearCart}
              disabled={cart.length === 0}
              color="green"
            />
            <ActionButton
              text="Cancelar Venda"
              onClick={clearCart}
              disabled={cart.length === 0}
              color="red"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
