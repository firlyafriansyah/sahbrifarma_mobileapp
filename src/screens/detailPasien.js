import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useState} from 'react/cjs/react.development';
import {Category, CustomHeader} from '../components';

const DetailPasien = ({navigation, route}) => {
  const [idPasien, setIdPasien] = useState();

  useEffect(() => {
    setIdPasien(route.params?.id_pasien);
  }, [route.params?.id_pasien]);

  return (
    <View style={style.container}>
      <CustomHeader
        onPress={() => navigation.goBack()}
        title={'Detail Pasien'}
      />
      <View style={style.categoryWrapper}>
        <Category
          onPress={() =>
            navigation.navigate({
              name: 'Identitas Pasien',
              params: {id_pasien: idPasien},
              merge: true,
            })
          }
          source={require('../../assets/images/profil_icon.png')}
          title={'Identitas Pasien'}
        />
        <Category
          onPress={() =>
            navigation.navigate({
              name: 'Alergi Obat',
              params: {id_pasien: idPasien},
              merge: true,
            })
          }
          source={require('../../assets/images/alergi_obat.png')}
          title={'Alergi Obat'}
        />
        <Category
          onPress={() =>
            navigation.navigate({
              name: 'Keluhan By Date',
              params: {id_pasien: idPasien},
              merge: true,
            })
          }
          source={require('../../assets/images/keluhan.png')}
          title={'Keluhan'}
        />
        <Category
          onPress={() =>
            navigation.navigate({
              name: 'Hasil Dokter By Date',
              params: {id_pasien: idPasien},
              merge: true,
            })
          }
          source={require('../../assets/images/hasil_cek_dokter.png')}
          title={'Hasil Cek Dokter'}
        />
        <Category
          onPress={() =>
            navigation.navigate({
              name: 'Foto Obat By Date',
              params: {id_pasien: idPasien},
              merge: true,
            })
          }
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
