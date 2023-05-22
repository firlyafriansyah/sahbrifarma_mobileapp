import React from 'react';
import {Alert, KeyboardAvoidingView, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CustomInput,
  CustomInputTextArea,
  CustomStatusBar,
  Gap,
  Header,
  LoadingModal,
} from '../../components';
import {IsLogedInContext} from '../../context/AuthContext';
import {AddMedicalTest} from '../../services';
import styles from '../../styles/Screen/InputTest';

const DoctoralConsultationInput = ({route, navigation}: any) => {
  const {loggedInToken} = React.useContext(IsLogedInContext);
  const [allergies, setAllergies] = React.useState('');
  const [anamnesis, setAnamensis] = React.useState('');
  const [diagnosis, setDiagnosis] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [isLaoding, setIsLoading] = React.useState(false);
  const {idPasien} = route.params;
  const input1 = React.useRef(null);
  const input2 = React.useRef(null);

  const saveHandler = () => {
    if (anamnesis === '' || diagnosis === '') {
      Alert.alert(
        'Error!',
        'Anamnesis dan diagnosis harus di isi sesaui dengan kondisi pasien!',
      );
    } else {
      const data = {
        allergies,
        anamnesis,
        diagnosis,
        notes,
      };
      Alert.alert(
        'Konfirmasi Hasil Konsultasi Pasien!',
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
          title="Konsultasi & Obat"
          actionOne={() => navigation.goBack()}
          actionTwoText="Save"
          actionTwo={() => saveHandler()}
        />
        <Gap height={20} />
        <ScrollView style={styles.inputWrapper}>
          <Gap height={10} />
          <Text style={styles.title}>Hasil Konsultasi</Text>
          <Gap height={10} />
          <CustomInput
            label="Alergi"
            placeholder="Alergi . . ."
            value={allergies}
            onChangeText={(e: any) => setAllergies(e)}
            onSubmitEditing={() => input1.current.focus()}
          />
          <Gap height={5} />
          <Text>Pisahkan setiap alergi dengan koma (,)</Text>
          <Gap height={20} />
          <CustomInputTextArea
            label="Anamnesis"
            placeholder="Anamnesis . . ."
            value={anamnesis}
            onChangeText={(e: any) => setAnamensis(e)}
            ref={input1}
          />
          <Gap height={20} />
          <CustomInputTextArea
            label="Diagnosis"
            placeholder="Diagnosis . . ."
            value={diagnosis}
            onChangeText={(e: any) => setDiagnosis(e)}
          />
          <Gap height={20} />
          <CustomInputTextArea
            label="Catatan Tamabahan"
            placeholder="Catatan . . ."
            value={notes}
            onChangeText={(e: any) => setNotes(e)}
          />
          <Gap height={40} />
          <Text style={styles.title}>Request Obat Apoteker</Text>
        </ScrollView>
      </KeyboardAvoidingView>
      <LoadingModal visible={isLaoding} />
    </SafeAreaView>
  );
};

export default DoctoralConsultationInput;
