import * as React from 'react';
import {View} from 'react-native';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomStatusBar, Header, ListCard} from '../../components';
import {styles} from '../../styles/ListScreenStyles';
import data from './data';

const ListPeriksa = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView>
      <CustomStatusBar translucent />
      <View style={styles.headerWrapper}>
        <Header action={() => null} title="List Periksa" />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.listWrapper}>
          {data.map((res, index) => (
            <ListCard
              key={index}
              name={res.name}
              id={res.id}
              gender={res.gender}
              sequence={index + 1}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListPeriksa;
