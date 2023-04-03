import {faEye, faEyeSlash, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {Pressable, TextInput, View} from 'react-native';
import styles from '../../styles/CustomInputStyles';

interface CustomInputProps {
  placeholder: string;
  keyboardType?: any;
  editable?: boolean;
  onChangeText: any;
  value: string;
  selectTextOnFocus?: boolean;
  inputPassword?: boolean;
  inputWithDeleteValue?: boolean;
  deleteValue?: any;
}

const CustomInput = (props: CustomInputProps) => {
  const {
    placeholder,
    keyboardType = 'default',
    editable = true,
    onChangeText,
    value,
    selectTextOnFocus = false,
    inputPassword = false,
    inputWithDeleteValue = false,
    deleteValue,
  } = props;
  const [borderColor, setBorderColor] = useState('#FFFFFF');
  const [hide, setHide] = useState(true);
  return (
    <View style={[styles.wrapper, {borderColor: borderColor}]}>
      <TextInput
        style={styles.input}
        secureTextEntry={inputPassword ? hide : false}
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
      {inputPassword ? (
        <Pressable onPress={() => setHide(!hide)}>
          <FontAwesomeIcon
            color="#b5b5b5"
            icon={hide ? faEyeSlash : faEye}
            size={22}
          />
        </Pressable>
      ) : null}
      {inputWithDeleteValue ? (
        <Pressable onPress={() => deleteValue()}>
          <FontAwesomeIcon icon={faXmark} size={22} />
        </Pressable>
      ) : null}
    </View>
  );
};

export default CustomInput;
