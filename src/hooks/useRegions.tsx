import {useState, useEffect} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {RegionsResponse, Result} from '../interfaces/regionsInterfaces';

export const useRegions = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [regions, setRegions] = useState<Result[]>();

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const resp = await pokemonApi.get<RegionsResponse>(
          `https://pokeapi.co/api/v2/region/`,
        );

        setIsLoading(false);
        setRegions(resp.data.results);
        // setPokemon(resp.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadPokemon();
  }, []);
  return {
    isLoading,
    regions,
  };
};
