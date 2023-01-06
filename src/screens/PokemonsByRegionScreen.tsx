import React, {useState} from 'react';
import {FlatList, View, ActivityIndicator, StyleSheet} from 'react-native';
import {MainContainer} from '../components/MainContainer';
import {PokemonCard, TypePokemonOptionCard} from '../components/PokemonCard';
import {PkText} from '../components/PkText';
import {globalStyles} from '../theme/appTheme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRegionsPokemons} from '../hooks/useRegionsPokemons';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/StackNavigator';
import {AppText} from '../components/Text';
import {Button} from '../components/Button';
import {Fab, FabPosition} from '../components/Fab';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {size} from '../helpers/index';
// import {createTeam} from '../database/realtimeDatabase';
import {useContext} from 'react';
import {UserContext} from '../context/UserContextProvider';
import {BottomSheet} from '@rneui/themed';
import {TextField} from '../components/TextField';
import {PokemonContext} from '../context/PokemonContextProvider';
import {useFirebaseRealtimeTeams} from '../hooks/useFirebaseRealtimeTeams';

interface Props
  extends StackScreenProps<RootStackParams, 'PokemonsByRegionScreen'> {}
export const PokemonsByRegionScreen = ({route}: Props) => {
  const {userInfo} = useContext(UserContext);
  const {removeSelectionTeam, pokemonsSelectedTeam, canSaveTeam} =
    useContext(PokemonContext);
  const {region} = route.params;
  const {simplePokemonList, isLoading, description} = useRegionsPokemons(
    region.name,
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isSelectablePokemons, setIsSelectablePokemons] =
    useState<boolean>(false);
  const [isSelectablePokemonsForm, setIsSelectablePokemonsForm] =
    useState<boolean>(false);
  const [teamName, setTeamName] = useState('');

  const {top} = useSafeAreaInsets();
  const {createTeam} = useFirebaseRealtimeTeams({
    payload: {
      userId: userInfo.id,
      pokemonsSelected: pokemonsSelectedTeam.current,
      region: region,
      name: teamName,
      description: description,
    },
  });

  return (
    <MainContainer>
      <View style={{alignItems: 'center'}}>
        <Fab
          sizeBtn={{
            width: isSelectablePokemons ? 50 : 'auto',
            height: isSelectablePokemons ? 50 : 'auto',
          }}
          label={
            isSelectablePokemons ? (
              <Ionicons name="close" color={'white'} size={30} />
            ) : (
              <AppText style={{fontSize: 20, color: 'white'}}>Equipo</AppText>
            )
          }
          color={'red'}
          onPress={() => {
            setIsSelectablePokemons(!isSelectablePokemons);
          }}
        />
        {canSaveTeam && pokemonsSelectedTeam.current.length > 2 ? (
          <Fab
            label={
              <AppText style={{color: 'white', fontSize: 20}}>
                Siguiente
              </AppText>
            }
            onPress={() => {
              setIsSelectablePokemonsForm(true);
            }}
            position={FabPosition.Bottom_Center}
            sizeBtn={{width: 100}}
            color="green"
          />
        ) : null}
        {isSelectablePokemons ? (
          <View style={{...styles.bannerSelectable}}>
            <AppText style={{color: 'white', fontSize: 18}}>
              Recuerda que para crear un equipo debes escoger mínimo 3 pokemons
              y máximo 6 pokemons.
            </AppText>
          </View>
        ) : null}

        <BottomSheet
          modalProps={{}}
          isVisible={isSelectablePokemonsForm}
          backdropStyle={{backgroundColor: 'black', opacity: 0.2}}
          onBackdropPress={() => setIsSelectablePokemonsForm(false)}>
          <View
            style={{
              ...styles.bottomSheetContainer,
            }}>
            <View
              style={{
                ...styles.bottomSheetIndicatoe,
              }}
            />
            <View style={{height: size.height * 0.25}}>
              <TextField
                value={teamName}
                placeholder="Nombre del equipo"
                label="Nombre del equipo"
                onChange={({nativeEvent: {text}}) => {
                  setTeamName(text);
                }}
              />
              <TextField
                value={description}
                multiLine={true}
                numberOfLines={4}
                placeholder="Descripción del Pokedex"
                label="Descripción del Pokedex"
                readonly={true}
              />
            </View>
            <Button
              btnStyle={{
                marginHorizontal: 10,
                backgroundColor: 'green',
                paddingVertical: 5,
                marginBottom: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              disabled={isSaving}
              label={
                isSaving ? (
                  <ActivityIndicator color={'white'} />
                ) : (
                  <AppText
                    style={{color: 'white', fontSize: 18, textAlign: 'center'}}>
                    Guardar
                  </AppText>
                )
              }
              onPress={() => {
                setIsSaving(true);
                createTeam().then(() => {
                  setIsSelectablePokemons(false);
                  setIsSelectablePokemonsForm(false);
                  setTeamName('');
                  removeSelectionTeam?.(true);
                  pokemonsSelectedTeam.current = [];
                  setIsSaving(false);
                });
                // createTeam(userInfo.id, {
                //   userId: userInfo.id,
                //   pokemonsSelected: pokemonsSelectedTeam.current,
                //   region,
                //   name: teamName,
                //   description: description,
                // }).then(v => {
                //   // setPokemonsSelectedForTeamCreation([]);

                // });
              }}
            />
          </View>
        </BottomSheet>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={simplePokemonList}
          keyExtractor={regionKey => regionKey.name}
          renderItem={({item}) => (
            <PokemonCard
              typeCard={
                isSelectablePokemons
                  ? TypePokemonOptionCard.Select
                  : TypePokemonOptionCard.Nav
              }
              pokemonElement={item}
            />
          )}
          //   onEndReached={loadPokemons}
          //   onEndReachedThreshold={0.4}
          numColumns={2}
          alwaysBounceVertical={true}
          ListHeaderComponent={
            <PkText
              style={{
                ...globalStyles.title,
                ...globalStyles.globalMargin,
                top: top + 20,
                marginTop: isSelectablePokemons ? top + 100 : top + 20,
                marginBottom: top + 20,
                paddingBottom: 10,
              }}>
              Pokedex{' '}
              <AppText style={{fontSize: 20, color: 'red'}}>
                {region.name}
              </AppText>
            </PkText>
          }
          ListFooterComponent={
            isLoading ? (
              <ActivityIndicator style={{height: 100}} size={20} color="grey" />
            ) : null
          }
        />
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  bannerSelectable: {
    zIndex: 9991,
    position: 'absolute',
    width: size.width,
    height: 100,
    opacity: 0.8,
    backgroundColor: 'red',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  bottomSheetContainer: {
    backgroundColor: 'white',
    // height: size.height * 0.4,
    // width: size.width,
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 12,
  },
  bottomSheetIndicatoe: {
    width: 50,
    height: 5,
    backgroundColor: 'grey',
    borderRadius: 100,
    alignSelf: 'center',
    marginVertical: 10,
  },
});
