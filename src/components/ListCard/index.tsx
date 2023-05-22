import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../../styles/ListCardStyles';

interface ListCardProps {
  name: string;
  id: string;
  gender: string;
  sequence: number;
  onPress: any;
}

const ListCard = (props: ListCardProps) => {
  const {
    name = 'Nama Pasien',
    id = '000000000000',
    gender,
    sequence,
    onPress,
  } = props;

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress()}>
      <View style={styles.iconWrapper}>
        <Text style={styles.sequence}>{sequence}</Text>
      </View>
      <View style={styles.informationWrapper}>
        <Text style={styles.name}>
          {`${gender === 'Laki - Laki' ? 'TN.' : 'NY.'} ${name}`}
        </Text>
        <Text style={styles.idpasien}>ID. {id}</Text>
      </View>
      <View style={styles.actionWrapper}>
        <FontAwesomeIcon icon={faAngleRight} color="#6c5ce799" size={28} />
      </View>
    </TouchableOpacity>
  );
};

export default ListCard;
