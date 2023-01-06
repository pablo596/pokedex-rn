import React, {useEffect} from 'react';
import {MainContainer} from '../components/MainContainer';
import {AppText} from '../components/Text';
import {BackButton} from '../components/BackButton';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/StackNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {globalStyles} from '../theme/appTheme';
import {useFirebaseRealtimeTeams} from '../hooks/useFirebaseRealtimeTeams';
import {CardTeam} from '../components/CardTeam';
interface Props extends StackScreenProps<RootStackParams, 'ListTeamsScreen'> {}
export const ListTeamsScreen = ({route}: Props) => {
  const {region} = route.params;
  const {top, left, bottom} = useSafeAreaInsets();
  // const [isloading, setIsloading] = useState(true);
  const {teamsA, retrieveTeams, isLoading} = useFirebaseRealtimeTeams({
    regionName: region.name,
  });

  useEffect(() => {
    retrieveTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainContainer>
      <BackButton />
      <View style={{alignItems: 'center', marginTop: top + 40}}>
        <FlatList
          data={teamsA}
          keyExtractor={(regionN, i) => regionN.name + '-' + i}
          renderItem={({item}) => <CardTeam team={item} />}
          alwaysBounceVertical={true}
          ListHeaderComponent={
            <AppText style={{...globalStyles.title, top: top, left: left + 20}}>
              Equipos
            </AppText>
          }
          ListFooterComponent={
            isLoading ? (
              <ActivityIndicator style={{height: 100}} size={20} color="grey" />
            ) : (
              <View
                style={{
                  height: bottom + 20,
                }}
              />
            )
          }
        />
      </View>
    </MainContainer>
  );
};
