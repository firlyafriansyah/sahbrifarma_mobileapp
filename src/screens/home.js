import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch, faQrcode, faPlus} from '@fortawesome/free-solid-svg-icons';
import {Card, InputWithLogo} from '../components';
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
      <TouchableHighlight
        onPress={() => navigation.navigate('Input Pasien Baru')}
        style={style.floatingBtn}>
        <FontAwesomeIcon
          icon={faPlus}
          size={25}
          style={style.floatingBtnIcon}
        />
      </TouchableHighlight>
      <ScrollView
        style={style.scrollViewStyle}
        showsVerticalScrollIndicator={false}>
        <Card press={() => navigation.navigate('Detail Pasien')} />
        <Card />
        <Card />
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
  floatingBtn: {
    width: 64,
    height: 64,
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#4D42CF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 64,
    elevation: 6,
    zIndex: 5,
  },
  floatingBtnIcon: {
    color: '#FFF',
  },
  scrollViewStyle: {
    width: '100%',
  },
});

export default Home;
