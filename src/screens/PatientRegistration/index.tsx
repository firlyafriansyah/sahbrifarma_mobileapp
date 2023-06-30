import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import React from 'react';
import {Alert, KeyboardAvoidingView, ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
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
import {IsLogedInContext} from '../../context/AuthContext';
import {PatientRegistrationService} from '../../services';
import styles from '../../styles/Screen/AdministrationProfileUpdate';

const PatientRegistration = ({navigation}: any) => {
  const {loggedInToken, loggedInRole} = React.useContext(IsLogedInContext);
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [emergencyPhoneNumber, setEmergencyPhoneNumber] = React.useState('');
  const [sex, setSex] = React.useState('Laki - Laki');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [dateForDateOfBirth, setDateForDateOfBirth] = React.useState('');
  const [monthForDateOfBirth, setMonthForDateOfBirth] = React.useState('');
  const [yearForDateOfBirth, setYearForDateOfBirth] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const dateHandler = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
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

  const saveHandler = () => {
    if (!name || !address) {
      Alert.alert(
        'Error!',
        'Nama Lengkap atau Alamat tidak boleh di kosongkan!',
        [
          {
            text: 'Oke',
          },
        ],
      );
    } else {
      setIsLoading(true);
      const dataForUpdate = {
        name,
        address,
        dateOfBirth,
        sex,
        phoneNumber,
        emergencyPhoneNumber,
      };

      PatientRegistrationService(dataForUpdate, loggedInToken)
        .then(res => {
          navigation.navigate('PatientDashboard', {idPasien: res});
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
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <CustomStatusBar translucent />
        <View style={styles.headerWrapper}>
          <Header
            actionOne={() => navigation.goBack()}
            actionTwo={() => saveHandler()}
            actionTwoText="Simpan"
            title="Pendaftaran Pasien"
          />
        </View>
        <ScrollView style={styles.inputWrapper}>
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

export default PatientRegistration;
