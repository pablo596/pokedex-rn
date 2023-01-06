import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {PokemonScreen} from '../screens/PokemonScreen';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {PokemonsByRegionScreen} from '../screens/PokemonsByRegionScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {User} from '../interfaces/userInterfaces';
import {TeamsScreen} from '../screens/TeamsScreen';
import {useContext} from 'react';
import {UserContext} from '../context/UserContextProvider';
import {Region} from '../interfaces/regionsInterfaces';
import {ListTeamsScreen} from '../screens/ListTeamsScreen';

export type RootStackParams = {
  LoginScreen: undefined;
  HomeScreen: undefined;
  PokemonScreen: {simplePokemon: SimplePokemon; color: string};
  PokemonsByRegionScreen: {region: Region};
  ProfileScreen: {user: User};
  TeamsScreen: undefined;
  ListTeamsScreen: {region: Region};
};

const Stack = createStackNavigator();

export const StackNavigator = () => {
  const {isAuth} = useContext(UserContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'white'},
      }}>
      {isAuth ? (
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
          <Stack.Screen
            name="PokemonsByRegionScreen"
            component={PokemonsByRegionScreen}
          />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="TeamsScreen" component={TeamsScreen} />
          <Stack.Screen name="ListTeamsScreen" component={ListTeamsScreen} />
        </>
      ) : (
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};
