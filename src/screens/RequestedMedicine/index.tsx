import * as React from 'react';
import {Text, Alert, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Gap,
  Header,
  ListMedicineRequest,
  LoadingModal,
  PatientCard,
} from '../../components';
import {IsLogedInContext} from '../../context/AuthContext';
import {FinishMedicineRequest, GetMedicineRequest} from '../../services';
import styles from '../../styles/Screen/RequestedMedicine';
import {AgeCalculator} from '../../utils';

const RequestedMedicine = ({route, navigation}: any) => {
  const {loggedInToken} = React.useContext(IsLogedInContext);
  const [name, setName] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [sex, setSex] = React.useState('');
  const [medicine, setMedicine] = React.useState<string[]>([]);
  const [preparation, setPreparation] = React.useState<string[]>([]);
  const [dosage, setDosage] = React.useState<string[]>([]);
  const [rules, setRules] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const {idPasien} = route.params;

  React.useEffect(() => {
    setIsLoading(true);
    GetMedicineRequest(idPasien, loggedInToken)
      .then((res: any) => {
        setName(res.patient.name);
        setDateOfBirth(res.patient.dateOfBirth);
        setSex(res.patient.sex);
        res.medicineList.medicine.split('|').map((v: any) => {
          setMedicine(oldData => [...oldData, v]);
        });
        res.medicineList.preparation.split('|').map((v: any) => {
          setPreparation(oldData => [...oldData, v]);
        });
        res.medicineList.dosage.split('|').map((v: any) => {
          setDosage(oldData => [...oldData, v]);
        });
        res.medicineList.rules.split('|').map((v: any) => {
          setRules(oldData => [...oldData, v]);
        });
      })
      .catch((err: any) => Alert.alert('Error', err))
      .finally(() => setIsLoading(false));
  }, [idPasien, loggedInToken]);

  const finishHandler = () => {
    Alert.alert(
      'Konfirmasi Hasil Permintaan Obat!',
      'Obat sudah selesai disiapkan!',
      [
        {
          text: 'Ya',
          onPress: () => {
            setIsLoading(true);
            FinishMedicineRequest(idPasien, loggedInToken)
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
  };

  return (
    <SafeAreaView>
      <View style={styles.headerWrapper}>
        <Header
          title="Rekam Medis"
          actionOne={() => navigation.goBack()}
          actionTwoText="Selesai"
          actionTwo={() => finishHandler()}
        />
      </View>
      <ScrollView style={styles.container}>
        <PatientCard
          name={name}
          id={idPasien}
          birthday={AgeCalculator(dateOfBirth)}
          gender={sex}
          onPress={() => null}
        />
        <Gap height={30} />
        <Text style={styles.subTitle}>Permintaan Obat</Text>
        {medicine.map((v, index) => (
          <ListMedicineRequest
            key={index}
            index={index}
            medicine={v}
            preparation={preparation[index]}
            dosage={parseInt(dosage[index], 10)}
            rules={rules[index]}
            deleteMode={false}
          />
        ))}
      </ScrollView>
      <LoadingModal visible={isLoading} />
    </SafeAreaView>
  );
};

export default RequestedMedicine;
