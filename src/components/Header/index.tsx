import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as React from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from '../../styles/HeaderStyles';

interface HeaderProps {
  color?: string;
  action: any;
  title: string;
}

const Header = (props: HeaderProps) => {
  const {color = '#000000', action, title} = props;

  return (
    <View style={styles.container}>
      <View style={styles.scannerHeaderIcon}>
        <TouchableOpacity onPress={() => action()}>
          <FontAwesomeIcon icon={faArrowLeft} size={25} color={color} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.scannerHeaderText, {color: color}]}>{title}</Text>
      <View style={styles.gap} />
    </View>
  );
};

export default Header;
