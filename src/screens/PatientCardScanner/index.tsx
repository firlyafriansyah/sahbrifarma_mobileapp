import {faCheck, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as React from 'react';
import {Alert, Image, Text, View} from 'react-native';
import {Camera, CameraType} from 'react-native-camera-kit';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  CustomInputWithQuickDelete,
  CustomStatusBar,
  Gap,
  Header,
  LoadingModal,
} from '../../components';
import {IsLogedInContext} from '../../context/AuthContext';
import PatientCheck from '../../services/PatientCheck';
import styles from '../../styles/Screen/PatientCardScanner';

const PatientCardScanner = ({navigation}: any) => {
  const {loggedInToken} = React.useContext(IsLogedInContext);
  const [idPasien, setIdPasien] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [pasienStatus, setPasienStatus] = React.useState(false);

  const onReadCodeHandler = (code: string) => {
    setLoading(true);
    PatientCheck(code, loggedInToken)
      .then(() => {
        setPasienStatus(true);
      })
      .catch(() => {
        Alert.alert('Not Found!', 'Pasien with this id not found?', [
          {
            text: 'OK',
            onPress: () => {
              setIdPasien('');
            },
          },
        ]);
      })
      .finally(() => setLoading(false));
  };

  const submit = () => {
    navigation.navigate({name: 'Home'});
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar translucent barStyle="white-content" />
      <Camera
        style={styles.scannerCamera}
        cameraType={CameraType.Back}
        scanBarcode={true}
        onReadCode={(code: any) => {
          setIdPasien(code.nativeEvent.codeStringValue.toString());
          if (idPasien === '') {
            idPasien.trim() !== ''
              ? null
              : onReadCodeHandler(code.nativeEvent.codeStringValue.toString());
          }
        }}
      />
      <Image
        source={require('../../../assets/images/scanner_frame.png')}
        style={styles.qrScannerImage}
      />
      <View style={styles.headerWrapper}>
        <Header
          color="#FFFFFF"
          actionOne={() => navigation.goBack()}
          title="Pindai Kartu Pasien"
        />
      </View>
      <View style={styles.actionWrapper}>
        <Text style={styles.title}>Result Scanner</Text>
        <CustomInputWithQuickDelete
          placeholder="ID Pasien . . ."
          deleteIconAction={() => setIdPasien('')}
          value={idPasien}
          onChangeText={(value: string) => {
            setIdPasien(value);
            if (value.length === 13) {
              onReadCodeHandler(value);
            }
          }}
          keyboardType="numeric"
        />
        <Gap height={30} />
        <View style={styles.manualInputWrapper}>
          {pasienStatus ? (
            <View style={styles.buttonWrapper}>
              <Text style={styles.buttonText}>ID Verify</Text>
              <TouchableOpacity onPress={() => submit()}>
                <FontAwesomeIcon icon={faCheck} size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.buttonDisableWrapper}>
              <Text style={styles.buttonText}>ID Not Found</Text>
              <TouchableOpacity onPress={() => submit()} disabled>
                <FontAwesomeIcon icon={faXmark} size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <LoadingModal visible={loading} />
    </View>
  );
};

export default PatientCardScanner;
