/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [erro, setErro] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    const { email, senha } = formData;

    if (!email || !senha) {
      return setErro("Preencha todos os campos.");
    }

    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password: senha, // precisa ser exatamente "password" como o backend espera
      });

      const { token } = response.data;

      localStorage.setItem("token", token); // salva o token
      navigate("/"); // redireciona após login (pode mudar a rota se quiser)
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setErro(err.response?.data?.error || "Erro ao fazer login.");
      } else {
        setErro("Erro inesperado.");
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          onChange={handleChange}
        />
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
