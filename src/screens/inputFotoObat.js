import {faWalking} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import {Camera, CustomButton, CustomHeader} from '../components';
import {HOST} from '../data/constants';

const InputFotoObat = ({navigation, route}) => {
  const [idPasien, setIdPasien] = useState();
  const [img, setImg] = useState([]);
  const [loading, setLoading] = useState(false);

  const bodyData = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      foto: img ? img.join(', ') + ', ' : null,
    }),
  };

  const simpan = () => {
    setLoading(true);
    fetch(`${HOST}/foto-obat/tambah/${idPasien}`, bodyData)
      .then(resJson => resJson.json())
      .then(res => {
        if (res.status === 'success') {
          setLoading(false);
          Alert.alert('Foto berhasil disimpan!');
          navigation.navigate('Foto Obat By Date');
        } else {
          setLoading(false);
          Alert.alert('Foto berhasil disimpan!');
        }
      })
      .catch(() => {
        setLoading(false);
        Alert.alert('Terjadi kesalahan pada sistem!');
      });
  };

  useEffect(() => {
    const data = route.params?.data;
    setIdPasien(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={style.conatiner}>
      <CustomHeader
        title={'Input Foto Obat'}
        onPress={() => navigation.goBack()}
      />
      <View style={style.btnCameraWrapper}>
        <Camera
          uri={uri => setImg(arr => [...arr, `${uri}`])}
          back={() => navigation.goBack()}
        />
        <Text style={style.textWarning}>
          Ambil foto secukupnya untuk menghemat memori server! (max: 3 Foto)
        </Text>
      </View>
      <ScrollView
        style={style.scrollViewStyle}
        showsVerticalScrollIndicator={false}>
        <View style={style.imageWrapper}>
          {img.length <= 0 ? (
            <Text style={style.textStyle}>Tidak ada foto</Text>
          ) : (
            img.map((item, index) => (
              <Image
                key={index}
                style={style.imageStyle}
                source={{
                  uri: `data:image/jpg;base64,${item}`,
                }}
              />
            ))
          )}
        </View>
        <CustomButton
          mt={30}
          mb={30}
          title={'Simpan'}
          navigation={() => {
            simpan();
          }}
        />
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
  conatiner: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
  },
  scrollViewStyle: {
    width: '100%',
    paddingHorizontal: 30,
  },
  btnCameraWrapper: {
    alignItems: 'center',
    marginVertical: 30,
  },
  imageWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  imageStyle: {
    width: 300,
    height: 300,
    marginBottom: 30,
  },
  textStyle: {
    fontSize: 16,
    fontFamily: 'Poppins-Reguler',
    textAlign: 'center',
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
  textWarning: {
    fontFamily: 'Poppins-Reguler',
    textAlign: 'center',
    marginBottom: 50,
    color: '#c0392b',
  },
});

export default InputFotoObat;
