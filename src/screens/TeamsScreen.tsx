import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {BackButton} from '../components/BackButton';
import {MainContainer} from '../components/MainContainer';
import {AppText} from '../components/Text';
import {globalStyles} from '../theme/appTheme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRegions} from '../hooks/useRegions';
import {RegionCard, RegionCardNavType} from '../components/RegionCard';

export const TeamsScreen = () => {
  const {top, left} = useSafeAreaInsets();
  const {isLoading, regions} = useRegions();

  return (
    <MainContainer>
      <BackButton />
      <View style={{alignItems: 'center', marginTop: top + 40}}>
        <FlatList
          data={regions}
          keyExtractor={region => region.name}
          renderItem={({item}) => (
            <RegionCard region={item} navType={RegionCardNavType.TEAM} />
          )}
          numColumns={2}
          alwaysBounceVertical={true}
          ListHeaderComponent={
            <AppText style={{...globalStyles.title, top: top, left: left + 20}}>
              Equipos
            </AppText>
          }
          ListFooterComponent={
            isLoading ? (
              <ActivityIndicator style={{height: 100}} size={20} color="grey" />
            ) : null
          }
        />
      </View>
    </MainContainer>
  );
};
