import React, {useRef} from 'react';
import {createContext, useMemo, useState} from 'react';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';

interface PokemonContextType {
  canSaveTeam: boolean;
  clearSelection: boolean;
  pokemonsSelectedTeam: React.MutableRefObject<SimplePokemon[]>;
  createPokemonsTeam?: (pokemon: SimplePokemon) => void;
  activeCanSave?: (can: boolean) => void;
  removeSelectionTeam?: (can: boolean) => void;
}

const PokemonContext = createContext<PokemonContextType>({
  canSaveTeam: false,
  clearSelection: false,
  pokemonsSelectedTeam: {current: []},
});

interface Props {
  children: any;
}

const PokemonContextProvider = ({children}: Props) => {
  const [canSaveTeam, setCanSaveTeam] = useState(false);
  const [clearSelection, setCleanSelection] = useState(false);

  const pokemonsSelectedTeam = useRef<SimplePokemon[]>([] as SimplePokemon[]);

  const values = useMemo(
    () => ({
      canSaveTeam,
      setCanSaveTeam,
      clearSelection,
      setCleanSelection,
      pokemonsSelectedTeam,
    }),
    [canSaveTeam, clearSelection],
  );
  const activeCanSave = (can: boolean) => {
    setCanSaveTeam(can);
  };
  const removeSelectionTeam = (remove: boolean) => {
    setCleanSelection(remove);
  };
  return (
    <PokemonContext.Provider
      value={{
        ...values,
        pokemonsSelectedTeam,
        activeCanSave,
        removeSelectionTeam,
      }}>
      {children}
    </PokemonContext.Provider>
  );
};

export {PokemonContextProvider, PokemonContext};
