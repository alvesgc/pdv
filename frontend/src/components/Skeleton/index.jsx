const TableSkeleton = () => {
  const fakeRows = Array.from({ length: 5 });

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Código</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nome</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Valor</th>
            <th className="px-4 py-2 text-end text-sm font-semibold text-gray-700">Ativo</th>
          </tr>
        </thead>
        <tbody>
          {fakeRows.map((_, index) => (
            <tr key={index} className="animate-pulse border-b">
              <td className="px-4 py-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              </td>
              <td className="px-4 py-2 text-end">
                <div className="h-4 bg-gray-300 rounded w-1/4 ml-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
