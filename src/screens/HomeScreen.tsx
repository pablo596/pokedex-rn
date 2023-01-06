import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';

import {PkText} from '../components/PkText';
import {globalStyles} from '../theme/appTheme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRegions} from '../hooks/useRegions';
import {RegionCard} from '../components/RegionCard';
import {MainContainer} from '../components/MainContainer';

export const HomeScreen = () => {
  const {isLoading, regions} = useRegions();
  const {top} = useSafeAreaInsets();
  return (
    <MainContainer>
      <View style={{alignItems: 'center'}}>
        <FlatList
          data={regions}
          keyExtractor={region => region.name}
          renderItem={({item}) => <RegionCard region={item} />}
          numColumns={2}
          alwaysBounceVertical={true}
          ListHeaderComponent={
            <PkText
              style={{
                ...globalStyles.title,
                ...globalStyles.globalMargin,
                top: top + 20,
                marginBottom: top + 20,
                paddingBottom: 10,
              }}>
              Pokedex
            </PkText>
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
