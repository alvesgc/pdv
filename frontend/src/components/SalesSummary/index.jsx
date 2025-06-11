import ActionButton from "../ActionButton";
import { useState } from "react";

export default function SalesSummary({ cart, onClearCart, selectedProduct }) {
  const [showModal, setShowModal] = useState(false);

  const handleFinalize = () => {
    setShowModal(true);
  };

  const confirmFinalize = () => {
    onClearCart();
    setShowModal(false);
  };

  return (
    <>
      <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between h-full">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Resumo da Venda
        </h2>

        {/* Imagem do produto */}
        <ProductImage product={selectedProduct} />

        <div className="flex flex-end justify-between items-center">
          <ActionButton
            text="Finalizar Venda"
            onClick={handleFinalize}
            disabled={cart.length === 0}
            color="green"
          />
          <ActionButton
            text="Cancelar Venda"
            onClick={onClearCart}
            disabled={cart.length === 0}
            color="red"
          />
        </div>
      </div>

      {/* Modal de finalização*/}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirmar Venda</h2>
            <p>Tem certeza que deseja finalizar essa venda?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
              <button onClick={confirmFinalize} className="px-4 py-2 bg-green-500 text-white rounded">Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ProductImage({ product }) {
  const image = product?.imageUrl || "/src/public/assets/sem-imagem.png";

  return (
    <div className="relative h-48 w-full flex items-center justify-center rounded mb-4 overflow-hidden">
      <img
        src={image}
        alt={product?.name || "Produto sem imagem"}
        className="object-contain max-h-full max-w-full"
      />
    </div>
  );
}
