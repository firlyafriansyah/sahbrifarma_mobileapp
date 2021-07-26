import React, {useState} from 'react';
import {TextInput, StyleSheet} from 'react-native';

const Input = props => {
  const [borderColor, setBorderColor] = useState('#A4B0BE80');
  return (
    <TextInput
      style={[
        style.style,
        {
          borderColor: borderColor,
          marginBottom: props.mb,
          backgroundColor: props.bg,
        },
      ]}
      onFocus={() => setBorderColor('#2F3542')}
      onBlur={() => setBorderColor('#A4B0BE80')}
      placeholder={props.placeholder}
      keyboardType={props.keyboardType}
      editable={props.editable}
      onChangeText={item => props.onChangeText(item)}
      value={props.value}
      selectTextOnFocus={props.selectTextOnFocus}
    />
  );
};

const style = StyleSheet.create({
  style: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 15,
    fontFamily: 'Poppins-Reguler',
    fontSize: 16,
  },
});

export default Input;
