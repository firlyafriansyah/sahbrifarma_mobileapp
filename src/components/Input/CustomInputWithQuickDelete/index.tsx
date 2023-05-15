import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Pressable, TextInput, View, Text} from 'react-native';
import styles from '../../../styles/CustomInputStyles';

interface CustomInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: any;
  deleteValue: any;
  keyboardType?: any;
  editable?: boolean;
  selectTextOnFocus?: boolean;
}

const CustomInputWithQuickDelete = (props: CustomInputProps) => {
  const {
    label,
    placeholder,
    value,
    onChangeText,
    deleteValue,
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
        <Pressable onPress={() => deleteValue()}>
          <FontAwesomeIcon icon={faXmark} size={22} />
        </Pressable>
      </View>
    </>
  );
};

export default CustomInputWithQuickDelete;
