import {
  faAngleRight,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../../../styles/ListActionStyles';
import Gap from '../../Gap';

interface ListActionProps {
  title: string;
  subtitle?: string;
  icon?: any;
  mb?: any;
  onPress: any;
}

const ListAction = (props: ListActionProps) => {
  const {
    title,
    subtitle,
    icon = faTriangleExclamation,
    mb = 0,
    onPress,
  } = props;

  return (
    <>
      <Gap height={mb} />
      <TouchableOpacity style={styles.container} onPress={() => onPress()}>
        <View style={styles.iconWrapper}>
          <View style={styles.icon}>
            <FontAwesomeIcon icon={icon} size={20} color="#FFFFFF" />
          </View>
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subTitle}>{subtitle}</Text>}
        </View>
        <View style={styles.arrowWrapper}>
          <FontAwesomeIcon icon={faAngleRight} size={25} color="#00000066" />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ListAction;
