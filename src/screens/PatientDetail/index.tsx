import * as React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Alert,
  BackHandler,
} from 'react-native';
import {CustomButton, CustomInput, Header} from '../../components';
import styles from '../../styles/ProfileScreenStyles';

const PatientDetail = ({navigation}: any) => {
  const [editable, setEditable] = React.useState(false);

  React.useEffect(() => {
    const backAction = () => {
      if (editable) {
        Alert.alert(
          'Hold on!',
          'Are you sure want to leave from this screen without save the changes?',
          [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'YES',
              onPress: () => navigation.goBack(),
            },
          ],
        );
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [editable, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrapper}>
        <Header
          title="Profile Pasien"
          action={() => {
            if (editable) {
              Alert.alert(
                'Hold on!',
                'Are you sure want to leave from this screen without save the changes?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                  },
                  {
                    text: 'YES',
                    onPress: () => navigation.goBack(),
                  },
                ],
              );
            } else {
              navigation.goBack();
            }
          }}
        />
      </View>
      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <Image
          style={styles.image}
          source={require('../../../assets/images/sahbrifarma_logo.png')}
          resizeMode="contain"
        />
        <Text style={styles.name}>FIRLY AFRIANSYAH</Text>
        <Text style={styles.id}>438756439826</Text>
        <View style={styles.buttonWrapper}>
          <CustomButton
            buttonText={editable ? 'Save Data' : 'Edit Data'}
            onClick={() => setEditable(!editable)}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>ID Pasien</Text>
          <CustomInput
            placeholder="ID Pasien . . ."
            value="438756439826"
            onChangeText={() => null}
            editable={false}
          />
          <Text style={styles.label}>Nama Lengkap Pasien</Text>
          <CustomInput
            placeholder="Nama Pasien"
            value="Firly Afriansyah"
            onChangeText={() => null}
            editable={editable}
          />
          <Text style={styles.label}>Tanggal Lahir</Text>
          <CustomInput
            placeholder="20 / 04 / 2000"
            value="20 / 04 / 2000"
            onChangeText={() => null}
            editable={editable}
          />
          <Text style={styles.label}>Jenis Kelamin</Text>
          <CustomInput
            placeholder="Jenis Kelamin"
            value="Laki - Laki"
            onChangeText={() => null}
            editable={editable}
          />
          <Text style={styles.label}>Nomor Telepon / HP</Text>
          <CustomInput
            placeholder="Nomor Telepon / HP"
            value="085695177537"
            onChangeText={() => null}
            editable={editable}
          />
          <Text style={styles.label}>Alamat</Text>
          <CustomInput
            placeholder="Alamat"
            value="Cikarang, Kabupaten Bekasi"
            onChangeText={() => null}
            editable={editable}
          />
          <Text style={styles.label}>Terakhir Datang</Text>
          <CustomInput
            placeholder="Terakhir Datang"
            value="04 / 04 / 2023"
            onChangeText={() => null}
            editable={editable}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientDetail;
