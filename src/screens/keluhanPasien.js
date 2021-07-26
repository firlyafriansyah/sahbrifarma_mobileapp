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

const KeluhanPasien = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState();
  const [idPasien, setIdPasien] = useState();
  const [keluhan, setKeluhan] = useState([]);
  const [inputKeluhan, setInputKeluhan] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = route.params?.data;
    const keluhanData = data.keluhan;
    setId(data.id);
    setIdPasien(route.params?.id);
    setKeluhan(keluhanData.slice(0, keluhanData.length - 2).split(', '));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bodyData = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({
      keluhan: keluhan ? keluhan.join(', ') + ', ' : null,
    }),
  };

  const updateKeluhan = () => {
    fetch(`${HOST}/keluhan/${id}`, bodyData)
      .then(resJson => resJson.json())
      .then(res => {
        if (res.status === 'success') {
          setLoading(false);
          Alert.alert('Data berhasil diperbarui!');
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

  const hapusKeluhan = () => {
    setLoading(true);
    fetch(`${HOST}/keluhan/delete/${id}`, {method: 'DELETE'})
      .then(resJson => resJson.json())
      .then(res => {
        if (res.status === 'success') {
          setLoading(false);
          Alert.alert('Data berhasil dihapus!');
          const resetAction = CommonActions.reset({
            index: 1,
            routes: [{name: 'DetailPasien', params: {id_pasien: idPasien}}],
          });
          navigation.dispatch(resetAction);
        } else {
          setLoading(false);
          Alert.alert('Data gagal dihapus!');
        }
      })
      .catch(() => {
        setLoading(false);
        Alert.alert('Terjadi kesalahan pada sistem!');
      });
  };

  return (
    <View style={style.container}>
      <CustomHeader title={'Keluhan'} onPress={() => navigation.goBack()} />
      <ScrollView style={style.scrollViewStyle}>
        <View>
          {keluhan.length <= 0 ? (
            <Text style={style.textCenter}>Tidak ada keluhan</Text>
          ) : (
            keluhan.map((item, index) => (
              <ListItem
                title={item}
                key={index}
                onPress={() => setKeluhan(keluhan.filter(it => it !== item))}
              />
            ))
          )}
          {!keluhan ? null : (
            <CustomButton
              mt={120}
              title="Simpan"
              navigation={() => {
                setLoading(true);
                updateKeluhan();
              }}
            />
          )}
          <CustomButton
            mt={20}
            mb={30}
            title="Hapus"
            navigation={() => {
              hapusKeluhan();
            }}
          />
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
              onChangeText={item => setInputKeluhan(item)}
              value={inputKeluhan}
            />
            <View style={style.modalButton}>
              <Pressable
                style={style.cancelStyle}
                onPress={() => setModalVisible(false)}>
                <Text style={style.button}>Batal</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setKeluhan(arr => [...arr, `${inputKeluhan}`]);
                  setInputKeluhan('');
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
    fontSize: 14,
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
  textCenter: {
    textAlign: 'center',
  },
  cancelStyle: {
    marginRight: 30,
  },
});

export default KeluhanPasien;
