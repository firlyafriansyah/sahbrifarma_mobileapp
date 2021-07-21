import React, {useEffect} from 'react';
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

const HasilDokterByDate = ({navigation, route}) => {
  const [hasilDokterByDate, setHasilDokterByDate] = useState();
  const [hasilDokter, setHasilDokter] = useState();

  const hasilDokterFunc = (data, date) => {
    let result = '';
    data.map(item => {
      if (item.tanggal_berobat.split('T')[0] === date) {
        result = item;
      }
    });
    return result;
  };

  useEffect(() => {
    const hasilDokterData = route.params?.data;
    const hasilDokterDate = [];
    hasilDokterData.forEach(item => {
      hasilDokterDate.push(item.tanggal_berobat.split('T')[0]);
    });
    setHasilDokter(hasilDokterData);
    setHasilDokterByDate(hasilDokterDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showHasilDokterByDate = () => {
    if (!hasilDokterByDate) {
      return <Text style={style.textNoData}>Tidak ada hasil</Text>;
    } else {
      return hasilDokterByDate
        .slice(0)
        .reverse()
        .map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              navigation.navigate({
                name: 'Hasil Dokter',
                params: {data: hasilDokterFunc(hasilDokter, item)},
                merge: true,
              });
            }}>
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
        {showHasilDokterByDate()}
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
