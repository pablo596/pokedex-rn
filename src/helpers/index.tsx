import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform, Dimensions} from 'react-native';
import {Result, SimplePokemon} from '../interfaces/pokemonInterfaces';
interface Size {
  width: number;
  height: number;
}
export const isIos = () => Platform.OS === 'ios';
export const isAndroid = () => Platform.OS === 'android';
export const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
} as Size;
export const getUrlStringPosition = (
  text: string,
  separator: string,
  position: number,
) => {
  const urlParts = text.split(separator);
  const item = urlParts[position];
  return item;
};
export const mapPokemonList = (pokemonList: Result[]) => {
  const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url}) => {
    const urlParts = url.split('/');
    getUrlStringPosition(url, '/', 2);
    const id = urlParts[urlParts.length - 2];
    const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    return {id, picture, name};
  });

  return newPokemonList;
};

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
  }
};
