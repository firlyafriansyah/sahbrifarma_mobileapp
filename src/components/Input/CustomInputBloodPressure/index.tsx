import {faCalendar} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import styles from '../../../styles/CustomInputStyles';
import Gap from '../../Gap';

interface CustomInputBloodPressureProps {
  label: string;
  date: string;
  setDate: any;
  month: string;
  setMonth: any;
  year: string;
  setYear: any;
  editable?: boolean;
  selectTextOnFocus?: boolean;
  iconAction?: any;
}

const CustomInputBloodPressure = (props: CustomInputBloodPressureProps) => {
  const {
    label,
    date,
    setDate,
    month,
    setMonth,
    year,
    setYear,
    editable = true,
    selectTextOnFocus = false,
    iconAction = null,
  } = props;
  const [borderColor, setBorderColor] = React.useState('#FFFFFF');

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.wrapper, {borderColor: borderColor}]}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            onFocus={() => setBorderColor('#5352ED')}
            onBlur={() => setBorderColor('#FFFFFF')}
            onChangeText={item => setDate(item)}
            value={date}
            placeholder="000"
            keyboardType="numeric"
            editable={editable}
            selectTextOnFocus={selectTextOnFocus}
            maxLength={3}
          />
          <Gap width={10} />
          <Text>/</Text>
          <Gap width={10} />
          <TextInput
            style={styles.input}
            autoCorrect={false}
            onFocus={() => setBorderColor('#5352ED')}
            onBlur={() => setBorderColor('#FFFFFF')}
            onChangeText={item => setMonth(item)}
            value={month}
            placeholder="00"
            keyboardType="numeric"
            editable={editable}
            selectTextOnFocus={selectTextOnFocus}
            maxLength={2}
          />
          <Gap width={10} />
          <Text>/</Text>
          <Gap width={10} />
          <TextInput
            style={styles.input}
            autoCorrect={false}
            onFocus={() => setBorderColor('#5352ED')}
            onBlur={() => setBorderColor('#FFFFFF')}
            onChangeText={item => setYear(item)}
            value={year}
            placeholder="00"
            keyboardType="numeric"
            editable={editable}
            selectTextOnFocus={selectTextOnFocus}
            maxLength={2}
          />
        </View>
        <Pressable style={styles.iconWrapper} onPress={() => iconAction()}>
          <FontAwesomeIcon icon={faCalendar} />
        </Pressable>
      </View>
    </>
  );
};

export default CustomInputBloodPressure;
