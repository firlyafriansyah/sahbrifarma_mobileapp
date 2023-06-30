import React from 'react';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Pressable, TextInput, View, Text} from 'react-native';
import styles from '../../../styles/Components/Input';

interface CustomInputProps {
  label?: string;
  placeholder: string;
  onChangeText: any;
  value: string;
  keyboardType?: any;
  editable?: boolean;
  selectTextOnFocus?: boolean;
}

const CustomInputPassword = (props: CustomInputProps) => {
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
  const [hide, setHide] = React.useState(true);

  return (
    <>
      {label !== '' && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.wrapper, {borderColor: borderColor}]}>
        <TextInput
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.input, {color: editable ? '#000000' : '#a1a1a1'}]}
          secureTextEntry={hide}
          autoCorrect={false}
          onFocus={() => setBorderColor('#5352ED')}
          onBlur={() => setBorderColor('#FFFFFF')}
          onChangeText={item => onChangeText(item)}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          editable={editable}
          selectTextOnFocus={selectTextOnFocus}
          placeholderTextColor="#a9abb0"
        />
        <Pressable onPress={() => setHide(!hide)}>
          <FontAwesomeIcon
            color="#b5b5b5"
            icon={hide ? faEyeSlash : faEye}
            size={22}
          />
        </Pressable>
      </View>
    </>
  );
};

export default CustomInputPassword;
