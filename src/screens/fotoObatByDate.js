import React, {useState, useEffect} from 'react';
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
    const hasilDokterData = route.params?.data;
    const hasilDokterDate = [];
    setIdPasien(route.params?.id);
    hasilDokterData.forEach(item => {
      hasilDokterDate.push(item.tanggal_berobat);
    });
    setFotoObat(hasilDokterData);
    setFotoObatByDate(hasilDokterDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showFotoObatByDate = () => {
    if (!fotoObatByDate) {
      return <Text style={style.textNoData}>Tidak ada hasil</Text>;
    } else {
      return fotoObatByDate.length <= 0 ? (
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Poppins-Bold',
            fontSize: 16,
          }}>
          Tidak ada data Foto Obat!
        </Text>
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
                  params: {data: fotoObatFunc(fotoObat, item), id: idPasien},
                })
              }>
              <View style={style.wrapper}>
                <Text style={style.textStyle}>{item.split('T')[0]}</Text>
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
