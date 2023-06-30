import React from 'react';
import {TextInput, View, Text} from 'react-native';
import styles from '../../../styles/Components/Input';

interface CustomInputProps {
  label?: string;
  placeholder: string;
  onChangeText: any;
  value: string;
  editable?: boolean;
  selectTextOnFocus?: boolean;
}

const CustomInputTextArea = (props: CustomInputProps) => {
  const {
    label,
    placeholder,
    onChangeText,
    value,
    editable = true,
    selectTextOnFocus = false,
  } = props;
  const [borderColor, setBorderColor] = React.useState('#FFFFFF');
  const [height, setHeight] = React.useState(0);

  return (
    <>
      {label !== '' && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.wrapper, {borderColor: borderColor}]}>
        <TextInput
          style={[
            styles.input,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              height: Math.max(35, height),
              color: editable ? '#000000' : '#a1a1a1',
            },
          ]}
          autoCorrect={false}
          multiline={true}
          onFocus={() => setBorderColor('#5352ED')}
          onBlur={() => setBorderColor('#FFFFFF')}
          onChangeText={item => onChangeText(item)}
          onContentSizeChange={e => setHeight(e.nativeEvent.contentSize.height)}
          value={value}
          placeholder={placeholder}
          editable={editable}
          selectTextOnFocus={selectTextOnFocus}
          placeholderTextColor="#a9abb0"
        />
      </View>
    </>
  );
};

export default CustomInputTextArea;
