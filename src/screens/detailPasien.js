import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Category, CustomHeader} from '../components';

const DetailPasien = ({navigation}) => {
  return (
    <View style={style.container}>
      <CustomHeader onPress={() => navigation.goBack()} title={'Edit Profil'} />
      <View style={style.categoryWrapper}>
        <Category
          source={require('../../assets/images/profil_icon.png')}
          title={'Edit Profil'}
        />
        <Category
          source={require('../../assets/images/alergi_obat.png')}
          title={'Alegi Obat'}
        />
        <Category
          source={require('../../assets/images/hasil_cek_dokter.png')}
          title={'Hasil Cek Dokter'}
        />
        <Category
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
