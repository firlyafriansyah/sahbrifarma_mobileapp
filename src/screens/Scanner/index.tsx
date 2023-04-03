import {faCheck, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as React from 'react';
import {Alert, BackHandler, Image, Text, View} from 'react-native';
import {Camera, CameraType} from 'react-native-camera-kit';
import {TextInput, TouchableHighlight} from 'react-native-gesture-handler';
import {CustomStatusBar, LoadingModal} from '../../components';
import {IsLogedInContext} from '../../context/AuthContext';
import {PasienCheck} from '../../services';
import styles from '../../styles/ScannerScreenStyles';
import {clearAsyncStorage} from '../../utils/AsyncStorage';

const Scanner = ({navigation}: any) => {
  const [idPasien, setIdPasien] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [pasienStatus, setPasienStatus] = React.useState(false);
  const {setLoggedInRole, setLoggedInUsername} =
    React.useContext(IsLogedInContext);

  React.useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to logout?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => logout(),
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
    PasienCheck(code)
      .then(() => {
        setPasienStatus(true);
      })
      .catch(() => {
        Alert.alert('Not Found!', 'Pasien with this id not found?', [
          {
            text: 'OK',
            onPress: () => {
              setIdPasien('');
              return null;
            },
          },
        ]);
      })
      .finally(() => setLoading(false));
  };

  const logoutHandler = () => {
    Alert.alert('Hold on!', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => logout(),
      },
    ]);
  };

  const logout = () => {
    clearAsyncStorage();
    setLoggedInUsername('');
    setLoggedInRole(0);
  };

  const submit = () => {
    navigation.navigate({name: 'Home'});
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar translucent />
      <Camera
        style={styles.scannerCamera}
        cameraType={CameraType.Back}
        scanBarcode={true}
        onReadCode={(code: any) => {
          idPasien.trim() !== ''
            ? null
            : onReadCodeHandler(code.nativeEvent.codeStringValue.toString());
        }}
      />
      <Image
        source={require('../../../assets/images/scanner_frame.png')}
        style={styles.qrScannerImage}
      />
      <View style={styles.scannerHeaderIcon}>
        <TouchableHighlight onPress={() => logoutHandler()}>
          <FontAwesomeIcon icon={faXmark} size={25} color="#FFFFFF" />
        </TouchableHighlight>
      </View>
      <Text style={styles.scannerHeaderText}>Pindai Kartu Pasien</Text>
      <View style={styles.actionWrapper}>
        <Text style={styles.title}>Result Scanner</Text>
        <Text style={styles.label}>ID Pasien</Text>
        <View style={styles.manualInputWrapper}>
          <View style={styles.idPasienWrapper}>
            <TextInput
              style={styles.idPasien}
              keyboardType="numeric"
              onChangeText={(value: string) => {
                setIdPasien(value);
                if (value.length === 12) {
                  onReadCodeHandler(value);
                }
              }}
              maxLength={12}
            />
          </View>
          <View style={styles.gap} />
          {pasienStatus ? (
            <View style={styles.buttonWrapper}>
              <TouchableHighlight onPress={() => submit()}>
                <FontAwesomeIcon icon={faCheck} size={24} color="#FFFFFF" />
              </TouchableHighlight>
            </View>
          ) : (
            <View style={styles.buttonDisableWrapper}>
              <TouchableHighlight onPress={() => submit()} disabled>
                <FontAwesomeIcon icon={faCheck} size={24} color="#FFFFFF" />
              </TouchableHighlight>
            </View>
          )}
        </View>
      </View>
      <LoadingModal visible={loading} />
    </View>
  );
};

export default Scanner;
