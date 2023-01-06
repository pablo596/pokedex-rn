import {useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {mapPokemonList} from '../helpers';
import {
  PokemonPaginatedResponse,
  SimplePokemon,
} from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );
  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon/?limit=40');

  const loadPokemons = async () => {
    setIsLoading(true);
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      nextPageUrl.current,
    );
    nextPageUrl.current = resp.data.next;

    // mapPokemonList(resp.data.results);
    setSimplePokemonList([
      ...simplePokemonList,
      ...mapPokemonList(resp.data.results),
    ]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    simplePokemonList,
    loadPokemons,
  };
};
