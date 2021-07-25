import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {CustomHeader} from '../components';

const RiwayatBerobat = ({navigation, route}) => {
  const [date, setDate] = useState();

  useEffect(() => {
    let data = [];
    route.params?.data.forEach(item => {
      data.push(item.tanggal_berobat.toString().split('T')[0]);
    });
    setDate(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={style.container}>
      <CustomHeader
        title={'Riwayat Berobat'}
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={style.scrollViewStyle}>
        {date
          ? date.map((item, index) => (
              <View key={index} style={style.wrapper}>
                <Text style={style.textStyle}>{item}</Text>
              </View>
            ))
          : null}
      </ScrollView>
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
});

export default RiwayatBerobat;
