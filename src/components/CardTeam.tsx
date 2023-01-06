import React from 'react';
import {Alert, FlatList, StyleSheet, View} from 'react-native';
import {Team} from '../interfaces/teamsInterfaces';
import {size} from '../helpers/index';
import {ItemInfo} from './ItemInfo';
import {PokemonCard, TypePokemonOptionCard} from './PokemonCard';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {AppText} from './Text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Divider} from '@rneui/base';
import {useFirebaseRealtimeTeams} from '../hooks/useFirebaseRealtimeTeams';
import {useNavigation} from '@react-navigation/native';

interface Props {
  team: Team;
}
export const CardTeam = ({team}: Props) => {
  const navigation = useNavigation();
  const {removeTeam, teams} = useFirebaseRealtimeTeams({
    key: team.key,
    regionName: team.region.name,
  });
  return (
    <View style={{...styles.card}}>
      <View
        style={{
          top: 0,
          right: 0,
          width: '100%',
          alignItems: 'flex-end',
          // position: 'absolute',
        }}>
        <Menu>
          <MenuTrigger
            children={
              <Ionicons name="ellipsis-vertical" size={20} color={'black'} />
            }
          />

          <MenuOptions>
            <MenuOption onSelect={() => {}}>
              <AppText>Editar</AppText>
            </MenuOption>
            <Divider />
            <MenuOption
              onSelect={() => {
                Alert.alert(
                  'Elimiar Equipo',
                  `¿Está seguro de eliminar el equipo ${team.name}?`,

                  [
                    {
                      text: 'Cancelar',
                      onPress: () => {},
                      style: 'cancel',
                    },
                    {
                      text: 'Eliminar',
                      onPress: () => {
                        teams.current = [];
                        removeTeam().then(() => navigation.goBack());
                        // retrieveTeams();
                      },
                    },
                  ],
                );
              }}>
              <AppText style={{color: 'red'}}>Eliminar</AppText>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
      <View style={{width: '100%', paddingHorizontal: 10}}>
        <ItemInfo label="Equipo" content={team.name} />
        <ItemInfo label="Descripción del Pokedex" content={team.description} />
        <ItemInfo label="Región" content={team.region.name} />
      </View>
      <FlatList
        data={team.pokemonsSelected}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <PokemonCard
            pokemonElement={item}
            typeCard={TypePokemonOptionCard.ViewOnly}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: size.width * 0.9,
    backgroundColor: 'white',
    marginHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    shadowColor: '#000',
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {},
  pokemonContainer: {
    width: size.width * 0.45,
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'blue',
  },
});
