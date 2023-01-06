import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  globalMargin: {
    marginHorizontal: 20,
  },
  pokebolaBG: {
    position: 'absolute',

    width: 300,
    height: 300,
    top: -100,
    right: -100,
    opacity: 0.2,
  },
  title: {
    fontSize: 45,
    // color: 'white',
  },
  avatarImg: {
    width: 50,
    height: 50,
    borderRadius: 400 / 2,
    position: 'relative',
  },
  avatar: {
    zIndex: 999,
    // backgroundColor: 'red',
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 400 / 2,
    position: 'absolute',
    right: 25,
    top: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
