/* eslint-disable radix */
import React, {useEffect, useState} from 'react';
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

const HasilPeriksaByDate = ({navigation, route}) => {
  const [idPasien, setIdPasien] = useState();
  const [hasilPeriksaByDate, setHasilPeriksaByDate] = useState();
  const [hasilPeriksa, setHasilPeriksa] = useState();

  const hasilPeriksaFunc = (data, date) => {
    let result = '';
    data.map(item => {
      if (item.tanggal_berobat === date) {
        result = item;
      }
    });
    return result;
  };

  useEffect(() => {
    const hasilPeriksaData = route.params?.data;
    const hasilPeriksaDate = [];
    setIdPasien(route.params?.id);
    hasilPeriksaData.forEach(item => {
      hasilPeriksaDate.push(item.tanggal_berobat);
    });
    setHasilPeriksa(hasilPeriksaData);
    setHasilPeriksaByDate(hasilPeriksaDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showHasilPeriksaByDate = () => {
    if (!hasilPeriksaByDate) {
      return <Text style={style.textNoData}>Tidak ada hasil</Text>;
    } else {
      return hasilPeriksaByDate.length <= 0 ? (
        <Text style={style.textWarning}>
          Tidak ada data Hasil Periksa Periksa!
        </Text>
      ) : (
        hasilPeriksaByDate
          .slice(0)
          .reverse()
          .map((item, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                navigation.navigate({
                  name: 'Hasil Periksa',
                  params: {
                    data: hasilPeriksaFunc(hasilPeriksa, item),
                    id: idPasien,
                  },
                });
              }}>
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
      <CustomHeader
        title={'Hasil Periksa'}
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={style.scrollViewStyle}>
        {showHasilPeriksaByDate()}
      </ScrollView>
      <FloatingButton
        navigation={() => {
          navigation.navigate({
            name: 'Input Hasil Periksa',
            params: {data: idPasien},
          });
        }}
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

export default HasilPeriksaByDate;
