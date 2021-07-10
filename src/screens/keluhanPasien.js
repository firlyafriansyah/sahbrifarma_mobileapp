import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CustomHeader, FloatingButton, Input, ListItem} from '../components';

const KeluhanPasien = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [keluhan, setKeluhan] = useState([]);
  const [inputKeluhan, setInputKeluhan] = useState('');

  return (
    <View style={style.container}>
      <CustomHeader title={'Keluhan'} onPress={() => navigation.goBack()} />
      <ScrollView style={style.scrollViewStyle}>
        <View>
          {keluhan.length <= 0 ? (
            <Text style={{textAlign: 'center'}}>Tidak ada keluhan</Text>
          ) : (
            keluhan.map((item, index) => (
              <ListItem
                title={item}
                key={index}
                onPress={() => setKeluhan(keluhan.filter(it => it !== item))}
              />
            ))
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
              onChangeText={item => setInputKeluhan(item)}
              value={inputKeluhan}
            />
            <View style={style.modalButton}>
              <Pressable
                style={{marginRight: 30}}
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
});

export default KeluhanPasien;
