import 'react-native-gesture-handler';
import React from 'react';
// import {isIos} from './src/helpers';
// import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigator/StackNavigator';
import {UserContextProvider} from './src/context/UserContextProvider';
import {PokemonContextProvider} from './src/context/PokemonContextProvider';
import {MenuProvider} from 'react-native-popup-menu';

const App = () => {
  return (
    <UserContextProvider>
      <PokemonContextProvider>
        <NavigationContainer>
          <MenuProvider>
            <StackNavigator />
          </MenuProvider>
        </NavigationContainer>
      </PokemonContextProvider>
    </UserContextProvider>
  );
};

export default App;
