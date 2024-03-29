import React from 'react';
import {
  View,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Text,
} from 'react-native';
import {
  CustomButton,
  CustomInput,
  CustomInputDate,
  CustomSelect,
  CustomStatusBar,
  Gap,
  Header,
  LoadingModal,
} from '../../components';
import styles from '../../styles/Screen/AdministrationProfileUpdate';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {UpdateAdministrationAccount} from '../../services/Administration';
import {IsLogedInContext} from '../../context/AuthContext';
import {SafeAreaView} from 'react-native-safe-area-context';

const AdministrationProfileUpdate = ({route, navigation}: any) => {
  const {loggedInToken} = React.useContext(IsLogedInContext);
  const [fullname, setFullname] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [date, setDate] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [year, setYear] = React.useState('');
  const [sex, setSex] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const {data} = route.params;

  React.useEffect(() => {
    setFullname(data.fullname);
    setDateOfBirth(data.date_of_birth);
    setDate(data.date_of_birth.split('-')[2]);
    setMonth(data.date_of_birth.split('-')[1]);
    setYear(data.date_of_birth.split('-')[0]);
    setSex(data.sex);
  }, [data]);

  const dateHandler = () => {
    DateTimePickerAndroid.open({
      value: new Date(dateOfBirth),
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

  const updateHandler = () => {
    if (!fullname) {
      Alert.alert('Error!', 'Nama Lengkap tidak boleh di kosongkan!', [
        {
          text: 'Oke',
        },
      ]);
    } else {
      setIsLoading(true);
      const dataForUpdate = {
        fullname,
        dateOfBirth,
        sex,
      };
      UpdateAdministrationAccount(dataForUpdate, loggedInToken)
        .then(() => {
          navigation.navigate('AdministrationProfile');
        })
        .catch((err: any) => {
          Alert.alert('Error!', err, [
            {
              text: 'Oke',
              onPress: () => {
                navigation.navigate('AdministrationProfile');
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
            actionTwo={() => updateHandler()}
            actionTwoText="Simpan"
            title="Informasi Akun"
          />
        </View>
        <ScrollView style={styles.inputWrapper}>
          <CustomInput
            label="ID Account"
            placeholder="UID . . ."
            value={data.uidAdministrationAccount.toString()}
            editable={false}
            onChangeText={() => null}
          />
          <Gap height={20} />
          <CustomInput
            label="Username"
            placeholder="Username . . ."
            value={data.username}
            editable={false}
            onChangeText={() => null}
          />
          <Gap height={20} />
          <CustomInput
            label="Role"
            placeholder="Role . . ."
            value={data.role.charAt(0).toUpperCase() + data.role.slice(1)}
            editable={false}
            onChangeText={() => null}
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
          <Text style={styles.statusLabel}>Status:</Text>
          <CustomButton
            buttonText={data.status}
            bgColor={data.status === 'active' ? '#27ae60' : '#c0392b'}
            onClick={() => null}
          />
          <Gap height={20} />
        </ScrollView>
        <LoadingModal visible={isLoading} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AdministrationProfileUpdate;
