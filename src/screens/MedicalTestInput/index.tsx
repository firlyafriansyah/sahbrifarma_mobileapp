import React from 'react';
import {Alert, KeyboardAvoidingView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
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
import {AddMedicalTest} from '../../services';
import styles from '../../styles/Screen/InputTest';

const MedicalTestInput = ({route, navigation}: any) => {
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
  const [isLaoding, setIsLoading] = React.useState(false);
  const {idPasien} = route.params;

  const saveHandler = () => {
    if (
      bodyHeight === '' ||
      bodyWeight === '' ||
      bodyTemperature === '' ||
      systole === '' ||
      diastole === '' ||
      pulse === ''
    ) {
      Alert.alert(
        'Error!',
        'Tinggi badan, berat badan, suhu tubuh, dan tekanan darah harus di isi sesaui dengan kondisi pasien!',
      );
    } else {
      const data = {
        bodyHeight,
        bodyWeight,
        bodyTemperature,
        bloodPressure: `${systole}/${diastole}/${pulse}`,
        bloodSugar,
        uricAcid,
        cholesterol,
      };
      Alert.alert(
        'Konfirmasi Hasil Periksa Kesehatan!',
        'Semua data yang saya masukan sudah sesuai dengan kondisi pasien!',
        [
          {
            text: 'Ya',
            onPress: () => {
              setIsLoading(true);
              AddMedicalTest(data, idPasien, loggedInToken)
                .then(() =>
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'AdministrationProfile'}],
                  }),
                )
                .catch(err => Alert.alert('Error!', err))
                .finally(() => setIsLoading(false));
            },
          },
          {
            text: 'Batal',
            style: 'cancel',
          },
        ],
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.wrapper}>
        <CustomStatusBar translucent />
        <Header
          title="Input Hasil Periksa ..."
          actionOne={() => navigation.goBack()}
          actionTwoText="Simpan"
          actionTwo={() => saveHandler()}
        />
        <Gap height={20} />
        <ScrollView style={styles.inputWrapper}>
          <Gap height={20} />
          <CustomInput
            label="Tinggi Badan  (cm)"
            placeholder="Tinggi . . ."
            value={bodyHeight}
            onChangeText={(e: any) => setBodyHeight(e)}
            keyboardType="numeric"
          />
          <Gap height={20} />
          <CustomInput
            label="Berat Badan (Kg)"
            placeholder="Berat . . ."
            value={bodyWeight}
            onChangeText={(e: any) => setBodyWeight(e)}
            keyboardType="numeric"
          />
          <Gap height={20} />
          <CustomInput
            label="Suhu (°C)"
            placeholder="Suhu . . ."
            value={bodyTemperature}
            onChangeText={(e: any) => setBodyTemperature(e)}
            keyboardType="numeric"
          />
          <Gap height={20} />
          <CustomInputBloodPressure
            label="Tekanan Darah (Sys/Dia/Pul)"
            systole={systole}
            setSystole={(e: any) => setSystole(e)}
            diastole={diastole}
            setDiastole={(e: any) => setDiastole(e)}
            pulse={pulse}
            setPulse={(e: any) => setPulse(e)}
          />
          <Gap height={20} />
          <CustomInput
            label="Gula Darah (mg/dL)"
            placeholder="Gula Darah . . ."
            value={bloodSugar}
            onChangeText={(e: any) => setBloodSugar(e)}
            keyboardType="numeric"
          />
          <Gap height={20} />
          <CustomInput
            label="Asam Urat (mg/dL)"
            placeholder="Asam Urat . . ."
            value={uricAcid}
            onChangeText={(e: any) => setUricAcid(e)}
            keyboardType="numeric"
          />
          <Gap height={20} />
          <CustomInput
            label="Kolesterol (mg/dL)"
            placeholder="Kolesterol . . ."
            value={cholesterol}
            onChangeText={(e: any) => setCholesterol(e)}
            keyboardType="numeric"
          />
          <Gap height={20} />
        </ScrollView>
      </KeyboardAvoidingView>
      <LoadingModal visible={isLaoding} />
    </SafeAreaView>
  );
};

export default MedicalTestInput;
