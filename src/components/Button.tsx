import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {
  StyleSheet,
  StyleSheetProperties,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {size} from '../helpers';

interface Props {
  btnStyle?: ViewStyle;
  label: any;
  onPress: () => void;
  disabled?: boolean;
}

export const Button = ({btnStyle, label, onPress, disabled = false}: Props) => {
  return (
    <TouchableOpacity
      style={{...styles.button, ...btnStyle}}
      onPress={onPress}
      disabled={disabled}>
      <View style={{...styles.buttonContainer, ...btnStyle}}>{label}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    minHeight: size.height * 0.04,
    minWidth: size.width * 0.1,
    width: 'auto',
    paddingHorizontal: 10,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.34,
    // shadowRadius: 6.27,

    // elevation: 10,
  },
});
