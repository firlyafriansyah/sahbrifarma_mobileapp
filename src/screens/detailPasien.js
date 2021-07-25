import {faWalking} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Alert,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {Category, CustomHeader} from '../components';
import {HOST} from '../data/constants';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const DetailPasien = ({navigation, route}) => {
  const [idnPasien, setIdnPasien] = useState();
  const [alergiObat, setAlergiObat] = useState();
  const [keluhan, setKeluhan] = useState();
  const [fotoObat, setFotoObat] = useState();
  const [hasilDokter, setHasilDokter] = useState();
  const [riwayatBerobat, setRiwayatBerobat] = useState();
  const [loading, setLoading] = useState(false);

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    wait(2000).then(() => {
      getData();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = () => {
    fetch(`${HOST}/pasien/detail/${route.params?.id_pasien}`)
      .then(resJson => resJson.json())
      .then(res => {
        setIdnPasien(res.idnPasien);
        setAlergiObat(res.alergiObat);
        setKeluhan(res.keluhan);
        setFotoObat(res.fotoObat);
        setHasilDokter(res.hasilPeriksaDokter);
        setRiwayatBerobat(res.riwayatBerobat);
        setLoading(false);
      })
      .catch(() => Alert.alert('Terjadi kesalahan pada jaringan!'));
  };

  const hapusPasien = () => {
    setLoading(true);
    fetch(`${HOST}/pasien/delete/${idnPasien.id_pasien}`, {method: 'DELETE'})
      .then(resJson => resJson.json())
      .then(res => {
        if (res.status === 'success') {
          setLoading(false);
          Alert.alert('Data pasien berhasil dihapus!');
          navigation.navigate('Home');
        } else {
          setLoading(false);
          Alert.alert('Data pasien gagal dihapus!');
        }
      })
      .catch(() => {
        setLoading(false);
        Alert.alert('Terjadi kesalahan pada sistem!');
      });
  };

  useEffect(() => {
    setLoading(true);
    getData();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
      style={style.scrollViewStyle}
      showsVerticalScrollIndicator={false}>
      <View style={style.container}>
        <CustomHeader
          onPress={() => navigation.goBack()}
          title={'DetailPasien'}
        />
        <View style={style.categoryWrapper}>
          <Category
            onPress={() =>
              navigation.navigate({
                name: 'Identitas Pasien',
                params: {data: idnPasien},
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
              })
            }
            source={require('../../assets/images/keluhan.png')}
            title={'Keluhan'}
          />
          <Category
            onPress={() =>
              navigation.navigate({
                name: 'Hasil Dokter By Date',
                params: {data: hasilDokter},
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
              })
            }
            source={require('../../assets/images/foto_obat.png')}
            title={'Foto Obat'}
          />
          <Category
            onPress={() =>
              navigation.navigate({
                name: 'Riwayat Berobat',
                params: {data: riwayatBerobat},
              })
            }
            source={require('../../assets/images/riwayat_berobat.png')}
            title={'Riwayat Berobat'}
          />
          <Category
            onPress={() => {
              Alert.alert(
                'Apakah anda yakin?',
                'Apakah anda yakin akan menghapus seluruh data pasien ini?',
                [
                  // The "Yes" button
                  {
                    text: 'Ya',
                    onPress: () => {
                      hapusPasien();
                    },
                  },
                  {
                    text: 'Batal',
                  },
                ],
              );
            }}
            source={require('../../assets/images/hapus_pasien.png')}
            title={'Hapus Pasien'}
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
    </ScrollView>
  );
};

const style = StyleSheet.create({
  scrollViewStyle: {
    width: '100%',
    backgroundColor: '#FFF',
  },
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
