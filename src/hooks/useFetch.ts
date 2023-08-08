import { useState, useEffect } from "react"; 
import { PokemonTemplate, DataResponse, SinglePokemon } from "../types";

export function useGetAllPokemons() {
  const [pokemons, setPokemons] = useState<PokemonTemplate[]>([]);

  useEffect(() => {
    const fetchData = async() => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      const data = await response.json() as DataResponse;
      const allPokemons = data.results.map((pokemon, index) => ({
          ...pokemon,
          id: index + 1
      }));
      setPokemons(allPokemons);
      sessionStorage.setItem("pokemons", JSON.stringify(allPokemons));
    }

    const pokemonStorage = sessionStorage.getItem("pokemons");
    if (pokemonStorage) {
      setPokemons(JSON.parse(pokemonStorage));
    } else{
      fetchData();
    }
  }, [])

  return { pokemons }
}

export function useGetOnePokemon(selection: string | undefined) {
  const [pokemon, setPokemon] = useState<SinglePokemon | null>(null);

  useEffect(() => {
    const fetchData = async() => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selection}`);
      const data = await response.json();
      setPokemon(data);
    }

    fetchData();
  }, [selection])

  return { pokemon }
}