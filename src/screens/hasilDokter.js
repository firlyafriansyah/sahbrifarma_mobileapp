/* eslint-disable radix */
import {faWalking} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {View, Text, ScrollView, StyleSheet, Alert, Modal} from 'react-native';
import {CustomButton, CustomHeader, Input} from '../components';
import {HOST} from '../data/constants';

const HasilDokter = ({navigation, route}) => {
  const [editable, setEditable] = useState(false);
  const [id, setId] = useState();
  const [tensi, setTensi] = useState();
  const [gula, setGula] = useState();
  const [asam, setAsam] = useState();
  const [kolestrol, setKolestrol] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = route.params?.data;
    setId(data.id);
    setTensi(data.tensi_darah.toString());
    setGula(data.gula_darah.toString());
    setAsam(data.asam_urat.toString());
    setKolestrol(data.kolestrol.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bodyData = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({
      tensi_darah: parseInt(tensi),
      gula_darah: parseInt(gula),
      asam_urat: parseInt(asam),
      kolestrol: parseInt(kolestrol),
    }),
  };

  const update = () => {
    setLoading(true);
    fetch(`${HOST}/hasil-dokter/${id}`, bodyData)
      .then(resJson => resJson.json())
      .then(res => {
        if (res.status === 'success') {
          setEditable(false);
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

  const hapusHasilDokter = () => {
    setLoading(true);
    fetch(`${HOST}/hasil-dokter/delete/${id}`, {method: 'DELETE'})
      .then(resJson => resJson.json())
      .then(res => {
        if (res.status === 'success') {
          setLoading(false);
          navigation.navigate('DetailPasien');
        } else {
          setLoading(false);
          Alert.alert('Data gagal dihapus!');
        }
      })
      .catch(() => {
        setLoading(false);
        Alert.alert('Terjadi kesalah pada sistem!');
      });
  };

  return (
    <View style={style.container}>
      <CustomHeader
        title={'Hasil Cek Dokter'}
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
            editable={editable}
            onChangeText={item => setTensi(item)}
            value={tensi}
            keyboardType={'number-pad'}
          />
          <Text style={style.label}>Gula Darah</Text>
          <Input
            mb={15}
            placeholder={'Gula Darah Pasien'}
            editable={editable}
            onChangeText={item => setGula(item)}
            value={gula}
            keyboardType={'number-pad'}
          />
          <Text style={style.label}>Asam Urat</Text>
          <Input
            mb={15}
            placeholder={'Asam Urat Pasien'}
            editable={editable}
            onChangeText={item => setAsam(item)}
            value={asam}
            keyboardType={'number-pad'}
          />
          <Text style={style.label}>Kolestrol</Text>
          <Input
            mb={15}
            placeholder={'Kolestrol Pasien'}
            editable={editable}
            onChangeText={item => setKolestrol(item)}
            value={kolestrol}
            keyboardType={'number-pad'}
          />
          <CustomButton
            title={editable ? 'Simpan' : 'Ubah'}
            mt={60}
            navigation={() => {
              editable ? update() : setEditable(true);
            }}
          />
          <CustomButton
            title={'Hapus'}
            mt={20}
            mb={60}
            navigation={() => hapusHasilDokter()}
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

export default HasilDokter;
