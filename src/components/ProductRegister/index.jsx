import React, { useState } from "react";

export default function ProductRegister() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!code || !name || !price) {
      alert("Preencha todos os campos.");
      return;
    }
    onAdd({
      id: Date.now(),
      code: code,
      name: name,
      price: parseFloat(price),
    });
    setCode("");
    setName("");
    setPrice("");
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md bg-white">
      <div className="md-4">
        <label className="block font-semibold">Codigo do Produto:</label>
        <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full p-2 border px-3 py-2 rounded"
        placeholder="Digite o código do produto"
        />
      </div>
       <div className="mb-4">
        <label className="block font-semibold">Nome do produto:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Digite o nome do produto"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Preço:</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Digite o preço do produto"
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
      >
        Adicionar Produto
      </button>
    </form>
  );
}