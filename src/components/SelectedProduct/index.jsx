export default function SelectedProduct({
  product,
  quantity,
  onQuantityChange,
  onAdd,
  onCancel,
}) {
  if (!product) return null;

  return (
    <div className="mb-4 p-4 border border-gray-300 rounded">
      <h3 className="text-lg font-semibold mb-2">
        {product.name} - R$ {product.price.toFixed(2)}
      </h3>
      <label className="block mb-1 font-medium">Quantidade:</label>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => onQuantityChange(Number(e.target.value))}
        className="w-20 border border-gray-300 rounded px-2 py-1"
      />
      <button
        onClick={onAdd}
        className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Adicionar ao carrinho
      </button>
      <button
        onClick={onCancel}
        className="ml-2 text-gray-600 hover:text-gray-900"
      >
        Cancelar
      </button>
    </div>
  );
}
