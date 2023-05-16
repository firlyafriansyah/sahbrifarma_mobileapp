import {faCalendarDays} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import styles from '../../../styles/Components/Input';
import Gap from '../../Gap';

interface CustomInputDateProps {
  label?: string;
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

const CustomInputDate = (props: CustomInputDateProps) => {
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
      {label !== '' && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.wrapper, {borderColor: borderColor}]}>
        <View style={styles.inputDateWrapper}>
          <Gap width={2} />
          <TextInput
            style={styles.inputDate}
            autoCorrect={false}
            onFocus={() => setBorderColor('#5352ED')}
            onBlur={() => setBorderColor('#FFFFFF')}
            onChangeText={item => setDate(item)}
            value={date}
            placeholder="DD"
            keyboardType="numeric"
            editable={editable}
            selectTextOnFocus={selectTextOnFocus}
            maxLength={2}
          />
          <Text style={styles.slash}>/</Text>
          <TextInput
            style={styles.inputDate}
            autoCorrect={false}
            onFocus={() => setBorderColor('#5352ED')}
            onBlur={() => setBorderColor('#FFFFFF')}
            onChangeText={item => setMonth(item)}
            value={month}
            placeholder="MM"
            keyboardType="numeric"
            editable={editable}
            selectTextOnFocus={selectTextOnFocus}
            maxLength={2}
          />
          <Text style={styles.slash}>/</Text>
          <TextInput
            style={styles.inputDate}
            autoCorrect={false}
            onFocus={() => setBorderColor('#5352ED')}
            onBlur={() => setBorderColor('#FFFFFF')}
            onChangeText={item => setYear(item)}
            value={year}
            placeholder="YYYY"
            keyboardType="numeric"
            editable={editable}
            selectTextOnFocus={selectTextOnFocus}
            maxLength={4}
          />
        </View>
        <Pressable style={styles.iconWrapper} onPress={() => iconAction()}>
          <FontAwesomeIcon icon={faCalendarDays} size={20} />
        </Pressable>
      </View>
    </>
  );
};

export default CustomInputDate;
