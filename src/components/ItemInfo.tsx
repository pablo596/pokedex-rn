import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from './Text';
interface Props {
  label: string;
  content: string;
}
export const ItemInfo = ({label, content}: Props) => {
  return (
    <View style={{...styles.itemInfo}}>
      <AppText style={{...styles.label}}>{label}</AppText>
      <AppText style={{...styles.content}}>{content}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  itemInfo: {
    width: '100%',
  },
  label: {
    lineHeight: 25,
    color: 'red',
    fontFamily: 'Changa-Bold',
  },
  content: {
    lineHeight: 25,
    fontSize: 20,
  },
});
