import React, {useState} from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSearch,
  faMapMarkerAlt,
  faQrcode,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [borderPass, setBorderPass] = useState('#A4B0BE80');
  return (
    <View style={style.container}>
      <Image
        source={require('../../assets/images/header_img.png')}
        style={style.image}
      />
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <View
          style={[
            style.inputPassWrapper,
            {borderColor: borderPass, flex: 1, marginRight: 10},
          ]}>
          <TextInput
            placeholder="Search..."
            style={[style.inputPass, {flex: 1}]}
            onFocus={() => setBorderPass('#2F3542')}
            onBlur={() => setBorderPass('#A4B0BE80')}
          />
          <FontAwesomeIcon
            icon={faSearch}
            size={15}
            style={{color: '#A4B0BE'}}
          />
        </View>
        <FontAwesomeIcon
          icon={faQrcode}
          size={35}
          style={{color: '#646975', marginTop: 5}}
        />
      </View>
      <TouchableHighlight
        onPress={() => Alert.alert('add')}
        style={style.floatingBtn}>
        <FontAwesomeIcon icon={faPlus} size={25} style={{color: '#FFF'}} />
      </TouchableHighlight>
      <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => Alert.alert('testing')}>
          <View style={style.cardWrapper}>
            <ImageBackground
              source={require('../../assets/images/card_bg.png')}
              imageStyle={{borderRadius: 15}}
              style={style.cardBackground}>
              <Text style={style.pasienName}>Nama Pasien</Text>
              <View style={style.cardDetail}>
                <View>
                  <Text style={style.lastCheck}>Berobat Terakhir</Text>
                  <Text style={style.dateCheck}>20 April 2000</Text>
                  <View style={style.locationWrapper}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} size={15} />
                    <Text style={style.location}>Location</Text>
                  </View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={require('../../assets/images/qr_sample.png')}
                  />
                  <Text style={style.idPasien}>ID : 311910002</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
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
  inputPassWrapper: {
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 45,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 18,
  },
  inputPass: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    fontFamily: 'Poppins-Reguler',
    fontSize: 16,
  },
  cardWrapper: {
    flex: 1,
    width: '100%',
    marginBottom: 30,
  },
  cardBackground: {
    flex: 1,
    elevation: 3,
    borderRadius: 15,
    resizeMode: 'cover',
    justifyContent: 'center',
    paddingHorizontal: 23,
    paddingVertical: 28,
  },
  cardDetail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pasienName: {
    fontSize: 36,
    fontFamily: 'Poppins-Medium',
    marginRight: 50,
    marginBottom: 10,
    color: '#382F42',
  },
  lastCheck: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#646975',
  },
  dateCheck: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginBottom: 50,
    color: '#2F4237',
  },
  locationWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#2F3542',
    marginLeft: 10,
    marginBottom: -4,
  },
  idPasien: {
    marginTop: 10,
    color: '#2F3542',
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
});

export default Home;
