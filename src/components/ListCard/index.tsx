import {faCircleArrowRight, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as React from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from '../../styles/ListCardStyles';

interface ListCardProps {
  name: string;
  id: string;
  gender: string;
  sequence: number;
}

const ListCard = (props: ListCardProps) => {
  const {name = 'Nama Pasien', id = '123456789000', gender, sequence} = props;

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconWrapper}>
        <View style={styles.icon}>
          <FontAwesomeIcon icon={faUser} size={22} color="#FFFFFF" />
        </View>
      </View>
      <View style={styles.informationWrapper}>
        <Text style={styles.idpasien}>No urut. {sequence}</Text>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {`${gender === 'Laki - Laki' ? 'TN.' : 'NY.'} ${name}`}
        </Text>
        <Text style={styles.idpasien}>ID. {id}</Text>
      </View>
      <View style={styles.actionWrapper}>
        <FontAwesomeIcon icon={faCircleArrowRight} color="#a29bfe" size={34} />
      </View>
    </TouchableOpacity>
  );
};

export default ListCard;
