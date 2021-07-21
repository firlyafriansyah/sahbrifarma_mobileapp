import {faWalking} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, Modal, Alert} from 'react-native';
import {
  BubbleTag,
  CustomButton,
  CustomHeader,
  InputWithButton,
} from '../components';
import {HOST} from '../data/constants';

const InputKeluhan = ({navigation, route}) => {
  const [keluhan, setKeluhan] = useState([]);
  const [idPasien, setIdPasien] = useState();
  const [loading, setLoading] = useState(false);

  const showBubbleTag = (arrayState, setArrayState) => {
    if (arrayState.length) {
      return arrayState.map((item, index) => (
        <BubbleTag
          key={index}
          name={item}
          onPress={() => setArrayState(arrayState.filter(it => it !== item))}
        />
      ));
    }
  };

  useEffect(() => {
    setIdPasien(route.params?.data);
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bodyData = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      keluhan: keluhan.length > 0 ? keluhan.join(', ') + ', ' : null,
    }),
  };

  const addKeluhan = () => {
    fetch(`${HOST}/keluhan/tambah/${idPasien}`, bodyData)
      .then(resJson => resJson.json())
      .then(res => {
        if (res.status === 'success') {
          setLoading(false);
          navigation.navigate('Keluhan By Date');
        } else {
          Alert.alert('Gagal memperbarui data!');
          setLoading(false);
        }
      })
      .catch(() => {
        Alert.alert('Terjadi kesalahan sistem!');
        setLoading(false);
      });
  };

  return (
    <View style={style.container}>
      <CustomHeader
        title={'Input Keluhan'}
        onPress={() => navigation.goBack()}
      />
      <ScrollView
        style={style.scrollViewStyle}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={style.wrapper}>
          <Text style={style.label}>Keluhan</Text>
          <InputWithButton
            placeholder={'Keluhan Pasien'}
            mb={5}
            onPress={item => setKeluhan(arr => [...arr, `${item}`])}
          />
          <View style={style.bubbleTag}>
            {showBubbleTag(keluhan, setKeluhan)}
          </View>
          <CustomButton
            title={'Simpan'}
            mt={60}
            mb={60}
            navigation={() => {
              setLoading(true);
              addKeluhan();
            }}
          />
          <Modal animationType="fade" transparent={true} visible={loading}>
            <View style={style.modalStyleLoading}>
              <View style={style.modalWrapperLoading}>
                <FontAwesomeIcon icon={faWalking} size={25} sty />
                <Text style={style.textModal}>Mohon Tunggu!</Text>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
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

export default InputKeluhan;
