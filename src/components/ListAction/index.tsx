import {faAngleRight, faPen} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from '../../styles/ListActionStyles';

const ListAction = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconWrapper}>
        <View style={styles.icon}>
          <FontAwesomeIcon icon={faPen} size={20} color="#FFFFFF" />
        </View>
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>Input Hasil Konsultasi</Text>
        <Text style={styles.subTitle}>
          Lakukan konsultasi dan lengkapi data pada form
        </Text>
      </View>
      <View style={styles.arrowWrapper}>
        <FontAwesomeIcon icon={faAngleRight} size={25} color="#00000066" />
      </View>
    </TouchableOpacity>
  );
};

export default ListAction;
