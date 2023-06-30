import React from 'react';
import {View, Alert, KeyboardAvoidingView, ScrollView} from 'react-native';
import {
  CustomInput,
  CustomInputDate,
  CustomInputPassword,
  CustomSelect,
  CustomStatusBar,
  Gap,
  Header,
  LoadingModal,
} from '../../components';
import styles from '../../styles/Screen/AdministrationProfileUpdate';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {RegisterAdministration} from '../../services/Administration';
import {IsLogedInContext} from '../../context/AuthContext';
import {SafeAreaView} from 'react-native-safe-area-context';

const AdministrationRegistration = ({navigation}: any) => {
  const {loggedInToken} = React.useContext(IsLogedInContext);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState('frontdesk');
  const [fullname, setFullname] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [date, setDate] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [year, setYear] = React.useState('');
  const [sex, setSex] = React.useState('Laki - Laki');
  const [status, setStatus] = React.useState('active');
  const [isLoading, setIsLoading] = React.useState(false);

  const dateHandler = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: (e: any) => {
        setDateOfBirth(
          new Date(e.nativeEvent.timestamp).toISOString().split('T')[0],
        );
        setDate(
          new Date(e.nativeEvent.timestamp)
            .toISOString()
            .split('T')[0]
            .split('-')[2],
        );
        setMonth(
          new Date(e.nativeEvent.timestamp)
            .toISOString()
            .split('T')[0]
            .split('-')[1],
        );
        setYear(
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
    setIsLoading(true);
    const dataForUpdate = {
      username,
      password,
      role,
      fullname,
      dateOfBirth,
      sex,
    };
    RegisterAdministration(dataForUpdate, loggedInToken)
      .then(() => {
        navigation.navigate('AdministrationManage');
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
          <Header
            actionOne={() => navigation.goBack()}
            actionTwo={() => saveHandler()}
            actionTwoText="Save"
            title="Profile Update"
          />
        </View>
        <ScrollView style={styles.inputWrapper}>
          <CustomInput
            label="Username"
            placeholder="Username . . ."
            value={username}
            onChangeText={(e: any) => setUsername(e.trim())}
          />
          <Gap height={20} />
          <CustomInputPassword
            label="Password"
            placeholder="Password . . ."
            value={password}
            onChangeText={(e: any) => setPassword(e)}
          />
          <Gap height={20} />
          <CustomSelect
            label="Role"
            onSelect={(e: any) => setRole(e)}
            value={role}
            item={['frontdesk', 'nurse', 'doctor', 'pharmacist']}
          />
          <Gap height={20} />
          <CustomInput
            label="Nama Lengkap"
            placeholder="Fullname . . ."
            value={fullname}
            onChangeText={(e: any) => setFullname(e)}
          />
          <Gap height={20} />
          <CustomInputDate
            label="Tanggal Lahir"
            date={date}
            setDate={(e: any) => setDate(e)}
            month={month}
            setMonth={(e: any) => setMonth(e)}
            year={year}
            setYear={(e: any) => setYear(e)}
            iconAction={() => dateHandler()}
          />
          <Gap height={20} />
          <CustomSelect
            label="Jenis Kelamin"
            onSelect={(e: any) => setSex(e)}
            value={sex}
            item={['Laki - Laki', 'Perempuan']}
          />
          <Gap height={20} />
          <CustomSelect
            label="Status"
            onSelect={(e: any) => setStatus(e)}
            value={status}
            item={['active', 'inactive']}
          />
          <Gap height={20} />
        </ScrollView>
        <LoadingModal visible={isLoading} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AdministrationRegistration;
