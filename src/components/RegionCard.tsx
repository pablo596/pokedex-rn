import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Result} from '../interfaces/regionsInterfaces';
import {AppText} from './Text';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/StackNavigator';

interface Props {
  region: Result;
  navType?: RegionCardNavType;
}
export enum RegionCardNavType {
  TEAM,
  NORMAL,
}
export const RegionCard = ({
  region,
  navType = RegionCardNavType.NORMAL,
}: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        if (navType === RegionCardNavType.NORMAL) {
          navigation.navigate('PokemonsByRegionScreen', {region: region});
        } else {
          navigation.navigate('ListTeamsScreen', {region: region});
        }
      }}>
      <View style={{...styles.containerRegion}}>
        <AppText style={{...styles.name}}>{region.name}</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerRegion: {
    marginHorizontal: 10,
    backgroundColor: 'grey',
    height: 80,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Changa-Bold',
    textTransform: 'capitalize',
  },
});
