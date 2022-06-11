import React from 'react';
import {
  TouchableWithoutFeedback,
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import QRCode from 'react-native-qrcode-svg';

const Card = props => {
  return (
    <TouchableWithoutFeedback onPress={props.press}>
      <View style={style.cardWrapper}>
        <ImageBackground
          source={require('../../../assets/images/card_bg.png')}
          imageStyle={style.imageBgStyle}
          style={style.cardBackground}>
          <View style={style.container}>
            <View style={style.identity}>
              <Text style={style.pasienName}>{props.namaPasien}</Text>
              <View>
                {props.unduh ? (
                  <>
                    <Text style={style.genre}>{props.genre}</Text>
                    <Text style={style.birthDay}>{props.birthDay}</Text>
                  </>
                ) : (
                  <>
                    <Text style={style.lastCheck}>Berobat Terakhir</Text>
                    <Text style={style.dateCheck}>{props.dateCheck}</Text>
                  </>
                )}
              </View>
              <View style={style.locationWrapper}>
                <FontAwesomeIcon icon={faMapMarkerAlt} size={15} />
                <Text style={style.location}>{props.location}</Text>
              </View>
            </View>
            <View style={style.brand}>
              <Image
                source={require('../../../assets/images/header_img.png')}
                style={style.image}
              />
              <View style={style.qrCodeStyle}>
                <QRCode value={props.id} size={80} />
                <Text style={style.idPasien}>ID : {props.id}</Text>
              </View>
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
  },
  imageBgStyle: {
    borderRadius: 15,
  },
  cardBackground: {
    flex: 1,
    borderRadius: 15,
    resizeMode: 'cover',
    padding: 20,
  },
  container: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  identity: {
    flex: 1,
    width: '50%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  pasienName: {
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
    color: '#382F42',
  },
  genre: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#2F4237',
  },
  birthDay: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#646975',
  },
  lastCheck: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#646975',
  },
  dateCheck: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#2F4237',
  },
  locationWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  location: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#2F3542',
    marginLeft: 10,
  },
  brand: {
    flex: 1,
    width: '50%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  image: {
    width: 120,
    height: 40,
  },
  qrCodeStyle: {
    paddingLeft: 35,
    width: '100%',
    alignItems: 'center',
  },
  idPasien: {
    marginTop: 10,
    color: '#2F3542',
  },
});

export default Card;
