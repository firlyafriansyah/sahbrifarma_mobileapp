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

const FotoObatByDate = ({navigation}) => {
  const [fotoObat, setFotoObat] = useState(['20 April 2021']);

  const showKeluhanByDate = () => {
    if (fotoObat.length <= 0) {
      return <Text style={style.textNoData}>Tidak ada hasil</Text>;
    } else {
      return fotoObat.map((item, index) => (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => navigation.navigate('Foto Obat')}>
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
      <CustomHeader title={'Foto Obat'} onPress={() => navigation.goBack()} />
      <ScrollView style={style.scrollViewStyle}>
        {showKeluhanByDate()}
      </ScrollView>
      <FloatingButton
        navigation={() => navigation.navigate('Input Foto Obat')}
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

export default FotoObatByDate;
