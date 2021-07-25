/* eslint-disable radix */
import {faWalking} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView, Alert, Modal} from 'react-native';
import {CustomButton, CustomHeader, Input} from '../components';
import {HOST} from '../data/constants';

const InputHasilDokter = ({navigation, route}) => {
  const [idPasien, setIdPasien] = useState();
  const [tensi, setTensi] = useState();
  const [gula, setGula] = useState();
  const [asam, setAsam] = useState();
  const [kolestrol, setKolestrol] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIdPasien(route.params?.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bodyData = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      tensi_darah: parseInt(tensi),
      gula_darah: parseInt(gula),
      asam_urat: parseInt(asam),
      kolestrol: parseInt(kolestrol),
    }),
  };

  const simpan = () => {
    setLoading(true);
    fetch(`${HOST}/hasil-dokter/tambah/${idPasien}`, bodyData)
      .then(resJson => resJson.json())
      .then(res => {
        if (res.status === 'success') {
          navigation.navigate('DetailPasien');
          setLoading(false);
        } else {
          setLoading(false);
          Alert.alert('Data gagal disimpan!');
        }
      })
      .catch(() => {
        setLoading(false);
        Alert.alert('Terjadi kesalahan pada sistem!');
      });
  };

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
          <Input
            mb={15}
            placeholder={'Tensi Pasien'}
            onChangeText={item => setTensi(item)}
            keyboardType={'number-pad'}
          />
          <Text style={style.label}>Gula Darah</Text>
          <Input
            mb={15}
            placeholder={'Gula Darah Pasien'}
            onChangeText={item => setGula(item)}
            keyboardType={'number-pad'}
          />
          <Text style={style.label}>Asam Urat</Text>
          <Input
            mb={15}
            placeholder={'Asam Urat Pasien'}
            onChangeText={item => setAsam(item)}
            keyboardType={'number-pad'}
          />
          <Text style={style.label}>Kolestrol</Text>
          <Input
            mb={15}
            placeholder={'Kolestrol Pasien'}
            onChangeText={item => setKolestrol(item)}
            keyboardType={'number-pad'}
          />
          <CustomButton
            title={'Simpan'}
            mt={60}
            mb={60}
            navigation={() => simpan()}
          />
        </View>
      </ScrollView>
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View style={style.modalStyleLoading}>
          <View style={style.modalWrapperLoading}>
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
  modalStyleLoading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000050',
    height: '100%',
    width: '100%',
  },
  modalWrapperLoading: {
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

export default InputHasilDokter;
