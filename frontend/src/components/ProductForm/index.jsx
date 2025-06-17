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
  const [productActive, setProductActive] = useState(true);

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
      active: productActive,
      imageUrl: imageUrl,
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
      setProductActive(true);
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      alert("Erro ao adicionar produto. Tente novamente.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between">
      <form
        onSubmit={handleSubmit}
        className="mb-4 md:mb-8 p-4 border border-gray-200 rounded-md w-full md:mr-4 md:flex-grow"
      >
        {/* Código do Produto + Código de Barras */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Código do Produto:
            </label>
            <Input
              type="text"
              value={productCode}
              onChange={(e) => {
                const valorLimpo = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
                setProductCode(valorLimpo);
              }}
              placeholder="Digite o código do produto"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Código de barras:
            </label>
            <Input
              type="text"
              value={barcode}
              onChange={(e) => {
                const valorNumerico = e.target.value.replace(/[^0-9]/g, "");
                setBarcode(valorNumerico);
              }}
              placeholder="Digite o código de barras"
            />
          </div>
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

        {/* Produto Ativo */}
        <div className="mb-6 flex items-center gap-2">
          <input
            id="productActive"
            type="checkbox"
            checked={productActive}
            onChange={(e) => setProductActive(e.target.checked)}
            className="w-5 h-5"
          />
          <label
            htmlFor="productActive"
            className="text-gray-700 text-sm font-semibold"
          >
            Produto Ativo
          </label>
        </div>

        {/* Quantidade + Preço */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Quantidade:
            </label>
            <Input
              type="text"
              value={productQuantity}
              onChange={(e) => {
                const valorQuant = e.target.value.replace(/[^0-9]/g, "");
                setProductQuantity(valorQuant);
              }}
              min="1"
              placeholder="Digite a quantidade"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Preço:
            </label>
            <Input
              type="text"
              value={productPrice}
              onChange={(e) => {
                const valorPreco = e.target.value.replace(/[^0-9.,]/g, "");
                setProductPrice(valorPreco.replace(",", "."));
              }}
              step="0.01"
              min="0.01"
              placeholder="Digite o preço"
              required
            />
          </div>
        </div>

        {/* Imagem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
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
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Adicionar Produto
        </button>
      </form>
    </div>
  );
}
