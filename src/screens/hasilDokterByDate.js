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

const HasilDokterByDate = ({navigation}) => {
  const [hasilDokter, setHasilDokter] = useState(['20 April 2021']);

  const showKeluhanByDate = () => {
    if (hasilDokter.length <= 0) {
      return <Text style={style.textNoData}>Tidak ada hasil</Text>;
    } else {
      return hasilDokter.map((item, index) => (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => navigation.navigate('Hasil Dokter')}>
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
        title={'Hasil Cek Dokter'}
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={style.scrollViewStyle}>
        {showKeluhanByDate()}
      </ScrollView>
      <FloatingButton
        navigation={() => navigation.navigate('Input Hasil Dokter')}
      />
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

export default HasilDokterByDate;
