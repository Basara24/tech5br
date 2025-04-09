import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Button } from "../components/ui/button";

interface DecodedToken {
  id: number;
  type: string;
  exp: number;
}

const SignaturePage: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [plan, setPlan] = useState<"mensal" | "anual">("mensal");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado para assinar.");
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setUserId(decoded.id);
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      alert("Sessão inválida. Faça login novamente.");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubscribe = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // 1. Criar assinatura
      await axios.post(
        `${import.meta.env.VITE_API_URL}/signature`,
        { user_id: userId, plan },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 2. Promover usuário
      await axios.post(
        `${import.meta.env.VITE_API_URL}/users/${userId}/subscribe`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Assinatura realizada com sucesso! Você agora é um organizador.");
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao assinar:", error);
      alert("Erro ao assinar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          La Vamos Nós 🚀
        </h1>
        <p className="text-gray-600 mb-6">
          Assine um plano e torne-se <strong>organizador</strong> da plataforma.
        </p>

        <div className="mb-6 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Escolha seu plano:
          </label>
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value as "mensal" | "anual")}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="mensal">Mensal - R$ 19,90</option>
            <option value="anual">Anual - R$ 199,90</option>
          </select>
        </div>

        <Button
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl"
        >
          {loading ? "Processando..." : "Assinar agora"}
        </Button>
      </div>
    </div>
  );
};

export default SignaturePage;
