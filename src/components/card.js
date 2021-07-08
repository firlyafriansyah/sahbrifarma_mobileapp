import React from 'react';
import {
  TouchableWithoutFeedback,
  View,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';

const Card = props => {
  return (
    <TouchableWithoutFeedback onPress={props.press}>
      <View style={style.cardWrapper}>
        <ImageBackground
          source={require('../../assets/images/card_bg.png')}
          imageStyle={style.imageBgStyle}
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
            <View style={style.qrCodeStyle}>
              <Image source={require('../../assets/images/qr_sample.png')} />
              <Text style={style.idPasien}>ID : 311910002</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
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
  imageBgStyle: {
    borderRadius: 15,
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
  qrCodeStyle: {
    alignItems: 'center',
  },
  idPasien: {
    marginTop: 10,
    color: '#2F3542',
  },
});

export default Card;
