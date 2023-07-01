import {
  faHeartPulse,
  faKitMedical,
  faMedkit,
  faStethoscope,
} from '@fortawesome/free-solid-svg-icons';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import * as React from 'react';
import {Alert, PermissionsAndroid, ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ViewShot from 'react-native-view-shot';
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
import {
  CheckQueue,
  GetPatientDetail,
  GetVisitHistory,
  GetVisitHistoryDate,
  UpdateQueue,
} from '../../services';
import styles from '../../styles/Screen/PatientDashboard';

const PatientDashboard = ({route, navigation}: any) => {
  const {loggedInToken, loggedInRole} = React.useContext(IsLogedInContext);
  const [data, setData] = React.useState({});
  const [name, setName] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [sex, setSex] = React.useState('');
  const [isLaoding, setIsLoading] = React.useState(false);
  const [visitDate, setVisitDate] = React.useState<string[]>([]);
  const [visitHistory, setVisitHistory] = React.useState<string[]>([]);
  const [selectedVisitDate, setSelectedVisitDate] = React.useState('');
  const {idPasien} = route.params;
  const viewShotRef = React.useRef(null);

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
  }, [idPasien, loggedInToken]);

  React.useEffect(() => {
    setVisitDate([]);
    setIsLoading(true);
    GetVisitHistoryDate(idPasien, loggedInToken)
      .then((res: any) => {
        if (res.length > 0) {
          setSelectedVisitDate(res[0].visitDate);
          res.map((resMap: any) => {
            setVisitDate(oldData => [...oldData, resMap.visitDate]);
          });
        }
      })
      .catch(err => Alert.alert('Error', err))
      .finally(() => setIsLoading(false));
  }, [idPasien, loggedInToken]);

  React.useEffect(() => {
    setIsLoading(true);
    if (selectedVisitDate) {
      GetVisitHistory(idPasien, selectedVisitDate, loggedInToken)
        .then((res: any) => {
          setVisitHistory(res);
        })
        .catch(err => Alert.alert('Error', err))
        .finally(() => setIsLoading(false));
    }
  }, [idPasien, loggedInToken, selectedVisitDate]);

  const actionButtonHandler = (type: string) => {
    Alert.alert(
      'Konfirmasi Tindakan!',
      `Pasien ini akan dimasukan kedalam list antrean ${
        type === 'pharmacist' ? 'apoteker' : 'perawat'
      }.`,
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
                  .catch((err: any) => Alert.alert('Error!', err))
                  .finally(() => setIsLoading(false));
              })
              .catch((err: any) => {
                Alert.alert('Error!', err);
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

  const onCapture = () => {
    viewShotRef.current.capture().then((res: any) => {
      if (Platform.OS === 'android') {
        if (!getPermissionAndroid()) {
          return;
        }
      }

      const image = CameraRoll.save(res, {type: 'photo'});
      if (image) {
        Alert.alert(
          'Gambar berhasil disimpan',
          'Gambar telah tersimpan di gallery.',
          [{text: 'OK', onPress: () => {}}],
          {cancelable: false},
        );
      }
    });
  };

  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Izin Unduh Gambar',
          message: 'Izinkan aplikasi ini untuk menyimpan gambar di galery!',
          buttonNegative: 'Tidak',
          buttonPositive: 'Izinkan',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
    } catch (err: any) {
      Alert.alert(
        'Simpan gambar',
        'Gagal menyimpan gambar: ' + err.message,
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    }
  };

  return (
    <SafeAreaView>
      <CustomStatusBar translucent />
      <View style={styles.headerWrapper}>
        <Header title="Rekam Medis" actionOne={() => navigation.goBack()} />
      </View>
      <ScrollView style={styles.container}>
        <ViewShot
          ref={viewShotRef}
          options={{
            format: 'png',
            quality: 1,
            fileName: `${idPasien}-${name}`,
          }}>
          <PatientCard
            name={name}
            id={idPasien}
            birthday={
              dateOfBirth
                ? `${dateOfBirth.split('-')[2]}-${dateOfBirth.split('-')[1]}-${
                    dateOfBirth.split('-')[0]
                  }`
                : ''
            }
            gender={sex}
            onPress={() =>
              navigation.navigate('PatientInformationUpdate', {data})
            }
          />
        </ViewShot>
        <Gap height={20} />
        {loggedInRole === 'frontdesk' && (
          <>
            <CustomButton onClick={onCapture} buttonText="Unduh Kartu Pasien" />
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
              text="Konsultasi Dan Periksa Kesehatan Lanjutan"
              action={() =>
                navigation.navigate('DoctoralConsultationInput', {idPasien})
              }
              icon={faStethoscope}
            />
          ) : null}
        </View>
        <Gap height={20} />
        <Text style={styles.subTitle}>Riwayat Kunjungan</Text>
        <View>
          {loggedInRole === 'frontdesk' &&
            (visitDate.length <= 0 ? (
              <Text style={styles.historyEmpty}>
                Belum Ada Riwayat Kunjungan
              </Text>
            ) : (
              <>
                <CustomSelect
                  label="Pilih Tanggal Riwayat Kunjungan"
                  value={selectedVisitDate}
                  item={[...new Set(visitDate)]}
                  onSelect={(e: any) => {
                    setSelectedVisitDate(e);
                  }}
                />
                {visitHistory.length > 0
                  ? visitHistory.map((visit: any) => (
                      <ListAction
                        key={visit.uidVisitHistory}
                        title={visit.medicalType}
                        onPress={() => {}}
                        icon={
                          visit.medicalType.includes('Lanjutan')
                            ? faStethoscope
                            : faMedkit
                        }
                        mb={10}
                      />
                    ))
                  : null}
              </>
            ))}
          {loggedInRole === 'nurse' &&
            (visitDate.length <= 0 ? (
              <Text style={styles.historyEmpty}>
                Belum Ada Riwayat Kunjungan
              </Text>
            ) : (
              <>
                <CustomSelect
                  label="Pilih Tanggal Riwayat Kunjungan"
                  value={selectedVisitDate}
                  item={[...new Set(visitDate)]}
                  onSelect={(e: any) => {
                    setSelectedVisitDate(e);
                  }}
                />
                {visitHistory.length > 0
                  ? visitHistory.map((visit: any) => {
                      if (visit.medicalType === 'Periksa Kesehatan') {
                        return (
                          <ListAction
                            key={visit.uidVisitHistory}
                            title={visit.medicalType}
                            onPress={() => {
                              navigation.navigate('MedicalTestHistory', {
                                id: visit.uidMedicalType,
                              });
                            }}
                            icon={
                              visit.medicalType.includes('Lanjutan')
                                ? faStethoscope
                                : faMedkit
                            }
                            mb={10}
                          />
                        );
                      }
                    })
                  : null}
              </>
            ))}
          {loggedInRole === 'doctor' &&
            (visitDate.length <= 0 ? (
              <Text style={styles.historyEmpty}>
                Belum Ada Riwayat Kunjungan
              </Text>
            ) : (
              <>
                <CustomSelect
                  label="Pilih Tanggal Riwayat Kunjungan"
                  value={selectedVisitDate}
                  item={[...new Set(visitDate)]}
                  onSelect={(e: any) => {
                    setSelectedVisitDate(e);
                  }}
                />
                {visitHistory.length > 0
                  ? visitHistory.map((visit: any) => (
                      <ListAction
                        key={visit.uidVisitHistory}
                        title={visit.medicalType}
                        onPress={() => {
                          if (visit.medicalType.includes('Lanjutan')) {
                            navigation.navigate('DoctoralConsultationHistory', {
                              uidConsultation: visit.uidMedicalType,
                              uidMedicine: visit.uidMedicineRequest,
                            });
                          } else {
                            navigation.navigate('MedicalTestHistory', {
                              id: visit.uidMedicalType,
                            });
                          }
                        }}
                        icon={
                          visit.medicalType.includes('Lanjutan')
                            ? faStethoscope
                            : faMedkit
                        }
                        mb={10}
                      />
                    ))
                  : null}
              </>
            ))}
          <Gap height={100} />
        </View>
      </ScrollView>
      <LoadingModal visible={isLaoding} />
    </SafeAreaView>
  );
};

export default PatientDashboard;
