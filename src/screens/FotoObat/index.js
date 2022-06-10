import {faTrash, faWalking} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  Modal,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {Camera, CustomButton, CustomHeader} from '../../components';
import {CommonActions} from '@react-navigation/routers';
import {HOST} from '../../data/constants';
import {getDataAsyncStorage} from '../../data/asyncStorage';

const FotoObat = ({navigation, route}) => {
  const [img, setImg] = useState([]);
  const [firstImg, setFirstImg] = useState([]);
  const [idPasien, setIdPasien] = useState();
  const [id, setId] = useState();
  const [admin, setAdmin] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = route.params?.data;
    setId(data.id);
    setIdPasien(route.params?.id);
    getDataAsyncStorage('admin')
      .then(res => {
        setAdmin(res.adminName);
      })
      .catch(() => {
        Alert('Terjadi kegagalan mengambil data dari Async Storage!');
      });
    const image = data.foto !== '' ? data.foto.split(', ') : [];
    setImg(image.length <= 0 ? [] : image.slice(0, image.length - 1));
    setFirstImg(image.length <= 0 ? [] : image.slice(0, image.length - 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bodyData = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({
      foto: img ? img.join(', ') + ', ' : null,
      admin: admin,
      idPasien: idPasien,
    }),
  };

  const update = () => {
    setLoading(true);
    if (img.length <= 0) {
      setLoading(false);
      Alert.alert('Upload setidaknya satu foto!');
    } else {
      fetch(`${HOST}/foto/${id}`, bodyData)
        .then(resJson => resJson.json())
        .then(res => {
          if (res.status === 'success') {
            setLoading(false);
            Alert.alert('Berhasil!', 'Foto berhasil disimpan!', [
              {
                text: 'Oke',
                onPress: () => {
                  const resetAction = CommonActions.reset({
                    index: 1,
                    routes: [
                      {
                        name: 'DetailPasien',
                        params: {id_pasien: idPasien},
                      },
                    ],
                  });
                  navigation.dispatch(resetAction);
                },
              },
            ]);
          } else {
            setLoading(false);
            Alert.alert('Data gagal disimpan!');
          }
        })
        .catch(() => {
          setLoading(false);
          Alert.alert('Terjadi kesalahan pada sistem!');
        });
    }
  };

  const hapsuBody = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
    body: JSON.stringify({
      admin: admin,
      idPasien: idPasien,
    }),
  };

  const hapus = () => {
    setLoading(true);
    fetch(`${HOST}/foto/delete/${id}`, hapsuBody)
      .then(resJson => resJson.json())
      .then(res => {
        if (res.status === 'success') {
          setLoading(false);
          Alert.alert('Berhasil!', 'Data berhasil dihapus!', [
            {
              text: 'Oke',
              onPress: () => {
                const resetAction = CommonActions.reset({
                  index: 1,
                  routes: [
                    {
                      name: 'DetailPasien',
                      params: {id_pasien: idPasien},
                    },
                  ],
                });
                navigation.dispatch(resetAction);
              },
            },
          ]);
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
    <View style={style.conatiner}>
      <CustomHeader title={'Foto Obat'} onPress={() => navigation.goBack()} />
      <View style={style.btnCameraWrapper}>
        <Camera uri={uri => setImg(arr => [...arr, `${uri}`])} image={img} />
      </View>
      <Text style={style.textWarning}>
        Ambil foto secukupnya untuk menghemat memori server! (max: 3 Foto)
      </Text>
      <ScrollView
        style={style.scrollViewStyle}
        showsVerticalScrollIndicator={false}>
        <View style={style.imageWrapper}>
          {img.length <= 0 ? (
            <Text style={style.textStyle}>Tidak ada foto</Text>
          ) : (
            img
              .slice(0)
              .reverse()
              .map((item, index) => (
                <View key={index} style={style.image}>
                  <Image
                    key={index}
                    style={style.imageStyle}
                    source={{
                      uri: `data:image/jpg;base64,${item}`,
                    }}
                  />
                  <TouchableWithoutFeedback
                    style={style.delete}
                    onPress={() => setImg(img.filter(it => it !== item))}>
                    <FontAwesomeIcon icon={faTrash} size={25} />
                  </TouchableWithoutFeedback>
                </View>
              ))
          )}
        </View>
        <CustomButton
          mt={30}
          title={'Simpan'}
          navigation={() => {
            if (img.join() === firstImg.join()) {
              Alert.alert('Tidak ada perubahan pada foto obat!');
            } else {
              if (img.length > 0) {
                update();
              } else {
                Alert.alert('Tambahkan setidaknya satu foto!');
              }
            }
          }}
        />
        <CustomButton
          mt={30}
          mb={30}
          title={'Hapus'}
          navigation={() => {
            hapus();
          }}
        />
      </ScrollView>
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View style={style.modalStyleLoading}>
          <View style={style.modalWrapperLoading}>
            <FontAwesomeIcon icon={faWalking} size={30} />
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
  image: {
    display: 'flex',
    flexDirection: 'row',
  },
  imageWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  imageStyle: {
    width: 250,
    height: 250,
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
  delete: {
    marginLeft: 10,
    zIndex: 99,
  },
});

export default FotoObat;
