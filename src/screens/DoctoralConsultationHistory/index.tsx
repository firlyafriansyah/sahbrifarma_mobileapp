import React from 'react';
import {KeyboardAvoidingView, Text, TouchableOpacity, View} from 'react-native';
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
import styles from '../../styles/Screen/InputTest';

const DoctoralConsultationHistory = ({route, navigation}: any) => {
  const {loggedInToken} = React.useContext(IsLogedInContext);
  const [allergies, setAllergies] = React.useState('');
  const [anamnesis, setAnamensis] = React.useState('');
  const [diagnosis, setDiagnosis] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [medicine, setMedicine] = React.useState('');
  const [preparation, setPreparation] = React.useState('Injections');
  const [dosage, setDosage] = React.useState('');
  const [rules, setRules] = React.useState('');
  const [medicineList, setMedicineList] = React.useState<string[]>([]);
  const [preparationList, setPreparationList] = React.useState<string[]>([]);
  const [dosageList, setDosageList] = React.useState<string[]>([]);
  const [rulesList, setRulesList] = React.useState<string[]>([]);
  const [isLaoding, setIsLoading] = React.useState(false);
  const {idPasien} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.wrapper}>
        <CustomStatusBar translucent />
        <Header
          title="Konsultasi & Obat"
          actionOne={() => navigation.goBack()}
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
          />
          <Gap height={5} />
          <Text>Pisahkan setiap alergi dengan koma (,)</Text>
          <Gap height={20} />
          <CustomInputTextArea
            label="Anamnesis"
            placeholder="Anamnesis . . ."
            value={anamnesis}
            onChangeText={(e: any) => setAnamensis(e)}
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
          <View style={styles.requestMedicineWrapper}>
            <Text style={styles.title}>Request Obat Apoteker</Text>
          </View>
          <Gap height={20} />
          {medicineList.length <= 0 ? (
            <Text>Tidak ada permintaan obat pada pemeriksaan ini.</Text>
          ) : (
            medicineList.map((med, index) => (
              <>
                <TouchableOpacity
                  key={index}
                  style={styles.listMedicineRequestCard}
                  onPress={() => null}>
                  <View>
                    <Text style={styles.medicineRequest}>
                      {med} - {preparationList[index]} - {dosageList[index]}gr
                    </Text>
                    <Text style={styles.medicineRequest}>
                      {rulesList[index]}
                    </Text>
                  </View>
                </TouchableOpacity>
                <Gap height={10} />
              </>
            ))
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      <LoadingModal visible={isLaoding} />
    </SafeAreaView>
  );
};

export default DoctoralConsultationHistory;
