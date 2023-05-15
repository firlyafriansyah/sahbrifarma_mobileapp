import {
  faPen,
  faStethoscope,
  faUserDoctor,
} from '@fortawesome/free-solid-svg-icons';
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
        <Header title="Pasien Dashboard" actionOne={() => backHandler()} />
      </View>
      <View style={styles.container}>
        <Card
          name="Firly Afriansyah"
          id="234387569387"
          birthday="20/04/2000"
          gender="Laki - Laki"
          onPress={() => navigation.navigate('Profile')}
        />
        <Gap height={20} />
        <ListAction
          title="Input Hasil Konsultasi"
          subtitle="Lakukan konsultasi dan lengkapi data pada form"
          icon={faPen}
          onPress={() => null}
        />
        <Gap height={20} />
        <Text style={styles.subTitle}>History</Text>
        <ListAction
          title="Riwayat Konsultasi"
          subtitle="Riwayat konsultasi pasien dengan doktor"
          icon={faUserDoctor}
          onPress={() => null}
        />
        <Gap height={10} />
        <ListAction
          title="Riwayat Periksa"
          subtitle="Riwayat pemeriksaan kesehatan pasien"
          icon={faStethoscope}
          onPress={() => null}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
