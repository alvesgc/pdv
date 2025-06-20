import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase"; // seu client Supabase configurado
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth(); // função que armazena token/session no contexto
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      // Login via Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (!data.session) {
        setError("Erro ao criar sessão. Tente novamente.");
        return;
      }

      // Salva o token/session no contexto global
      login(data.session.access_token);

      // Redireciona para home/dashboard
      navigate("/");
    } catch (err) {
      setError("Erro inesperado. Tente novamente.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          NeoPDV
        </h1>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Entre com seu usuário
        </h2>

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="exemplo@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-700">
              Senha:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Não possui um usuário? Entre em contato com o responsável pelos
            usuários em sua empresa.{" "}
            <a
              href="/register"
              className="text-black font-bold hover:underline"
            >
              Saiba mais
            </a>
          </p>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
        <p>© 2025 NeoPDV. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default Login;
