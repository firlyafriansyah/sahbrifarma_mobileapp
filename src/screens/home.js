import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  Text,
  Alert,
  RefreshControl,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch, faQrcode, faBolt} from '@fortawesome/free-solid-svg-icons';
import {Card, FloatingButton, InputWithLogo} from '../components';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Home = ({navigation}) => {
  const [modal, setModal] = useState(false);
  const [torch, setTorch] = useState(false);
  const [data, setData] = useState();

  const onSuccess = e => {
    Alert.alert(e.data);
    setModal(false);
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      getData();
    });
  }, []);

  const getData = () => {
    fetch('https://98efa2a485de.ngrok.io/pasien')
      .then(resJson => resJson.json())
      .then(res => setData(res.data));
  };

  useEffect(() => {
    getData();
  }, []);

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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={style.scrollViewStyle}
        showsVerticalScrollIndicator={false}>
        {data !== undefined ? (
          data.map(e => {
            return (
              <Card
                key={e.id}
                press={() => navigation.navigate('Detail Pasien')}
                namaPasien={e.nama_pasien}
                dateCheck={e.nama_pasien}
                location={e.alamat_pasien}
                id={e.id}
              />
            );
          })
        ) : (
          <Text style={style.textLoading}>Loading...</Text>
        )}
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
  textLoading: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Home;
