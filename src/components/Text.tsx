import React from 'react';
import {Text, TextStyle} from 'react-native';
// import {isAndroid} from '../helpers';

interface AppTextProps {
  children?: String | String[];
  style?: TextStyle;
  rest?: any;
}
export const AppText = ({children, style, ...rest}: AppTextProps) => {
  return (
    <Text
      style={[
        {
          color: 'black',
          fontFamily: 'Changa-Regular',
          ...style,
          //   fontFamily: isAndroid() ? 'Pokemon_Classic' : 'Pokemon Classic',
          // fontWeight: 'bold',
        },
        // {},
      ]}
      {...rest}>
      {children}
    </Text>
  );
};
