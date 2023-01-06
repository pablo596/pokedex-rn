import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {AppText} from './Text';
import {PokemonFull} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';
import {globalStyles} from '../theme/appTheme';

interface Props {
  pokemon: PokemonFull;
}

export const PokemonDetails = ({pokemon}: Props) => {
  return (
    <ScrollView
      style={{
        ...StyleSheet.absoluteFillObject,
      }}
      showsVerticalScrollIndicator={false}>
      {/* Types */}
      <View style={{...styles.container, marginTop: 370}}>
        <AppText style={globalStyles.title}>Types</AppText>
        <View style={{flexDirection: 'row'}}>
          {pokemon.types?.map(({type}) => (
            <AppText
              key={type.name}
              style={{...styles.regularText, marginRight: 10}}>
              {type.name}
            </AppText>
          ))}
        </View>
        <AppText style={globalStyles.title}>Weight</AppText>
        <AppText style={styles.regularText}>
          {pokemon.weight?.toString()} kg
        </AppText>
      </View>

      {/* Sprites */}
      <View style={{...styles.container}}>
        <AppText style={globalStyles.title}>Sprites</AppText>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FadeInImage
            uri={pokemon.sprites?.front_default}
            style={styles.basicSprite}
          />
          <FadeInImage
            uri={pokemon.sprites?.back_default}
            style={styles.basicSprite}
          />
          <FadeInImage
            uri={pokemon.sprites?.front_shiny}
            style={styles.basicSprite}
          />
          <FadeInImage
            uri={pokemon.sprites?.front_shiny}
            style={styles.basicSprite}
          />
        </ScrollView>
      </View>

      {/* Abilities */}
      <View style={{...styles.container}}>
        <AppText style={globalStyles.title}>Abilities</AppText>
        <View style={{flexDirection: 'row'}}>
          {pokemon.abilities?.map(({ability}) => (
            <AppText
              key={ability.name}
              style={{...styles.regularText, marginRight: 10}}>
              {ability.name}
            </AppText>
          ))}
        </View>
      </View>

      {/* Moves */}
      <View style={{...styles.container}}>
        <AppText style={globalStyles.title}>Moves</AppText>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {pokemon.moves?.map(({move}) => (
            <AppText
              key={move.name}
              style={{...styles.regularText, marginRight: 10}}>
              {move.name}
            </AppText>
          ))}
        </View>
      </View>

      {/* Stats */}
      <View style={{...styles.container}}>
        <AppText style={globalStyles.title}>Stats</AppText>
        <View style={{alignItems: 'center'}}>
          {pokemon.stats?.map((stat, i) => (
            <View key={stat.stat.name + i} style={{flexDirection: 'row'}}>
              <AppText
                style={{...styles.regularText, marginRight: 10, width: 150}}>
                {stat.stat.name}
              </AppText>
              <AppText
                style={{
                  ...styles.regularText,
                  marginRight: 10,
                  fontFamily: 'Changa-Bold',
                }}>
                {stat.base_stat.toString()}
              </AppText>
            </View>
          ))}
        </View>
        {/* Sprite final */}
        <View style={{marginBottom: 10, alignItems: 'center'}}>
          <FadeInImage
            uri={pokemon.sprites?.front_default}
            style={styles.basicSprite}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Changa-Bold',
  },
  regularText: {
    fontSize: 19,
  },
  basicSprite: {
    height: 100,
    width: 100,
  },
});
