import * as React from 'react';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from '../../styles/HeaderStyles';

interface HeaderProps {
  color?: string;
  actionOne: any;
  title: string;
  actionTwo?: any;
  actionTwoText?: string;
}

const Header = (props: HeaderProps) => {
  const {color = '#000000', actionOne, actionTwo, actionTwoText, title} = props;

  return (
    <View style={styles.container}>
      <View style={styles.actionOne}>
        <TouchableOpacity onPress={() => actionOne()}>
          <FontAwesomeIcon icon={faChevronLeft} size={25} color="#5783FC" />
        </TouchableOpacity>
      </View>
      <Text style={[styles.title, {color: color}]}>{title}</Text>
      <Text style={[styles.actionTwo]} onPress={() => actionTwo()}>
        {actionTwoText}
      </Text>
    </View>
  );
};

export default Header;
