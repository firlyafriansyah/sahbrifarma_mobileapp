import {
  faHeartPulse,
  faKitMedical,
  faStethoscope,
} from '@fortawesome/free-solid-svg-icons';
import {useIsFocused} from '@react-navigation/native';
import * as React from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ActionButton,
  CustomButton,
  CustomSelect,
  CustomStatusBar,
  Gap,
  Header,
  ListAction,
  LoadingModal,
  PatientCard,
} from '../../components';
import {IsLogedInContext} from '../../context/AuthContext';
import {CheckQueue, GetPatientDetail, UpdateQueue} from '../../services';
import styles from '../../styles/Screen/PatientDashboard';
import {AgeCalculator} from '../../utils';

const PatientDashboard = ({route, navigation}: any) => {
  const {loggedInToken, loggedInRole} = React.useContext(IsLogedInContext);
  const [data, setData] = React.useState({});
  const [name, setName] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [sex, setSex] = React.useState('');
  const [isLaoding, setIsLoading] = React.useState(false);
  const {idPasien} = route.params;
  const isFocused = useIsFocused();

  React.useEffect(() => {
    setIsLoading(true);
    GetPatientDetail(idPasien, loggedInToken)
      .then((res: any) => {
        setData(res);
        setName(res.name);
        setDateOfBirth(res.dateOfBirth);
        setSex(res.sex);
      })
      .catch((err: any) => Alert.alert('Error', err))
      .finally(() => setIsLoading(false));
  }, [idPasien, loggedInToken, isFocused]);

  const actionButtonHandler = (type: string) => {
    Alert.alert(
      'Konfirmasi Tindakan',
      `Pasien ini akan dimasukan kedalam list antrean ${type}!`,
      [
        {
          text: 'Oke',
          onPress: () => {
            setIsLoading(true);
            CheckQueue(idPasien, loggedInToken)
              .then(() => {
                UpdateQueue(
                  idPasien,
                  'out_of_queue',
                  `${
                    type === 'pharmacist'
                      ? 'in_pharmacist_queue'
                      : 'in_medical_test_queue'
                  }`,
                  loggedInToken,
                )
                  .then(() =>
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'AdministrationProfile'}],
                    }),
                  )
                  .catch((err: any) => Alert.alert('Error', err))
                  .finally(() => setIsLoading(false));
              })
              .catch((err: any) => {
                Alert.alert('Error', err);
              })
              .finally(() => setIsLoading(false));
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <SafeAreaView>
      <CustomStatusBar translucent />
      <View style={styles.headerWrapper}>
        <Header
          title="Patient Dashboard"
          actionOne={() => navigation.goBack()}
        />
      </View>
      <ScrollView style={styles.container}>
        <PatientCard
          name={name}
          id={idPasien}
          birthday={AgeCalculator(dateOfBirth)}
          gender={sex}
          onPress={() =>
            navigation.navigate('PatientInformationUpdate', {data})
          }
        />
        <Gap height={20} />
        {loggedInRole === 'frontdesk' && (
          <>
            <CustomButton buttonText="Download Kartu Pasien" />
            <Gap height={20} />
          </>
        )}
        <View style={styles.buttonActionContainer}>
          {loggedInRole === 'frontdesk' ? (
            <>
              <View style={styles.buttonActionWrapper}>
                <ActionButton
                  text="Beli Obat"
                  action={() => actionButtonHandler('pharmacist')}
                  icon={faKitMedical}
                />
              </View>
              <View style={styles.buttonActionWrapper}>
                <ActionButton
                  text="Periksa Kesehatan"
                  action={() => actionButtonHandler('medical test')}
                  icon={faHeartPulse}
                />
              </View>
            </>
          ) : loggedInRole === 'nurse' ? (
            <ActionButton
              text="Periksa Kesehatan"
              action={() => navigation.navigate('MedicalTestInput', {idPasien})}
              icon={faHeartPulse}
            />
          ) : loggedInRole === 'doctor' ? (
            <ActionButton
              text="Konsultasi Dokter"
              action={() =>
                navigation.navigate('DoctoralConsultationInput', {idPasien})
              }
              icon={faStethoscope}
            />
          ) : null}
        </View>
        <Gap height={20} />
        <Text style={styles.subTitle}>History</Text>
        <View>
          {loggedInRole === 'frontdesk' && (
            <CustomSelect
              label="Pilih Tanggal Riwayat Kunjungan"
              value="2023-05-12"
              item={['2023-05-12', '2023-05-05', '2023-03-10']}
              onSelect={() => null}
            />
          )}
          <Gap height={10} />
          {loggedInRole === 'nurse' ||
            (loggedInRole === 'doctor' && (
              <ListAction
                title="Periksa Kesehatan"
                subtitle="Riwayat hasil periksa kesehatan pasien"
                onPress={() =>
                  navigation.navigate('MedicalTestHistory', {idPasien})
                }
                icon={faHeartPulse}
              />
            ))}
          <Gap height={10} />
          {loggedInRole === 'doctor' && (
            <ListAction
              title="Konsultasi Dokter"
              subtitle="Riwayat hasil konsultasi pasien dengan dokter"
              onPress={() =>
                navigation.navigate('MedicalTestHistory', {idPasien})
              }
              icon={faStethoscope}
            />
          )}
          <Gap height={100} />
        </View>
      </ScrollView>
      <LoadingModal visible={isLaoding} />
    </SafeAreaView>
  );
};

export default PatientDashboard;
