import React from 'react';
import styles from '../../styles/LoadingStyles';
import {faWalking} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Modal, Text, View} from 'react-native';

interface LoadingProps {
  visible: boolean;
}

const LoadingModal = (props: LoadingProps) => {
  const {visible} = props;
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalStyle}>
        <View style={styles.modalWrapper}>
          <FontAwesomeIcon icon={faWalking} size={25} />
          <Text style={styles.textModal}>Mohon Tunggu!</Text>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;
