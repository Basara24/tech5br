/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/SignaturePage.tsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignaturePage = () => {
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId"); // ou do contexto
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      // 1. Criar assinatura
      await axios.post(
        "http://localhost:3000/signature",
        {
          user_id: userId,
          plan: "mensal", // ou "anual"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 2. Atualizar usuário para organizador
      await axios.put(
        `http://localhost:3000/users/subscribe/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Assinatura realizada com sucesso! Agora você é um organizador.");
      navigate("/"); // redireciona para Home, por exemplo
    } catch (error: any) {
      console.error("Erro ao assinar:", error.response?.data || error);
      alert(
        "Erro ao assinar. Verifique se você já possui uma assinatura ativa."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">
        Assine para se tornar um Organizador
      </h1>
      <p className="mb-6 text-lg">
        Com a assinatura, você poderá criar e gerenciar eventos.
      </p>
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        onClick={handleSubscribe}
        disabled={loading}
      >
        {loading ? "Processando..." : "Assinar Plano Mensal"}
      </button>
    </div>
  );
};
