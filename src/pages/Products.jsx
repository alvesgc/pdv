import { useState, useEffect } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "" });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("produtos")) || [];
    setProducts(saved);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProd = { id: Date.now(), ...form, price: parseFloat(form.price) };
    const updated = [...products, newProd];
    setProducts(updated);
    localStorage.setItem("produtos", JSON.stringify(updated));
    setForm({ name: "", price: "" });
  };

  return (
    <div>
      <h1>Cadastro de Produtos</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nome" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Preço" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <button type="submit">Cadastrar</button>
      </form>

      <h2>Produtos cadastrados</h2>
      {products.map(p => (
        <div key={p.id}>
          {p.name} - R$ {p.price.toFixed(2)}
        </div>
      ))}
    </div>
  );
}
