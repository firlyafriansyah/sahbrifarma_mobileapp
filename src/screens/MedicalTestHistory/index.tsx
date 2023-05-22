import React from 'react';
import {Alert, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CustomInput,
  CustomInputBloodPressure,
  CustomSelect,
  CustomStatusBar,
  Gap,
  Header,
  LoadingModal,
} from '../../components';
import {IsLogedInContext} from '../../context/AuthContext';
import {GetMedicalTestList} from '../../services';
import styles from '../../styles/Screen/History';

const MedicalTestHistory = ({route, navigation}: any) => {
  const {loggedInToken} = React.useContext(IsLogedInContext);
  const [data, setData] = React.useState<string[]>([]);
  const [testDate, setTestDate] = React.useState('');
  const [testDateList, setTestDateList] = React.useState<string[]>([]);
  const [bodyHeight, setBodyHeight] = React.useState('');
  const [bodyWeight, setBodyWeight] = React.useState('');
  const [bodyTemperature, setBodyTemperature] = React.useState('');
  const [systole, setSystole] = React.useState('');
  const [diastole, setDiastole] = React.useState('');
  const [pulse, setPulse] = React.useState('');
  const [bloodSugar, setBloodSugar] = React.useState('');
  const [uridAcid, setUridAcid] = React.useState('');
  const [cholesterol, setCholesterol] = React.useState('');
  const [isLoading, setIsLaoding] = React.useState(false);
  const {idPasien} = route.params;

  React.useEffect(() => {
    setIsLaoding(true);
    GetMedicalTestList(idPasien, loggedInToken)
      .then((res: any) => {
        setData(res);
        res.map((resDate: any) => {
          setTestDateList(oldData => [
            ...oldData,
            `${resDate.createdAt.split('T')[0].split('-')[2]}-${
              resDate.createdAt.split('T')[0].split('-')[1]
            }-${resDate.createdAt.split('T')[0].split('-')[0]} ${
              resDate.createdAt.split('T')[1].split('.')[0]
            }`,
          ]);
        });
      })
      .catch((err: any) =>
        Alert.alert('Error!', err, [
          {text: 'Oke', onPress: () => navigation.goBack()},
        ]),
      )
      .finally(() => setIsLaoding(false));
  }, [idPasien, loggedInToken, navigation]);

  const selectTestDateHandler = (e: string) => {
    setTestDate(e);
    const filteredData = data.filter(
      v =>
        v.createdAt.split('.')[0] ===
        `${e.split(' ')[0].split('-')[2]}-${e.split(' ')[0].split('-')[1]}-${
          e.split(' ')[0].split('-')[0]
        }T${e.split(' ')[1]}`,
    );

    filteredData.map(value => {
      setBodyHeight(value.bodyHeight ? value.bodyHeight.toString() : '-');
      setBodyWeight(value.bodyWeight ? value.bodyWeight.toString() : '-');
      setBodyTemperature(
        value.bodyTemperature ? value.bodyTemperature.toString() : '-',
      );
      setSystole(value.bloodPressure ? value.bloodPressure.split('/')[0] : '-');
      setDiastole(
        value.bloodPressure ? value.bloodPressure.split('/')[1] : '-',
      );
      setPulse(value.bloodPressure ? value.bloodPressure.split('/')[2] : '-');
      setBloodSugar(value.bloodSugar ? value.bloodSugar.toString() : '-');
      setUridAcid(value.uricAcid ? value.uricAcid.toString() : '-');
      setCholesterol(value.cholesterol ? value.cholesterol.toString() : '-');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar translucent />
      <Header title="Riwayat Periksa" actionOne={() => navigation.goBack()} />
      <Gap height={20} />
      <View style={styles.inputWrapper}>
        <CustomInput
          label="ID Pasien"
          placeholder="ID Pasien . . ."
          value={idPasien}
          editable={false}
          onChangeText={() => null}
        />
        <Gap height={10} />
        <CustomSelect
          label="Pilih Tanggal Periksa"
          onSelect={(e: any) => selectTestDateHandler(e)}
          value={testDate}
          item={testDateList}
        />
        <Gap height={20} />
        <Text style={styles.title}>Hasil Periksa</Text>
        <Gap height={10} />
        <View style={styles.bodyTestWrapper}>
          <View style={styles.posturWrapper}>
            <CustomInput
              label="Tinggi Badan  (cm)"
              placeholder="Tinggi . . ."
              value={bodyHeight}
              editable={false}
              onChangeText={() => null}
            />
          </View>
          <Gap width={10} />
          <View style={styles.posturWrapper}>
            <CustomInput
              label="Berat Badan (Kg)"
              placeholder="Berat . . ."
              value={bodyWeight}
              editable={false}
              onChangeText={() => null}
            />
          </View>
          <Gap width={10} />
          <View style={styles.tempWrapper}>
            <CustomInput
              label="Suhu (°C)"
              placeholder="Suhu . . ."
              value={bodyTemperature}
              editable={false}
              onChangeText={() => null}
            />
          </View>
        </View>
        <Gap height={20} />
        <CustomInputBloodPressure
          label="Tekanan Darah (Sys/Dia/Pul)"
          systole={systole}
          setSystole={() => null}
          diastole={diastole}
          setDiastole={() => null}
          pulse={pulse}
          setPulse={() => null}
          editable={false}
        />
        <Gap height={20} />
        <CustomInput
          label="Gula Darah (mg/dL)"
          placeholder="Gula Darah . . ."
          value={bloodSugar}
          editable={false}
          onChangeText={() => null}
        />
        <Gap height={20} />
        <CustomInput
          label="Asam Urat (mg/dL)"
          placeholder="Asam Urat . . ."
          value={uridAcid}
          editable={false}
          onChangeText={() => null}
        />
        <Gap height={20} />
        <CustomInput
          label="Kolesterol (mg/dL)"
          placeholder="Kolesterol . . ."
          value={cholesterol}
          editable={false}
          onChangeText={() => null}
        />
      </View>
      <LoadingModal visible={isLoading} />
    </SafeAreaView>
  );
};

export default MedicalTestHistory;
