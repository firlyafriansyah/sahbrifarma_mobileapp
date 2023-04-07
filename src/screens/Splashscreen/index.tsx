import * as React from 'react';
import {Image, View} from 'react-native';
import {CustomStatusBar} from '../../components';
import styles from '../../styles/SplashScreenStyles';

export default function Splashscreen() {
  return (
    <View style={styles.container}>
      <CustomStatusBar translucent />
      <Image
        source={require('../../../assets/images/sahbrifarma_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Image
        source={require('../../../assets/images/sahbrifarma_logoname.png')}
        style={styles.logoname}
        resizeMode="contain"
      />
    </View>
  );
}
