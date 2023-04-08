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

interface CardProps {
  name: string;
  id: string;
  birthday: string;
  gender: string;
  onPress: any;
}

const Card = (props: CardProps) => {
  const {name, id, birthday, gender, onPress} = props;

  return (
    <TouchableOpacity onPress={onPress}>
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
                  <Text style={styles.name}>{name?.toUpperCase()}</Text>
                  <Text style={styles.id}>{id}</Text>
                </View>
              </View>
              <View style={styles.additionalInformationWrapper}>
                <View style={styles.birthdayWrapper}>
                  <Text style={styles.birthdayLabel}>Birthday</Text>
                  <Text style={styles.birthday}>{birthday}</Text>
                </View>
                <View>
                  <Text style={styles.genderLabel}>Gender</Text>
                  <Text style={styles.gender}>{gender}</Text>
                </View>
              </View>
            </View>
            <View style={styles.qrWrapper}>
              <QRCode value={id} size={95} />
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
