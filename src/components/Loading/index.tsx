import React from 'react';
import {ActivityIndicator, Modal, Text, View} from 'react-native';
import styles from '../../styles/LoadingStyles';

interface LoadingProps {
  visible: boolean;
}

const LoadingModal = (props: LoadingProps) => {
  const {visible} = props;
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalStyle}>
        <View style={styles.modalWrapper}>
          <ActivityIndicator size="large" color="#5352ED" />
          <Text style={styles.textModal}>Mohon Tunggu!</Text>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;
