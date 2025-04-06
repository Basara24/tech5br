/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

type Pokemon = {
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  weight: number;
  types: { type: { name: string } }[];
};

const PokemonInfo = () => {
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon>();
  const { name } = useParams();

  const getPokemonInfo = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<Pokemon>(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      setPokemon(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPokemonInfo();
  }, []);

  if (loading) {
    return <div>Carregando Pokémon</div>;
  }

  return (
    <div>
      <h1>Pokemon Info - {name}</h1>
      <p>Nome: {pokemon?.name}</p>
      <p>Peso: {pokemon?.weight}kg</p>
      {pokemon?.types.map((arrayType) => {
        return <span>{arrayType?.type?.name} </span>;
      })}
    </div>
  );
};

export default PokemonInfo;
