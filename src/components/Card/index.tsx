import * as React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import styles from '../../styles/CardStyles';

const Card = (props: any) => {
  return (
    <TouchableOpacity onPress={props.press}>
      <View style={styles.cardWrapper}>
        <ImageBackground
          source={require('../../../assets/images/card_bg.png')}
          imageStyle={styles.imageBgStyle}
          style={styles.cardBackground}>
          <View style={styles.container}>
            <View style={styles.informationWrapper}>
              <Image
                source={require('../../../assets/images/header_img.png')}
                style={styles.image}
                resizeMode="contain"
              />
              <View>
                <View>
                  <Text style={styles.name}>FIRLY AFRIANSYAH</Text>
                  <Text style={styles.id}>202324032345</Text>
                </View>
              </View>
              <View style={styles.additionalInformationWrapper}>
                <View style={styles.birthdayWrapper}>
                  <Text style={styles.birthdayLabel}>Birthday</Text>
                  <Text style={styles.birthday}>20 / 04 / 2023</Text>
                </View>
                <View>
                  <Text style={styles.genderLabel}>Gender</Text>
                  <Text style={styles.gender}>Laki - Laki</Text>
                </View>
              </View>
            </View>
            <View style={styles.qrWrapper}>
              <QRCode value="202324032345" size={95} />
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
