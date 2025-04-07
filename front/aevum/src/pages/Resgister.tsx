/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    password: "",
    confirmPassword: "",
  });

  const [erro, setErro] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validarCPF = (cpf: string) => {
    const regex = /^\d{11}$/;
    return regex.test(cpf);
  };

  const senhaForte = (senha: string) => senha.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    const { name, email, cpf, password, confirmPassword } = formData;

    if (!name || !email || !cpf || !password || !confirmPassword) {
      return setErro("Preencha todos os campos.");
    }

    if (!validarEmail(email)) return setErro("E-mail inválido.");
    if (!validarCPF(cpf)) return setErro("CPF inválido. Use apenas números.");
    if (!senhaForte(password))
      return setErro("A senha deve ter pelo menos 6 caracteres.");
    if (password !== confirmPassword)
      return setErro("As senhas não coincidem.");

    try {
      await axios.post("http://localhost:3000/users", {
        name,
        email,
        cpf,
        password,
      });

      navigate("/login");
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setErro(err.response?.data?.error || "Erro ao cadastrar.");
      } else {
        setErro("Erro inesperado.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Cadastro</h2>

        <input
          type="text"
          name="name"
          placeholder="Nome"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="cpf"
          placeholder="CPF (apenas números)"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar Senha"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {erro && <p className="text-red-500 text-sm">{erro}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
