import React from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from '../../../styles/Components/Input';
import Gap from '../../Gap';

interface CustomInputBloodPressureProps {
  label?: string;
  systole: string;
  setSystole: any;
  diastole: string;
  setDiastole: any;
  pulse: string;
  setPulse: any;
  editable?: boolean;
  selectTextOnFocus?: boolean;
}

const CustomInputBloodPressure = (props: CustomInputBloodPressureProps) => {
  const {
    label,
    systole,
    setSystole,
    diastole,
    setDiastole,
    pulse,
    setPulse,
    editable = true,
    selectTextOnFocus = false,
  } = props;
  const [borderColor, setBorderColor] = React.useState('#FFFFFF');

  return (
    <>
      {label !== '' && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.wrapper, {borderColor: borderColor}]}>
        <View style={styles.inputDateWrapper}>
          <TextInput
            style={styles.inputDate}
            autoCorrect={false}
            onFocus={() => setBorderColor('#5352ED')}
            onBlur={() => setBorderColor('#FFFFFF')}
            onChangeText={item => setSystole(item)}
            value={systole}
            placeholder="---"
            keyboardType="numeric"
            editable={editable}
            selectTextOnFocus={selectTextOnFocus}
            maxLength={3}
          />
          <Gap width={10} />
          <Text>/</Text>
          <Gap width={10} />
          <TextInput
            style={styles.inputDate}
            autoCorrect={false}
            onFocus={() => setBorderColor('#5352ED')}
            onBlur={() => setBorderColor('#FFFFFF')}
            onChangeText={item => setDiastole(item)}
            value={diastole}
            placeholder="--"
            keyboardType="numeric"
            editable={editable}
            selectTextOnFocus={selectTextOnFocus}
            maxLength={2}
          />
          <Gap width={10} />
          <Text>/</Text>
          <Gap width={10} />
          <TextInput
            style={styles.inputDate}
            autoCorrect={false}
            onFocus={() => setBorderColor('#5352ED')}
            onBlur={() => setBorderColor('#FFFFFF')}
            onChangeText={item => setPulse(item)}
            value={pulse}
            placeholder="--"
            keyboardType="numeric"
            editable={editable}
            selectTextOnFocus={selectTextOnFocus}
            maxLength={2}
          />
        </View>
      </View>
    </>
  );
};

export default CustomInputBloodPressure;
