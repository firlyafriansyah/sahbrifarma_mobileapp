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

const KeluhanByDate = ({navigation, route}) => {
  const [keluhanByDate, setKeluhanByDate] = useState();
  const [keluhan, setKeluhan] = useState();

  const keluhanFunc = (data, date) => {
    data.map(item => {
      if (item.tanggal_berobat.split('T')[0] === date) {
        return item;
      }
    });
  };

  useEffect(() => {
    const keluhan = route.params?.data;
    const keluhanDate = [];
    keluhan.forEach(item => {
      keluhanDate.push(item.tanggal_berobat.split('T')[0]);
    });
    setKeluhan(keluhan);
    setKeluhanByDate(keluhanDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showKeluhanByDate = () => {
    if (!keluhanByDate) {
      return <Text style={style.textNoData}>Tidak ada keluhan</Text>;
    } else {
      return keluhanByDate
        .slice(0)
        .reverse()
        .map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              navigation.navigate({
                name: 'Keluhan',
                params: {data: keluhanFunc(keluhan, item)},
                mergea: true,
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
