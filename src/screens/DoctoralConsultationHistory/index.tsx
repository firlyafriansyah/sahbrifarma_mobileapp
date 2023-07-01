import React from 'react';
import {Alert, KeyboardAvoidingView, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CustomInput,
  CustomInputTextArea,
  CustomStatusBar,
  Gap,
  Header,
  ListMedicineRequest,
  LoadingModal,
} from '../../components';
import {IsLogedInContext} from '../../context/AuthContext';
import {GetDoctoralConsultationDetail, GetMedicineDetail} from '../../services';
import styles from '../../styles/Screen/InputTest';

const DoctoralConsultationHistory = ({route, navigation}: any) => {
  const {loggedInToken} = React.useContext(IsLogedInContext);
  const [allergies, setAllergies] = React.useState('');
  const [anamnesis, setAnamensis] = React.useState('');
  const [diagnosis, setDiagnosis] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [medicalTreatment, setMedicalTreatment] = React.useState('');
  const [medicine, setMedicine] = React.useState<string[]>([]);
  const [preparation, setPreparation] = React.useState<string[]>([]);
  const [dosage, setDosage] = React.useState<string[]>([]);
  const [rules, setRules] = React.useState<string[]>([]);
  const [isLaoding, setIsLoading] = React.useState(false);
  const {uidConsultation, uidMedicine} = route.params;

  React.useEffect(() => {
    setIsLoading(true);
    GetDoctoralConsultationDetail(uidConsultation, loggedInToken)
      .then((res: any) => {
        setAllergies(res.allergies);
        setAnamensis(res.anamnesis);
        setDiagnosis(res.diagnosis);
        setNotes(res.notes);
        setMedicalTreatment(res.medicalTreatment);
      })
      .catch(err => Alert.alert('Error', err))
      .finally(() => setIsLoading(false));
  }, [loggedInToken, uidConsultation]);

  React.useEffect(() => {
    setIsLoading(true);
    GetMedicineDetail(uidMedicine, loggedInToken)
      .then((res: any) => {
        res.medicine.split('|').map((v: any) => {
          setMedicine(oldData => [...oldData, v]);
        });
        res.preparation.split('|').map((v: any) => {
          setPreparation(oldData => [...oldData, v]);
        });
        res.dosage.split('|').map((v: any) => {
          setDosage(oldData => [...oldData, v]);
        });
        res.rules.split('|').map((v: any) => {
          setRules(oldData => [...oldData, v]);
        });
      })
      .catch(err => Alert.alert('Error', err))
      .finally(() => setIsLoading(false));
  }, [loggedInToken, uidMedicine]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.wrapper}>
        <CustomStatusBar translucent />
        <Header
          title="Hasil Konsultasi ..."
          actionOne={() => navigation.goBack()}
        />
        <Gap height={20} />
        <ScrollView style={styles.inputWrapper}>
          <Gap height={10} />
          <CustomInput
            label="Alergi"
            placeholder="Alergi . . ."
            value={allergies}
            onChangeText={() => {}}
          />
          <Gap height={20} />
          <CustomInputTextArea
            label="Anamnesis"
            placeholder="Anamnesis . . ."
            value={anamnesis}
            heightDefault={35}
            onChangeText={() => {}}
          />
          <Gap height={20} />
          <CustomInputTextArea
            label="Diagnosis"
            placeholder="Diagnosis . . ."
            value={diagnosis}
            heightDefault={35}
            onChangeText={() => {}}
          />
          <Gap height={20} />
          <CustomInputTextArea
            label="Medical Treatment"
            placeholder="Medical Treatment . . ."
            value={medicalTreatment}
            heightDefault={35}
            onChangeText={() => {}}
          />
          <Gap height={20} />
          <CustomInputTextArea
            label="Catatan Tamabahan"
            placeholder="Catatan . . ."
            value={notes}
            heightDefault={35}
            onChangeText={() => {}}
          />
          <Gap height={30} />
          <View style={styles.requestMedicineWrapper}>
            <Text style={styles.title}>Resep Obat</Text>
          </View>
          <Gap height={20} />
          {medicine.length <= 0 ? (
            <Text style={styles.medicineEmpty}>
              Tidak ada permintaan obat pada pemeriksaan ini.
            </Text>
          ) : (
            medicine.map((v, index) => (
              <ListMedicineRequest
                key={index}
                index={index}
                medicine={v}
                preparation={preparation[index]}
                dosage={parseInt(dosage[index], 10)}
                rules={rules[index]}
                deleteMode={false}
              />
            ))
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      <LoadingModal visible={isLaoding} />
    </SafeAreaView>
  );
};

export default DoctoralConsultationHistory;
