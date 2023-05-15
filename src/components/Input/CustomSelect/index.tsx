import React from 'react';
import {View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styles from '../../../styles/Components/CustomInputStyles';

interface CustomInputProps {
  label?: string;
  onSelect: any;
  value: string;
}

const CustomSelect = (props: CustomInputProps) => {
  const {label = '', onSelect, value} = props;
  const [borderColor, setBorderColor] = React.useState('#FFFFFF');

  return (
    <>
      {label !== '' && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.wrapper, {borderColor: borderColor}]}>
        <Picker
          style={styles.input}
          onFocus={() => setBorderColor('#5352ED')}
          onBlur={() => setBorderColor('#FFFFFF')}
          selectedValue={value}
          onValueChange={itemValue => onSelect(itemValue)}>
          <Picker.Item label="Laki - Laki" value="Laki - Laki" />
          <Picker.Item label="Perempuan" value="Perempuan" />
        </Picker>
      </View>
    </>
  );
};

export default CustomSelect;
