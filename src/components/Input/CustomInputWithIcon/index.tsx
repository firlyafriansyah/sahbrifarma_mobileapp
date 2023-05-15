import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Pressable, TextInput, View, Text} from 'react-native';
import styles from '../../../styles/Components/CustomInputStyles';

interface CustomInputProps {
  label?: string;
  placeholder: string;
  onChangeText: any;
  value: string;
  icon: any;
  keyboardType?: any;
  editable?: boolean;
  selectTextOnFocus?: boolean;
  onPressIcon?: any;
}

const CustomInputWithIcon = (props: CustomInputProps) => {
  const {
    label,
    placeholder,
    onChangeText,
    value,
    icon,
    keyboardType = 'default',
    editable = true,
    selectTextOnFocus = false,
    onPressIcon = null,
  } = props;
  const [borderColor, setBorderColor] = React.useState('#FFFFFF');

  return (
    <>
      {label !== '' && <Text style={styles.label}>{label}</Text>}
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
        <Pressable onPress={() => onPressIcon()}>
          <FontAwesomeIcon icon={icon} size={22} />
        </Pressable>
      </View>
    </>
  );
};

export default CustomInputWithIcon;
