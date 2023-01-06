import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {AppText} from '../components/Text';
import {RootStackParams} from '../navigator/StackNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../components/FadeInImage';
import {usePokemon} from '../hooks/usePokemon';
import {PokemonDetails} from '../components/PokemonDetails';
import {BackButton} from '../components/BackButton';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({navigation, route}: Props) => {
  const {simplePokemon, color} = route.params;
  const {id, name, picture} = simplePokemon;
  const {top} = useSafeAreaInsets();

  const {isLoading, pokemon} = usePokemon(id);

  return (
    <View style={{flex: 1}}>
      <View style={{...styles.headerContainer, backgroundColor: color}}>
        <BackButton color="white" />

        <AppText style={{...styles.pokemonName, top: top + 40}}>
          {name}{' '}
        </AppText>
        <View style={{...styles.pokemonNumberContainer}}>
          <AppText
            style={{...styles.pokemonNumber, color: color, top: top + 40}}>
            #{id}
          </AppText>
        </View>
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={{...styles.pokeball}}
        />
        <FadeInImage uri={picture} style={{...styles.pokemonImage}} />
      </View>
      {isLoading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },

  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokemonNumberContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 150,
    height: 150,
    backgroundColor: 'white',
    borderBottomLeftRadius: 100,
  },
  pokemonNumber: {
    fontSize: 40,
    alignSelf: 'center',
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -60,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
