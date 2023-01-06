import React from 'react';
import {useContext, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {UserContext} from '../context/UserContextProvider';
import {getData} from '../helpers';
import {User} from '../interfaces/userInterfaces';
import {styles, globalStyles} from '../theme/appTheme';
import {useNavigation, useRoute} from '@react-navigation/native';

interface Props {
  children: any;
}
export const MainContainer = ({children}: Props) => {
  const {userInfo, isAuth} = useContext(UserContext);
  const navigation = useNavigation();
  const {name} = useRoute();

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={globalStyles.pokebolaBG}
      />
      {isAuth && name !== 'ProfileScreen' ? (
        <TouchableOpacity
          // style={{backgroundColor: 'red', width: 100, height: 100}}
          style={{...globalStyles.avatar}}
          activeOpacity={0.9}
          onPress={() => {
            navigation.navigate('ProfileScreen', {user: userInfo});
          }}>
          <Image
            source={{uri: userInfo.photo}}
            style={{...globalStyles.avatarImg}}
          />
        </TouchableOpacity>
      ) : null}
      {children}
    </>
  );
};
