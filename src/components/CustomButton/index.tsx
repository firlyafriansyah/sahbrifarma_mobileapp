import React from 'react';
import styles from '../../styles/CustomButtonStyles';
import {TouchableHighlight, View, Text} from 'react-native';

interface CustomButtonProps {
  onClick?: any;
  buttonText: string;
  bgColor?: string;
}

const CustomButton = (props: CustomButtonProps) => {
  const {onClick, buttonText, bgColor = '#5352ED'} = props;

  return (
    <TouchableHighlight onPress={() => onClick()} style={styles.touchable}>
      <View
        style={[
          {
            backgroundColor: bgColor,
          },
          styles.submitBtn,
        ]}>
        <Text style={styles.submitText}>{buttonText}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default CustomButton;
