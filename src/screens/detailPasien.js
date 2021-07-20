import {faWalking} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect} from 'react';
import {View, StyleSheet, Modal, Text, Alert} from 'react-native';
import {useState} from 'react/cjs/react.development';
import {Category, CustomHeader} from '../components';
import {HOST} from '../data/constants';

const DetailPasien = ({navigation, route}) => {
  const [idnPasien, setIdnPasien] = useState();
  const [alergiObat, setAlergiObat] = useState();
  const [keluhan, setKeluhan] = useState();
  const [fotoObat, setFotoObat] = useState();
  const [loading, setLoading] = useState(false);

  const getData = () => {
    fetch(`${HOST}/detail/pasien/${route.params?.id_pasien}`)
      .then(resJson => resJson.json())
      .then(res => {
        setIdnPasien(res.idnPasien);
        setAlergiObat(res.alergiObat);
        setKeluhan(res.keluhan);
        setFotoObat(res.fotoObat);
        setLoading(false);
      })
      .catch(() => Alert.alert('Terjadi kesalahan pada jaringan!'));
  };

  useEffect(() => {
    setLoading(true);
    getData();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              params: {data: idnPasien},
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
              params: {data: alergiObat},
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
              params: {data: keluhan},
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
              params: {data: fotoObat},
              merge: true,
            })
          }
          source={require('../../assets/images/foto_obat.png')}
          title={'Foto Obat'}
        />
      </View>
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View style={style.modalStyle}>
          <View style={style.modalWrapper}>
            <FontAwesomeIcon icon={faWalking} size={25} sty />
            <Text style={style.textModal}>Mohon Tunggu!</Text>
          </View>
        </View>
      </Modal>
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
  modalStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000050',
    height: '100%',
    width: '100%',
  },
  modalWrapper: {
    width: '50%',
    backgroundColor: '#FFF',
    padding: 30,
    borderRadius: 10,
    elevation: 20,
    alignItems: 'center',
  },
  textModal: {
    marginTop: 20,
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DetailPasien;
