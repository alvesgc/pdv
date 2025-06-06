import React, { useState } from "react";
import Input from "../Input";
import { useProducts } from "../../context/ProductContext";

export default function ProductForm() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCode, setProductCode] = useState("");
  const [barcode, setBarcode] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);

  const { addProduct } = useProducts(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (productName.trim() === "" || parseFloat(productPrice) <= 0) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    const newProduct = {
      code: productCode,
      name: productName,
      barcode: barcode || productCode,
      quantity: parseInt(productQuantity),
      price: parseFloat(productPrice),
      active: true,
    };

    try {
      await addProduct(newProduct); 
      alert("Produto adicionado com sucesso!");
      setProductName("");
      setProductPrice("");
      setProductCode("");
      setBarcode("");
      setProductQuantity(1);
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      alert("Erro ao adicionar produto. Tente novamente.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 p-4 border border-gray-200 rounded-md"
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Código do Produto:
        </label>
        <Input
          type="text"
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
          placeholder="Digite o código do produto"
          required
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Código de barras do Produto:
        </label>
        <Input
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Digite o código de barras do produto"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Nome do Produto:
        </label>
        <Input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Digite o nome do produto"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Quantidade:
        </label>
        <Input
          type="number"
          value={productQuantity}
          onChange={(e) => setProductQuantity(e.target.value)}
          min="1"
          placeholder="Digite a quantidade do produto"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Preço:
        </label>
        <Input
          type="number"
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
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Adicionar Produto
      </button>
    </form>
  );
}
