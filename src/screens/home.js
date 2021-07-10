import React from 'react';
import {View, Image, StyleSheet, ScrollView, Alert} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch, faQrcode} from '@fortawesome/free-solid-svg-icons';
import {Card, FloatingButton, InputWithLogo} from '../components';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const Home = ({navigation}) => {
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
        <TouchableWithoutFeedback onPress={() => Alert.alert('QR Scanner')}>
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
});

export default Home;
