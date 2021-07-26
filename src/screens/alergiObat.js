/* eslint-disable react-native/no-inline-styles */
import {faWalking} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  CustomButton,
  CustomHeader,
  FloatingButton,
  Input,
  ListItem,
} from '../components';
import {CommonActions} from '@react-navigation/routers';
import {HOST} from '../data/constants';

const AlergiObat = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [idPasien, setIdPasien] = useState();
  const [namaObat, setNamaObat] = useState([]);
  const [inputObat, setInputObat] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const obat = route.params?.data.nama_obat;
    setIdPasien(route.params?.data.id_pasien);
    if (obat) {
      setNamaObat(obat.slice(0, obat.length - 2).split(', '));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bodyData = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({
      nama_obat: namaObat ? namaObat.join(', ') + ', ' : null,
    }),
  };

  const updateObat = () => {
    fetch(`${HOST}/alergi-obat/${idPasien}`, bodyData)
      .then(resJson => resJson.json())
      .then(res => {
        if (res.status === 'success') {
          setLoading(false);
          Alert.alert('Data berhasil disimpan!');
          const resetAction = CommonActions.reset({
            index: 1,
            routes: [{name: 'DetailPasien', params: {id_pasien: idPasien}}],
          });
          navigation.dispatch(resetAction);
        } else {
          Alert.alert('Data gagal diperbarui!');
        }
      })
      .catch(() => Alert.alert('Kesalahan pada sistem!'));
  };

  return (
    <View style={style.container}>
      <CustomHeader title={'Alergi Obat'} onPress={() => navigation.goBack()} />
      <ScrollView style={style.scrollViewStyle}>
        <View>
          {namaObat.length <= 0 ? (
            <Text style={{textAlign: 'center'}}>Tidak ada Alergi</Text>
          ) : (
            namaObat
              .slice(0)
              .map((item, index) => (
                <ListItem
                  title={item}
                  key={index}
                  onPress={() =>
                    setNamaObat(namaObat.filter(it => it !== item))
                  }
                />
              ))
          )}
          {!namaObat ? null : (
            <CustomButton
              mt={120}
              mb={30}
              title="Simpan"
              navigation={() => {
                setLoading(true);
                updateObat();
              }}
            />
          )}
        </View>
      </ScrollView>
      <FloatingButton navigation={() => setModalVisible(true)} />

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={style.modalStyle}>
          <View style={style.modalWrapper}>
            <Text style={style.modalTitle}>Tambah Baru</Text>
            <Input
              bg={'#FFF'}
              mb={20}
              onChangeText={item => setInputObat(item)}
              value={inputObat}
            />
            <View style={style.modalButton}>
              <Pressable
                style={{marginRight: 30}}
                onPress={() => setModalVisible(false)}>
                <Text style={style.button}>Batal</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setNamaObat(arr => [...arr, `${inputObat}`]);
                  setInputObat('');
                  setModalVisible(false);
                }}>
                <Text style={style.button}>Simpan</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    marginTop: 60,
    paddingHorizontal: 30,
  },
  modalStyle: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    top: '30%',
    width: '100%',
  },
  modalWrapper: {
    width: '80%',
    backgroundColor: '#E3E7EB',
    padding: 30,
    borderRadius: 10,
    elevation: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2F3542',
    marginBottom: 15,
    marginLeft: 15,
  },
  modalInput: {
    backgroundColor: '#FFF',
  },
  modalButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    fontSize: 16,
    fontFamily: 'Poppis-Reguler',
    color: '#2F3542',
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

export default AlergiObat;
