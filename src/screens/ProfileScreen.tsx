import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {MainContainer} from '../components/MainContainer';
import {AppText} from '../components/Text';
import {RootStackParams} from '../navigator/StackNavigator';
import {Button} from '../components/Button';
import {BackButton} from '../components/BackButton';

interface Props extends StackScreenProps<RootStackParams, 'ProfileScreen'> {}

export const ProfileScreen = ({navigation, route}: Props) => {
  const {user} = route.params;

  return (
    <MainContainer>
      <BackButton />
      <View style={{...styles.container}}>
        <View style={{...styles.avatar}}>
          <Image source={{uri: user.photo}} style={{...styles.avatarImg}} />
        </View>
        <AppText style={{...styles.title}}>Hola, {user.givenName}</AppText>
        <AppText style={{...styles.title}}>Bienvenido a Pokedex</AppText>
        <Button
          label={<AppText>Ver mis equipos</AppText>}
          onPress={() => {
            navigation.navigate('TeamsScreen');
          }}
        />
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  avatar: {
    backgroundColor: 'white',
    width: 150,
    height: 150,
    borderRadius: 400 / 2,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  avatarImg: {
    width: 150,
    height: 150,
    borderRadius: 400 / 2,
  },
  title: {
    fontSize: 30,
  },
});
