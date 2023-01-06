import React, {useState, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';
import {AppText} from './Text';

import LinearGradient from 'react-native-linear-gradient';
import ImageColors from 'react-native-image-colors';
import {useRef, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/StackNavigator';
import {PokemonContext} from '../context/PokemonContextProvider';
import {size} from '../helpers/index';
import {usePokemon} from '../hooks/usePokemon';

const windowWith = Dimensions.get('window').width;

interface Props {
  pokemonElement: SimplePokemon;
  typeCard: TypePokemonOptionCard;
}
export enum TypePokemonOptionCard {
  Nav,
  Select,
  ViewOnly,
}
export const PokemonCard = ({pokemonElement, typeCard}: Props) => {
  const {activeCanSave, pokemonsSelectedTeam, clearSelection} =
    useContext(PokemonContext);
  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const [isSelected, setIsSelected] = useState(false);
  const {pokemon} = usePokemon(pokemonElement.id);

  useEffect(() => {
    const getImageColors = async () => {
      await ImageColors.getColors(pokemonElement.picture, {
        fallback: 'grey',
      })
        .then(colors => {
          if (colors.platform === 'android') {
            setBgColor(colors.dominant || 'grey');
          } else if (colors.platform === 'ios') {
            setBgColor(colors.background || 'grey');
          } else {
            setBgColor('grey');
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
    if (!isMounted.current) {
      return;
    }
    getImageColors();
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (clearSelection) {
      setIsSelected(false);
    }
  }, [clearSelection]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        switch (typeCard) {
          case TypePokemonOptionCard.Nav:
            navigation.navigate('PokemonScreen', {
              simplePokemon: pokemonElement,
              color: bgColor,
            });
            break;
          case TypePokemonOptionCard.Select:
            if (pokemonsSelectedTeam.current.length === 6) {
              Alert.alert(
                'Equipo lleno',
                `Lo sentimos, tu equipo ya tiene ${pokemonsSelectedTeam.current.length} pokemons seleccionados. Recuerda que el equipo debe tener mínimo 3 y máximo 6 pokemos.`,
                [{text: 'OK', onPress: () => {}}],
              );
              return;
            }
            if (pokemonsSelectedTeam.current.length > 2) {
              activeCanSave?.(true);
            } else {
              activeCanSave?.(false);
            }
            if (pokemonsSelectedTeam.current.length === 0) {
              pokemonsSelectedTeam.current.push(pokemonElement);
              setIsSelected(true);
            } else {
              if (!pokemonsSelectedTeam.current.includes(pokemonElement)) {
                if (pokemonsSelectedTeam.current.length < 6) {
                  setIsSelected(true);
                  pokemonsSelectedTeam.current = [
                    ...pokemonsSelectedTeam.current,
                    pokemonElement,
                  ];
                }
              } else {
                setIsSelected(false);
                pokemonsSelectedTeam.current =
                  pokemonsSelectedTeam.current.filter(
                    a => a.id !== pokemonElement.id,
                  );
              }
            }
            break;
          case TypePokemonOptionCard.ViewOnly:
            break;
          default:
            break;
        }
      }}>
      <View
        style={[
          {
            ...styles.cardContainer,
            width:
              typeCard === TypePokemonOptionCard.ViewOnly
                ? size.width * 0.6
                : windowWith * 0.4,
            backgroundColor: bgColor,
          },
          isSelected && {...styles.selected},
        ]}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.25)', 'rgba(0,0,0,0.1)']}
          locations={[0, 0.5, 1]}
          style={{
            ...styles.gradient,
            width:
              typeCard === TypePokemonOptionCard.ViewOnly
                ? size.width * 0.6
                : windowWith * 0.4,
          }}
        />
        <View>
          <AppText style={styles.name}>
            {pokemonElement.name}
            {'\n#' + pokemonElement.id}
          </AppText>
        </View>
        <View
          style={{
            ...styles.type,
            width: typeCard === TypePokemonOptionCard.ViewOnly ? '60%' : '45%',
          }}>
          <AppText
            // key={type.name}
            style={{...styles.regularText}}>
            {pokemon.types
              ?.map(elem => {
                return elem.type.name;
              })
              .join(', ')}
          </AppText>
          {/* {pokemon.types?.map(({type}) => (
            <AppText
              key={type.name}
              style={{...styles.regularText, marginRight: 5}}>
              {type.name}
            </AppText>
          ))} */}
        </View>
        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>
        <FadeInImage uri={pokemonElement.picture} style={styles.pokemonImage} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: 'grey',
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  gradient: {
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    marginHorizontal: 0,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Changa-Bold',
    // fontWeight: 'bold',
    top: 10,
    left: 10,
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -25,
    bottom: -25,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -5,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },
  selected: {
    borderColor: 'red',
    borderWidth: 5,
  },
  regularText: {color: 'white'},
  type: {
    flexDirection: 'row',

    paddingHorizontal: 10,
    flex: 1,
  },
});
