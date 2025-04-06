import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";

const Pokedex = () => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState();

  const searchPokemon = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${inputText}`
      );
      setPokemon(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    } finally {
      setLoading(false);
    }

    if (loading) {
      return <div>Loading...</div>;
    }
  };
  return (
    <div>
      <input
        placeholder="Digite o nome do pokemon"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={searchPokemon}>Buscar</button>
      {loading ? <div>Loading...</div> : null}
      <p>Nome: {pokemon?.name}</p>
      <p>peso: {pokemon?.weight}</p>
      <Link to={`/pokedex/${pokemon?.name}`}>Ver detalhes</Link>
      <img src={pokemon?.sprites?.front_default} />
    </div>
  );
};

export default Pokedex;
