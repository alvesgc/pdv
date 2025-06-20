import React, { useState, useEffect } from "react";
import Input from "../../Input";
import { supabase } from "../../../lib/supabase";

export default function PaymentTypeForm() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [allowChange, setAllowChange] = useState(false);
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   async function fetchUser() {
  //     const {
  //       data: { user },
  //       error,
  //     } = await supabase.auth.getUser();
  //     if (error) {
  //       console.error("Erro ao pegar usuário:", error);
  //     } else {
  //       setUser(user);
  //     }
  //   }
  //   fetchUser();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!user) {
    //   alert("Usuário não autenticado");
    //   return;
    // }

    if (name.trim() === "" || code.trim() === "") {
      alert("Por favor, preencha os campos obrigatórios.");
      return;
    }

    setLoading(true);

    const newPaymentType = {
      name,
      code: parseInt(code, 10),
      description: description.trim() || null,
      allowChange,
      active,
      //clientId: user.id,
    };

    const { error } = await supabase
      .from("PaymentType")
      .insert([newPaymentType]);

    setLoading(false);

    if (error) {
      alert(`Erro ao cadastrar tipo de pagamento: ${error.message}`);
    } else {
      alert("Tipo de pagamento cadastrado com sucesso!");
      setName("");
      setCode("");
      setDescription("");
      setAllowChange(false);
      setActive(true);
    }
  };

  // if (user === null) return <p>Carregando usuário...</p>;

  return (
    <div className="flex flex-col md:flex-row md:justify-between">
      <form
        onSubmit={handleSubmit}
        className="mb-4 md:mb-8 p-4 border border-gray-200 rounded-md w-full md:mr-4 md:flex-grow"
      >
        {/* Código + Nome */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Código:
            </label>
            <Input
              type="number"
              value={code}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, "");
                setCode(val);
              }}
              placeholder="Digite o código do tipo de pagamento"
              required
              min="1"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nome:
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome do tipo de pagamento"
              required
            />
          </div>
        </div>

        {/* Descrição */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Descrição:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição opcional"
            className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={3}
          />
        </div>

        {/* Permitir alteração + Ativo */}
        <div className="mb-6 flex items-center gap-6">
          <label className="flex items-center gap-2 text-gray-700 text-sm font-semibold">
            <input
              type="checkbox"
              checked={allowChange}
              onChange={(e) => setAllowChange(e.target.checked)}
              className="w-5 h-5"
            />
            Permite alteração após uso
          </label>

          <label className="flex items-center gap-2 text-gray-700 text-sm font-semibold">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="w-5 h-5"
            />
            Ativo
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Salvando..." : "Cadastrar Tipo de Pagamento"}
        </button>
      </form>
    </div>
  );
}
