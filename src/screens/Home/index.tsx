import * as React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Card, CustomStatusBar, Gap, Header, ListAction} from '../../components';
import styles from '../../styles/HomeScreenStyles';

const Home = ({navigation}: any) => {
  const backHandler = () => {
    navigation.replace('ListKonsultasi');
  };

  return (
    <SafeAreaView>
      <CustomStatusBar translucent />
      <View style={styles.headerWrapper}>
        <Header title="Pasien Dashboard" action={() => backHandler()} />
      </View>
      <View style={styles.container}>
        <Card />
        <Gap height={20} />
        <ListAction />
        <Gap height={20} />
        <Text style={styles.subTitle}>History</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
