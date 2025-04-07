import { useState } from "react";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const validarEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarEmail(email)) {
      setErro("E-mail inválido");
      return;
    }

    try {
      const response = await api.post("/auth/login", { email, senha });
      login(response.data.token);
      navigate("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErro(err.response?.data?.error || "Erro ao fazer login");
      } else {
        setErro("Erro inesperado ao fazer login");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col w-80 gap-4">
        <h1 className="text-2xl font-bold">Login</h1>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        {erro && <span className="text-red-500">{erro}</span>}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
