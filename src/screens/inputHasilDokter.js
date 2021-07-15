import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {CustomButton, CustomHeader, Input} from '../components';

const InputHasilDokter = ({navigation}) => {
  return (
    <View style={style.container}>
      <CustomHeader
        title={'Input Hasil Cek Dokter'}
        onPress={() => navigation.goBack()}
      />
      <ScrollView
        style={style.scrollViewStyle}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={style.wrapper}>
          <Text style={style.label}>Tensi</Text>
          <Input mb={15} placeholder={'Tensi Pasien'} />
          <Text style={style.label}>Gula Darah</Text>
          <Input mb={15} placeholder={'Gula Darah Pasien'} />
          <Text style={style.label}>Asam Urat</Text>
          <Input mb={15} placeholder={'Asam Urat Pasien'} />
          <Text style={style.label}>Kolestrol</Text>
          <Input mb={15} placeholder={'Kolestrol Pasien'} />
          <CustomButton
            title={'Simpan'}
            mt={60}
            mb={60}
            navigation={() => navigation.navigate('Hasil Dokter By Date')}
          />
        </View>
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
  scrollViewStyle: {
    width: '100%',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginTop: 60,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Reguler',
    color: '#2F3542',
    marginBottom: 5,
    marginLeft: 5,
  },
  bubbleTag: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
});

export default InputHasilDokter;
