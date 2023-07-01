import React from 'react';
import {Alert, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CustomInput,
  CustomInputBloodPressure,
  CustomStatusBar,
  Gap,
  Header,
  LoadingModal,
} from '../../components';
import {IsLogedInContext} from '../../context/AuthContext';
import {GetMedicalTestDetail} from '../../services';
import styles from '../../styles/Screen/History';

const MedicalTestHistory = ({route, navigation}: any) => {
  const {loggedInToken} = React.useContext(IsLogedInContext);
  const [bodyHeight, setBodyHeight] = React.useState('');
  const [bodyWeight, setBodyWeight] = React.useState('');
  const [bodyTemperature, setBodyTemperature] = React.useState('');
  const [systole, setSystole] = React.useState('');
  const [diastole, setDiastole] = React.useState('');
  const [pulse, setPulse] = React.useState('');
  const [bloodSugar, setBloodSugar] = React.useState('');
  const [uricAcid, setUricAcid] = React.useState('');
  const [cholesterol, setCholesterol] = React.useState('');
  const [isLoading, setIsLaoding] = React.useState(false);
  const {id} = route.params;

  React.useEffect(() => {
    setIsLaoding(true);
    GetMedicalTestDetail(id, loggedInToken)
      .then((res: any) => {
        setBodyHeight(res.bodyHeight);
        setBodyWeight(res.bodyWeight);
        setBodyTemperature(res.bodyTemperature);
        setSystole(res.bloodPressure.split('/')[0]);
        setDiastole(res.bloodPressure.split('/')[1]);
        setPulse(res.bloodPressure.split('/')[2]);
        setBloodSugar(res.bloodSugar);
        setUricAcid(res.uricAcid);
        setCholesterol(res.cholesterol);
      })
      .catch((err: any) => Alert.alert('Error!', err))
      .finally(() => setIsLaoding(false));
  }, [id, loggedInToken, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar translucent />
      <Header
        title="Hasil Periksa Kes.."
        actionOne={() => navigation.goBack()}
      />
      <Gap height={20} />
      <View style={styles.inputWrapper}>
        <Gap height={10} />
        <View style={styles.bodyTestWrapper}>
          <View style={styles.posturWrapper}>
            <CustomInput
              label="Tinggi Badan  (cm)"
              placeholder="Tinggi . . ."
              value={bodyHeight && bodyHeight.toString()}
              onChangeText={() => {}}
            />
          </View>
          <Gap width={10} />
          <View style={styles.posturWrapper}>
            <CustomInput
              label="Berat Badan (Kg)"
              placeholder="Berat . . ."
              value={bodyWeight && bodyWeight.toString()}
              onChangeText={() => {}}
            />
          </View>
          <Gap width={10} />
          <View style={styles.tempWrapper}>
            <CustomInput
              label="Suhu (°C)"
              placeholder="Suhu . . ."
              value={bodyTemperature && bodyTemperature.toString()}
              onChangeText={() => {}}
            />
          </View>
        </View>
        <Gap height={20} />
        <CustomInputBloodPressure
          label="Tekanan Darah (Sys/Dia/Pul)"
          systole={systole}
          setSystole={() => {}}
          diastole={diastole}
          setDiastole={() => {}}
          pulse={pulse}
          setPulse={() => {}}
        />
        <Gap height={20} />
        <CustomInput
          label="Gula Darah (mg/dL)"
          placeholder="Gula Darah . . ."
          value={bloodSugar && bloodSugar.toString()}
          onChangeText={() => {}}
        />
        <Gap height={20} />
        <CustomInput
          label="Asam Urat (mg/dL)"
          placeholder="Asam Urat . . ."
          value={uricAcid && uricAcid.toString()}
          onChangeText={() => {}}
        />
        <Gap height={20} />
        <CustomInput
          label="Kolesterol (mg/dL)"
          placeholder="Kolesterol . . ."
          value={cholesterol && cholesterol.toString()}
          onChangeText={() => {}}
        />
      </View>
      <LoadingModal visible={isLoading} />
    </SafeAreaView>
  );
};

export default MedicalTestHistory;
