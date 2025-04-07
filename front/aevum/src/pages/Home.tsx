import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [userType, setUserType] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const type = localStorage.getItem("userType");
    setUserType(type);
  }, []);

  const handleCreateEvent = () => {
    navigate("/criar-evento"); // Rota que você vai criar depois
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Bem-vindo à Plataforma de Eventos
      </h1>

      {userType === "organizador" && (
        <button
          onClick={handleCreateEvent}
          className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition-colors"
        >
          Criar Evento
        </button>
      )}
    </div>
  );
}
