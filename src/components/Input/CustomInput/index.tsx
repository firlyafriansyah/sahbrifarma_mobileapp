import React from 'react';
import {TextInput, View, Text} from 'react-native';
import styles from '../../../styles/CustomInputStyles';

interface CustomInputProps {
  label: string;
  placeholder: string;
  onChangeText: any;
  value: string;
  keyboardType?: any;
  editable?: boolean;
  selectTextOnFocus?: boolean;
}

const CustomInput = (props: CustomInputProps) => {
  const {
    label,
    placeholder,
    onChangeText,
    value,
    keyboardType = 'default',
    editable = true,
    selectTextOnFocus = false,
  } = props;
  const [borderColor, setBorderColor] = React.useState('#FFFFFF');

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.wrapper, {borderColor: borderColor}]}>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          onFocus={() => setBorderColor('#5352ED')}
          onBlur={() => setBorderColor('#FFFFFF')}
          onChangeText={item => onChangeText(item)}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          editable={editable}
          selectTextOnFocus={selectTextOnFocus}
        />
      </View>
    </>
  );
};

export default CustomInput;
