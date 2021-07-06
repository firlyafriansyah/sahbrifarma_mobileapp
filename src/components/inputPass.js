import React, {useState} from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

const InputPass = props => {
  const [borderColor, setBorderColor] = useState('#A4B0BE80');
  const [hide, setHide] = useState(false);
  return (
    <View
      style={[
        style.wrapper,
        {borderColor: borderColor, marginBottom: props.mb},
      ]}>
      <TextInput
        style={style.input}
        secureTextEntry={hide}
        autoCorrect={false}
        onFocus={() => setBorderColor('#2F3542')}
        onBlur={() => setBorderColor('#A4B0BE80')}
      />
      <FontAwesomeIcon
        icon={hide ? faEyeSlash : faEye}
        size={22}
        onPress={() => setHide(!hide)}
      />
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 18,
  },
  input: {
    paddingHorizontal: 18,
    paddingVertical: 15,
    fontFamily: 'Poppins-Reguler',
    fontSize: 16,
    flex: 1,
  },
});

export default InputPass;
