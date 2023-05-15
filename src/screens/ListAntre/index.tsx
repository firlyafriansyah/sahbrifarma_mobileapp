import * as React from 'react';
import {View, Text} from 'react-native';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomStatusBar, Header, ListCard} from '../../components';
import styles from '../../styles/ListScreenStyles';
import data from './data';

const ListAntre = ({navigation}: any) => {
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
        <Header action={() => null} title="List Konsultasi" />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.listWrapper}>
          {data.length <= 0 ? (
            <Text style={styles.endText}>Tidak ada antrean konsultasi</Text>
          ) : (
            <>
              {data.map((res, index) => (
                <ListCard
                  key={index}
                  name={res.name}
                  id={res.id}
                  gender={res.gender}
                  sequence={index + 1}
                  onPress={() => navigation.replace('Home')}
                />
              ))}
              <Text style={styles.endText}>End of list</Text>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListAntre;
