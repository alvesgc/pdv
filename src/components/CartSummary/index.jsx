export default function CartSummary({ itemCount, total }) {
  return (
    <div className="flex justify-between items-center gap-5 pt-4 border-t-2 border-gray-200">
      <p className="text-2xl font-bold text-right text-gray-900 mb-4">
        Itens: <span className="text-blue-600">{itemCount}</span>
      </p>
      <h3 className="text-3xl font-bold text-right text-gray-900 mb-4">
        Total: <span className="text-blue-600">R$ {total.toFixed(2)}</span>
      </h3>
    </div>
  );
}
