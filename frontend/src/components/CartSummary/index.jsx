import FormatterPrice from "../../utils/formatters";

export default function CartSummary({ itemCount, total, itemPrice, discount}) {
  return (
    <div className="flex justify-between items-center gap-5 pt-4 border-t-2 border-gray-200">
      <div className="flex flex-col items-center">
        <p className="text-lg font-bold text-gray-900">Itens</p>
        <span className="text-blue-600 text-xl">{itemCount}</span>
      </div>
      {/* Desconto */}
      <div className="flex flex-col items-center">
        <p className="text-lg font-bold text-gray-900">Desconto</p>
        <span className="text-blue-600 text-xl"> <FormatterPrice value={discount} /></span>
      </div>
      {/* Valor UN */}
      <div className="flex flex-col items-center">
        <p className="text-lg font-bold text-gray-900">Valor</p>
        <span className="text-blue-600 text-xl">
          <FormatterPrice value={itemPrice} />
        </span>
      </div>
      {/* Total  */}
      <div className="flex flex-col items-center">
        <p className="text-lg font-bold text-gray-900">Total</p>
        <span className="text-blue-600 text-xl">
          <FormatterPrice value={total} />
        </span>
      </div>
    </div>
  );
}
