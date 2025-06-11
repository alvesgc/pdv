import React, { useState } from "react";
import Input from "../Input";
import { useProducts } from "../../context/ProductContext";
import { supabase } from "../../lib/supabase";

export default function ProductForm() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCode, setProductCode] = useState("");
  const [barcode, setBarcode] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);
  const [imageFile, setImageFile] = useState(null);
  const { addProduct } = useProducts();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (productName.trim() === "" || parseFloat(productPrice) <= 0) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }
    let imageUrl = null;

    if (imageFile) {
      const filePath = `products/${Date.now()}-${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(filePath, imageFile);

      if (uploadError) {
        console.error("Erro no upload da imagem:", uploadError.message);
        alert("Erro ao enviar imagem");
        return;
      }

      const { data } = supabase.storage.from("products").getPublicUrl(filePath);

      imageUrl = data.publicUrl;
    }

    const newProduct = {
      code: productCode,
      name: productName,
      barcode: barcode || productCode,
      quantity: parseInt(productQuantity),
      price: parseFloat(productPrice),
      active: true,
      imageUrl,
    };

    try {
      await addProduct(newProduct);
      alert("Produto adicionado com sucesso!");
      setProductName("");
      setProductPrice("");
      setProductCode("");
      setBarcode("");
      setProductQuantity(1);
      setImageFile(null);
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
      {/* Código do Produto */}

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
      </div>

      {/* Código de barras do Produto */}

      <div className="mb-4">
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

      {/* Nome do Produto */}

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

      {/* Quantidade do Produto */}

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

      {/* Preço do Produto */}

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

      {/* Imagem do Produto */}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Imagem do Produto:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
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
