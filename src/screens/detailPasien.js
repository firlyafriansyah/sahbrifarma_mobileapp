import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Category, CustomHeader} from '../components';

const DetailPasien = ({navigation}) => {
  return (
    <View style={style.container}>
      <CustomHeader
        onPress={() => navigation.goBack()}
        title={'Detail Pasien'}
      />
      <View style={style.categoryWrapper}>
        <Category
          onPress={() => navigation.navigate('Identitas Pasien')}
          source={require('../../assets/images/profil_icon.png')}
          title={'Identitas Pasien'}
        />
        <Category
          onPress={() => navigation.navigate('Alergi Obat')}
          source={require('../../assets/images/alergi_obat.png')}
          title={'Alergi Obat'}
        />
        <Category
          onPress={() => navigation.navigate('Keluhan By Date')}
          source={require('../../assets/images/keluhan.png')}
          title={'Keluhan'}
        />
        <Category
          onPress={() => navigation.navigate('Hasil Dokter By Date')}
          source={require('../../assets/images/hasil_cek_dokter.png')}
          title={'Hasil Cek Dokter'}
        />
        <Category
          onPress={() => navigation.navigate('Foto Obat By Date')}
          source={require('../../assets/images/foto_obat.png')}
          title={'Foto Obat'}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  categoryWrapper: {
    width: '100%',
    marginTop: 60,
  },
});

export default DetailPasien;
