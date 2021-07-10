import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {CustomHeader, FloatingButton} from '../components';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useState} from 'react';

const KeluhanByDate = ({navigation}) => {
  const [keluhanByDate, setKeluhanByDate] = useState([]);

  const showKeluhanByDate = () => {
    if (keluhanByDate.length <= 0) {
      return <Text style={style.textNoData}>Tidak ada keluhan</Text>;
    } else {
      return keluhanByDate.map((item, index) => (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => navigation.navigate('Keluhan')}>
          <View style={style.wrapper}>
            <Text style={style.textStyle}>{item}</Text>
            <FontAwesomeIcon icon={faChevronRight} size={20} />
          </View>
        </TouchableWithoutFeedback>
      ));
    }
  };

  return (
    <View style={style.container}>
      <CustomHeader
        title={'Keluhan Pasien'}
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={style.scrollViewStyle}>
        {showKeluhanByDate()}
      </ScrollView>
      <FloatingButton navigation={() => navigation.navigate('Input Keluhan')} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
  },
  wrapper: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#D2D8DF',
  },
  scrollViewStyle: {
    paddingHorizontal: 30,
    width: '100%',
    marginTop: 50,
  },
  textStyle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  textNoData: {
    fontFamily: 'Poppins-Reguler',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default KeluhanByDate;
