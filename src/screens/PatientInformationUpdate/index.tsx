import React from 'react';
import {View, Alert, KeyboardAvoidingView, ScrollView} from 'react-native';
import {
  CustomInput,
  CustomInputDate,
  CustomInputTextArea,
  CustomSelect,
  CustomStatusBar,
  Gap,
  Header,
  LoadingModal,
} from '../../components';
import styles from '../../styles/Screen/AdministrationProfileUpdate';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {IsLogedInContext} from '../../context/AuthContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UpdatePatientInformation} from '../../services';

const PatientInformationUpdate = ({route, navigation}: any) => {
  const {loggedInToken, loggedInRole} = React.useContext(IsLogedInContext);
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [emergencyPhoneNumber, setEmergencyPhoneNumber] = React.useState('');
  const [sex, setSex] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [dateForDateOfBirth, setDateForDateOfBirth] = React.useState('');
  const [monthForDateOfBirth, setMonthForDateOfBirth] = React.useState('');
  const [yearForDateOfBirth, setYearForDateOfBirth] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const {data} = route.params;

  React.useEffect(() => {
    setName(data.name);
    setAddress(data.address);
    setPhoneNumber(data.phoneNumber || '');
    setEmergencyPhoneNumber(data.emergencyPhoneNumber || '');
    setSex(data.sex);
    setDateOfBirth(data.dateOfBirth);
    setDateForDateOfBirth(data.dateOfBirth.split('-')[2]);
    setMonthForDateOfBirth(data.dateOfBirth.split('-')[1]);
    setYearForDateOfBirth(data.dateOfBirth.split('-')[0]);
  }, [data]);

  const dateHandler = () => {
    DateTimePickerAndroid.open({
      value: new Date(dateOfBirth),
      onChange: (e: any) => {
        setDateOfBirth(
          new Date(e.nativeEvent.timestamp).toISOString().split('T')[0],
        );
        setDateForDateOfBirth(
          new Date(e.nativeEvent.timestamp)
            .toISOString()
            .split('T')[0]
            .split('-')[2],
        );
        setMonthForDateOfBirth(
          new Date(e.nativeEvent.timestamp)
            .toISOString()
            .split('T')[0]
            .split('-')[1],
        );
        setYearForDateOfBirth(
          new Date(e.nativeEvent.timestamp)
            .toISOString()
            .split('T')[0]
            .split('-')[0],
        );
      },
      mode: 'date',
      is24Hour: true,
    });
  };

  const updateHandler = () => {
    setIsLoading(true);
    const dataForUpdate = {
      id: data.uidPatient,
      name,
      address,
      dateOfBirth,
      sex,
      phoneNumber,
      emergencyPhoneNumber,
    };

    UpdatePatientInformation(dataForUpdate, loggedInToken)
      .then(() => {
        navigation.goBack();
      })
      .catch((err: any) => {
        Alert.alert('Error!', err, [
          {
            text: 'Oke',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <CustomStatusBar translucent />
        <View style={styles.headerWrapper}>
          {loggedInRole === 'frontdesk' ? (
            <Header
              actionOne={() => navigation.goBack()}
              actionTwo={() => updateHandler()}
              actionTwoText="Save"
              title="Patient Information"
            />
          ) : (
            <Header
              actionOne={() => navigation.goBack()}
              title="Patient Information"
            />
          )}
        </View>
        <ScrollView style={styles.inputWrapper}>
          <CustomInput
            label="ID Pasien"
            placeholder="ID Pasien . . ."
            value={data.uidPatient.toString()}
            editable={false}
            onChangeText={() => null}
          />
          <Gap height={20} />
          <CustomInput
            label="Nama Lengkap"
            placeholder="Nama Lengkap . . ."
            value={name}
            editable={loggedInRole === 'frontdesk'}
            onChangeText={(e: any) => setName(e)}
          />
          <Gap height={20} />
          <CustomInputTextArea
            label="Alamat"
            placeholder="Alamat . . ."
            value={address}
            editable={loggedInRole === 'frontdesk'}
            onChangeText={(e: any) => setAddress(e)}
          />
          <Gap height={20} />
          <CustomInput
            label="Nomor Telepon"
            placeholder="Nomor Telepon . . ."
            value={phoneNumber}
            editable={loggedInRole === 'frontdesk'}
            onChangeText={(e: any) => setPhoneNumber(e)}
            keyboardType="numeric"
          />
          <Gap height={20} />
          <CustomInput
            label="Nomor Telepon Darurat"
            placeholder="Nomor Telepon Darurat . . ."
            value={emergencyPhoneNumber}
            editable={loggedInRole === 'frontdesk'}
            onChangeText={(e: any) => setEmergencyPhoneNumber(e)}
            keyboardType="numeric"
          />
          <Gap height={20} />
          <CustomInputDate
            label="Tanggal Lahir"
            date={dateForDateOfBirth}
            setDate={(e: any) => setDateForDateOfBirth(e)}
            month={monthForDateOfBirth}
            setMonth={(e: any) => setMonthForDateOfBirth(e)}
            year={yearForDateOfBirth}
            setYear={(e: any) => setYearForDateOfBirth(e)}
            iconAction={() => dateHandler()}
            editable={loggedInRole === 'frontdesk'}
          />
          <Gap height={20} />
          <CustomSelect
            label="Jenis Kelamin"
            onSelect={(e: any) => setSex(e)}
            value={sex}
            item={['Laki - Laki', 'Perempuan']}
            editable={loggedInRole === 'frontdesk'}
          />
          <Gap height={20} />
        </ScrollView>
        <LoadingModal visible={isLoading} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PatientInformationUpdate;
