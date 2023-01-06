import {useState, useEffect} from 'react';
import {PokemonFull} from '../interfaces/pokemonInterfaces';

import {pokemonApi} from '../api/pokemonApi';
export const usePokemon = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonFull>({} as PokemonFull);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const resp = await pokemonApi.get<PokemonFull>(
          `https://pokeapi.co/api/v2/pokemon/${id}`,
        );

        setIsLoading(false);

        setPokemon(resp.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadPokemon();
  }, [id]);

  return {
    isLoading,
    pokemon,
  };
};
