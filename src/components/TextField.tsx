import React from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import {AppText} from './Text';

interface Props {
  placeholder: string;
  label?: string;
  onChange?:
    | ((e: NativeSyntheticEvent<TextInputChangeEventData>) => void)
    | undefined;
  type?: KeyboardTypeOptions | undefined;
  readonly?: boolean;
  maxLength?: number | undefined;
  numberOfLines?: number | undefined;
  value: string;
  multiLine?: boolean;
}
export const TextField = ({
  label,
  placeholder,
  onChange,
  type,
  readonly = false,
  maxLength,
  numberOfLines,
  value,
  multiLine = false,
}: Props) => {
  return (
    <View>
      <AppText style={{marginHorizontal: 10, marginBottom: 0}}>{label}</AppText>
      <TextInput
        numberOfLines={numberOfLines}
        multiline={multiLine}
        maxLength={maxLength}
        editable={!readonly}
        keyboardType={type}
        style={{
          ...styles.textFileld,
        }}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textFileld: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 10,
    marginTop: 5,
    paddingHorizontal: 10,
    color: 'black',
  },
});
