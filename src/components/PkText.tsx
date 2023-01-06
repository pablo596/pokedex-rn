import React from 'react';
import {Text, TextStyle} from 'react-native';
// import {isAndroid} from '../helpers';

interface PKTextProps {
  children?: any;
  style?: TextStyle;
  rest?: any;
}
export const PkText = ({children, style, ...rest}: PKTextProps) => {
  return (
    <Text
      style={[
        {
          color: 'black',
          ...style,
          // fontFamily: isAndroid() ? 'Pokemon_Classic' : 'Pokemon Classic',
          fontFamily: 'Changa-Regular',
          // fontWeight: 'bold',
        },
        // {},
      ]}
      {...rest}>
      {children}
    </Text>
  );
};
