import React from 'react';
import {View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styles from '../../../styles/Components/Input';

interface CustomInputProps {
  label?: string;
  onSelect: any;
  value: string;
  item: any;
  editable?: boolean;
}

const CustomSelect = (props: CustomInputProps) => {
  const {label = '', onSelect, value, item, editable = true} = props;
  const [borderColor, setBorderColor] = React.useState('#FFFFFF');

  return (
    <>
      {label !== '' && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.wrapper, {borderColor: borderColor}]}>
        <Picker
          enabled={editable}
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.input, {color: editable ? '#000000' : '#a1a1a1'}]}
          onFocus={() => setBorderColor('#5352ED')}
          onBlur={() => setBorderColor('#FFFFFF')}
          selectedValue={value}
          selectionColor="#000000"
          dropdownIconColor="#000000"
          onValueChange={itemValue => onSelect(itemValue)}>
          {item.reverse().map((itemValue: any, index: any) => (
            <Picker.Item key={index} label={itemValue} value={itemValue} />
          ))}
        </Picker>
      </View>
    </>
  );
};

export default CustomSelect;
