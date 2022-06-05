import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const InputWithLogo = props => {
  const [borderColor, setBorderColor] = useState('#A4B0BE80');
  return (
    <View
      style={[
        style.wrapper,
        {
          borderColor: borderColor,
          marginBottom: props.mb,
          marginRight: props.mr,
        },
      ]}>
      <TextInput
        style={style.input}
        onFocus={() => setBorderColor('#2F3542')}
        onBlur={() => setBorderColor('#A4B0BE80')}
        placeholder={props.placeholder}
        onChangeText={e => props.onChangeText(e)}
        value={props.value}
      />
      <TouchableWithoutFeedback onPress={() => props.onPress()}>
        <FontAwesomeIcon
          icon={props.icon}
          size={props.size}
          style={{color: props.iconColor}}
        />
      </TouchableWithoutFeedback>
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
    flex: 1,
  },
  input: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    fontFamily: 'Poppins-Reguler',
    fontSize: 16,
    flex: 1,
  },
});

export default InputWithLogo;
