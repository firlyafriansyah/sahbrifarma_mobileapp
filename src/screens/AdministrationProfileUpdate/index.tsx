import RNDateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Dropdown from 'react-native-input-select';
import {CustomInput, CustomStatusBar, Gap, Header} from '../../components';
import styles from '../../styles/Screen/AdministrationProfileUpdate';

const AdministrationProfileUpdate = ({route, navigation}: any) => {
  const [fullname, setFullname] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [sex, setSex] = React.useState('');
  const {data} = route.params;

  React.useEffect(() => {
    setFullname(data.fullname);
    setDateOfBirth(data.date_of_birth);
    setSex(data.sex);
  }, [data]);

  console.log(data);

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar translucent />
      <View style={styles.headerWrapper}>
        <Header
          actionOne={() => navigation.goBack()}
          actionTwo={() => null}
          actionTwoText="Save"
          title="Profile Update"
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>UID Administration Account</Text>
        <CustomInput
          placeholder="UID . . ."
          value={data.uidAdministrationAccount.toString()}
          editable={false}
          onChangeText={() => null}
        />
        <Gap height={20} />
        <Text style={styles.label}>Username</Text>
        <CustomInput
          placeholder="Username . . ."
          value={data.username}
          editable={false}
          onChangeText={() => null}
        />
        <Gap height={20} />
        <Text style={styles.label}>Role</Text>
        <CustomInput
          placeholder="Role . . ."
          value={data.role.charAt(0).toUpperCase() + data.role.slice(1)}
          editable={false}
          onChangeText={() => null}
        />
        <Gap height={20} />
        <Text style={styles.label}>Nama Lengkap</Text>
        <CustomInput
          placeholder="Fullname . . ."
          value={fullname}
          onChangeText={(e: any) => setFullname(e)}
        />
        <Gap height={20} />
        <Text style={styles.label}>Tanggal Lahir</Text>
        <CustomInput
          placeholder="Date of birth . "
          value={dateOfBirth}
          onChangeText={(e: any) => setDateOfBirth(e)}
        />
        <Gap height={20} />
        <Text style={styles.label}>Jenis Kelamin</Text>
        <CustomInput
          placeholder="Sex . . ."
          value={sex}
          onChangeText={(e: any) => setSex(e)}
        />
        <Gap height={20} />
        <Text style={styles.label}>Jenis Kelamin</Text>
        <Dropdown
          placeholder="Select an option..."
          options={[
            {name: 'Laki - Laki', code: 'Laki - Laki'},
            {name: 'Perempuan', code: 'Perempuan'},
          ]}
          optionLabel={'name'}
          optionValue={'code'}
          selectedValue={sex}
          onValueChange={(value: any) => setSex(value)}
          primaryColor={'green'}
        />
        <RNDateTimePicker mode="date" value={new Date(dateOfBirth)} />
      </View>
    </SafeAreaView>
  );
};

export default AdministrationProfileUpdate;
