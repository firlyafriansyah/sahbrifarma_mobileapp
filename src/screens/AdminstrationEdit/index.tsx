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
  CustomInputPassword,
  CustomSelect,
  CustomStatusBar,
  Gap,
  Header,
  LoadingModal,
} from '../../components';
import styles from '../../styles/Screen/AdministrationProfileUpdate';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {
  DeleteAdministration,
  GetAdministrationAccountDetail,
  UpdateAdministrationAccountSuper,
  UpdateAdministrationStatus,
} from '../../services/Administration';
import {IsLogedInContext} from '../../context/AuthContext';
import {SafeAreaView} from 'react-native-safe-area-context';

const AdministrationEdit = ({route, navigation}: any) => {
  const {loggedInToken} = React.useContext(IsLogedInContext);
  const [id, setId] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [fullname, setFullname] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [date, setDate] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [year, setYear] = React.useState('');
  const [sex, setSex] = React.useState('');
  const [loginStatus, setLoginStatus] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const {param} = route.params;

  React.useEffect(() => {
    GetAdministrationAccountDetail(
      loggedInToken,
      param.uid_administration_account,
    )
      .then((res: any) => {
        setId(res.uidAdministrationAccount.toString());
        setUsername(res.username);
        setRole(res.role);
        setStatus(res.status);
        setFullname(res.fullname);
        setDateOfBirth(res.date_of_birth);
        setDate(res.date_of_birth.split('-')[2]);
        setMonth(res.date_of_birth.split('-')[1]);
        setYear(res.date_of_birth.split('-')[0]);
        setSex(res.sex);
        setLoginStatus(res.loggedIn);
      })
      .catch(err => {
        Alert.alert('Error!', err, [
          {
            text: 'Oke',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      });
  }, [loggedInToken, navigation, param]);

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
    if (!username || !fullname) {
      Alert.alert(
        'Error!',
        'Username atau Nama Lengkap tidak boleh di kosongkan!',
        [
          {
            text: 'Oke',
          },
        ],
      );
    } else {
      setIsLoading(true);
      const dataForUpdate = {
        username,
        password,
        role,
        fullname,
        dateOfBirth,
        sex,
      };
      UpdateAdministrationAccountSuper(dataForUpdate, id, loggedInToken)
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
    }
  };

  const statusChangeHandler = () => {
    Alert.alert(
      'Konfirmasi!',
      `Apakah anda yakin akan ${
        status === 'active' ? 'menonaktifkan' : 'mengaktifkan'
      } akun ini!`,
      [
        {
          text: 'Oke',
          onPress: () => {
            setIsLoading(true);
            UpdateAdministrationStatus(
              status === 'active' ? 'disabled' : 'activated',
              id,
              loggedInToken,
            )
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
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  const deleteHandler = () => {
    Alert.alert('Konfirmasi!', 'Apakah anda yakin akan menghapus akun ini!', [
      {
        text: 'Oke',
        onPress: () => {
          setIsLoading(true);
          DeleteAdministration(id, loggedInToken)
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
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
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
            title="Update Akun"
          />
        </View>
        {id ? (
          <ScrollView style={styles.inputWrapper}>
            <CustomInput
              label="ID Akun"
              placeholder="UID . . ."
              value={id}
              editable={false}
              onChangeText={(e: any) => setId(e)}
            />
            <Gap height={20} />
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
            <CustomInput
              label="Status Login"
              placeholder="Status Login . . ."
              value={loginStatus ? 'Aktif Login' : 'Tidak aktif login'}
              editable={false}
              onChangeText={() => null}
            />
            <Gap height={30} />
            <CustomButton
              buttonText={status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
              bgColor={status === 'active' ? '#c0392b' : '#27ae60'}
              onClick={() => statusChangeHandler()}
            />
            <Gap height={20} />
            <CustomButton
              buttonText="Hapus Akun"
              bgColor="#2c3e50"
              onClick={() => deleteHandler()}
            />
            <Gap height={40} />
          </ScrollView>
        ) : (
          <Text style={styles.laoding}>Loading . . .</Text>
        )}
        <LoadingModal visible={isLoading} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AdministrationEdit;
