import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  color?: string;
}
export const BackButton = ({color = 'black'}: Props) => {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      activeOpacity={0.8}
      style={{...styles.backButton, top: top + 10}}>
      <Icon name="arrow-back-outline" color={color} size={35} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    left: 20,
  },
});
