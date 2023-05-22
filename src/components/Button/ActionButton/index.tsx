import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TouchableOpacity, Text} from 'react-native';
import styles from '../../../styles/Components/CustomButton';

interface ActionButtonProps {
  action: any;
  icon: any;
  text: string;
}

const ActionButton = (props: ActionButtonProps) => {
  const {action, icon, text} = props;
  return (
    <TouchableOpacity
      style={styles.buttonActionWrapper}
      onPress={() => action()}>
      <FontAwesomeIcon icon={icon} size={35} color="#6c5ce7" />
      <Text style={styles.buttonActionText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ActionButton;
