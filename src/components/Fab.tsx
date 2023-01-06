import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {size} from '../helpers/index';

interface Props {
  label: any;
  color?: string;
  position?: FabPosition;
  onPress: () => void;
  sizeBtn?: {
    width?: number | string;
    height?: number | string;
  };
}

export enum FabPosition {
  Top_Left = 'topLeft',
  Top_Center = 'topCenter',
  Top_Right = 'topRight',
  Bottom_Left = 'bottomLeft',
  Bottom_Center = 'bottomCenter',
  Bottom_Right = 'bottomRight',
}

export const Fab = ({
  color = 'white',
  position,
  label,
  onPress,
  sizeBtn = {width: 30, height: 30},
}: Props) => {
  const getPosition = (pos: FabPosition) => {
    switch (pos) {
      case FabPosition.Top_Left:
        return styles.topLeft;
      case FabPosition.Top_Center:
        return styles.topCenter;
      case FabPosition.Top_Right:
        return styles.topRight;
      case FabPosition.Bottom_Left:
        return styles.bottomLeft;
      case FabPosition.Bottom_Center:
        return styles.bottomCenter;
      case FabPosition.Bottom_Right:
        return styles.bottomRight;

      default:
        return styles.bottomRight;
    }
  };
  return (
    <TouchableOpacity
      style={{
        ...styles.fab,
        ...getPosition(position as FabPosition),
        backgroundColor: color,
        width: sizeBtn.width,
        height: sizeBtn.height,
      }}
      onPress={onPress}>
      <View style={{...styles.fabContainer}}>{label}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    zIndex: 9991,
    minWidth: size.width * 0.1,
    minHeight: size.width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'red',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: 'absolute',
    elevation: 20,
  },
  fabContainer: {},
  topLeft: {
    top: 20,
    left: 20,
  },
  topCenter: {
    top: 20,
  },
  topRight: {
    top: 20,
    right: 20,
  },
  bottomLeft: {
    bottom: 20,
    left: 20,
  },
  bottomCenter: {
    bottom: 20,
  },
  bottomRight: {
    bottom: 20,
    right: 20,
  },
});
