import React from 'react';
import {
  TouchableWithoutFeedback,
  View,
  ImageBackground,
  Text,
  StyleSheet,
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
          <Text style={style.pasienName}>{props.namaPasien}</Text>
          <View style={style.cardDetail}>
            <View style={style.halfWidth}>
              <Text style={style.lastCheck}>Berobat Terakhir</Text>
              <Text style={style.dateCheck}>{props.dateCheck}</Text>
              <View style={style.locationWrapper}>
                <FontAwesomeIcon icon={faMapMarkerAlt} size={15} />
                <Text style={style.location}>{props.location}</Text>
              </View>
            </View>
            <View style={style.qrCodeStyle}>
              <QRCode value={props.id} size={80} />
              <Text style={style.idPasien}>ID : {props.id}</Text>
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
    fontSize: 24,
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
    marginBottom: 20,
    color: '#2F4237',
  },
  locationWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
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
  halfWidth: {width: '50%'},
});

export default Card;
