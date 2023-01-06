import React from 'react';
import {StyleSheet, View} from 'react-native';
import {MainContainer} from '../components/MainContainer';
import {PkText} from '../components/PkText';
// import GoogleButton from 'react-google-button';
// import {signInWithPopup} from 'firebase/auth';
// import {auth, provider} from '../../config';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  // statusCodes,
} from '@react-native-google-signin/google-signin';
import {storeData} from '../helpers';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/StackNavigator';
import {globalStyles} from '../theme/appTheme';

export const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  GoogleSignin.configure({
    // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId:
      '1017751435075-r73eku11rplmsulu49h7t0vv7iaj7mon.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
  });
  // const signUp = async () => {};

  const onGoogleButtonPress = async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Get the users ID token
      const {idToken, user} = await GoogleSignin.signIn();
      storeData('@PokedexToken', idToken ?? '');

      storeData('@PokedexUser', JSON.stringify(user) ?? '');
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // navigation.replace('HomeScreen');
      navigation.reset({index: 0, routes: [{name: 'HomeScreen'}]});
      // navigation.navigate('HomeScreen');
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainContainer>
      <View style={{...styles.containerAuth}}>
        <PkText style={{...globalStyles.title}}>Welcome to Pokedex</PkText>
        <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={onGoogleButtonPress}
        />
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  containerAuth: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 60,
    fontFamily: 'Changa-Bold',
    textAlign: 'center',
  },
});
