import {
  faHeartPulse,
  faKitMedical,
  faMedkit,
  faStethoscope,
  faUserDoctor,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CustomStatusBar,
  Gap,
  Header,
  ListAction,
  PatientCard,
} from '../../components';
import styles from '../../styles/Screen/PatientDashboard';

const PatientDashboard = ({route, navigation}: any) => {
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    setData(route.params.data);
  }, [route.params.data]);

  return (
    <SafeAreaView>
      <CustomStatusBar translucent />
      <View style={styles.headerWrapper}>
        <Header
          title="Patient Dashboard"
          actionOne={() =>
            navigation.reset({
              index: 0,
              routes: [{name: 'PatientCardScanner'}],
            })
          }
        />
      </View>
      <View style={styles.container}>
        <PatientCard
          name={data.name}
          id={data.uidPatient}
          birthday={`${data.dateOfBirth.split('-')[2]}/${data.dateOfBirth.split('-')[1]}/${data.dateOfBirth.split('-')[0]}`}
          gender={data.sex}
          onPress={() => navigation.navigate('Profile')}
        />
        <Gap height={20} />
        <View style={styles.buttonActionContainer}>
          <TouchableOpacity style={styles.buttonActionWrapper}>
            <FontAwesomeIcon icon={faKitMedical} size={35} color="#6c5ce7" />
            <Text style={styles.buttonActionText}>Beli Obat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonActionWrapper}>
            <FontAwesomeIcon icon={faHeartPulse} size={35} color="#6c5ce7" />
            <Text style={styles.buttonActionText}>Periksa Kesehatan</Text>
          </TouchableOpacity>
        </View>
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
        <Gap height={10} />
        <ListAction
          title="Riwayat Obat"
          subtitle="Riwayat pemberian obat pasien"
          icon={faMedkit}
          onPress={() => null}
        />
      </View>
    </SafeAreaView>
  );
};

export default PatientDashboard;
