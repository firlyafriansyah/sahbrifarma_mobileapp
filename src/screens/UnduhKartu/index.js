import React, {useRef} from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import ViewShot from 'react-native-view-shot';
import {Card, CustomHeader} from '../../components';
import CameraRoll from '@react-native-community/cameraroll';

const UnduhKartu = ({navigation, route}) => {
  const viewShotRef = useRef(null);

  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Izin Unduh Gambar',
          message: 'Izinkan aplikasi ini untuk menyimpan gambar di galery!',
          buttonNegative: 'Tidak',
          buttonPositive: 'Izinkan',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        'Perizinan Dibutuhkan',
        'Izinkan aplikasi ini untuk menyimpan gambar di galery!',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    } catch (err) {
      Alert.alert(
        'Simpan gambar',
        'Gagal menyimpan gambar: ' + err.message,
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    }
  };

  const onCapture = () => {
    viewShotRef.current.capture().then(res => {
      if (Platform.OS === 'android') {
        if (!getPermissionAndroid()) {
          return;
        }
      }

      const image = CameraRoll.save(res, 'photo');
      if (image) {
        Alert.alert(
          'Gambar berhasil disimpan',
          'Gambar telah tersimpan di gallery.',
          [{text: 'OK', onPress: () => {}}],
          {cancelable: false},
        );
      }
    });
  };

  return (
    <View style={style.container}>
      <CustomHeader
        onPress={() => {
          navigation.goBack();
        }}
        title={'Unduh Kartu'}
      />
      <ViewShot
        ref={viewShotRef}
        options={{
          format: 'png',
          quality: 0.9,
          fileName: `${route.params?.data.id}-${route.params?.data.nama}`,
        }}>
        <View style={style.cardWrapper}>
          <Card
            namaPasien={route.params?.data.nama}
            unduh={true}
            genre={route.params?.data.jenis_kelamin}
            birthDay={route.params?.data.tanggal_lahir}
            location={route.params?.data.alamat}
            id={route.params?.data.id}
          />
        </View>
      </ViewShot>
      <TouchableHighlight onPress={onCapture} style={style.unduhButtonWrapper}>
        <View style={style.unduhButton}>
          <Text style={style.unduhButtonText}>Unduh Kartu</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    width: '100%',
    display: 'flex',
  },
  cardWrapper: {
    alignSelf: 'center',
    marginVertical: 80,
    width: 350,
    height: 218.75,
  },
  unduhButtonWrapper: {
    alignSelf: 'center',
    width: '50%',
    borderRadius: 15,
    backgroundColor: '#5352ED',
  },
  unduhButton: {
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#5352ED',
  },
  unduhButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});

export default UnduhKartu;
