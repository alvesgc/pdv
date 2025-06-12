import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDaysIcon, UserIcon } from "@heroicons/react/24/outline";
import LogList from "../components/LogList";

export default function Log() {
  const [page, setPage] = useState("porUsuario");

  const menuClasses = (active) =>
    `flex items-center gap-1 px-4 py-2 border-b-2 cursor-pointer transition ${
      active
        ? "border-blue-500 text-blue-600"
        : "border-transparent text-gray-600 hover:text-blue-500"
    }`;

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Logs
        </h1>

        {/* Menu de abas */}
        <div className="flex border-b mb-6 justify-center gap-6">
          <div className={menuClasses(page === "porUsuario")} onClick={() => setPage("porUsuario")}>
            <UserIcon className="w-5 h-5" />
            <span>Por usuário</span>
          </div>
          <div className={menuClasses(page === "porData")} onClick={() => setPage("porData")}>
            <CalendarDaysIcon className="w-5 h-5" />
            <span>Por Data</span>
          </div>
        </div>

        {/* Conteúdo conforme aba selecionada */}
        {page === "porUsuario" && (
            <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Eventos Registrados:
            </h2>
            <LogList />
          </>
        )}
        {page === "porData" && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Eventos Registrados:
            </h2>
            <LogList />
          </>
        )}

        <div className="mt-8 text-center">
          <Link to="/" className="text-blue-500 hover:underline">
            Voltar para a Tela Principal
          </Link>
        </div>
      </div>
    </div>
  );
}
