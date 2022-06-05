/* eslint-disable radix */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {CustomHeader} from '../../components';
import {TZONE} from '../../data/constants';

const RiwayatBerobat = ({navigation, route}) => {
  const [date, setDate] = useState();

  useEffect(() => {
    const data = [];
    route.params?.data.forEach(item => {
      data.push(
        `${item.tanggal_berobat.toString().split('T')[0]}/${
          item.tanggal_berobat.toString().split('T')[1].split('.')[0]
        }/${item.admin}/${item.action}`,
      );
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
          ? date
              .slice(0)
              .reverse()
              .map((item, index) => (
                <View key={index} style={style.wrapper}>
                  <View style={style.wrapperDate}>
                    <Text style={style.textStyle}>{item.split('/')[0]}</Text>
                    <Text style={style.textStyle}>
                      {`${parseInt(item.split('/')[1].split(':')[0]) + TZONE}:${
                        item.split('/')[1].split(':')[1]
                      }:${item.split('/')[1].split(':')[2]}`}
                    </Text>
                  </View>
                  <View style={style.wrapperInfo}>
                    <Text style={style.textStyleInfo}>
                      {item.split('/')[3]}
                    </Text>
                    <Text style={style.textStyleInfo}>
                      {item.split('/')[2]}
                    </Text>
                  </View>
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
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#D2D8DF',
  },
  wrapperDate: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapperInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollViewStyle: {
    paddingHorizontal: 30,
    width: '100%',
    marginTop: 50,
  },
  textStyle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  textStyleInfo: {
    fontSize: 16,
    fontFamily: 'Poppins-Reguler',
  },
});

export default RiwayatBerobat;
