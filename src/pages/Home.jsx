import { useCart } from '../context/CartContext';

const mockProducts = [
  { id: 1, name: "Coca-Cola", price: 5.0 },
  { id: 2, name: "Pastel", price: 7.5 },
  { id: 3, name: "Suco", price: 6.0 },
];

export default function Home() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <div>
      <h1>Tela de Vendas</h1>

      <h2>Produtos:</h2>
      {mockProducts.map((p) => (
        <div key={p.id}>
          {p.name} - R$ {p.price.toFixed(2)} 
          <button onClick={() => addToCart(p)}>Adicionar</button>
        </div>
      ))}

      <h2>Carrinho:</h2>
      {cart.map((p, i) => (
        <div key={i}>
          {p.name} - R$ {p.price.toFixed(2)} 
          <button onClick={() => removeFromCart(p.id)}>Remover</button>
        </div>
      ))}

      <h3>Total: R$ {total.toFixed(2)}</h3>
      <button onClick={clearCart}>Finalizar Venda</button>
    </div>
  );
}
