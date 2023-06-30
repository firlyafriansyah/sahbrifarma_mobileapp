import {faPlus, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CustomInput,
  CustomInputTextArea,
  CustomSelect,
  CustomStatusBar,
  Gap,
  Header,
  ListMedicineRequest,
  LoadingModal,
} from '../../components';
import {IsLogedInContext} from '../../context/AuthContext';
import {AddDoctoralAndMedicine} from '../../services';
import styles from '../../styles/Screen/InputTest';

const DoctoralConsultationInput = ({route, navigation}: any) => {
  const {loggedInToken} = React.useContext(IsLogedInContext);
  const [allergies, setAllergies] = React.useState('');
  const [anamnesis, setAnamensis] = React.useState('');
  const [diagnosis, setDiagnosis] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [medicalTreatment, setMedicalTreatment] = React.useState('');
  const [medicine, setMedicine] = React.useState('');
  const [preparation, setPreparation] = React.useState('Tablet');
  const [dosage, setDosage] = React.useState('');
  const [rules, setRules] = React.useState('');
  const [medicineList, setMedicineList] = React.useState<string[]>([]);
  const [preparationList, setPreparationList] = React.useState<string[]>([]);
  const [dosageList, setDosageList] = React.useState<string[]>([]);
  const [rulesList, setRulesList] = React.useState<string[]>([]);
  const [isLaoding, setIsLoading] = React.useState(false);
  const [modalMedicineRequest, setModalMedicineRequest] = React.useState(false);
  const [error, setError] = React.useState('');
  const [indexMedicine, setIndexMedicine] = React.useState<number>(-1);
  const {idPasien} = route.params;

  const saveHandler = () => {
    if (anamnesis === '' || diagnosis === '') {
      Alert.alert(
        'Error!',
        'Anamnesis dan diagnosis harus di isi sesaui dengan kondisi pasien!',
      );
    } else {
      Alert.alert(
        'Konfirmasi Hasil Konsultasi Pasien!',
        'Semua data yang saya masukan sudah sesuai dengan kondisi pasien!',
        [
          {
            text: 'Ya',
            onPress: () => {
              setIsLoading(true);
              const data = {
                allergies,
                anamnesis,
                diagnosis,
                medicalTreatment,
                notes,
                medicine: medicineList.join('|'),
                preparation: preparationList.join('|'),
                dosage: dosageList.join('|'),
                rules: rulesList.join('|'),
              };
              AddDoctoralAndMedicine(data, idPasien, loggedInToken)
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

  const closeModalHandler = () => {
    setMedicine('');
    setPreparation('Tablet');
    setDosage('');
    setRules('');
    setError('');
    setModalMedicineRequest(false);
  };

  const saveMedicineRequestHandler = () => {
    if (!medicine || !dosage) {
      setError('Masukan resep obat!');
    } else {
      if (indexMedicine >= 0) {
        setMedicineList([
          ...medicineList.slice(0, indexMedicine),
          ...medicineList.slice(indexMedicine + 1, medicineList.length),
        ]);
        setPreparationList([
          ...preparationList.slice(0, indexMedicine),
          ...preparationList.slice(indexMedicine + 1, preparationList.length),
        ]);
        setDosageList([
          ...dosageList.slice(0, indexMedicine),
          ...dosageList.slice(indexMedicine + 1, dosageList.length),
        ]);
        setRulesList([
          ...rulesList.slice(0, indexMedicine),
          ...rulesList.slice(indexMedicine + 1, rulesList.length),
        ]);
      }
      setMedicineList(oldData => [...oldData, medicine]);
      setPreparationList(oldData => [...oldData, preparation]);
      setDosageList(oldData => [...oldData, dosage]);
      setRulesList(oldData => [...oldData, rules || '-']);
      closeModalHandler();
    }
  };

  const clickMedicineListHandler = (index: number) => {
    setIndexMedicine(index);
    setMedicine(medicineList[index]);
    setPreparation(preparationList[index]);
    setDosage(dosageList[index]);
    setRules(rulesList[index]);
    setModalMedicineRequest(true);
  };

  const deleteMedicineRequestHandler = (index: number) => {
    setMedicineList([
      ...medicineList.slice(0, index),
      ...medicineList.slice(index + 1, medicineList.length),
    ]);
    setPreparationList([
      ...preparationList.slice(0, index),
      ...preparationList.slice(index + 1, preparationList.length),
    ]);
    setDosageList([
      ...dosageList.slice(0, index),
      ...dosageList.slice(index + 1, dosageList.length),
    ]);
    setRulesList([
      ...rulesList.slice(0, index),
      ...rulesList.slice(index + 1, rulesList.length),
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.wrapper}>
        <CustomStatusBar
          translucent
          bgColor={
            modalMedicineRequest ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0)'
          }
        />
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
          />
          <Gap height={5} />
          <Text style={styles.allergiesText}>
            Pisahkan setiap alergi dengan koma (,)
          </Text>
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
            label="Medical Treatment"
            placeholder="Medical Treatment . . ."
            value={medicalTreatment}
            onChangeText={(e: any) => setMedicalTreatment(e)}
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
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                setIndexMedicine(-1);
                setModalMedicineRequest(true);
              }}>
              <FontAwesomeIcon icon={faPlus} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Gap height={20} />
          {medicineList.length <= 0 ? (
            <Text>Belum ada list obat yang akan diminta.</Text>
          ) : (
            medicineList.map((med, index) => (
              <ListMedicineRequest
                key={index}
                index={index}
                medicine={med}
                preparation={preparationList[index]}
                dosage={parseInt(dosageList[index], 10)}
                rules={rulesList[index]}
                onPress={() => clickMedicineListHandler(index)}
                deleteAction={() => deleteMedicineRequestHandler(index)}
              />
            ))
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      <LoadingModal visible={isLaoding} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalMedicineRequest}>
        <View style={styles.modalRequestContainer}>
          <View style={styles.modalRequestWrapper}>
            <View style={styles.modalRequestHeaderWrapper}>
              <Text style={styles.modalRequestTitle}>Tambah Obat</Text>
              <TouchableOpacity onPress={() => closeModalHandler()}>
                <FontAwesomeIcon icon={faXmark} size={23} />
              </TouchableOpacity>
            </View>
            <Gap height={20} />
            {error && (
              <>
                <Text style={styles.error}>{error}</Text>
                <Gap height={10} />
              </>
            )}
            <CustomInput
              label="Medicine"
              placeholder="Medicine . . ."
              onChangeText={(e: any) => setMedicine(e)}
              value={medicine}
            />
            <Gap height={10} />
            <CustomSelect
              label="Preparation"
              onSelect={(e: any) => setPreparation(e)}
              value={preparation}
              item={[
                'Liquid',
                'Tablet',
                'Capsules',
                'Topical',
                'Drops',
                'Inhalers',
                'Injections',
              ]}
            />
            <Gap height={10} />
            <CustomInput
              label="Dosage (gr)"
              placeholder="Dosage . . ."
              keyboardType="numeric"
              onChangeText={(e: any) => setDosage(e)}
              value={dosage}
            />
            <Gap height={10} />
            <CustomInput
              label="Rules"
              placeholder="Rules . . ."
              onChangeText={(e: any) => setRules(e)}
              value={rules}
            />
            <Gap height={40} />
            <View style={styles.modalRequestButtonWrapper}>
              <TouchableOpacity onPress={() => saveMedicineRequestHandler()}>
                <Text style={styles.modalRequestButtonText}>
                  {indexMedicine >= 0 ? 'Update' : 'Save'}
                </Text>
              </TouchableOpacity>
              <Gap width={5} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DoctoralConsultationInput;
