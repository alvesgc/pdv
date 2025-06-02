export default function CartItem({ item, onRemove }) {
  return (
    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md shadow-sm">
      <div>
        <p className="font-semibold">
          {item.name} x {item.quantity}
        </p>
        <p className="text-green-600 font-bold">
          R$ {(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="text-red-500 hover:text-red-700 font-bold"
      >
        Remover
      </button>
    </div>
  );
}
