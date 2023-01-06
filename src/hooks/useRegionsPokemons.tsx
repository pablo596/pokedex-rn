import {useState, useEffect} from 'react';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {pokemonApi} from '../api/pokemonApi';
import {
  PokedexFullResponse,
  RegionsFullResponse,
} from '../interfaces/regionsInterfaces';
import {mapPokemonList} from '../helpers';
import {getUrlStringPosition} from '../helpers/index';
export const useRegionsPokemons = (name: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );
  const [description, setDescription] = useState<string>('');

  const loadRegionData = async () => {
    try {
      const resp = await pokemonApi.get<RegionsFullResponse>(
        `https://pokeapi.co/api/v2/region/${name}`,
      );
      setIsLoading(false);

      loadRegionsPokemons(
        getUrlStringPosition(
          resp.data.pokedexes[resp.data.pokedexes.length - 1].url,
          '/',
          6,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };
  const loadRegionsPokemons = async (id: string) => {
    try {
      const resp = await pokemonApi.get<PokedexFullResponse>(
        `https://pokeapi.co/api/v2/pokedex/${id}`,
      );
      setDescription(
        resp.data.descriptions[resp.data.descriptions.length - 1].description,
      );
      const pokemonList = resp.data.pokemon_entries.map(poke => {
        return {name: poke.pokemon_species.name, url: poke.pokemon_species.url};
      });
      setSimplePokemonList(mapPokemonList(pokemonList));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadRegionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    description,
    simplePokemonList,
  };
};
