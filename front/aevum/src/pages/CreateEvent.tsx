/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    image: null as File | null,
  });

  const [erro, setErro] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setForm((prev) => ({ ...prev, image: file || null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    const token = localStorage.getItem("token");
    if (!token) return setErro("Usuário não autenticado.");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("date", form.date);
      formData.append("location", form.location);

      if (form.image) {
        formData.append("image", form.image); // nome do campo deve bater com o backend
      }

      const response = await axios.post(
        "http://localhost:3000/events",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Evento criado:", response.data);
      navigate("/home");
    } catch (err: any) {
      console.error(err);
      setErro("Erro ao criar evento.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Criar Evento</h2>

        <input
          type="text"
          name="name"
          placeholder="Nome do Evento"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Descrição"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Local"
          value={form.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />

        {erro && <p className="text-red-500 text-sm">{erro}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Criar Evento
        </button>
      </form>
    </div>
  );
}
