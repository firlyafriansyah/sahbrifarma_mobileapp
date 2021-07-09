import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

const InputWithButton = props => {
  const [borderColor, setBorderColor] = useState('#A4B0BE80');
  const [addButton, setAddButton] = useState(true);
  const [obat, setObat] = useState('');
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
        onChange={() => setAddButton(false)}
        onChangeText={text => setObat(text)}
        value={obat}
      />
      <TouchableWithoutFeedback
        disabled={addButton}
        onPress={() => {
          props.onPress(obat);
          setObat('');
        }}>
        <FontAwesomeIcon icon={faPlus} size={20} style={style.iconStyle} />
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
    paddingVertical: 15,
    fontFamily: 'Poppins-Reguler',
    fontSize: 16,
    flex: 1,
  },
  iconStyle: {
    color: '#2F3542',
  },
});

export default InputWithButton;
