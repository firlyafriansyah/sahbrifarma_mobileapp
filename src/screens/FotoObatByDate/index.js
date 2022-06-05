/* eslint-disable radix */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {CustomHeader, FloatingButton} from '../../components';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TZONE} from '../../data/constants';

const FotoObatByDate = ({navigation, route}) => {
  const [idPasien, setIdPasien] = useState();
  const [fotoObatByDate, setFotoObatByDate] = useState();
  const [fotoObat, setFotoObat] = useState();

  const fotoObatFunc = (data, date) => {
    let result = '';
    data.map(item => {
      if (item.tanggal_berobat === date) {
        result = item;
      }
    });
    return result;
  };

  useEffect(() => {
    const hasilPeriksa = route.params?.data;
    const hasilPeriksaDate = [];
    setIdPasien(route.params?.id);
    hasilPeriksa.forEach(item => {
      hasilPeriksaDate.push(item.tanggal_berobat);
    });
    setFotoObat(hasilPeriksa);
    setFotoObatByDate(hasilPeriksaDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showFotoObatByDate = () => {
    if (!fotoObatByDate) {
      return <Text style={style.textNoData}>Tidak ada hasil</Text>;
    } else {
      return fotoObatByDate.length <= 0 ? (
        <Text style={style.textWarning}>Tidak ada data Foto Obat!</Text>
      ) : (
        fotoObatByDate
          .slice(0)
          .reverse()
          .map((item, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() =>
                navigation.navigate({
                  name: 'Foto Obat',
                  params: {
                    data: fotoObatFunc(fotoObat, item),
                    id: idPasien,
                  },
                })
              }>
              <View style={style.wrapper}>
                <View style={style.wraperDate}>
                  <Text style={style.textStyle}>{item.split('T')[0]}</Text>
                  <Text style={style.textStyleHours}>
                    {`${
                      parseInt(item.split('T')[1].split('.')[0].split(':')[0]) +
                      TZONE
                    }:${item.split('T')[1].split('.')[0].split(':')[1]}:${
                      item.split('T')[1].split('.')[0].split(':')[2]
                    }`}
                  </Text>
                </View>
                <FontAwesomeIcon icon={faChevronRight} size={20} />
              </View>
            </TouchableWithoutFeedback>
          ))
      );
    }
  };

  return (
    <View style={style.container}>
      <CustomHeader title={'Foto Obat'} onPress={() => navigation.goBack()} />
      <ScrollView style={style.scrollViewStyle}>
        {showFotoObatByDate()}
      </ScrollView>
      <FloatingButton
        navigation={() =>
          navigation.navigate({
            name: 'Input Foto Obat',
            params: {data: idPasien},
          })
        }
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
  wraperDate: {
    display: 'flex',
    flexDirection: 'row',
  },
  scrollViewStyle: {
    paddingHorizontal: 30,
    width: '100%',
    marginTop: 50,
  },
  textStyle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  textStyleHours: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 30,
  },
  textNoData: {
    fontFamily: 'Poppins-Reguler',
    fontSize: 14,
    textAlign: 'center',
  },
  textWarning: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
});

export default FotoObatByDate;
