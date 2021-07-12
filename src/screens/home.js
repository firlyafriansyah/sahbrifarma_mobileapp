import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch, faQrcode, faBolt} from '@fortawesome/free-solid-svg-icons';
import {Card, FloatingButton, InputWithLogo} from '../components';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const Home = ({navigation}) => {
  const [modal, setModal] = useState(false);
  const [torch, setTorch] = useState(false);

  const onSuccess = e => {
    Alert.alert(e.data);
    setModal(false);
  };

  return (
    <View style={style.container}>
      <Image
        source={require('../../assets/images/header_img.png')}
        style={style.image}
      />
      <View style={style.searchWrapper}>
        <InputWithLogo
          mb={45}
          mr={18}
          placeholder={'Search...'}
          icon={faSearch}
          size={15}
          iconColor={'#2F3542'}
        />
        <TouchableWithoutFeedback onPress={() => setModal(true)}>
          <FontAwesomeIcon
            icon={faQrcode}
            size={35}
            style={style.qrCodeStyle}
          />
        </TouchableWithoutFeedback>
      </View>
      <FloatingButton
        navigation={() => navigation.navigate('Input Pasien Baru')}
      />
      <ScrollView
        style={style.scrollViewStyle}
        showsVerticalScrollIndicator={false}>
        <Card press={() => navigation.navigate('Detail Pasien')} />
        <Card press={() => navigation.navigate('Detail Pasien')} />
        <Card press={() => navigation.navigate('Detail Pasien')} />
        <Card press={() => navigation.navigate('Detail Pasien')} />
      </ScrollView>

      <Modal visible={modal}>
        <QRCodeScanner
          onRead={onSuccess}
          flashMode={
            torch
              ? RNCamera.Constants.FlashMode.torch
              : RNCamera.Constants.FlashMode.off
          }
          topContent={
            <TouchableOpacity onPress={() => setTorch(!torch)}>
              <FontAwesomeIcon
                icon={faBolt}
                size={25}
                style={{color: `${torch ? '#000' : '#CCC'}`}}
              />
            </TouchableOpacity>
          }
          bottomContent={
            <TouchableOpacity
              style={style.buttonTouchable}
              onPress={() => setModal(false)}>
              <Text style={style.buttonText}>Kembali</Text>
            </TouchableOpacity>
          }
        />
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingTop: 5,
    paddingHorizontal: 36,
  },
  image: {
    marginBottom: 40,
  },
  searchWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  qrCodeStyle: {
    color: '#646975',
    marginTop: 5,
  },
  scrollViewStyle: {
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#FFF',
  },
  buttonTouchable: {
    marginTop: 30,
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: '#646975',
    borderRadius: 15,
  },
});

export default Home;
