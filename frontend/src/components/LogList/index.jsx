import React, { useEffect, useState } from "react";

export default function LogList() {
  const [Log, setLogs] = useState([]);

  useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem("logs")) || [];
    setLogs(dadosSalvos);
  }, []);

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              id
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              ação
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Alteração
            </th>
            <th className="px-4 py-2 text-end text-sm font-semibold text-gray-700">
              data
            </th>
            <th className="px-4 py-2 text-end text-sm font-semibold text-gray-700">
              usuário
            </th>
          </tr>
        </thead>
        <tbody>
          {Log.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center px-4 py-6 text-gray-500">
                Nenhum Log registrado.
              </td>
            </tr>
          ) : (
            Log.map((l) => (
              <tr key={l.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-800">{l.id}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{l.acao}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{l.alteracao}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{l.dataHora}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{l.usuarioId}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
