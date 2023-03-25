import React, {useEffect, useState} from 'react';
import {Alert, BackHandler, Image, Text, View} from 'react-native';
import {Camera, CameraType} from 'react-native-camera-kit';
import {CustomButton, CustomInput, Gap, LoadingModal} from '../../components';
import {PasienCheck} from '../../services';
import styles from '../../styles/ScannerScreenStyles';
import {multiRemoveDataAsyncStorage} from '../../utils/AsyncStorage';

const Scanner = ({navigation}: any) => {
  const [idPasien, setIdPasien] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            multiRemoveDataAsyncStorage('admin', 'autoLogin')
              .then(() => navigation.navigate({name: 'Login'}))
              .catch(err => Alert.alert(err));
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onReadCodeHandler = (code: string) => {
    setLoading(true);
    setIdPasien(code);
    PasienCheck(code)
      .then(() => {
        setLoading(false);
        Alert.alert('Pasien id found!');
      })
      .catch(() => {
        setLoading(false);
        Alert.alert('Not Found!', 'Pasien with this id not found?', [
          {
            text: 'OK',
            onPress: () => {
              setIdPasien('');
              return null;
            },
          },
        ]);
      });
  };

  const logoutHandler = () => {
    multiRemoveDataAsyncStorage('admin', 'autoLogin')
      .then(() => navigation.navigate({name: 'Login'}))
      .catch(err => Alert.alert(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pemindai Kartu Pasien</Text>
      <Gap height={70} />
      <View style={styles.scanner}>
        <Camera
          style={styles.scannerCamera}
          cameraType={CameraType.Back}
          scanBarcode={true}
          onReadCode={(code: any) => {
            idPasien
              ? null
              : onReadCodeHandler(code.nativeEvent.codeStringValue.toString());
          }}
        />
        <Image
          source={require('../../../assets/images/scanner_frame.png')}
          style={styles.qrScannerImage}
        />
      </View>
      <Gap height={70} />
      <View style={styles.manualInputWrapper}>
        <Text style={styles.label}>Input manual ID pasien</Text>
        <Gap height={10} />
        <CustomInput
          placeholder="ID pasien . . ."
          onChangeText={(value: string) => setIdPasien(value)}
          value={idPasien}
          inputWithDeleteValue={true}
          deleteValue={() => setIdPasien('')}
          keyboardType="numeric"
        />
        <Gap height={20} />
        <CustomButton
          buttonText="Submit"
          onClick={() => onReadCodeHandler(idPasien)}
        />
      </View>
      <Gap height={50} />
      <View style={styles.logoutWrapper}>
        <CustomButton
          bgColor="#c0392b"
          buttonText="Logout"
          onClick={() => logoutHandler()}
        />
      </View>
      <LoadingModal visible={loading} />
    </View>
  );
};

export default Scanner;
