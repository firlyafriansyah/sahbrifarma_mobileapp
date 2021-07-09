import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const InputSelect = props => {
  const [selected, setSelected] = useState('Tidak');

  return (
    <View style={[style.container, {marginBottom: props.mb}]}>
      <Picker
        selectedValue={selected}
        onValueChange={(itemValue, itemIndex) => {
          setSelected(itemValue);
          props.value(selected === 'Tidak' ? true : false);
          props.onChangeLabel();
        }}>
        <Picker.Item label={props.labelA} value={props.labelA} />
        <Picker.Item label={props.labelB} value={props.labelB} />
      </Picker>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#A4B0BE80',
    borderRadius: 12,
    paddingVertical: 3,
  },
});

export default InputSelect;
